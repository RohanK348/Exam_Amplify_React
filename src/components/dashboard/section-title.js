import React from 'react'
import {FiPlus} from 'react-icons/fi'

const SectionTitle = ({title, subtitle, right = null}) => {
  return (
    <div className="w-full mb-6 pt-3">
      <div className="flex flex-row items-center justify-between mb-4">
        <div className="flex flex-col">
          <div className="text-xs uppercase font-light text-grey-500">
            {title}
          </div>
          <div className="text-xl font-bold">{subtitle}</div>
        </div>
        <div className="flex-shrink-0 space-x-2">
          <button className="btn btn-default btn-rounded btn-icon bg-blue-500 hover:bg-blue-600 text-white space-x-1">
            <FiPlus className="stroke-current text-white" size={16} />
            <span>Add widget</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SectionTitle
