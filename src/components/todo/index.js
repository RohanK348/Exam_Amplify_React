import React, {useState, useReducer} from 'react'
import faker from 'faker/locale/en_US'
import {FiX} from 'react-icons/fi'

let n = 0
const Todo = () => {
  const initialState = Array.from(Array(15).keys()).map(i => {
    faker.locale = 'en_US'
    return {id: n++, title: faker.lorem.sentence(5), done: false}
  })

  const reducer = (state, action) => {
    switch (action.type) {
      case 'active':
        return state.filter(item => !item.done)
      case 'clear':
        return []
      case 'add':
        return [...state, {title: action.title, done: false, id: n++}]
      case 'remove':
        return state.filter(item => item.id !== action.id)
      case 'toggle':
        return state.map(item => {
          if (item.id === action.id) item['done'] = !action.value
          return item
        })
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const [value, setValue] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    dispatch({type: 'add', title: value})
    setValue('')
  }

  return (
    <div className="flex flex-col w-full">
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            name="todo"
            type="text"
            className="form-input"
            placeholder="Enter something..."
          />
        </div>
      </form>
      <>
        {state.map((item, i) => (
          <div className="flex flex-row items-center justify-start" key={i}>
            <label className="flex items-center justify-start space-x-2">
              <input
                name={i}
                type="checkbox"
                checked={item.done}
                onChange={e =>
                  dispatch({type: 'toggle', id: item.id, value: item.done})
                }
                className="form-checkbox text-blue-500 h-4 w-4"
              />
              <span className={`${item.done ? 'line-through' : ''}`}>
                {item.title}
              </span>
            </label>
            <button
              className="btn btn-default ml-auto"
              onClick={() => dispatch({type: 'remove', id: item.id})}>
              <FiX size={16} className="stroke-current text-grey-500" />
            </button>
          </div>
        ))}
      </>
      <div className="flex flex-row items-center justify-start">
        <div className="text-sm font-bold">
          {state.filter(item => !item.done).length} items left
        </div>
        {state.length > 0 && (
          <div className="flex flex-row items-center justify-end ml-auto space-x-2">
            {state.filter(item => item.done).length > 0 && (
              <button
                className="btn btn-default bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600"
                onClick={() => dispatch({type: 'active'})}>
                Remove completed
              </button>
            )}
            <button
              className="btn btn-default bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600"
              onClick={() => dispatch({type: 'clear'})}>
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Todo
