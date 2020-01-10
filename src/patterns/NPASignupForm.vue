<template>
  <div
    :class="b().toString()">
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

        <Paragraph
          tag="span"
          font-size="s"
          font-weight="normal">
          <TextLink @click="whatIsThis">
            What is this?
          </TextLink>
        </Paragraph>

        <VSpacer size="xl" />
      </div>

      <Paragraph
        text-align="left"
        color="gray"
        font-weight="normal">
        We'll email you when new pets that match your search criteria are added to our site!
      </Paragraph>

      <VSpacer size="l" />

      <SearchQuerySentence
        :filters="filters"
        @click:searchFilters="searchFilters" />

      <VSpacer size="l" />

      <div :class="b('fields').toString()">
        <div>
          <EmailInput
            ref="email"
            v-model="form.email"
            name="email"
            :validations="emailDNCValidator"
            :error-messages="{
              required: 'Enter Email',
              email: 'Invalid Email',
              emailDNCValidator: 'Oops!',
            }"
            required
            @change="changeEmail" />
          <div
            v-if="isEmailOnDNC"
            :class="b('error-message').toString()">
            You are currently on our Do Not Contact list.
            To be removed and get help setting up for New Pet Alerts, email
            <TextLink href="mailto:info@adoptapet.com">
              info@adoptapet.com
            </TextLink>.
          </div>
        </div>

        <RadioGroupBox
          v-if="filters.clan === 1 || filters.clan === 2"
          ref="plan"
          v-model="form.plan"
          name="npa-plan-selection"
          :columns="2"
          :items="npaTypes"
          :show-display-text="showDisplayText"
          :error-messages="{required: 'Please select an option.'}"
          required
          @change="selectPlan" />
      </div>

      <div v-if="filters.clan === 1 || filters.clan === 2">
        <Infobox
          v-if="form.plan === 1"
          icon="lightbulb"
          @click:textLink="searchFilters">
          <template slot="header">
            Pro tip
          </template>
          <template slot="message">
            To get the most out of your Premium experience, choose 2 or more filters.
          </template>
          <template slot="link">
            Edit Filters >
          </template>
        </Infobox>
      </div>

      <VSpacer size="xl" />

      <div v-if="form.plan === 1 && !isConfirmedUser">
        <Heading
          level="h3"
          font-weight="bold"
          font-family="museo">
          Payment
        </Heading>

        <VSpacer size="xxs" />

        <Heading
          level="h5"
          font-weight="bold">
          Amount (Billed Monthly)
        </Heading>

        <Heading
          level="h4"
          font-weight="bold"
          class="premium-price-plan">
          $10
        </Heading>

        <VSpacer size="xs" />

        <PaymentForm
          ref="paymentForm"
          :email="form.email"
          :payment-error="paymentError"
          :premium-plan-id="premiumPlanId"
          @paymentInfo="createPremiumNPA"
          @tokenError:creation="emitTokenError"
          @noEmail="emitScrollToEmail" />
      </div>


      <VDivider
        v-if="layout == 'desktop'"
        type="dashed" />

      <div v-if="layout !== 'desktop'">
        <VDivider type="dashed" />
        <VSpacer size="xl" />
        <OffersForm
          v-model="form.optins"
          :offers="offers"
          :optins="optins"
          :all-offers-checked="allOffersChecked"
          @change:optins="emitOptins"
          @change:allOffersChecked="emitAllOffersChecked" />
        <VSpacer size="xl" />
        <VDivider type="dashed" />
      </div>

      <VSpacer size="xl" />

      <Checkbox
        id="gtm-dont-show"
        v-model="form.dontShowAgain"
        @change="dontShowAgain">
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
            font-weight="bold"
            color="gray-light">
            Skip
          </Paragraph>
        </TextLink>

        <Button
          id="npa-submit-button"
          @click="submit">
          Save & Continue
        </Button>
      </div>

      <VSpacer size="xl" />
    </div>

    <OffersForm
      v-if="layout === 'desktop'"
      v-model="form.optins"
      :class="b('offers-form-desktop').toString()"
      :offers="offers"
      :optins="optins"
      :all-offers-checked="allOffersChecked"
      @change:optins="emitOptins"
      @change:allOffersChecked="emitAllOffersChecked" />
  </div>
</template>

