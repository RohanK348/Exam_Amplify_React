import React from 'react'
import {FiSettings, FiLayers, FiSend} from 'react-icons/fi'
import Item from './item'

const Features = () => (
  <div className="flex flex-row flex-wrap items-center justify-center mb-8">
    <div className="w-1/3">
      <Item
        title="FAQ"
        description="You have the questions, we have the answers"
        icon={<FiSettings className="stroke-current text-3xl" />}
      />
    </div>
    <div className="w-1/3">
      <Item
        title="Support"
        description="Can't find what you are looking for? Submit a ticket"
        icon={<FiSend className="stroke-current text-3xl" />}
      />
    </div>
    <div className="w-1/3">
      <Item
        title="Community"
        description="Ask any questions from expert community members"
        icon={<FiLayers className="stroke-current text-3xl" />}
      />
    </div>
  </div>
)

export default Features
