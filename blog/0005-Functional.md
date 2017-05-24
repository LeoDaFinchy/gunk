0005 - Functional
=
Right. Might have some explaining to do. It's been a while since the last installment, so by some measures I've failed in my original goal. Thing is, I've been working on something else, sort of...

Functional Programming
-
I discovered functional programming. I like it. A lot.

I've been open to function programming for a while, but never really jumped in before. My programming habits until now have been a sort of soft object-oriented style, reflecting my beginnings with C++. I was completely ok with 'free functions' (those that aren't a member of a class) from the beginning, unlike some Java die-hards, but held encapsulation in classes as a sort of goal to aim towards.

As such I've been pretty excited about classes coming to Javascript, thinking 'now I can build bigger programs'. I held the organisational pairing of data and functionality in classes in high regard, preferring it to the module system I'd only really used in Python.

Now my mind has changed. After absorbing videos and tutorials on functional programming laying out its benefits (and taking in the many MANY critiques of object-oriented programming out there) I've been convinced. And I've experimented. And that's why this entry is so late. Soz. But honestly, functional programming has brought some of the fun of programming itself back to me.

Aspects
-
But enough about that. What have I brought to you this time? Well, two things, really. The first is mostly hidden in the background. I've removed the `Room` class, and replaced it with a system that sets up a `variety` of things with several `aspects`. Each aspect is something you might recognise as a property or a component of of the object it's applied to. Aspects can be applied easily to any object (even a plain `{}`) and when combined they can be used to create a load of different objects, which will each have the same behaviour for that aspect. For example, each `variety` of object that possesses the "colour" `aspect` can be relied upon to behave in a similar way. Aspects replace the earlier `lazyAttribute`, with a bit more structure around what affects the final value. An aspect draws inputs from 'nowhere', from the variety being constructed, and from external context. I don't know if I'll stick to that exact arrangement, but it works for now. Currently the aspects available are `colour`, `name`, `shape`, `size`, `neighbours`, and `container`.

Things in things
-
Wait, what was that? `container`? Yup. There are now things in things. Specifically, each `Room` object (which is now an instance of the Room `variety` with the `name` "Room", not a class) contains a `Table` and a (randomised) number of `Chair`s. You won't be able to see them when you first enter a room, but if you inspect the room instead, you should see them. You can't do anything with them yet, but that will come soon (for certain loose interpratations of 'soon'). It's quite likely that player interaction will also be governed by aspects, like maybe 'seat' or 'carryable'.

Onwards
-
Enough being coy about plans. The main pain point in the project (aside from managing to write these posts; I really seem to be struggling) is `App`. That's where everything needed to keep the game running that I've not yet systemised is kept, and it's growing. Mostly with display-related functions. So, that's what I'll tackle next: renderers.
