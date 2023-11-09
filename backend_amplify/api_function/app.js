/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

var axios = require('axios');
var graphql = require('graphql');
var { print } = graphql;

var Queries = require('./graphql/queries');
var Mutations = require('./graphql/mutations');

var gqlEndpoint = 'https://qxz7dj3hjbgbjakbxchjviyy4y.appsync-api.us-east-1.amazonaws.com/graphql'
var apiKey = 'da2-fblhh2w24fhcpcxuw77hzzitq4'
const stripe = require("stripe")("sk_test_51IuCHsSJhHkg9TM38IKEtBQWRDIneUMI0cFrXdJVWSJqUBFGcLRlkhMzEvOnFPCjRqlvrQyzreBKKcbZuYOJWPHi00b6cm9nyk");
const Razorpay = require('razorpay')
var razorpay = new Razorpay({
  key_id: 'rzp_test_25fnOwAJlpuga5',
  key_secret: 'dSy5vZBGj3JB1TMZWqiKoWDg'
})
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

/**********************
 * Example get method *
 **********************/

app.get('/evaluation', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url, body: {serverTime: new Date()}});
});

app.get('/evaluation/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/
async function callApi(data) {
  let res = await axios({
    url: gqlEndpoint,
    method: 'post',
    headers: {
      'x-api-key': apiKey
    },
    data: data
  });
  return res
}

async function createResult(answerSections, type) {
  let brainMark = 0
  let brainTotalMark = 0
  let brainCorrect = 0
  let brainTotal = 0
  let subTopics = []
  let topics = []
  await Promise.all(answerSections.map( async(answerSectionId) => {
    let answerSection = await callApi({
      query: print(Queries.getAnswerSection),
      variables: {id: answerSectionId}
    })
    answerSection = answerSection?.data?.data?.getAnswerSection
    await Promise.all(answerSection.answer.map( async(item) => {
      let mark = 0
      let totalMark = 0
      let correct = 0
      let total = 0
      let answer = await callApi({
        query: print(Queries.getAnswer),
        variables: {id: item}
      })
      answer = answer?.data?.data?.getAnswer
      if (answer.question.type === 'SINGLE') {
        if (answer.answerOptions.length !== 0) {
          const trueOptions = answer.question.options.items.filter((item) => item.isTrue)
          if (trueOptions.length !== 0) {
            if (trueOptions[0].id === answer.answerOptions[0]) {
              mark = answer.question.mark
              correct = 1
            }
          }
        }
        total = 1
      }
      else if (answer.question.type === 'MULTIFUL') {
        const trueOptions = answer.question.options.items.filter((item) => item.isTrue)
        const answerTrues = trueOptions.filter((item) => answer.answerOptions.indexOf(item.id) > -1)
        if (trueOptions.length !== 0) {
          mark = answer.question.mark * answerTrues.length/trueOptions.length
          correct = answerTrues.length
          total = trueOptions.length
        }
      }
      totalMark = answer.question.mark
      // calculate total brain
      brainMark = brainMark + mark
      brainTotalMark = brainTotalMark + totalMark
      brainCorrect = brainCorrect + correct
      brainTotal = brainTotal + total
      // insert subtopics
      let isNew = true
      subTopics.forEach((item) => {
        if (item.subTopicID === answer.question.subTopicID) {
          item.mark = item.mark + mark
          item.correct = item.correct + correct
          item.total = item.total + total
          item.totalMark = item.totalMark + totalMark
          isNew = false
        }
      })
      if (answer.question.subTopicID === '')
        isNew = false
      if (isNew) {
        let subTopic = {
          subTopicID: answer.question.subTopicID,
          topicID: answer.question.subTopic.topicID,
          mark: mark,
          totalMark: totalMark,
          correct: correct,
          total: total,
        }
        subTopics = [...subTopics, subTopic]
      }
    }))
  }))
  // insert topics
  subTopics.forEach((subTopic) => {
    let isNew = true
    topics.forEach((topic) => {
      if (topic.topicID === subTopic.topicID) {
        topic.subTopics = [...topic.subTopics, subTopic]
        topic.mark = topic.mark + subTopic.mark
        topic.totalMark = topic.totalMark + subTopic.totalMark
        topic.correct = topic.correct + subTopic.correct
        topic.total = topic.total + subTopic.total
        isNew = false
      }
    })
    if (isNew) {
      const newTopic = {
        topicID: subTopic.topicID,
        subTopics: [subTopic],
        mark: subTopic.mark,
        totalMark: subTopic.totalMark,
        correct: subTopic.correct,
        total: subTopic.total,
      }
      topics = [...topics, newTopic]
    }
  })
  // create brain
  let resultBrain = await callApi({
    query: print(Mutations.createResultBrain),
    variables: {input: {
      type: type,
      percentage: 100 * brainMark/brainTotalMark,
      totalCorrect: brainCorrect,
      totalQuestion: brainTotal,
    }}
  })
  resultBrain = resultBrain?.data?.data?.createResultBrain
  // create topic, and subtopic
  await Promise.all(topics.map( async (topic) => {
    let resultTopic = await callApi({
      query: print(Mutations.createResultTopic),
      variables: {input: {
        topicID: topic.topicID,
        percentage: 100 * topic.mark/topic.totalMark,
        totalCorrect: topic.correct,
        totalQuestion: topic.total,
        resultBrainID: resultBrain.id,
      }}
    })
    resultTopic = resultTopic?.data?.data?.createResultTopic
    await Promise.all(topic.subTopics.map( async (subTopic) => {
      await callApi({
        query: print(Mutations.createResultSubtopic),
        variables: {input: {
          subTopicID: subTopic.subTopicID,
          resultTopicID: resultTopic.id,
          percentage: 100 * subTopic.mark/subTopic.totalMark,
          totalCorrect: subTopic.correct,
          totalQuestion: subTopic.total,
        }}
      })
    }))
  }))
  return {
    id: resultBrain.id,
    brainMark: brainMark,
    brainTotalMark: brainTotalMark,
    brainCorrect: brainCorrect,
    brainTotal: brainTotal,
  }
}

app.post('/evaluation', async function(req, res) {
  const {id} = req.body
  let examResult = await callApi({
    query: print(Queries.getExamResult),
    variables: {id: id}
  })
  console.log("examResult", examResult?.data?.data?.getExamResult)
  examResult = examResult?.data?.data?.getExamResult
  let percentage = 0
  let totalMark = 0
  // try {
    const resultRight = await createResult(examResult.right, 'right')
    const resultLeft = await createResult(examResult.left, 'left')
    percentage = resultRight.brainMark + resultLeft.brainMark
    totalMark = resultRight.brainTotalMark + resultLeft.brainTotalMark
    percentage = 100 * percentage/totalMark
    // create result
    let result = await callApi({
      query: print(Mutations.createResult),
      variables: {input: {
        percentage: percentage,
        totalCorrect: resultRight.brainCorrect + resultLeft.brainCorrect,
        totalQuestion: resultRight.brainTotal + resultLeft.brainTotal,
        rightID: resultRight.id,
        leftID: resultLeft.id,
      }}
    })
    console.log("result", result?.data)
    result = result?.data?.data?.createResult
    let tmp = {}
    tmp.id = id
    tmp.resultID = result.id
    tmp.percentage = percentage 
    await callApi({
      query: print(Mutations.updateExamResult),
      variables: {input: tmp}
    })
    res.json({success: 'post call succeed!', url: req.url, body: {message: 'success', mark: percentage}})
  // } catch (error) {
  //   res.json({fail: 'post call failed!', url: req.url, body: {message: error}})
  // }
  
});

app.post('/evaluation/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/evaluation', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/evaluation/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/evaluation', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/evaluation/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.post('/stripeIntent', async function(req, res) {
  const {amount, currency, description, token, name, email} = req.body.data
  const customer = stripe.customers.create({
    name: name,
    email: email,
    source: token.id,
  })
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency, 
    description: description,
    customer: customer.id,
  });

  res.json({success: 'success', url: req.url, body: {clientSecret: paymentIntent.client_secret}})
});

app.post('/razorpayOrder', async function(req, res) {
  // Add your code here
  const {amount, currency} = req.body.data
  
  const options = {
    amount: amount,
    currency: currency,
    payment_capture: '1',
  }
  try {
    const response = await razorpay.orders.create(options);
    res.json({success: 'post call succeed!', order: response})
  } catch (err) {
    console.log(err);
    res.json({error: err});
  }
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app