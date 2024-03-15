import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createImproveTemplate, updateImproveTemplate, deleteImproveTemplate, createExamSection} from '../graphql/mutations'
import { listImproveTemplates, searchSubTopics, searchQuestions, searchParagraphs } from '../graphql/queries'
import { searchImproveTemplates, getImproveTemplate } from '../customgraphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function update(data) {
  try {
    await API.graphql(graphqlOperation(updateImproveTemplate, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteImproveTemplate, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getImproveTemplate, {id}))
    res = res?.data?.getImproveTemplate
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listImproveTemplates))
    res = res?.data?.listImproveTemplates?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchImproveTemplates, {filter: filter}))
    res = res?.data?.searchImproveTemplates?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPaginationFilter(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchImproveTemplates, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    res = res?.data?.searchImproveTemplates?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchImproveTemplates, 
      {
        sort: {field: 'createdAt', direction: 'desc'}, 
        from: from, 
        limit: row,
      }))
    res = res?.data?.searchImproveTemplates?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      return []
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

async function getIdsInBrain(templateTopics, brain) {
  let res = []
  let isError = false
  let errorMsg = ''
  await Promise.all(templateTopics?.map(async (templateTopic) => {
    let subtopics = await API.graphql(graphqlOperation(searchSubTopics, {
      filter: {
        topicID: {eq: templateTopic.topicID}
      }
    }))
    subtopics = subtopics?.data?.searchSubTopics?.items
    let topicQuestions = []
    await Promise.all(subtopics?.map( async (subtopic) => {
      let questions = await API.graphql(graphqlOperation(searchQuestions, {filter: 
        {
          complexity: {eq: templateTopic.complexity},
          subTopicID: {eq: subtopic.id},
          paragraphID: {eq: ''},
          isAdmin: {eq: true},
        }
      }))
      questions = questions?.data?.searchQuestions?.items
      questions = questions.map((question) =>  {
        return {
          questionID: question.id,
          brain: brain,
          type: question.type,
        }
      })
      let paragraphs = await API.graphql(graphqlOperation(searchParagraphs, {filter: 
        {
          subTopicID: {eq: subtopic.id},
          isAdmin: {eq: true},
        }
      }))
      paragraphs = paragraphs?.data?.searchParagraphs?.items
      paragraphs = paragraphs.map((paragraph) => {
        return {
          questionID: paragraph.id,
          brain: brain,
          type: 'PARAGRAPH',
        }
      })
      questions = [...questions, ...paragraphs]
      topicQuestions = [...topicQuestions, ...questions]
    }))
    const randomQuestions = getRandom(topicQuestions, templateTopic.number);
    if (randomQuestions.length === 0) {
      isError = true
      errorMsg = `topic(${templateTopic?.topic?.name}) question number: ${topicQuestions.length}, totalQuestion number: ${templateTopic.number}`;
    }
    res = [...res, ...randomQuestions]
  }))
  if (isError) {
    return {
      result: [],
      message: errorMsg,
    }
  }
  return {
    result: res,
    message: errorMsg,
  }
}

async function getExams(id) {
  try {
    let rightMessage = ''
    let leftMessage = ''
    let resRight = {}
    let resLeft = {}
    let res = await API.graphql(graphqlOperation(getImproveTemplate, {id}))
    res = res?.data?.getImproveTemplate
    const topics = res?.topics?.items
    const right = topics.filter((item) => item.brain === 'right')
    resRight = await getIdsInBrain(right, 'right')
    const left = topics.filter((item) => item.brain === 'left')
    resLeft = await getIdsInBrain(left, 'left')
    if (resRight.result.length === 0 || resLeft.result.length === 0) {
      res.rights = []
      res.lefts = []
    }
    else {
      res.rights = await Promise.all(resRight.result.map( async (item) => { 
        let section = await API.graphql(graphqlOperation(createExamSection, {input: {
          questionID: item.questionID,
          brain: item.brain,
          type: item.type,
        }}))
        return section?.data?.createExamSection?.id
      }))
      res.lefts = await Promise.all(resLeft.result.map( async (item) => { 
        let section = await API.graphql(graphqlOperation(createExamSection, {input: {
          questionID: item.questionID,
          brain: item.brain,
          type: item.type,
        }}))
        return section?.data?.createExamSection?.id
      }))
    }
    rightMessage = resRight.message
    leftMessage = resLeft.message
    return Promise.resolve({
      result: res,
      rightMessage: rightMessage,
      leftMessage: leftMessage,
    })
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
  getExams,
};
