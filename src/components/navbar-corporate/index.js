import React from 'react'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import {FiMenu} from 'react-icons/fi'
// import Dropdown1 from './dropdown-1'
// import Dropdown2 from './dropdown-2'
// import Dropdown3 from './dropdown-3'
// import Dropdown4 from './dropdown-4'
import Dropdown5 from './dropdown-5'
// import Dropdown6 from './dropdown-6'
import Dropdown7 from './dropdown-7'
import Dropdown8 from './dropdown-8'
// import Search from './search'
import '../../css/components/navbar.css'

const Navbar = () => {
  const {config} = useSelector(
    state => ({
      config: state.config
    }),
    shallowEqual
  )
  let {collapsed} = {...config}
  const dispatch = useDispatch()
  return (
    <div className="navbar navbar-1 border-b">
      <div className="navbar-inner w-full flex items-center justify-start" style={{height: 60, paddingRight: 30}}>
        <button
          onClick={() =>
            dispatch({
              type: 'SET_CONFIG_KEY',
              key: 'collapsed',
              value: !collapsed
            })
          }
          className="mx-4">
          <FiMenu size={20} />
        </button>
        {/* <Search /> */}

        <span className="ml-auto"></span>
        {/* <Dropdown6 />
        <Dropdown2 />
        <Dropdown1 />
        <Dropdown4 />
        <Dropdown3 /> */}
        <Dropdown8 />
        <Dropdown7 />
        <Dropdown5 />
      </div>
    </div>
  )
}

export default Navbar
