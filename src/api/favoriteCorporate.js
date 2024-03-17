import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createFavoriteCorporate, deleteFavoriteCorporate} from '../graphql/mutations'
import {getCorporate, listFavoriteCorporates, searchFavoriteCorporates} from '../graphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function add(userId, corporateId) {
  try {
    let res = await API.graphql(graphqlOperation(listFavoriteCorporates, {filter: {userID: {eq: userId}, corporateID: {eq: corporateId}}}))
    res = res?.data?.listFavoriteCorporates?.items
    if (res.length !== 0)
      return Promise.reject({message: 'already exist'})
    await API.graphql(graphqlOperation(createFavoriteCorporate, 
      {input: {userID: userId, corporateID: corporateId}}))
    
    return Promise.resolve(corporateId)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(userId, corporateId) {
  try {
    let res = await API.graphql(graphqlOperation(listFavoriteCorporates, {filter: {userID: {eq: userId}, corporateID: {eq: corporateId}}}))
    res = res?.data?.listFavoriteCorporates?.items
    if (res.length === 0)
      return Promise.reject({message: 'do not exist'})
    await API.graphql(graphqlOperation(deleteFavoriteCorporate, 
      {input: {id: res[0].id}}))
    return Promise.resolve(corporateId)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchFavoriteCorporates, {filter: filter}))
    res = res?.data?.searchFavoriteCorporates?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchFavoriteCorporates, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    console.log(res)
    res = res?.data?.searchFavoriteCorporates?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getCorporatesByPa(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchFavoriteCorporates, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    res = res?.data?.searchFavoriteCorporates?.items
    res = await Promise.all(res.map(async (favorite) => {
      let corporate = await API.graphql(graphqlOperation(getCorporate, {id: favorite.corporateID}))
      corporate = corporate?.data?.getCorporate
      return corporate
    }))
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  add,
  remove,
  getFilter,
  getByPagination,
  getCorporatesByPa,
}
