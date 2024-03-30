import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createPriceCorporate, updatePriceCorporate, deletePriceCorporate} from '../graphql/mutations'
import {getPriceCorporate, listPriceCorporates} from '../graphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function create(data) {
  try {
    await API.graphql(graphqlOperation(createPriceCorporate, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    await API.graphql(graphqlOperation(updatePriceCorporate, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deletePriceCorporate, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getPriceCorporate, {id}))
    res = res?.data?.getPriceCorporate
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listPriceCorporates))
    res = res?.data?.listPriceCorporates?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(listPriceCorporates, {filter: filter}))
    res = res?.data?.listPriceCorporates?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPaginationFilter(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(listPriceCorporates, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    console.log(res)
    res = res?.data?.listPriceCorporates?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(row, from) {
  try {
    let res = await API.graphql(graphqlOperation(listPriceCorporates, 
      {
        sort: {field: 'createdAt', direction: 'desc'}, 
        from: from, 
        limit: row,
      }))
    res = res?.data?.listPriceCorporates?.items
    
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
