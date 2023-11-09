import React from 'react'

const Title = ({title, total}) => (
  <div className="text-base uppercase font-bold mb-2">
    <span>{title}</span> <span>{total}</span>
  </div>
)

export default Title
