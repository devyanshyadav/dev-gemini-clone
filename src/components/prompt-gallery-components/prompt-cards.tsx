'use client'
import geminiZustand from '@/utils/gemini-zustand'
import React from 'react'


const PromptCards = ({ item }: { item: any }) => {
    const {setCustomPrompt} = geminiZustand()
    return (
        <div onClick={() => setCustomPrompt({prompt:item.prompt, placeholder:item.placeholder})}  className='my-2  rounded-lg cursor-pointer border-2 border-transparent hover:border-accentBlue/50 bg-rtlLight dark:bg-rtlDark p-5 overflow-hidden space-y-2'>
            <h2 className='text-xl'>{item.title}</h2>
            <div className='flex flex-wrap gap-2 items-center'>{
                item.tags.map((e: any, i: number) => (
                    <span key={i} className=' p-1 px-2 rounded-full bg-accentBlue/30 text-xs'>{e}</span>
                ))
            }</div>
        </div>
    )
}

export default PromptCards