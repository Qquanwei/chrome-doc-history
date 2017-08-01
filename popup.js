import { run } from '@cycle/run'
import { makeDOMDriver, div } from '@cycle/dom'
import xs from 'xstream'
import { getLocal, save} from './utils.js'

function main () {
  const sinks$ = getLocal()
  sinks$.map(() => {
    console.log('render')
  })
  return {
    DOM: sinks$
      .startWith([])
      .map(() => {
        return div(['why not click me'])
      })
  }
}

run(main, {
  DOM: makeDOMDriver('#app')
})

console.log('startup')
