import React, {useState, useEffect, useRef} from 'react'

import {useSetting} from '../../provider/setting'
import {CircularBadge} from '../../components/badges'
import {useAsync} from '../../functions/utils'
import {get} from '../../api/user'
const Dropdown = () => {
  const {data, status, error, run} = useAsync({
    status: "idle",
  })
  const [hidden, setHidden] = useState(true)
  const [setting] = useSetting()
  const [candidate, setCandidate] = useState(0)

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
  }, [setting?.auth?.corporate?.candidateNumber, run])
  useEffect(() => {
    if (status === 'resolved') {
      if (data?.corporate?.candidateNumber)
        setCandidate(data?.corporate?.candidateNumber)
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
        className="flex items-center justify-center h-16 w-12">
        {candidate>999?
        <CircularBadge size="lg" color="bg-green-500">
          +999
        </CircularBadge>:
        (candidate>=100 && candidate<=999)?
        <CircularBadge size="lg" color="bg-green-500">
          {candidate}
        </CircularBadge>:
        (candidate<100 && candidate>=10)?
        <CircularBadge size="lg" color="bg-yellow-500">
          {candidate}
        </CircularBadge>:
        <CircularBadge size="lg" color="bg-red-500">
          {candidate}
        </CircularBadge>
        }
      </button>
      <div ref={dropdownRef} 
        className={`dropdown absolute top-0 right-0 mt-16 ${hidden ? '' : 'open'}`}>
        {candidate<100&&
          <div className="dropdown-content w-64 bottom-start p-2">
            Please contact Empowerr Support info@empowerr.ai
          </div>
        }
      </div>
    </div>
  )
}

export default Dropdown
