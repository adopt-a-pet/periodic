import { mixin as veeValidateMixin, directive as veeValidateDirective } from 'vee-validate';

export default {
  mixins: [veeValidateMixin],
  directives: { validate: veeValidateDirective },

  methods: {
    onInput(value) {
      this.$emit('change', value);
    },
    onFocus(value) {
      this.$emit('focus', value);
    },
    setErrorMessages() {
      if (!this.name) throw new Error('This mixin can only be used by components that have a name prop');

      const messages = {};

      messages[this.name] = this.$options.errorMessages;

      this.$validator.localize('en', {
        custom: messages,
      });
    },
  },

  computed: {
    errorState() {
      return this.errors.has(this.name);
    },
    errorMessage() {
      return this.errors.first(this.name);
    },
    successState() {
      return !this.errorState;
    },
  },

  created() {
    this.setErrorMessages();
  },
};
