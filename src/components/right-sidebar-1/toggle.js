import React from 'react'
import {FiX} from 'react-icons/fi'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'

const Toggle = ({title, palettes, name}) => {
  const {config} = useSelector(
    state => ({
      config: state.config
    }),
    shallowEqual
  )
  let {rightSidebar} = {...config}
  const dispatch = useDispatch()
  return (
    <button
      onClick={() =>
        dispatch({
          type: 'SET_CONFIG_KEY',
          key: 'rightSidebar',
          value: !rightSidebar
        })
      }
      className="btn btn-transparent btn-circle">
      <FiX size={18} />
    </button>
  )
}

export default Toggle
