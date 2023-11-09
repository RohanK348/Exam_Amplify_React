import React from 'react'
import {useSelector, shallowEqual} from 'react-redux'
import {Link} from 'react-router-dom'

const Footer = () => {
  const {config} = useSelector(
    (state) => ({
      config: state.config
    }),
    shallowEqual
  )
  let {name} = {...config}
  return (
    <div className="flex flex-row items-center justify-between w-full text-xs z-10">
      <div className="text-white">&copy; {name} 2020</div>
      <div className="flex flex-row ml-auto space-x-2">
        <Link to="/privacy-policy">Privacy policy</Link>
        <Link to="/terms-of-service">Terms of service</Link>
        <Link to="/contact-us">Contact us</Link>
      </div>
    </div>
  )
}

export default Footer
