0002 - Generation
=
This time, I've made implemented simple Procedural Generation. Key to this is the function `lazyAttribute`, currently in `main.js`. Using this, I can specify a property on a class (such as `Room`) and have it remain uninitialized until I try to read it.

`lazyAttribute`
-
In using this function, the object supplied is 'primed' with a procedure for generating the actual value. When called, this value is returned. If I left it at that, however, a different value could be returned each time. The obvious solution is to store the first returned value, and if it is found, return it again. The downside to this is that we'd be checking if it's there every time. That would be made more complicated if the final value is `undefined` or `null` (though really, I shouldn't be 'defining' *anything* as `undefined`). As such, I simply replace the function completely.

This way, once the value has been initialized, it has no more overhead than if it was a value all along. We don't need to check if the value has been initialized, and in fact we can't, because any check we would have had has been replaced. This process is invisible to the outside - it looks like a property before, it looks like one after.

Certainties
-
The tricky thing about my current implentation is that I call `lazyAttribute` in the constructor, which makes it complex to link Rooms together.

When you visit a `Room`, we display the `neighbours`, including their respective `colour`s. This means the neighbouring Rooms have to already exist, and we initialise their colours as we read them. We also, however, have to link each of those Rooms to the current Room. If `neighbours` already exists (which it must to hold a Room) we can't use a `lazyAttribute` to add new neighbours. The solution at the moment is to supply the current Room to each neighbour in its constructor, and from there to the generator function. This way, when `neighbours` is finally accessed - when we move to that Room - we can add our old Room to the neighbours, creating a way back.

World
-
As I am now generating each Room's neighbours, the explorable world has expanded. The neighbour generating function can create 0-2 extra neighbours. I use a very simple method at the moment. `Math.random()` creates a random number, 0-1, on a linear distribution. Multiply by 2.5, then discard the fraction, and the result is that '2 rooms' is half as likely as '1 room' or '0 rooms'.

A neighbour with 1 extra neighbour is a corridor. You can go back to the previous room or proceed to the new one. 0 extra neighbours means a dead end - the only neighbour is the previous room. 2 extra neighbours expands the options - it branches the map.

Making it more likely to get 0 (reducing the choices) than 2 (increasing the choices) means that the number of options will gradually reduce to 0, which means the world is more likely than not to have an end. If it was more likely to get 2, or more, the world would likely be endless. This isn't be a problem with `lazyAttribute`, as we'd only generate what the player visits.

Going forward
-
I've got loads of ideas for the future, as usual. This project has focused me, though. I have plans for versions 0003 through 0006 - 4 features. Each one will be a new version. I'm not going to decide now which to tackle next. We'll see.

Next time!
