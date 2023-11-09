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
              <div className="bg-white text-grey-900 border-grey-200 dark:bg-grey-800 dark:text-white dark:border-grey-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full items-center justify-center outline-none">
                <div className="relative p-4 w-full text-center">
                  {icon}
                  <div className="flex flex-col w-full mb-4">
                    <div className="text-lg mb-2 font-bold">{title}</div>
                    {body}
                  </div>
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
