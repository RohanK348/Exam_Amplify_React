import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {getAnswer, getAnswerSection} from '../graphql/queries'
import { updateAnswerSection } from '../graphql/mutations'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)


async function update(data) {
  try {
    await API.graphql(graphqlOperation(updateAnswerSection, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  get,
  update,
}
