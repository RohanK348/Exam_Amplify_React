import React from 'react'
import {
  FiHome,
  FiUser,
  FiMessageSquare,
  FiSettings,
  FiMapPin,
  FiTwitter,
  FiFacebook,
  FiInstagram,
  FiLinkedin
} from 'react-icons/fi'

const Apps = () => {
  const items = [
    {
      title: 'Home',
      icon: <FiHome className="stroke-current text-xl text-grey-700" />
    },
    {
      title: 'Account',
      icon: <FiUser className="stroke-current text-xl text-blue-700" />
    },
    {
      title: 'Comments',
      icon: <FiMessageSquare className="stroke-current text-xl text-orange-500" />
    },
    {
      title: 'Settings',
      icon: <FiSettings className="stroke-current text-xl text-green-700" />
    },
    {
      title: 'Maps',
      icon: <FiMapPin className="stroke-current text-xl text-red-500" />
    },
    {
      title: 'Twitter',
      icon: <FiTwitter className="stroke-current text-xl text-twitter" />
    },
    {
      title: 'Facebook',
      icon: <FiFacebook className="stroke-current text-xl text-facebook" />
    },
    {
      title: 'Instagram',
      icon: <FiInstagram className="stroke-current text-xl text-instagram" />
    },
    {
      title: 'LinkedIn',
      icon: <FiLinkedin className="stroke-current text-xl text-linkedin" />
    }
  ]
  return (
    <>
      <div className="dropdown-title">Apps</div>
      <div className="flex flex-wrap text-center">
        {items.map((item, i) => (
          <div
            key={i}
            className="w-1/3 flex flex-col items-center justify-center h-20 space-y-1 dropdown-item">
            {item.icon}
            <span className="text-xs">{item.title}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default Apps
