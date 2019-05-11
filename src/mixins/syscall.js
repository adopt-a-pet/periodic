/**
 *
 */

const methods = {
  /**
   * A version of $store.dispatch namespaced with 'vxsyscall'
   */
  $syscall(name, payload = null, opts = {}) {
    // Vuex actions _can_ return a Promise but don't have to. This guarantees
    // $syscall will always return a Promise.
    return Promise.resolve(
      this.$store.dispatch(`vxsyscall/${name}`, payload, opts),
    );
  },
};

export default {
  methods,
};
