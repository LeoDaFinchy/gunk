---
theme: normal
title: Description
---

0003 - Description
=

---
<div id='view'></div>
<div id='actions'></div>
<script type="text/javascript" src="{{ '/assets/0003/app.js' | relative_url }}">
</script>
<link rel='stylesheet' href="{{ '/assets/0003/app.css' | relative_url }}"/>
---

A fairly simple update this time. I've expanded the number of descriptors for a Room, to include `size` and `shape`. These are still strings used directly in a description, but they hide a few new features behind them.

Weight
-
Colour is chosen simply, a completely level random selection. Size and shape are instead weighted, so some values are more common than others. Sticking with my exploration of functional programming, I have a function `randomWeighted` which accepts an array of weight-value objects to return a function that will spit out those values in the proportions given.

To achieve a weighted random selection, a cumulative scale is created, to capture the result of a linear random and make it respect the ratio desired. So for options weighted 2/1/3, the upper bounds on this linear scale are 2, 2+1 = 3, and 2+1+3 = 6. When `Math.random() * 6` gives 4.25, you will receive the third option, as 4.25 is between 3 (2nd value upper bound) and 6 (3rd value upper bound)

This cumulative scale stays the same for as long as the weights themselves do, so it makes sense not to recalculate it every time we want a new value. One approach would be to store this scale as a variable, and pass that to the value function each time. This puts responsibility for keeping the scale in the hands of the person who wants to use the values. An object-oriented approach would be to create a class that holds this scale and provides a function to receive a value, which isn't too bad in simple cases like this. The functional approach is instead to return a function that contains the scale itself, and can be called directly to receive values as needed.

Division of responsibility (the bad)
-
An important aspect of creating a useful, maintainable computer program is grouping related functionality together, and separating these groups from each other as much as possible. The early forms of object oriented design focused on modules that each did one set of things and communicated with each other through restrictive interfaces. This remains an important aspect of software design, despite a large segment of object-oriented thought heading down the path of smaller and smaller pieces. The worst example of this is the ThingDoer, which was avoided for `randomWeighted`. A ThingDoer is a class of object that does one and only one thing. A ThingDoer will typically contain some data that allows it to do its task, and have one function, which might be `run` or `execute` or something more descriptive like `getWeightedRandomValue`.

If the data is exposed, the ThingDoer can be altered, and can behave differently at different times. If it is not exposed, the ThingDoer is like a function that takes extra work from the user (by requiring a call to `run`). It's simpler to just use a function, if that function can contain data. The difference is largely in the expectations. You expect a function to work the same way every time. The functions that come out of `randomWeighted` meet this expectation. `randomWeighted` itself meets this expectation: every time it's used, it gives a function that itself does the same thing every time it's used. It's also expected that every instance of a class will work the same - 'this is an X' implies more similarity than exists for ThingDoers. 'this came from X' (the equivalent relation for the functions returned by `randomWeighted`) doesn't come with as much baggage.

Division of responsibility (the good)
-
The good side of the division-of-responsibility coin is modularisation. Splitting responsibilities up on a higher level helps to keep things tidy. For example, the Model-View-Controller (MVC) framework splits a program into: data access and modification (Model), data representation (View), and 'doing things' (Controller).

Such a system, if well implemented, makes sure no component does something that another should do. Instead the components will talk to each other through a defined interface, and if (for example) the Controller decides data needs to be modified, it will tell the Model what needs to be done, and the Model will do the work. If the interface remains the same, a component can be completely replaced and the system as a whole will still function. The View component could render data in a HTML table for a web browser, but be replaced with a new View component that burns a line graph onto toast.

I made some steps in this direction this time. I've moved responsibility for the text displayed for a Room from the room itself to App. Room provides the data, App provides the rendering. This makes it easier to move this further to a new Renderer component, which then makes it easier to use new renderers later, for example I might start using React or `<canvas>`.

Similarly, I've stopped displaying Room's colours by manipulating the style directly on the elements. Instead I now supply class names, and use CSS to supply the exact colour. This is a clear demonstration of the benefits of separating responsibilities: I'm no longer limited to named CSS colour values for my colour data; I can define a 'red' room, and the exact shade of red can be whatever I desire it to be. I can supply different colour palettes without touching the data.

This is basic stuff to a web developer - it doesn't even warrant a second thought. The separation of data and appearance, however, is profound when you consider (or even just discover) cases where something as simple as changing a shade of green could involve connecting to a database.

Notability
-
One more change that needs a mention is the beginning of 'notableness' in the text description. One of the options for size is 'average'. This is a very boring descriptor, and is also the most common due to the weighting I've given. As such, if the a Room is average-sized, it's no longer mentioned - size information is omitted. We only mention interesting information. With greater numbers of descriptors, this becomes more important. If someone is average-height, average-weight, and has long hair, you're only really interested in the long hair, and the rest can be left out.

Next time
-
There's been a lot of time between my previous entry and this, mostly because I didn't think it significant enough. I think the length of this post might put that thought to bed. I was worried about not having made enough progress for the time that passed, and so more time passed, with no progress. This is a trap I'd intended to avoid. I hope it won't catch me again before the next entry.

Fingers crossed!
