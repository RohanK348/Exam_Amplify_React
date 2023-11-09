export default function config(
  state = {
    name: 'Empowerr',
    description: 'React Tailwind CSS admin template',
    url: 'https://d-board.mobifica.com',
    layout: 'layout-1',
    collapsed: false,
    rightSidebar: false,
    backdrop: false
  },
  action
) {
  switch (action.type) {
    case 'SET_CONFIG':
      return {
        ...state,
        ...action.config
      }
    case 'SET_CONFIG_KEY':
      let {key, value} = {...action}
      return {
        ...state,
        [`${key}`]: value
      }
    default:
      return state
  }
}
