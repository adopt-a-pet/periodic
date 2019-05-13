### Syscalls are a way of speaking into the host environment in a manageable way that keeps Periodic from being tied to, and making assumptions about, the host.

#### Why Syscalls?

The name is borrowed from the concept of syscalls in a CPU which allow user programs to access things like the network without knowing anything about the hardware doing the work for it.

There are two big reasons why syscalls in Periodic came to be:

##### 1. Environmental Configuration

Let's say a Periodic pattern needs to make an HTTP call to verify a user email address. Based on the environment making use of Periodic components, the URL that needs to be hit may change. For example you may want to use `ra-api.adoptapet.com` for production and `staging-api-ra.adoptapet.com` for staging. Configuring things like this at runtime will require a growing list of configuration parameters as Periodic grows.

##### 2. Bundle Size

Most of the useful side effects we need to do require some sort of library. Want to make an HTTP call? What do you use: `this.$http` or Axios or something else? If you want to make a GraphQL call there are half a dozen popular libraries to do that.

But whatever you choose has to be bundled up with Periodic, increasing the package size significantly. What's worse is that it's completely unnecessary because the host environment will almost certainly have its own HTTP or GraphQL library already loaded and bundled.

So why duplicate that functionality and increase the bundle size when you can just use a syscall?

#### Why Vuex?

Syscalls are really just a simple call to a Vuex `dispatch('syscall/...')`. They assume the host environment will have the needed actions available under the module named "syscall" when the time comes to call them. Vuex was the natural choice because it is already used in most Vue apps for managing complex interactions between components and Vuex actions already do everything needed to make syscalls really useful, including dispatching other actions to other Vuex modules.

The only other option seemed to be expecting functions with a specific name in the global scope from the host. But aside from all of the normal dangers that comes globals, references to `window` also makes SSR on platforms like Nuxt really difficult--if not impossible.

#### How To Use Syscalls

##### In your Periodic component

```javascript
this.$syscall('something', 123)
  .then(response => { ... });
  // `this.$syscall` always returns a Promise for cases when you need a return value back from it the call.
```

##### In your host environment, when setting up Vuex

```javascript
const syscalls = {
  namespaced: true,

  actions: {
    something(_, payload) {
      // Whatever you need done
    }
  }
};

new Vuex.Store({
  strict: true,
  modules: {
    syscalls,
    // ...all of your other Vuex modules
  }
});
```

#### Please Document Your Syscalls!

When you create a new component, it's important to communicate to future developers what this component needs in order to function properly. Syscalls are easy to document using standard JSDoc comments.

```javascript
/**
 * My syscall description!
 *
 * @syscall api/getBreeds
 * @param {Number} something
 * @returns {{a: Number, b: String}}
 */
this.$syscall('api/getBreeds', 123)
  .then(response => {
    // Expect something like { a: 1, b: 'test' }
  });
```