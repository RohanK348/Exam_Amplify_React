import React, {useState, useEffect, useRef} from 'react'

import {useSetting} from '../../provider/setting'
import {useAsync} from '../../functions/utils'
import {get} from '../../api/user'
const Dropdown = () => {
  const {data, status, error, run} = useAsync({
    status: "idle",
  })
  const [hidden, setHidden] = useState(true)
  const [setting] = useSetting()
  const [verify, setVerify] = useState(1)

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
  useEffect(() => {
    if (setting?.auth) {
      run(get(setting?.auth?.id))
    }
  }, [setting?.auth, run])
  useEffect(() => {
    if (status === 'resolved') {
      if (data?.corporate?.verified === null)
        setVerify(1)
      else if (data?.corporate?.verified)
        setVerify(2)
      else
        setVerify(0)
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])
  return (
    <div className="hidden lg:flex relative">
      <button
        ref={buttonRef}
        onClick={handleDropdownClick}
        className="flex items-center justify-center h-16 w-12 mx-4">
        <div className="h-14 w-20 rounded-full inline-flex items-center">
          {verify===0?
          <span className="p-1 rounded-sm bg-red-500">Verification Failed</span>:
          verify===1?
          <span className="p-1 rounded-sm bg-yellow-500">Verifying</span>:
          <span className="p-1 rounded-sm bg-green-500">Verified</span>
          }
        </div>
      </button>
      {verify<2&&
        <div ref={dropdownRef} 
          className={`dropdown absolute top-0 right-0 mt-16 ${hidden ? '' : 'open'}`}>
          <div className="dropdown-content w-64 bottom-start p-2">
            Please contact Empowerr Support info@empowerr.ai
          </div>
        </div>
      }
    </div>
  )
}

export default Dropdown
