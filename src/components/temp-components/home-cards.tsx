'use client'
import geminiZustand from '@/utils/gemini-zustand'
import React, { useMemo } from 'react'
import { AiOutlineBulb, AiOutlineExperiment } from "react-icons/ai";
import { IoCompassOutline, IoFitnessOutline } from "react-icons/io5";
import { MdOutlineDraw, MdOutlineNoFood, MdOutlineArchitecture } from "react-icons/md";
import { RiImageAddFill, RiMusic2Line } from "react-icons/ri";
import { FaChessKnight, FaTheaterMasks } from "react-icons/fa";
import { GiCook, GiMaterialsScience } from "react-icons/gi";
import { BsBookHalf, BsCodeSlash, BsCameraReels, BsGlobe } from "react-icons/bs";
import { TbMathFunction } from "react-icons/tb";

const promptArray = [
  {
    icon: RiImageAddFill,
    prompt: "Give me ideas for what to do with what's in this image?",
  },
  {
    icon: AiOutlineBulb,
    prompt: "As a social trend expert, explain a term",
  },
  {
    icon: IoCompassOutline,
    prompt: "Recommend new types of water sports, including pros & cons",
  },
  {
    icon: MdOutlineDraw,
    prompt: "Create vibrant & playful image with lots of details",
  },
  {
    icon: BsCodeSlash,
    prompt: "Explain a complex programming concept in simple terms",
  },
  {
    icon: GiCook,
    prompt: "Suggest a unique recipe using uncommon ingredients",
  },
  {
    icon: FaChessKnight,
    prompt: "Describe an interesting chess strategy for beginners",
  },
  {
    icon: BsBookHalf,
    prompt: "Recommend a book based on my favorite movie",
  },
  {
    icon: RiMusic2Line,
    prompt: "Create a playlist for a specific mood or activity",
  },
  {
    icon: IoFitnessOutline,
    prompt: "Design a 15-minute workout routine for busy professionals",
  },
  {
    icon: MdOutlineNoFood,
    prompt: "Explain the cultural significance of a traditional dish",
  },
  {
    icon: BsCameraReels,
    prompt: "Pitch an idea for a new sci-fi TV series",
  },
  {
    icon: AiOutlineExperiment,
    prompt: "Describe a fun science experiment to do at home",
  },
  {
    icon: FaTheaterMasks,
    prompt: "Write a short dramatic monologue for an audition",
  },
  {
    icon: BsGlobe,
    prompt: "Suggest an off-the-beaten-path travel destination",
  },
  {
    icon: TbMathFunction,
    prompt: "Explain a complex mathematical concept using a real-world analogy",
  },
  {
    icon: GiMaterialsScience,
    prompt: "Describe a potential future technology and its implications",
  },
  {
    icon: MdOutlineArchitecture,
    prompt: "Design a unique tiny house with innovative features",
  },
  {
    icon: IoCompassOutline,
    prompt: "Create a treasure hunt with clues for a birthday party",
  },
];

const HomeCards = () => {
  const { setCurrChat } = geminiZustand()
  
  const randomPrompts = useMemo(() => {
    const shuffled = [...promptArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, []);

  return (
    <div className="w-full h-auto grid md:grid-cols-4 grid-cols-1 overflow-hidden gap-2 mt-5 md:mt-16">
      {randomPrompts.map((item, index) => (
        <div
          key={index}
          onClick={() => setCurrChat('userPrompt', item.prompt)}
          className="dark:bg-rtlDark md:aspect-square bg-rtlLight hover:!bg-accentGray/20 cursor-pointer rounded-xl relative p-4 font-light"
        >
          <p>{item.prompt}</p>
          <item.icon className="absolute text-4xl bottom-2 right-2 rounded-full p-2 aspect-square bg-white dark:bg-black" />
        </div>
      ))}
    </div>
  )
}

export default HomeCards