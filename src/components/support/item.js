import React from 'react'

const Item = ({title, description, icon}) => (
  <div className="w-full flex flex-col items-center justify-start space-y-2 p-8 text-center">
    <div className="flex items-center justify-center h-16 w-16 rounded-md bg-white text-blue-500">
      {icon}
    </div>
    <div className="text-lg leading-6">{title}</div>
    <div className="text-base text-grey-500 leading-6">{description}</div>
  </div>
)

export default Item
