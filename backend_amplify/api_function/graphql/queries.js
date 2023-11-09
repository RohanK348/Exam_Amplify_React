const gql = require('graphql-tag');

module.exports = {
getExamResult: /* GraphQL */ gql`
  query GetExamResult($id: ID!) {
    getExamResult(id: $id) {
      id
      userID
      examID
      exam {
        id
        name
        totalTime
        rightBrainTime
        leftBrainTime
        right
        left
        method
        type
        displayType
        isTrain
        students
        activate
        camera
        cameraNumber
        screen
        screenNumber
        openingID
        opening {
          id
          title
          vacancy
          description
          courses
          specialisations
          domains
          years
          EAScore
          ExpiryDate
          corporateID
          createdAt
          updatedAt
        }
        templateID
        template {
          id
          name
          totalTime
          activate
          instructions
          createdAt
          updatedAt
        }
        startDate
        endDate
        createdAt
        updatedAt
      }
      questionIndex
      backNumber
      startTime
      right
      left
      resultID
      result {
        id
        percentage
        totalCorrect
        totalQuestion
        rightID
        right {
          id
          type
          percentage
          totalCorrect
          totalQuestion
          createdAt
          updatedAt
        }
        leftID
        left {
          id
          type
          percentage
          totalCorrect
          totalQuestion
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`,
getAnswerSection: /* GraphQL */ gql`
  query GetAnswerSection($id: ID!) {
    getAnswerSection(id: $id) {
      id
      answer
      type
      state
      createdAt
      updatedAt
    }
  }
`,
getAnswer: /* GraphQL */ gql`
  query GetAnswer($id: ID!) {
    getAnswer(id: $id) {
      id
      questionID
      question {
        id
        preInfor
        description
        solution
        activate
        complexity
        time
        mark
        type
        attributes
        tags
        subTopicID
        subTopic {
          id
          name
          topicID
          description
          createdAt
          updatedAt
        }
        paragraphID
        options {
          items {
            id
            isTrue
            description
            questionID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      answerOptions
      createdAt
      updatedAt
    }
  }
`
}