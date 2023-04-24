import { React, useState, forwardRef } from 'react'

const EnterWorld = forwardRef(({ caption, scroll }, ref) => {
  // const "absolute bg-transparent right-6 bottom-0 border-b-2 border-l-2 border-white animate-[border-bottom-right-to-center_ease-in-out_0.4s_1_forwards]"
  const [enter, setEnter] = useState(false)
  const handleOnEnter = () => {
    setEnter(true)
  }
  const handleOnLeave = () => {
    setEnter(false)
  }
  const handleOnClick = () => {}
  return (
    <div
      ref={ref}
      onScroll={(e) => {
        scroll.current =
          e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
        // caption.current.innerText = scroll.current.toFixed(2)
      }}
      className="h-full absolute w-full top-0 overflow-y-auto"
    >
      {/* <div style={{ height: '400vh' }}>
        <div class="dot">
          <h1>headset</h1>
          Virtual reality (VR) is a simulated experience that can be similar to
          or completely different from the real world.
        </div>
      </div>
      <div style={{ height: '400vh' }}>
        <div class="dot">
          <h1>laptop</h1>
          Virtual reality (VR) is a simulated experience that can be similar to
          or completely different from the real world.
        </div>
      </div> */}

      {/* <section className="top-[38%] left-[40%] absolute text-[60px] font-alumni text-white font-extrabold">
        V I S U A L I Z E
      </section> */}
      <div className=" h-[400vh] ">
        <section className="text-[60px] font-alumni m-auto text-white font-extrabold">
          V I S U A L I Z E
        </section>
        <div
          onMouseEnter={handleOnEnter}
          onMouseLeave={handleOnLeave}
          onClick={handleOnClick}
          className={
            enter
              ? 'cursor-pointer rounded-sm top-[50%] left-[43%] border-red-500/30 border text-white/50 w-40 before:absolute before:bg-transparent before:left-6 before:top-[-1.5px] before:border-t-2 before:border-r-2 before:border-red-600 before:animate-[border-top-left-to-center_0.4s_1_forwards]'
              : 'rounded-sm top-[50%] left-[43%] border-red-500/30 border text-white w-40 h-14 before:absolute before:bg-transparent before:left-6 before:top-[-1.5px] before:border-t-2 before:border-r-2 before:border-red-600 before:animate-[border-top-center-to-left_0.4s_1_forwards]'
          }
        >
          <div
            className={
              enter
                ? 'right-6 bottom-[-1.5px] border-b-2 border-r-2 border-red-500 animate-[border-bottom-right-to-center_0.4s_1_forwards]'
                : 'right-6 bottom-[-1.5px] border-b-2 border-r-2 border-red-500 animate-[border-bottom-center-to-right_0.4s_1_forwards]'
            }
          ></div>
          <h1 className="py-[12px] font-alumni text-[20px] font-semibold">
            ENTER
          </h1>
        </div>
      </div>
    </div>
  )
})

export default EnterWorld
