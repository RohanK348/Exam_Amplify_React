import React, {useState} from 'react'
import Validation from '../forms/validation'
import Alert from '../alerts'

const AccountSettings = ({message = null}) => {
  const [data, onSubmit] = useState(null)
  let items = [
    {
      label: 'First name',
      error: {required: 'Please enter a valid first name'},
      name: 'first-name',
      type: 'text',
      placeholder: 'Enter you first name'
    },
    {
      label: 'Last name',
      error: {required: 'Please enter a valid last name'},
      name: 'last-name',
      type: 'text',
      placeholder: 'Enter you last name'
    },
    {
      label: 'Email address',
      error: {required: 'Please enter a valid email address'},
      name: 'email',
      type: 'email',
      placeholder: 'Enter you email address'
    },
    {
      label: 'Company',
      error: {required: 'Please enter a valid company'},
      name: 'company',
      type: 'text',
      placeholder: 'Enter you company'
    },
    {
      label: 'Position',
      error: {required: 'Please enter a valid position'},
      name: 'position',
      type: 'text',
      placeholder: 'Enter you position'
    },
    {
      label: 'Language',
      error: {
        required: 'Language is required',
        validate: value =>
          ['english', 'spanish', 'portuguese'].includes(value) ||
          'Language is required'
      },
      name: 'language',
      type: 'select',
      options: [
        {value: null, label: 'Select language'},
        {value: 'english', label: 'English'},
        {value: 'spanish', label: 'Spanish'},
        {value: 'portuguese', label: 'Portuguese'}
      ]
    }
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

export default AccountSettings
