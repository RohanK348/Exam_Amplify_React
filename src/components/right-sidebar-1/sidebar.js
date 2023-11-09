import React from 'react'
import Switch from 'react-switch'
import {getColor} from '../../functions/colors'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'

const Component = () => {
  let onColor = `bg-blue-200`
  let onHandleColor = `bg-blue-500`
  let offColor = `bg-grey-200`
  let offHandleColor = 'bg-white'

  const {config} = useSelector(
    state => ({
      config: state.config
    }),
    shallowEqual
  )
  let {collapsed} = {...config}
  const dispatch = useDispatch()

  return (
    <Switch
      onChange={() => {
        dispatch({
          type: 'SET_CONFIG',
          config: {
            collapsed: !collapsed
          }
        })
      }}
      checked={collapsed}
      onColor={getColor(onColor)}
      onHandleColor={getColor(onHandleColor)}
      offColor={getColor(offColor)}
      offHandleColor={getColor(offHandleColor)}
      handleDiameter={24}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
      activeBoxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
      height={20}
      width={48}
      className="react-switch"
    />
  )
}

const Sidebar = () => {

  return (
    <div className="flex flex-col p-4">
      <div className="uppercase text-sm font-bold tracking-wider mb-2">
        Toggle sidebar
      </div>
      <div className="flex flex-col">
        <Component />
      </div>
    </div>
  )
}

export default Sidebar
