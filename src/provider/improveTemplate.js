import * as React from 'react'

const ImproveTemplateContext = React.createContext()

function improveTemplateReducer(state, action) {
  switch (action.type) {
    case 'SET': {
      return {...state, [action.name]: action.value}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const ImproveTemplateProvider = (props) => {
  const [improveTemplate, dispatch] = React.useReducer(improveTemplateReducer, {})
  return <ImproveTemplateContext.Provider value={[improveTemplate, dispatch]} {...props} />
}
  
export const useImproveTemplate = () => {
  const context = React.useContext(ImproveTemplateContext)
  if (!context) {
    throw new Error('useImproveTemplate must be used within a ImproveTemplateProvider')
  }
  return context
}