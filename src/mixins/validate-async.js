
export default {
  methods: {
    /**
     * pauseWhileValidating
     *
     * Continually checks if validation is done until it can resolve
     *
     * @param {Object} field A Vuelidate instance for a single field
     * @returns {Promise}
     */
    async pauseWhileValidating(field) {
      return new Promise(resolve => {
        const checkField = () => {
          // If it's done validating, we're done checking
          if (!field.$pending) resolve();
          // Otherwise, wait and check again
          else setTimeout(() => checkField, 50);
        };

        // Run once to get started
        checkField();
      });
    },
  },
};
