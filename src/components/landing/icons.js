import React from 'react'
const Icons = () => (
  <div className="flex flex-row justify-start items-center space-x-1">
    <img src="/logos/react.svg" alt="react" className="h-6 w-auto" />
    <img src="/logos/redux.svg" alt="redux" className="h-6 w-auto" />
    <img
      style={{
        transform: 'scale(.75)'
      }}
      src="/logos/tailwind-css.svg"
      alt="tailwind-css"
      className="h-6 w-auto"
    />
  </div>
)

export default Icons
