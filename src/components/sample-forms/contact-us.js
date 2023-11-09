import React, {useState} from 'react'
import Validation from '../forms/validation'
import Alert from '../alerts'

const ContactUs = ({message = null}) => {
  const [data, onSubmit] = useState(null)
  let items = [
    {
      label: 'Name',
      error: {required: 'Please enter your name'},
      name: 'name',
      type: 'text',
      placeholder: 'Enter you name'
    },
    {
      label: 'Email',
      error: {required: 'Please enter a valid email'},
      name: 'email',
      type: 'email',
      placeholder: 'Enter you email'
    },
    {
      label: 'Message',
      error: {required: 'Please enter a message'},
      name: 'message',
      type: 'textarea',
      placeholder: 'Enter something...'
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

export default ContactUs
