import React, {useState, useEffect} from 'react'
import {
  Grid,
} from '@material-ui/core'

import {useAsync} from '../../../../../functions/utils'
import Widget from '../../../../../components/widget'
import AmplifyImage from '../../../../../components/amplifyImage'
import {getByPaginationFilter as getScreens} from '../../../../../api/screen'

const Image = (props) => {
  const {imageKey} = props

  return (
    <>
        <AmplifyImage imageKey={imageKey} />
    </>
  )
}

const Screen = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  // const classes = useStyles()
  const {examResult} = props
  const [screens, setScreens] = useState([])
  const [cameras, setCameras] = useState([])
  const [from , setFrom] = useState(0)
  const [limit, setLimit] = useState(10)

  // const loadMore = () => {
  //   run(getScreens({examResultID: {eq: examResult?.id}}, limit, from))
  //   setFrom(from+limit)
  // }

  useEffect(() => {
    if (examResult?.id) {
      setScreens([])
      setCameras([])
      setFrom(limit)
      run(getScreens({examResultID: {eq: examResult?.id}}, limit, 0))
    }
  }, [run, examResult])
  useEffect(() => {
    if (status === 'resolved') {
      let tmp = data.filter((item) => item.type === 'screen')
      setScreens([...screens, ...tmp])
      tmp = data.filter((item) => item.type === 'camera')
      setCameras([...cameras, ...tmp])
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])
  return (
    <Widget
      title="Screen"
      description={
        <span>
          Here are Screen
        </span>
      }>
      <div className="p-3 text-base">Browser Screens</div>
      <Grid container spacing={3}>
        {screens.map((screen) => (
          <Grid key={screen?.id} item lg={3} md={4} sm={6} xs={12}>
            <Image imageKey={screen?.image} />
          </Grid>
        ))}
      </Grid>
      <div className="p-3 text-base">Camera Screens</div>
      <Grid container spacing={3}>
        {cameras.map((screen) => (
          <Grid key={screen?.id} item lg={3} md={4} sm={6} xs={12}>
            <Image imageKey={screen?.image} />
          </Grid>
        ))}
      </Grid>
    </Widget>
  )
}
export default Screen
