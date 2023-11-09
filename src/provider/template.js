import * as React from 'react'

const TemplateContext = React.createContext()

function templateReducer(state, action) {
  switch (action.type) {
    case 'SET': {
      return {...state, [action.name]: action.value}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const TemplateProvider = (props) => {
  const [template, dispatch] = React.useReducer(templateReducer, {})
  return <TemplateContext.Provider value={[template, dispatch]} {...props} />
}

export const useTemplate = () => {
  const context = React.useContext(TemplateContext)
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider')
  }
  return context
}