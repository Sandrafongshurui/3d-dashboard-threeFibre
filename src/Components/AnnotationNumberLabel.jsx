import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Html } from '@react-three/drei'
import { MdCommute } from "react-icons/md";

const AnnotationNumberLabel = ({
  annotation,
  idx,
  selected,
  annotationData,
  apiUrl,
}) => {
  const [data, setData] = useState(null)
  const [popUp, setPopUp] = useState(false)
  useEffect(() => {
    try {
      console.log('mount')
      const fetchData = async () => {
        console.log('fetch data every 1min')
        const response = await Axios.get(apiUrl)
        setData(response.data)
        console.log(response.data)
      }
      fetchData()
      const intervalId = setInterval(fetchData, 1000 * 60)
      return () => {
        console.log('unmount')
        clearInterval(intervalId)
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const handleOnClick = () => {
    // console.log("click", !selected, data);
    annotationData(data)
    selected(idx)
    setPopUp(!popUp)
    // prop0s.clickMesh(!selected);
  }

  return (
    <>
      <Html
        // className='bg-blue-700/70 text-white rounded-lg p-5 text-s'
        position={[
          annotation.position.x,
          annotation.position.y,
          annotation.position.z,
        ]}
        // position={[1, 5, 0]}
        // transform
        // sprite
      >
        <svg
          height="34"
          width="34"
          transform="translate(-16 -16)"
          style={{ cursor: 'pointer' }}
        >
          <circle
            cx="17"
            cy="17"
            r="16"
            stroke="white"
            strokeWidth="2"
            fill="rgba(0,0,0,.66)"
            onClick={handleOnClick}
          />
          <text
            x="12"
            y="22"
            fill="white"
            fontSize={17}
            fontFamily="monospace"
            style={{ pointerEvents: 'none' }}
          >
            {idx + 1}
          </text>
        </svg>
        {popUp && (
          <div className="bg-gradient-to-r from-cyan-500/70 to-blue-500/70 w-[200px] text-white rounded-lg p-2">
            <MdCommute/>
            <h1 className='text-lg'> Life Buoy </h1>
            <ul className="text-xs whitespace-pre-wrap">
              {Object.entries(data).map((item, idx) => (
                <li key={idx}>{`${item[0]} :\n ${item[1]}`}</li>
              ))}
            </ul>
          </div>
        )}
      </Html>
    </>
  )
}

export default AnnotationNumberLabel
