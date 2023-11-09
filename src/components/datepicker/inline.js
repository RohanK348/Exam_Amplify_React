import React, {useState} from 'react'
import Datetime from 'react-datetime'
import './styles.css'

const InlineDatepicker = () => {
  const [value, setValue] = useState(null)
  const onChange = v => {
    console.log(v.format())
    setValue(v)
  }
  return (
    <div className="block">
      <span className="text-sm text-default mb-2">
        {value && <span>Selected: {value.format('DD-MM-YYYY')}</span>}
      </span>
      <Datetime
        defaultValue={new Date()}
        open={true}
        dateFormat="DD-MM-YYYY"
        timeFormat={false}
        input={false}
        inputProps={{
          className: 'hidden'
        }}
        viewMode={'days'}
        onChange={onChange}
      />
    </div>
  )
}

export default InlineDatepicker
