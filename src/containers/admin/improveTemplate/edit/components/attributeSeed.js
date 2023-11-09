import React, {useEffect, useState} from 'react'
import { DeleteOutline, AddCircleOutline } from "@material-ui/icons";

import { DefaultSlider } from "../../../../../components/sliders";
import { random } from "../../../../../functions/numbers";

const AttributeSeed = (props) => {
  const {title} = props
  const [value, setValue] = useState(random(10, 30));
  const [enable, setEnable] = useState(false)
  const [trackStyle, setTrackStyle] = useState({ backgroundColor: "#80ab19" });

  useEffect(() => {
    if (value < 0) {
      setTrackStyle({ backgroundColor: "#ef7228" });
    }
    else {
      setTrackStyle({ backgroundColor: "#80ab19" });
    }
  }, [value])
  return (
    <div className="my-1 p-3 border-solid rounded border border-slate-600">
      <div className="flex justify-between py-2 border-solid border-b border-slate-600">
        <div className="font-bold">{title}</div>
        <div>
          <DeleteOutline className="cursor-pointer mr-2" />
          <AddCircleOutline className="cursor-pointer" />
        </div>
      </div>
      <div className="py-4">
        <div className="flex flex-wrap w-full">
          <div className="w-full">
            <DefaultSlider
              className="slider-blue"
              min={-100}
              max={100}
              startPoint={0}
              trackStyle={trackStyle}
              value={value}
              setValue={setValue}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-center">-100%</div>
          <div className="text-center">100%</div>
        </div>
      </div>
    </div>
  );
}
export default AttributeSeed
