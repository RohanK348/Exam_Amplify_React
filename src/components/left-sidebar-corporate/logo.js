import React, {useState, useEffect} from 'react'
import {FiMenu} from 'react-icons/fi'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import {Link} from 'react-router-dom'

import {useSetting} from '../../provider/setting'
import AmplifyImage from '../amplifyImage'

const Logo = () => {
  const dispatch = useDispatch()
  const {config, leftSidebar} = useSelector(
    state => ({
      config: state.config,
      leftSidebar: state.leftSidebar
    }),
    shallowEqual
  )
  const [setting] = useSetting()
  const {name, collapsed} = {...config}
  const {showLogo} = {...leftSidebar}
  const [logo, setLogo] = useState('')
  const [logoString, setLogoString] = useState('')

  useEffect(() => {
    if (setting?.auth) {
      setLogo(setting?.auth?.corporate?.logo||'')
      setLogoString(setting?.auth?.corporate?.logoString||'')
    }
  }, [setting?.auth])
  if (showLogo) {
    return (
      <div className="logo truncate">
        <Link
          to="/corporate"
          className="flex flex-row items-center justify-start space-x-2">
          {logo===''?
          <img alt="logo" src="/logo-s.png" style={{width: 40}} />:
          <AmplifyImage imageKey={logo} alt="logo" style={{width: 40}} />
          }
          {logoString===''?
          <span style={{color: '#42a5f5'}}>{name}</span>:
          <span style={{color: '#42a5f5'}}>{logoString}</span>
          }
        </Link>
        <button
          onClick={() =>
            dispatch({
              type: 'SET_CONFIG_KEY',
              key: 'collapsed',
              value: !collapsed
            })
          }
          className="ml-auto mr-4 block lg:hidden">
          <FiMenu size={20} />
        </button>
      </div>
    )
  }
  return null
}

export default Logo
