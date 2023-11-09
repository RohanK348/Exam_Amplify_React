import React from 'react'
import {Link} from 'react-router-dom'

const backgrounds = [
  {
    title: 'Light',
    url: '/demo-1',
    img: '/screenshots/1.png'
  },
  {
    title: 'Dark',
    url: '/demo-2',
    img: '/screenshots/2.png'
  },
]
const items = [
  {
    title: 'Default sidebar',
    url: '/demo-1',
    img: '/screenshots/1.png'
  },
  {
    title: 'Small sidebar',
    url: '/demo-3',
    img: '/screenshots/5.png'
  },
  {
    title: 'Dark sidebar',
    url: '/demo-4',
    img: '/screenshots/3.png'
  },
  {
    title: 'Dark small sidebar',
    url: '/demo-5',
    img: '/screenshots/6.png'
  },
  {
    title: 'Dark navbar',
    url: '/demo-6',
    img: '/screenshots/4.png'
  },
]

const Screenshots = () => {
  return (
    <>
      <div className="flex flex-col items-center mb-4">
        <div className="text-sm leading-6 text-blue-500 font-semibold tracking-wide uppercase mb-4">
          Available backgrounds
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center mb-4">
          {backgrounds.map((item, i) => (
            <div className="w-full lg:w-1/3 p-8 lg:p-2 text-center" key={i}>
              <div className="flex flex-col mb-2 lg:mb-4">
                <Link to={item.url} className="text-sm uppercase">
                  {item.title}
                </Link>
                <div className="overflow-hidden w-full h-64 shadow-lg rounded mt-4">
                  <Link to={item.url}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-auto w-full"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center mb-4">
        <div className="text-sm leading-6 text-blue-500 font-semibold tracking-wide uppercase mb-4">
          Available layouts
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center mb-4">
          {items.map((item, i) => (
            <div className="w-full lg:w-1/3 p-8 lg:p-2 text-center" key={i}>
              <div className="flex flex-col mb-2 lg:mb-4">
                <Link to={item.url} className="text-sm uppercase">
                  {item.title}
                </Link>
                <div className="overflow-hidden w-full h-64 shadow-lg rounded mt-4">
                  <Link to={item.url}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-auto w-full"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Screenshots
