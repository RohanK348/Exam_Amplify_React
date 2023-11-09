import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
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

import Widget from '../../../../components/widget'
import {getColor} from '../../../../functions/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  button: {
    textTransform: 'none',
  },
  icon: {
    fontSize: 18,
  },
  refresh: {
    float: 'right',
    marginRight: 30,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

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
      const tmp = result?.right?.topics?.items?.map((topic) => {
        let item = {}
        item.name = topic?.topic?.name
        item.correct = topic?.totalCorrect
        item.total = topic?.totalQuestion
        item.id = topic?.id
        return item
      })
      setTopics(tmp)
    }
    else if (brain === 'left') {
      const tmp = result?.left?.topics?.items?.map((topic) => {
        let item = {}
        item.name = topic?.topic?.name
        item.correct = topic?.totalCorrect
        item.total = topic?.totalQuestion
        item.id = topic?.id
        return item
      })
      setTopics(tmp)
    }
  }, [result, brain])
  return (
    <>
      <div className="cursor-pointer pl-4 pb-4 float-left" style={{color: '#1e88e5'}} onClick={back}>
        <ArrowBackIos style={{fontSize: 18}} />back
      </div>
      <div className="text-center">{brain} brain</div>
      <DataBar data={topics} change={handleChange} />
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
        const tmp = topics[0]?.subTopics?.items?.map((subtopic) => {
          let item = {}
          item.name = subtopic?.subTopic?.name
          item.correct = subtopic?.totalCorrect
          item.total = subtopic?.totalQuestion
          return item
        })
        setSubtopics(tmp)
      }
    }
    else if (brain === 'left') {
      const topics = result?.left?.topics?.items?.filter((topic) => topic.id === topicId)
      if (topics.length !== 0) {
        setTopic(topics[0]?.topic?.name)
        const tmp = topics[0]?.subTopics?.items?.map((subtopic) => {
          let item = {}
          item.name = subtopic?.subTopic?.name
          item.correct = subtopic?.totalCorrect
          item.total = subtopic?.totalQuestion
          return item
        })
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
      <DataBar data={subtopics} />
    </>
  )
}

const Analisis = (props) => {
  const classes = useStyles()
  const {result} = props
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

  return (
    <Widget
      title="Analisis"
      description={
        <span>
          Here are Analisis
        </span>
      }>
      {page === 'brain'?
      <Brain result={result} change={setBrain} changePage={setPage} />:
      page === 'topic'?
      <Topic result={result} brain={brain} change={setTopic} changePage={setPage} back={backTopic} />:
      page === 'subtopic'?
      <SubTopic result={result} brain={brain} topicId={topic} back={backSubtopic} />:
      ''
      }
    </Widget>
  )
}
export default Analisis
