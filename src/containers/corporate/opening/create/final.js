import React, {useState} from 'react'
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import Widget from '../../../../components/widget'
import {useStyles} from '../../../style/common'

const useCustomStyles = makeStyles((theme) => ({
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 17,
  },
  description: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 20,
  }
}))
const Final = (props) => {
  const {opening} = props
  const history = useHistory()
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  const [modalActive, setModalActive] = useState(false)

  const handleClose = () => {
    setModalActive(false)
  }
  const handleAccept = () => {
    setModalActive(false)
    history.push(`/corporate/exam/create/${opening.id}`)
  }

  return (
    <Widget
      title=""
      description={
        <span>
          Final
        </span>
      }>
      <Grid container>
        <Grid item lg={7} md={10} xs={12}>
          <Grid container spacing={2} style={{padding: '50px 10px'}}>
            <Grid item md={5} xs={12} className={customeClasses.image} >
              <img alt="" src={`${process.env.PUBLIC_URL}/images/corporate/image_1.png`} style={{width: 250}} />
            </Grid>
            <Grid item md={7} xs={12}>
              <div className={customeClasses.title}>Congratulations!</div>
              <div className={customeClasses.description}>Your opening has been created.</div>
              <button className={classes.button} onClick={() => setModalActive(true)}>Create Your First Exam</button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={modalActive} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle id="form-dialog-title" style={{paddingTop: 30}}>Create Exam</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          </DialogContentText>
          <button className={classes.button} onClick={handleAccept} color="primary" style={{marginBottom: 30}}>
            Accept <span>&#38;</span> Proceed
          </button>
        </DialogContent>
      </Dialog>
    </Widget>
  )
}
export default Final
