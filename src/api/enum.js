import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {listEnums} from '../customgraphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)


async function getOptionTypes() {
  try {
    let res = await API.graphql(graphqlOperation(listEnums, {name: 'OptionType'}))
    res = res?.data?.__type?.enumValues
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getExamTypes() {
  try {
    let res = await API.graphql(graphqlOperation(listEnums, {name: 'ExamType'}))
    res = res?.data?.__type?.enumValues
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getExamMethods() {
  try {
    let res = await API.graphql(graphqlOperation(listEnums, {name: 'ExamMethod'}))
    res = res?.data?.__type?.enumValues
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  getComplexityTypes,
  getOptionTypes,
  getExamTypes,
  getExamMethods,
}
