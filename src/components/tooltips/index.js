import React, {useState, useRef} from 'react'
import {usePopper} from 'react-popper'

const Tooltip = ({placement, title, content, children}) => {
  const [hidden, setHidden] = useState(true)

  const buttonRef = useRef(null)
  const tooltipRef = useRef(null)

  const {styles, attributes} = usePopper(
    buttonRef.current,
    tooltipRef.current,
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

  const showTooltip = () => {
    setHidden(false)
  }
  const hideTooltip = () => {
    setHidden(true)
  }

  return (
    <div className="hidden lg:flex relative">
      <button
        ref={buttonRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="btn btn-default btn-rounded">
        {children}
      </button>
      <div ref={tooltipRef} style={styles.popper} {...attributes.popper}>
        <div
          style={styles.offset}
          className={`bg-white text-grey-900 border-grey-200 dark:bg-grey-800 dark:text-white dark:border-grey-700 border-0 font-normal text-sm max-w-xs no-underline break-words rounded-lg shadow-lg w-64 z-10 ${hidden ? 'hidden' : 'block'}`}>
          <div className="p-2">{content}</div>
        </div>
      </div>
    </div>
  )
}

export default Tooltip

