import React, { useEffect, useState } from 'react'

import {getServerTime} from '../../api/commonApi'
import {useAsync} from '../../functions/utils'
import {useSetting} from '../../provider/setting'
import {formatYmd, N2SW0} from '../../functions/string'

const Time = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [, dispatch] = useSetting()
  const [time, setTime] = useState('')

  useEffect(() => {
    run(getServerTime())
    const interval = setInterval(function () {
      run(getServerTime())
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      const tmp = data?.data?.body?.serverTime
      if (tmp) {
        const serverTime = new Date(tmp)
        dispatch({type: 'SET', settingName: 'serverTime', settingData: serverTime})
        let time = `${formatYmd(serverTime)} ${N2SW0(serverTime.getHours())}:${N2SW0(serverTime.getMinutes())}`
        setTime(time)
      }
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])
  return (
    <div className="hidden lg:flex relative" style={{paddingRight: 30, color: 'gray', fontSize: 16,}}>
      {time}
    </div>
  )
}

export default Time
