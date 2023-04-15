import { React, useState } from 'react'
import { MdCommute } from 'react-icons/md'
import { GoTriangleRight, GoPrimitiveSquare } from 'react-icons/go'
const DashboardHeader = ({ name }) => {
  return (
    <div>
      <div className="flex font-semibold text-lg">
        {' '}
        <MdCommute size={20} className="mr-2 my-auto" />
        <p className="grow text-left">{name}</p>
        <div className="flex">
          <GoPrimitiveSquare className="my-auto" size={5} />
          <hr className="w-5 h-[1px] border-0 bg-white/50 m-auto" />
          <GoPrimitiveSquare className="my-auto" size={5} />
        </div>
      </div>
      <div className="flex">
        <GoPrimitiveSquare className="my-auto" size={9} />
        <hr className="mx-[-2px] w-full h-[1px] border-0 bg-gradient-to-r from-white/70 to-white/20 m-auto" />
        <GoPrimitiveSquare className="my-auto" size={9} />
      </div>
    </div>
  )
}

const DashboardSubheadings = ({ headingsArry }) => {
  console.log("heads arry",headingsArry.length)
  const subHeadings = []
  for (let i = 0; i < headingsArry.length; i++) {
    subHeadings.push(<div>{headingsArry[i]}</div>)
  }
  return (
    <div
      className={`grid grid-cols-${headingsArry.length} border-b-[1px] border-b-gray-500/50 font-semibold mt-2`}
    >
      {subHeadings}
    </div>
  )
}

const Dashboard = ({headerName, subheadings, children }) => {
  return (
    <div>
      <div className="bg-transparent w-[380px] text-white rounded-lg">
        <DashboardHeader name={headerName} />
        <div className="p-3 border-top">
          {/* <h1 className="text-lg"> {annotation.title} </h1> */}
          <div className="text-xs text-left">
            <DashboardSubheadings
              headingsArry={subheadings}
            />
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
