import React from 'react'
import {FiBox} from 'react-icons/fi'
import {useSelector, shallowEqual} from 'react-redux'
import {Link} from 'react-router-dom'

const Logo = () => {
  const {config} = useSelector(
    state => ({
      config: state.config
    }),
    shallowEqual
  )
  const {name} = {...config}
  return (
    <div className="uppercase font-bold text-base tracking-wider flex flex-row items-center justify-start w-full whitespace-no-wrap text-blue-500">
      <Link
        to="/"
        className="flex flex-row items-center justify-start space-x-2">
        <img alt="logo" src="/logo.png" />
      </Link>
    </div>
  )
}

export default Logo
