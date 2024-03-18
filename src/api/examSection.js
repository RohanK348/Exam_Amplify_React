import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createExamSection} from '../graphql/mutations'
import {getExamSection, getParagraph, getQuestion} from '../graphql/queries'
import {searchQuestions, searchSecureQuestions, getSecureQuestion} from '../customgraphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)


async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getExamSection, {id}))
    res = res?.data?.getExamSection
    if (res.type === 'PARAGRAPH') {
      let questions = await API.graphql(graphqlOperation(searchQuestions, {
        filter: {paragraphID: {eq: res.questionID}}
      }))
      res.questions = questions?.data?.searchQuestions?.items
      const paragraph = await API.graphql(graphqlOperation(getParagraph, {id: res.questionID}))
      res.paragraph = paragraph?.data?.getParagraph
    }
    else {
      let question = await API.graphql(graphqlOperation(getQuestion, {id: res.questionID}))
      question = question?.data?.getQuestion
      res.questions = [question]
    }
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getSecure(id) {
  try {
    let res = await API.graphql(graphqlOperation(getExamSection, {id}))
    res = res?.data?.getExamSection
    if (res.type === 'PARAGRAPH') {
      let questions = await API.graphql(graphqlOperation(searchSecureQuestions, {
        filter: {paragraphID: {eq: res.questionID}}
      }))
      res.questions = questions?.data?.searchQuestions?.items
      const paragraph = await API.graphql(graphqlOperation(getParagraph, {id: res.questionID}))
      res.paragraph = paragraph?.data?.getParagraph
    }
    else {
      console.log('questionid', res.questionID)
      let question = await API.graphql(graphqlOperation(getSecureQuestion, {id: res.questionID}))
      question = question?.data?.getQuestion
      res.questions = [question]
    }
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getQuestions(ids) {
  try {
    let res = await Promise.all(ids.map( async (id) => {
      let section = await API.graphql(graphqlOperation(getExamSection, {id}))
      section = section?.data?.getExamSection
      let question = {}
      if (section.type === 'PARAGRAPH') {
        question = await API.graphql(graphqlOperation(getParagraph, {id: section.questionID}))
        question = question?.data?.getParagraph
        question.type = 'PARAGRAPH'
      }
      else {
        question = await API.graphql(graphqlOperation(getQuestion, {id: section.questionID}))
        question = question?.data?.getQuestion
      }
      question.sectionId = id
      return question
    }))
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  create,
  get,
  getSecure,
  getQuestions,
}
