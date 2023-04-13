import { React, useState } from "react";
import { MdCommute } from "react-icons/md";
import { GoTriangleRight, GoPrimitiveSquare } from "react-icons/go";
const DashboardHeader = ({ name }) => {
  return (
    <div>
      <div className="flex font-semibold text-lg">
        {" "}
        <MdCommute size={20} className="mr-2 my-auto" />
        <p className="grow text-left">{name}</p>
        <div className="flex">
          <GoPrimitiveSquare className="my-auto" size={5}/>
          <hr className="w-5 h-[1px] border-0 bg-white/50 m-auto" />
          <GoPrimitiveSquare className="my-auto" size={5} />
        </div>
      </div>
      <div className="flex">
        {/* <svg height="4" width="4">
          <circle cx="2" cy="2" r="2" fill="white" />
        </svg> */}
        <GoPrimitiveSquare className="my-auto" size={9}/>
        <hr className="mx-[-2px] w-full h-[1px] border-0 bg-gradient-to-r from-white/70 to-white/20 m-auto" />
        <GoPrimitiveSquare className="my-auto" size={9} />
        {/* <svg height="4" width="4">
          <circle cx="2" cy="2" r="2" fill="white" />
        </svg> */}
      </div>
    </div>
  );
};

const Dashboard = ({ content, position, headerName }) => {
  // const estimatedArrival = content;
  const [selectedBus, setSelectedBus] = useState(content[0][0]);
  console.log(content);
  const [left] = !position ? "" : position;
  const dashBoardClassName = `text-white text-xs ${left} m-5 z-10`;
  let selectedBusClassName =
    " bg-gradient-to-t from-[#680404]/50 via-transparent rounded-md";
  // rounded-md shadow-[inset_0_-2px_6px_rgba(195,24,24,0.5)]
  return (
    <div>
      <div className="bg-transparent w-[380px] text-white rounded-lg">
        <DashboardHeader name={headerName} />
        <div className="p-3 border-top">
          {/* <h1 className="text-lg"> {annotation.title} </h1> */}
          <div className="text-xs text-left">
            <div className="grid gap-1 grid-cols-4 border-b-[1px] border-b-gray-500/50 font-semibold mt-2">
              <div className="pl-6">Bus No.</div>
              <div>Arrival Time</div>
              <div>Next</div>
              <div>Next</div>
            </div>
            {content.map((item, idx) => {
              if (selectedBus !== item[0]) {
                selectedBusClassName = "";
              }
              return (
                <div
                  key={idx}
                  className={`grid gap-1 grid-cols-4 border-b-[1px] border-b-gray-500/10 py-2 ${selectedBusClassName}`}
                >
                  <div className="flex w-full">
                    <div className="w-1/4 my-auto">
                      {" "}
                      {selectedBusClassName === "" ? null : (
                        <GoTriangleRight size={10} color="red" />
                      )}
                    </div>

                    {item[0]}
                  </div>
                  <div>{item[1].EstimatedArrival.split(/[T,+]/)[1]}</div>
                  <div>{item[2].EstimatedArrival.split(/[T,+]/)[1]}</div>
                  <div>{item[3].EstimatedArrival.split(/[T,+]/)[1]}</div>
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
