import React from 'react'

const Title = ({title, description}) => (
  <div className="flex flex-col flex-wrap w-full items-center justify-center mb-8">
    <div className="text-2xl mb-2">{title}</div>
    <div className="text-base text-grey-500">{description}</div>
  </div>
)

export default Title
