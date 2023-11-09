import React, {useState} from 'react'
import Validation from '../forms/validation'
import Alert from '../alerts'

const ResetPassword = ({message = null}) => {
  const [data, onSubmit] = useState(null)
  let items = [
    {
      label: 'New password',
      error: {
        required: 'New password is required',
        minLength: {
          value: 4,
          message: 'Your password should have at least 4 characters'
        },
        maxLength: {
          value: 8,
          message: 'Your password should have no more than 8 characters'
        }
      },
      name: 'new-password',
      type: 'password',
      placeholder: 'Enter your new password'
    },
    {
      label: 'Confirm new password',
      error: {
        required: 'Password confirmation is required',
        minLength: {
          value: 4,
          message: 'Your password should have at least 4 characters'
        },
        maxLength: {
          value: 8,
          message: 'Your password should have no more than 8 characters'
        }
      },
      name: 'confirm-new-password',
      type: 'password',
      placeholder: 'Enter your new password confirmation'
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

export default ResetPassword
