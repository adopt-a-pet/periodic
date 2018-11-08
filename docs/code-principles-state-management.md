### State management is one of the most important parts of an application. Without a well designed pattern for data flow, your code can very quickly devolve into chaos and spaghetti.

## Side effects

- HTTP requests
- Setting a cookie
- Setting localStorage
- Making in analytics request

Now, in the strictest sense it would also be considered a side effect to modify `this.` values inside of a component. Vue does have a way to prevent state mutation in components: [functional components](https://vuejs.org/v2/guide/render-function.html#Functional-Components), however we are not going to be that strict in this system because maintaining internal state (specifically in elements) can be quite useful--we don't need to use Vuex for simple things like button state.

## Vuex

#### mixins/vuex-module

Use it!

#### No methods!

...except as event handlers (like @click). All business logic should take place inside of actions and mutations. Even when you have a method as an event handler it should do nothing more than call an action or mutation.

##### this.$state or getters?

Getters when necessary (derived state)

mapState and mapGetters

#### Keep mutations out of components. Always use Actions.

https://github.com/vuejs/vuex/issues/587#issuecomment-346942179

##### But isn't that just another level of indirection? So...why?

No matter how complex your app gets, the data flow will always look like this diagram:

![vuex](https://vuex.vuejs.org/vuex.png)

##### Simplicity within components

It's one less thing to think about for the developer. Instead of having to constantly look back at your state code and remember "Was that an action or a mutation? Was it async or not?" Just know that from the component's perspective you always use actions.

##### Actions can compose mutations

There are plenty of times when you may need to change multiple parts of the state at the same time. To keep your component code small, you can combine all of these mutations into a single action. This also removes the temptation to put business logic inside of your components.

For example, in the official [shopping cart example](https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart/store/modules/cart.js) you can see the `checkout` action does several things:

1. Commit `setCheckoutStatus`
2. Commit `setCartItems`
3. Asynchronously call `buyProducts` and commit `setCheckoutStatus`

That's a whole lot of code that otherwise would have been inside the component.

## Local state, props, or Vuex?

Each pattern and template in Periodic may have its own Vuex module (if needed) using `this.$store.registerModule`! Elements will not. Elements will either keep a small amount of local state or, ideally, no state at all.

- Elements don't use Vuex. They communicate using custom events. This will help force our elements to stay small.
- Patterns and templates only use Vuex.
