import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createSubTopic, updateSubTopic, deleteSubTopic} from '../graphql/mutations'
import {getSubTopic, listSubTopics, searchParagraphs, searchQuestions, searchSubTopics} from '../graphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function create(data) {
  try {
    await API.graphql(graphqlOperation(createSubTopic, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    await API.graphql(graphqlOperation(updateSubTopic, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteSubTopic, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getSubTopic, {id}))
    res = res?.data?.getSubTopic
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listSubTopics))
    res = res?.data?.listSubTopics?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchSubTopics, {filter: filter}))
    res = res?.data?.searchSubTopics?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchSubTopics, 
      {
        sort: {field: 'createdAt', direction: 'desc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    res = res?.data?.searchSubTopics?.items
    res = await Promise.all(res.map(async (subtopic) => {
      let questions = await API.graphql(graphqlOperation(searchQuestions, {filter: {subTopicID: {eq: subtopic.id}}}))
      questions = questions?.data?.searchQuestions
      let paragraphs = await API.graphql(graphqlOperation(searchParagraphs, {filter: {subTopicID: {eq: subtopic.id}}}))
      paragraphs = paragraphs?.data?.searchParagraphs
      subtopic.questionNumber = questions?.total + paragraphs?.total
      return subtopic
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
