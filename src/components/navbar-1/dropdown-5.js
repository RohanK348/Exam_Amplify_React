import React, {useState, useEffect, useRef} from 'react'

import AccountLinks from './account-links'
import {useSetting} from '../../provider/setting'
import AmplifyImage from '../amplifyImage'

const Dropdown = () => {
  const [hidden, setHidden] = useState(true)
  const [setting] = useSetting()

  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    if (setting?.auth) {
      setAvatar(setting?.auth?.avatar)
    }
  }, [setting?.auth])
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        hidden ||
        buttonRef.current.contains(event.target) ||
        dropdownRef.current.contains(event.target)
      ) {
        return false
      }
      setHidden(!hidden)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [hidden, dropdownRef, buttonRef])

  const handleDropdownClick = () => {
    setHidden(!hidden)
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleDropdownClick}
        className="flex h-16 w-8 rounded-full ml-2 relative">
        <span className="absolute top-0 left-0 pt-4">
          {avatar === '/images/default-avatar.jpg'?
          <img
            className="h-8 w-8 rounded-full shadow"
            src={`/images/default-avatar.jpg`}
            alt="avatar"
          />:
          <AmplifyImage imageKey={avatar} className="h-8 w-8 rounded-full shadow" alt="avatar" />
          }
          {/* <span
            className="absolute uppercase font-bold inline-flex text-center p-0 leading-none text-2xs h-4 w-4 inline-flex items-center justify-center rounded-full bg-red-500 text-white shadow-outline-white"
            style={{top: 10, right: -4}}>
            2
          </span> */}
        </span>
      </button>
      <div ref={dropdownRef} 
          className={`dropdown absolute top-0 right-0 mt-16 ${hidden ? '' : 'open'}`}>
          <div className="dropdown-content w-48 bottom-end">
            <AccountLinks />
          </div>
        </div>
    </div>
  )
}

export default Dropdown
