import React from 'react'
import Validation from '../forms/validation'

const Settings = ({index, dispatch, setOpenTab, isLast}) => {
  const onSubmit = () => {
    dispatch({type: 'validate', index: index})
    dispatch({type: 'enable', index: index + 1})
    if (isLast) {
      setOpenTab(index)
    } else {
      setOpenTab(index + 1)
    }
  }
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
    }
  ]
  return (
    <div className="flex flex-col">
      <Validation items={items} onSubmit={onSubmit} />
    </div>
  )
}

export default Settings
