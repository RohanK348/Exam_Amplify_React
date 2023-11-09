import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createProfile, updateProfile, deleteProfile} from '../graphql/mutations'
import {getProfile, listProfiles, searchProfiles} from '../graphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function create(data) {
  try {
    let res = await API.graphql(graphqlOperation(createProfile, 
      {input: data}))
    res = res?.data?.createProfile
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    let res = await API.graphql(graphqlOperation(updateProfile, 
      {input: data}))
    res = res?.data?.updateProfile
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteProfile, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getProfile, {id}))
    res = res?.data?.getProfile
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listProfiles))
    res = res?.data?.listProfiles?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchProfiles, {filter: filter}))
    res = res?.data?.searchProfiles?.items
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
  getFilter,
}
