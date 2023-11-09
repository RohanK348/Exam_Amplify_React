import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createTrain, updateTrain, deleteTrain} from '../graphql/mutations'
import {getTrain, listTrains, searchTrains} from '../graphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function create(data) {
  try {
    await API.graphql(graphqlOperation(createTrain, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    await API.graphql(graphqlOperation(updateTrain, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteTrain, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getTrain, {id}))
    res = res?.data?.getTrain
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listTrains))
    res = res?.data?.listTrains?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchTrains, {filter: filter}))
    res = res?.data?.searchTrains?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPaginationFilter(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchTrains, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    res = res?.data?.searchTrains?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchTrains, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
      }))
    res = res?.data?.searchTrains?.items
    
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
  getByPagination,
  getByPaginationFilter,
}
