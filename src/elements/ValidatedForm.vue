<template>
  <form @submit.stop.prevent="onSubmit">
    <!-- @slot Put all your fields here like a normal form -->
    <slot />
  </form>
</template>

<script>
/**
 * A form component that will only submit when all fields are valid.
 */
export default {
  name: 'ValidatedForm',
  status: 'under-review',
  release: '1.0.0',
  props: {
    /**
     * A list of component names to validate before submit.
     *
     * Child components should have a `name` prop (that corresponds to one of the
     * names in this list) and a `validate` method that returns either a Boolean
     * or a Promise that resolves as a Boolean (`true` when it passes validation)
     */
    fields: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onSubmit() {
      // Make a list of component objects.
      const fieldComponents = this.fields.map(name =>
        // Find all child components that have a `name` prop AND are in the list
        this.$children.find(component => component.name === name),
      ).filter(component => 'validate' in component); // Ignore components that don't have a `validate` method

      // Give all fields a chance to validate before submit
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
