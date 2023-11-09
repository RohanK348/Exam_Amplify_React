import React from 'react'

const Avatars = ({items}) => (
  <div className="flex flex-row items-center justify-end ml-auto">
    {items.map((avatar, j) => (
      <img
        key={j}
        src={avatar.img}
        alt="media"
        className={`h-8 w-8 shadow-lg rounded-full border-2 border-white -ml-3`}
      />
    ))}
  </div>
)

export default Avatars
