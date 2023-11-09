export const initialState = [
  {index: 0, title: 'Profile', disabled: false, valid: false},
  {index: 1, title: 'Settings', disabled: true, valid: false},
  {index: 2, title: 'Options', disabled: true, valid: false},
  {index: 3, title: 'Finish', disabled: true, valid: false},
]

export const reducer = (state, action) => {
  switch (action.type) {
    case 'disable':
      return state.map(step => {
        if (action.index === step.index) {
          step['disabled'] = true
        }
        return step
      })
    case 'enable':
      return state.map(step => {
        if (action.index === step.index) {
          step['disabled'] = false
        }
        return step
      })
    case 'validate':
      return state.map(step => {
        if (action.index === step.index) {
          step['valid'] = true
        }
        return step
      })
    default:
      throw new Error()
  }
}

