export default function dashboard(
  state = {
    value: 0,
    conversions: {}
  },
  action
) {
  switch (action.type) {
    case 'SET_DASHBOARD':
      let {key, value} = {...action}
      return {
        ...state,
        [`${key}`]: value
      }
    default:
      return state
  }
}
