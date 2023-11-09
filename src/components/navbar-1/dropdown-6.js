import React, {useState, useEffect, useRef} from 'react'
import {FiChevronDown} from 'react-icons/fi'
import List1 from './list-1'

const Dropdown = () => {
  const [hidden, setHidden] = useState(true)

  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

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
        className="btn btn-default btn-icon bg-transparent h-16">
        <span className="mr-2">Explore</span>
        <FiChevronDown className="stroke-current" />
      </button>
      <div ref={dropdownRef}
          className={`dropdown absolute top-0 left-0 mt-16 ${hidden ? '' : 'open'}`}>
          <div className="dropdown-content w-128 bottom-start">
            <List1 />
          </div>
      </div>
    </div>
  )
}

export default Dropdown
