import React, {useReducer} from 'react'

const Checkboxes = () => {
  const items = [
    {
      color: 'bg-red-500',
      title: 'Red',
      value: 0,
      checked: false
    },
    {
      color: 'bg-blue-500',
      title: 'Blue',
      value: 1,
      checked: false
    },
    {
      color: 'bg-green-500',
      title: 'Green',
      value: 2,
      checked: false
    },
    {
      color: 'bg-amber-500',
      title: 'Yellow',
      value: 3,
      checked: false
    },
    {
      color: 'bg-purple-500',
      title: 'Purple',
      value: 4,
      checked: false
    }
  ]

  const reducer = (state, action) => {
    switch (action.type) {
      case 'toggle':
        return state.map((item) => {
          if (item.value === action.value) item['checked'] = !action.checked
          return item
        })
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, items)

  return (
    <div className="flex flex-col w-full">
      {state.map((item, i) => (
        <div className="flex flex-row items-center justify-start p-1" key={i}>
          <label className="flex items-center justify-start space-x-2">
            <input
              name={i}
              type="checkbox"
              checked={item.checked}
              onChange={(e) => dispatch({type: 'toggle', ...item})}
              className="form-checkbox text-blue-500 h-4 w-4"
            />
            <button className={`h-4 w-4 rounded-full ${item.color}`}></button>
            <span>{item.title}</span>
          </label>
        </div>
      ))}
    </div>
  )
}

export default Checkboxes
