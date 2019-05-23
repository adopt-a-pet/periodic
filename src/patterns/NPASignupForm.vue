<template>
  <div :class="b().toString()">
    <div :class="b('content').toString()">
      <VSpacer size="xxxs" />

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

      <VSpacer size="xl" />

      <Paragraph
        text-align="left"
        color="gray"
        font-weight="normal">
        We'll email you when new pets that match your search criteria are added to our site!
        <Paragraph
          tag="span"
          font-size="s"
          font-weight="normal">
          <TextLink @click="whatIsThis">
            What is this?
          </TextLink>
        </Paragraph>
      </Paragraph>

      <VSpacer size="xl" />

      <EmailInput
        ref="email"
        v-model="form.email"
        name="email"
        @change="checkSubmitEnabled" />

      <VSpacer size="xl" />

      <VDivider type="dashed" />

      <VSpacer size="xl" />

      <OffersForm
        v-if="layout !== 'desktop'"
        v-model="offers" />

      <VSpacer size="l" />

      <VDivider type="dashed" />

      <VSpacer size="xl" />

      <Checkbox v-model="form.dontShowAgain">
        <Paragraph
          :class="b('checkbox-text').toString()"
          font-size="xs"
          font-weight="light">
          Don’t show me this again.
        </Paragraph>
      </Checkbox>

      <VSpacer size="xl" />

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
          :disabled="submitDisabled"
          @click="saveAndContinue">
          Save & Continue
        </Button>
      </div>

      <VSpacer size="xl" />
    </div>

    <OffersForm
      v-if="layout === 'desktop'"
      v-model="offers"
      :class="b('offers-form-desktop').toString()" />
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

  props: {
    /**
     * Email to pre-fill in the form.
     */
    email: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      form: {
        email: this.email,
        dontShowAgain: false,
      },
      offers: [],
      submitDisabled: true,
    };
  },

  mounted() {
    this.checkSubmitEnabled();
  },

  methods: {
    checkSubmitEnabled() {
      this.$nextTick(() => {
        const valid = !!this.form.email && this.$refs.email.validate();

        this.submitDisabled = !valid;
      });
    },
    whatIsThis() {
      /**
       * When user clicks "What is this"
       *
       * @event click:whatIsThis
       * @type none
       */
      this.$emit('click:whatIsThis');
    },
    skip() {
      /**
       * When user clicks "Skip"
       *
       * @event click:skip
       * @type none
       */
      this.$emit('click:skip');
    },
    saveAndContinue() {
      /**
       * NPA signup submit event
       *
       * @event submit
       * @type {{ email: String, dontShowAgain: Boolean }}
       */
      this.$emit('submit', this.form);
    },
  },
};
</script>

<docs>
```vue
<template>
  <NPASignupForm/>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
```
</docs>
