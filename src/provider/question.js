import * as React from 'react'

const QuestionContext = React.createContext()

function questionReducer(state, action) {
  switch (action.type) {
    case 'SET': {
      return {...state, [action.name]: action.value}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const QuestionProvider = (props) => {
  const [question, dispatch] = React.useReducer(questionReducer, {})
  return <QuestionContext.Provider value={[question, dispatch]} {...props} />
}
  
export const useQuestion = () => {
  const context = React.useContext(QuestionContext)
  if (!context) {
    throw new Error('useQuestion must be used within a QuestionProvider')
  }
  return context
}