import React, {useState} from 'react'
import {FiChevronRight} from 'react-icons/fi'
import {Badge} from '../badges'

const Question = ({question, answer, children, badges}) => {
  const [hidden, setHidden] = useState(true)
  return (
    <div className="flex items-center justify-start py-3 px-3 border-t first:border-t-0 border-grey-100">
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-center justify-between">
          <button
            onClick={() => setHidden(!hidden)}
            className="bg-transparent text-grey-900 flex flex-row items-center justify-between w-full">
            <div className="flex flex-col">
            <div className="text-sm font-bold mb-2">{question}</div>
            <div className="flex flex-row items-center justify-start space-x-1">
              {badges.map((badge, i) => (
                <Badge key={i} size="sm" color={badge.color} rounded>
                  {badge.title}
                </Badge>
              ))}
            </div>
            </div>
            <FiChevronRight
              className={`stroke-current transition ease-in-out duration-150 transform ${
                hidden ? 'rotate-0' : 'rotate-90'
              }`}
            />
          </button>
        </div>
        <div className={`prose prose-sm max-w-none py-3 w-full ${hidden ? 'hidden' : 'block'}`}>
          {answer}
        </div>
      </div>
    </div>
  )
}

export default Question
