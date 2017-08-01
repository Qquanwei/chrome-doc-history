import xs from 'xstream'
import delay from 'xstream/extra/delay'
import debounce from 'xstream/extra/debounce'
import throttle from 'xstream/extra/throttle'

const debug = function (...args) {
  console.log('background:', ...args)
}
const ones$ = xs.periodic(100)
                .compose(delay(100))
                .mapTo(1)
const zeros$ = xs.periodic(100)
                 .mapTo(0)

chrome.runtime.onInstalled.addListener(function () {
})
chrome.runtime.onSuspend.addListener(function () {
})
chrome.tabs.onActivated.addListener(function (activeInfo) {
  console.log(activeInfo)
})


const storage$ = (function () {
  let slistener = null
  return xs.create({
    start: listener => {
      slistener = listener
      chrome.storage.onChanged.addListener(function (changes, namespace) {
        debug('chages->', changes)
        slistener.next({changes, namespace})
      })
    },
    stop: () => {
      chrome.storage.onChanged.removeListener(slistener)
    }
  })
})()

storage$
  .compose(throttle(800))
  .map(() => xs.merge(ones$, zeros$))
  .endWhen(storage$.compose(debounce(800)))
  .subscribe(() => {
    debug('output success')
  })
