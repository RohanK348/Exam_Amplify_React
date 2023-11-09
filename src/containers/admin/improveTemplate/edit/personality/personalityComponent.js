import React, {useState, useEffect} from 'react'

import { RangeSlider } from "../../../../../components/sliders";
import { useImproveTemplate } from '../../../../../provider/improveTemplate';
import Delete from './delete'

const Personality = (props) => {
  const { item, index } = props
  const [improveTemplate, dispatch] = useImproveTemplate()
  const [range, setRange] = useState([0, 0]);

  const handleChange = (_range) => {
    setRange(_range)
    const personalities = improveTemplate.personalities
    if (personalities.length <= index)
      return
    personalities[index].min = _range[0]
    personalities[index].max = _range[1]
    dispatch({ type: 'SET', name: personalities, value: personalities })
  }

  useEffect(() => {
    setRange([item.min, item.max])
  }, [item])
  return (
    <div className="my-1 p-3 border-solid rounded border border-slate-600">
      <div className="flex justify-between">
        <div className="font-bold">{item.name}</div>
        <div>
          <Delete index={index} />
        </div>
      </div>
      <div>
        <div className="flex flex-wrap w-full pt-2">
          <div className="w-full">
            <RangeSlider className="slider-blue" range={range} setRange={handleChange} />
          </div>
        </div>
        <div className="grid grid-cols-5 pb-6">
          <div className="text-center border-solid border-r border-grey-400">Very Low</div>
          <div className="text-center border-solid border-r border-grey-400">Low</div>
          <div className="text-center border-solid border-r border-grey-400">Average</div>
          <div className="text-center border-solid border-r border-grey-400">High</div>
          <div className="text-center">Very High</div>
        </div>
      </div>
    </div>
  )
}
export default Personality
