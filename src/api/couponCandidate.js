import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createCouponCandidate, updateCouponCandidate, deleteCouponCandidate} from '../graphql/mutations'
import {getCouponCandidate, listCouponCandidates, searchCouponCandidates} from '../graphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function create(data) {
  try {
    await API.graphql(graphqlOperation(createCouponCandidate, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    await API.graphql(graphqlOperation(updateCouponCandidate, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteCouponCandidate, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function attach(priceId, codes, isFree, discount) {
  try {
    await Promise.all(codes.map(async (code) => {
      await API.graphql(graphqlOperation(createCouponCandidate, {input: {
        priceID: priceId,
        code: code,
        isFree: isFree,
        percentage: discount,
      }}))
    }))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getCouponCandidate, {id}))
    res = res?.data?.getCouponCandidate
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listCouponCandidates))
    res = res?.data?.listCouponCandidates?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchCouponCandidates, {filter: filter}))
    console.log(res)
    res = res?.data?.searchCouponCandidates?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPaginationFilter(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchCouponCandidates, 
      {
        from: from, 
        limit: row,
        filter: filter,
      }))
    res = res?.data?.searchCouponCandidates?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchCouponCandidates, 
      {
        from: from, 
        limit: row,
      }))
    res = res?.data?.searchCouponCandidates?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  create,
  update,
  remove,
  attach,
  get,
  getAll,
  getFilter,
  getByPagination,
  getByPaginationFilter,
}
