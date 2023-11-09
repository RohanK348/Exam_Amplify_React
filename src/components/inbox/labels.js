import React from 'react'
import {FiTag} from 'react-icons/fi'

const Labels = () => {
  const items = [
    {
      title: 'Documents',
      icon: <FiTag size={18} className="stroke-current text-teal-500" />
    },
    {
      title: 'Work',
      icon: <FiTag size={18} className="stroke-current text-amber-500" />
    },
    {
      title: 'Clients',
      icon: <FiTag size={18} className="stroke-current text-pink-500" />
    },
    {
      title: 'Projects',
      icon: <FiTag size={18} className="stroke-current text-indigo-500" />
    }
  ]
  return (
    <div className="flex flex-col w-full mb-4">
      <div className="uppercase font-normal text-xs tracking-wider flex flex-row items-center justify-start w-full p-2">
        Labels
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex items-center justify-start p-2 space-x-2">
          <div className="flex-shrink-0">{item.icon}</div>
          <div className="text-sm">{item.title}</div>
        </div>
      ))}
    </div>
  )
}

export default Labels
