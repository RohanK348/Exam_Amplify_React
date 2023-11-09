import React, {useEffect, useState} from 'react'

let startDate = new Date()
startDate.setDate(startDate.getDate() + 30)

const ComingSoon = () => {
  const calculateTimeLeft = () => {
    const difference = startDate - new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
  })

  const timerComponents = []

  Object.keys(timeLeft).forEach(interval => {
    timerComponents.push(
      <div className="w-1/4">
        <div className="flex flex-col items-center justify-center space-x-2">
          <div className="text-2xl">{timeLeft[interval]}</div>
          <div className="text-sm text-grey-500">{interval}</div>
        </div>
      </div>
    )
  })

  return (
    <div className="flex flex-row w-full mb-4">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  )
}

export default ComingSoon
