import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createExamResult, updateExamResult, deleteExamResult, createAnswerSection, createAnswer} from '../graphql/mutations'
import {getExam, getExamResult, getExamSection, listExamResults, 
  getAnswerSection, getQuestion} from '../graphql/queries'
import {searchQuestions, searchExamResults} from '../customgraphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function createAnswers(examSectionIds) {
  const res = await Promise.all(examSectionIds.map( async (item) => {
    let examSection = await API.graphql(graphqlOperation(getExamSection, {id: item}))
    examSection = examSection?.data?.getExamSection
    // get all questions with paragraph
    let questions = []
    if (examSection.type === 'PARAGRAPH') {
      let tmp = await API.graphql(graphqlOperation(searchQuestions, {
        filter: {paragraphID: {eq: examSection.questionID}}
      }))
      questions = tmp?.data?.searchQuestions?.items
    }
    else {
      let question = await API.graphql(graphqlOperation(getQuestion, {id: examSection.questionID}))
      question = question?.data?.getQuestion
      questions = [question]
    }
    // create answers
    const answers = await Promise.all(questions.map( async (question) => {
      let answer = await API.graphql(graphqlOperation(createAnswer, {input: {
        questionID: question.id,
        answerOptions: [],
      }}))
      answer = answer?.data?.createAnswer
      return answer.id
    }))
    // create answer section with answer ids
    let answerSection = await API.graphql(graphqlOperation(createAnswerSection, {input: {
      type: examSection?.type,
      state: 'notView',
      answer: answers,
    }}))
    answerSection = answerSection?.data?.createAnswerSection
    return answerSection.id
  }))
  return res
}

