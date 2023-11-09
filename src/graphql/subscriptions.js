/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile {
    onCreateProfile {
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
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile {
    onUpdateProfile {
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
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile {
    onDeleteProfile {
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
export const onCreateCorporate = /* GraphQL */ `
  subscription OnCreateCorporate {
    onCreateCorporate {
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
export const onUpdateCorporate = /* GraphQL */ `
  subscription OnUpdateCorporate {
    onUpdateCorporate {
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
export const onDeleteCorporate = /* GraphQL */ `
  subscription OnDeleteCorporate {
    onDeleteCorporate {
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
export const onCreateEducation = /* GraphQL */ `
  subscription OnCreateEducation {
    onCreateEducation {
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
export const onUpdateEducation = /* GraphQL */ `
  subscription OnUpdateEducation {
    onUpdateEducation {
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
export const onDeleteEducation = /* GraphQL */ `
  subscription OnDeleteEducation {
    onDeleteEducation {
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
export const onCreateSettingPrice = /* GraphQL */ `
  subscription OnCreateSettingPrice {
    onCreateSettingPrice {
      id
      corporateDescription
      candidateDescription
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSettingPrice = /* GraphQL */ `
  subscription OnUpdateSettingPrice {
    onUpdateSettingPrice {
      id
      corporateDescription
      candidateDescription
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSettingPrice = /* GraphQL */ `
  subscription OnDeleteSettingPrice {
    onDeleteSettingPrice {
      id
      corporateDescription
      candidateDescription
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePriceCorporate = /* GraphQL */ `
  subscription OnCreatePriceCorporate {
    onCreatePriceCorporate {
      id
      name
      price
      number
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePriceCorporate = /* GraphQL */ `
  subscription OnUpdatePriceCorporate {
    onUpdatePriceCorporate {
      id
      name
      price
      number
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePriceCorporate = /* GraphQL */ `
  subscription OnDeletePriceCorporate {
    onDeletePriceCorporate {
      id
      name
      price
      number
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCouponCorporate = /* GraphQL */ `
  subscription OnCreateCouponCorporate {
    onCreateCouponCorporate {
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
export const onUpdateCouponCorporate = /* GraphQL */ `
  subscription OnUpdateCouponCorporate {
    onUpdateCouponCorporate {
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
export const onDeleteCouponCorporate = /* GraphQL */ `
  subscription OnDeleteCouponCorporate {
    onDeleteCouponCorporate {
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
export const onCreatePriceCandidate = /* GraphQL */ `
  subscription OnCreatePriceCandidate {
    onCreatePriceCandidate {
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
export const onUpdatePriceCandidate = /* GraphQL */ `
  subscription OnUpdatePriceCandidate {
    onUpdatePriceCandidate {
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
export const onDeletePriceCandidate = /* GraphQL */ `
  subscription OnDeletePriceCandidate {
    onDeletePriceCandidate {
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
export const onCreateCouponCandidate = /* GraphQL */ `
  subscription OnCreateCouponCandidate {
    onCreateCouponCandidate {
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
export const onUpdateCouponCandidate = /* GraphQL */ `
  subscription OnUpdateCouponCandidate {
    onUpdateCouponCandidate {
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
export const onDeleteCouponCandidate = /* GraphQL */ `
  subscription OnDeleteCouponCandidate {
    onDeleteCouponCandidate {
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
export const onCreateTopic = /* GraphQL */ `
  subscription OnCreateTopic {
    onCreateTopic {
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
export const onUpdateTopic = /* GraphQL */ `
  subscription OnUpdateTopic {
    onUpdateTopic {
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
export const onDeleteTopic = /* GraphQL */ `
  subscription OnDeleteTopic {
    onDeleteTopic {
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
export const onCreateSubTopic = /* GraphQL */ `
  subscription OnCreateSubTopic {
    onCreateSubTopic {
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
export const onUpdateSubTopic = /* GraphQL */ `
  subscription OnUpdateSubTopic {
    onUpdateSubTopic {
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
export const onDeleteSubTopic = /* GraphQL */ `
  subscription OnDeleteSubTopic {
    onDeleteSubTopic {
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
export const onCreateOption = /* GraphQL */ `
  subscription OnCreateOption {
    onCreateOption {
      id
      isTrue
      description
      questionID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOption = /* GraphQL */ `
  subscription OnUpdateOption {
    onUpdateOption {
      id
      isTrue
      description
      questionID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOption = /* GraphQL */ `
  subscription OnDeleteOption {
    onDeleteOption {
      id
      isTrue
      description
      questionID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
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
export const onCreateParagraph = /* GraphQL */ `
  subscription OnCreateParagraph {
    onCreateParagraph {
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
export const onUpdateParagraph = /* GraphQL */ `
  subscription OnUpdateParagraph {
    onUpdateParagraph {
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
export const onDeleteParagraph = /* GraphQL */ `
  subscription OnDeleteParagraph {
    onDeleteParagraph {
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
export const onCreateTemplate = /* GraphQL */ `
  subscription OnCreateTemplate {
    onCreateTemplate {
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
export const onUpdateTemplate = /* GraphQL */ `
  subscription OnUpdateTemplate {
    onUpdateTemplate {
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
export const onDeleteTemplate = /* GraphQL */ `
  subscription OnDeleteTemplate {
    onDeleteTemplate {
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
export const onCreateTemplateTopic = /* GraphQL */ `
  subscription OnCreateTemplateTopic {
    onCreateTemplateTopic {
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
export const onUpdateTemplateTopic = /* GraphQL */ `
  subscription OnUpdateTemplateTopic {
    onUpdateTemplateTopic {
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
export const onDeleteTemplateTopic = /* GraphQL */ `
  subscription OnDeleteTemplateTopic {
    onDeleteTemplateTopic {
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
export const onCreateTemplateSubTopic = /* GraphQL */ `
  subscription OnCreateTemplateSubTopic {
    onCreateTemplateSubTopic {
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
export const onUpdateTemplateSubTopic = /* GraphQL */ `
  subscription OnUpdateTemplateSubTopic {
    onUpdateTemplateSubTopic {
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
export const onDeleteTemplateSubTopic = /* GraphQL */ `
  subscription OnDeleteTemplateSubTopic {
    onDeleteTemplateSubTopic {
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
export const onCreateSimpleBrainTemplate = /* GraphQL */ `
  subscription OnCreateSimpleBrainTemplate {
    onCreateSimpleBrainTemplate {
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
export const onUpdateSimpleBrainTemplate = /* GraphQL */ `
  subscription OnUpdateSimpleBrainTemplate {
    onUpdateSimpleBrainTemplate {
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
export const onDeleteSimpleBrainTemplate = /* GraphQL */ `
  subscription OnDeleteSimpleBrainTemplate {
    onDeleteSimpleBrainTemplate {
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
export const onCreateExamSection = /* GraphQL */ `
  subscription OnCreateExamSection {
    onCreateExamSection {
      id
      questionID
      brain
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateExamSection = /* GraphQL */ `
  subscription OnUpdateExamSection {
    onUpdateExamSection {
      id
      questionID
      brain
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteExamSection = /* GraphQL */ `
  subscription OnDeleteExamSection {
    onDeleteExamSection {
      id
      questionID
      brain
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateExam = /* GraphQL */ `
  subscription OnCreateExam {
    onCreateExam {
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
export const onUpdateExam = /* GraphQL */ `
  subscription OnUpdateExam {
    onUpdateExam {
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
export const onDeleteExam = /* GraphQL */ `
  subscription OnDeleteExam {
    onDeleteExam {
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
export const onCreateTrain = /* GraphQL */ `
  subscription OnCreateTrain {
    onCreateTrain {
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
export const onUpdateTrain = /* GraphQL */ `
  subscription OnUpdateTrain {
    onUpdateTrain {
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
export const onDeleteTrain = /* GraphQL */ `
  subscription OnDeleteTrain {
    onDeleteTrain {
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
export const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer {
    onCreateAnswer {
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
export const onUpdateAnswer = /* GraphQL */ `
  subscription OnUpdateAnswer {
    onUpdateAnswer {
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
export const onDeleteAnswer = /* GraphQL */ `
  subscription OnDeleteAnswer {
    onDeleteAnswer {
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
export const onCreateAnswerSection = /* GraphQL */ `
  subscription OnCreateAnswerSection {
    onCreateAnswerSection {
      id
      answer
      type
      state
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAnswerSection = /* GraphQL */ `
  subscription OnUpdateAnswerSection {
    onUpdateAnswerSection {
      id
      answer
      type
      state
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAnswerSection = /* GraphQL */ `
  subscription OnDeleteAnswerSection {
    onDeleteAnswerSection {
      id
      answer
      type
      state
      createdAt
      updatedAt
    }
  }
`;
export const onCreateExamResult = /* GraphQL */ `
  subscription OnCreateExamResult {
    onCreateExamResult {
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
export const onUpdateExamResult = /* GraphQL */ `
  subscription OnUpdateExamResult {
    onUpdateExamResult {
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
export const onDeleteExamResult = /* GraphQL */ `
  subscription OnDeleteExamResult {
    onDeleteExamResult {
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
export const onCreateResult = /* GraphQL */ `
  subscription OnCreateResult {
    onCreateResult {
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
export const onUpdateResult = /* GraphQL */ `
  subscription OnUpdateResult {
    onUpdateResult {
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
export const onDeleteResult = /* GraphQL */ `
  subscription OnDeleteResult {
    onDeleteResult {
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
export const onCreateResultBrain = /* GraphQL */ `
  subscription OnCreateResultBrain {
    onCreateResultBrain {
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
export const onUpdateResultBrain = /* GraphQL */ `
  subscription OnUpdateResultBrain {
    onUpdateResultBrain {
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
export const onDeleteResultBrain = /* GraphQL */ `
  subscription OnDeleteResultBrain {
    onDeleteResultBrain {
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
export const onCreateResultTopic = /* GraphQL */ `
  subscription OnCreateResultTopic {
    onCreateResultTopic {
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
export const onUpdateResultTopic = /* GraphQL */ `
  subscription OnUpdateResultTopic {
    onUpdateResultTopic {
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
export const onDeleteResultTopic = /* GraphQL */ `
  subscription OnDeleteResultTopic {
    onDeleteResultTopic {
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
export const onCreateResultSubtopic = /* GraphQL */ `
  subscription OnCreateResultSubtopic {
    onCreateResultSubtopic {
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
export const onUpdateResultSubtopic = /* GraphQL */ `
  subscription OnUpdateResultSubtopic {
    onUpdateResultSubtopic {
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
export const onDeleteResultSubtopic = /* GraphQL */ `
  subscription OnDeleteResultSubtopic {
    onDeleteResultSubtopic {
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
export const onCreateScreen = /* GraphQL */ `
  subscription OnCreateScreen {
    onCreateScreen {
      id
      type
      image
      examResultID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateScreen = /* GraphQL */ `
  subscription OnUpdateScreen {
    onUpdateScreen {
      id
      type
      image
      examResultID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteScreen = /* GraphQL */ `
  subscription OnDeleteScreen {
    onDeleteScreen {
      id
      type
      image
      examResultID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOpening = /* GraphQL */ `
  subscription OnCreateOpening {
    onCreateOpening {
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
export const onUpdateOpening = /* GraphQL */ `
  subscription OnUpdateOpening {
    onUpdateOpening {
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
export const onDeleteOpening = /* GraphQL */ `
  subscription OnDeleteOpening {
    onDeleteOpening {
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
export const onCreateFavoriteCorporate = /* GraphQL */ `
  subscription OnCreateFavoriteCorporate {
    onCreateFavoriteCorporate {
      id
      userID
      corporateID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFavoriteCorporate = /* GraphQL */ `
  subscription OnUpdateFavoriteCorporate {
    onUpdateFavoriteCorporate {
      id
      userID
      corporateID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFavoriteCorporate = /* GraphQL */ `
  subscription OnDeleteFavoriteCorporate {
    onDeleteFavoriteCorporate {
      id
      userID
      corporateID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFavoriteOpening = /* GraphQL */ `
  subscription OnCreateFavoriteOpening {
    onCreateFavoriteOpening {
      id
      userID
      openingID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFavoriteOpening = /* GraphQL */ `
  subscription OnUpdateFavoriteOpening {
    onUpdateFavoriteOpening {
      id
      userID
      openingID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFavoriteOpening = /* GraphQL */ `
  subscription OnDeleteFavoriteOpening {
    onDeleteFavoriteOpening {
      id
      userID
      openingID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFavoriteExam = /* GraphQL */ `
  subscription OnCreateFavoriteExam {
    onCreateFavoriteExam {
      id
      userID
      examID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFavoriteExam = /* GraphQL */ `
  subscription OnUpdateFavoriteExam {
    onUpdateFavoriteExam {
      id
      userID
      examID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFavoriteExam = /* GraphQL */ `
  subscription OnDeleteFavoriteExam {
    onDeleteFavoriteExam {
      id
      userID
      examID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
      id
      name
      description
      userID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
      id
      name
      description
      userID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
      id
      name
      description
      userID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDepartment = /* GraphQL */ `
  subscription OnCreateDepartment {
    onCreateDepartment {
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
export const onUpdateDepartment = /* GraphQL */ `
  subscription OnUpdateDepartment {
    onUpdateDepartment {
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
export const onDeleteDepartment = /* GraphQL */ `
  subscription OnDeleteDepartment {
    onDeleteDepartment {
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
export const onCreateImproveTemplate = /* GraphQL */ `
  subscription OnCreateImproveTemplate {
    onCreateImproveTemplate {
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
export const onUpdateImproveTemplate = /* GraphQL */ `
  subscription OnUpdateImproveTemplate {
    onUpdateImproveTemplate {
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
export const onDeleteImproveTemplate = /* GraphQL */ `
  subscription OnDeleteImproveTemplate {
    onDeleteImproveTemplate {
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
export const onCreateImproveTemplateTopic = /* GraphQL */ `
  subscription OnCreateImproveTemplateTopic {
    onCreateImproveTemplateTopic {
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
export const onUpdateImproveTemplateTopic = /* GraphQL */ `
  subscription OnUpdateImproveTemplateTopic {
    onUpdateImproveTemplateTopic {
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
export const onDeleteImproveTemplateTopic = /* GraphQL */ `
  subscription OnDeleteImproveTemplateTopic {
    onDeleteImproveTemplateTopic {
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
export const onCreatePersonality = /* GraphQL */ `
  subscription OnCreatePersonality {
    onCreatePersonality {
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
export const onUpdatePersonality = /* GraphQL */ `
  subscription OnUpdatePersonality {
    onUpdatePersonality {
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
export const onDeletePersonality = /* GraphQL */ `
  subscription OnDeletePersonality {
    onDeletePersonality {
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
export const onCreateAttribute = /* GraphQL */ `
  subscription OnCreateAttribute {
    onCreateAttribute {
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
export const onUpdateAttribute = /* GraphQL */ `
  subscription OnUpdateAttribute {
    onUpdateAttribute {
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
export const onDeleteAttribute = /* GraphQL */ `
  subscription OnDeleteAttribute {
    onDeleteAttribute {
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
