import React, {useState, useEffect, useRef} from 'react'
import {usePopper} from 'react-popper'

const Popover = ({placement, title, content, children}) => {
  const [hidden, setHidden] = useState(true)

  const buttonRef = useRef(null)
  const popoverRef = useRef(null)

  const {styles, attributes} = usePopper(
    buttonRef.current,
    popoverRef.current,
    {
      placement: placement,
      modifiers: [
        {
          name: 'offset',
          enabled: true,
          options: {
            offset: [0, 0]
          }
        }
      ]
    }
  )

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        hidden ||
        buttonRef.current.contains(event.target) ||
        popoverRef.current.contains(event.target)
      ) {
        return false
      }
      setHidden(!hidden)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [hidden, popoverRef, buttonRef])

  const handlePopoverClick = () => {
    setHidden(!hidden)
  }

  return (
    <div className="hidden lg:flex relative">
      <button
        ref={buttonRef}
        onClick={handlePopoverClick}
        className="btn btn-default btn-rounded">
        {children}
      </button>
      <div ref={popoverRef} style={styles.popper} {...attributes.popper}>
        <div
          style={styles.offset}
          className={`bg-white text-grey-900 border-grey-200 dark:bg-grey-800 dark:text-white dark:border-grey-700 border-0 font-normal text-sm max-w-xs no-underline break-words rounded-lg shadow-lg w-64 z-10 ${
            hidden ? 'hidden' : 'block'
          }`}>
          <div className="bg-grey-100 text-grey-900 border-grey-200 dark:bg-grey-800 dark:text-white dark:border-grey-700 font-semibold p-2 mb-0 border-b border-solid uppercase rounded-t-lg">
            {title}
          </div>
          <div className="p-2">{content}</div>
        </div>
      </div>
    </div>
  )
}

export default Popover

