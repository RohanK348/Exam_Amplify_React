import React from 'react'

const Widget1 = ({title, description, icon}) => (
  <div className="w-full flex items-center justify-start p-2 space-x-4">
    <div className="flex-shrink-0 w-8">{icon}</div>
    <div className="flex flex-col w-full">
      <div className="text-lg leading-6 font-bold">{title}</div>
      <p className="text-base leading-6">{description}</p>
    </div>
  </div>
)

export default Widget1
