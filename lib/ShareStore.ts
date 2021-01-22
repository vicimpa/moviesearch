import { useEffect, useState, StateUpdater } from "preact/compat";

interface IState {
  [key: string]: any
}

export function createShareStore<T = any>(initialState?: T) {
  let state = initialState
  let extend = null
  let initial = true

  let listeners: StateUpdater<T>[] = []

  function getNew(newState: T): T {
    if(extend)
      return Object.assign(state, newState)
    else
      return newState
  }

  function getState(): Readonly<T> {
    return state
  }

  function setState(newState: T) {
    if(initial) {
      initial = false

      extend = newState && 
        typeof newState == 'object' 
          && !Array.isArray(newState)
    }

    state = getNew(newState)

    for(let dispatcher of listeners)
      dispatcher(state)
  }

  function useSharedState(newState?: T): [T, typeof setState] {
    let [state, dispatcher] = useState(newState)
    
    useEffect(() => {
      if(typeof newState !== 'undefined')
        setState(newState)
    }, [])

    useEffect(() => {
      listeners.push(dispatcher)
      
      return () => {
        let index = listeners.indexOf(dispatcher)

        if(index !== -1)
          listeners.splice(index, 1)
      }
    }, [])


    return [state, setState]
  }

  setState(initialState)

  return  {useState: useSharedState, get: getState, set: setState}
}