import React, {useState, useEffect} from 'react'
import {
  Grid
} from '@material-ui/core'
import { KeyboardBackspace, Save, AddCircleOutline } from "@material-ui/icons";

import Widget from '../../../../components/widget'
import { useStyles } from '../../../style/common'
import Personality from './personality/personalityComponent';
import { useImproveTemplate } from '../../../../provider/improveTemplate'
import { random } from "../../../../functions/numbers";

const Personalities = (props) => {
  const { templateId, nextStep, prevStep, setStep } = props
  const [improveTemplate, dispatch] = useImproveTemplate()
  const classes = useStyles()
  const [name, setName] = useState('')
  const [personalities, setPersonalities] = useState([])

  const validate = () => {
    let res = true
    if (name === '')
      res = false
    return res
  }
  const handleCreate = () => {
    if (!validate())
      return
    const newPersonality = {
      name: name,
      min: random(0, 30),
      max: random(60, 90),
      improveTemplateID: templateId,
    };
    const _personalities = [...personalities, newPersonality]
    dispatch({ type: 'SET', name: 'personalities', value: _personalities })
    const newPersonalities = [...improveTemplate?.newPersonalities, newPersonality]
    dispatch({ type: 'SET', name: 'newPersonalities', value: newPersonalities})
    setName('')
  }
  const handleContinue = () => {
    nextStep()
  }

  useEffect(() => {
    setPersonalities(improveTemplate?.personalities||[])
  }, [improveTemplate])
  return (
    <Widget title="" description="">
      <div className='flex justify-between py-5 px-3 border-solid border-b-2 border-slate-400'>
        <div className='flex items-center pr-3'>
          <div className="pr-3 cursor-pointer" onClick={() => prevStep()}>
            <KeyboardBackspace className="text-md" />
          </div>
          <div className="text-md pl-3 font-bold border-solid border-l-2 border-slate-400">Step 3 - Configure the personality</div>
        </div>
        <button className={classes.button} style={{float: 'right'}} onClick={handleContinue}><Save className="mr-2" />Save <span>&#38;</span> Next</button>
      </div>
      <div className="flex justify-center items-center py-5">
        <div>
          <div className="border-4 rounded-full border-red-700 cursor-pointer relative p-4 w-36 m-2" onClick={() => setStep(0)}>
            <img className="w-12 h-12" src="/images/admin/job_detail.png" alt="" />
            <img className="w-6 h-6 absolute top-0 right-0 rounded-full border-white border-4 shadow-md" src="/images/admin/check.png" />
          </div>
          <div className="text-center">Job Details</div>
        </div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div>
          <div className="border-4 rounded-full border-amber-700 cursor-pointer relative p-4 w-36 m-2" onClick={() => setStep(1)}>
            <img className="w-12 h-12" src="/images/admin/brain.png" alt="" />
            <img className="w-6 h-6 absolute top-0 right-0 rounded-full border-white border-4 shadow-md" src="/images/admin/check.png" />
          </div>
          <div className="text-center">L & R Brain</div>
        </div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div>
          <div className="border-4 rounded-full border-yellow-500 shadow-xl p-6 w-36 m-2">
            <img className="w-16 h-16" src="/images/admin/personality.png" alt="" />
          </div>
          <div className="text-center font-bold">Personality</div>
        </div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div>
          <div className="border-4 rounded-full border-lime-700 p-4 w-36 m-2">
            <img className="w-12 h-12" src="/images/admin/attribute.png" alt="" />
          </div>
          <div className="text-center">Attributes</div>
        </div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div>
          <div className="border-4 rounded-full border-green-600 p-4 w-36 m-2">
            <img className="w-12 h-12" src="/images/admin/publish.png" alt="" />
          </div>
          <div className="text-center">Publish</div>
        </div>
      </div>
      <div className="flex justify-center">
        <input
          type="text"
          className="form-input"
          placeholder="Enter Personality"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-blue-800 py-2 px-3 rounded ml-2 text-white uppercase" onClick={handleCreate}><AddCircleOutline className="mr-2" />Add Topic</button>
      </div>
      <Grid className="py-5" container spacing={2}>
        {personalities.map((item, index) => (
          <Grid item md={6} xs={12} key={index}>
            <Personality item={item} index={index} />
          </Grid>
        ))}
      </Grid>
    </Widget>
  )
}
export default Personalities
