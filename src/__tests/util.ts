// tslint:disable:no-let no-expression-statement
import { Store } from 'redux'

// Subscribe to the store and resolve a promise when the state matches a given predicate.
// Reject if the state doesn't meet that predicate before a given timeout.
// Unsubscribe from the store in either case
export function whenState<State>(store: Store<State>, predicate: (state: State) => boolean, timeoutMillis: number = 1000): Promise<State> {
  let timeout: any
  let unsubscribed: boolean = false
  let resolve: (state: State) => void
  let reject: (error: any) => void

  const promise = new Promise<State>((res, rej) => {
    resolve = res
    reject = rej
  })

  const unsubscribe = store.subscribe(() => {
    const state = store.getState()
    if (predicate(state)) {
      clearTimeout(timeout)

      if (!unsubscribed) {
        unsubscribe()
        unsubscribed = true
      }

      resolve(state)
    }
  })

  timeout = setTimeout(() => {
    if (!unsubscribed) {
      unsubscribe()
      unsubscribed = true
    }

    reject('timeout')
  }, timeoutMillis)

  return promise
}
