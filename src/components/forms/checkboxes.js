import React from 'react'
import PropTypes from 'prop-types'

export const Checkbox = ({
  inline = false,
  label = 'Label',
  message = 'This is a hint',
  items = [
    {value: 0, name: 'checkbox1', label: 'Option 1'},
    {value: 1, name: 'checkbox1', label: 'Option 2'}
  ]
}) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">{label}</div>
    <div className="flex items-center justify-start space-x-2">
      {items.map((item, i) => (
        <div className="inline-flex items-center space-x-2" key={i}>
          <input
            type="checkbox"
            value={item.value}
            name={item.name}
            className="form-checkbox text-blue-500 h-4 w-4"
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
    <div className="form-hint">{message}</div>
  </div>
)
Checkbox.propTypes = {
  inline: PropTypes.bool,
  label: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      name: PropTypes.string,
      label: PropTypes.string
    })
  ),
  message: PropTypes.string
}

export const InvalidCheckbox = ({
  inline = false,
  label = 'Label',
  message = 'This is a message',
  items = [
    {value: 0, name: 'checkbox1', label: 'Option 1'},
    {value: 1, name: 'checkbox1', label: 'Option 2'}
  ]
}) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">{label}</div>

    <div className="flex items-center justify-start space-x-2">
      {items.map((item, i) => (
        <div className="inline-flex items-center space-x-2" key={i}>
          <input
            type="checkbox"
            value={item.value}
            name={item.name}
            className="form-checkbox form-checkbox-invalid text-red-500 h-4 w-4"
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
    <div className="form-error">{message}</div>
  </div>
)
InvalidCheckbox.propTypes = {
  inline: PropTypes.bool,
  label: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      name: PropTypes.string,
      label: PropTypes.string
    })
  ),
  message: PropTypes.string
}

export const ValidCheckbox = ({
  inline = false,
  label = 'Label',
  message = 'This is a message',
  items = [
    {value: 0, name: 'checkbox1', label: 'Option 1'},
    {value: 1, name: 'checkbox1', label: 'Option 2'}
  ]
}) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">{label}</div>

    <div className="flex items-center justify-start space-x-2">
      {items.map((item, i) => (
        <div className="inline-flex items-center space-x-2" key={i}>
          <input
            type="checkbox"
            value={item.value}
            name={item.name}
            className="form-checkbox form-checkbox-valid text-green-500 h-4 w-4"
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
    <div className="form-success">{message}</div>
  </div>
)
ValidCheckbox.propTypes = {
  inline: PropTypes.bool,
  label: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      name: PropTypes.string,
      label: PropTypes.string
    })
  ),
  message: PropTypes.string
}
