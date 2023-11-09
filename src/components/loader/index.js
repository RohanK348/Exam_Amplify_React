import React, {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import NProgress from 'nprogress'
import './styles.css'

const Loader = () => {
  let location = useLocation()
  useEffect(() => {
    NProgress.start()
    setTimeout(() => {
      NProgress.done()
    }, 500)
  }, [location])
  return <div />
}

export default Loader
