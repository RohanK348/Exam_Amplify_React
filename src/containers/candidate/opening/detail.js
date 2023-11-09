import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {Star} from '@material-ui/icons'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import {get as getOpening} from '../../../api/opening'
import {getFilter as getFavorites, add as addFavorite, remove as removeFavorite} from '../../../api/favoriteOpening'
import {useAsync} from '../../../functions/utils'
import {useSetting} from '../../../provider/setting'
import Exam from './exam'

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

const OpeningDetail = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const {id} = useParams()
  const [setting] = useSetting()
  const [opening, setOpening] = useState({})
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
    run(getOpening(id))
    setAsyncState('getOpening')
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getOpening') {
        setOpening(data)
        run(getFavorites({userID: {eq: setting?.auth?.id}, openingID: {eq: id}}))
        setAsyncState('getFavorites')
      }
      else if (asyncState === 'getFavorites') {
        if (data.length === 0)
          setFavorite(false)
        else
          setFavorite(true)
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
      <SectionTitle title="Detail" subtitle="Opening Detail" />
      <Widget
        title=""
        description={
          <span>
            {opening?.title}
          </span>
        }>
        <div style={{width: '100%', paddingBottom: 20}}>
          {opening?.description&&
          <SunEditor
            defaultValue={opening?.description}
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
      </Widget>
      <Exam id={id} opening={opening} />
    </>
  )
}
export default OpeningDetail
