import produce from 'immer'
import { ActionTypes } from './actions'

export interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: ICycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (state) => {
        state.cycles.push(action.payload.newCycle)
        state.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (state) => {
        state.cycles[currentCycleIndex].finishedDate = new Date()
        state.activeCycleId = null
      })
    }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (state) => {
        state.cycles[currentCycleIndex].interruptedDate = new Date()
        state.activeCycleId = null
      })
    }
    default:
      return state
  }
}
