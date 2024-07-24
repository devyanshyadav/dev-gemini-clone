"use client";
import React, { useState, useCallback } from "react";
import DevButton from "../dev-components/dev-button";
import clsx from "clsx";
import Link from "next/link";
import { MdDeleteOutline, MdOutlineChatBubbleOutline } from "react-icons/md";
import { HiOutlineDotsVertical, HiOutlinePencil } from "react-icons/hi";
import DevPopover from "../dev-components/dev-popover";
import { BsPin } from "react-icons/bs";
import { useParams, useSearchParams } from "next/navigation";
import DevModal from "../dev-components/dev-modal";
import { deleteChat, pinChat, renameChat } from "@/actions/actions";
import DevEmojiPicker from "../dev-components/dev-emoji-picker";
import { TbMessageChatbot, TbPinned } from "react-icons/tb";
import geminiZustand from "@/utils/gemini-zustand";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { IoMdAdd } from "react-icons/io";

const SidebarChatList = ({ sidebarList }: any) => {
  const { chat } = useParams()
  const [settings, setSettings] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { setTopLoader, setToast } = geminiZustand();
  const router = useRouter();
  const [chatInfo, setChatInfo] = useState<{
    title: string | null;
    icon: string | null;
  }>({ title: null, icon: null });
  const [modalLoader, setModalLoader] = useState(false);
  const [modalContent, setModalContent] = useState<{
    content: string;
    title: string;
    chatID: string;
  }>({
    content: "",
    chatID: "",
    title: "",
  });

  const handleEmojiSelect = useCallback((emoji: string) => {
    setChatInfo((prev) => ({ ...prev, icon: emoji }));
  }, []);

  const handleDeleteChat = async (chatID: string) => {
    setModalLoader(true);
    try {
      await deleteChat(chatID);
      setModalOpen(false);
      setToast("Chat deleted successfully");
    } catch (error) {
      console.error("Failed to delete chat:", error);
    } finally {
      setModalLoader(false);
    }
  };

  const handleRenameChat = async (
    chatID: string,
    chatInfo: { title: string | null; icon: string | null }
  ) => {
    setModalLoader(true);
    try {
      await renameChat(chatID, chatInfo);
      setModalOpen(false);
      setToast("Chat renamed successfully");
    } catch (error) {
      console.error("Failed to rename chat:", error);
    } finally {
      setModalLoader(false);
    }
  };

  const renderModalContent = useCallback(() => {
    switch (modalContent.content) {
      case "delete":
        return (
          <div className="mt-5">
            <p>
              You'll no longer see this chat here. This will also delete related
              activity like prompts, responses, and feedback from your Gemini
              Apps Activity.
            </p>
            <Link href="/" className="underline text-accentBlue">
              Learn more
            </Link>
            <div className="flex gap-3 justify-end !text-accentBlue">
              <DevButton
                size="sm"
                rounded="sm"
                onClick={() => setModalOpen(false)}
                className="text-lg gap-2"
              >
                Cancel
              </DevButton>
              <DevButton
                size="sm"
                rounded="sm"
                onClick={() => handleDeleteChat(modalContent.chatID)}
                className="text-lg gap-2"
              >
                Delete
              </DevButton>
            </div>
          </div>
        );
      case "rename":
        return (
          <div className="mt-5">
            <div className="flex gap-2">
              <DevPopover
                place="right-start"
                contentClick={false}
                popButton={
                  <DevButton
                    size="sm"
                    rounded="md"
                    variant="v3"
                    className=" text-lg gap-2 border relative"
                  >
                    {chatInfo.icon || <TbMessageChatbot className="text-3xl" />}
                    <p className="absolute h-5 grid place-content-center -bottom-1 -right-1 rounded-full bg-accentBlue text-white aspect-square">
                      +
                    </p>
                  </DevButton>
                }
              >
                <DevEmojiPicker setSelectedEmoji={handleEmojiSelect} />
              </DevPopover>
              <input
                value={chatInfo.title || ""}
                maxLength={100}
                placeholder="Enter chat name"
                onChange={(e) =>
                  setChatInfo({ ...chatInfo, title: e.target.value })
                }
                type="text"
                className="w-full bg-transparent outline-none border-2 border-accentGray/50 rounded-xl px-3 py-1 focus:border-accentBlue"
              />
            </div>
            <div className="flex gap-3 mt-2 justify-end !text-accentBlue">
              <DevButton
                size="sm"
                rounded="sm"
                onClick={() => setModalOpen(false)}
                className="text-lg gap-2"
              >
                Cancel
              </DevButton>
              <DevButton
                size="sm"
                rounded="sm"
                onClick={() => handleRenameChat(modalContent.chatID, chatInfo)}
                className="text-lg gap-2"
              >
                Rename
              </DevButton>
            </div>
          </div>
        );
      default:
        return <></>;
    }
  }, [modalContent, chatInfo, handleEmojiSelect]);

  return (
    <>
      <ul className="mt-2 space-y-1 ">
        {sidebarList.success && sidebarList.message.length > 0 &&
          sidebarList.message.map((item: any) => (
            <li key={item.chatID}>
              <DevButton
                rounded="full"
                variant="v3"
                onClick={() => setSettings(item.chatID)}
                className={clsx(
                  "text-sm overflow-hidden group !w-full justify-between relative !pr-2 gap-4",
                  item.chatID === chat
                  && "!bg-accentBlue/50"
                )}
              >
                <Link
                  href={`/app/${item.chatID}`}
                  className="grid grid-cols-[auto_1fr] items-center w-full gap-4"
                >
                  {item?.chatInfo?.icon ? (
                    <i className="not-italic text-md scale-150">
                      {item?.chatInfo?.icon}
                    </i>
                  ) : (
                    <MdOutlineChatBubbleOutline className="text-lg" />
                  )}
                  <p className="truncate text-left">
                    {item?.chatInfo?.title || item.message.userPrompt}
                  </p>
                </Link>
                {item?.isPinned && (
                  <TbPinned className="text-lg absolute top-3 group-hover:hidden right-2" />
                )}
                <DevPopover
                  place="right-start"
                  popButton={
                    <>
                      <HiOutlineDotsVertical
                        className={clsx(
                          "cursor-auto  group-hover:block hidden aspect-square hover:bg-accentGray/30 rounded-full text-xl p-[2px]",
                          settings === item.chatID ? "block" : "hidden"
                        )}
                      />

                      {
                        chat && item.chatID === chat && createPortal(
                          <div className="fixed top-3 md:hidden right-20 z-50 flex items-center !text-xl">
                            <DevButton
                              size="lg"
                              onClick={() => setSettings(item.chatID)}
                              rounded="full" variant="v3" asIcon className={`${item.chatID === chat ? " !flex " : " !hidden "}`}>
                              <HiOutlineDotsVertical />
                            </DevButton>

                          </div>, document.body
                        )
                      }
                    </>
                  }
                >
                  <div className="overflow-hidden py-2 min-w-44">
                    <DevButton
                      onClick={async () => {
                        try {
                          setTopLoader(true);
                          await pinChat(item.chatID, !item.isPinned);
                          if (item.isPinned) {
                            setToast("Unpinned successfully");
                          }
                          else {
                            setToast("Pinned successfully");
                          }
                        } catch (error) {
                          console.error("Failed to pin/unpin chat:", error);
                        } finally {
                          setTopLoader(false);
                        }
                      }}
                      variant="v3"
                      className="w-full !justify-start gap-3 group"
                      rounded="none"
                    >
                      <BsPin className="text-xl" />
                      {item.isPinned ? "Unpin" : "Pin"}
                    </DevButton>
                    <DevButton
                      variant="v3"
                      className="w-full !justify-start gap-3 group"
                      rounded="none"
                      onClick={() => {
                        setChatInfo({
                          icon: item?.chatInfo?.icon,
                          title: item?.chatInfo?.title,
                        });
                        setModalContent({
                          content: "rename",
                          chatID: item.chatID as string,
                          title: "Rename this chat",
                        });
                        setModalOpen(true);
                      }}
                    >
                      <HiOutlinePencil className="text-xl" />
                      Rename
                    </DevButton>
                    <hr className="border-accentGray/30" />
                    <DevButton
                      onClick={() => {
                        setModalContent({
                          content: "delete",
                          chatID: item.chatID as string,
                          title: "Delete Chat?",
                        });
                        setModalOpen(true);
                      }}
                      variant="v3"
                      className="w-full !justify-start gap-3 group"
                      rounded="none"
                    >
                      <MdDeleteOutline className="text-xl" />
                      Delete
                    </DevButton>
                  </div>
                </DevPopover>
              </DevButton>
            </li>
          ))}
      </ul>
      <DevModal
        open={modalOpen}
        isOpen={setModalOpen}
        modalTitle={modalContent.title}
        loader={modalLoader}
        openBtn={<></>}
      >
        <div>{renderModalContent()}</div>
      </DevModal>
    </>
  );
};

export default SidebarChatList;
