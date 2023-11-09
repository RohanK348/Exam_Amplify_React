import React from 'react'
import PropTypes from 'prop-types'

export const TextInput = ({
  inline = false,
  label = 'Label',
  name = 'name',
  type = 'text',
  placeholder = 'Enter something...',
  message = 'This is a hint'
}) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">{label}</div>
    <input
      name={name}
      type={type}
      className="form-input"
      placeholder={placeholder}
    />
    <div className="form-hint">{message}</div>
  </div>
)
TextInput.propTypes = {
  inline: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  message: PropTypes.string
}

export const InvalidTextInput = ({
  inline = false,
  label = 'Label',
  name = 'name',
  type = 'text',
  placeholder = 'Enter something...',
  message = 'This is an error'
}) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">{label}</div>
    <input
      name={name}
      type={type}
      className="form-input form-input-invalid"
      placeholder={placeholder}
    />
    <div className="form-error">{message}</div>
  </div>
)
InvalidTextInput.propTypes = {
  inline: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  message: PropTypes.string
}

export const ValidTextInput = ({
  inline = false,
  label = 'Label',
  name = 'name',
  type = 'text',
  placeholder = 'Enter something...',
  message = 'This is ok'
}) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">{label}</div>
    <input
      name={name}
      type={type}
      className="form-input form-input-valid"
      placeholder={placeholder}
    />
    <div className="form-success">{message}</div>
  </div>
)
InvalidTextInput.propTypes = {
  inline: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  message: PropTypes.string
}

