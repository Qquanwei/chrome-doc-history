import fromEvent from 'xstream/extra/fromEvent'
import debounce from 'xstream/extra/debounce'
import { save } from './utils.js'

window.addEventListener('load', function () {
  // debounce 100ms
  const position$ = fromEvent(window, 'scroll')
         .compose(debounce(100))
         .map(() => {
           return document.scrollingElement.scrollTop
         })
})
