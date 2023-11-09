import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createUser, updateUser, deleteUser} from '../graphql/mutations'
import {getUser, listUsers} from '../graphql/queries'
import {searchUsers} from '../customgraphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function create(data) {
  try {
    await API.graphql(graphqlOperation(createUser, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    let res = await API.graphql(graphqlOperation(updateUser, 
      {input: data}))
    res = res?.data?.updateUser
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function updateBlocks(users) {
  try {
    await Promise.all(users.map( async (user) => {
      let tmp = {}
      tmp.id = user.id
      tmp.isBlock = user.isBlock
      await API.graphql(graphqlOperation(updateUser, {input: tmp}))
    }))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteUser, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getUser, {id}))
    res = res?.data?.getUser
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listUsers))
    res = res?.data?.listUsers?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchUsers, {filter: filter}))
    res = res?.data?.searchUsers?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPaginationFilter(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchUsers, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    res = res?.data?.searchUsers?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  create,
  update,
  updateBlocks,
  remove,
  get,
  getAll,
  getFilter,
  getByPaginationFilter,
}
