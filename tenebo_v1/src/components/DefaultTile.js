import React from 'react'

function DefaultTile(data) {
  return (
    <div>
        <div className="border-2 ml-4 mt-5 mb-3 flex flex-col items-center rounded-lg w-48 md:w-72 shadow-2xl ">
            <img src={data.data.image} alt="" className="w-72 h-80 rounded-lg object-cover" />
        </div>
    </div>
  )
}

export default DefaultTile

