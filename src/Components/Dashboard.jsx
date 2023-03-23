import React from 'react'

const Dashboard = ({ content }) => {
  console.log(content)
  return (
    <ul className=" bg-gray-700/70 w-60 h-60 z-20 absolute top-0 text-white">
      {content.map((item, idx) => 
        <li key={idx}>
          {`${item[0]} : ${item[1]}`}
        </li>
      )}
    </ul>
  )
}

export default Dashboard
