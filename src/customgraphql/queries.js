export const listEnums = /* GraphQL */ `
  query ListEnums($name: String!) {
    __type(name: $name) {
      name
      enumValues {
        name
      }
    }
  }
`;
export const getTemplateTopic = /* GraphQL */ `
  query GetTemplateTopic($id: ID!) {
    getTemplateTopic(id: $id) {
      id
      name
      topicID
      brain
      templateID
      subtopics {
        items {
          id
          name
          subTopicID
          complexity
          totalQuestion
          templateTopicID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTemplateTopics = /* GraphQL */ `
  query ListTemplateTopics(
    $filter: ModelTemplateTopicFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTemplateTopics(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        topicID
        brain
        templateID
        subtopics {
          items {
            id
            name
            subTopicID
            complexity
            totalQuestion
            templateTopicID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchTemplateTopics = /* GraphQL */ `
  query SearchTemplateTopics(
    $filter: SearchableTemplateTopicFilterInput
    $sort: SearchableTemplateTopicSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchTemplateTopics(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        name
        topicID
        brain
        templateID
        subtopics {
          items {
            id
            name
            subTopicID
            complexity
            totalQuestion
            templateTopicID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const getAnswer = /* GraphQL */ `
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
`;
export const searchQuestions = /* GraphQL */ `
  query SearchQuestions(
    $filter: SearchableQuestionFilterInput
    $sort: SearchableQuestionSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchQuestions(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
          topic {
            id
            name
            brain
            description
          }
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
      nextToken
      total
    }
  }
`;
export const searchSecureQuestions = /* GraphQL */ `
  query SearchQuestions(
    $filter: SearchableQuestionFilterInput
    $sort: SearchableQuestionSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchQuestions(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
          topic {
            id
            name
            brain
            description
          }
          description
          createdAt
          updatedAt
        }
        paragraphID
        options {
          items {
            id
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
      nextToken
      total
    }
  }
`;
export const getSecureQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
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
        topic {
          id
          name
          brain
          description
          createdAt
          updatedAt
        }
        description
        createdAt
        updatedAt
      }
      paragraphID
      options {
        items {
          id
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
  }
`;
export const searchParagraphs = /* GraphQL */ `
  query SearchParagraphs(
    $filter: SearchableParagraphFilterInput
    $sort: SearchableParagraphSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchParagraphs(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        description
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
          }
          description
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchOpenings = /* GraphQL */ `
  query SearchOpenings(
    $filter: SearchableOpeningFilterInput
    $sort: SearchableOpeningSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchOpenings(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchExamResults = /* GraphQL */ `
  query SearchExamResults(
    $filter: SearchableExamResultFilterInput
    $sort: SearchableExamResultSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchExamResults(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
            educations {
              nextToken
            }
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
          isRandom
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
            year
            EAScore
            ExpiryDate
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
              verified
              candidateNumber
              createdAt
              updatedAt
            }
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
            isSimple
            rightID
            right {
              id
              brain
              totalTime
              isOwn
              beginner
              intermediate
              advanced
              high
              veryHigh
              complex
              sections
              createdAt
              updatedAt
            }
            leftID
            left {
              id
              brain
              totalTime
              isOwn
              beginner
              intermediate
              advanced
              high
              veryHigh
              complex
              sections
              createdAt
              updatedAt
            }
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
              verified
              candidateNumber
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          templateType
          improveTemplateID
          improveTemplate {
            id
            name
            description
            departmentID
            department {
              id
              name
              createdAt
              updatedAt
            }
            totalTime
            activate
            publish
            corporateID
            topics {
              items {
                id
                topicID
                brain
                number
                complexity
                min
                avg
                max
                improveTemplateID
                createdAt
                updatedAt
              }
              nextToken
            }
            personalities {
              items {
                id
                name
                min
                max
                improveTemplateID
                createdAt
                updatedAt
              }
              nextToken
            }
            attributes {
              items {
                id
                key
                name
                value
                editable
                base
                improveTemplateID
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          additionalLevels
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
            topics {
              items {
                id
                topicID
                topic {
                  id
                  name
                  brain
                  description
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
                    subTopic {
                      id
                      name
                      topicID
                      description
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
                  nextToken
                }
                createdAt
                updatedAt
              }
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
              items {
                id
                topicID
                topic {
                  id
                  name
                  brain
                  description
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
                    subTopic {
                      id
                      name
                      topicID
                      description
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
                  nextToken
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: SearchableUserSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
          verified
          candidateNumber
          createdAt
          updatedAt
        }
        profileID
        isBlock
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
          educations {
            items {
              id
              profileID
              degree
              branch
              schoolName
              courseName
              instituteName
              collegeName
              universityName
              percentage
              grade
              CGPA
              year
              isOngoing
              place
              state
              country
              createdAt
              updatedAt
            }
            nextToken
          }
          premiumDate
          trainNumber
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
        educations {
          items {
            id
            profileID
            degree
            branch
            schoolName
            courseName
            instituteName
            collegeName
            universityName
            percentage
            grade
            CGPA
            year
            isOngoing
            place
            state
            country
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      isBlock
      createdAt
      updatedAt
    }
  }
`;
export const listDepartments = /* GraphQL */ `
  query ListDepartments(
    $filter: ModelDepartmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDepartments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        templates {
          items {
            id
            name
            description
            departmentID
            totalTime
            activate
            publish
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchDepartments = /* GraphQL */ `
  query SearchDepartments(
    $filter: SearchableDepartmentFilterInput
    $sort: SearchableDepartmentSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchDepartments(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        name
        templates {
          items {
            id
            name
            description
            departmentID
            totalTime
            activate
            publish
            corporateID
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchImproveTemplates = /* GraphQL */ `
  query SearchImproveTemplates(
    $filter: SearchableImproveTemplateFilterInput
    $sort: SearchableImproveTemplateSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchImproveTemplates(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        name
        description
        departmentID
        department {
          id
          name
          createdAt
          updatedAt
        }
        totalTime
        activate
        publish
        topics {
          items {
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
            brain
            number
            complexity
            min
            avg
            max
            improveTemplateID
            createdAt
            updatedAt
          }
          nextToken
        }
        personalities {
          items {
            id
            name
            min
            max
            improveTemplateID
            createdAt
            updatedAt
          }
          nextToken
        }
        attributes {
          items {
            id
            key
            name
            value
            editable
            base
            improveTemplateID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const getImproveTemplate = /* GraphQL */ `
  query GetImproveTemplate($id: ID!) {
    getImproveTemplate(id: $id) {
      id
      name
      description
      departmentID
      department {
        id
        name
        templates {
          nextToken
        }
        createdAt
        updatedAt
      }
      totalTime
      activate
      publish
      topics {
        items {
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
          brain
          number
          complexity
          min
          avg
          max
          improveTemplateID
          createdAt
          updatedAt
        }
        nextToken
      }
      personalities {
        items {
          id
          name
          min
          max
          improveTemplateID
          createdAt
          updatedAt
        }
        nextToken
      }
      attributes {
        items {
          id
          key
          name
          value
          editable
          base
          improveTemplateID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const searchTopics = /* GraphQL */ `
  query SearchTopics(
    $filter: SearchableTopicFilterInput
    $sort: SearchableTopicSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchTopics(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        name
        brain
        description
        subTopics {
          items {
            id
            name
            topicID
            description
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;