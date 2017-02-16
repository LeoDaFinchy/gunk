'use strict'

require('babel-polyfill')

import '../stylesheets/index.sass'
import './utils/colour_console'

import App from './App'
import Room, {randomWeighted} from './Room'

function ready () {
  try {
    window.onload = main
    console.log('Window found, deferring execution')
  } catch (e) {
    console.log('No window, cannot execute')
    const tester = randomWeighted([
      {value: 0, weight: 7},
      {value: 1, weight: 2},
      {value: 2, weight: 1},
    ])

    const counter = () => {
      const counts = {}
      return val => {
        counts[val] = counts[val] ? counts[val] + 1 : 1
        return counts
      }
    }

    for (let y = 0; y < 20; y += 1) {
      const count = counter()
      for (let x = 0; x < 10000; x += 1) {
        count(tester())
      }
      console.log(count(tester()))
    }
  }
}

ready()

function main () {
  const room1 = new Room()
  room1.spawnNeighbour()

  const app = new App({
    currentRoom: room1,
  })

  app.cycle()
}

export const lazyAttribute = (obj, propName, source) => Object.defineProperty(obj, propName, {
  get: () => {
    const val = source()
    Object.defineProperty(obj, propName, {
      value: val,
    })
    return val
  },
  enumerable: true,
  configurable: true,
})
