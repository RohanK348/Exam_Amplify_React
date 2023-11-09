import React from 'react'
import {
  FiClock,
} from 'react-icons/fi'
import Input from './input'
import Comments from './comments'
import Icons from './icons'

const Posts = ({items, comments}) => (
  <div className="w-full">
    {items.map((item, i) => (
      <div className="flex flex-col px-4" key={i}>
        <div
          className="flex flex-row items-start justify-start mb-2"
          >
          <div className="flex-shrink-0 w-8 mt-1 mr-4">
            <img
              src={item.img}
              alt="media"
              className={`h-8 w-full shadow-lg rounded-full shadow-outline`}
            />
          </div>
          <div className="flex flex-grow flex-col w-full">
            <div className="text-sm font-bold">{item.title}</div>
            <div className="flex flex-row items-center justify-start mb-2">
              <FiClock size={18} className="stroke-current text-grey-500" />
              <div className="text-grey-500 ml-1">{item.timeago}</div>
            </div>
          </div>
        </div>
        <div className="w-full mb-4">{item.sentences}</div>
        <div className="w-full mb-4">
          <img
            src={item.largeImage}
            alt="media"
            className="object-cover h-48 w-full"
          />
        </div>

        <Icons items={items} />
        <Input item={item} />
        <Comments items={comments} />
      </div>
    ))}
  </div>
)

export default Posts
