import React from 'react'

const GradientLoader = () => {
  return (
    <div className="gradient-loader w-full flex flex-col gap-2">
      {[1, 2, 3].map((i) => (
        <hr key={i}/>
      ))}
    </div>
  )
}

export default GradientLoader