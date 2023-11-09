/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
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
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
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
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
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
export const createCorporate = /* GraphQL */ `
  mutation CreateCorporate(
    $input: CreateCorporateInput!
    $condition: ModelCorporateConditionInput
  ) {
    createCorporate(input: $input, condition: $condition) {
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
export const updateCorporate = /* GraphQL */ `
  mutation UpdateCorporate(
    $input: UpdateCorporateInput!
    $condition: ModelCorporateConditionInput
  ) {
    updateCorporate(input: $input, condition: $condition) {
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
export const deleteCorporate = /* GraphQL */ `
  mutation DeleteCorporate(
    $input: DeleteCorporateInput!
    $condition: ModelCorporateConditionInput
  ) {
    deleteCorporate(input: $input, condition: $condition) {
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
export const createEducation = /* GraphQL */ `
  mutation CreateEducation(
    $input: CreateEducationInput!
    $condition: ModelEducationConditionInput
  ) {
    createEducation(input: $input, condition: $condition) {
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
export const updateEducation = /* GraphQL */ `
  mutation UpdateEducation(
    $input: UpdateEducationInput!
    $condition: ModelEducationConditionInput
  ) {
    updateEducation(input: $input, condition: $condition) {
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
export const deleteEducation = /* GraphQL */ `
  mutation DeleteEducation(
    $input: DeleteEducationInput!
    $condition: ModelEducationConditionInput
  ) {
    deleteEducation(input: $input, condition: $condition) {
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
export const createSettingPrice = /* GraphQL */ `
  mutation CreateSettingPrice(
    $input: CreateSettingPriceInput!
    $condition: ModelSettingPriceConditionInput
  ) {
    createSettingPrice(input: $input, condition: $condition) {
      id
      corporateDescription
      candidateDescription
      createdAt
      updatedAt
    }
  }
`;
export const updateSettingPrice = /* GraphQL */ `
  mutation UpdateSettingPrice(
    $input: UpdateSettingPriceInput!
    $condition: ModelSettingPriceConditionInput
  ) {
    updateSettingPrice(input: $input, condition: $condition) {
      id
      corporateDescription
      candidateDescription
      createdAt
      updatedAt
    }
  }
`;
export const deleteSettingPrice = /* GraphQL */ `
  mutation DeleteSettingPrice(
    $input: DeleteSettingPriceInput!
    $condition: ModelSettingPriceConditionInput
  ) {
    deleteSettingPrice(input: $input, condition: $condition) {
      id
      corporateDescription
      candidateDescription
      createdAt
      updatedAt
    }
  }
`;
export const createPriceCorporate = /* GraphQL */ `
  mutation CreatePriceCorporate(
    $input: CreatePriceCorporateInput!
    $condition: ModelPriceCorporateConditionInput
  ) {
    createPriceCorporate(input: $input, condition: $condition) {
      id
      name
      price
      number
      createdAt
      updatedAt
    }
  }
`;
export const updatePriceCorporate = /* GraphQL */ `
  mutation UpdatePriceCorporate(
    $input: UpdatePriceCorporateInput!
    $condition: ModelPriceCorporateConditionInput
  ) {
    updatePriceCorporate(input: $input, condition: $condition) {
      id
      name
      price
      number
      createdAt
      updatedAt
    }
  }
`;
export const deletePriceCorporate = /* GraphQL */ `
  mutation DeletePriceCorporate(
    $input: DeletePriceCorporateInput!
    $condition: ModelPriceCorporateConditionInput
  ) {
    deletePriceCorporate(input: $input, condition: $condition) {
      id
      name
      price
      number
      createdAt
      updatedAt
    }
  }
`;
export const createCouponCorporate = /* GraphQL */ `
  mutation CreateCouponCorporate(
    $input: CreateCouponCorporateInput!
    $condition: ModelCouponCorporateConditionInput
  ) {
    createCouponCorporate(input: $input, condition: $condition) {
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
export const updateCouponCorporate = /* GraphQL */ `
  mutation UpdateCouponCorporate(
    $input: UpdateCouponCorporateInput!
    $condition: ModelCouponCorporateConditionInput
  ) {
    updateCouponCorporate(input: $input, condition: $condition) {
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
export const deleteCouponCorporate = /* GraphQL */ `
  mutation DeleteCouponCorporate(
    $input: DeleteCouponCorporateInput!
    $condition: ModelCouponCorporateConditionInput
  ) {
    deleteCouponCorporate(input: $input, condition: $condition) {
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
export const createPriceCandidate = /* GraphQL */ `
  mutation CreatePriceCandidate(
    $input: CreatePriceCandidateInput!
    $condition: ModelPriceCandidateConditionInput
  ) {
    createPriceCandidate(input: $input, condition: $condition) {
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
export const updatePriceCandidate = /* GraphQL */ `
  mutation UpdatePriceCandidate(
    $input: UpdatePriceCandidateInput!
    $condition: ModelPriceCandidateConditionInput
  ) {
    updatePriceCandidate(input: $input, condition: $condition) {
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
export const deletePriceCandidate = /* GraphQL */ `
  mutation DeletePriceCandidate(
    $input: DeletePriceCandidateInput!
    $condition: ModelPriceCandidateConditionInput
  ) {
    deletePriceCandidate(input: $input, condition: $condition) {
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
export const createCouponCandidate = /* GraphQL */ `
  mutation CreateCouponCandidate(
    $input: CreateCouponCandidateInput!
    $condition: ModelCouponCandidateConditionInput
  ) {
    createCouponCandidate(input: $input, condition: $condition) {
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
export const updateCouponCandidate = /* GraphQL */ `
  mutation UpdateCouponCandidate(
    $input: UpdateCouponCandidateInput!
    $condition: ModelCouponCandidateConditionInput
  ) {
    updateCouponCandidate(input: $input, condition: $condition) {
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
export const deleteCouponCandidate = /* GraphQL */ `
  mutation DeleteCouponCandidate(
    $input: DeleteCouponCandidateInput!
    $condition: ModelCouponCandidateConditionInput
  ) {
    deleteCouponCandidate(input: $input, condition: $condition) {
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
export const createTopic = /* GraphQL */ `
  mutation CreateTopic(
    $input: CreateTopicInput!
    $condition: ModelTopicConditionInput
  ) {
    createTopic(input: $input, condition: $condition) {
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
export const updateTopic = /* GraphQL */ `
  mutation UpdateTopic(
    $input: UpdateTopicInput!
    $condition: ModelTopicConditionInput
  ) {
    updateTopic(input: $input, condition: $condition) {
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
export const deleteTopic = /* GraphQL */ `
  mutation DeleteTopic(
    $input: DeleteTopicInput!
    $condition: ModelTopicConditionInput
  ) {
    deleteTopic(input: $input, condition: $condition) {
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
export const createSubTopic = /* GraphQL */ `
  mutation CreateSubTopic(
    $input: CreateSubTopicInput!
    $condition: ModelSubTopicConditionInput
  ) {
    createSubTopic(input: $input, condition: $condition) {
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
export const updateSubTopic = /* GraphQL */ `
  mutation UpdateSubTopic(
    $input: UpdateSubTopicInput!
    $condition: ModelSubTopicConditionInput
  ) {
    updateSubTopic(input: $input, condition: $condition) {
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
export const deleteSubTopic = /* GraphQL */ `
  mutation DeleteSubTopic(
    $input: DeleteSubTopicInput!
    $condition: ModelSubTopicConditionInput
  ) {
    deleteSubTopic(input: $input, condition: $condition) {
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
export const createOption = /* GraphQL */ `
  mutation CreateOption(
    $input: CreateOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    createOption(input: $input, condition: $condition) {
      id
      isTrue
      description
      questionID
      createdAt
      updatedAt
    }
  }
`;
export const updateOption = /* GraphQL */ `
  mutation UpdateOption(
    $input: UpdateOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    updateOption(input: $input, condition: $condition) {
      id
      isTrue
      description
      questionID
      createdAt
      updatedAt
    }
  }
`;
export const deleteOption = /* GraphQL */ `
  mutation DeleteOption(
    $input: DeleteOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    deleteOption(input: $input, condition: $condition) {
      id
      isTrue
      description
      questionID
      createdAt
      updatedAt
    }
  }
`;
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
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
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
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
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
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
export const createParagraph = /* GraphQL */ `
  mutation CreateParagraph(
    $input: CreateParagraphInput!
    $condition: ModelParagraphConditionInput
  ) {
    createParagraph(input: $input, condition: $condition) {
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
export const updateParagraph = /* GraphQL */ `
  mutation UpdateParagraph(
    $input: UpdateParagraphInput!
    $condition: ModelParagraphConditionInput
  ) {
    updateParagraph(input: $input, condition: $condition) {
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
export const deleteParagraph = /* GraphQL */ `
  mutation DeleteParagraph(
    $input: DeleteParagraphInput!
    $condition: ModelParagraphConditionInput
  ) {
    deleteParagraph(input: $input, condition: $condition) {
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
export const createTemplate = /* GraphQL */ `
  mutation CreateTemplate(
    $input: CreateTemplateInput!
    $condition: ModelTemplateConditionInput
  ) {
    createTemplate(input: $input, condition: $condition) {
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
export const updateTemplate = /* GraphQL */ `
  mutation UpdateTemplate(
    $input: UpdateTemplateInput!
    $condition: ModelTemplateConditionInput
  ) {
    updateTemplate(input: $input, condition: $condition) {
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
export const deleteTemplate = /* GraphQL */ `
  mutation DeleteTemplate(
    $input: DeleteTemplateInput!
    $condition: ModelTemplateConditionInput
  ) {
    deleteTemplate(input: $input, condition: $condition) {
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
export const createTemplateTopic = /* GraphQL */ `
  mutation CreateTemplateTopic(
    $input: CreateTemplateTopicInput!
    $condition: ModelTemplateTopicConditionInput
  ) {
    createTemplateTopic(input: $input, condition: $condition) {
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
export const updateTemplateTopic = /* GraphQL */ `
  mutation UpdateTemplateTopic(
    $input: UpdateTemplateTopicInput!
    $condition: ModelTemplateTopicConditionInput
  ) {
    updateTemplateTopic(input: $input, condition: $condition) {
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
export const deleteTemplateTopic = /* GraphQL */ `
  mutation DeleteTemplateTopic(
    $input: DeleteTemplateTopicInput!
    $condition: ModelTemplateTopicConditionInput
  ) {
    deleteTemplateTopic(input: $input, condition: $condition) {
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
export const createTemplateSubTopic = /* GraphQL */ `
  mutation CreateTemplateSubTopic(
    $input: CreateTemplateSubTopicInput!
    $condition: ModelTemplateSubTopicConditionInput
  ) {
    createTemplateSubTopic(input: $input, condition: $condition) {
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
export const updateTemplateSubTopic = /* GraphQL */ `
  mutation UpdateTemplateSubTopic(
    $input: UpdateTemplateSubTopicInput!
    $condition: ModelTemplateSubTopicConditionInput
  ) {
    updateTemplateSubTopic(input: $input, condition: $condition) {
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
export const deleteTemplateSubTopic = /* GraphQL */ `
  mutation DeleteTemplateSubTopic(
    $input: DeleteTemplateSubTopicInput!
    $condition: ModelTemplateSubTopicConditionInput
  ) {
    deleteTemplateSubTopic(input: $input, condition: $condition) {
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
export const createSimpleBrainTemplate = /* GraphQL */ `
  mutation CreateSimpleBrainTemplate(
    $input: CreateSimpleBrainTemplateInput!
    $condition: ModelSimpleBrainTemplateConditionInput
  ) {
    createSimpleBrainTemplate(input: $input, condition: $condition) {
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
export const updateSimpleBrainTemplate = /* GraphQL */ `
  mutation UpdateSimpleBrainTemplate(
    $input: UpdateSimpleBrainTemplateInput!
    $condition: ModelSimpleBrainTemplateConditionInput
  ) {
    updateSimpleBrainTemplate(input: $input, condition: $condition) {
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
export const deleteSimpleBrainTemplate = /* GraphQL */ `
  mutation DeleteSimpleBrainTemplate(
    $input: DeleteSimpleBrainTemplateInput!
    $condition: ModelSimpleBrainTemplateConditionInput
  ) {
    deleteSimpleBrainTemplate(input: $input, condition: $condition) {
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
export const createExamSection = /* GraphQL */ `
  mutation CreateExamSection(
    $input: CreateExamSectionInput!
    $condition: ModelExamSectionConditionInput
  ) {
    createExamSection(input: $input, condition: $condition) {
      id
      questionID
      brain
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateExamSection = /* GraphQL */ `
  mutation UpdateExamSection(
    $input: UpdateExamSectionInput!
    $condition: ModelExamSectionConditionInput
  ) {
    updateExamSection(input: $input, condition: $condition) {
      id
      questionID
      brain
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteExamSection = /* GraphQL */ `
  mutation DeleteExamSection(
    $input: DeleteExamSectionInput!
    $condition: ModelExamSectionConditionInput
  ) {
    deleteExamSection(input: $input, condition: $condition) {
      id
      questionID
      brain
      type
      createdAt
      updatedAt
    }
  }
`;
export const createExam = /* GraphQL */ `
  mutation CreateExam(
    $input: CreateExamInput!
    $condition: ModelExamConditionInput
  ) {
    createExam(input: $input, condition: $condition) {
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
export const updateExam = /* GraphQL */ `
  mutation UpdateExam(
    $input: UpdateExamInput!
    $condition: ModelExamConditionInput
  ) {
    updateExam(input: $input, condition: $condition) {
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
export const deleteExam = /* GraphQL */ `
  mutation DeleteExam(
    $input: DeleteExamInput!
    $condition: ModelExamConditionInput
  ) {
    deleteExam(input: $input, condition: $condition) {
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
export const createTrain = /* GraphQL */ `
  mutation CreateTrain(
    $input: CreateTrainInput!
    $condition: ModelTrainConditionInput
  ) {
    createTrain(input: $input, condition: $condition) {
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
export const updateTrain = /* GraphQL */ `
  mutation UpdateTrain(
    $input: UpdateTrainInput!
    $condition: ModelTrainConditionInput
  ) {
    updateTrain(input: $input, condition: $condition) {
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
export const deleteTrain = /* GraphQL */ `
  mutation DeleteTrain(
    $input: DeleteTrainInput!
    $condition: ModelTrainConditionInput
  ) {
    deleteTrain(input: $input, condition: $condition) {
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
export const createAnswer = /* GraphQL */ `
  mutation CreateAnswer(
    $input: CreateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    createAnswer(input: $input, condition: $condition) {
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
export const updateAnswer = /* GraphQL */ `
  mutation UpdateAnswer(
    $input: UpdateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    updateAnswer(input: $input, condition: $condition) {
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
export const deleteAnswer = /* GraphQL */ `
  mutation DeleteAnswer(
    $input: DeleteAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    deleteAnswer(input: $input, condition: $condition) {
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
export const createAnswerSection = /* GraphQL */ `
  mutation CreateAnswerSection(
    $input: CreateAnswerSectionInput!
    $condition: ModelAnswerSectionConditionInput
  ) {
    createAnswerSection(input: $input, condition: $condition) {
      id
      answer
      type
      state
      createdAt
      updatedAt
    }
  }
`;
export const updateAnswerSection = /* GraphQL */ `
  mutation UpdateAnswerSection(
    $input: UpdateAnswerSectionInput!
    $condition: ModelAnswerSectionConditionInput
  ) {
    updateAnswerSection(input: $input, condition: $condition) {
      id
      answer
      type
      state
      createdAt
      updatedAt
    }
  }
`;
export const deleteAnswerSection = /* GraphQL */ `
  mutation DeleteAnswerSection(
    $input: DeleteAnswerSectionInput!
    $condition: ModelAnswerSectionConditionInput
  ) {
    deleteAnswerSection(input: $input, condition: $condition) {
      id
      answer
      type
      state
      createdAt
      updatedAt
    }
  }
`;
export const createExamResult = /* GraphQL */ `
  mutation CreateExamResult(
    $input: CreateExamResultInput!
    $condition: ModelExamResultConditionInput
  ) {
    createExamResult(input: $input, condition: $condition) {
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
export const updateExamResult = /* GraphQL */ `
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
export const deleteExamResult = /* GraphQL */ `
  mutation DeleteExamResult(
    $input: DeleteExamResultInput!
    $condition: ModelExamResultConditionInput
  ) {
    deleteExamResult(input: $input, condition: $condition) {
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
export const createResult = /* GraphQL */ `
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
`;
export const updateResult = /* GraphQL */ `
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
`;
export const deleteResult = /* GraphQL */ `
  mutation DeleteResult(
    $input: DeleteResultInput!
    $condition: ModelResultConditionInput
  ) {
    deleteResult(input: $input, condition: $condition) {
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
export const createResultBrain = /* GraphQL */ `
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
`;
export const updateResultBrain = /* GraphQL */ `
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
`;
export const deleteResultBrain = /* GraphQL */ `
  mutation DeleteResultBrain(
    $input: DeleteResultBrainInput!
    $condition: ModelResultBrainConditionInput
  ) {
    deleteResultBrain(input: $input, condition: $condition) {
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
export const createResultTopic = /* GraphQL */ `
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
`;
export const updateResultTopic = /* GraphQL */ `
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
`;
export const deleteResultTopic = /* GraphQL */ `
  mutation DeleteResultTopic(
    $input: DeleteResultTopicInput!
    $condition: ModelResultTopicConditionInput
  ) {
    deleteResultTopic(input: $input, condition: $condition) {
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
export const createResultSubtopic = /* GraphQL */ `
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
export const updateResultSubtopic = /* GraphQL */ `
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
export const deleteResultSubtopic = /* GraphQL */ `
  mutation DeleteResultSubtopic(
    $input: DeleteResultSubtopicInput!
    $condition: ModelResultSubtopicConditionInput
  ) {
    deleteResultSubtopic(input: $input, condition: $condition) {
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
export const createScreen = /* GraphQL */ `
  mutation CreateScreen(
    $input: CreateScreenInput!
    $condition: ModelScreenConditionInput
  ) {
    createScreen(input: $input, condition: $condition) {
      id
      type
      image
      examResultID
      createdAt
      updatedAt
    }
  }
`;
export const updateScreen = /* GraphQL */ `
  mutation UpdateScreen(
    $input: UpdateScreenInput!
    $condition: ModelScreenConditionInput
  ) {
    updateScreen(input: $input, condition: $condition) {
      id
      type
      image
      examResultID
      createdAt
      updatedAt
    }
  }
`;
export const deleteScreen = /* GraphQL */ `
  mutation DeleteScreen(
    $input: DeleteScreenInput!
    $condition: ModelScreenConditionInput
  ) {
    deleteScreen(input: $input, condition: $condition) {
      id
      type
      image
      examResultID
      createdAt
      updatedAt
    }
  }
`;
export const createOpening = /* GraphQL */ `
  mutation CreateOpening(
    $input: CreateOpeningInput!
    $condition: ModelOpeningConditionInput
  ) {
    createOpening(input: $input, condition: $condition) {
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
export const updateOpening = /* GraphQL */ `
  mutation UpdateOpening(
    $input: UpdateOpeningInput!
    $condition: ModelOpeningConditionInput
  ) {
    updateOpening(input: $input, condition: $condition) {
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
export const deleteOpening = /* GraphQL */ `
  mutation DeleteOpening(
    $input: DeleteOpeningInput!
    $condition: ModelOpeningConditionInput
  ) {
    deleteOpening(input: $input, condition: $condition) {
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
export const createFavoriteCorporate = /* GraphQL */ `
  mutation CreateFavoriteCorporate(
    $input: CreateFavoriteCorporateInput!
    $condition: ModelFavoriteCorporateConditionInput
  ) {
    createFavoriteCorporate(input: $input, condition: $condition) {
      id
      userID
      corporateID
      createdAt
      updatedAt
    }
  }
`;
export const updateFavoriteCorporate = /* GraphQL */ `
  mutation UpdateFavoriteCorporate(
    $input: UpdateFavoriteCorporateInput!
    $condition: ModelFavoriteCorporateConditionInput
  ) {
    updateFavoriteCorporate(input: $input, condition: $condition) {
      id
      userID
      corporateID
      createdAt
      updatedAt
    }
  }
`;
export const deleteFavoriteCorporate = /* GraphQL */ `
  mutation DeleteFavoriteCorporate(
    $input: DeleteFavoriteCorporateInput!
    $condition: ModelFavoriteCorporateConditionInput
  ) {
    deleteFavoriteCorporate(input: $input, condition: $condition) {
      id
      userID
      corporateID
      createdAt
      updatedAt
    }
  }
`;
export const createFavoriteOpening = /* GraphQL */ `
  mutation CreateFavoriteOpening(
    $input: CreateFavoriteOpeningInput!
    $condition: ModelFavoriteOpeningConditionInput
  ) {
    createFavoriteOpening(input: $input, condition: $condition) {
      id
      userID
      openingID
      createdAt
      updatedAt
    }
  }
`;
export const updateFavoriteOpening = /* GraphQL */ `
  mutation UpdateFavoriteOpening(
    $input: UpdateFavoriteOpeningInput!
    $condition: ModelFavoriteOpeningConditionInput
  ) {
    updateFavoriteOpening(input: $input, condition: $condition) {
      id
      userID
      openingID
      createdAt
      updatedAt
    }
  }
`;
export const deleteFavoriteOpening = /* GraphQL */ `
  mutation DeleteFavoriteOpening(
    $input: DeleteFavoriteOpeningInput!
    $condition: ModelFavoriteOpeningConditionInput
  ) {
    deleteFavoriteOpening(input: $input, condition: $condition) {
      id
      userID
      openingID
      createdAt
      updatedAt
    }
  }
`;
export const createFavoriteExam = /* GraphQL */ `
  mutation CreateFavoriteExam(
    $input: CreateFavoriteExamInput!
    $condition: ModelFavoriteExamConditionInput
  ) {
    createFavoriteExam(input: $input, condition: $condition) {
      id
      userID
      examID
      createdAt
      updatedAt
    }
  }
`;
export const updateFavoriteExam = /* GraphQL */ `
  mutation UpdateFavoriteExam(
    $input: UpdateFavoriteExamInput!
    $condition: ModelFavoriteExamConditionInput
  ) {
    updateFavoriteExam(input: $input, condition: $condition) {
      id
      userID
      examID
      createdAt
      updatedAt
    }
  }
`;
export const deleteFavoriteExam = /* GraphQL */ `
  mutation DeleteFavoriteExam(
    $input: DeleteFavoriteExamInput!
    $condition: ModelFavoriteExamConditionInput
  ) {
    deleteFavoriteExam(input: $input, condition: $condition) {
      id
      userID
      examID
      createdAt
      updatedAt
    }
  }
`;
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      id
      name
      description
      userID
      createdAt
      updatedAt
    }
  }
`;
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
      id
      name
      description
      userID
      createdAt
      updatedAt
    }
  }
`;
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
      id
      name
      description
      userID
      createdAt
      updatedAt
    }
  }
`;
export const createDepartment = /* GraphQL */ `
  mutation CreateDepartment(
    $input: CreateDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    createDepartment(input: $input, condition: $condition) {
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
export const updateDepartment = /* GraphQL */ `
  mutation UpdateDepartment(
    $input: UpdateDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    updateDepartment(input: $input, condition: $condition) {
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
export const deleteDepartment = /* GraphQL */ `
  mutation DeleteDepartment(
    $input: DeleteDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    deleteDepartment(input: $input, condition: $condition) {
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
export const createImproveTemplate = /* GraphQL */ `
  mutation CreateImproveTemplate(
    $input: CreateImproveTemplateInput!
    $condition: ModelImproveTemplateConditionInput
  ) {
    createImproveTemplate(input: $input, condition: $condition) {
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
export const updateImproveTemplate = /* GraphQL */ `
  mutation UpdateImproveTemplate(
    $input: UpdateImproveTemplateInput!
    $condition: ModelImproveTemplateConditionInput
  ) {
    updateImproveTemplate(input: $input, condition: $condition) {
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
export const deleteImproveTemplate = /* GraphQL */ `
  mutation DeleteImproveTemplate(
    $input: DeleteImproveTemplateInput!
    $condition: ModelImproveTemplateConditionInput
  ) {
    deleteImproveTemplate(input: $input, condition: $condition) {
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
export const createImproveTemplateTopic = /* GraphQL */ `
  mutation CreateImproveTemplateTopic(
    $input: CreateImproveTemplateTopicInput!
    $condition: ModelImproveTemplateTopicConditionInput
  ) {
    createImproveTemplateTopic(input: $input, condition: $condition) {
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
export const updateImproveTemplateTopic = /* GraphQL */ `
  mutation UpdateImproveTemplateTopic(
    $input: UpdateImproveTemplateTopicInput!
    $condition: ModelImproveTemplateTopicConditionInput
  ) {
    updateImproveTemplateTopic(input: $input, condition: $condition) {
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
export const deleteImproveTemplateTopic = /* GraphQL */ `
  mutation DeleteImproveTemplateTopic(
    $input: DeleteImproveTemplateTopicInput!
    $condition: ModelImproveTemplateTopicConditionInput
  ) {
    deleteImproveTemplateTopic(input: $input, condition: $condition) {
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
export const createPersonality = /* GraphQL */ `
  mutation CreatePersonality(
    $input: CreatePersonalityInput!
    $condition: ModelPersonalityConditionInput
  ) {
    createPersonality(input: $input, condition: $condition) {
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
export const updatePersonality = /* GraphQL */ `
  mutation UpdatePersonality(
    $input: UpdatePersonalityInput!
    $condition: ModelPersonalityConditionInput
  ) {
    updatePersonality(input: $input, condition: $condition) {
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
export const deletePersonality = /* GraphQL */ `
  mutation DeletePersonality(
    $input: DeletePersonalityInput!
    $condition: ModelPersonalityConditionInput
  ) {
    deletePersonality(input: $input, condition: $condition) {
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
export const createAttribute = /* GraphQL */ `
  mutation CreateAttribute(
    $input: CreateAttributeInput!
    $condition: ModelAttributeConditionInput
  ) {
    createAttribute(input: $input, condition: $condition) {
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
export const updateAttribute = /* GraphQL */ `
  mutation UpdateAttribute(
    $input: UpdateAttributeInput!
    $condition: ModelAttributeConditionInput
  ) {
    updateAttribute(input: $input, condition: $condition) {
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
export const deleteAttribute = /* GraphQL */ `
  mutation DeleteAttribute(
    $input: DeleteAttributeInput!
    $condition: ModelAttributeConditionInput
  ) {
    deleteAttribute(input: $input, condition: $condition) {
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
