import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createCorporate, updateCorporate, deleteCorporate} from '../graphql/mutations'
import {getCorporate, listCorporates, searchCorporates, searchOpenings} from '../graphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function create(data) {
  try {
    let res = await API.graphql(graphqlOperation(createCorporate, 
      {input: data}))
    res = res?.data?.createCorporate
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    let res = await API.graphql(graphqlOperation(updateCorporate, 
      {input: data}))
    res = res?.data?.updateCorporate
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}


async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getCorporate, {id}))
    res = res?.data?.getCorporate
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listCorporates))
    res = res?.data?.listCorporates?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchCorporates, {filter: filter}))
    res = res?.data?.searchCorporates?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchCorporates, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
      }))
    res = res?.data?.searchCorporates?.items
    const current = new Date()
    res = await Promise.all(res.map( async (corporate) => {
      let openings = await API.graphql(graphqlOperation(searchOpenings, {filter: {
        corporateID: {eq: corporate.id}, 
        ExpiryDate: {gte: current}
      }}))
      openings = openings?.data?.searchOpenings
      if (openings?.items?.length === 0)
        corporate.openingNumber = 0
      else
        corporate.openingNumber = openings?.total
      return corporate
    }))
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
}
