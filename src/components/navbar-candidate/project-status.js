import React from 'react'
import {ProgressBar} from '../progress-bars'

const ProjectStatus = () => {
  const items = [
    {
      title: 'Mobile app development',
      percent: 33,
      color: 'bg-green-500'
    },
    {
      title: 'Deploy github project',
      percent: 50,
      color: 'bg-amber-500'
    },
    {
      title: 'Customer development',
      percent: 66,
      color: 'bg-red-500'
    },
    {
      title: 'Database backup',
      percent: 25,
      color: 'bg-indigo-500'
    },
    {
      title: 'Release version 1.4',
      percent: 80,
      color: 'bg-blue-500'
    }
  ]
  return (
    <>
      <div className="dropdown-title">Project status</div>
      <div className="flex flex-col">
        {items.map((item, i) => (
          <div className="flex flex-col p-2 dropdown-item" key={i}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-bold">{item.title}</div>
              <div className="text-xs whitespace-no-wrap">{item.percent}%</div>
            </div>
            <ProgressBar
              width={parseInt(item.percent, 10)}
              color={item.color}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default ProjectStatus
