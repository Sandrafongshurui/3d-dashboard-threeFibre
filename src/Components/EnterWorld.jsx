import { React, useState, forwardRef } from "react";

const EnterWorld = forwardRef(({ caption, scroll }, ref) => {
  // const "absolute bg-transparent right-6 bottom-0 border-b-2 border-l-2 border-white animate-[border-bottom-right-to-center_ease-in-out_0.4s_1_forwards]"
  const [enter, setEnter] = useState(false);
  const handleOnEnter = () => {
    setEnter(true);
  };
  const handleOnLeave = () => {
    setEnter(false);
  };
  const handleOnClick = () => {};
  return (
    <div
      ref={ref}
      // onScroll={(e) => {
      //   scroll.current =
      //     e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
      //   // caption.current.innerText = scroll.current.toFixed(2)
      // }}
      className="fixed inset-0 w-100% m-auto overflow-y-auto"
    >
      <div className="h-[100vh] w-[300px] m-auto">
        <div className=" mt-[392px]">
          <div className="overflow-y-auto text-[60px] m-auto font-alumni text-white font-extrabold text-center">
            V I S U A L I Z E
          </div>
          <div className="mx-10">
            <div
              onMouseEnter={handleOnEnter}
              onMouseLeave={handleOnLeave}
              onClick={handleOnClick}
              className={
                enter
                  ? "cursor-pointer absolute p-auto rounded-sm border-red-500/30 border text-white/50 w-[200px] before:absolute before:bg-transparent before:left-6 before:top-[-1.5px] before:border-t-2 before:border-r-2 before:border-red-600 before:animate-[border-top-left-to-center_0.4s_1_forwards]"
                  : "absolute rounded-sm border-red-500/30 border text-white w-[200px] before:absolute before:bg-transparent before:left-6 before:top-[-1.5px] before:border-t-2 before:border-r-2 before:border-red-600 before:animate-[border-top-center-to-left_0.4s_1_forwards]"
              }
            >
              <div
                className={
                  enter
                    ? "overflow-y-auto absolute w-full right-6 bottom-[-1.5px] border-b-2 border-r-2 border-red-500 animate-[border-bottom-right-to-center_0.4s_1_forwards]"
                    : "overflow-y-auto absolute w-full right-6 bottom-[-1.5px] border-b-2 border-r-2 border-red-500 animate-[border-bottom-center-to-right_0.4s_1_forwards]"
                }
              ></div>
              <h1 className="font-alumni text-[20px] text-center font-semibold p-2">
                ENTER
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className=" h-[100vh] overflow-y-auto text-[60px] m-auto font-alumni text-white font-extrabold text-center">
        <div>
          <h1>headset</h1>
          Virtual reality (VR) is a simulated experience that can be similar to
          or completely different from the real world.
        </div>
      </div>
      <div className=" h-[100vh] overflow-y-auto text-[60px] m-auto font-alumni text-white font-extrabold text-center">
        <div>
          <h1>headset</h1>
          Virtual reality (VR) is a simulated experience that can be similar to
          or completely different from the real world.
        </div>
      </div>
    </div>
  );
});

export default EnterWorld;
