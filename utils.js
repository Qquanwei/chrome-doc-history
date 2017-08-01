import xs from 'xstream'

const HOST_KEY = 'HOST_KEY'

export const save = function (prop) {
  return xs.fromPromise(wrapCallback(chrome.storage.set.bind(chrome.storage)({HOST_KEY: prop})))
}
export const getLocal = function (cb) {
  return fromListener(chrome.storage.onChanged.bind(chrome.storage))
    .map(() => xs.fromPromise(wrapCallback(chrome.storage.get)()))
    .flattenSequentially()
}
export const wrapCallback = function (s) {
  return function (...args) {
    return new Promise(function (resolve) {
      s(...args, function (...argss) {
        resolve(...argss)
      })
    })
  }
}
export const fromListener = function (s) {
  return (function () {
    return xs.create({
      start: function (listener) {
        this.handler = (...args) => listener.next(...args)
        s.addListener(this.handler)
      },
      stop: function () {
        s.removeListener(this.handler)
      }
    })
  })()
}
