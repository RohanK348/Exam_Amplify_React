import React, {useState, useEffect} from 'react'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

const Question = (props) => {
  const {type, question, answer, index, setAnswer} = props
  const [selectOption, setSelectOption] = useState('')
  const [selectOptions, setSelectOptions] = useState([])
  const changeSelect = (e, optionId) => {
    let answerOptions = []
    if (question?.type === 'SINGLE') {
      setSelectOption(e.target.value)
      answerOptions = [e.target.value]
    }
    else if (question?.type === 'MULTIFUL') {
      answerOptions = [...selectOptions]
      if (e.target.checked && answerOptions.indexOf(optionId) === -1) {
        answerOptions = [...answerOptions, optionId]
      }
      if (!e.target.checked) {
        const index = answerOptions.indexOf(optionId)
        if (index > -1) {
          answerOptions = [...answerOptions.slice(0, index), ...answerOptions.slice(index + 1)]
        }
      }
      setSelectOptions(answerOptions)
    }
    setAnswer(question.id, {
      questionID: question.id,
      answerOptions: answerOptions,
    })
  }

  useEffect(() => {
    if (answer && answer?.answerOptions) {
      if (answer?.answerOptions?.length !== 0) {
        setSelectOptions(answer?.answerOptions)
        setSelectOption(answer?.answerOptions[0])
      }
      else {
        setSelectOption('')
        setSelectOptions([])
      }
    }
  }, [answer?.answerOptions])
  return (
  <div className='question'>
    {type === 'Paragraph'&&
    <div className='questionTitle'>Question {index+1}</div>
    }
    {question?.description &&
    <SunEditor
      defaultValue={question?.description}
      disable={true}
      hideToolbar
      setDefaultStyle="height: auto"
    />
    }
    <div className={`form-element form-element-inline pt-4`}>
      <div className="flex items-center justify-start space-x-2" style={{width: '100%'}}>
        <div className="items-center" style={{width: '100%'}}>
          {question?.options?.items?.map((option, index) => (
          <div key={index} className="items-center pb-8 flex">
          {question?.type === 'SINGLE'?
          <>
            <input
              type="radio"
              className="form-radio h-4 w-4 mr-4 border-2 border-blue-300 cursor-pointer"
              value={option?.id}
              checked={selectOption===option?.id}
              onChange={(e) => changeSelect(e, option?.id)}
            />
            <SunEditor
              defaultValue={option?.description}
              disable={true}
              hideToolbar
              setDefaultStyle="height: auto"
            />
          </>:
          question?.type === 'MULTIFUL'?
          <>
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 mr-4 border-2 border-blue-300 cursor-pointer"
              checked={selectOptions.indexOf(option?.id) > -1}
              onChange={(e) => changeSelect(e, option?.id)}
            />
            <SunEditor
              defaultValue={option?.description}
              disable={true}
              hideToolbar
              setDefaultStyle="height: auto"
            />
          </>:''
          }
          </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}
export default Question
