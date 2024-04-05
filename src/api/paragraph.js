import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createParagraph, updateParagraph, deleteParagraph} from '../graphql/mutations'
import {getParagraph, listParagraphs, searchQuestions} from '../graphql/queries'
import {searchParagraphs} from '../customgraphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function create(data) {
  try {
    let res = await API.graphql(graphqlOperation(createParagraph, 
      {input: data}))
    res = res?.data?.createParagraph

    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}


async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteParagraph, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getParagraph, {id}))
    res = res?.data?.getParagraph
    let questions = await API.graphql(graphqlOperation(searchQuestions, {filter: {paragraphID: {eq: res.id}}}))
    questions = questions?.data?.searchQuestions?.items
    res.questions = questions
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listParagraphs))
    res = res?.data?.listParagraphs?.items
    res = await Promise.all(res.map( async (paragraph) => {
      const questions = await API.graphql(graphqlOperation(searchQuestions, {filter: {paragraphID: {eq: paragraph.id}}}))
      paragraph.questions = questions?.data?.searchQuestions?.items
      return paragraph
    }))
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchParagraphs, {filter: filter}))
    res = res?.data?.searchParagraphs?.items
    res = await Promise.all(res.map( async (paragraph) => {
      const questions = await API.graphql(graphqlOperation(searchQuestions, {filter: {paragraphID: {eq: paragraph.id}}}))
      paragraph.questions = questions?.data?.searchQuestions?.items
      return paragraph
    }))
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPaginationFilter(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchParagraphs, 
      {
        sort: {field: 'createdAt', direction: 'desc'}, 
        from: from, 
        limit: row,
        filter: filter
      }))
    res = res?.data?.searchParagraphs?.items
    res = await Promise.all(res.map( async (paragraph) => {
      const questions = await API.graphql(graphqlOperation(searchQuestions, {filter: {paragraphID: {eq: paragraph.id}}}))
      paragraph.questions = questions?.data?.searchQuestions?.items
      return paragraph
    }))
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchParagraphs, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
      }))
    res = res?.data?.searchParagraphs?.items
    res = await Promise.all(res.map( async (paragraph) => {
      const questions = await API.graphql(graphqlOperation(searchQuestions, {filter: {paragraphID: {eq: paragraph.id}}}))
      paragraph.questions = questions?.data?.searchQuestions?.items
      return paragraph
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
  getByPaginationFilter,
}
