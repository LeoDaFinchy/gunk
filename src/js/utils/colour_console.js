"use strict";

const esc = "\u001B"

const aRst = `${esc}[0m`;

const aWht = `${esc}[30m`;
const aRed = `${esc}[31m`;
const aGrn = `${esc}[32m`;
const aYlo = `${esc}[33m`;
const aBlu = `${esc}[34m`;
const aPpl = `${esc}[35m`;
const aCyn = `${esc}[36m`;
const aGry = `${esc}[37m`;
const aPnk = `${esc}[38;5;163m`;

const fillRing = "\u25C9";
const ring = "\u25CB";
const dashRing = "\u25CC";
const stripeRing = "\u25CD";
const targetRing = "\u25CE";
const spot = "\u25CF";
const tick = "\u2714";
const cross = "\u2718";

try{
    if(window){
        defineColoursForBrowser();
        console.log('ding!');
    }
} catch (e) {
    defineColoursForTerminal();
}

function defineColoursForBrowser(){
    const sharedStyle = [
        "background-color: black",
        "font-size: 20px",
        "padding: 0px 5px",
        "line-height: 1em",
    ].join('; ');
    console.wht = function(...args){ this.log(`%c\u25C9`, `color: white; ${sharedStyle}`, ...args); return this}.bind(console);
    console.red = function(...args){ this.log(`%c\u25C9`, `color: red; ${sharedStyle}`, ...args); return this}.bind(console);
    console.grn = function(...args){ this.log(`%c\u25C9`, `color: green; ${sharedStyle}`, ...args); return this}.bind(console);
    console.ylo = function(...args){ this.log(`%c\u25C9`, `color: yellow; ${sharedStyle}`, ...args); return this}.bind(console);
    console.blu = function(...args){ this.log(`%c\u25C9`, `color: blue; ${sharedStyle}`, ...args); return this}.bind(console);
    console.ppl = function(...args){ this.log(`%c\u25C9`, `color: purple; ${sharedStyle}`, ...args); return this}.bind(console);
    console.cyn = function(...args){ this.log(`%c\u25C9`, `color: cyan; ${sharedStyle}`, ...args); return this}.bind(console);
    console.gry = function(...args){ this.log(`%c\u25C9`, `color: grey; ${sharedStyle}`, ...args); return this}.bind(console);
    console.pnk = function(...args){ this.log(`%c\u25C9`, `color: pink; ${sharedStyle}`, ...args); return this}.bind(console);
}

function defineColoursForTerminal(){
    console.wht = function(...args){ this.log(aWht, ...args, aRst); return this}.bind(console);
    console.red = function(...args){ this.log(aRed, ...args, aRst); return this}.bind(console);
    console.grn = function(...args){ this.log(aGrn, ...args, aRst); return this}.bind(console);
    console.ylo = function(...args){ this.log(aYlo, ...args, aRst); return this}.bind(console);
    console.blu = function(...args){ this.log(aBlu, ...args, aRst); return this}.bind(console);
    console.ppl = function(...args){ this.log(aPpl, ...args, aRst); return this}.bind(console);
    console.cyn = function(...args){ this.log(aCyn, ...args, aRst); return this}.bind(console);
    console.gry = function(...args){ this.log(aGry, ...args, aRst); return this}.bind(console);
    console.pnk = function(...args){ this.log(aPnk, ...args, aRst); return this}.bind(console);
}

console.aRst = function(){ return aRst; };

console.aWht = function(){ return aWht; };
console.aRed = function(){ return aRed; };
console.aGrn = function(){ return aGrn; };
console.aYlo = function(){ return aYlo; };
console.aBlu = function(){ return aBlu; };
console.aPpl = function(){ return aPpl; };
console.aCyn = function(){ return aCyn; };
console.aGry = function(){ return aGry; };

console.fillRing = function(){ return fillRing; };
console.ring = function(){ return ring; };
console.dashRing = function(){ return dashRing; };
console.stripeRing = function(){ return stripeRing; };
console.targetRing = function(){ return targetRing; };
console.spot = function(){ return spot; };
console.tick = function(){ return tick; };
console.cross = function(){ return cross; };

console.test = function(test, ...args){
    if(test){
        this.grn(tick, ...args);
        return true;
    } else {
        this.red(cross, ...args);
        return false;
    }
}.bind(console);

console.open = function(...args){
    this.blu(ring, ...args);
}.bind(console);
console.close = function(...args){
    this.ylo(spot, ...args);
}.bind(console);