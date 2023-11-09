import Amplify, { API } from 'aws-amplify'

import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function getServerTime() {
  try {
    const apiName = "examApi"
    const path = "/evaluation"
    const myInit = {
      headers: {}, // OPTIONAL
      response: true,
    };
    const result = await API.get(apiName, path, myInit)
    return Promise.resolve(result)
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  getServerTime
}
