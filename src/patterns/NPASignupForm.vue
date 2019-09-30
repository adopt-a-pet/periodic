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

      <div v-if="filters.clan === 1 || filters.clan === 2">
        <Paragraph
          font-size="s"
          font-weight="bold"
          line-height="24px">
          You’re Searching For
        </Paragraph>

        <Paragraph
          v-if="hasMoreFiltersThanClan"
          font-weight="bold"
          line-height="26px">
          <TextLink
            :class="b('search-params').toString()"
            @click="searchFilters">
            {{ petDescription }} within {{ geoRange }} miles of {{ filters.zipCode }}
          </TextLink>
        </Paragraph>

        <Paragraph
          v-else
          font-weight="bold"
          line-height="26px">
          <TextLink
            :class="b('search-params').toString()"
            @click="searchFilters">
            All {{ clanName }}s within {{ geoRange }} miles of {{ filters.zipCode }}
          </TextLink>
        </Paragraph>

        <VSpacer size="l" />
      </div>

      <div :class="b('fields').toString()">
        <EmailInput
          ref="email"
          v-model="form.email"
          name="email"
          :error-messages="{ required: 'Enter Email', email: 'Invalid Email' }"
          required />

        <RadioGroupBox
          v-if="filters.clan === 1 || filters.clan === 2"
          v-model="form.plan"
          name="npa-plan-selection"
          :columns="2"
          :items="npaTypes"
          :show-display-text="showDisplayText"
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

      <div v-if="form.plan === 1">
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
          font-weight="bold">
          $10
        </Heading>

        <VSpacer size="s" />

        <PaymentForm
          ref="paymentForm"
          :email="form.email"
          :payment-error="paymentError"
          @paymentInfo="createPremiumNPA" />
      </div>


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
  },

  data() {
    return {
      form: {
        email: this.email,
        dontShowAgain: false,
        optins: this.optins,
        plan: this.plan,
      },
      paymentInfo: {},
      colorsMap: {},
      breedMap: {},
    };
  },
  blockName: 'npa-signup',
  status: 'under-review',
  release: '1.0.0',

  computed: {
    sizeMap() {
      return {
        1: 'small',
        2: 'medium',
        3: 'large',
        4: 'x-large',
      };
    },

    sexFullName() {
      if (!this.filters.sex) return '';

      let name = '';

      switch (this.filters.sex.join()) {
        case '':
          name = '';
          break;

        case 'm':
          name = 'male';
          break;

        case 'f':
          name = 'female';
          break;

        default:
          name = 'male or female';
      }

      return name;
    },
    age() {
      return this.filters.age ? this.filters.age.join(' or ') : null;
    },
    hairNames() {
      return this.filters.hair ? this.filters.hair.join(' or ') : null;
    },
    colorNames() {
      if (!this.filters.color) return '';

      return this.filters.color
        .map(colorId => this.colorsMap[colorId])
        .join(' or ');
    },
    familyNames() {
      if (!this.filters.breeds) return this.clanName;

      return this.filters.breeds
        .map(breedId => this.breedMap[breedId])
        .join(' or ');
    },
    hasMoreFiltersThanClan() {
      return Boolean(
        this.age || this.sexFullName || this.colorNames || this.familyNames || this.sizeNames || this.hairNames,
      );
    },

    clanName() {
      let name;

      switch (this.filters.clan) {
        case 1:
          name = 'dog';
          break;

        case 2:
          name = 'cat';
          break;

        default:
          name = 'pet';
      }

      return name;
    },

    bondedPair() {
      return this.filters.bondedPair ? 'bonded pair' : '';
    },

    specialNeeds() {
      return this.filters.specialNeeds ? 'with special needs' : '';
    },

    sizeNames() {
      if (!(this.filters.size && this.filters.size.length)) return '';

      return this.filters.size
        .map(sizeId => this.sizeMap[sizeId])
        .join(' or ');
    },

    geoRange() {
      return this.filters.geoRange === -1 ? 3500 : this.filters.geoRange;
    },

    petDescription() {
      return [
        this.bondedPair,
        this.age,
        this.sexFullName,
        this.colorNames,
        this.sizeNames,
        this.hairNames,
        this.familyNames,
        this.specialNeeds,
      ]
        .filter(a => !!a)
        .join(' ');
    },

    npaTypes: () => [
      {
        heading: 'Premium Alert',
        display:
          'Get real-time, instant emails when you have a new match for $10 per month. Your payment supports our non-profit! Cancel anytime.',
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
  },

  created() {
    /**
     * Get colors name and Ids from database
     *
     * @syscall api/pets/colors
     * @param {Number}
     * @returns {{colorId: Number, colorName: String}}
     */
    this.$syscall('api/pets/getColors', this.filters.clan)
      .then(response => {
        this.colorsMap = response.reduce(
          (acc, { colorId, colorName }) => Object.assign(acc, { [colorId]: colorName }),
          {},
        );
      });

    /**
     * Get Breed name and Ids from database
     *
     * @syscall api/pets/getBreeds
     * @param {Number}
     * @returns {{breedId: Number, breedName: String, breedNamePlural: String}}
     */
    this.$syscall('api/pets/getBreeds', this.filters.clan).then(response => {
      this.breedMap = response.reduce(
        (acc, { breedId, breedNamePlural }) =>
          Object.assign(acc, { [breedId]: breedNamePlural }),
        {},
      );
    });
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
      this.dispatchTrack('Premium Alert - Edit Filters');
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
        this.dispatchTrack('Free Alert');
      } else {
        this.dispatchTrack('Premium Alert');
      }
    },
    submit() {
      if (this.$refs.email.validate()) {
        if (this.form.plan === 1) {
          this.$refs.paymentForm.handleSubmit();
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
      } else {
        this.$emit('scrollToEmail');
      }
    },
    /**
     * Emit createPremiumNPA event with token
     * and user info.
     */
    createPremiumNPA(eventData) {
      const obj = {
        token: eventData.stripeToken,
        email: this.$refs.email.value,
        zipcode: eventData.zipCode,
      };

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
    dispatchTrack(event) {
      this.$syscall('analytics/track/dispatchTrack', { event });
    },
  },
};
</script>

<docs>
```vue
<template>
  <NPASignupForm
    :offers='offers'
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
      showDisplayText: false
    };
  }
};
</script>
```
</docs>
