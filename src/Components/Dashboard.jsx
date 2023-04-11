import React from "react";
import { MdCommute } from "react-icons/md";
const Dashboard = ({ content, position }) => {
  console.log(content);
  const [left] = position;
  const dashBoardClassName = `absolute text-white text-xs ${left} m-5`;
  return (
    <div className={dashBoardClassName}>
      <div className="bg-transparent w-[250px] text-white rounded-lg">
     
      <span className="flex"> <MdCommute size={30} />Next</span>
        <hr className="w-full h-0.5 border-0 bg-gradient-to-r from-transparent via-cyan-400/100 to-transparent" />
        <div className="p-5 bg-gradient-to-r from-transparent via-[#0044c16b] to-transparent ">
          
          {/* <h1 className="text-lg"> {annotation.title} </h1> */}
          <ul className="text-xs whitespace-pre-wrap text-left">
            {content.map((item, idx) => (
              <li key={idx}>{`${item[0]} :\n ${item[1]}`}</li>
            ))}
          </ul>
        </div>
        <hr className="w-full h-0.5 border-0 bg-gradient-to-r from-transparent via-cyan-400/100 to-transparent" />
      </div>
    </div>
  );
};

export default Dashboard;
