import React from 'react'
import {Link} from 'react-router-dom'
import {
  FiInbox,
  FiMail,
  FiBriefcase,
  FiFile,
  FiTrash2
} from 'react-icons/fi'
import {CircularBadge} from '../badges'

const Links = () => {
  const items = [
    {
      url: '/inbox',
      icon: <FiInbox size={18} />,
      name: 'Inbox',
      badge: {
        total: 2,
        color: 'bg-red-500 text-white'
      }
    },
    {
      url: '/inbox',
      icon: <FiMail size={18} />,
      iconColor: 'default',
      name: 'Sent'
    },
    {
      url: '/inbox',
      icon: <FiBriefcase size={18} />,
      name: 'Important',
      badge: {
        total: 2,
        color: 'bg-blue-500 text-white'
      }
    },
    {
      url: '/inbox',
      icon: <FiFile size={18} />,
      name: 'Drafts',
      badge: false
    },
    {
      url: '/inbox',
      icon: <FiFile size={18} />,
      name: 'Tags',
      badge: false
    },
    {
      url: '/inbox',
      icon: <FiTrash2 size={18} />,
      name: 'Trash',
      badge: false
    }
  ]
  return (
    <div className="flex flex-col w-full mb-4">
      {items.map((item, i) => (
        <Link
          to={item.url}
          key={i}
          className="w-full flex items-center justify-start p-2 text-sm">
          {item.icon}
          <span className="ml-2">{item.name}</span>
          {item.badge && (
            <span className="ml-auto">
              <CircularBadge size="sm" color={item.badge.color}>
                {item.badge.total}
              </CircularBadge>
            </span>
          )}
        </Link>
      ))}
    </div>
  )
}

export default Links
