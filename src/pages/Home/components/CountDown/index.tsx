import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { CountDownContainer, Separator } from './styles'

export function CountDown() {
  const { activeCycle, markCurrentCycleAsFinished } = useContext(CyclesContext)
  const [secondsAmountPassed, setSecondsAmountPassed] = useState(0)

  useEffect(() => {
    if (activeCycle) {
      const interval = setInterval(() => {
        const difference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (difference >= totalSeconds) {
          markCurrentCycleAsFinished()

          clearInterval(interval)
          setSecondsAmountPassed(totalSeconds)
        } else {
          setSecondsAmountPassed(difference)
        }
      }, 100)

      return () => {
        clearInterval(interval)
        setSecondsAmountPassed(0)
      }
    }
  }, [activeCycle])

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - secondsAmountPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} - Ignite Timer`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [seconds, minutes, activeCycle])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
