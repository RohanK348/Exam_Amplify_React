import React, {useState, useReducer} from 'react'
import faker from 'faker/locale/en_US'
import moment from 'moment'
import {FiX} from 'react-icons/fi'
import {Badge} from '../badges'

let n = 0
const Todo = () => {
  const initialState = Array.from(Array(5).keys()).map(i => {
    faker.locale = 'en_US'
    let date = moment()
      .subtract(i, 'days')
      .format('MMM DD')
    return {
      id: n++,
      title: faker.lorem.sentence(5),
      done: false,
      category: faker.random.arrayElement([
        'To do',
        'In Progress',
        'Code Review'
      ]),
      date: date,
      img: `/assets/faces/${faker.random.arrayElement([
        'm',
        'w'
      ])}${faker.random.number(9) + 1}.png`,
      badge: {
        title: faker.random.arrayElement([
          'low',
          'high',
          'medium',
          'important',
          'new'
        ]),
        color: faker.random.arrayElement([
          'bg-green-700 text-green-100',
          'bg-yellow-700 text-yellow-100',
          'bg-red-700 text-red-100',
          'bg-indigo-700 text-indigo-100',
          'bg-pink-700 text-pink-100',
          'bg-cyan-700 text-cyan-100'
        ])
      }
    }
  })

  const reducer = (state, action) => {
    switch (action.type) {
      case 'active':
        return state.filter(item => !item.done)
      case 'clear':
        return []
      case 'add':
        return [
          ...state,
          {
            title: action.title,
            done: false,
            id: n++,

            category: faker.random.arrayElement([
              'To do',
              'In Progress',
              'Code Review'
            ]),
            date: moment().format('MMM DD'),
            img: `/assets/faces/${faker.random.arrayElement([
              'm',
              'w'
            ])}${faker.random.number(9) + 1}.png`,
            badge: {
              title: faker.random.arrayElement([
                'low',
                'high',
                'medium',
                'important',
                'new'
              ]),
              color: faker.random.arrayElement([
                'bg-green-700 text-green-100',
                'bg-yellow-700 text-yellow-100',
                'bg-red-700 text-red-100',
                'bg-indigo-700 text-indigo-100',
                'bg-pink-700 text-pink-100',
                'bg-cyan-700 text-cyan-100'
              ])
            }
          }
        ]
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
      <>
        {state.map((item, i) => (
          <div
            className="flex flex-row items-center justify-start mb-2 lg:px-2"
            key={i}>
            <div className="form-element form-element-inline">
              <input
                name={i}
                type="checkbox"
                checked={item.done}
                onChange={e =>
                  dispatch({type: 'toggle', id: item.id, value: item.done})
                }
                className="form-checkbox text-blue-500 h-4 w-4"
              />
            </div>
            <div className="ml-4 flex items-start justify-start">
              <div className="flex-shrink-0 w-8">
                <img
                  src={item.img}
                  alt="media"
                  className="h-8 w-full rounded-full"
                />
              </div>
              <div className={`ml-2 ${item.done ? 'line-through' : ''}`}>
                <div className="text-sm font-bold">{item.title}</div>
                <div className="text-xs text-grey-500">{item.category}</div>
                <Badge size="sm" color={item.badge.color} rounded>
                  {item.badge.title}
                </Badge>
              </div>
            </div>
            <div className="ml-auto mr-1 lg:mr-2 whitespace-no-wrap text-xs text-grey-500">{item.date}</div>
            <button
              className="btn btn-circle"
              onClick={() => dispatch({type: 'remove', id: item.id})}>
              <FiX size={16} className="stroke-current text-grey-500" />
            </button>
          </div>
        ))}
      </>
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            name="todo"
            type="text"
            className="form-input text-sm bg-white dark:bg-grey-800 dark:border-grey-800"
            placeholder="Add new..."
          />
        </div>
      </form>
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-bold">
          {state.filter(item => !item.done).length} tasks left
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
