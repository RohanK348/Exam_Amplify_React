import React, {useState, useEffect} from 'react'
import {RadioButtonChecked, RadioButtonUnchecked, Check, Clear} from '@material-ui/icons'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

const Question = (props) => {
  const {question, answer, index} = props
  const [selectOption, setSelectOption] = useState('')
  const [selectOptions, setSelectOptions] = useState([])

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
    <div className='questionTitle'>Question {index+1}</div>
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
            {selectOption===option?.id?
            <RadioButtonChecked className="mr-10" />:
            <RadioButtonUnchecked className="mr-10" />
            }
            {option?.isTrue?
            <Check className="mr-10" style={{ color: 'green' }} />:
            <Clear className="mr-10" color="secondary" />
            }
            <SunEditor
              defaultValue={option?.description}
              disable={true}
              hideToolbar
              setDefaultStyle="height: auto"
            />
          </>:
          question?.type === 'MULTIFUL'?
          <>
            {selectOptions.indexOf(option?.id) > -1?
            <RadioButtonChecked className="mr-10" />:
            <RadioButtonUnchecked className="mr-10" />
            }
            {option?.isTrue?
            <Check className="mr-10" style={{ color: 'green' }} />:
            <Clear className="mr-10" color="secondary" />
            }
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
    <div className="pb-3">Solution</div>
    {question?.solution &&
    <SunEditor
      defaultValue={question?.solution}
      disable={true}
      hideToolbar
      setDefaultStyle="height: auto"
    />
    }
  </div>
  )
}
export default Question
