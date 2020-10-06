/*
  Returns a promise that resolves when a script has loaded and some test passes.
  Notably, this does not timeout or insert the script into the page for you.
*/

// tslint:disable:no-expression-statement no-let
import { forEach } from 'lodash'

export default function scriptLoaded(src: string, test: () => boolean): Promise<void> {
  if (test()) return Promise.resolve()

  let resolve: () => any
  let reject: (error: any) => any

  const selector = `script[src="${src}"]`
  const maybeScript = document.querySelector(selector) as HTMLScriptElement

  function onLoad(): void {
    if (test()) {
      resolve()
    } else {
      reject(new Error(`test failed after ${selector} loaded`))
    }
  }

  if (maybeScript) {
    maybeScript.addEventListener('load', onLoad)
  } else {
    const observer = new MutationObserver(mutationsList => {
      forEach(mutationsList, (mutation: MutationRecord) => {
        mutation.addedNodes.forEach((addedNode: any) => {
          if (addedNode.tagName === 'SCRIPT' && addedNode.src === src) {
            observer.disconnect()
            addedNode.addEventListener('load', onLoad)
          }
        })
      })
    })

    observer.observe(document.head, { childList: true })
  }

  return new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
}