async function create(data) {
  try {
    let exam = await API.graphql(graphqlOperation(getExam, {id: data.examID}))
    exam = exam?.data?.getExam
    const right = await createAnswers(exam.right)
    const left = await createAnswers(exam.left)
    data.right = right
    data.left = left
    data.startTime = new Date()
    let res = await API.graphql(graphqlOperation(createExamResult, 
      {input: data}))
    res = res?.data?.createExamResult
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    await API.graphql(graphqlOperation(updateExamResult, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteExamResult, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getExamResult, {id}))
    res = res?.data?.getExamResult
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getStates(id) {
  try {
    let examResult = await API.graphql(graphqlOperation(getExamResult, {id}))
    examResult = examResult?.data?.getExamResult
    const right = await Promise.all(examResult.right.map( async (item) => {
      let resultSection = await API.graphql(graphqlOperation(getAnswerSection, {id: item}))
      resultSection = resultSection?.data?.getAnswerSection
      return resultSection.state
    }))
    const left = await Promise.all(examResult.left.map( async (item) => {
      let resultSection = await API.graphql(graphqlOperation(getAnswerSection, {id: item}))
      resultSection = resultSection?.data?.getAnswerSection
      return resultSection.state
    }))
    const res = [...right, ...left]
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(listExamResults))
    res = res?.data?.listExamResults?.items
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(filter) {
  try {
    let res = await API.graphql(graphqlOperation(searchExamResults, {filter: filter}))
    res = res?.data?.searchExamResults?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchExamResults, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: filter,
      }))
    res = res?.data?.searchExamResults?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function examEvaluation(id) {
  try {
    const apiName = "examApi"
    const path = "/evaluation"
    const myInit = {
      body: { id: id },
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `${(await Auth.currentSession())
      //     .getAccessToken()
      //     .getJwtToken()}`,
      // },
    };
    const result = await API.post(apiName, path, myInit)
    return Promise.resolve(result)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAnalisis(examId) {
  try {
    let res = []
    for(let i = 0; i < 10; i++) {
      let examResults = {}
      if (i === 0) {
        examResults = await API.graphql(graphqlOperation(searchExamResults, {
          filter: {
            examID: {eq: examId},
            and: [
              {percentage: {gte: i*10}},
              {percentage: {lte: (i+1)*10}}
            ]
          }
        }))  
      }
      else {
        examResults = await API.graphql(graphqlOperation(searchExamResults, {
          filter: {
            examID: {eq: examId},
            and: [
              {percentage: {gt: i*10}},
              {percentage: {lte: (i+1)*10}}
            ]
          }
        }))
      }
      examResults = examResults?.data?.searchExamResults
      const item = {
        name: `${i * 10} ~ ${(i + 1) * 10}%`,
        totalStudents: examResults?.total,
        index: i,
      }
      res = [...res, item]
    }
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAnalisisStudents(examId, index, row, from) {
  try {
    let res = {}
    if (index == 0) {
      res = await API.graphql(graphqlOperation(searchExamResults, {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: {
          examID: {eq: examId},
          and: [
            {percentage: {gte: index*10}},
            {percentage: {lte: index*10+10}}
          ]
        },
      }))
    }
    else {
      res = await API.graphql(graphqlOperation(searchExamResults, {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
        filter: {
          examID: {eq: examId},
          and: [
            {percentage: {gt: index*10}},
            {percentage: {lte: index*10+10}}
          ]
        },
      }))
    }
    res = res?.data?.searchExamResults?.items
    console.log(res)
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getStudents(examId, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchExamResults, {
      sort: {field: 'createdAt', direction: 'asc'}, 
      from: from, 
      limit: row,
      filter: {
        examID: {eq: examId}
      },
    }))
    res = res?.data?.searchExamResults?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAllStudents(examId) {
  try {
    let res = await API.graphql(graphqlOperation(searchExamResults, {
      sort: {field: 'createdAt', direction: 'asc'}, 
      from: 0, 
      limit: 100,
      filter: {
        examID: {eq: examId}
      },
    }))
    res = res?.data?.searchExamResults?.items    

    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getStudent(examId, userId) {
  try {
    let res = await API.graphql(graphqlOperation(searchExamResults, {
      filter: {
        examID: {eq: examId},
        userID: {eq: userId},
      },
    }))
    res = res?.data?.searchExamResults?.items
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

function getCumulativeBrain(brain, result) {
  let res = brain
  res.percentage += result.percentage
  res.totalCorrect += result.totalCorrect
  res.totalQuestion += result.totalQuestion
  res.number += 1
  // topics
  let newTopics = []
  let _topics = result?.topics?.items
  _topics.forEach((_topic) => {
    let i_topic = res?.topics?.items?.findIndex((item) => item.topicID === _topic.topicID)
    if (i_topic === -1) {
      _topic.number = 1
      let _subtopics = _topic?.subTopics?.items
      _subtopics.forEach((subtopic) => {
        subtopic.number = 1
      })
      _topic.subTopics.items = _subtopics
      newTopics = [...newTopics, _topic]
    }
    else {
      res.topics.items[i_topic].number += 1
      res.topics.items[i_topic].percentage += _topic.percentage
      res.topics.items[i_topic].totalCorrect += _topic.totalCorrect
      res.topics.items[i_topic].totalQuestion += _topic.totalQuestion
      // subtopics
      let newSubtopics = []
      let _subtopics = _topic?.subTopics?.items
      _subtopics.forEach((subtopic) => {
        let i_subtopic = res?.topics?.items[i_topic]?.subTopics?.items?.findIndex((item) => item.subTopicID === subtopic.subTopicID)
        if (i_subtopic === -1) {
          subtopic.number = 1
          newSubtopics = [...newSubtopics, subtopic]
        }
        else {
          res.topics.items[i_topic].subTopics.items[i_subtopic].number += 1
          res.topics.items[i_topic].subTopics.items[i_subtopic].percentage += subtopic.percentage
          res.topics.items[i_topic].subTopics.items[i_subtopic].totalCorrect += subtopic.totalCorrect
          res.topics.items[i_topic].subTopics.items[i_subtopic].totalQuestion += subtopic.totalQuestion
        }
      })
      const subtopics = res.topics.items[i_topic].subTopics.items 
      res.topics.items[i_topic].subTopics.items = [...subtopics, ...newSubtopics]
    }
  })
  let topics = [...res.topics.items, ...newTopics]
  // complete percentage
  topics.forEach((topic) => {
    topic.percentage = topic.percentage/topic.number
    let subtopics = topic?.subTopics?.items
    subtopics.forEach((subtopic) => {
      subtopic.percentage = subtopic.percentage/subtopic.number
    })
  })
  res.topics.items = topics
  return res
}
function getStudentCumulative(examResults) {
  let res = {}
  if (examResults.length !== 0) {
    examResults.forEach((result, index) => {
      if (index === 0) {
        // init cumulative
        res = result?.result
        res.number = 1
        res.left.number = 1
        let topics = res?.left?.topics?.items
        topics.forEach((topic) => {
          topic.number = 1
          let subtopics = topic?.subTopics?.items
          subtopics.forEach((subtopic) => {
            subtopic.number = 1
          })
        })
        res.left.topics.items = topics
        res.right.number = 1
        topics = res?.right?.topics?.items
        topics.forEach((topic) => {
          topic.number = 1
          let subtopics = topic?.subTopics?.items
          subtopics.forEach((subtopic) => {
            subtopic.number = 1
          })
        })
        res.right.topics.items = topics
      }
      else {
        // root
        if (result?.result) {
          res.percentage += result?.result?.percentage
          res.totalCorrect += result?.result?.totalCorrect
          res.totalQuestion += result?.result?.totalQuestion
          res.number += 1
          // left brain
          res.left = getCumulativeBrain(res.left, result?.result?.left)
          // right brain
          res.right = getCumulativeBrain(res.right, result?.result?.right)
        }
      }
    })
    res.percentage = res.percentage/res.number
    res.left.percentage = res.left.percentage/res.left.number
    res.right.percentage = res.right.percentage/res.right.number
  }
  return {examResults: examResults, cumulativeResults: res}
}
async function getCumulative(filter) {
  try {
    let examResults = await API.graphql(graphqlOperation(searchExamResults, {
      filter: filter
    }))
    examResults = examResults?.data?.searchExamResults?.items
    const res = getStudentCumulative(examResults)
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

function brainTotal(brain, newBrain) {
  brain.totalCorrect = brain.totalCorrect + newBrain?.totalCorrect
  let topics = brain.topics.items
  let newTopics = newBrain?.topics?.items
  topics.forEach((topic, topicIndex) => {
    topic.totalCorrect = topic.totalCorrect + newTopics[topicIndex].totalCorrect
    let subtopics = topic.subTopics.items
    let newSubtopics = newTopics[topicIndex].subTopics.items
    subtopics.forEach((subtopic, subtopicIndex) => {
      subtopic.totalCorrect = subtopic.totalCorrect + newSubtopics[subtopicIndex].totalCorrect
    })
    topic.subTopics.items = subtopics
  })
  brain.topics.items = topics
  return brain
}

function brainAverage(brain, total) {
  if (total === 0) 
    return brain
  brain.totalCorrect = Math.floor(brain.totalCorrect/total)
  let topics = brain.topics.items
  topics.forEach((topic) => {
    topic.totalCorrect = Math.floor(topic.totalCorrect/total)
    let subtopics = topic.subTopics.items
    subtopics.forEach((subtopic) => {
      subtopic.totalCorrect = Math.floor(subtopic.totalCorrect/total)
    })
    topic.subTopics.items = subtopics
  })
  brain.topics.items = topics
  return brain
}

async function getAverage(examId, userId) {
  try {
    let average = {}
    let examResult = await API.graphql(graphqlOperation(searchExamResults, {
      filter: {
        examID: {eq: examId},
        userID: {eq: userId}
      }
    }))
    examResult = examResult?.data?.searchExamResults?.items
    let allResult = await API.graphql(graphqlOperation(searchExamResults, {
      sort: {field: 'percentage', direction: 'desc'},
      from: 0,
      limit: 100,
      filter: {
        examID: {eq: examId},
      }
    }))
    let total = allResult?.data?.searchExamResults?.total
    allResult = allResult?.data?.searchExamResults?.items
    if (total>100) {
      console.log('total big')
      for (let from = 100; from < total; from+= 100) {
        let tmp = await API.graphql(graphqlOperation(searchExamResults, {
          sort: {field: 'percentage', direction: 'desc'},
          from: from,
          limit: 100,
          filter: {
            examID: {eq: examId},
          }
        }))
        tmp = tmp?.data?.searchExamResults?.items
        allResult = [...allResult, ...tmp]
      }
    }
    allResult = allResult.filter((item) => item.resultID)
    total = allResult.length
    if (examResult.length === 0||allResult.length === 0)
      return Promise.reject({message: 'incorrect examId or userId'})
    else {
      let rank = 0
      allResult.forEach((item, index) => {
        if (item.id === examResult[0].id)
          rank = index
        if (index === 0)
          average = item?.result
        else {
          console.log(item)
          average.totalCorrect = average.totalCorrect + item?.result?.totalCorrect
          average.right = brainTotal(average.right, item?.result?.right)
          average.left = brainTotal(average.left, item?.result?.left)
        }
      })
      if (total !== 0) {
        average.totalCorrect = Math.floor(average.totalCorrect/total)
        average.right = brainAverage(average.right, total)
        average.left = brainAverage(average.left, total)
      }
      if (total <3)
        average.rank = 200
      else
        average.rank = Math.ceil(rank * 10/total) * 100
    }
    return Promise.resolve(average)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAverageExam(examId) {
  try {
    let average = {}
    let allResult = await API.graphql(graphqlOperation(searchExamResults, {
      sort: {field: 'percentage', direction: 'desc'},
      from: 0,
      limit: 100,
      filter: {
        examID: {eq: examId},
      }
    }))
    let total = allResult?.data?.searchExamResults?.total
    allResult = allResult?.data?.searchExamResults?.items
    if (total>100) {
      console.log('total big')
      for (let from = 100; from < total; from+= 100) {
        let tmp = await API.graphql(graphqlOperation(searchExamResults, {
          sort: {field: 'percentage', direction: 'desc'},
          from: from,
          limit: 100,
          filter: {
            examID: {eq: examId},
          }
        }))
        tmp = tmp?.data?.searchExamResults?.items
        allResult = [...allResult, ...tmp]
      }
    }
    allResult = allResult.filter((item) => item.resultID)
    total = allResult.length
    allResult.forEach((item, index) => {
      if (index === 0)
        average = item?.result
      else {
        console.log(item)
        average.totalCorrect = average.totalCorrect + item?.result?.totalCorrect
        average.right = brainTotal(average.right, item?.result?.right)
        average.left = brainTotal(average.left, item?.result?.left)
      }
    })
    if (total !== 0) {
      average.totalCorrect = Math.floor(average.totalCorrect/total)
      average.right = brainAverage(average.right, total)
      average.left = brainAverage(average.left, total)
    }
    return Promise.resolve(average)
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  create,
  update,
  remove,
  get,
  getStates,
  getAll,
  getFilter,
  getByPagination,
  examEvaluation,
  getAnalisis,
  getAnalisisStudents,
  getStudents,
  getStudent,
  getAllStudents,
  getCumulative,
  getAverage,
  getAverageExam,
}
