import React, {useState} from 'react'
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core'
import {Description} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

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
  },
  name: {
    fontWeight: 'bold',
  },
  description: {

  }
}))
const Template = (props) => {
  const classes = useStyles()
  const {item, activate, changeSelect} = props
  const [modalActive, setModalActive] = useState(false)

  const handleClose = () => {
    setModalActive(false)
  }
  const handleSelect = () => {
    changeSelect(item)
    setModalActive(false)
  }

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
        {activate?
        <Grid item xs={6} className={`${classes.select} ${classes.rightBorder} ${classes.active}`} onClick={handleSelect}>
          Select
        </Grid>:
        <Grid item xs={6} className={`${classes.select} ${classes.rightBorder}`} onClick={handleSelect}>
          Select
        </Grid>
        }
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
          <div><span className={classes.name}>Total Time: </span>{item?.totalTime}</div>
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
          ))}
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
        </DialogContent>
        <DialogActions>
          <button className={`${classes.button} ${classes.cancel}`} onClick={handleClose} color="primary">
            Cancel
          </button>
          <button className={classes.button} onClick={handleSelect} color="primary">
            Select
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default Template