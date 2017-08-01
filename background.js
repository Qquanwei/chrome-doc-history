import xs from 'xstream'
import delay from 'xstream/extra/delay'

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
  return xs.create({
    start: listener => {
      this.listener = listener

      chrome.storage.onChange.addListener(function (changes, namespace) {
        debug('chages->', changes)
        listener.next({changes, namespace})
      })
    },
    stop: () => {
      chrome.storage.onChange.removeListener(this.listener)
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
