"use strict";

require("babel-polyfill");

import '../stylesheets/index.sass';
import './utils/colour_console';
import _ from 'lodash';

import App from './App'
import Room from './Room'

function ready(){
  try{
    window.onload = main;
    console.log("Window found, deferring execution");
  } catch ( e ) {
    console.log("No window, cannot execute");
    // main();
  }
}

ready();

function main(){
  const room1 = new Room('blue')
  const room2 = new Room('red')
  const room3 = new Room('green')
  Room.connectRooms(room1, room2)
  Room.connectRooms(room1, room3)

  const app = new App({
    currentRoom: room1
  })

  app.cycle()
}
