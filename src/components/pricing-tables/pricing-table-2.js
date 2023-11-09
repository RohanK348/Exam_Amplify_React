import React from 'react'
import faker from 'faker'
import {FiCheck} from 'react-icons/fi'
import data from './data.json'

const Index = () => {
  const title = faker.lorem.sentence(4)
  const description = faker.lorem.sentence(10)
  return (
    <>
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="text-lg">{title}</div>
        <div className="text-sm text-grey-500">{description}</div>
      </div>
      <div className="flex flex-row mb-4">
        <div className="w-1/4"></div>
        {data.slice(0, 3).map((item, i) => (
          <div className="w-1/4 text-center">
            <div className="text-base">{item.title}</div>
            <div className="flex flex-row items-center justify-center h-16">
              <span className="text-grey-500">$</span>
              <span className="text-6xl text-blue-500">{item.price}</span>
              <span className="text-grey-500">/mo</span>
            </div>
          </div>
        ))}
      </div>
      {data[0].items.map((item, i) => (
        <div className="flex flex-row h-8" key={i}>
          <div className="w-1/4">{item.title}</div>
          <div className="w-1/4">
            <FiCheck
              className={`stroke-current stroke-2 text-base mx-auto ${data[0].items[i].color}`}
            />
          </div>
          <div className="w-1/4">
            <FiCheck
              className={`stroke-current stroke-2 text-base mx-auto ${data[1].items[i].color}`}
            />
          </div>
          <div className="w-1/4">
            <FiCheck
              className={`stroke-current stroke-2 text-base mx-auto ${data[2].items[i].color}`}
            />
          </div>
        </div>
      ))}
      <div className="flex flex-row mt-4">
        <div className="w-1/4"></div>
        <div className="w-1/4 flex flex-row items-center justify-center">
          <button className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white">
            Sign up
          </button>
        </div>
        <div className="w-1/4 flex flex-row items-center justify-center">
          <button className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white">
            Sign up
          </button>
        </div>
        <div className="w-1/4 flex flex-row items-center justify-center">
          <button className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white">
            Sign up
          </button>
        </div>
      </div>
    </>
  )
}
export default Index
