<template>
  <div :class="b().toString()">
    <ValidatedForm
      v-model="formValid"
      :names="['email']"
      @submit="saveAndContinue">
      <div :class="b('content').toString()">
        <VSpacer
          size="xxxs" />

        <Heading
          level="h4"
          font-weight="light"
          line-height="compact">
          Set Up Your
        </Heading>

        <Heading
          :level="layout === 'desktop' ? 'h1' : 'h2'"
          font-weight="bold"
          font-family="museo">
          New Pet Alert
        </Heading>

        <VSpacer
          size="xl" />

        <Paragraph
          text-align="left"
          color="gray"
          font-weight="normal">
          We'll email you when new pets that match your search criteria are added to our site!

          <Paragraph
            tag="span"
            font-size="s"
            font-weight="normal">
            <TextLink>What is this?</TextLink>
          </Paragraph>
        </Paragraph>

        <VSpacer
          size="xl" />

        <EmailInput
          v-model="form.email"
          name="email" />

        <VSpacer
          size="xl" />

        <VDivider type="dashed" />

        <VSpacer
          size="xl" />

        <Checkbox v-model="form.dontShowAgain">
          <Paragraph
            :class="b('checkbox-text').toString()"
            font-size="xs"
            font-weight="light">
            Don’t show me this again.
          </Paragraph>
        </Checkbox>

        <VSpacer
          size="xl" />

        <div :class="b('skip-continue').toString()">
          <TextLink
            always-underline
            color="gray-light"
            @click="skip">
            <Paragraph
              tag="span"
              font-size="m"
              font-family="museo"
              font-weight="bold">
              Skip
            </Paragraph>
          </TextLink>

          <Button
            :disabled="!formValid"
            type="submit">
            Save & Continue
          </Button>
        </div>

        <VSpacer
          size="xl" />
      </div>
    </ValidatedForm>
  </div>
</template>

<script>
/**
 * NPA signup form
 */

export default {
  name: 'NPASignupForm',
  blockName: 'npa-signup',
  status: 'under-review',
  release: '1.0.0',

  data() {
    return {
      formValid: true,
      form: {
        email: '',
        dontShowAgain: false,
      },
    };
  },

  methods: {
    skip() {
      /**
       * NPA signup skip event
       *
       * @event skip
       * @type none
       */
      this.$emit('skip');
    },
    saveAndContinue() {
      /**
       * NPA signup submit event
       *
       * @event submit
       * @type Object
       */
      this.$emit('submit', this.form);
    },
  },
};
</script>

<docs>
```vue
<template>
  <NPASignupForm />
</template>
<script>
export default {
  data() {
    return {
    }
  }
};
</script>
```
</docs>
