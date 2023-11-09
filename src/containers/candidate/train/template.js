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
import {useHistory} from 'react-router-dom'
import {Description} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import {NotificationManager} from 'react-notifications'

import { getExams, removeExam } from '../../../api/template'
import { getExams as getExamsWithImprove } from "../../../api/improveTemplate";
import {create as createExam} from '../../../api/exam'
import {
  create as createTrain, 
  update as updateTrain, 
  getFilter as getTrain,
} from '../../../api/train'
import {useSetting} from '../../../provider/setting'
import {useAsync} from '../../../functions/utils'
import {isEmptyObject} from '../../../functions/common'

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
  },
  header: {
    backgroundColor: '#EEF5FE',
    padding: 20,
    borderRadius: '5px 5px 0px 0px',
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    padding: 30,
    color: '#dad5d5',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    padding: '20px 5px',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  select: {
    fontSize: 17,
    textAlign: 'center',
    padding: 10,
    border: 'solid 1px #e2e1e1',
    cursor: 'pointer',
  },
  rightBorder: {
    borderRadius: '0px 0px 5px 0px',
  },
  leftBorder: {
    borderRadius: '0px 0px 0px 5px',
  },
  active: {
    backgroundColor: '#1A2245',
    color: 'white',
  },
  cancel: {
    marginRight: 10,
    backgroundColor: 'white !important',
    color: 'black !important',
    border: 'solid black 1px',
  },
  button: {
    textTransform: 'none',
    fontSize: 15,
    color: 'white',
    backgroundColor: '#1A2245',
    padding: '8px 20px',
    borderRadius: 5,
    margin: '10px 30px',
  },
  name: {
    fontWeight: 'bold',
  },
  description: {

  }
}))
const Board = (props) => {
  const classes = useStyles();
  const { item } = props;

  return (
    <>
      <div><span className={classes.name}>Total Time: </span>{Math.ceil(item?.totalTime/60)} min</div>
        <div className={classes.name}>Right Brain</div>
        {item?.right?.map((topic, index) => (
          <div key={index} style={{padding: '10px 30px'}}>
            <div><span className={classes.name}>Topic Name: </span>{topic?.name}</div>
            <div className={classes.name}>SubTopics</div>
            {topic?.subtopics?.items?.map((subtopic, index) => (
              <div key={index} style={{padding: '5px 30px'}}>
                <div><span className={classes.name}>SubTopic Name: </span>{subtopic?.name}</div>
                <div><span className={classes.name}>Complexity: </span>{subtopic?.complexity}</div>
                <div><span className={classes.name}>Total Questions: </span>{subtopic?.totalQuestion}</div>
              </div>
            ))}
          </div>
        ))
        }
        <div className={classes.name}>Left Brain</div>
        {item?.left?.map((topic, index) => (
          <div key={index} style={{padding: '10px 30px'}}>
            <div><span className={classes.name}>Topic Name: </span>{topic?.name}</div>
            <div className={classes.name}>SubTopics</div>
            {topic?.subtopics?.items?.map((subtopic, index) => (
              <div key={index} style={{padding: '5px 30px'}}>
                <div><span className={classes.name}>SubTopic Name: </span>{subtopic?.name}</div>
                <div><span className={classes.name}>Complexity: </span>{subtopic?.complexity}</div>
                <div><span className={classes.name}>Total Questions: </span>{subtopic?.totalQuestion}</div>
              </div>
            ))}
          </div>
        ))}
    </>
  )
}
const SimpleBoard = (props) => {
  const classes = useStyles();
  const { item } = props;

  return (
    <>
      <div><span className={classes.name}>Total Time: </span>{Math.ceil(item?.totalTime/60)} min</div>
      <div className={classes.name}>Right Brain</div>
      <div style={{padding: '10px 30px'}}>
        <div><span className={classes.name}>Brain Time: </span>{item?.right?.totalTime}</div>
        {!item?.right?.isOwn &&
        <>
          <div><span className={classes.name}>The Beginner Questions: </span>{item?.right?.beginner}</div>
          <div><span className={classes.name}>The Intermediate Questions: </span>{item?.right?.intermediate}</div>
          <div><span className={classes.name}>The Advanced Questions: </span>{item?.right?.advanced}</div>
          <div><span className={classes.name}>The High Questions: </span>{item?.right?.high}</div>
          <div><span className={classes.name}>The Very High Questions: </span>{item?.right?.veryHigh}</div>
          <div><span className={classes.name}>The Complex Questions: </span>{item?.right?.complex}</div>
        </>
        }
      </div>
      <div className={classes.name}>Left Brain</div>
      <div style={{padding: '10px 30px'}}>
        <div><span className={classes.name}>Brain Time: </span>{item?.left?.totalTime}</div>
        {!item?.left?.isOwn &&
        <>
          <div><span className={classes.name}>The Beginner Questions: </span>{item?.left?.beginner}</div>
          <div><span className={classes.name}>The Intermediate Questions: </span>{item?.left?.intermediate}</div>
          <div><span className={classes.name}>The Advanced Questions: </span>{item?.left?.advanced}</div>
          <div><span className={classes.name}>The High Questions: </span>{item?.left?.high}</div>
          <div><span className={classes.name}>The Very High Questions: </span>{item?.left?.veryHigh}</div>
          <div><span className={classes.name}>The Complex Questions: </span>{item?.left?.complex}</div>
        </>
        }
      </div>
    </>
  )
}
const ImproveBoard = (props) => {
  const classes = useStyles();
  const { item } = props;
  const [rTopics, setRTopics] = useState([])
  const [lTopics, setLTopics] = useState([])

  useEffect(() => {
    console.log(item)
    const _topics = item?.topics?.items || [];
    const _rTopics = _topics.filter((topic) => topic.brain === "right");
    setRTopics(_rTopics);
    const _lTopics = _topics.filter((topic) => topic.brain === "left");
    setLTopics(_lTopics);
  }, [item]);
  return (
    <>
      <div><span className={classes.name}>Total Time: </span>{Math.ceil(item?.totalTime / 60)} min</div>
      <div className={classes.name}>Left Topic</div>
      <div style={{padding: '10px 30px'}}>
        {lTopics.map((topic, index) => (
          <div key={index}>
            <span className={classes.name}>{topic?.topic?.name}, </span>
            <span className={classes.name}>question: </span><span>{topic.number}, </span>
            <span className={classes.name}>complexity: </span><span>{topic.complexity}, </span>
            <span className={classes.name}>min: </span><span>{topic.min}, </span>
            <span className={classes.name}>avg: </span><span>{topic.avg}, </span>
            <span className={classes.name}>max: </span><span>{topic.max}</span>
          </div>
        ))}
      </div>
      <div className={classes.name}>Right Topic</div>
      <div style={{padding: '10px 30px'}}>
        {rTopics.map((topic, index) => (
          <div key={index}>
            <span className={classes.name}>{topic?.topic?.name}, </span>
            <span className={classes.name}>question: </span><span>{topic.number}, </span>
            <span className={classes.name}>complexity: </span><span>{topic.complexity}, </span>
            <span className={classes.name}>min: </span><span>{topic.min}, </span>
            <span className={classes.name}>avg: </span><span>{topic.avg}, </span>
            <span className={classes.name}>max: </span><span>{topic.max}</span>
          </div>
        ))}
      </div>
      <div className={classes.name}>Personality</div>
      <div style={{ padding: '10px 30px' }}>
        {item?.personalities?.items?.map((personality, index) => (
          <div key={index}>
            <span className={classes.name}>{personality?.name}, </span>
            <span className={classes.name}>max: </span><span>{personality?.max}, </span>
            <span className={classes.name}>min: </span><span>{ personality?.min }</span>
          </div>
        ))}
      </div>
      <div className={classes.name}>Attribute</div>
      <div style={{ padding: '10px 30px' }}>
        {item?.attributes?.items?.map((attribute, index) => (
          <div key={index}><span className={classes.name}>{attribute?.name}: </span><span>{ attribute.value }</span></div>
        ))}
      </div>
    </>
  )
}
const Template = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const history = useHistory()
  const [setting] = useSetting()
  const classes = useStyles()
  const {item, type} = props
  const [modalActive, setModalActive] = useState(false)
  const [train, setTrain] = useState({})
  const [exam, setExam] = useState({})
  const [asyncState, setAsyncState] = useState('')

  const handleClose = () => {
    setModalActive(false)
  }
  const handleStart = () => {
    if (isEmptyObject(train)) {
      if (type === 'normal')
        run(getExams(item.id))
      else if (type === 'improve')
        run(getExamsWithImprove(item.id))
      setAsyncState('getExams')
    }
    else if (train?.examResultID === '' && train?.examID !== '') {
      history.push(`/exam/${train?.examID}`)
    }
    else {
      if (train.examIndex > setting?.auth?.profile?.train) {
        NotificationManager.warning('Your train is reached limit number for this template', 'Worning', 3000);
      }
      else {
        run(removeExam(train.id))
        setAsyncState('removeExam')
      }
    }
  }
  const handleViewResult = () => {
    setModalActive(false)
    if (isEmptyObject(train)) {
      NotificationManager.warning('You do not have train result.', 'Worning', 3000);
    }
    else {
      history.push(`/train/result/${train.id}`)
    }
  }

  useEffect(() => {
    if (setting?.auth) {
      run(getTrain({userID: {eq: setting?.auth?.id}, templateID: {eq: item.id}}))
      setAsyncState('getTrain')
    }
  }, [setting.auth, item])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getTrain') {
        if (data.length !== 0) {
          setTrain(data[0])
        }
        setAsyncState('')
      }
      else if (asyncState === 'getExams') {
        console.log(data)
        const res = data?.result
        if (res?.rights?.length === 0 || res?.lefts?.length === 0) {
          NotificationManager.warning('Question number is not enough', 'Worning', 3000);
          setAsyncState('')
        }
        else {
          let tmp = {}
          tmp.right = res?.rights
          tmp.left = res?.lefts
          tmp.isTrain = true
          tmp.name = item.name
          tmp.totalTime =  item.totalTime
          tmp.rightBrainTime = Math.ceil(item.totalTime/2)
          tmp.leftBrainTime = item.totalTime - tmp.rightBrainTime
          tmp.method = 'SEPARATE'
          tmp.type = 'OPEN'
          tmp.isRandom = false
          tmp.displayType = 'SEQUENTIAL'
          tmp.activate = true
          tmp.camera = false
          tmp.cameraNumber = 0
          tmp.screen = false
          tmp.screenNumber = 0
          tmp.openingID = ''
          tmp.templateType = type
          if (type === 'normal')
            tmp.templateID = item.id
          else if (type === 'improve')
            tmp.improveTemplateID = item.id;
          run(createExam(tmp))
          setAsyncState('createExam')
        }
      }
      else if (asyncState === 'createExam') {
        setExam(data)
        let tmp = {}
        if (!isEmptyObject(train)) {
          tmp.id = train?.id
          tmp.examIndex = train.examIndex + 1
          tmp.examID = data.id
          tmp.examResultID = ''
          tmp.resultShowIndex = 1
          run(updateTrain(tmp))
        }
        else {
          tmp.userID = setting?.auth?.id
          tmp.templateID = item.id
          tmp.examIndex = 1
          tmp.examID = data.id
          tmp.examResultID = ''
          tmp.resultShowIndex = 1
          run(createTrain(tmp))
        }
        setAsyncState('createTrain')
      }
      else if (asyncState === 'createTrain') {
        if (data.message === 'success') {
          setAsyncState('')
          history.push(`/exam/${exam.id}`)
        }
      }
      else if (asyncState === 'removeExam') {
        if (type === 'normal')
          run(getExams(item.id))
        else if (type === 'improve')
          run(getExamsWithImprove(item.id))
        setAsyncState('getExams')
      }
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.icon}>
          <Description style={{fontSize: 50}} />
        </div>
        <div className={classes.title}>{item?.name}</div>
      </div>
      <Grid container>
        <Grid item xs={6} className={`${classes.select} ${classes.leftBorder}`} onClick={() => setModalActive(true)}>
          View
        </Grid>
        <Grid item xs={6} className={`${classes.select} ${classes.rightBorder}`} onClick={handleStart}>
          Start
        </Grid>
      </Grid>
      <Dialog 
        open={modalActive} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle id="form-dialog-title">{item?.name}</DialogTitle>
        <DialogContent style={{padding: '30px 50px', maxHeight: 450}}>
          {type==='normal' && (item?.isSimple?
          <SimpleBoard item={item} />:
          <Board item={item} />
          )}
          {type === 'improve' &&
          <ImproveBoard item={item} />
          }
        </DialogContent>
        <DialogActions>
          <button className={`${classes.button} ${classes.cancel}`} onClick={handleViewResult}>
            view result
          </button>
          <button className={classes.button} onClick={handleClose}>
            Ok
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default Template