import React from 'react'
import faker from 'faker'
import {FiCheck} from 'react-icons/fi'
import Switch from './switch'
import data from './data.json'

const PricingTable = ({title, price, items}) => {
  return (
    <div className="w-full flex flex-col items-center justify-end mb-8 lg:mb-0">
      <div className="flex flex-row items-center justify-center h-16">
        <span className="text-grey-500">$</span>
        <span className="text-6xl text-blue-500">{price}</span>
        <span className="text-grey-500">/mo</span>
      </div>
      <div className="flex flex-row items-center justify-center h-16 uppercase font-bold text-base">
        {title}
      </div>
      <>
        {items.map((item, i) => (
          <div className="flex flex-row w-full items-center justify-start h-10">
            <div className="flex-shrink-0 w-8">
              <FiCheck
                className={`stroke-current stroke-2 text-base ${item.color}`}
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="text-sm">{item.title}</div>
            </div>
          </div>
        ))}
      </>
      <div className="flex flex-row w-full items-center justify-center mt-8">
        <button className="btn btn-lg btn-rounded bg-blue-500 hover:bg-blue-600 text-white">
          Sign up
        </button>
      </div>
    </div>
  )
}

const Index = () => {
  const title = faker.lorem.sentence(4)
  const description = faker.lorem.sentence(10)
  return (
    <>
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="text-lg">{title}</div>
        <div className="text-sm text-grey-500">{description}</div>
        <div className="w-full">
          <Switch />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4 p-2">
          <PricingTable {...data[0]} />
        </div>
        <div className="w-full lg:w-1/4 p-2">
          <PricingTable {...data[1]} />
        </div>
        <div className="w-full lg:w-1/4 p-2">
          <PricingTable {...data[2]} />
        </div>
        <div className="w-full lg:w-1/4 p-2">
          <PricingTable {...data[3]} />
        </div>
      </div>
    </>
  )
}
export default Index
