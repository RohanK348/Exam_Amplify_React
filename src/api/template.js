import Amplify, { API, graphqlOperation } from 'aws-amplify'

import {createTemplate, updateTemplate, deleteTemplate, createExamSection, deleteAnswer, deleteAnswerSection, deleteExam, deleteExamResult, createSimpleBrainTemplate} from '../graphql/mutations'
import {getAnswerSection, getTemplate, getTrain, searchParagraphs, searchQuestions, searchTemplates} from '../graphql/queries'
import {searchTemplateTopics} from '../customgraphql/queries'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

async function create(data) {
  try {
    await API.graphql(graphqlOperation(createTemplate, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function createSimple(data) {
  try {
    let right = await API.graphql(graphqlOperation(createSimpleBrainTemplate, {
      input: {
        brain: 'right',
        totalTime: 0,
        isOwn: false,
      }
    }))
    right = right?.data?.createSimpleBrainTemplate
    let left = await API.graphql(graphqlOperation(createSimpleBrainTemplate, {
      input: {
        brain: 'left',
        totalTime: 0,
        isOwn: false,
      }
    }))
    left = left?.data?.createSimpleBrainTemplate
    let tmp = data
    tmp.rightID = right?.id
    tmp.leftID = left?.id
    await API.graphql(graphqlOperation(createTemplate, 
      {input: tmp}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    await API.graphql(graphqlOperation(updateTemplate, 
      {input: data}))
    
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await API.graphql(graphqlOperation(deleteTemplate, 
      {input: {id: id}}))
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function removeExam(id) {
  try {
    let train = await API.graphql(graphqlOperation(getTrain, {id: id}))
    train = train?.data?.getTrain
    if (train?.examID !== '') {
      await API.graphql(graphqlOperation(deleteExam, {input: {id: train?.examID}}))
    }
    if (train?.examResultID !== '') {
      await Promise.all(train?.examResult?.right?.map( async (answerSectionId) => {
        let answerSection = await API.graphql(graphqlOperation(getAnswerSection, {id: answerSectionId}))
        answerSection = answerSection?.data?.getAnswerSection
        await Promise.all(answerSection?.answer?.map( async (answerId) => {
          await API.graphql(graphqlOperation(deleteAnswer, {input: {id: answerId}}))
        }))
        await API.graphql(graphqlOperation(deleteAnswerSection, {input: {id: answerSectionId}}))
      }))
      await Promise.all(train?.examResult?.left?.map( async (answerSectionId) => {
        let answerSection = await API.graphql(graphqlOperation(getAnswerSection, {id: answerSectionId}))
        answerSection = answerSection?.data?.getAnswerSection
        await Promise.all(answerSection?.answer?.map( async (answerId) => {
          await API.graphql(graphqlOperation(deleteAnswer, {input: {id: answerId}}))
        }))
        await API.graphql(graphqlOperation(deleteAnswerSection, {input: {id: answerSectionId}}))
      }))
      await API.graphql(graphqlOperation(deleteExamResult, {input: {id: train?.examResultID}}))
    }
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await API.graphql(graphqlOperation(getTemplate, {id}))
    res = res?.data?.getTemplate
    let right = await API.graphql(graphqlOperation(searchTemplateTopics, {filter: {brain: {eq: 'right'}, templateID: {eq: id}}}))
    right = right?.data?.searchTemplateTopics?.items
    res.right = right
    let left = await API.graphql(graphqlOperation(searchTemplateTopics, {filter: {brain: {eq: 'left'}, templateID: {eq: id}}}))
    left = left?.data?.searchTemplateTopics?.items
    res.left = left
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await API.graphql(graphqlOperation(searchTemplates))
    res = res?.data?.searchTemplates?.items
    res = await Promise.all(res.map( async(item) => {
      let right = await API.graphql(graphqlOperation(searchTemplateTopics, {filter: {brain: {eq: 'right'}, templateID: {eq: item.id}}}))
      right = right?.data?.searchTemplateTopics?.items
      item.right = right
      let left = await API.graphql(graphqlOperation(searchTemplateTopics, {filter: {brain: {eq: 'left'}, templateID: {eq: item.id}}}))
      left = left?.data?.searchTemplateTopics?.items
      item.left = left
      return item
    }))
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPaginationFilter(filter, row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchTemplates, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        filter: filter,
        from: from, 
        limit: row,
      }))
    res = res?.data?.searchTemplates?.items
    res = await Promise.all(res.map( async(item) => {
      if (!item.isSimple) {
        let right = await API.graphql(graphqlOperation(searchTemplateTopics, {filter: {brain: {eq: 'right'}, templateID: {eq: item.id}}}))
        right = right?.data?.searchTemplateTopics?.items
        item.right = right
        let left = await API.graphql(graphqlOperation(searchTemplateTopics, {filter: {brain: {eq: 'left'}, templateID: {eq: item.id}}}))
        left = left?.data?.searchTemplateTopics?.items
        item.left = left
      }
      return item
    }))
    
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(row, from) {
  try {
    let res = await API.graphql(graphqlOperation(searchTemplates, 
      {
        sort: {field: 'createdAt', direction: 'asc'}, 
        from: from, 
        limit: row,
      }))
    res = res?.data?.searchTemplates?.items
    res = await Promise.all(res.map( async(item) => {
      if (!item.isSimple) {
        let right = await API.graphql(graphqlOperation(searchTemplateTopics, {filter: {brain: {eq: 'right'}, templateID: {eq: item.id}}}))
        right = right?.data?.searchTemplateTopics?.items
        item.right = right
        let left = await API.graphql(graphqlOperation(searchTemplateTopics, {filter: {brain: {eq: 'left'}, templateID: {eq: item.id}}}))
        left = left?.data?.searchTemplateTopics?.items
        item.left = left
      }
      return item
    }))
    
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

async function getIdsInComplexity(complexity, number, brain) {
  let isError = false
  let errorMsg = ''
  const limit = 100
  let questions = await API.graphql(graphqlOperation(searchQuestions, {
    from: 0,
    limit: limit,
    filter: {
      complexity: {eq: complexity},
      subTopicID: {ne: ''},
      paragraphID: {eq: ''},
      isAdmin: {eq: true},
    }
  }))
  questions = questions?.data?.searchQuestions
  const totalQuestion = questions?.total
  questions = questions?.items
  questions = questions.map((question) =>  {
    return {
      questionID: question.id,
      brain: brain,
      type: question.type,
    }
  })
  for (let from = limit; from < totalQuestion; from += limit) {
    let tmp = await API.graphql(graphqlOperation(searchQuestions, {
      from: from,
      limit: limit,
      filter: {
        complexity: {eq: complexity},
        subTopicID: {ne: ''},
        paragraphID: {eq: ''},
        isAdmin: {eq: true},
      }
    }))
    tmp = tmp?.data?.searchQuestions?.items
    tmp = tmp.map((question) =>  {
      return {
        questionID: question.id,
        brain: brain,
        type: question.type,
      }
    })
    questions = [...questions, ...tmp]
  }

  let paragraphs = await API.graphql(graphqlOperation(searchParagraphs, {
    from: 0,
    limit: limit,
    filter: {
      subTopicID: {ne: ''},
      isAdmin: {eq: true},
    }
  }))
  paragraphs = paragraphs?.data?.searchParagraphs
  const totalParagraph = paragraphs?.total
  paragraphs = paragraphs?.items
  paragraphs = paragraphs.map((paragraph) => {
    return {
      questionID: paragraph.id,
      brain: brain,
      type: 'PARAGRAPH',
    }
  })
  for (let from = limit; from < totalParagraph; from += limit) {
    let tmp = await API.graphql(graphqlOperation(searchParagraphs, {
      from: from,
      limit: limit,
      filter: {
        subTopicID: {eq: ''},
        isAdmin: {eq: true},
      }
    }))
    tmp = tmp?.data?.searchParagraphs?.items
    tmp = tmp.map((paragraph) => {
      return {
        questionID: paragraph.id,
        brain: brain,
        type: 'PARAGRAPH',
      }
    })
    paragraphs = [...paragraphs, ...tmp]
  }
  questions = [...questions, ...paragraphs]
  const randomQuestions = getRandom(questions, number)
  if (randomQuestions.length === 0) {
    isError = true
    errorMsg = `complexity(${complexity}) question number: ${questions.length}, totalQuestion number: ${number}`
  }

  if (isError) {
    return {
      result: [],
      message: errorMsg,
    }
  }
  return {
    result: randomQuestions,
    message: errorMsg,
  }
}

async function getIdsInSimpleBrain(complexity, brain) {
  let questions = []
  let errorMsg = ''
  let tmp = await getIdsInComplexity('BEGINNER', complexity.beginner, brain)
  errorMsg = tmp.message
  questions = [...questions, ...tmp.result]
  tmp = await getIdsInComplexity('INTERMEDIATE', complexity.intermediate, brain)
  errorMsg = tmp.message
  questions = [...questions, ...tmp.result]
  tmp = await getIdsInComplexity('ADVANCED', complexity.advanced, brain)
  errorMsg = tmp.message
  questions = [...questions, ...tmp.result]
  tmp = await getIdsInComplexity('HIGH', complexity.high, brain)
  errorMsg = tmp.message
  questions = [...questions, ...tmp.result]
  tmp = await getIdsInComplexity('VERYHIGH', complexity.veryHigh, brain)
  errorMsg = tmp.message
  questions = [...questions, ...tmp.result]
  tmp = await getIdsInComplexity('COMPLEX', complexity.complex, brain)
  errorMsg = tmp.message
  questions = [...questions, ...tmp.result]
  return {
    result: questions,
    message: errorMsg,
  }
}

async function getIdsInBrain(topics, brain) {
  let res = []
  let isError = false
  let errorMsg = ''
  await Promise.all(topics?.map( async(topic) => {
    await Promise.all(topic?.subtopics?.items?.map( async (subtopic) => {
      let questions = await API.graphql(graphqlOperation(searchQuestions, {filter: 
        {
          complexity: {eq: subtopic.complexity},
          subTopicID: {eq: subtopic.subTopicID},
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
          subTopicID: {eq: subtopic.subTopicID},
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
      const randomQuestions = getRandom(questions, subtopic.totalQuestion)
      if (randomQuestions.length === 0) {
        isError = true
        errorMsg = `topic(${topic.name}) subtopic(${subtopic.name}) question number: ${questions.length}, totalQuestion number: ${subtopic.totalQuestion}`
      }
      res = [...res, ...randomQuestions]
    }))
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
    let res = await API.graphql(graphqlOperation(getTemplate, {id}))
    res = res?.data?.getTemplate
    if (res.isSimple) {// simple template
      if (res?.right?.isOwn) {
        res.rights = res?.right?.sections
      }
      else {
        resRight = await getIdsInSimpleBrain(res?.right ,'right')
        res.rights = await Promise.all(resRight.result.map( async (item) => { 
          let section = await API.graphql(graphqlOperation(createExamSection, {input: {
            questionID: item.questionID,
            brain: item.brain,
            type: item.type,
          }}))
          return section?.data?.createExamSection?.id
        }))
      }
      if (res?.left?.isOwn) {
        res.lefts = res?.left?.sections 
      }
      else {
        resLeft = await getIdsInSimpleBrain(res?.left, 'left')
        res.lefts = await Promise.all(resLeft.result.map( async (item) => { 
          let section = await API.graphql(graphqlOperation(createExamSection, {input: {
            questionID: item.questionID,
            brain: item.brain,
            type: item.type,
          }}))
          return section?.data?.createExamSection?.id
        }))
      }
    }
    else { // full template
      let right = await API.graphql(graphqlOperation(searchTemplateTopics, {filter: {brain: {eq: 'right'}, templateID: {eq: id}}}))
      right = right?.data?.searchTemplateTopics?.items
      resRight = await getIdsInBrain(right, 'right')
      let left = await API.graphql(graphqlOperation(searchTemplateTopics, {filter: {brain: {eq: 'left'}, templateID: {eq: id}}}))
      left = left?.data?.searchTemplateTopics?.items
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
  createSimple,
  update,
  remove,
  removeExam,
  get,
  getAll,
  getByPagination,
  getByPaginationFilter,
  getExams,
}
