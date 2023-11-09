import React, {useState} from 'react'
import Switch from 'react-switch'
import {getColor} from '../../functions/colors'

const Component = ({initialState = false, color = 'blue'}) => {
  const [checked, handleChange] = useState(initialState)
  let onColor = `bg-${color}-200`
  let onHandleColor = `bg-${color}-500`
  let offColor = `bg-grey-200`
  let offHandleColor = 'bg-white'

  return (
    <div>
      <Switch
        onChange={() => handleChange(!checked)}
        checked={checked}
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
    </div>
  )
}

export default Component
