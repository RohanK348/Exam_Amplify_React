import React, {useState, useEffect} from 'react'
import {
  Grid
} from '@material-ui/core'
import { KeyboardBackspace, Save } from "@material-ui/icons";

import Widget from '../../../../components/widget'
import { useStyles } from '../../../style/common'
import Attribute from './components/attribute'
import { useImproveTemplate } from "../../../../provider/improveTemplate";
import { random } from "../../../../functions/numbers";

const Publish = (props) => {
  const {nextStep, prevStep, setStep, handleSave} = props
  const [improveTemplate, dispatch] = useImproveTemplate();
  const classes = useStyles()
  const [attentionToDetail, setAttentionToDetail] = useState({});
  const [customerOrientation, setCustomerOrientation] = useState({});
  const [creativeThinking, setCreativeThinking] = useState({});
  const [analyticalAbility, setAnalyticalAbility] = useState({});
  const [problemSolvingSkill, setProblemSolvingSkill] = useState({});
  const [bigPicture, setBigPicture] = useState({});
  const [communicationSkill, setCommunicationSkill] = useState({});
  const [leadershipSkill, setLeaderShipSkill] = useState({});
  const [logicalThinking, setLogicalThinking] = useState({});
  const [teamPlayer, setTeamPlayer] = useState({});
  const [emotionalStability, setEmotionalStability] = useState({});
  const [preservance, setPreservance] = useState({});
  const [abilityToLearn, setAbilityToLearn] = useState({});

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
    dispatch({ type: "SET", name: "baseAttributes", value: baseAttributes });
    handleSave()
    nextStep()
  }
  const handleChangeAttention = (v) => {
    if (v.value !== undefined) {
      const customer = 100 - (creativeThinking.value + analyticalAbility.value + v.value)
      if (customer < 0)
        return
      setAttentionToDetail({ ...attentionToDetail, ...v })
      setCustomerOrientation({...customerOrientation, ...{value: customer}})
    }
  }
  const handleChangeCustomer = (v) => {
    if (v.value !== undefined) {
      const creative = 100 - (analyticalAbility.value + attentionToDetail.value + v.value)
      if (creative < 0)
        return
      setCustomerOrientation({ ...customerOrientation, ...v })
      setCreativeThinking({...creativeThinking, ...{value: creative}})
    }
  }
  const handleChangeCreative = (v) => {
    if (v.value !== undefined) {
      const analytical = 100 - (attentionToDetail.value + customerOrientation.value + v.value)
      if (analytical < 0)
        return
      setCreativeThinking({ ...creativeThinking, ...v })
      setAnalyticalAbility({...analyticalAbility, ...{value: analytical}})
    }
  }
  const handleChangeAnalytical = (v) => {
    if (v.value !== undefined) {
      const attention = 100 - (customerOrientation.value + creativeThinking.value + v.value)
      if (attention < 0)
        return
      setAnalyticalAbility({ ...analyticalAbility, ...v })
      setAttentionToDetail({...attentionToDetail, ...{value: attention}})
    }
  }

  useEffect(() => {
    setAttentionToDetail(improveTemplate?.baseAttributes?.attentionToDetail)
    setCustomerOrientation(improveTemplate?.baseAttributes?.customerOrientation)
    setCreativeThinking(improveTemplate?.baseAttributes?.creativeThinking)
    setAnalyticalAbility(improveTemplate?.baseAttributes?.analyticalAbility)
    setProblemSolvingSkill(improveTemplate?.baseAttributes?.problemSolvingSkill)
    setBigPicture(improveTemplate?.baseAttributes?.bigPicture)
    setCommunicationSkill(improveTemplate?.baseAttributes?.communicationSkill)
    setLeaderShipSkill(improveTemplate?.baseAttributes?.leadershipSkill)
    setLogicalThinking(improveTemplate?.baseAttributes?.logicalThinking)
    setTeamPlayer(improveTemplate?.baseAttributes?.teamPlayer)
    setEmotionalStability(improveTemplate?.baseAttributes?.emotionalStability)
    setPreservance(improveTemplate?.baseAttributes?.preservance)
    setAbilityToLearn(improveTemplate?.baseAttributes?.abilityToLearn)
  }, [improveTemplate])
  return (
    <Widget title="" description="">
      <div className='flex justify-between py-5 px-3 border-solid border-b-2 border-slate-400'>
        <div className='flex items-center pr-3'>
          <div className="pr-3 cursor-pointer" onClick={() => prevStep()}>
            <KeyboardBackspace className="text-md" />
          </div>
          <div className="text-md pl-3 font-bold border-solid border-l-2 border-slate-400">Step 5 - Configure of the Job template</div>
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
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div>
          <div className="border-4 rounded-full border-lime-700 cursor-pointer relative p-4 w-36 m-2" onClick={() => setStep(3)}>
            <img className="w-12 h-12" src="/images/admin/attribute.png" alt="" />
            <img className="w-6 h-6 absolute top-0 right-0 rounded-full border-white border-4 shadow-md" src="/images/admin/check.png" />
          </div>
          <div className="text-center">Attributes</div>
        </div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div>
          <div className="border-4 rounded-full border-green-600 shadow-xl p-6 w-36 m-2">
            <img className="w-16 h-16" src="/images/admin/publish.png" alt="" />
          </div>
          <div className="text-center font-bold">Publish</div>
        </div>
      </div>
      <Attribute title="Attention to Detail" isCheck={false} initValue={attentionToDetail?.value} disabled={!attentionToDetail?.editable} onChange={(v) => handleChangeAttention(v)} />
      <Grid className="py-6" container spacing={2}>
        <Grid item md={4} sm={6} xs={12}>
          <Attribute title="Analytical ability" isCheck={false} initValue={analyticalAbility?.value} disabled={!analyticalAbility?.editable} onChange={(v) => handleChangeAnalytical(v)} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Attribute title="Creative Thinking" isCheck={false} initValue={creativeThinking?.value} disabled={!creativeThinking?.editable} onChange={(v) => handleChangeCreative(v)} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Attribute title="Custome orientation" isCheck={false} initValue={customerOrientation?.value} disabled={!customerOrientation?.editable} onChange={(v) => handleChangeCustomer(v)} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Attribute title="Problem solving skill" isCheck={false} initValue={problemSolvingSkill?.value} disabled={!problemSolvingSkill?.editable} onChange={(v) => setProblemSolvingSkill({...problemSolvingSkill, ...v})} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Attribute title="Big picture" isCheck={false} initValue={bigPicture?.value} disabled={!bigPicture?.editable} onChange={(v) => setBigPicture({...bigPicture, ...v})} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Attribute title="Communication skill" isCheck={false} initValue={communicationSkill?.value} disabled={!communicationSkill?.editable} onChange={(v) => setCommunicationSkill({...communicationSkill, ...v})} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Attribute title="Leadership skill" isCheck={false} initValue={leadershipSkill?.value} disabled={!leadershipSkill?.editable} onChange={(v) => setLeaderShipSkill({...leadershipSkill, ...v})} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Attribute title="Logical Thinking" isCheck={false} initValue={logicalThinking?.value} disabled={!logicalThinking?.editable} onChange={(v) => setLogicalThinking({...logicalThinking, ...v})} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Attribute title="Team player" isCheck={false} initValue={teamPlayer?.value} disabled={!teamPlayer?.editable} onChange={(v) => setTeamPlayer({...teamPlayer, ...v})} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Attribute title="Emotional stability" isCheck={false} initValue={emotionalStability?.value} disabled={!emotionalStability?.editable} onChange={(v) => setEmotionalStability({...emotionalStability, ...v})} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Attribute title="Preservance" isCheck={false} initValue={preservance?.value} disabled={!preservance?.editable} onChange={(v) => setPreservance({...preservance, ...v})} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Attribute title="Ability to learn" isCheck={false} initValue={abilityToLearn?.value} disabled={!abilityToLearn?.editable} onChange={(v) => setAbilityToLearn({...abilityToLearn, ...v})} />
        </Grid>
      </Grid>
    </Widget>
  )
}
export default Publish
