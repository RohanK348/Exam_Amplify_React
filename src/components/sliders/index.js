import React, {useEffect, useState} from 'react'
import {random} from '../../functions/numbers'
import Slider, {SliderTooltip} from 'rc-slider'
import './styles.css'

const { createSliderWithTooltip, Handle } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} %`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};


export const DefaultSlider = (props) => {
  const {value, setValue, ...rest} = props
  const [cur, setCur] = useState(0)

  const handleChange = (v) => {
    setValue(v)
  }

  useEffect(() => {
    setCur(value)
  }, [value])
  return (
    <Slider
      {...rest}
      onChange={handleChange}
      value={cur}
      handle={handle}
    />
  )
}

export const RangeSlider = (props) => {
  const {range, setRange, ...rest} = props
  const [value, setValue] = useState([random(10, 30), random(60, 90)])
  const handleChange = (v) => {
    setValue(v)
    setRange(v)
  }
  useEffect(() => {
    setValue(range)
  }, [range])
  return (
    <Range
      {...rest}
      allowCross={false}
      value={value}
      onChange={handleChange}
      min={0}
      max={100}
      handle={handle}
    />
  )
}
