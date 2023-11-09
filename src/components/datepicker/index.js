import React from 'react'
import Datetime from 'react-datetime'
import './styles.css'

const Datepicker = (props) => {
  const {value, onChange, label} = props
  // const [value, setValue] = useState(null)
  // const onChange = v => {
  //   console.log(v.format())
  //   setValue(v)
  // }
  return (
    <div className="form-element">
      <div className="form-label">{label}</div>
      <Datetime
        value={new Date(value)}
        dateFormat="YYYY-MM-DD"
        timeFormat={false}
        input={true}
        inputProps={{
          className: 'form-input',
          placeholder: 'Select date'
        }}
        viewMode={'days'}
        onChange={(v) => onChange(v.format())}
      />
    </div>
  )
}

export default Datepicker
