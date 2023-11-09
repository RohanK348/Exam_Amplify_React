import React from 'react'
import {useSelector, shallowEqual} from 'react-redux'
import {getColor} from '../../functions/colors'
import Circle from 'react-circle'

const Index = ({size, progress, color}) => {
  const {palettes} = useSelector(
    state => ({
      palettes: state.palettes,
    }),
    shallowEqual
  )
  const {background} = {...palettes}

  const progressColor = getColor(`bg-${color}-500`)
  let bgColor = getColor('bg-grey-200')
  if (background === 'bg-grey-800' || background === 'bg-grey-900') {
    bgColor = getColor('bg-grey-700')
  }
  if (background === 'bg-blue-700' || background === 'bg-blue-800') {
    bgColor = getColor('bg-blue-600')
  }
  const textColor = getColor('text-default')

  let s = 100
  let w = 40
  if (size === 'sm') {
    s = 60
    w = 30
  } else if (size === 'lg') {
    s = 140
  }
  return (
    <Circle
      progress={progress}
      progressColor={progressColor}
      bgColor={bgColor}
      textColor={textColor}
      showPercentageSymbol={true}
      textStyle={{font: 'normal 6rem Open Sans, Helvetica, sans-serif'}}
      size={s}
      lineWidth={w}
    />
  )
}

export default Index
