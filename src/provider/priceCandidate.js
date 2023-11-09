import * as React from 'react'

const PriceCandidateContext = React.createContext()

function priceCandidateReducer(state, action) {
  switch (action.type) {
    case 'SET': {
      return {...state, [action.name]: action.value}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const PriceCandidateProvider = (props) => {
  const [priceCandidate, dispatch] = React.useReducer(priceCandidateReducer, {})
  return <PriceCandidateContext.Provider value={[priceCandidate, dispatch]} {...props} />
}

export const usePriceCandidate = () => {
  const context = React.useContext(PriceCandidateContext)
  if (!context) {
    throw new Error('usePriceCandidate must be used within a PriceCandidateProvider')
  }
  return context
}