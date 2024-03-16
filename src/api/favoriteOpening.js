import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createFavoriteOpening, deleteFavoriteOpening} from '../graphql/mutations'
import {getOpening, listFavoriteOpenings, searchFavoriteOpenings, searchExams, searchOpenings} from '../graphql/queries'
import {getUser} from '../customgraphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function add(userId, openingId) {
  try {
    let res = await API.graphql(graphqlOperation(listFavoriteOpenings, {filter: {userID: {eq: userId}, openingID: {eq: openingId}}}))
    res = res?.data?.listFavoriteOpenings?.items
    if (res.length !== 0)
      return Promise.reject({message: 'already exist'})
    await API.graphql(graphqlOperation(createFavoriteOpening, 
      {input: {userID: userId, openingID: openingId}}))
    
    return Promise.resolve(openingId)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(userId, openingId) {
  try {
    let res = await API.graphql(graphqlOperation(listFavoriteOpenings, {filter: {userID: {eq: userId}, openingID: {eq: openingId}}}))
    res = res?.data?.listFavoriteOpenings?.items
    if (res.length === 0)
      return Promise.reject({message: 'do not exist'})
    await API.graphql(graphqlOperation(deleteFavoriteOpening, 
      {input: {id: res[0].id}}))
    return Promise.resolve(openingId)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchFavoriteOpenings, {filter: filter}))
    res = res?.data?.searchFavoriteOpenings?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchFavoriteOpenings, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    console.log(res)
    res = res?.data?.searchFavoriteOpenings?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getOpeningsByPa(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchFavoriteOpenings, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    res = res?.data?.searchFavoriteOpenings?.items
    res = await Promise.all(res.map( async (favorite) => {
      let opening = await API.graphql(graphqlOperation(getOpening, {id: favorite.openingID}))
      opening = opening?.data?.getOpening
      return opening
    }))
    res = res.filter((opening) => opening)
    // get exam number
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

async function getStudentsByPa(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchFavoriteOpenings, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    res = res?.data?.searchFavoriteOpenings?.items
    res = await Promise.all(res.map( async (favorite) => {
      let student = await API.graphql(graphqlOperation(getUser, {id: favorite.userID}))
      student = student?.data?.getUser
      return student
    }))
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getStudentNumber(corporateId) {
  try {
    let openings = await API.graphql(graphqlOperation(searchOpenings, {
      filter: {corporateID: {eq: corporateId}}
    }))
    openings = openings?.data?.searchOpenings?.items
    let studentNumber = 0
    await Promise.all(openings.map( async (opening) => {
      let res = await API.graphql(graphqlOperation(searchFavoriteOpenings, 
        {
          filter: {openingID: {eq: opening.id}},
        }))
      res = res?.data?.searchFavoriteOpenings
      studentNumber = studentNumber + res.total
    }))
    return Promise.resolve(studentNumber)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getStudents(corporateId) {
  try {
    let openings = await API.graphql(graphqlOperation(searchOpenings, {
      filter: {corporateID: {eq: corporateId}}
    }))
    openings = openings?.data?.searchOpenings?.items
    let students = []
    await Promise.all(openings.map( async (opening) => {
      let res = await API.graphql(graphqlOperation(searchFavoriteOpenings, 
        {
          filter: {openingID: {eq: opening.id}},
        }))
      res = res?.data?.searchFavoriteOpenings?.items
      res = await Promise.all(res.map( async (item) => {
        let student = await API.graphql(graphqlOperation(getUser, {id: item.userID}))
        student = student?.data?.getUser
        let opening = await API.graphql(graphqlOperation(getOpening, {id: item.openingID}))
        opening = opening?.data?.getOpening
        student.opening = opening
        return student
      }))
      students = [...students, ...res]
    }))
    return Promise.resolve(students)
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  add,
  remove,
  getFilter,
  getByPagination,
  getOpeningsByPa,
  getStudentsByPa,
  getStudentNumber,
  getStudents,
}
