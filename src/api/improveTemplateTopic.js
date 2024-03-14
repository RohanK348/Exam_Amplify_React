import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createImproveTemplateTopic, updateImproveTemplateTopic, deleteImproveTemplateTopic} from '../graphql/mutations'
import {getImproveTemplateTopic, listImproveTemplateTopics, searchImproveTemplateTopics} from '../graphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)


async function update(data) {
  try {
    await API.graphql(graphqlOperation(updateImproveTemplateTopic, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteImproveTemplateTopic, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getImproveTemplateTopic, {id}))
    res = res?.data?.getImproveTemplateTopic
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listImproveTemplateTopics))
    res = res?.data?.listImproveTemplateTopics?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchImproveTemplateTopics, {filter: filter}))
    res = res?.data?.searchImproveTemplateTopics?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPaginationFilter(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchImproveTemplateTopics, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    res = res?.data?.searchImproveTemplateTopics?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchImproveTemplateTopics, 
      {
        sort: {field: 'createdAt', direction: 'desc'}, 
        from: from, 
        limit: row,
      }))
    res = res?.data?.searchImproveTemplateTopics?.items
    
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
