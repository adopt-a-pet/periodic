
const vModelProp = $options => (
  ($options.model && $options.model.prop)
    || 'value' // The default prop Vue uses for v-model is `value` if not configured
);

const validateProp = $options =>
  $options.validate.prop || vModelProp($options);

const validateEventName = $options => [].concat(
  // $options.validate.validateOn is preferable because it enables lazy validation
  // Next check if an event other than the default `input` is configured in $options.model
  // If not, use Vue's default `input` event
  $options.validate.validateOn
    || ($options.model && $options.model.validateOn)
    || 'input',
);

export default {
  data() {
    if (!this.$options.validate) return {};

    const { prop } = this.$options.validate;

    if (!prop) return {};

    // A validated value can be used to delay validation until `event`. This is
    // because using v-model.lazy on your own components doesn't currently work.
    // See: https://github.com/vuejs/vue/pull/6940
    return {
      [prop]: null,
    };
  },

  created() {
    // If there's no prop in $options.validate there's nothing we can do
    if (!this.$options.validate) return;

    const value = this[vModelProp(this.$options)];
    const prop = validateProp(this.$options);
    const { resetOn } = this.$options.validate;
    const validateOn = validateEventName(this.$options);
    const validate = () => this.$nextTick(() => this.validate());

    // If starting with a value, validate it right away
    if (value) this.validate();

    validateOn.forEach(v => this.$on(v, validate));

    if (resetOn) {
      this.$on(resetOn, () => {
        this[prop] = null;
        this.$v[prop].$reset();
      });
    }
  },

  methods: {
    validate() {
      const prop = validateProp(this.$options);
      const value = this[vModelProp(this.$options)];

      this.$v[prop].$model = value;

      return !this.$v[prop].$error;
    },
  },
};
