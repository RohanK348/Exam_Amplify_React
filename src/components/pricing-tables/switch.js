import React, {useReducer} from 'react'
import Switch from 'react-switch'
import {getColor} from '../../functions/colors'

const Component = () => {
  let onColor = `bg-blue-200`
  let onHandleColor = `bg-blue-500`
  let offColor = `bg-grey-200`
  let offHandleColor = 'bg-white'

  const reducer = (state, action) => {
    switch (action.type) {
      case 'active':
        return action.active
      default:
        throw new Error()
    }
  }

  const [active, dispatch] = useReducer(reducer, false)

  return (
    <div className="w-full flex flex-row items-center justify-center space-x-2">
      <Switch
        onChange={() => {
          dispatch({type: 'active', active: !active})
        }}
        checked={active}
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
      <span className="text-grey-500">{active ? 'Monthly' : 'Annually'}</span>
    </div>
  )
}

export default Component
