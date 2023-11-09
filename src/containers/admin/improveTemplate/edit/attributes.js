import React, {useState, useEffect} from 'react'
import {
  Grid
} from '@material-ui/core'
import { KeyboardBackspace, Save } from "@material-ui/icons";

import Widget from '../../../../components/widget'
import { useStyles } from '../../../style/common'
import Attribute from './components/attribute'
import AttributeSeed from './components/attributeSeed'
import { useImproveTemplate } from "../../../../provider/improveTemplate";
import { random } from "../../../../functions/numbers";

const Attributes = (props) => {
  const { templateId, nextStep, prevStep, setStep } = props
  const [improveTemplate, dispatch] = useImproveTemplate();
  const classes = useStyles()
  const [attentionToDetail, setAttentionToDetail] = useState({})
  const [customerOrientation, setCustomerOrientation] = useState({})
  const [creativeThinking, setCreativeThinking] = useState({})
  const [analyticalAbility, setAnalyticalAbility] = useState({})
  const [problemSolvingSkill, setProblemSolvingSkill] = useState({})
  const [bigPicture, setBigPicture] = useState({})
  const [communicationSkill, setCommunicationSkill] = useState({})
  const [leadershipSkill, setLeaderShipSkill] = useState({})
  const [logicalThinking, setLogicalThinking] = useState({})
  const [teamPlayer, setTeamPlayer] = useState({})
  const [emotionalStability, setEmotionalStability] = useState({})
  const [preservance, setPreservance] = useState({})
  const [abilityToLearn, setAbilityToLearn] = useState({})

  const handleContinue = () => {
    const baseAttributes = {
      ...improveTemplate.baseAttributes,
      attentionToDetail,
      customerOrientation,
      creativeThinking,
      analyticalAbility,
      problemSolvingSkill,
      bigPicture,
      communicationSkill,
      leadershipSkill,
      logicalThinking,
      teamPlayer,
      emotionalStability,
      preservance,
      abilityToLearn,
    };
    dispatch({ type: 'SET', name: 'baseAttributes', value: baseAttributes })
    nextStep()
  }
  const changeEditable = (editable) => {
    setAttentionToDetail({ ...attentionToDetail, editable })
    setCustomerOrientation({ ...customerOrientation, editable })
    setCreativeThinking({ ...creativeThinking, editable })
    setAnalyticalAbility({ ...analyticalAbility, editable })
  }
  const handleChangeAttention = (v) => {
    if (v.editable !== undefined)
      changeEditable(v.editable)
    if (v.value !== undefined) {
      const customer = 100 - (creativeThinking.value + analyticalAbility.value + v.value)
      if (customer < 0)
        return
      setAttentionToDetail({ ...attentionToDetail, ...v })
      setCustomerOrientation({...customerOrientation, ...{value: customer}})
    }
  }
  const handleChangeCustomer = (v) => {
    if (v.editable !== undefined)
      changeEditable(v.editable)
    if (v.value !== undefined) {
      const creative = 100 - (analyticalAbility.value + attentionToDetail.value + v.value)
      if (creative < 0)
        return
      setCustomerOrientation({ ...customerOrientation, ...v })
      setCreativeThinking({...creativeThinking, ...{value: creative}})
    }
  }
  const handleChangeCreative = (v) => {
    if (v.editable !== undefined)
      changeEditable(v.editable)
    if (v.value !== undefined) {
      const analytical = 100 - (attentionToDetail.value + customerOrientation.value + v.value)
      if (analytical < 0)
        return
      setCreativeThinking({ ...creativeThinking, ...v })
      setAnalyticalAbility({...analyticalAbility, ...{value: analytical}})
    }
  }
  const handleChangeAnalytical = (v) => {
    if (v.editable !== undefined)
      changeEditable(v.editable)
    if (v.value !== undefined) {
      const attention = 100 - (customerOrientation.value + creativeThinking.value + v.value)
      if (attention < 0)
        return
      setAnalyticalAbility({ ...analyticalAbility, ...v })
      setAttentionToDetail({...attentionToDetail, ...{value: attention}})
    }
  }

  useEffect(() => {
    const tmp = { editable: false, base: true, improveTemplateID: templateId }
    const attention = random(0, 25)
    const customer = random(0, 25)
    const creative = random(0, 25)
    const analytical = 100 - ( attention + customer + creative ) 
    setAttentionToDetail(improveTemplate?.baseAttributes?.attentionToDetail || { ...tmp, name: "Attention To Detail", key: "attentionToDetail", value: attention })
    setCustomerOrientation(improveTemplate?.baseAttributes?.customerOrientation || { ...tmp, name: "Customer Orientation", key: "customerOrientation", value: customer })
    setCreativeThinking(improveTemplate?.baseAttributes?.creativeThinking || { ...tmp, name: "Creative Thinking", key: "creativeThinking", value: creative })
    setAnalyticalAbility(improveTemplate?.baseAttributes?.analyticalAbility || { ...tmp, name: "Analytical Ability", key: "analyticalAbility", value: analytical })
    setProblemSolvingSkill(improveTemplate?.baseAttributes?.problemSolvingSkill || { ...tmp, name: "Problem Solving Skill", key: "problemSolvingSkill", value: random(0, 30) })
    setBigPicture(improveTemplate?.baseAttributes?.bigPicture || { ...tmp, name: "Big Picture", key: "bigPicture", value: random(0, 30) })
    setCommunicationSkill(improveTemplate?.baseAttributes?.communicationSkill || { ...tmp, name: "Communication Skill", key: "communicationSkill", value: random(0, 30) })
    setLeaderShipSkill(improveTemplate?.baseAttributes?.leadershipSkill || { ...tmp, name: "Leadership Skill", key: "leadershipSkill", value: random(0, 30) })
    setLogicalThinking(improveTemplate?.baseAttributes?.logicalThinking || { ...tmp, name: "Logical Thinking", key: "logicalThinking", value: random(0, 30) })
    setTeamPlayer(improveTemplate?.baseAttributes?.teamPlayer || { ...tmp, name: "Team Player", key: "teamPlayer", value: random(0, 30) })
    setEmotionalStability(improveTemplate?.baseAttributes?.emotionalStability || { ...tmp, name: "Emotional Stability", key: "emotionalStability", value: random(0, 30) })
    setPreservance(improveTemplate?.baseAttributes?.preservance || { ...tmp, name: "Preservance", key: "preservance", value: random(0, 30) })
    setAbilityToLearn(improveTemplate?.baseAttributes?.abilityToLearn || {...tmp, name: "Ability To Learn", key: "abilityToLearn", value: random(0, 30)})
  }, [improveTemplate])
  return (
    <Widget title="" description="">
      <div className='flex justify-between py-5 px-3 border-solid border-b-2 border-slate-400'>
        <div className='flex items-center pr-3'>
          <div className="pr-3 cursor-pointer" onClick={() => prevStep()}>
            <KeyboardBackspace className="text-md" />
          </div>
          <div className="text-md pl-3 font-bold border-solid border-l-2 border-slate-400">Step 4 - Configure the final attributes</div>
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
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div>
          <div className="border-4 rounded-full border-yellow-500 cursor-pointer relative p-4 w-36 m-2" onClick={() => setStep(2)}>
            <img className="w-12 h-12" src="/images/admin/personality.png" alt="" />
            <img className="w-6 h-6 absolute top-0 right-0 rounded-full border-white border-4 shadow-md" src="/images/admin/check.png" />
          </div>
          <div className="text-center">Personality</div>
        </div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div>
          <div className="border-4 rounded-full border-lime-700 shadow-xl p-6 w-36 m-2">
            <img className="w-16 h-16" src="/images/admin/attribute.png" alt="" />
          </div>
          <div className="text-center font-bold">Attributes</div>
        </div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div>
          <div className="border-4 rounded-full border-green-600 p-4 w-36 m-2">
            <img className="w-12 h-12" src="/images/admin/publish.png" alt="" />
          </div>
          <div className="text-center">Publish</div>
        </div>
      </div>
      <Grid className="py-5" container spacing={2}>
        <Grid item xs={12}>
          <Attribute title="Attention to Detail" isCheck={true} initValue={attentionToDetail?.value} editable={attentionToDetail?.editable} onChange={(v) => handleChangeAttention(v)} />
        </Grid>
        <Grid item md={6} xs={12}>
          <div className="text-base font-bold uppercase py-3">Topic/Personality</div>
          <AttributeSeed title="Numerical Ability" />
        </Grid>
        <Grid item md={6} xs={12}>
          <div className="text-base font-bold uppercase py-3">Opposite Topic/Personality</div>
          <AttributeSeed title="Logic Reasoning" />
        </Grid>
        <Grid item xs={12}>
          <Grid className="pt-12" container spacing={2}>
            <Grid item md={4} sm={6} xs={12}>
              <Attribute title="Analytical ability" isCheck={true} initValue={analyticalAbility?.value} editable={analyticalAbility?.editable} onChange={(v) => handleChangeAnalytical(v)} />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Attribute title="Creative Thinking" isCheck={true} initValue={creativeThinking?.value} editable={creativeThinking?.editable} onChange={(v) => handleChangeCreative(v)} />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Attribute title="Custome orientation" isCheck={true} initValue={customerOrientation?.value} editable={customerOrientation?.editable} onChange={(v) => handleChangeCustomer(v)} />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Attribute title="Problem solving skill" isCheck={true} initValue={problemSolvingSkill?.value} editable={problemSolvingSkill?.editable} onChange={(v) => setProblemSolvingSkill({...problemSolvingSkill, ...v})} />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Attribute title="Big picture" isCheck={true} initValue={bigPicture?.value} editable={bigPicture?.editable} onChange={(v) => setBigPicture({...bigPicture, ...v})} />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Attribute title="Communication skill" isCheck={true} initValue={communicationSkill?.value} editable={communicationSkill?.editable} onChange={(v) => setCommunicationSkill({...communicationSkill, ...v})} />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Attribute title="Leadership skill" isCheck={true} initValue={leadershipSkill?.value} editable={leadershipSkill?.editable} onChange={(v) => setLeaderShipSkill({...leadershipSkill, ...v})} />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Attribute title="Logical Thinking" isCheck={true} initValue={logicalThinking?.value} editable={logicalThinking?.editable} onChange={(v) => setLogicalThinking({...logicalThinking, ...v})} />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Attribute title="Team player" isCheck={true} initValue={teamPlayer?.value} editable={teamPlayer?.editable} onChange={(v) => setTeamPlayer({...teamPlayer, ...v})} />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Attribute title="Emotional stability" isCheck={true} initValue={emotionalStability?.value} editable={emotionalStability?.editable} onChange={(v) => setEmotionalStability({...emotionalStability, ...v})} />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Attribute title="Preservance" isCheck={true} initValue={preservance?.value} editable={preservance?.editable} onChange={(v) => setPreservance({...preservance, ...v})} />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Attribute title="Ability to learn" isCheck={true} initValue={abilityToLearn?.value} editable={abilityToLearn?.editable} onChange={(v) => setAbilityToLearn({...abilityToLearn, ...v})} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Widget>
  )
}
export default Attributes
