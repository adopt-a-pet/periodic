### State management is one of the most important parts of an application. Without a well designed pattern for data flow, your code can very quickly devolve into chaos and spaghetti.

## Side effects

Components can be thought of like functions: They take some data in (in the form of props) and then they output a result (in the form of HTML). Think of it as a box with only one door: You know that nothing can get in or out any other way. Unfortunately in JS and Vue there _are_ other ways to mess with the world outside of that box. Those are called side effects.

##### Some examples of side effects:

- Modifying a global
- HTTP requests
- Setting a cookie/localStorage
- Calling an analytics library

By keeping side effects out of our components and isolating them in one place we gain two things:

1. **Simplicity in component code.** We know that our components are concerned with only one thing: user interaction. State management, HTTP requests, cookies, etc. are all done _outside_ of the component, which keeps our component code small and manageable.
2. **_Significantly_ easier debugging.** No more asking "What part of the code set that cookie?" or "Where did that HTTP request come from?" No spending hours to track down a data race because two components were both modifying the same object, but you don't know _where_ they are.

#### Managing state without side effects

Now, you may look at that list of side effects and think: "Hey, those are all useful things that need to be done! If my component can't do those things who will?"

For Periodic, the answer is: syscalls. Syscalls are a convenient way to make use of side effects without increasing the size of our builds or making assumptions about the environment where Periodic will be used. There is a whole page of documentation on Syscalls, so check that out when you need it.

#### Module communication without side effects

The idea of side effects--of a component reaching outside of its little box and modifying the outside world--is tempting, especially when needing to communicate with other components. But beware! This will lead to complicated entanglements of code later down the road.

##### Events

Use events whenever possible. Events are great: They're stateless, and they assume nothing about their parent environment which makes them perfect for use in other codebases.

It's as simple as...

1. Defining components which emit events: `this.$emit('example')`
1. Using handlers in the foreign codebase that uses Periodic: `@example="handler"`

##### The event bus anti-pattern

The idea of an event bus makes sense: Two-way communication between deeply nested child components and (grand)parent components. The problem comes when modules are meant to be composed together like building blocks. Now you have elements or patterns which make assumptions about what their parent components will be. This is unacceptable if you want your components to be completely independent and interchangeable.

So what do you do instead? Usually relaying the events upward works just fine in practice.

## Local state, props, or syscalls?

Let's recap:

- Elements should usually only need props and `$emit` for use with `v-model`.
- Some elements and most patterns will need some local state, which is fine when needed.
- If you have components that need to communicate with one another, use `$emit`.
- If you need to do anything with side effects, use syscalls.
