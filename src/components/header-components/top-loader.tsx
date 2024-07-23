'use client'
import geminiZustand from '@/utils/gemini-zustand'
import React from 'react'

const TopLoader = () => {
    const { topLoader } = geminiZustand()
    return (
        <div className="absolute bottom-0 inset-x-0">
            {topLoader && <div className="loader"/>}
        </div>
    )
}

export default TopLoader