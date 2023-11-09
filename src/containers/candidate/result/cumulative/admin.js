import React, {useState, useEffect} from 'react'
import {
  Grid,
} from '@material-ui/core'
import {ArrowBackIos} from '@material-ui/icons'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell
} from 'recharts'

import SectionTitle from '../../../../components/section-title'
import Widget from '../../../../components/widget'
import {getColor} from '../../../../functions/colors'
import {getCumulative} from '../../../../api/examResult'
import {useAsync} from '../../../../functions/utils'
import {getSplitArray} from '../../../../functions/common'
import {useSetting} from '../../../../provider/setting'

const DonutChart = (props) => {
  const {percentage, correct, total, brain, ...rest} = props
  const [data, setData] = useState([])
  let colors = [
    getColor('bg-blue-200'),
    getColor('bg-blue-400'),
  ]

  useEffect(() => {
    setData([
      {name: 'fail', value: 100 - percentage},
      {name: 'correct', value: percentage},
    ])
  }, [percentage])
  return (
    <div {...rest} style={{cursor: 'pointer'}}>
      <div style={{width: '100%', height: 240, position: 'relative'}}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} innerRadius={60} fill="#8884d8" dataKey="value">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="text-base" style={{position: 'absolute', top: 100, width: '100%'}}>
          <div className="text-center">{`${correct}/${total}`}</div>
          <div className="text-center">{`${percentage?percentage.toFixed(2):''}%`}</div>
        </div>
      </div>
      <div className="text-center">{brain} brain</div>
    </div>
  )
}

const Brain = (props) => {
  const {result, change, changePage} = props

  const handleChange = (brain) => {
    change(brain)
    changePage('topic')
  }
  return (
    <Grid container>
      <Grid item lg={6} xs={12}>
        <DonutChart 
          percentage={result?.right?.percentage} 
          correct={result?.right?.totalCorrect} 
          total={result?.right?.totalQuestion} 
          brain="right"
          onClick={() => handleChange('right')}
        />
      </Grid>
      <Grid item lg={6} xs={12}>
        <DonutChart 
          percentage={result?.left?.percentage} 
          correct={result?.left?.totalCorrect} 
          total={result?.left?.totalQuestion} 
          brain="left"
          onClick={() => handleChange('left')}
        />
      </Grid>
    </Grid>
  )
}

