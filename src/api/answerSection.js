import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {getAnswer, getAnswerSection} from '../graphql/queries'
import { updateAnswerSection } from '../graphql/mutations'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getAnswerSection, {id}))
    res = res?.data?.getAnswerSection
    const answers = await Promise.all(res.answer.map( async(item) => {
      const answer = await API.graphql(graphqlOperation(getAnswer, {id: item}))
      return answer?.data?.getAnswer
    }))
    res.answers = answers
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  get,
  update,
}
