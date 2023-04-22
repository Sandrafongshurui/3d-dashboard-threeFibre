import { React, useState } from 'react'

const EnterWorld = () => {
  // const "absolute bg-transparent right-6 bottom-0 border-b-2 border-l-2 border-white animate-[border-bottom-right-to-center_ease-in-out_0.4s_1_forwards]"
  const [enter, setEnter] = useState(false)
  const handleOnEnter = () => {
    setEnter(true)
  }
  const handleOnLeave = () => {
    setEnter(false)
  }
  const handleOnClick=()=> {
    
  }
  return (
    <>
      <section className='top-[38%] left-[40%] absolute text-[60px] font-alumni text-white font-extrabold'>V  I  S  U  A  L  I  Z  E</section>
      <div
        onMouseEnter={handleOnEnter}
        onMouseLeave={handleOnLeave}
        onClick={handleOnClick}
        className={
          enter
            ? 'cursor-pointer rounded-sm absolute top-[50%] left-[43%] border-red-500/30 border text-white/50 w-40 h-14 before:absolute before:bg-transparent before:left-6 before:top-[-1.5px] before:border-t-2 before:border-r-2 before:border-red-600 before:animate-[border-top-left-to-center_0.4s_1_forwards]'
            : 'rounded-sm absolute top-[50%] left-[43%] border-red-500/30 border text-white w-40 h-14 before:absolute before:bg-transparent before:left-6 before:top-[-1.5px] before:border-t-2 before:border-r-2 before:border-red-600 before:animate-[border-top-center-to-left_0.4s_1_forwards]'
        }
      >
        <div
          className={
            enter
              ? 'absolute right-6 bottom-[-1.5px] border-b-2 border-r-2 border-red-500 animate-[border-bottom-right-to-center_0.4s_1_forwards]'
              : 'absolute right-6 bottom-[-1.5px] border-b-2 border-r-2 border-red-500 animate-[border-bottom-center-to-right_0.4s_1_forwards]'
          }
        ></div>
        <h1 className="py-[12px] font-alumni text-[20px] font-semibold">
          ENTER
        </h1>
      </div>
    </>
  )
}

export default EnterWorld
