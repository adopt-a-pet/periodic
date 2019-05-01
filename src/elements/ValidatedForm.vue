<template>
  <form @submit.stop.prevent="onSubmit">
    <!-- @slot Put all your fields here like a normal form -->
    <slot />
  </form>
</template>

<script>
const emptyMap = new Map();

/**
 * A form component that will only submit when all fields are valid.
 */
export default {
  name: 'ValidatedForm',
  status: 'under-review',
  release: '1.0.0',
  model: {
    event: 'change',
  },
  props: {
    /**
     * A list of component names to validate before submit.
     *
     * Child components should have a `name` prop (that corresponds to one of the
     * names in this list) and a `validate` method that returns either a Boolean
     * or a Promise that resolves as a Boolean (`true` when it passes validation)
     */
    names: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      validatedComponentMap: new Map(),
    };
  },

  computed: {
    allValid() {
      const validStates = Array.from(this.validatedComponentMap.values());
      return validStates.every(valid => valid);
    },
  },

  watch: {
    allValid(allValid) {
      this.$emit('change', allValid);
    },
  },

  mounted() {
    const fieldComponents = this.getFieldComponents();

    // Listen to each component for changes to re-validate
    fieldComponents.forEach(component => {
      const customChange = component.$options.model;
      const handler = () =>
        this.$nextTick(() => this.validateComponent(component));

      // Validate once to set the a prop in validatedComponentMap for each field
      // in the order the names were passed.
      this.validateComponent(component);

      // Components can define the event for v-model. If that's the case, use that.
      if (customChange && customChange.event) {
        component.$on(customChange.event, handler);
      } else {
        // If they didn't define anything, fall back to input and change
        component.$on('input', handler);
        component.$on('change', handler);
      }
    });
  },

  methods: {
    getFieldComponents() {
      // Make a list of component objects.
      return this.names.map(name =>
        // Find all child components that have a `name` prop AND are in the list
        this.$children.find(component => component.name === name),
      ).filter(component => component && ('validate' in component)); // Ignore components that don't have a `validate` method
    },
    validateComponent(component) {
      // In some cases validate will return a Promise
      return Promise.resolve(component.validate())
        .then(valid => {
          const validatedComponentMap = this.validatedComponentMap;

          validatedComponentMap.set(component.name, valid);

          // Set it to emptyMap and then back to validatedComponentMap because
          // Vue doesn't notice changes in a Map.
          this.validatedComponentMap = emptyMap;
          this.validatedComponentMap = validatedComponentMap;
        });
    },
    onSubmit() {
      // Make a list of component objects.
      const fieldComponents = this.getFieldComponents();

      // Give all fields a chance to validate before submit
      Promise.all(fieldComponents.map(component => this.validateComponent(component)))
        .then(validated => {
          if (!this.allValid) {
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
    :names="['email', 'password']"
    @validate:error="onValidateError"
    @submit="onSubmit">

    <Heading level="h3">{{ submitted ? '' : 'Not ' }}Submitted</Heading>
    <VSpacer size="xs" />
    <Heading v-if="error" level="h4">Error on field: {{ error }}</Heading>
    <VSpacer size="xs" />

    <EmailInput
      v-model="email"
      name="email" />

    <VSpacer size="xs" />

    <PasswordInput
      v-model="password"
      name="password" />
    <VSpacer size="l" />
    <Button v-if="!submitted" type="submit">Submit!</Button>
  </ValidatedForm>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
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
