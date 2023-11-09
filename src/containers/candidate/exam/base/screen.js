import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'

import {useAsync} from '../../../../functions/utils'
import {upload} from '../../../../api/file'
import {create} from '../../../../api/screen'
import {getRandomString} from '../../../../functions/string'

const Screen = forwardRef((props, ref) => {
  const {status, error, run} = useAsync({
    status: 'idle',
  })
  const {examResult, type, imageCapture} = props
  const [fileName, setFileName] = useState('')
  const [asyncState, setAsyncState] = useState('')

  useImperativeHandle(ref, () => ({
    submitScreen() {
      // take first frame only
      console.log('iamge capture', imageCapture)
      imageCapture.grabFrame().then((bitmap) => {
        const canvas = document.getElementById('fake') 
        // this could be a document.createElement('canvas') if you want
        // draw weird image type to canvas so we can get a useful image
        canvas.width = bitmap.width
        canvas.height = bitmap.height
        const context = canvas.getContext('2d')
        context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
        canvas.toBlob(function(blob) {
          const name = `exam_screens_${getRandomString(10)}.png`
          setFileName(name)
          console.log('upload')
          run(upload(blob, name))
          setAsyncState('upload')
        });
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }))
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'upload') {
        console.log('upload success')
        let tmp = {}
        tmp.type = type
        tmp.image = fileName
        tmp.examResultID = examResult?.id
        run(create(tmp))
        setAsyncState('create')
      }
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [run, status])
  return (
    <canvas id="fake" style={{display: 'none'}}></canvas>
  )
})
export default Screen
