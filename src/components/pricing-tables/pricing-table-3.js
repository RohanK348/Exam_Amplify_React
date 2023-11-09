import React from 'react'
import faker from 'faker'
import {FiCheck} from 'react-icons/fi'
import {FiActivity, FiUsers, FiBarChart2, FiBox} from 'react-icons/fi'
import data from './data.json'

const PricingTable = ({title, price, icon, items}) => {
  return (
    <div className="w-full flex flex-col items-center justify-end mb-8 lg:mb-0">
      <div className="flex flex-row items-center justify-center mb-4">
        {icon}
      </div>
      <div className="flex flex-row items-center justify-center mb-4 uppercase font-bold text-base">
        {title}
      </div>
      <>
        {items.slice(0, 5).map((item, i) => (
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
      <div className="flex flex-row items-center justify-center h-10">
        <span className="text-grey-500">$</span>
        <span className="text-3xl text-blue-500">{price}</span>
        <span className="text-grey-500">/mo</span>
      </div>
      <div className="flex flex-row w-full items-center justify-center mt-4">
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
      </div>
      <div className="flex flex-col mb-4 lg:flex-row">
        <div className="w-full lg:w-1/4 p-2">
          <PricingTable
            {...data[0]}
            icon={
              <FiActivity size={36} className="stroke-current text-blue-500" />
            }
          />
        </div>
        <div className="w-full lg:w-1/4 p-2">
          <PricingTable
            {...data[1]}
            icon={
              <FiBarChart2 size={36} className="stroke-current text-blue-500" />
            }
          />
        </div>
        <div className="w-full lg:w-1/4 p-2">
          <PricingTable
            {...data[2]}
            icon={
              <FiUsers size={36} className="stroke-current text-blue-500" />
            }
          />
        </div>
        <div className="w-full lg:w-1/4 p-2">
          <PricingTable
            {...data[3]}
            icon={<FiBox size={36} className="stroke-current text-blue-500" />}
          />
        </div>
      </div>
    </>
  )
}
export default Index
