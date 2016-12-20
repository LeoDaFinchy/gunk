"use strict";

import '../stylesheets/index.sass';
import './utils/colour_console';
import _ from 'lodash';

function ready(){
  try{
    window.onload = main;
    console.log("Window found, deferring execution");
  } catch ( e ) {
    console.log("No window, executing immediately");
    main();
  }
}

ready();

function main(){
  console.log("MAIN")
}
