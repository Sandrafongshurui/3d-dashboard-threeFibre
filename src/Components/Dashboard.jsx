import React from 'react'

const Dashboard = ({ content, position }) => {
  console.log(content)
  const [left] = position
  const dashBoardClassName = `bg-gray-700/70 z-20 absolute text-white ${left} rounded-lg p-10`
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
