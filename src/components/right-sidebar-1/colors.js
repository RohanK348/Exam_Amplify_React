import React from 'react'
import {useDispatch} from 'react-redux'

const Colors = ({title, palettes, name}) => {
  const dispatch = useDispatch()
  return (
    <div className="mb-2">
      <div className="uppercase text-sm font-normal text-grey-500 tracking-wider mb-2">
        {title}
      </div>
      <div className="flex flex-row space-x-1">
        {palettes.map((color, i) => (
          <button
            key={i}
            className={`btn btn-circle btn-raised ${color.bg} ${color.text}`}
            onClick={() => {
              dispatch({
                type: 'SET_PALETTE',
                palette: {
                  [`${name}`]: color.name
                }
              })
            }}></button>
        ))}
      </div>
    </div>
  )
}

export default Colors
