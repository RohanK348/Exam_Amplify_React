import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createSettingPrice, updateSettingPrice, deleteSettingPrice} from '../graphql/mutations'
import {getSettingPrice, listSettingPrices} from '../graphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function create(data) {
  try {
    await API.graphql(graphqlOperation(createSettingPrice, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    await API.graphql(graphqlOperation(updateSettingPrice, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteSettingPrice, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getSettingPrice, {id}))
    res = res?.data?.getSettingPrice
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listSettingPrices))
    res = res?.data?.listSettingPrices?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  create,
  update,
  remove,
  get,
  getAll,
}
