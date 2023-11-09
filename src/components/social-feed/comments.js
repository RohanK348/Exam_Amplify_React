import React from 'react'

const Comments = ({items}) => (
  <div className="w-full mb-4">
    {items.map((item, i) => (
      <div
        className="flex items-start justify-start space-x-4 p-4"
        key={i}>
        <div className="flex-shrink-0 w-8">
          <img
            src={item.img}
            alt="media"
            className={`h-8 w-full shadow-lg rounded-full shadow-outline`}
          />
        </div>
        <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col w-full">
          <div className="text-sm font-bold">{item.name}</div>
          <div className="text-sm">{item.sentences}</div>
        </div>
        <div className="flex-shrink-0">
          <div className="text-grey-500 lg:ml-1">{item.timeago}</div>
        </div>
        </div>
      </div>
    ))}
  </div>
)

export default Comments
