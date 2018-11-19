const props = {
  /**
   * The namespace of the Vuex module. Defaults to component name.
   */
  vuexNamespace: {
    type: String,
    default() {
      return this.$options.name;
    },
  },
};

const computed = {
  $mystore() {
    return this.$store.state[this.vuexNamespace];
  },
};

const methods = {
  /**
   * A namespaced version of $store.dispatch
   */
  $dispatch(type, payload = null, opts = {}) {
    this.$store.dispatch(`${this.vuexNamespace}/${type}`, payload, opts);
  },

  /**
   * Register the configured module using vuexNamespace
   */
  registerVuexModule() {
    const vuexModule = this.$options.vuexModule;
    const vuexNamespace = this.vuexNamespace;

    if (!vuexModule) throw new Error('Your component must have a vuexModule property');
    if (vuexNamespace in this.$store.state) {
      throw new Error(`The Vuex module "${vuexNamespace}" already exists! Pick something else`);
    }

    this.$store.registerModule(vuexNamespace, {
      ...vuexModule,
      namespaced: true, // Guarantee that it is namespaced
    });
  },

  /**
   * Unregister the configured module using vuexNamespace
   */
  unregisterVuexModule() {
    const vuexNamespace = this.vuexNamespace;
    this.$store.unregisterModule(vuexNamespace);
  },
};

export default {
  props,
  computed,
  methods,
};
