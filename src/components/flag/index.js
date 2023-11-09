import React from 'react'
const Flag = ({size = 'lg', code}) => {
  return (
    <span className={`text-${size} flag-icon flag-icon-${code}`}></span>
  )
}

export default Flag
