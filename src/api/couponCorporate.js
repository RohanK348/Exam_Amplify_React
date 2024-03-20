import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createCouponCorporate, updateCouponCorporate, deleteCouponCorporate} from '../graphql/mutations'
import {getCouponCorporate, listCouponCorporates, searchCouponCorporates} from '../graphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)


async function update(data) {
  try {
    await API.graphql(graphqlOperation(updateCouponCorporate, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteCouponCorporate, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function attach(priceId, codes, isFree, discount) {
  try {
    await Promise.all(codes.map(async (code) => {
      await API.graphql(graphqlOperation(createCouponCorporate, {input: {
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
    let res = await API.graphql(graphqlOperation(getCouponCorporate, {id}))
    res = res?.data?.getCouponCorporate
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listCouponCorporates))
    res = res?.data?.listCouponCorporates?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchCouponCorporates, {filter: filter}))
    res = res?.data?.searchCouponCorporates?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPaginationFilter(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchCouponCorporates, 
      {
        from: from, 
        limit: row,
        filter: filter,
      }))
    res = res?.data?.searchCouponCorporates?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchCouponCorporates, 
      {
        from: from, 
        limit: row,
      }))
    res = res?.data?.searchCouponCorporates?.items
    
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
