import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createEducation, updateEducation, deleteEducation} from '../graphql/mutations'
import {getEducation, listEducations, searchEducations} from '../graphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function update(data) {
  try {
    await API.graphql(graphqlOperation(updateEducation, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteEducation, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getEducation, {id}))
    res = res?.data?.getEducation
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listEducations))
    res = res?.data?.listEducations?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchEducations, {filter: filter}))
    res = res?.data?.searchEducations?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPaginationFilter(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchEducations, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    console.log(res)
    res = res?.data?.searchEducations?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchEducations, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
      }))
    res = res?.data?.searchEducations?.items
    
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
