import React, {useState} from 'react'
import Portal from '../portal'
import PropTypes from 'prop-types'
import {FiX} from 'react-icons/fi'

const Notifications = ({
  btnTitle,
  btnClassNames,
  outerClassNames,
  innerClassNames,
  animation,
  icon,
  content
}) => {
  const [open, setOpen] = useState(false)
  const show = () => {
    setOpen(true)
  }
  const hide = () => {
    setOpen(false)
  }

  return (
    <>
      <button className={`${btnClassNames}`} type="button" onClick={show}>
        {btnTitle}
      </button>
      {open && (
        <Portal selector="#portal">
          <div className={`${outerClassNames} ${show ? animation : ''}`}>
            <div
              className={`w-full flex items-center justify-start p-4 ${innerClassNames}`}>
              {icon && <div className="flex-shrink">{icon}</div>}
              <div className="flex-grow">{content}</div>
              <div className="flex-shrink">
                <button
                  onClick={hide}
                  className="ml-auto flex items-center justify-center">
                  <FiX className="stroke-current h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}

Notifications.propTypes = {
  show: PropTypes.bool,
  outerClassNames: PropTypes.string,
  innerClassNames: PropTypes.string,
  animation: PropTypes.string,
  btnTitle: PropTypes.string,
  btnClassNames: PropTypes.string,
  icon: PropTypes.any,
  content: PropTypes.any
}
export default Notifications
