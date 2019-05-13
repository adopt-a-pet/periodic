/**
 * Syscalls are a way of speaking into the host environment in a manageable way
 * that keeps Periodic from being tied to, and making assumptions about, the host.
 *
 * This is just a simple mixin to make syscalls more convenient.
 */

const methods = {
  /**
   * A version of $store.dispatch namespaced with 'syscall/'
   */
  $syscall(name, payload = null) {
    // Vuex actions _can_ return a Promise but don't have to. This guarantees
    // $syscall will always return a Promise.
    return Promise.resolve(
      this.$store.dispatch(`syscall/${name}`, payload),
    );
  },
};

export default {
  methods,
};
