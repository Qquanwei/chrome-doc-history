import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import xs from 'xstream'

function main () {
  return {
  }
}

run(main, {
  DOM: makeDOMDriver('#app')
})
