import React from 'react'
import {
  Grid,
} from '@material-ui/core'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import Widget from '../../../../components/widget'

const useStyles = makeStyles((theme) => ({
  result: {
    fontSize: 150,
    fontWeight: 'bold',
    fontFamily: 'cursive',
    color: 'green',
    textAlign: 'center',
  },
  root: {
    minHeight: 700,
  },
  goto: {
    fontSize: 18,
    color: 'gray',
  }
}))
const Result = (props) => {
  const {result} = props
  const classes = useStyles()

  return (
    <Widget
      title=""
      description={
        <span>
          Train Result
        </span>
      }>
      <Grid className={classes.root} container spacing={3} justify="center" alignItems="center">
        <div style={{width: 400}}>
          <div className={classes.result}>{result?result.toFixed(1):'0'}</div>
          <Link className={classes.goto} to={`/dashboard`}>
            dashboard
          </Link>
        </div>
      </Grid>
    </Widget>
  )
}
export default Result
