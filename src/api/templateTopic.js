import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createTemplateTopic, updateTemplateTopic, deleteTemplateTopic} from '../graphql/mutations'
import {getTemplateTopic, getTopic, listTemplateTopics, searchTemplateTopics} from '../graphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function create(data) {
  try {
    await API.graphql(graphqlOperation(createTemplateTopic, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    await API.graphql(graphqlOperation(updateTemplateTopic, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteTemplateTopic, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getTemplateTopic, {id}))
    res = res?.data?.getTemplateTopic
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listTemplateTopics))
    res = res?.data?.listTemplateTopics?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchTemplateTopics, {filter: filter}))
    res = res?.data?.searchTemplateTopics?.items
    res = await Promise.all(res.map( async (item) => {
      const topic = await API.graphql(graphqlOperation(getTopic, {id: item.topicID}))
      item.topic = topic?.data?.getTopic
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
