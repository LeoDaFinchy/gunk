'use strict'

require('babel-polyfill')

import '../stylesheets/index.sass'
import './utils/colour_console'

import App from './App'
import {RoomFactory} from './Room'
import Actions, {playerActivities} from './Action'

function ready () {
  try {
    window.onload = main
    console.log('Window found, deferring execution')
  } catch (e) {
    console.log('No window, cannot execute')
  }
}

ready()

function main () {
  const starterRoom = RoomFactory()

  const room1 = starterRoom()
  const room2 = starterRoom()

  room1.neighbours.push(room2)
  room2.neighbours.push(room1)

  const app = new App({
    currentRoom: room1,
    playerActivity: playerActivities.standingInRoom,
  })

  app.actionSet = new Actions(app)

  app.cycle()
}
