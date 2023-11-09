import React, {useState, useEffect} from 'react'
import {
  Grid
} from '@material-ui/core'
import {Link} from 'react-router-dom'
import { KeyboardBackspace, Save } from "@material-ui/icons";
import {NotificationManager} from 'react-notifications'

import Widget from '../../../../components/widget'
import { useStyles } from '../../../style/common'
import { useImproveTemplate } from '../../../../provider/improveTemplate'

const BasicDetail = (props) => {
  const { departmentId, nextStep } = props
  const [improveTemplate, dispatch] = useImproveTemplate()
  const classes = useStyles()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const validate = () => {
    let res = true
    if (name === '')
      res = false
    if (description === '')
      res = false
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleContinue = () => {
    if (!validate())
      return
    dispatch({ type: 'SET', name: 'name', value: name })
    dispatch({ type: 'SET', name: 'description', value: description })
    nextStep()
  }

  useEffect(() => {
    setName(improveTemplate?.name||'')
    setDescription(improveTemplate?.description||'')
  }, [improveTemplate])
  return (
    <Widget title="" description="">
      <div className='flex justify-between py-5 px-3 border-solid border-b-2 border-slate-400'>
        <div className='flex items-center pr-3'>
          <Link className="pr-3 cursor-pointer" to={`/admin/department/${departmentId}`} style={{textDecoration: 'none'}}>
            <KeyboardBackspace className="text-md" />
          </Link>
          <div className="text-md pl-3 font-bold border-solid border-l-2 border-slate-400">Step 1 - Add Job Details</div>
        </div>
        <button className={classes.button} style={{float: 'right'}} onClick={handleContinue}><Save className="mr-2" />Save <span>&#38;</span> Next</button>
      </div>
      <div className="flex justify-center items-center py-5">
        <div>
          <div className="border-4 rounded-full border-red-700 shadow-xl p-6 min-w-36 m-2">
            <img className="min-w-full w-16 h-16" src="/images/admin/job_detail.png" alt="" />
          </div>
          <div className="text-center font-bold">Job Details</div>
        </div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div>
          <div className="border-4 rounded-full border-amber-700 p-4 min-w-36 m-2">
            <img className="min-w-full w-12 h-12" src="/images/admin/brain.png" alt="" />
          </div>
          <div className="text-center">L & R Brain</div>
        </div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div>
          <div className="border-4 rounded-full border-yellow-500 p-4 min-w-36 m-2">
            <img className="min-w-full w-12 h-12" src="/images/admin/personality.png" alt="" />
          </div>
          <div className="text-center">Personality</div>
        </div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div>
          <div className="border-4 rounded-full border-lime-700 p-4 min-w-36 m-2">
            <img className="min-w-full w-12 h-12" src="/images/admin/attribute.png" alt="" />
          </div>
          <div className="text-center">Attributes</div>
        </div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div>
          <div className="border-4 rounded-full border-green-600 p-4 min-w-36 m-2">
            <img className="min-w-full w-12 h-12" src="/images/admin/publish.png" alt="" />
          </div>
          <div className="text-center">Publish</div>
        </div>
      </div>
      <Grid className="py-5" container spacing={2} justify="center">
        <Grid item md={6} xs={12}>
          <div className="form-element">
            <div className="form-label font-bold">Template Name</div>
            <input
              type="text"
              className="form-input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-element">
            <div className="form-label font-bold">Job Description</div>
            <textarea className="form-input" value={description} rows={6} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
        </Grid>
      </Grid>
    </Widget>
  )
}
export default BasicDetail