const DataBar = (props) => {
  const {data, change} = props
  const colors = [
    {dataKey: 'correct', fill: getColor('bg-blue-200')},
    {dataKey: 'total', fill: getColor('bg-blue-600')}
  ]

  const handleChange = (e) => {
    if (e?.activePayload && e?.activePayload?.length !== 0 && change) {
      change(e?.activePayload[0]?.payload?.id)
    }
  }
  return (
    <div style={{width: '100%', height: 240}}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10
          }}
          onClick={handleChange}
          >
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} width={30} />
          {colors.map((color, i) => (
            <Bar
              key={i}
              barSize={10}
              //stackId="sales"
              dataKey={color.dataKey}
              fill={color.fill}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

const Topic = (props) => {
  const {result, brain, change, changePage, back} = props
  const [topics, setTopics] = useState([])

  const handleChange = (id) => {
    change(id)
    changePage('subtopic')
  }

  useEffect(() => {
    if (brain === 'right') {
      let tmp = result?.right?.topics?.items?.map((topic) => {
        let item = {}
        item.name = topic?.topic?.name
        item.correct = topic?.totalCorrect
        item.total = topic?.totalQuestion
        item.id = topic?.id
        return item
      })
      tmp = getSplitArray(tmp, 10)
      setTopics(tmp)
    }
    else if (brain === 'left') {
      let tmp = result?.left?.topics?.items?.map((topic) => {
        let item = {}
        item.name = topic?.topic?.name
        item.correct = topic?.totalCorrect
        item.total = topic?.totalQuestion
        item.id = topic?.id
        return item
      })
      tmp = getSplitArray(tmp, 10)
      setTopics(tmp)
    }
  }, [result, brain])
  return (
    <>
      <div className="cursor-pointer pl-4 pb-4 float-left" style={{color: '#1e88e5'}} onClick={back}>
        <ArrowBackIos style={{fontSize: 18}} />back
      </div>
      <div className="text-center">{brain} brain</div>
      <Grid container>
        {topics.map((topic, index) => (
        <Grid item md={6} xs={12} key={index}>
          <DataBar data={topic} change={handleChange} />
        </Grid>
        ))}
      </Grid>
    </>
  )
}

const SubTopic = (props) => {
  const {result, brain, topicId, back} = props
  const [subtopics, setSubtopics] = useState([])
  const [topic, setTopic] = useState('')

  useEffect(() => {
    if (brain === 'right') {
      const topics = result?.right?.topics?.items?.filter((topic) => topic.id === topicId)
      if (topics.length !== 0) {
        setTopic(topics[0]?.topic?.name)
        let tmp = topics[0]?.subTopics?.items?.map((subtopic) => {
          let item = {}
          item.name = subtopic?.subTopic?.name
          item.correct = subtopic?.totalCorrect
          item.total = subtopic?.totalQuestion
          return item
        })
        tmp = getSplitArray(tmp, 10)
        setSubtopics(tmp)
      }
    }
    else if (brain === 'left') {
      const topics = result?.left?.topics?.items?.filter((topic) => topic.id === topicId)
      if (topics.length !== 0) {
        setTopic(topics[0]?.topic?.name)
        let tmp = topics[0]?.subTopics?.items?.map((subtopic) => {
          let item = {}
          item.name = subtopic?.subTopic?.name
          item.correct = subtopic?.totalCorrect
          item.total = subtopic?.totalQuestion
          return item
        })
        tmp = getSplitArray(tmp, 10)
        setSubtopics(tmp)
      }
    }
  }, [result, brain, topicId])
  return (
    <>
      <div className="cursor-pointer pl-4 pb-4 float-left" style={{color: '#1e88e5'}} onClick={back}>
        <ArrowBackIos style={{fontSize: 18}} />back
      </div>
      <div className="text-center">{brain} brain, topic - {topic}</div>
      <Grid container>
        {subtopics.map((subtopic, index) => (
          <Grid item md={6} xs={12} key={index}>
            <DataBar data={subtopic} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

const Cumulative = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting] = useSetting()
  const [cumulative, setCumulative] = useState({})
  const [examResult, setExamResult] = useState([])
  const [page, setPage] = useState('brain')
  const [brain, setBrain] = useState('')
  const [topic, setTopic] = useState('')

  const backSubtopic = () => {
    setPage('topic')
    setTopic('')
  }
  const backTopic = () => {
    setPage('brain')
    setBrain('')
  }

  useEffect(() => {
    if (setting?.auth) {
      run(getCumulative({userID: {eq: setting?.auth?.id}, corporateID: {eq: ''}, isTrain: {eq: false}}))
    }
  }, [run, setting?.auth])
  useEffect(() => {
    if (status === 'resolved') {
      setCumulative(data?.cumulativeResults)
      let tmp = data?.examResults?.map((result) => {
        let item = {}
        item.name = result?.exam?.name
        item.percentage = result?.percentage
        return item
      })
      tmp = getSplitArray(tmp, 10)
      setExamResult(tmp)
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])
  return (
    <>
      <SectionTitle title="Cumulative Result" subtitle="Cumulative Result Of Companies" />
      <Widget
        title="Cumulative"
        description={
          <span>
            Here are cumulative
          </span>
        }>
        {page === 'brain'?
        <Brain result={cumulative} change={setBrain} changePage={setPage} />:
        page === 'topic'?
        <Topic result={cumulative} brain={brain} change={setTopic} changePage={setPage} back={backTopic} />:
        page === 'subtopic'?
        <SubTopic result={cumulative} brain={brain} topicId={topic} back={backSubtopic} />:
        ''
        }
      </Widget>
      <Widget
        title="All Exam Results"
        description={
          <span>
            Here are exam results
          </span>
        }>
        <Grid container>
          {examResult.map((result, index) => (
            <Grid item md={6} xs={12} key={index}>
              <div style={{width: '100%', height: 240}}>
                <ResponsiveContainer>
                  <BarChart
                    data={result}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 10,
                      bottom: 10
                    }}
                    >
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} width={30} />
                    <Bar
                      barSize={10}
                      //stackId="sales"
                      dataKey="percentage"
                      fill={getColor('bg-blue-600')}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Grid>
          ))}
        </Grid>
      </Widget>
  </>
  )
}
export default Cumulative
