import React from 'react'

const Dashboard = ({ content, position }) => {
  console.log(content)
  const [topleft, bottomleft] = position
  let dashBoardClassName = `bg-gray-700/70 w-60 h-60 z-20 absolute text-white`
  topleft? topleft = "top-0" : ""
  bottomleft? bottomleft = "bottom-0" : ""
  dashBoardClassName += topleft + bottomleft
  return (
    <ul className={dashBoardClassName}>
      {content.map((item, idx) => 
        <li key={idx}>
          {`${item[0]} : ${item[1]}`}
        </li>
      )}
    </ul>
  )
}

export default Dashboard
