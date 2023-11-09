import React from 'react'
import '../../css/components/user-widgets/widget-2.css'

const Widget2 = () => {
  const user = {
    name: 'Lucas smith',
    img: 'm1.png',
  }
  return (
    <div className="relative flex items-center justify-start h-64 w-full overflow-hidden user-widget-2">
      <img
        src="/images/post-4.jpg"
        alt="media"
        className="object-cover h-48 w-full absolute inset-0 z-1"
      />
      <div className="w-full bottom-section z-2 absolute bottom-0 left-0 right-0 h-24 px-8">
        <div className="flex items-center justify-center">
          <div className="flex-shrink-0 w-24">
            <img
              src={`/assets/faces/${user.img}`}
              alt={user.name}
              className="rounded-full h-24 w-24 shadow-outline user-img"
            />
          </div>
          <div className="ml-4 w-full">
            <div className="font-light text-xs text-grey-500 uppercase">
              Members
            </div>
            <div className="text-lg font-bold">{user.name}</div>
          </div>
          <div className="hidden lg:flex flex-shrink-0 space-x-2">
            <button className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white">
              Subscribe
            </button>
            <button className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Widget2
