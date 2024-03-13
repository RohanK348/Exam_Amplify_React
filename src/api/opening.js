import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createOpening, updateOpening, deleteOpening} from '../graphql/mutations'
import {getOpening, listOpenings, searchExams} from '../graphql/queries'
import {searchOpenings} from '../customgraphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function create(data) {
  try {
    let res = await API.graphql(graphqlOperation(createOpening, 
      {input: data}))
    res = res?.data?.createOpening
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    await API.graphql(graphqlOperation(updateOpening, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteOpening, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getOpening, {id}))
    res = res?.data?.getOpening
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listOpenings))
    res = res?.data?.listOpenings?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchOpenings, {filter: filter}))
    res = res?.data?.searchOpenings?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchOpenings, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    res = res?.data?.searchOpenings?.items
    res = await Promise.all(res.map(async (opening) => {
      let exams = await API.graphql(graphqlOperation(searchExams, {filter: {openingID: {eq: opening.id}}}))
      exams = exams?.data?.searchExams
      opening.examNumber = exams?.total
      return opening
    }))
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getNumber(corporateId) {
  try {
    let res = await API.graphql(graphqlOperation(searchOpenings, {
      filter: {corporateID: {eq: corporateId}}
    }))
    res = res?.data?.searchOpenings
    return Promise.resolve(res.total)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getExamNumber(corporateId) {
  try {
    let openings = await API.graphql(graphqlOperation(searchOpenings, {
      filter: {corporateID: {eq: corporateId}}
    }))
    openings = openings?.data?.searchOpenings?.items
    let examNumber = 0
    await Promise.all(openings.map( async (opening) => {
      let exams = await API.graphql(graphqlOperation(searchExams, {
        filter: {openingID: {eq: opening.id}}
      }))
      examNumber = examNumber + exams?.data?.searchExams?.total
    }))
    return Promise.resolve(examNumber)
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
  getNumber,
  getExamNumber,
}
