---
theme: normal
title: Beginning
---

0001 - Beginning
=

---
<div id='view'></div>
<div id='actions'></div>
<script type="text/javascript" src="{{ '/assets/0001/app.js' | relative_url }}">
</script>
<link rel='stylesheet' href="{{ '/assets/0001/app.css' | relative_url }}"/>
---

So here we are. Version 0001. Simple, as promised. A simple world, made of three connected coloured rooms. Not much to do right now, but that was expected. I've had to assemble a main loop, handle input and output, and create a data model.

The temptation to start refining and optimising and preparing for the future has been strong. I wasted some time earlier trying to make `App.cycle` a lot more flexible than it's current state - to allow dynamic assembly of the core loop. I abandoned that as it was taking too much energy to achieve very little immediate benefit.

Rooms
-
Rooms are the building block of the current world, and have been kept simple. Each room has a list of `neighbours` to link them together, and so that the player has some way of distinguishing them, they each have a `colour`.

App
-
The `App` controls everything that goes on. In terms of data, it has a list of actions to take, and the current room. It also handles the rendering of state and inputs.

Actions 
-
The actions are interesting. I'm following a very basic expression of the [Flux](https://facebook.github.io/flux/) pattern. Every time something happens that will change state, it is queued up to happen on the next cycle. This keeps state unchanged while any decisions are made, removing one possible source of complexity and errors.

Rendering
-
The current renderer is very simple. It takes the current room and its list of neighbours, and prints out a short description and as many buttons as needed. It doesn't keep state of its own, so the what's shown is what's in the world. I hope to keep any rendering as stateless as possible, again to reduce the possibility of bugs.

Forward
-
I have a very basic engine set up, and from here I could build a vast world of exotically coloured rooms. I think my next step will be to improve the variety of rooms, and flesh out the descriptions. We'll see where we get for 0002...
