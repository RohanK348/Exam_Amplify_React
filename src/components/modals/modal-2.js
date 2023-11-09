import React, {useState, useEffect, useRef} from 'react'
import {useSelector, shallowEqual} from 'react-redux'
import Portal from '../portal'

const Modal = ({title, icon, buttonTitle, buttonClassName, body}) => {
  const {palettes} = useSelector(
    (state) => ({
      palettes: state.palettes
    }),
    shallowEqual
  )
  let {background} = {
    ...palettes
  }

  const modalRef = useRef(null)
  const [open, setOpen] = useState(false)
  const show = () => {
    setOpen(true)
  }
  const hide = () => {
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!modalRef || !modalRef.current) return false
      console.log(modalRef.current.contains(event.target))
      if (!open || modalRef.current.contains(event.target)) {
        return false
      }
      setOpen(!open)
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, modalRef])

  return (
    <>
      <button
        className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
        type="button"
        onClick={show}>
        Open modal
      </button>
      {open && (
        <Portal selector="#portal">
          <div className="modal-backdrop fade-in"></div>
          <div
            className={`modal show ${background === 'dark' ? 'dark-mode' : ''}`}
            data-background={background}>
            <div
              className="relative w-auto lg:my-4 mx-auto lg:max-w-lg max-w-sm"
              ref={modalRef}>
              <div className="bg-white text-grey-900 border-grey-200 dark:bg-grey-800 dark:text-white dark:border-grey-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none">
                <div className="relative p-4 flex-auto">
                  <div className="flex items-start justify-start p-2 space-x-4">
                    <div className="flex-shrink-0 w-12">{icon}</div>
                    <div className="flex flex-col w-full">
                      <div className="text-lg mb-2 font-bold">{title}</div>
                      {body}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-4 border-t border-grey-200 dark:border-grey-700 border-solid rounded-b space-x-2">
                  <button
                    className="btn btn-default btn-rounded bg-white hover:bg-grey-100 text-grey-900"
                    type="button"
                    onClick={hide}>
                    Cancel
                  </button>
                  <button
                    className={buttonClassName}
                    type="button"
                    onClick={hide}>
                    {buttonTitle}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}

export default Modal
