import React from 'react'

const Images = () => {
  const items = [
    '/screenshots/5.png',
    '/screenshots/1.png',
  ]
  return (
    <div
      className="screenshot overflow-hidden w-full rounded relative shadow-lg"
      style={{height: 320}}>
      <img
        src={items[1]}
        alt="screenshot"
        className="z-0 h-auto w-full absolute"
        style={{top: 0, left: 0}}
      />
      <img
        src={items[0]}
        alt="screenshot"
        className="z-10 shadow h-auto w-full absolute"
        style={{top: 75, left: 75}}
      />
    </div>
  )
}

export default Images
