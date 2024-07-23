'use client'
import PromptCards from '@/components/prompt-gallery-components/prompt-cards'
import React from 'react'
import Prompts from "../../../../../utils/prompts-array.json"
import Masonry from "react-masonry-css";



const page = () => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  return (
    <main className='w-full max-w-4xl mx-auto flex flex-col p-5'>
      <h2 className=' ml-2 text-animation inline-block bg-gradient-to-r from-[#4E82EE] to-[#D96570] bg-clip-text text-3xl text-transparent font-semibold'>Prompt Gallery</h2>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-2"
        columnClassName="my-masonry-grid_column">
        <PromptCards item={{ title: "Default", tags: ["friend", "assistant"], prompt: null, placeholder: null }} />
        {
          Prompts.map((item, index) => (
            <PromptCards item={item} key={index} />
          ))
        }
      </Masonry>

    </main>
  )
}

export default page