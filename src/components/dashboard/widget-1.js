import React from 'react'

const Widget1 = ({title, description, right = null}) => {
  return (
    <div className="w-full p-4 rounded-lg bg-white border border-grey-100 dark:bg-grey-895 dark:border-grey-890">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <div className="text-xs uppercase font-light text-grey-500">
            {title}
          </div>
          <div className="text-xl font-bold">{description}</div>
        </div>
        {right}
      </div>
    </div>
  )
}

export default Widget1
