import React, {useState} from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import Validation from '../components/forms/validation'

const Index = () => {
  const [data1, onSubmit1] = useState(null)
  const [data2, onSubmit2] = useState(null)

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
      label: 'Message',
      error: {required: 'Please enter a message'},
      name: 'message',
      type: 'textarea',
      placeholder: 'Enter something...'
    },
    {
      label: 'Age',
      error: {
        required: 'Age is required',
        min: {
          value: 13,
          message: 'You must be 13 or older to create an account'
        },
        max: {
          value: 65,
          message: 'You must be 65 or younger to create an account'
        }
      },
      name: 'age',
      type: 'number',
      placeholder: ''
    },
    {
      label: 'Pattern',
      error: {
        required: 'Phone number is required',
        pattern: {
          value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
          message: 'Please enter a valid phone number'
        }
      },
      name: 'phone',
      type: 'text',
      placeholder: '###-###-####'
    },
    {
      label: 'Planet',
      error: {
        required: 'Planet is required',
        validate: (value) =>
          value === 'earth' || 'Only users from earth can create an account'
      },
      name: 'planet',
      type: 'text',
      placeholder: 'Type earth'
    },
    {
      label: 'Country',
      error: {
        required: 'Country is required',
        validate: (value) =>
          ['usa', 'canada', 'australia'].includes(value) ||
          'Country is required'
      },
      name: 'country',
      type: 'select',
      options: [
        {value: null, label: 'Select country'},
        {value: 'usa', label: 'USA'},
        {value: 'canada', label: 'Canada'},
        {value: 'australia', label: 'Australia'}
      ]
    },
    {
      label: 'Terms of service',
      error: {
        required: 'Please agree to our terms of service'
      },
      name: 'terms',
      type: 'checkbox',
      options: [{value: true, label: 'I agree to the terms of service'}]
    },
    {
      label: 'Gender',
      error: {
        required: 'Gender is required'
      },
      name: 'gender',
      type: 'radio',
      options: [
        {value: 'male', label: 'Male'},
        {value: 'female', label: 'Female'}
      ]
    }
  ]
  return (
    <>
      <SectionTitle title="Forms" subtitle="Validation" />

      <Widget
        title="Validation"
        description={<span>Default error messages</span>}>
        <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">
          <div className="w-full lg:w-1/2 lg:p-2">
            <Validation items={items} onSubmit={onSubmit1} alerts={false} />
          </div>
          <div className="w-full lg:w-1/2 lg:p-2">
            {data1 && <pre>{JSON.stringify(data1, null, 2)}</pre>}
          </div>
        </div>
      </Widget>
      <Widget
        title="Validation"
        description={
          <span>
            Use the <code>alerts</code> prop to show error messages in{' '}
            <code>Alert</code> components
          </span>
        }>
        <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">
          <div className="w-full lg:w-1/2 lg:p-2">
            <Validation items={items} onSubmit={onSubmit2} alerts={true} />
          </div>
          <div className="w-full lg:w-1/2 lg:p-2">
            {data2 && <pre>{JSON.stringify(data2, null, 2)}</pre>}
          </div>
        </div>
      </Widget>
    </>
  )
}
export default Index
