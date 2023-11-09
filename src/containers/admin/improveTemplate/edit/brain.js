import React, {useState, useEffect} from 'react'
import {
  Grid
} from '@material-ui/core'
import { KeyboardBackspace, Save } from "@material-ui/icons";

import Widget from '../../../../components/widget'
import { useStyles } from '../../../style/common'
import Topic from './topic/topicComponent'
import { useImproveTemplate } from '../../../../provider/improveTemplate'
import { getByPaginationFilter as getTopics } from "../../../../api/topic";
import Create from './topic/create'

const Brain = (props) => {
  const { complexityTypes, templateId, nextStep, prevStep, setStep } = props
  const [improveTemplate, ] = useImproveTemplate()
  const classes = useStyles()
  const [rTemplateTopics, setRTemplateTopics] = useState([])
  const [lTemplateTopics, setLTemplateTopics] = useState([])
  const [rTopics, setRTopics] = useState([])
  const [lTopics, setLTopics] = useState([])
  const [rTopicFrom, setRTopicFrom] = useState(0)
  const [lTopicFrom, setLTopicFrom] = useState(0)
  const limit = 10

  const handleContinue = () => {
    nextStep()
  }
  const moreTopics = async (brain) => {
    if (brain === 'left') {
      const _topics = await getTopics({ brain: { eq: brain } }, limit, lTopicFrom);
      setLTopics([...lTopics, ..._topics]);
      setLTopicFrom(lTopicFrom + limit);
    }
    else if (brain === 'right') {
      const _topics = await getTopics({ brain: { eq: brain } }, limit, rTopicFrom);
      setRTopics([...rTopics, ..._topics]);
      setRTopicFrom(rTopicFrom + limit);
    }
  };

  useEffect(() => {
    setRTemplateTopics(improveTemplate?.rightTopics||[])
    setLTemplateTopics(improveTemplate?.leftTopics||[])
  }, [improveTemplate])
  useEffect(() => {
    (async () => {
      const _lTopics = await getTopics({ brain: { eq: 'left' } }, limit, 0);
      setLTopics(_lTopics);
      setLTopicFrom(limit);
      const _rTopics = await getTopics({ brain: { eq: "right" } }, limit, 0);
      setRTopics(_rTopics);
      setRTopicFrom(limit);
    })();
  }, []);
  return (
    <Widget title="" description="">
      <div className='flex justify-between py-5 px-3 border-solid border-b-2 border-slate-400'>
        <div className='flex items-center pr-3'>
          <div className="pr-3 cursor-pointer" onClick={() => prevStep()}>
            <KeyboardBackspace className="text-md" />
          </div>
          <div className="text-md pl-3 font-bold border-solid border-l-2 border-slate-400">Step 2 - Configure the left and right brain</div>
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
        <div>
          <div className="border-4 rounded-full border-amber-700 shadow-xl p-6 w-36 m-2">
            <img className="w-16 h-16" src="/images/admin/brain.png" alt="" />
          </div>
          <div className="text-center font-bold">L & R Brain</div>
        </div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
        <div>
          <div className="border-4 rounded-full border-yellow-500 p-4 w-36 m-2">
            <img className="w-12 h-12" src="/images/admin/personality.png" alt="" />
          </div>
          <div className="text-center">Personality</div>
        </div>
        <div className="w-2 h-2 m-2 bg-grey-600 rounded-full"></div>
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
      <Grid className="py-5" container spacing={2} style={{minHeight: 250}}>
        <Grid item md={6} xs={12}>
          <div className="flex items-center justify-between text-white bg-neutral-800 rounded p-2" style={{backgroundColor: '#1a2245'}}>
            <div>Left Brain</div>
            <Create complexityTypes={complexityTypes} templateId={templateId} brain="left" topics={lTopics} more={moreTopics} />
          </div>
          {lTemplateTopics.map((item, index) => (
            <Topic
              item={item}
              complexityTypes={complexityTypes}
              index={index}
              brain="left"
              topics={lTopics}
              more={moreTopics}
              key={index}
            />
          ))}
        </Grid>
        <Grid item md={6} xs={12}>
          <div className="flex items-center justify-between text-white bg-neutral-800 rounded p-2" style={{backgroundColor: '#1a2245'}}>
            <div>Right Brain</div>
            <Create complexityTypes={complexityTypes} templateId={templateId} brain="right" topics={rTopics} more={moreTopics} />
          </div>
          {rTemplateTopics.map((item, index) => (
            <Topic
              item={item}
              complexityTypes={complexityTypes}
              index={index}
              brain="right"
              topics={rTopics}
              more={moreTopics}
              key={index}
            />
          ))}
        </Grid>
      </Grid>
    </Widget> 
  )
}
export default Brain
