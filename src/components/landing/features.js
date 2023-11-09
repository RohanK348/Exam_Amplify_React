import React from 'react'
import {FiSettings, FiLayers, FiSend, FiActivity} from 'react-icons/fi'

const Item = ({title, description, icon}) => (
  <div className="w-full lg:w-1/2 flex flex-row items-start justify-start mb-8 px-2">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white text-blue-500">
        {icon}
      </div>
    </div>
    <div className="mx-4">
      <h5 className="text-lg leading-6 font-bold mb-1">{title}</h5>
      <p className="text-base leading-6">{description}</p>
    </div>
  </div>
)

const Features = () => (
  <div className="flex flex-row flex-wrap items-center justify-center mb-4 pt-12">
    <Item
      title="Zero Configuration"
      description="Automatic code splitting and hot code reloading"
      icon={<FiSettings className="stroke-current text-3xl" />}
    />
    <Item
      title="Ready for production"
      description="Optimized for a smaller build size, faster development compilation and easy to deploy"
      icon={<FiSend className="stroke-current text-3xl" />}
    />
    <Item
      title="100+ widgets and components"
      description="Lots of widgets and components to help you develop your application faster"
      icon={<FiLayers className="stroke-current text-3xl" />}
    />
    <Item
      title="100% responsive"
      description="Fully responsive views, pages and layouts"
      icon={<FiActivity className="stroke-current text-3xl" />}
    />
  </div>
)
export default Features
