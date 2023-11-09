const gql = require('graphql-tag');

module.exports = {
updateExamResult: /* GraphQL */ gql`
  mutation UpdateExamResult(
    $input: UpdateExamResultInput!
    $condition: ModelExamResultConditionInput
  ) {
    updateExamResult(input: $input, condition: $condition) {
      id
      userID
      user {
        id
        firstName
        lastName
        email
        avatar
        role
        phone
        companyName
        companyRole
        corporateID
        corporate {
          id
          companyName
          type
          phone
          country
          state
          logo
          logoString
          description
          createdAt
          updatedAt
        }
        profileID
        profile {
          id
          address
          whatsapp
          facebook
          linkedin
          twitter
          instagram
          tiktok
          domain
          hobby
          significantAchievement
          interestedCompany
          interestedLocation
          locationOutside
          interestedJob
          description
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
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
      isTrain
      resultID
      percentage
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
createResult: /* GraphQL */ gql`
  mutation CreateResult(
    $input: CreateResultInput!
    $condition: ModelResultConditionInput
  ) {
    createResult(input: $input, condition: $condition) {
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
        topics {
          nextToken
        }
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
        topics {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`,
updateResult: /* GraphQL */ gql`
  mutation UpdateResult(
    $input: UpdateResultInput!
    $condition: ModelResultConditionInput
  ) {
    updateResult(input: $input, condition: $condition) {
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
        topics {
          nextToken
        }
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
        topics {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`,
createResultBrain: /* GraphQL */ gql`
  mutation CreateResultBrain(
    $input: CreateResultBrainInput!
    $condition: ModelResultBrainConditionInput
  ) {
    createResultBrain(input: $input, condition: $condition) {
      id
      type
      percentage
      totalCorrect
      totalQuestion
      topics {
        items {
          id
          topicID
          percentage
          totalCorrect
          totalQuestion
          resultBrainID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`,
updateResultBrain: /* GraphQL */ gql`
  mutation UpdateResultBrain(
    $input: UpdateResultBrainInput!
    $condition: ModelResultBrainConditionInput
  ) {
    updateResultBrain(input: $input, condition: $condition) {
      id
      type
      percentage
      totalCorrect
      totalQuestion
      topics {
        items {
          id
          topicID
          percentage
          totalCorrect
          totalQuestion
          resultBrainID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`,
createResultTopic: /* GraphQL */ gql`
  mutation CreateResultTopic(
    $input: CreateResultTopicInput!
    $condition: ModelResultTopicConditionInput
  ) {
    createResultTopic(input: $input, condition: $condition) {
      id
      topicID
      topic {
        id
        name
        brain
        description
        subTopics {
          nextToken
        }
        createdAt
        updatedAt
      }
      percentage
      totalCorrect
      totalQuestion
      resultBrainID
      subTopics {
        items {
          id
          subTopicID
          percentage
          totalCorrect
          totalQuestion
          resultTopicID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`,
updateResultTopic: /* GraphQL */ gql`
  mutation UpdateResultTopic(
    $input: UpdateResultTopicInput!
    $condition: ModelResultTopicConditionInput
  ) {
    updateResultTopic(input: $input, condition: $condition) {
      id
      topicID
      topic {
        id
        name
        brain
        description
        subTopics {
          nextToken
        }
        createdAt
        updatedAt
      }
      percentage
      totalCorrect
      totalQuestion
      resultBrainID
      subTopics {
        items {
          id
          subTopicID
          percentage
          totalCorrect
          totalQuestion
          resultTopicID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`,
createResultSubtopic: /* GraphQL */ gql`
  mutation CreateResultSubtopic(
    $input: CreateResultSubtopicInput!
    $condition: ModelResultSubtopicConditionInput
  ) {
    createResultSubtopic(input: $input, condition: $condition) {
      id
      subTopicID
      subTopic {
        id
        name
        topicID
        topic {
          id
          name
          brain
          description
          createdAt
          updatedAt
        }
        description
        questions {
          nextToken
        }
        paragraphs {
          nextToken
        }
        createdAt
        updatedAt
      }
      percentage
      totalCorrect
      totalQuestion
      resultTopicID
      createdAt
      updatedAt
    }
  }
`,
updateResultSubtopic: /* GraphQL */ gql`
  mutation UpdateResultSubtopic(
    $input: UpdateResultSubtopicInput!
    $condition: ModelResultSubtopicConditionInput
  ) {
    updateResultSubtopic(input: $input, condition: $condition) {
      id
      subTopicID
      subTopic {
        id
        name
        topicID
        topic {
          id
          name
          brain
          description
          createdAt
          updatedAt
        }
        description
        questions {
          nextToken
        }
        paragraphs {
          nextToken
        }
        createdAt
        updatedAt
      }
      percentage
      totalCorrect
      totalQuestion
      resultTopicID
      createdAt
      updatedAt
    }
  }
`,
}
