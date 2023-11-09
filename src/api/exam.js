import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createExam, updateExam, deleteExam, createNotification} from '../graphql/mutations'
import {getExam, listExams, searchExamResults, searchExams} from '../graphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function create(data) {
  try {
    let res = await API.graphql(graphqlOperation(createExam, 
      {input: data}))
    res = res?.data?.createExam
    if (data.type === 'PRIVATE' && data.students) {
      await Promise.all(data?.students?.map( async (userId) => {
        await API.graphql(graphqlOperation(createNotification, 
          {input: {
            name: 'Private Exam',
            description: `you are invited in the exam ${data.name}`,
            userID: userId,
          }}))
      }))
    }
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    await API.graphql(graphqlOperation(updateExam, 
      {input: data}))
    if (data.type === 'PRIVATE' && data.students) {
      await Promise.all(data?.students?.map( async (userId) => {
        await API.graphql(graphqlOperation(createNotification, 
          {input: {
            name: 'Private Exam',
            description: `you are invited in the exam ${data.name}`,
            userID: userId,
          }}))
      }))
    }
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteExam, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getExam, {id}))
    res = res?.data?.getExam
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listExams))
    res = res?.data?.listExams?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchExams, {filter: filter}))
    res = res?.data?.searchExams?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchExams, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    res = res?.data?.searchExams?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getWithoutComplete(filter, row, from, userId) {
  try {
    let res = await API.graphql(graphqlOperation(searchExams, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    res = res?.data?.searchExams?.items
    res = await Promise.all(res.map( async (exam) => {
      let examResult = await API.graphql(graphqlOperation(searchExamResults, {filter: {userID: {eq: userId}, examID: {eq: exam.id}}}))
      examResult = examResult?.data?.searchExamResults?.items
      if (examResult.length === 0) 
        exam.complete = false
      else
        exam.complete = true
      return exam
    }))
    res = res.filter((exam) => !exam.complete)
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getNumberWithoutComplete(userId) {
  try {
    let exams = await API.graphql(graphqlOperation(searchExams, 
      {
        from: 0, 
        limit: 100,
        filter: {isTrain: {eq: false}}
      }))
    exams = exams?.data?.searchExams
    let examResults = await API.graphql(graphqlOperation(searchExamResults, {filter: {userID: {eq: userId}, isTrain: {eq: false}}}))
    examResults = examResults?.data?.searchExamResults
    const number = exams?.total - examResults?.total
    
    return Promise.resolve(number)
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
  getWithoutComplete,
  getNumberWithoutComplete,
}
