import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react'
import {
  Grid
} from '@material-ui/core'
import { KeyboardBackspace } from "@material-ui/icons";

import Widget from '../../../../components/widget'
import Attribute from './components/attribute'
import PieChart from '../../../../components/pieChart'
import { useImproveTemplate } from '../../../../provider/improveTemplate';
import {create, update} from '../../../../api/attribute'
import { random } from '../../../../functions/numbers';

const Final = forwardRef((props, ref) => {
  const { prevStep, templateId } = props
  const [improveTemplate, dispatch] = useImproveTemplate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
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
  const [right, setRight] = useState({})
  const [left, setLeft] = useState({})

  const saveAttributes = async () => {
    const attributes = [
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
      right,
      left
    ]
    await Promise.all(attributes.map(async (attribute) => {
      if (attribute.id) {
        let tmp = {
          id: attribute.id,
          editable: attribute.editable,
          value: attribute.value
        }
        await update(tmp)
      }
      else {
        await create(attribute)
      }
    }))
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
  const handleChangeRight = (v) => {
    if (v.value !== undefined) {
      setRight({ ...right, ...v })
      setLeft({...left, ...{value: 100 - v.value}})
    }
  }
  const handleChangeLeft = (v) => {
    if (v.value !== undefined) {
      setLeft({ ...left, ...v });
      setRight({ ...right, ...{ value: 100 - v.value } });
    }
  };

  useImperativeHandle(ref, () => ({
    async save() {
      await saveAttributes()
    },
  }));
  useEffect(() => {
    setName(improveTemplate?.name || "");
    setDescription(improveTemplate?.description || "");
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
    const leftV = random(0, 30)
    setLeft(improveTemplate?.baseAttributes?.left || { key: 'left', name: 'Left Brain', value: leftV, editable: true, base: true, improveTemplateID: templateId })
    setRight(improveTemplate?.baseAttributes?.right || {key: 'right', name: 'Right Brain', value: 100 - leftV, editable: true, base: true, improveTemplateID: templateId})
  }, [improveTemplate]);
  return (
    <Widget title="" description="">
      <div className='flex justify-between py-5 px-3 border-solid border-b-2 border-slate-400'>
        <div className='flex items-center pr-3'>
          <div className="pr-3 cursor-pointer" onClick={() => prevStep()}>
            <KeyboardBackspace className="text-md" />
          </div>
          <div className="text-md pl-3 font-bold border-solid border-l-2 border-slate-400">Creation of the Job template - Review & Publish</div>
        </div>
      </div>
      <div className="bg-grey-200 px-2 py-3">
        <div className="font-bold pt-2">Template Name</div>
        <div className="bg-white p-3 my-1 border-solid border border-grey-300">{name}</div>
        <div className="font-bold pt-2">Job Description</div>
        <div className="bg-white p-3 my-1 border-solid border border-grey-300 overflow-y-scroll" style={{ minHeight: 250, maxHeight: 250 }}>
          {description}
        </div>
      </div>
      <Grid className="pt-5" container spacing={2} alignItems="stretch">
        <Grid className="" item md={6} xs={12}>
          <div className="border-solid rounded border border-slate-600 my-1" style={{height: "calc(100% - 12px)"}}>
            <Grid container spacing={2} alignItems="center">
              <Grid item md={6} xs={12}>
                <PieChart data={[
                  { name: attentionToDetail.name, value: attentionToDetail.value, color: "#a04ced" },
                  { name: creativeThinking.name, value: creativeThinking.value, color: "#ffb100" },
                  { name: customerOrientation.name, value: customerOrientation.value, color: "#d92828" },
                  { name: analyticalAbility.name, value: analyticalAbility.value, color: "#5c3ae7" }
                ]} />
              </Grid>
              <Grid item md={6} xs={12}>
                <div className="flex items-center my-2 pl-4">
                  <div className="w-3 h-3 mr-3" style={{backgroundColor: '#a04ced'}}></div>
                  <div>Attention to detail</div>
                </div>
                <div className="flex items-center my-2 pl-4">
                  <div className="w-3 h-3 mr-3" style={{backgroundColor: '#ffb100'}}></div>
                  <div>Creative Thinking</div>
                </div>
                <div className="flex items-center my-2 pl-4">
                  <div className="w-3 h-3 mr-3" style={{backgroundColor: '#d92828'}}></div>
                  <div>Customer Orientation</div>
                </div>
                <div className="flex items-center my-2 pl-4">
                  <div className="w-3 h-3 mr-3" style={{backgroundColor: '#5c3ae7'}}></div>
                  <div>Analytical Ability</div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Attribute title="Attention to detail" isCheck={false} trackStyle={{backgroundColor: '#a04ced'}} initValue={attentionToDetail?.value} disabled={!attentionToDetail?.editable} onChange={(v) => handleChangeAttention(v)} />
            </Grid>
            <Grid item md={6} xs={12}>
              <Attribute title="Customer Orientation" isCheck={false} trackStyle={{backgroundColor: '#d92828'}} initValue={customerOrientation?.value} disabled={!customerOrientation?.editable} onChange={(v) => handleChangeCustomer(v)} />
            </Grid>
            <Grid item md={6} xs={12}>
              <Attribute title="Creative Thinking" isCheck={false} trackStyle={{backgroundColor: '#ffb100'}} initValue={creativeThinking?.value} disabled={!creativeThinking?.editable} onChange={(v) => handleChangeCreative(v)} />
            </Grid>
            <Grid item md={6} xs={12}>
              <Attribute title="Analytical ability" isCheck={false} trackStyle={{backgroundColor: '#5c3ae7'}} initValue={analyticalAbility?.value} disabled={!analyticalAbility?.editable} onChange={(v) => handleChangeAnalytical(v)} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div>
      </div>
      <Grid className="py-6" container spacing={2}>
        <Grid item xs={12}>
          <div className="font-bold pt-2">Final Attributes</div>
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
      <Grid className="py-6" container spacing={2}>
        <Grid item xs={12}>
          <div className="font-bold pt-2">L/R Brain</div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Attribute title="Left Brain" isCheck={false} initValue={left?.value} onChange={(v) => handleChangeLeft(v)} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Attribute title="Right Brain" isCheck={false} initValue={right?.value} onChange={(v) => handleChangeRight(v)} />
        </Grid>
      </Grid>
    </Widget>
  )
})
export default Final
