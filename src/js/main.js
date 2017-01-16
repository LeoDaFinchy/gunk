'use strict'

require('babel-polyfill')

import '../stylesheets/index.sass'
import './utils/colour_console'

import App from './App'
import Room from './Room'

function ready () {
  try {
    window.onload = main
    console.log('Window found, deferring execution')
  } catch (e) {
    console.log('No window, cannot execute')
    // main();
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
