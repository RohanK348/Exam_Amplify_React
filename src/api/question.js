import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createQuestion, updateQuestion, deleteQuestion, createOption, updateOption, deleteOption} from '../graphql/mutations'
import {getQuestion, listQuestions, searchOptions} from '../graphql/queries'
import {searchQuestions} from '../customgraphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function create(data) {
  try {
    let res = await API.graphql(graphqlOperation(createQuestion, 
      {input: data}))
    res = res?.data?.createQuestion

    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function createWithOptions(data, options) {
  try {
    console.log('options', options)
    let res = await API.graphql(graphqlOperation(createQuestion, 
      {input: data}))
    res = res?.data?.createQuestion
    await Promise.all(options.map( async (option) => {
      option.questionID = res.id
      await API.graphql(graphqlOperation(createOption, {
        input: option
      }))
    }))
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    await API.graphql(graphqlOperation(updateQuestion, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function updateWithOptions(data, options) {
  try {
    await API.graphql(graphqlOperation(updateQuestion, 
      {input: data}))
    await Promise.all(options.map( async (option) => {
      await API.graphql(graphqlOperation(updateOption, {
        input: option
      }))
    }))

    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteQuestion, 
      {input: {id: id}}))
    let options = await API.graphql(graphqlOperation(searchOptions, {
      filter: {questionID: {eq: id}}
    }))
    options = options?.data?.searchOptions?.items
    await Promise.all(options.map( async (option) => {
      await API.graphql(graphqlOperation(deleteOption, {
        input: {id: option.id}
      }))
    }))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getQuestion, {id}))
    res = res?.data?.getQuestion
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listQuestions))
    res = res?.data?.listQuestions?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchQuestions, {filter: filter}))
    res = res?.data?.searchQuestions?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchQuestions, 
      {
        sort: {field: 'createdAt', direction: 'desc'}, 
        from: from, 
        limit: row,
        filter: filter
      }))
    res = res?.data?.searchQuestions?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  create,
  createWithOptions,
  update,
  updateWithOptions,
  remove,
  get,
  getAll,
  getFilter,
  getByPagination,
}
