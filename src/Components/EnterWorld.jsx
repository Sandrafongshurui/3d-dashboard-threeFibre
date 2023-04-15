import { React, useState } from 'react'

const EnterWorld = () => {
    
  const [hover, setHover] = useState('flex bg-blue-400 w-60 h-20 text-sm')
  const handleOnEnter = () => {
    setHover(
      hover +
        'before:bg-transparent before:left-0 before:top-0 before:border-t-2 before:border-r-2 before:border-white before:animate-[border-top-right_3s_infinite_alternate]',
    )
  }
  const handleOnExit = () => {
    setHover('flex bg-blue-400 w-60 h-20 text-sm')
  }
  return (
    <div className=" text-[35px] absolute top-[50%] left-[43%] text-white">
      <div
        // onClick={handleOnClick}
        onMouseEnter={handleOnEnter}
        onMouseExit={handleOnExit}
        className={hover}
      >
        {/* <div onClick={handleOnClick} className="w-60 h-20 text-sm hover:animate-[border-top-right_3s_infinite_alternate]"> */}
      </div>
      <p className="z-2 absolute top-0 text-center">Hello World</p>
    </div>
  )
}

export default EnterWorld
