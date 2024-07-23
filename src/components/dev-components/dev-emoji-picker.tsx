import React, { useState, useEffect } from "react";
import Emoji from "../../utils/emoji.json";
// Create Emoji.json file and get all emojis json from https://github.com/github/gemoji/blob/master/db/emoji.json
import { FiSearch } from "react-icons/fi";

type EmojiItem = {
  category: string;
  emoji: string;
  aliases: string[];
};

const DevEmojiPicker = ({
  setSelectedEmoji,
}: {
  setSelectedEmoji: (emoji: string) => void;
}) => {
  const [uniqueCategories, setUniqueCategories] = useState<
    { ctgName: string; emoji: string }[]
  >([]);
  const [currentCategory, setCurrentCategory] =
    useState<string>("Smileys & Emotion");
  const [filteredEmojis, setFilteredEmojis] = useState<
    { ctgName: string; emoji: string }[]
  >([]);
  const [hoveredEmoji, setHoveredEmoji] = useState<string | null>(null);

  const getData = () => {
    const categories = new Map();
    Emoji.forEach((item: { category: string; emoji: string }) => {
      const { category, emoji } = item;
      if (!categories.has(category)) {
        categories.set(category, { ctgName: category, emoji: emoji });
      }
    });
    setUniqueCategories(Array.from(categories.values()));
  };

  //  search Functionality from emoji Json
  const handleFindEmoji = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHoveredEmoji(value);

    if (value.trim() === "") {
      setFilteredEmojis([]);
      return;
    }

    const searchResults = Emoji.filter(
      (item: EmojiItem) =>
        item.aliases.some((alias) =>
          alias.toLowerCase().includes(value.toLowerCase())
        ) || item.emoji.includes(value)
    ).map((item) => ({
      ctgName: item.category,
      emoji: item.emoji,
    }));
    setFilteredEmojis(searchResults);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="w-fit  shadow-lg h-72 rounded-xl space-y-2 bg-rtlLight dark:bg-rtlDark p-2 flex flex-col">
      <div className="relative">
        <input
          type="text"
          onChange={handleFindEmoji}
          value={hoveredEmoji ?? ""}
          className="w-full p-1 px-2 pl-8 rounded-full bg-accentBlue/20  border border-accentBlue/50 text-sm focus:border-accentBlue focus:outline-none"
          placeholder="Search by tag or alias"
        />
        <FiSearch className="absolute top-2 left-2 text-accentBlue" />
      </div>
      <div className="grid grid-cols-9 gap-1 text-accentBlue bg-accentBlue/30 rounded-full  p-1 text-xl items-center justify-center">
        {uniqueCategories?.map((elem, index) => (
          <button
            key={index}
            className="cursor-pointer hover:bg-accentBlue rounded-full transition-all"
            onClick={() => {
              setFilteredEmojis([]);
              setCurrentCategory(elem.ctgName);
            }}
          >
            {elem.emoji}
          </button>
        ))}
      </div>

      <div className="w-full h-full [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar-track]:hidden [&::-webkit-scrollbar-thumb]:hidden  items-start content-start justify-start overflow-y-scroll grid grid-cols-9 gap-1 text-xl">
        {!filteredEmojis.length
          ? Emoji.filter((e, i) => e.category === currentCategory).map(
              (elem, index) => (
                <button
                  onClick={() => setSelectedEmoji(elem.emoji)}
                  className="cursor-pointer hover:scale-95 transition-all"
                  onMouseEnter={() =>
                    setHoveredEmoji(elem.emoji + elem.aliases[0])
                  }
                  onMouseLeave={() => setHoveredEmoji(null)}
                  key={index}
                >
                  {elem.emoji}
                </button>
              )
            )
          : filteredEmojis.map((elem, index) => (
              <button
                onClick={() => setSelectedEmoji(elem.emoji)}
                className="cursor-pointer hover:scale-95 transition-all"
                key={index}
              >
                {elem.emoji}
              </button>
            ))}
      </div>
    </section>
  );
};

export default DevEmojiPicker;
