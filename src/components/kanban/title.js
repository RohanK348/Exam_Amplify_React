import React from 'react'

const Title = ({title, total}) => (
  <div className="mb-2 uppercase font-bold text-xs tracking-wider flex flex-row items-center justify-start w-full uppercase"><span className="mr-2">{title}</span> <span className="text-grey-500">{total}</span>
  </div>
)

export default Title
