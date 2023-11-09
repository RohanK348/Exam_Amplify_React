import React from 'react'

const Section = ({title, description, right = null, children}) => {
  return (
    <div className="w-full p-4 rounded-lg bg-white border border-grey-100 dark:bg-grey-895 dark:border-grey-890">
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="flex flex-col">
          <div className="text-sm font-light text-grey-500">{title}</div>
          <div className="text-sm font-bold">{description}</div>
        </div>
        {right}
      </div>
      {children}
    </div>
  )
}

export default Section
