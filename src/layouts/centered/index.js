import React from 'react'

const Centered = ({children}) => (
  <div
    data-layout="centered"
    className="w-full h-screen flex items-center justify-center bg-grey-50">
    {children}
  </div>
)

export default Centered