<script>
const emailDNCValidator = (email, vm) =>
  vm.$syscall('api/validation/emailDNCValidator', email).then(res => res);
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
    /**
     * Status of all checkboxes checkedNewsletterId
     */
    allOffersChecked: {
      type: Boolean,
    },
    /**
     * A list of items to render. Each item must have a 'heading', `display`, and a `value`.
     *
     *
     * `[ { heading: 'Color', display: 'Green', value: 'a' } ]`
     */
    items: {
      type: Array,
      default: () => [],
      validator: items => items.every(item => ('heading' in item) && ('display' in item) && ('value' in item)),
    },
    /**
     * A list of search paramaters from the user's search criteria
     *
     * ```
     * {
     *     age: ['young', 'senior'],
     *     bondedPair: true,
     *     breeds: [187],
     *     clan: 1,
     *     color: [1,2],
     *     geoRange: 10,
     *     sex: ['f'],
     *     specialNeeds: true,
     *     zipCode: '90210',
     *  }
     * ```
     */
    filters: {
      type: Object,
      default: () => ({}),
    },
    /**
     * Determine whether or not to show the display text in the RadioGroupBox.
     */
    showDisplayText: {
      type: Boolean,
      default: true,
    },
    /**
     * Which NPA plan to use
     */
    plan: {
      type: Number,
      default: null,
    },
    /**
     * If stripe Payment Error
     */
    paymentError: {
      type: Boolean,
      default: false,
    },
    /**
     * Is user already a Premium customer?
     */
    isConfirmedUser: {
      type: Boolean,
      default: false,
    },
    /** Amount to be displayed in
     * quick pay window, passed down
     * to PaymentForm
     */
    premiumPlanId: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      form: {
        email: this.email,
        dontShowAgain: false,
        plan: this.plan,
      },
      paymentInfo: {},
      isEmailOnDNC: {
        type: Boolean,
        default: null,
      },
    };
  },
  blockName: 'npa-signup',
  status: 'under-review',
  release: '1.0.0',

  computed: {
    npaTypes: () => [
      {
        heading: 'Premium Alert',
        display:
          'Get real-time, instant emails when you have a new match. Your payment supports our non-profit! Cancel anytime.',
        icon: 'clock',
        value: 1,
      },
      {
        heading: 'Free Alert',
        display:
          'We’ll run your pet search once a day and send you an email with your new matches from the past 24 hours.',
        icon: 'envelope',
        value: 0,
      },
    ],
    emailDNCValidator() {
      return {
        emailDNCValidator,
      };
    },
  },

  methods: {
    whatIsThis() {
      /**
       * When user clicks "What is this"
       *
       * @event click:whatIsThis
       * @type none
       */
      this.$emit('click:whatIsThis');
    },
    searchFilters() {
      /**
       * When user clicks "Edit Search filters"
       *
       * @event click:searchFilters
       * @type none
       */
      this.$emit('click:searchFilters');
      this.dispatchTrackClick('editFilters');
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
    dontShowAgain() {
      /**
       * When user changes "Don’t show me this again."  It will send true or false
       *
       * @event change:dontShowAgain
       * @type Boolean
       */
      this.$emit('change:dontShowAgain', this.form.dontShowAgain);
    },
    selectPlan(plan) {
      /**
       * When user changes the NPA plan
       *
       * @event change:plan
       * @type Number
       */
      this.$emit('change:plan', plan);

      /**
       * Dispatch free or premium alert based off of plan,
       * for tracking
       */
      if (plan < 1) {
        this.dispatchTrackClick('freeAlert');
      } else {
        this.dispatchTrackClick('premiumAlert');
      }
    },
    submit() {
      const submitButton = document.getElementById('npa-submit-button');
      if (!this.$refs.email.validate()) {
        this.emitScrollToEmail();
        return;
      }
      if (!this.$refs.plan.validate()) {
        this.$emit('scrollToPlan');
        return;
      }
      if (submitButton) {
        submitButton.disabled = true;
      }
      if (this.form.plan === 1 && !this.isConfirmedUser) {
        this.$refs.paymentForm.handleSubmit();
      } else if (this.form.plan === 1 && this.isConfirmedUser) {
        this.createPremiumNPA({});
      } else {
      /**
       * NPA signup submit event
       *
       * @event submit
       * @type {{ email: String, dontShowAgain: Boolean, offers: Array }}
       */
        this.$emit('submit', {
          ...this.form,
          filters: this.filters,
        });
      }
    },
    /**
     * Emit createPremiumNPA event with token
     * and user info.
     */
    createPremiumNPA(eventData) {
      const obj = {
        email: this.$refs.email.value,
      };

      if (eventData.stripeToken) {
        obj.token = eventData.stripeToken;
      }

      if (eventData.zipCode) {
        obj.zipcode = eventData.zipCode;
      }

      if (eventData.ev) {
        obj.ev = eventData.ev;
      }

      this.$emit('submit', {
        ...this.form,
        filters: this.filters,
        stripeInfo: obj,
      });
    },
    /**
     * Dispatch analytics track with an eventAction
     * or eventLabel
     */
    dispatchTrackClick(event) {
      this.$syscall(`analytics/track/NPASignupForm/${event}/click`);
    },
    /**
     * Emit this so we can update the store
     * from the frontend
     */
    changeEmail() {
      const vm = this;
      this.$emit('change:npaEmail', this.$refs.email.value);
      emailDNCValidator(this.$refs.email.value, vm).then(res => {
        vm.isEmailOnDNC = !res;
      });
    },
    emitOptins(event) {
      this.$emit('change:optins', event);
    },
    emitAllOffersChecked(event) {
      this.$emit('change:allOffersChecked', event);
    },
    emitTokenError() {
      this.$emit('tokenError');
    },
    emitScrollToEmail() {
      this.$refs.email.validate(false);
      this.$emit('scrollToEmail');
    },
  },
};
</script>

<docs>
```vue
<template>
  <NPASignupForm
    :offers='offers'
    :allOffersChecked="allOffersChecked"
    :optins="optins"
    :filters='filters'
    :showDisplayText='showDisplayText'/>
</template>
<script>
export default {
  data() {
    return {
      offers: [
        {
          newsletterId: 1,
          displayHtml: 'I would like to receive the latest special deals'
        },
        {
          newsletterId: 2,
          displayHtml:
            'Yes, I would like to receive communications from the Petco Foundation'
        }
      ],
      optins: [1, 2],
      allOffersChecked: true,
      filters: {
        age: ['young', 'senior'],
        bondedPair: true,
        breeds: [187, 1],
        clan: 1,
        color: [153],
        geoRange: 10,
        hair: ['short'],
        sex: [],
        specialNeeds: true,
        size: [1, 2],
        zipCode: '90210',
      },
      showDisplayText: true    };
  }
};
</script>
```
</docs>
