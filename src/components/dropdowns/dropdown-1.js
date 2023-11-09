import React, {useState, useEffect, useRef} from 'react'
import {usePopper} from 'react-popper'

const Dropdown = ({
  placement = 'bottom-start',
  children,
  title,
  width = 'w-32'
}) => {
  const [hidden, setHidden] = useState(true)

  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

  const {styles, attributes} = usePopper(
    buttonRef.current,
    dropdownRef.current,
    {
      placement: placement,
    }
  )

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
    <div className="hidden lg:flex relative">
      <button
        ref={buttonRef}
        onClick={handleDropdownClick}
        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white">
        {title}
      </button>
      <div ref={dropdownRef} style={styles.popper} {...attributes.popper}>
        <div
          style={styles.offset}
          className={`dropdown ${hidden ? '' : 'open'}`}>
          <div className={`dropdown-content ${width} ${placement}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dropdown
