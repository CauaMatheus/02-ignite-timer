import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { cyclesReducer, ICycle } from '../reducers/cycles/reducer'

interface ICreateCycleData {
  task: string
  minutesAmount: number
}

interface ICyclesContextData {
  cycles: ICycle[]
  activeCycle: ICycle | undefined
  activeCycleId: string | null
  seconds: string
  minutes: string
  markCurrentCycleAsFinished: () => void
  createNewCycle: (cycle: ICreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext<ICyclesContextData>(
  {} as ICyclesContextData,
)

interface ICyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: ICyclesContextProviderProps) {
  const [cycleState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const localData = localStorage.getItem('@ignite-timer:cycleState-1.0.0')

      return localData ? JSON.parse(localData) : undefined
    },
  )

  useEffect(() => {
    const jsonState = JSON.stringify(cycleState)
    localStorage.setItem('@ignite-timer:cycleState-1.0.0', jsonState)
  }, [cycleState])

  const activeCycle = cycleState.cycles.find(
    (cycle) => cycle.id === cycleState.activeCycleId,
  )
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const [secondsAmountPassed, setSecondsAmountPassed] = useState(() => {
    if (activeCycle) {
      const difference = differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate),
      )

      if (difference >= totalSeconds) {
        return totalSeconds
      }

      return difference
    }

    return 0
  })

  useEffect(() => {
    if (activeCycle) {
      const interval = setInterval(() => {
        const difference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (difference >= totalSeconds) {
          markCurrentCycleAsFinished()

          clearInterval(interval)
          setSecondsAmountPassed(totalSeconds)
        } else {
          setSecondsAmountPassed(difference)
        }
      }, 500)

      return () => {
        clearInterval(interval)
      }
    }
  }, [activeCycle, totalSeconds])

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
  }, [activeCycle, seconds, minutes])

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle({ task, minutesAmount }: ICreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: ICycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        cycles: cycleState.cycles,
        markCurrentCycleAsFinished,
        activeCycleId: cycleState.activeCycleId,
        seconds,
        minutes,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
