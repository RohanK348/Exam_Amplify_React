/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        verified
        candidateNumber
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
          nextToken
        }
        premiumDate
        trainNumber
        createdAt
        updatedAt
      }
      isBlock
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          premiumDate
          trainNumber
          createdAt
          updatedAt
        }
        isBlock
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
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
  }
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        premiumDate
        trainNumber
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCorporate = /* GraphQL */ `
  query GetCorporate($id: ID!) {
    getCorporate(id: $id) {
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
  }
`;
export const listCorporates = /* GraphQL */ `
  query ListCorporates(
    $filter: ModelCorporateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCorporates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getEducation = /* GraphQL */ `
  query GetEducation($id: ID!) {
    getEducation(id: $id) {
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
  }
`;
export const listEducations = /* GraphQL */ `
  query ListEducations(
    $filter: ModelEducationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEducations(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getSettingPrice = /* GraphQL */ `
  query GetSettingPrice($id: ID!) {
    getSettingPrice(id: $id) {
      id
      corporateDescription
      candidateDescription
      createdAt
      updatedAt
    }
  }
`;
export const listSettingPrices = /* GraphQL */ `
  query ListSettingPrices(
    $filter: ModelSettingPriceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSettingPrices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        corporateDescription
        candidateDescription
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPriceCorporate = /* GraphQL */ `
  query GetPriceCorporate($id: ID!) {
    getPriceCorporate(id: $id) {
      id
      name
      price
      number
      createdAt
      updatedAt
    }
  }
`;
export const listPriceCorporates = /* GraphQL */ `
  query ListPriceCorporates(
    $filter: ModelPriceCorporateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPriceCorporates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        price
        number
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCouponCorporate = /* GraphQL */ `
  query GetCouponCorporate($id: ID!) {
    getCouponCorporate(id: $id) {
      id
      priceID
      price {
        id
        name
        price
        number
        createdAt
        updatedAt
      }
      code
      isFree
      percentage
      createdAt
      updatedAt
    }
  }
`;
export const listCouponCorporates = /* GraphQL */ `
  query ListCouponCorporates(
    $filter: ModelCouponCorporateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCouponCorporates(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        priceID
        price {
          id
          name
          price
          number
          createdAt
          updatedAt
        }
        code
        isFree
        percentage
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPriceCandidate = /* GraphQL */ `
  query GetPriceCandidate($id: ID!) {
    getPriceCandidate(id: $id) {
      id
      name
      price
      month
      train
      details
      createdAt
      updatedAt
    }
  }
`;
export const listPriceCandidates = /* GraphQL */ `
  query ListPriceCandidates(
    $filter: ModelPriceCandidateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPriceCandidates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        price
        month
        train
        details
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCouponCandidate = /* GraphQL */ `
  query GetCouponCandidate($id: ID!) {
    getCouponCandidate(id: $id) {
      id
      priceID
      price {
        id
        name
        price
        month
        train
        details
        createdAt
        updatedAt
      }
      code
      isFree
      percentage
      createdAt
      updatedAt
    }
  }
`;
export const listCouponCandidates = /* GraphQL */ `
  query ListCouponCandidates(
    $filter: ModelCouponCandidateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCouponCandidates(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        priceID
        price {
          id
          name
          price
          month
          train
          details
          createdAt
          updatedAt
        }
        code
        isFree
        percentage
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTopic = /* GraphQL */ `
  query GetTopic($id: ID!) {
    getTopic(id: $id) {
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
  }
`;
export const listTopics = /* GraphQL */ `
  query ListTopics(
    $filter: ModelTopicFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTopics(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getSubTopic = /* GraphQL */ `
  query GetSubTopic($id: ID!) {
    getSubTopic(id: $id) {
      id
      name
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
      description
      createdAt
      updatedAt
    }
  }
`;
export const listSubTopics = /* GraphQL */ `
  query ListSubTopics(
    $filter: ModelSubTopicFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubTopics(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getOption = /* GraphQL */ `
  query GetOption($id: ID!) {
    getOption(id: $id) {
      id
      isTrue
      description
      questionID
      createdAt
      updatedAt
    }
  }
`;
export const listOptions = /* GraphQL */ `
  query ListOptions(
    $filter: ModelOptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOptions(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getQuestion = /* GraphQL */ `
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
          isTrue
          description
          questionID
          createdAt
          updatedAt
        }
        nextToken
      }
      isAdmin
      createdAt
      updatedAt
    }
  }
`;
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          description
          createdAt
          updatedAt
        }
        paragraphID
        options {
          nextToken
        }
        isAdmin
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getParagraph = /* GraphQL */ `
  query GetParagraph($id: ID!) {
    getParagraph(id: $id) {
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
          createdAt
          updatedAt
        }
        description
        createdAt
        updatedAt
      }
      isAdmin
      createdAt
      updatedAt
    }
  }
`;
export const listParagraphs = /* GraphQL */ `
  query ListParagraphs(
    $filter: ModelParagraphFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listParagraphs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        subTopicID
        subTopic {
          id
          name
          topicID
          description
          createdAt
          updatedAt
        }
        isAdmin
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTemplate = /* GraphQL */ `
  query GetTemplate($id: ID!) {
    getTemplate(id: $id) {
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
  }
`;
export const listTemplates = /* GraphQL */ `
  query ListTemplates(
    $filter: ModelTemplateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTemplates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
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
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTemplateSubTopic = /* GraphQL */ `
  query GetTemplateSubTopic($id: ID!) {
    getTemplateSubTopic(id: $id) {
      id
      name
      subTopicID
      complexity
      totalQuestion
      templateTopicID
      createdAt
      updatedAt
    }
  }
`;
export const listTemplateSubTopics = /* GraphQL */ `
  query ListTemplateSubTopics(
    $filter: ModelTemplateSubTopicFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTemplateSubTopics(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getSimpleBrainTemplate = /* GraphQL */ `
  query GetSimpleBrainTemplate($id: ID!) {
    getSimpleBrainTemplate(id: $id) {
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
  }
`;
export const listSimpleBrainTemplates = /* GraphQL */ `
  query ListSimpleBrainTemplates(
    $filter: ModelSimpleBrainTemplateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSimpleBrainTemplates(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getExamSection = /* GraphQL */ `
  query GetExamSection($id: ID!) {
    getExamSection(id: $id) {
      id
      questionID
      brain
      type
      createdAt
      updatedAt
    }
  }
`;
export const listExamSections = /* GraphQL */ `
  query ListExamSections(
    $filter: ModelExamSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExamSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        questionID
        brain
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getExam = /* GraphQL */ `
  query GetExam($id: ID!) {
    getExam(id: $id) {
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
          nextToken
        }
        personalities {
          nextToken
        }
        attributes {
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
  }
`;
export const listExams = /* GraphQL */ `
  query ListExams(
    $filter: ModelExamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          leftID
          corporateID
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
          totalTime
          activate
          publish
          corporateID
          createdAt
          updatedAt
        }
        additionalLevels
        startDate
        endDate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTrain = /* GraphQL */ `
  query GetTrain($id: ID!) {
    getTrain(id: $id) {
      id
      userID
      templateID
      examIndex
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
          leftID
          corporateID
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
          totalTime
          activate
          publish
          corporateID
          createdAt
          updatedAt
        }
        additionalLevels
        startDate
        endDate
        createdAt
        updatedAt
      }
      examResultID
      examResult {
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
          isBlock
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
          templateID
          templateType
          improveTemplateID
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
        isTrain
        corporateID
        resultID
        percentage
        result {
          id
          percentage
          totalCorrect
          totalQuestion
          rightID
          leftID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      resultShowIndex
      createdAt
      updatedAt
    }
  }
`;
export const listTrains = /* GraphQL */ `
  query ListTrains(
    $filter: ModelTrainFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrains(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        templateID
        examIndex
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
          templateID
          templateType
          improveTemplateID
          additionalLevels
          startDate
          endDate
          createdAt
          updatedAt
        }
        examResultID
        examResult {
          id
          userID
          examID
          questionIndex
          backNumber
          startTime
          right
          left
          isTrain
          corporateID
          resultID
          percentage
          createdAt
          updatedAt
        }
        resultShowIndex
        createdAt
        updatedAt
      }
      nextToken
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
          nextToken
        }
        isAdmin
        createdAt
        updatedAt
      }
      answerOptions
      createdAt
      updatedAt
    }
  }
`;
export const listAnswers = /* GraphQL */ `
  query ListAnswers(
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          paragraphID
          isAdmin
          createdAt
          updatedAt
        }
        answerOptions
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAnswerSection = /* GraphQL */ `
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
`;
export const listAnswerSections = /* GraphQL */ `
  query ListAnswerSections(
    $filter: ModelAnswerSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnswerSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        answer
        type
        state
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getExamResult = /* GraphQL */ `
  query GetExamResult($id: ID!) {
    getExamResult(id: $id) {
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
          verified
          candidateNumber
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
          premiumDate
          trainNumber
          createdAt
          updatedAt
        }
        isBlock
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
          leftID
          corporateID
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
          totalTime
          activate
          publish
          corporateID
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
      isTrain
      corporateID
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
`;
export const listExamResults = /* GraphQL */ `
  query ListExamResults(
    $filter: ModelExamResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExamResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          isBlock
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
          templateID
          templateType
          improveTemplateID
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
        isTrain
        corporateID
        resultID
        percentage
        result {
          id
          percentage
          totalCorrect
          totalQuestion
          rightID
          leftID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getResult = /* GraphQL */ `
  query GetResult($id: ID!) {
    getResult(id: $id) {
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
`;
export const listResults = /* GraphQL */ `
  query ListResults(
    $filter: ModelResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getResultBrain = /* GraphQL */ `
  query GetResultBrain($id: ID!) {
    getResultBrain(id: $id) {
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
`;
export const listResultBrains = /* GraphQL */ `
  query ListResultBrains(
    $filter: ModelResultBrainFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResultBrains(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getResultTopic = /* GraphQL */ `
  query GetResultTopic($id: ID!) {
    getResultTopic(id: $id) {
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
`;
export const listResultTopics = /* GraphQL */ `
  query ListResultTopics(
    $filter: ModelResultTopicFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResultTopics(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getResultSubtopic = /* GraphQL */ `
  query GetResultSubtopic($id: ID!) {
    getResultSubtopic(id: $id) {
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
`;
export const listResultSubtopics = /* GraphQL */ `
  query ListResultSubtopics(
    $filter: ModelResultSubtopicFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResultSubtopics(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getScreen = /* GraphQL */ `
  query GetScreen($id: ID!) {
    getScreen(id: $id) {
      id
      type
      image
      examResultID
      createdAt
      updatedAt
    }
  }
`;
export const listScreens = /* GraphQL */ `
  query ListScreens(
    $filter: ModelScreenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScreens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        image
        examResultID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOpening = /* GraphQL */ `
  query GetOpening($id: ID!) {
    getOpening(id: $id) {
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
  }
`;
export const listOpenings = /* GraphQL */ `
  query ListOpenings(
    $filter: ModelOpeningFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpenings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getFavoriteCorporate = /* GraphQL */ `
  query GetFavoriteCorporate($id: ID!) {
    getFavoriteCorporate(id: $id) {
      id
      userID
      corporateID
      createdAt
      updatedAt
    }
  }
`;
export const listFavoriteCorporates = /* GraphQL */ `
  query ListFavoriteCorporates(
    $filter: ModelFavoriteCorporateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavoriteCorporates(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        corporateID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFavoriteOpening = /* GraphQL */ `
  query GetFavoriteOpening($id: ID!) {
    getFavoriteOpening(id: $id) {
      id
      userID
      openingID
      createdAt
      updatedAt
    }
  }
`;
export const listFavoriteOpenings = /* GraphQL */ `
  query ListFavoriteOpenings(
    $filter: ModelFavoriteOpeningFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavoriteOpenings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        openingID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFavoriteExam = /* GraphQL */ `
  query GetFavoriteExam($id: ID!) {
    getFavoriteExam(id: $id) {
      id
      userID
      examID
      createdAt
      updatedAt
    }
  }
`;
export const listFavoriteExams = /* GraphQL */ `
  query ListFavoriteExams(
    $filter: ModelFavoriteExamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavoriteExams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        examID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      name
      description
      userID
      createdAt
      updatedAt
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDepartment = /* GraphQL */ `
  query GetDepartment($id: ID!) {
    getDepartment(id: $id) {
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
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
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
  }
`;
export const listImproveTemplates = /* GraphQL */ `
  query ListImproveTemplates(
    $filter: ModelImproveTemplateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImproveTemplates(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
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
        corporateID
        topics {
          nextToken
        }
        personalities {
          nextToken
        }
        attributes {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getImproveTemplateTopic = /* GraphQL */ `
  query GetImproveTemplateTopic($id: ID!) {
    getImproveTemplateTopic(id: $id) {
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
  }
`;
export const listImproveTemplateTopics = /* GraphQL */ `
  query ListImproveTemplateTopics(
    $filter: ModelImproveTemplateTopicFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImproveTemplateTopics(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getPersonality = /* GraphQL */ `
  query GetPersonality($id: ID!) {
    getPersonality(id: $id) {
      id
      name
      min
      max
      improveTemplateID
      createdAt
      updatedAt
    }
  }
`;
export const listPersonalitys = /* GraphQL */ `
  query ListPersonalitys(
    $filter: ModelPersonalityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPersonalitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getAttribute = /* GraphQL */ `
  query GetAttribute($id: ID!) {
    getAttribute(id: $id) {
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
  }
`;
export const listAttributes = /* GraphQL */ `
  query ListAttributes(
    $filter: ModelAttributeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttributes(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          premiumDate
          trainNumber
          createdAt
          updatedAt
        }
        isBlock
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchProfiles = /* GraphQL */ `
  query SearchProfiles(
    $filter: SearchableProfileFilterInput
    $sort: SearchableProfileSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchProfiles(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
        premiumDate
        trainNumber
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchCorporates = /* GraphQL */ `
  query SearchCorporates(
    $filter: SearchableCorporateFilterInput
    $sort: SearchableCorporateSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchCorporates(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
      nextToken
      total
    }
  }
`;
export const searchEducations = /* GraphQL */ `
  query SearchEducations(
    $filter: SearchableEducationFilterInput
    $sort: SearchableEducationSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchEducations(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
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
      total
    }
  }
`;
export const searchCouponCorporates = /* GraphQL */ `
  query SearchCouponCorporates(
    $filter: SearchableCouponCorporateFilterInput
    $sort: SearchableCouponCorporateSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchCouponCorporates(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        priceID
        price {
          id
          name
          price
          number
          createdAt
          updatedAt
        }
        code
        isFree
        percentage
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchCouponCandidates = /* GraphQL */ `
  query SearchCouponCandidates(
    $filter: SearchableCouponCandidateFilterInput
    $sort: SearchableCouponCandidateSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchCouponCandidates(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        priceID
        price {
          id
          name
          price
          month
          train
          details
          createdAt
          updatedAt
        }
        code
        isFree
        percentage
        createdAt
        updatedAt
      }
      nextToken
      total
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
export const searchSubTopics = /* GraphQL */ `
  query SearchSubTopics(
    $filter: SearchableSubTopicFilterInput
    $sort: SearchableSubTopicSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchSubTopics(
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
      nextToken
      total
    }
  }
`;
export const searchOptions = /* GraphQL */ `
  query SearchOptions(
    $filter: SearchableOptionFilterInput
    $sort: SearchableOptionSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchOptions(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        isTrue
        description
        questionID
        createdAt
        updatedAt
      }
      nextToken
      total
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
          description
          createdAt
          updatedAt
        }
        paragraphID
        options {
          nextToken
        }
        isAdmin
        createdAt
        updatedAt
      }
      nextToken
      total
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
          description
          createdAt
          updatedAt
        }
        isAdmin
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchTemplates = /* GraphQL */ `
  query SearchTemplates(
    $filter: SearchableTemplateFilterInput
    $sort: SearchableTemplateSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchTemplates(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
      nextToken
      total
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
export const searchTemplateSubTopics = /* GraphQL */ `
  query SearchTemplateSubTopics(
    $filter: SearchableTemplateSubTopicFilterInput
    $sort: SearchableTemplateSubTopicSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchTemplateSubTopics(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
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
      total
    }
  }
`;
export const searchSimpleBrainTemplates = /* GraphQL */ `
  query SearchSimpleBrainTemplates(
    $filter: SearchableSimpleBrainTemplateFilterInput
    $sort: SearchableSimpleBrainTemplateSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchSimpleBrainTemplates(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
      nextToken
      total
    }
  }
`;
export const searchExamSections = /* GraphQL */ `
  query SearchExamSections(
    $filter: SearchableExamSectionFilterInput
    $sort: SearchableExamSectionSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchExamSections(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        questionID
        brain
        type
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchExams = /* GraphQL */ `
  query SearchExams(
    $filter: SearchableExamFilterInput
    $sort: SearchableExamSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchExams(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
          leftID
          corporateID
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
          totalTime
          activate
          publish
          corporateID
          createdAt
          updatedAt
        }
        additionalLevels
        startDate
        endDate
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchTrains = /* GraphQL */ `
  query SearchTrains(
    $filter: SearchableTrainFilterInput
    $sort: SearchableTrainSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchTrains(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        userID
        templateID
        examIndex
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
          templateID
          templateType
          improveTemplateID
          additionalLevels
          startDate
          endDate
          createdAt
          updatedAt
        }
        examResultID
        examResult {
          id
          userID
          examID
          questionIndex
          backNumber
          startTime
          right
          left
          isTrain
          corporateID
          resultID
          percentage
          createdAt
          updatedAt
        }
        resultShowIndex
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchAnswers = /* GraphQL */ `
  query SearchAnswers(
    $filter: SearchableAnswerFilterInput
    $sort: SearchableAnswerSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchAnswers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
          paragraphID
          isAdmin
          createdAt
          updatedAt
        }
        answerOptions
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchAnswerSections = /* GraphQL */ `
  query SearchAnswerSections(
    $filter: SearchableAnswerSectionFilterInput
    $sort: SearchableAnswerSectionSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchAnswerSections(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        answer
        type
        state
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
          isBlock
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
          templateID
          templateType
          improveTemplateID
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
        isTrain
        corporateID
        resultID
        percentage
        result {
          id
          percentage
          totalCorrect
          totalQuestion
          rightID
          leftID
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
export const searchResults = /* GraphQL */ `
  query SearchResults(
    $filter: SearchableResultFilterInput
    $sort: SearchableResultSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchResults(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
      nextToken
      total
    }
  }
`;
export const searchResultBrains = /* GraphQL */ `
  query SearchResultBrains(
    $filter: SearchableResultBrainFilterInput
    $sort: SearchableResultBrainSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchResultBrains(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
      nextToken
      total
    }
  }
`;
export const searchResultTopics = /* GraphQL */ `
  query SearchResultTopics(
    $filter: SearchableResultTopicFilterInput
    $sort: SearchableResultTopicSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchResultTopics(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
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
export const searchResultSubtopics = /* GraphQL */ `
  query SearchResultSubtopics(
    $filter: SearchableResultSubtopicFilterInput
    $sort: SearchableResultSubtopicSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchResultSubtopics(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
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
      total
    }
  }
`;
export const searchScreens = /* GraphQL */ `
  query SearchScreens(
    $filter: SearchableScreenFilterInput
    $sort: SearchableScreenSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchScreens(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        type
        image
        examResultID
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
      nextToken
      total
    }
  }
`;
export const searchFavoriteCorporates = /* GraphQL */ `
  query SearchFavoriteCorporates(
    $filter: SearchableFavoriteCorporateFilterInput
    $sort: SearchableFavoriteCorporateSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchFavoriteCorporates(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        userID
        corporateID
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchFavoriteOpenings = /* GraphQL */ `
  query SearchFavoriteOpenings(
    $filter: SearchableFavoriteOpeningFilterInput
    $sort: SearchableFavoriteOpeningSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchFavoriteOpenings(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        userID
        openingID
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchFavoriteExams = /* GraphQL */ `
  query SearchFavoriteExams(
    $filter: SearchableFavoriteExamFilterInput
    $sort: SearchableFavoriteExamSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchFavoriteExams(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        userID
        examID
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchNotifications = /* GraphQL */ `
  query SearchNotifications(
    $filter: SearchableNotificationFilterInput
    $sort: SearchableNotificationSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchNotifications(
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
        userID
        createdAt
        updatedAt
      }
      nextToken
      total
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
        corporateID
        topics {
          nextToken
        }
        personalities {
          nextToken
        }
        attributes {
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
export const searchImproveTemplateTopics = /* GraphQL */ `
  query SearchImproveTemplateTopics(
    $filter: SearchableImproveTemplateTopicFilterInput
    $sort: SearchableImproveTemplateTopicSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchImproveTemplateTopics(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
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
      total
    }
  }
`;
export const searchPersonalitys = /* GraphQL */ `
  query SearchPersonalitys(
    $filter: SearchablePersonalityFilterInput
    $sort: SearchablePersonalitySortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchPersonalitys(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
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
      total
    }
  }
`;
export const searchAttributes = /* GraphQL */ `
  query SearchAttributes(
    $filter: SearchableAttributeFilterInput
    $sort: SearchableAttributeSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchAttributes(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
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
      total
    }
  }
`;
