<template>
  <div :class="b().toString()">
    <div :class="b('content').toString()">
      <VSpacer size="xxxs" />

      <div :class="b('heading').toString()">
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
      </div>

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

      <div :class="b('fields').toString()">
        <EmailInput
          ref="email"
          v-model="form.email"
          name="email"
          :error-messages="{ required: 'Enter Email', email: 'Invalid Email' }"
          required
          @change="checkSubmitEnabled" />

        <TextInput
          ref="emailConfirm"
          v-model="emailConfirm"
          :validations="emailConfirmValidators"
          :error-messages="{ required: 'Enter Email', emailConfirm: 'Emails Don’t Match' }"
          name="email-confirm"
          label="Confirm Email"
          required
          @change="checkSubmitEnabled" />
      </div>

      <VSpacer size="xl" />

      <VDivider
        v-if="layout == 'desktop'"
        type="dashed" />

      <div v-if="layout !== 'desktop'">
        <VDivider type="dashed" />
        <VSpacer size="xl" />
        <OffersForm
          v-model="form.optins"
          :offers="offers" />
        <VSpacer size="xl" />
        <VDivider type="dashed" />
      </div>

      <VSpacer size="xl" />

      <Checkbox
        id="gtm-dont-show"
        v-model="form.dontShowAgain">
        <Paragraph
          :class="b('checkbox-text').toString()"
          font-size="xs"
          font-weight="light"
          class="gtm-dont-show">
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
      v-model="form.optins"
      :class="b('offers-form-desktop').toString()"
      :offers="offers" />
  </div>
</template>

<script>
/**
 * NPA signup form
 */

export default {
  name: 'NPASignupForm',

  props: {
    /**
     * Email to pre-fill in the form.
     */
    email: {
      type: String,
      default: '',
    },
    /**
     * A list of offers in the form of:
     *
     * ```
     * [ { newsletterId: 1, displayHtml: 'Something...' } ]
     *```
     */
    offers: {
      type: Array,
      default: () => [],
    },
    /**
     * A list of newsletterIds that are checked
     */
    optins: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      form: {
        email: this.email,
        dontShowAgain: false,
        optins: this.optins,
      },
      emailConfirm: '',
      submitDisabled: true,
    };
  },
  blockName: 'npa-signup',
  status: 'under-review',
  release: '1.0.0',

  computed: {
    emailConfirmValidators() {
      return {
        emailConfirm: value =>
          value.toLowerCase() === this.form.email.toLowerCase(),
      };
    },
  },

  mounted() {
    if (this.form.email) {
      // If we are auto-filling email because we already have it, bypass emailConfirm
      this.emailConfirm = this.form.email;

      // Make sure it's valid
      this.checkSubmitEnabled();
    }
  },

  methods: {
    checkSubmitEnabled() {
      this.$nextTick(() => {
        let valid = false;
        if (
          this.form.email
          && this.$refs.email.validate()
          && this.emailConfirm
          && this.$refs.emailConfirm.validate()
        ) {
          valid = true;
        }

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
       * @type {{ email: String, dontShowAgain: Boolean, offers: Array }}
       */
      this.$emit('submit', this.form);
    },
  },
};
</script>

<docs>
```vue
<template>
  <NPASignupForm :offers="offers"/>
</template>
<script>
export default {
  data() {
    return {
      offers: [
        {
          newsletterId: 1,
          displayHtml: "I would like to receive the latest special deals"
        },
        {
          newsletterId: 2,
          displayHtml:
            "Yes, I would like to receive communications from the Petco Foundation"
        }
      ]
    };
  }
};
</script>
```
</docs>
