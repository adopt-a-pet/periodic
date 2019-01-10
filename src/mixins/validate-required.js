
export default {
  methods: {
    validateRequired(required, value) {
      if (required && !value) return false;

      return true;
    },
  },
};
