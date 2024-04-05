import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createOption, updateOption, deleteOption} from '../graphql/mutations'
import {getOption, listOptions, searchOptions} from '../graphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function create(data) {
  try {
    await API.graphql(graphqlOperation(createOption, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    await API.graphql(graphqlOperation(updateOption, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteOption, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getOption, {id}))
    res = res?.data?.getOption
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listOptions))
    res = res?.data?.listOptions?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchOptions, {filter: filter}))
    res = res?.data?.searchOptions?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function replaceTrue(from, to) {
  try {
    await API.graphql(graphqlOperation(updateOption, 
      {input: {id: from, isTrue: false}}))
    await API.graphql(graphqlOperation(updateOption, 
      {input: {id: to, isTrue: true}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  create,
  update,
  replaceTrue,
  remove,
  get,
  getAll,
  getFilter,
}
