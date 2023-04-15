import { React, useState} from 'react'
import { GoTriangleRight} from 'react-icons/go'

const TrainDataRows = ({ content, numOfCols }) => {
    const [selectedTrain, setSelectedTrain] = useState(content[0].station)
    console.log(content)
    let selectedTrainClassName =
      ' bg-gradient-to-t from-[#680404]/50 via-transparent rounded-md'
  return (
    <>
      {content.map((item, idx) => {
        if (selectedTrain !== item.station) {
            selectedTrainClassName = ''
        }
        return (
          <div
            key={idx}
            className={`grid gap-1 grid-cols-${numOfCols} border-b-[1px] border-b-gray-500/10 py-2 ${selectedTrainClassName}`}
          >
            <div className="flex w-full">
              <div className="w-1/4 my-auto">
                {' '}
                {selectedTrainClassName === '' ? null : (
                  <GoTriangleRight size={10} color="red" />
                )}
              </div>

              {item.station}
            </div>
            <div>{item.station}</div>
            <div>{item.station}</div>
            <div>{item.crowd}</div>
          </div>
        )
      })}
    </>
  )
}

export default TrainDataRows