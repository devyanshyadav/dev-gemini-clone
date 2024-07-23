import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const Loading = () => {
  return (
    <section className='h-full w-full grid place-content-center'>
      <div className='flex items-center justify-center gap-3 text-8xl'>
      <FcGoogle />
      </div>
      <div className="loader" />
    </section>
  )
}

export default Loading