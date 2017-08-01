import xs from 'xstream'

const HOST_KEY = 'HOST_KEY'

export const save = function (prop) {
}
export const getLocal = function (cb) {
  return fromListener(chrome.storage.onChanged.bind(chrome.storage))
    .map(() => )
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
