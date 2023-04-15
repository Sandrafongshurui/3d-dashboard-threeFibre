import { React, useState} from 'react'
import { GoTriangleRight} from 'react-icons/go'

const BusDataRows = ({ content, numOfCols }) => {
    const [selectedBus, setSelectedBus] = useState(content[0][0])
    console.log(numOfCols)
    let selectedBusClassName =
      ' bg-gradient-to-t from-[#680404]/50 via-transparent rounded-md'
  return (
    <>
      {content.map((item, idx) => {
        if (selectedBus !== item[0]) {
          selectedBusClassName = ''
        }
        return (
          <div
            key={idx}
            className={`grid gap-1 grid-cols-${numOfCols} border-b-[1px] border-b-gray-500/10 py-2 ${selectedBusClassName}`}
          >
            <div className="flex w-full">
              <div className="w-1/4 my-auto">
                {' '}
                {selectedBusClassName === '' ? null : (
                  <GoTriangleRight size={10} color="red" />
                )}
              </div>

              {item[0]}
            </div>
            <div>{item[1].EstimatedArrival.split(/[T,+]/)[1]}</div>
            <div>{item[2].EstimatedArrival.split(/[T,+]/)[1]}</div>
            <div>{item[3].EstimatedArrival.split(/[T,+]/)[1]}</div>
          </div>
        )
      })}
    </>
  )
}

export default BusDataRows
