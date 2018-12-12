<template>
  <form @submit.stop.prevent="onSubmit">
    <slot />
  </form>
</template>

<script>
/**
 * Example component is used to visually communicate core parts of the product
 * and available actions.
 */
export default {
  name: 'ValidatedForm',
  status: 'under-review',
  release: '1.0.0',
  props: {
    /**
     * A list of component refs (this.$refs) to validate before submit.
     * All refs must have a `validate` method that returns either a Boolean or a
     * Promise that resolves as a Boolean (`true` when it passes validation).
     */
    fields: {
      type: Array,
      default: () => [],
      // validator: refs => refs.every(ref => 'validate' in ref),
    },
  },
  methods: {
    onSubmit() {
      // Find all child components that have a `name` prop AND are in the list
      // of `fields`.
      const fieldComponents = this.fields.map(name => this.$children.find(component => component.name === name));

      Promise.all(fieldComponents.map(ref => ref.validate()))
        .then(validated => {
          const allValid = validated.every(valid => valid);

          if (!allValid) {
            const firstInvalidIndex = validated.findIndex(v => !v); // return `true` for the first invalid field
            const firstInvalidName = fieldComponents[firstInvalidIndex].name;

            /**
             * Validation error event. Emits the name of the invalid field.
             *
             * @event validate:error
             * @type String
             */
            this.$emit('validate:error', firstInvalidName);
            return;
          }

          /**
           * Submit event
           *
           * @event submit
           * @type none
           */
          this.$emit('submit');
        });
    },
  },
};
</script>

<docs>
```vue
<template>
  <ValidatedForm
    :fields="['email', 'password']"
    @validate:error="onValidateError"
    @submit="onSubmit">

    <Heading level="h3">{{ submitted ? '' : 'Not ' }}Submitted</Heading>
    <VSpacer size="xs" />
    <Heading v-if="error" level="h4">Error on field: {{ error }}</Heading>
    <VSpacer size="xs" />

    <EmailInput name="email" />
    <VSpacer size="xs" />
    <PasswordInput name="password" />
    <VSpacer size="l" />
    <Button v-if="!submitted" type="submit">Submit!</Button>
  </ValidatedForm>
</template>

<script>
export default {
  data() {
    return {
      submitted: false,
      error: null,
    };
  },
  methods: {
    onSubmit() {
      this.submitted = true;
      this.error = null;
    },
    onValidateError(name) {
      this.error = name;
    }
  },
};
</script>
```
</docs>
