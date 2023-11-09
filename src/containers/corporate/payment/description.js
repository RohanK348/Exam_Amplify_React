import React, { useEffect, useState } from 'react'

import {useAsync} from '../../../functions/utils'
import {getAll as getSetting} from '../../../api/settingPrice'
const Description = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting, setSetting] = useState({})

  useEffect(() => {
    run(getSetting())
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      if (data.length !== 0) {
        setSetting(data[0])
      } 
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="text-lg">Our Pricing, your terms</div>
      <div className="text-sm text-grey-500 mt-4">{setting?.corporateDescription}</div>
    </div>
  )
}
export default Description
