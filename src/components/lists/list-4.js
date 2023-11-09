import React from 'react'

const List4 = ({items}) => (
  <div className="w-full mb-4">
    {items.map((item, i) => (
      <div
        className="flex items-start justify-start p-2 space-x-4"
        key={i}>
        <div className="flex-shrink-0 w-8">
          <span className="h-8 w-8 bg-teal-500 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
            AB
          </span>
        </div>
        <div className="flex flex-col w-full">
          <div className="text-sm font-bold">{item.title}</div>
          <div className="text-sm">{item.sentence}</div>
        </div>
        <div className="flex-shrink-0">
          <span className="text-xs text-grey-500">2 days ago</span>
        </div>
      </div>
    ))}
  </div>
)

export default List4
