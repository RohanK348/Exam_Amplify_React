import React, {useState, useEffect} from 'react'
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Text as RechartText,
} from 'recharts'
import { 
  PDFDownloadLink, 
} from '@react-pdf/renderer'
import html2canvas from 'html2canvas'
import ReactSpeedometer from "react-d3-speedometer"

import AmplifyImage from '../../../../../components/amplifyImage'
import {useStyles} from '../../../../style/common'
import {useSetting} from '../../../../../provider/setting'
import {useAsync} from '../../../../../functions/utils'
import {getColor} from '../../../../../functions/colors'
import {getAverage} from '../../../../../api/examResult'
import {isEmptyObject} from '../../../../../functions/common'
import PDFDocument from './pdfDocument'

const CustomizedLabel = (props) => {
  const {x, y, fill, value} = props;

  return (
    <RechartText 
      x={x+10} 
      y={y} 
      dy={1} 
      fontSize='12' 
      fontFamily='sans-serif'
      fill={fill}
      textAnchor="middle"
    >
      {`${value}%`}
    </RechartText>
  )
}

const DataBar = (props) => {
  const {data, text} = props
  const colors = [
    {dataKey: 'total', fill: getColor('bg-green-600')},
    {dataKey: 'candidate', fill: getColor('bg-blue-600')},
    {dataKey: 'average', fill: getColor('bg-red-600')}
  ]

  return (
    <>
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
            >
            <XAxis hide />
            <YAxis hide />
            {colors.map((color, i) => (
              <Bar
                key={i}
                barSize={20}
                dataKey={color.dataKey}
                fill={color.fill}
                fontFamily="sans-serif"
                label={<CustomizedLabel />}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center">{text}</div>
    </>
  )
}

const Print = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {student} = props
  const [setting] = useSetting()
  const classes = useStyles()
  const [average, setAverage] = useState({})
  const [rankText, setRankText] = useState('')
  const [analysis, setAnalysis] = useState({})
  const [logo, setLogo] = useState('')
  const [logoImage, setLogoImage] = useState('')
  const [overall, setOverall] = useState('')
  const [analysisImage, setAnalysisImage] = useState('')
  const [rightSubtopics, setRightSubtopics] = useState([])
  const [leftSubtopics, setLeftSubtopics] = useState([])
  const [modalActive, setModalActive] = useState(false)
  const [pending, setPending] = useState(false)
  
  const handleClickOpen = () => {
    setModalActive(true)
    setPending(true)
    const interval = setInterval(function () {
      getLogo()
      getOverall()
      getAnalysis()
      clearInterval(interval);
    }, 1000 * 5);
  }
  const handleClose = () => {
    setModalActive(false)
  }
  const getLogo = () => {
    const input = document.getElementById('logo');
    if (input) {
      html2canvas(input, {allowTaint: true, useCORS: true})
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          setLogoImage(imgData)
        })
    }
  }
  const getOverall = () => {
    const input = document.getElementById('overall');
    if (input) {
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          setOverall(imgData)
        })
    }
  }
  const getAnalysis = () => {
    const input = document.getElementById('analysis');
    if (input) {
      html2canvas(input)  
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          setAnalysisImage(imgData)
          setPending(false)
        })
    }
  }
  const getPercentage = (value, total) => {
    if (total === 0)
      return 0
    else
      return Math.floor(100*value/total)
  }
  const getSubtopics = (brain, averageBrain) => {
    let res = []
    let topics = brain?.topics?.items
    let newTopics = averageBrain?.topics?.items
    topics.forEach((topic, index) => {
      topic.average = newTopics[index].totalCorrect
      let subtopics = topic?.subTopics?.items
      let newSubtopics = newTopics[index]?.subTopics?.items
      subtopics.forEach((subtopic, subtopicIndex) => {
        subtopic.average = newSubtopics[subtopicIndex].totalCorrect
        subtopic.topicName = topic?.topic?.name
      })
      res = [...res, ...subtopics]
    })
    return res
  }
  
  useEffect(() => {
    if (student?.result?.right && average?.right) {
      let subtopics = getSubtopics(student?.result?.right, average?.right)
      console.log('right subtopics', subtopics)
      setRightSubtopics(subtopics)
      subtopics = getSubtopics(student?.result?.left, average?.left)
      console.log('left subtopics', subtopics)
      setLeftSubtopics(subtopics)
    }
  }, [average, student])
  useEffect(() => {
    if (!isEmptyObject(student) && setting.auth) {
      if (student?.exam?.openingID !== '' && setting?.auth?.corporate?.logo !== '') {
        setLogo(setting?.auth?.corporate?.logo)
      }
      run(getAverage(student?.examID, student?.userID))
      setPending(true)
    }
  }, [student, setting.auth])
  useEffect(() => {
    if (status === 'resolved') {
      console.log('student', student)
      console.log('average', data)
      setAverage(data)
      if (data.rank < 500) {
        setRankText(`Top ${data.rank/10}%`)
      }
      else {
        setRankText(`Below ${(1100 - data.rank)/10}%`)
      }
      let tmp = {}
      let total = {}
      total.total = 100
      total.candidate = getPercentage(student?.result?.totalCorrect, student?.result?.totalQuestion)
      total.average = getPercentage(data?.totalCorrect, data?.totalQuestion)
      tmp.total = total
      let right = {}
      right.total = getPercentage(student?.result?.right?.totalQuestion, student?.result?.totalQuestion)
      right.candidate = getPercentage(student?.result?.right?.totalCorrect, student?.result?.right?.totalQuestion)
      right.average = getPercentage(data?.right?.totalCorrect, data?.right?.totalQuestion)
      tmp.right = right
      let left = {}
      left.total = 100 - right.total
      left.candidate = getPercentage(student?.result?.left?.totalCorrect, student?.result?.left?.totalQuestion)
      left.average = getPercentage(data?.left?.totalCorrect, data?.left?.totalQuestion)
      tmp.left = left
      setAnalysis(tmp)
      setPending(false)
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
    }
  }, [status])
  return (
    <>
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
      <button className={`${classes.button} ${classes.cancel}`} onClick={handleClickOpen}>Print PDF</button>
      <Dialog 
        open={modalActive} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle id="form-dialog-title">Print Pdf</DialogTitle>
        <DialogContent>
          <Grid container justify="center">
            <span id="logo">
              {logo===''?
                <img src="/logo-s.png" style={{width: 200}} />:
                <AmplifyImage imageKey={logo} style={{width: 200}} crossOrigin="anonymous" />
              }
            </span>
          </Grid>
          <Grid container justify="center" className="pt-8">
            <span id="overall">
              <ReactSpeedometer
                value={average?.rank}
                currentValueText={rankText}
                fontSize={20}
                customSegmentLabels={[
                  {
                    text: "top 20%",
                    color: "#555",
                    position: "OUTSIDE",
                    fontSize: "12px",
                  },
                  {
                    text: "top 40%",
                    color: "#555",
                    position: "OUTSIDE",
                    fontSize: "12px",
                  },
                  {
                    text: "middle",
                    color: "#555",
                    position: "OUTSIDE",
                    fontSize: "12px",
                  },
                  {
                    text: "below 40%",
                    color: "#555",
                    position: "OUTSIDE",
                    fontSize: "12px",
                  },
                  {
                    text: "below 20%",
                    color: "#555",
                    position: "OUTSIDE",
                    fontSize: "12px",
                  },
                ]}
              />
            </span>
          </Grid>
          <Grid container id="analysis">
            <Grid item xs={3}>
              <DataBar data={[{total: analysis?.total?.total||0, candidate: analysis?.total?.candidate||0, average: analysis?.total?.average||0}]} text="Total" />
            </Grid>
            <Grid item xs={3}>
              <DataBar data={[{total: analysis?.right?.total||0, candidate: analysis?.right?.candidate||0, average: analysis?.right?.average||0}]} text="Right Brain" />
            </Grid>
            <Grid item xs={3}>
            <DataBar data={[{total: analysis?.left?.total||0, candidate: analysis?.left?.candidate||0, average: analysis?.left?.average||0}]} text="Left Brain" />
            </Grid>
            <Grid item xs={3}>
              <div style={{display: 'flex', padding: 10}}>
                <div style={{width: 20, height: 20, backgroundColor: getColor('bg-green-600')}}></div>
                <div style={{paddingLeft: 10}}>Total</div>
              </div>
              <div style={{display: 'flex', padding: 10}}>
                <div style={{width: 20, height: 20, backgroundColor: getColor('bg-blue-600')}}></div>
                <div style={{paddingLeft: 10}}>Candidate</div>
              </div>
              <div style={{display: 'flex', padding: 10}}>
                <div style={{width: 20, height: 20, backgroundColor: getColor('bg-red-600')}}></div>
                <div style={{paddingLeft: 10}}>Average</div>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <button className={`${classes.button} ${classes.cancel}`} onClick={handleClose} color="primary">
            Cancel
          </button>
          <PDFDownloadLink 
            document={
              <PDFDocument 
                logo={logoImage} 
                overall={overall} 
                analysis={analysisImage} 
                auth={setting?.auth} 
                student={student}
                average={average}
                rightSubtopics={rightSubtopics}
                leftSubtopics={leftSubtopics}
              />
            } 
            fileName={`example.pdf`}
          >
            <button className={`${classes.button} ${classes.cancel}`}>Print</button>
          </PDFDownloadLink>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Print