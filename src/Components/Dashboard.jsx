import React from "react";
import { MdCommute } from "react-icons/md";
const Dashboard = ({ content, position }) => {
  // const estimatedArrival = content;
  console.log(content);
  const [left] = position;
  const dashBoardClassName = `absolute text-white text-xs ${left} m-5 z-10`;
  return (
    <div className={dashBoardClassName}>
      <div className="bg-transparent w-[240px] text-white rounded-lg">
        <span className="flex font-semibold text-lg">
          {" "}
          <MdCommute size={20} className="mr-2 my-auto" />
          Estimated Arrivals
        </span>
        <div className="flex">
          <svg height="4" width="4">
            <circle cx="2" cy="2" r="2" fill="white" />
          </svg>
          <hr className="w-full h-[1.5px] border-0 bg-gradient-to-r from-white/70 to-white/20 m-auto" />
          <svg height="4" width="4">
            <circle cx="2" cy="2" r="2" fill="white" />
          </svg>
        </div>

        <div className="p-3 border-top">
          {/* <h1 className="text-lg"> {annotation.title} </h1> */}
          <div className="text-xs">
            <div className="grid grid-cols-3 border-b-[1px] border-b-gray-500/50 font-semibold mt-2">
              <div className="text-left">Bus No.</div>
              <div className="text-left">Arrival Time</div>
              <div className="text-left">Type</div>
            </div>
            {content.map((item, idx) => {
              return (
                <div className="grid grid-cols-3 border-b-[1px] border-b-gray-500/20 py-2">
                  <div className="text-left">{item[0]}</div>
                  <div className="text-left">
                    {item[1].EstimatedArrival.split(/[T,+]/)[1]}
                  </div>
                  <div className="text-left">{item[1].Type}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
