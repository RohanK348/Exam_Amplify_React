import React, {useState, useEffect} from 'react'
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import ReactExport from "react-export-excel"

import { useStyles } from '../../style/common'
import { useAsync } from '../../../functions/utils'
import { getAverageExam, getAllStudents } from '../../../api/examResult'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn
const Excel = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {examId} = props
  const classes = useStyles()
  const [excelData, setExcelData] = useState([])
  const [topics, setTopics] = useState([])
  const [average, setAverage] = useState({})
  const [asyncState, setAsyncState] = useState('')
  const [pending, setPending] = useState(false)

  const getPercentage = (value, total) => {
    if (total === 0)
      return 0
    else
      return Math.floor(100*value/total)
  }

  useEffect(() => {
    if (examId) {
      run(getAverageExam(examId))
      setAsyncState('getAverage')
      setPending(true)
    }
  }, [examId])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getAverage') {
        setAverage(data)
        run(getAllStudents(examId))
        setAsyncState('getStudents')
      }
      else if (asyncState === 'getStudents') {
        let items = []
        data.map((student) => {
          let item = {}
          item.candidate_name = student?.user?.firstName
          item.candidate_email = student?.user?.email
          item.test_name = student?.exam?.name
          item.mark = student?.result?.percentage
          // right
          let right = {}
          right.total = student?.result?.right?.totalQuestion
          right.mark = getPercentage(student?.result?.right?.totalCorrect, student?.result?.right?.totalQuestion)
          right.average = getPercentage(average?.right?.totalCorrect, average?.right?.totalQuestion)
          item.right = `${right.mark}/${right.total}, ${right.average}`
          // left
          let left = {}
          left.total = student?.result?.left?.totalQuestion
          left.mark = getPercentage(student?.result?.left?.totalCorrect, student?.result?.left?.totalQuestion)
          left.average = getPercentage(average?.left?.totalCorrect, average?.left?.totalQuestion)
          item.left = `${left.mark}/${left.total}, ${left.average}`
          // total
          let total = {}
          total.total = student?.result?.totalCorrect
          total.mark = getPercentage(student?.result?.totalCorrect, student?.result?.totalQuestion)
          total.average = getPercentage(average?.totalCorrect, average?.totalQuestion)
          item.total = `${total.mark}/${total.total}, ${total.average}`
          // topics
          let topics = []
          let totalTopics = [...student?.result?.right?.topics?.items, ...student?.result?.left?.topics?.items]
          let averageTopics = [...average?.right?.topics?.items, ...average?.left?.topics?.items]
          if (totalTopics.length === averageTopics.length) {
            for (let i = 0; i < totalTopics.length; i ++) {
              let topic = {}
              topic.total = totalTopics[i]?.totalQuestion
              topic.mark = totalTopics[i]?.percentage
              topic.average = averageTopics[i]?.percentage
              topics = [...topics, topic]
            }
          }
          setTopics(topics)
          topics.forEach((topic, index) => {
            item[`topic${index + 1}`] = `${topic.mark}/${topic.total}, ${topic.average}`
          })
          items = [...items, item]
        })
        setExcelData(items)
        setAsyncState('')
        setPending(false)
      }
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
      <ExcelFile element={<button className={`${classes.button} ${classes.cancel}`}>Excel</button>}>
        <ExcelSheet data={excelData} name="Empowerr">
            <ExcelColumn label="Candidate Name" value="candidate_name"/>
            <ExcelColumn label="Candidate Email" value="candidate_email"/>
            <ExcelColumn label="Contact Number" value="contact_number"/>
            <ExcelColumn label="Apeared On" value="apeared_on"/>
            <ExcelColumn label="Test Name" value="test_name"/>
            <ExcelColumn label="Test Status" value="test_status"/>
            <ExcelColumn label="Location" value="location"/>
            <ExcelColumn label="Education Qualification" value="education_qualification"/>
            <ExcelColumn label="Year of Study" value="year_of_study"/>
            <ExcelColumn label="College Name" value="college_name"/>
            <ExcelColumn label="Batch Stream" value="batch_stream"/>
            <ExcelColumn label="Mark Obtained" value="mark"/>
            <ExcelColumn label="Left Brain (Achieved Mark/Total, Average)" value="left"/>
            <ExcelColumn label="Right Brain (Achieved Mark/Total, Average)" value="right"/>
            <ExcelColumn label="Total Brain (Achieved Mark/Total, Average)" value="total"/>
            <ExcelColumn label="Programming Candidate (out of Total)" value="programming_candidate"/>
            <ExcelColumn label="MCQ coding marks(out of Total)" value="MCQ"/>
            {topics.map((topic, index) => (
              <ExcelColumn key={index} label={`Topic${index+1} (Achieved Mark/total, average)`} value={`topic${index+1}`}/>  
            ))}
            <ExcelColumn label="Like that for all topics" value="like_topics"/>
            <ExcelColumn label="Personality Trait " value="personality_trait"/>
            <ExcelColumn label="Selected for next level(Yes/No)" value="selected_next_level"/>
        </ExcelSheet>
    </ExcelFile>
    </>
  )
}
export default Excel