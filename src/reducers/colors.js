const initialState = [
  'transparent',
  'black',
  'white',
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'grey',
  'blue-grey'
]

export default function colors(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
