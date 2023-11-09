import React from 'react'
import {useSelector, shallowEqual} from 'react-redux'
import '../../css/components/backdrop.css'

const Backdrop = () => {
  const {config} = useSelector(
    (state) => ({
      config: state.config
    }),
    shallowEqual
  )
  let {backdrop} = {...config}

  return <div className={`backdrop ${backdrop ? 'fade-in' : ''}`}></div>
}

export default Backdrop
