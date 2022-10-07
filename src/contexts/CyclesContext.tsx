import { createContext, ReactNode, useState } from 'react'

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface ICreateCycleData {
  task: string
  minutesAmount: number
}

interface ICyclesContextData {
  cycles: ICycle[]
  activeCycle: ICycle | undefined
  activeCycleId: string | null
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
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    setCycles((state) => {
      return state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            finishedDate: new Date(),
          }
        }

        return cycle
      })
    })
    setActiveCycleId(null)
  }

  function createNewCycle({ task, minutesAmount }: ICreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: ICycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    }

    setCycles([...cycles, newCycle])
    setActiveCycleId(id)
  }

  function interruptCurrentCycle() {
    const updatedCycle = cycles.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return {
          ...cycle,
          interruptedDate: new Date(),
        }
      }

      return cycle
    })

    setCycles(updatedCycle)
    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        cycles,
        markCurrentCycleAsFinished,
        activeCycleId,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
