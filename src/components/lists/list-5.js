import React from 'react'
import {FaBox} from 'react-icons/fa'
import {CircularBadge} from '../badges'

const List5 = ({items}) => (
  <div className="w-full mb-4">
    {items.map((item, i) => (
      <div
        className="flex items-center justify-start p-2 space-x-4"
        key={i}>
        <div className="flex-shrink-0 w-8">
          <img
            src={item.img}
            alt="media"
            className={`h-8 w-full shadow-lg rounded-full shadow-outline`}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="text-sm font-bold">{item.title}</div>
          <div className="text-sm text-grey-500">{item.description}</div>
          <div className="flex flex-row items-center justify-start">
            <FaBox size={16} className="stroke-current text-grey-300" />
            <div className="text-grey-300 ml-2">{item.timeago}</div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <CircularBadge size="sm" color="bg-indigo-500 text-white">
            1
          </CircularBadge>
        </div>
      </div>
    ))}
  </div>
)

export default List5
