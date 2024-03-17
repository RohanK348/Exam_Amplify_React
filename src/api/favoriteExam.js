import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createFavoriteExam, deleteFavoriteExam} from '../graphql/mutations'
import {listFavoriteExams, searchFavoriteExams} from '../graphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)


async function remove(userId, examId) {
  try {
    let res = await API.graphql(graphqlOperation(listFavoriteExams, {filter: {userID: {eq: userId}, examID: {eq: examId}}}))
    res = res?.data?.listFavoriteExams?.items
    if (res.length === 0)
      return Promise.reject({message: 'do not exist'})
    await API.graphql(graphqlOperation(deleteFavoriteExam, 
      {input: {id: res[0].id}}))
    return Promise.resolve(examId)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchFavoriteExams, {filter: filter}))
    res = res?.data?.searchFavoriteExams?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchFavoriteExams, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    console.log(res)
    res = res?.data?.searchFavoriteExams?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  add,
  remove,
  getFilter,
  getByPagination,
}
