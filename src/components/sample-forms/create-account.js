import React, {useState} from 'react'
import Validation from '../forms/validation'
import Alert from '../alerts'

const CreateAccount = ({message = null}) => {
  const [data, onSubmit] = useState(null)
  let items = [
    {
      label: 'Username',
      error: {required: 'Please enter a valid username'},
      name: 'username',
      type: 'text',
      placeholder: 'Enter you username'
    },
    {
      label: 'Email',
      error: {required: 'Please enter a valid email'},
      name: 'email',
      type: 'email',
      placeholder: 'Enter you email'
    },
    {
      label: 'Password',
      error: {
        required: 'Password is required',
        minLength: {
          value: 4,
          message: 'Your password should have at least 4 characters'
        },
        maxLength: {
          value: 8,
          message: 'Your password should have no more than 8 characters'
        }
      },
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password'
    },
    {
      label: null,
      error: {
        required: 'Please agree to our terms of service'
      },
      name: 'terms',
      type: 'checkbox',
      options: [{value: true, label: 'I agree to the terms of service'}]
    },
    {
      label: null,
      error: {
        required: 'Please agree to our privacy policy'
      },
      name: 'privacy-policy',
      type: 'checkbox',
      options: [{value: true, label: 'I agree to the privacy policy'}]
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

export default CreateAccount
