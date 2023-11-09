import React, {useState} from 'react'
import Validation from '../forms/validation'
import Alert from '../alerts'

const EmailPreferences = ({message = null}) => {
  const [data, onSubmit] = useState(null)
  let items = [
    {
      label: 'Current email',
      error: {required: 'Please enter a valid email'},
      name: 'email',
      type: 'email',
      placeholder: 'Enter you current email address'
    },
    {
      label: 'New email',
      error: {required: 'Please enter a valid email'},
      name: 'email',
      type: 'email',
      placeholder: 'Enter you new email address'
    },
    {
      label: 'Daily updates',
      error: {
        required: 'Daily updates is required'
      },
      name: 'daily-updates',
      type: 'radio',
      options: [
        {value: 'yes', label: 'Yes'},
        {value: 'no', label: 'No'}
      ]
    },
    {
      label: 'Weekly updates',
      error: {
        required: 'Weekly updates is required'
      },
      name: 'weekle-updates',
      type: 'radio',
      options: [
        {value: 'yes', label: 'Yes'},
        {value: 'no', label: 'No'}
      ]
    },
  ]
  return (
    <>
      <div className="flex flex-col">
        {data && message && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-green-500 text-green-500"
              borderLeft
              raised>
              {message}
            </Alert>
          </div>
        )}
        <Validation items={items} onSubmit={onSubmit} />
      </div>
    </>
  )
}

export default EmailPreferences
