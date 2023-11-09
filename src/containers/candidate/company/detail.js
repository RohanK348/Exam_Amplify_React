import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Button,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {Star} from '@material-ui/icons'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import AmplifyImage from '../../../components/amplifyImage'
import {get as getCorporate} from '../../../api/corporate'
import {getFilter as getFavorites, add as addFavorite, remove as removeFavorite} from '../../../api/favoriteCorporate'
import {useAsync} from '../../../functions/utils'
import {useSetting} from '../../../provider/setting'
import Opening from '../opening/index'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  button: {
    textTransform: 'none',
  },
  description: {
    paddingLeft: 30,
  },
  title: {
    fontSize: 20,
    paddingBottom: 20,
  }
}))

const CompanyDetail = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const {id} = useParams()
  const [setting] = useSetting()
  const [corporate, setCorporate] = useState({})
  const [favorite, setFavorite] = useState(false)
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const remove = () => {
    run(removeFavorite(setting.auth.id, id))
    setAsyncState('removeFavorite')
    setPending(true)
  }
  const add = () => {
    run(addFavorite(setting.auth.id, id))
    setAsyncState('addFavorite')
    setPending(true)
  }

  useEffect(() => {
    run(getCorporate(id))
    setAsyncState('getCorporate')
  }, [run, id])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getFavorites') {
        if (data.length === 0)
          setFavorite(false)
        else
          setFavorite(true)
      }
      else if (asyncState === 'getCorporate') {
        setCorporate(data)
        run(getFavorites({userID: {eq: setting?.auth?.id}, corporateID: {eq: id}}))
        setAsyncState('getFavorites')
      }
      else if (asyncState === 'addFavorite') {
        setFavorite(true)
        setAsyncState('')
        setPending(false)
      }
      else if (asyncState === 'removeFavorite') {
        setFavorite(false)
        setAsyncState('')
        setPending(false)
      }
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])
  return (
    <>
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
      <SectionTitle title="Detail" subtitle="Company Detail" />
      <Widget
        title=""
        description={
          <span>
            {corporate?.companyName}
          </span>
        }>
        <Grid container>
          <Grid item xs={1}>
            <AmplifyImage imageKey={corporate?.logo} alt="logo" style={{width: 125}} />
          </Grid>
          <Grid item xs={11} className={classes.description}>
            <div className={classes.title}>{corporate?.companyName}</div>
            <div style={{width: '100%', paddingBottom: 20}}>
              {corporate?.description&&
              <SunEditor
                defaultValue={corporate?.description}
                disable={true}
                hideToolbar
                setDefaultStyle="height: auto"
              />
              }
            </div>
            <div>
              {favorite?
              <Button variant="outlined" onClick={remove} startIcon={<Star style={{color: '#FDD568'}} />}>Remove From Favorites</Button>:
              <Button variant="outlined" onClick={add} startIcon={<Star style={{color: '#FDD568'}} />}>Add Favorite</Button>
              }
            </div>
          </Grid>
        </Grid>
      </Widget>
      <Opening id={id} />
    </>
  )
}
export default CompanyDetail
