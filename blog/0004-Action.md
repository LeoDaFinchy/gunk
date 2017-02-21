0004 - Action
=
So far I've been expanding the world you can explore, in size, variety, and fidelity. This time I'm expanding what you can **do** in it.

I'm also taking a different approach to documenting the journey. I'm typing this before I've written any code for this release. The hope is I can better stay on track and explain myself if I'm collecting my thoughts at the same time as implementing them. Read on to see how that turns out...

Actions
-
Up 'til now, the actions a player can take has been defined by the Room the player is in, and the neighbours that Room has. Perhaps 'defined' isn't the right word, so much as 'derived', as there's no data attached to what an action *is*. There's just a callback on each button to update the state such that `currentRoom` becomes the Room corresponding to the button pressed.

That's changed now. Actions are now defined in their own file and can be referred to by name, and the actions available to take are... still based on neighbours, plus one further action based on state.

Current Activity
-
That new state is `playerActivity`. The structure of the program is such that inputs translate into actions, actions manipulate state, and the state is then used to render HTML. This means I shouldn't just change what's on screen because a player clicked a button, I should instead manipulate state such that the state then alters the rendered output. This is what I do.

I have an 'inspect' button which changes the `playerActivity` to `inspectingRoom`. All the 'go to neighbour' buttons change `playerActivity` to `standingInRoom` in addition to changing the `currentRoom` as before.

If we're currently `standingInRoom`, we can inspect it, so that action button shows. The description of the room will be simple and reference only the colour. If we're `inspectingRoom` instead, further inspection is disallowed, and the button is hidden, but the description of the room will take size and shape into account.

> Due to the use of `lazyAttribute`, size and shape remain uninitialized until you inspect a room. This means you can pass through a room without generating these attributes!

My Current Activity
-
I've kept to a considered pace with each update (if not necessarily in when they're out), making small but noticable changes as I figure out the structure of the program. There's only so far this kind of update can take me before something big comes up, and there are two potential improvements looming large that will change things considerably. It just remains to decide which to pursue next.
