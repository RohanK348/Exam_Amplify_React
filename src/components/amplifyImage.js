import React, {useEffect, useState} from 'react'
import {getUrl} from '../api/file'
import {useAsync} from '../functions/utils'

const AmplifyImage = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {imageKey, ...rest} = props
  const [src, setSrc] = useState('')

  useEffect(() => {
    if (imageKey !== '' && imageKey)
      run(getUrl(imageKey))
  }, [run, imageKey])
  useEffect(() => {
    if (status === 'resolved') {
      setSrc(data)
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status, data])
  return (
    <>
    {imageKey !== '' &&
      <img src={src} alt="" {...rest}/>
    }
    </>
  )
}
export default AmplifyImage
