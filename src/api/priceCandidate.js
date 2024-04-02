import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createPriceCandidate, updatePriceCandidate, deletePriceCandidate} from '../graphql/mutations'
import {getPriceCandidate, listPriceCandidates} from '../graphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function create(data) {
  try {
    await API.graphql(graphqlOperation(createPriceCandidate, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}


async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deletePriceCandidate, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getPriceCandidate, {id}))
    res = res?.data?.getPriceCandidate
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listPriceCandidates))
    res = res?.data?.listPriceCandidates?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(listPriceCandidates, {filter: filter}))
    res = res?.data?.listPriceCandidates?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPaginationFilter(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(listPriceCandidates, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    console.log(res)
    res = res?.data?.listPriceCandidates?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(row, from) {
  try {
    let res = await API.graphql(graphqlOperation(listPriceCandidates, 
      {
        sort: {field: 'createdAt', direction: 'desc'}, 
        from: from, 
        limit: row,
      }))
    res = res?.data?.listPriceCandidates?.items
    
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
