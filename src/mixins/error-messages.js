
export default {
  methods: {
    getErrorMessages(validator, errorMessages) {
      return validator.$flattenParams()
        .map(({ name }) => name)
        .filter(name => !validator[name])
        .map(name => errorMessages[name]);
    },
  },
};
