import React, {useEffect, useState} from 'react'

import { DefaultSlider } from "../../../../components/sliders";

const Attribute = (props) => {
  const { title, isCheck, trackStyle, initValue, editable, onChange, ...rest } = props;
  const [value, setValue] = useState(0);
  const [enable, setEnable] = useState(false)

  const handleChangeValue = (_value) => {
    onChange({value: _value})
  }
  const handleChangeEditable = (e) => {
    setEnable(e.target.checked)
    onChange({editable: e.target.checked})
  }
  useEffect(() => {
    setValue(initValue)
    setEnable(editable)
  }, [initValue, editable])
  return (
    <div className="my-1 p-3 border-solid rounded border border-slate-600">
      {isCheck && (
        <div className="float-right">
          <div className="inline-flex items-center space-x-2">
            <span>Editable</span>
            <input
              type="checkbox"
              checked={enable}
              className="form-checkbox form-checkbox-valid text-grey-800 h-4 w-4"
              onChange={handleChangeEditable}
            />
          </div>
        </div>
      )}
      <div className="font-bold pt-6">{title}</div>
      <div>
        <div className="flex flex-wrap w-full pt-2">
          <div className="w-full">
            <DefaultSlider
              {...rest}
              className="slider-blue"
              min={0}
              max={100}
              trackStyle={trackStyle}
              value={value}
              setValue={handleChangeValue}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-center">0</div>
          <div className="text-center">100%</div>
        </div>
      </div>
    </div>
  );
}
export default Attribute
