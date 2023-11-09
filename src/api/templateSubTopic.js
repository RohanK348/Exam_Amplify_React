import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createTemplateSubTopic, updateTemplateSubTopic, deleteTemplateSubTopic} from '../graphql/mutations'
import {getSubTopic, getTemplateSubTopic, listTemplateSubTopics, searchTemplateSubTopics} from '../graphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function create(data) {
  try {
    await API.graphql(graphqlOperation(createTemplateSubTopic, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    await API.graphql(graphqlOperation(updateTemplateSubTopic, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteTemplateSubTopic, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getTemplateSubTopic, {id}))
    res = res?.data?.getTemplateSubTopic
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listTemplateSubTopics))
    res = res?.data?.listTemplateSubTopics?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchTemplateSubTopics, {filter: filter}))
    res = res?.data?.searchTemplateSubTopics?.items
    res = await Promise.all(res.map( async (item) => {
      const subTopic = await API.graphql(graphqlOperation(getSubTopic, {id: item.subTopicID}))
      item.subTopic = subTopic?.data?.getSubTopic
      return item
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
}
