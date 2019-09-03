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

      <Paragraph
        font-size="s"
        font-weight="bold"
        line-height="24px">
        You’re Searching For
      </Paragraph>

      <Paragraph
        v-if="moreThanClan"
        font-weight="bold"
        line-height="26px">
        <TextLink
          :class="b('search-params').toString()"
          @click="searchFilters">
          {{ params.age }} {{ params.sex }} {{ params.color }} {{ params.breed }}<span v-if="breed">s</span> within
          {{ params.radius }} miles of {{ params.zipcode }}
        </TextLink>
      </Paragraph>

      <Paragraph
        v-if="!moreThanClan"
        font-weight="bold"
        line-height="26px">
        <TextLink
          :class="b('search-params').toString()"
          @click="searchFilters">
          All {{ params.clan }} within {{ params.radius }} miles of {{ params.zipcode }}
        </TextLink>
      </Paragraph>

      <VSpacer size="l" />

      <div :class="b('fields').toString()">
        <EmailInput
          ref="email"
          v-model="form.email"
          name="email"
          :error-messages="{ required: 'Enter Email', email: 'Invalid Email' }"
          required />

        <RadioGroupBox
          v-model="form.npaPlanSelection"
          name="npa-plan-selection"
          :columns="2"
          :items="items"
          @change="notSelectedPlan" />
      </div>

      <Infobox
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
    /**
     * A list of newsletterIds that are checked
     */
    items: {
      type: Array,
      default: () => [],
    },
    /**
     * A list of search paramaters from the users search criteria
     */
    params: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      form: {
        email: this.email,
        dontShowAgain: false,
        optins: this.optins,
        npaPlanSelection: '',
      },
    };
  },
  blockName: 'npa-signup',
  status: 'under-review',
  release: '1.0.0',

  computed: {
    age() {
      return this.params.age;
    },
    sex() {
      return this.params.sex;
    },
    color() {
      return this.params.color;
    },
    breed() {
      return this.params.breed;
    },
    moreThanClan() {
      return (this.age || this.sex || this.color || this.breed);
    },
    dogs() {
      return this.params.clan === 'Dogs';
    },
    cats() {
      return this.params.clan === 'Cats';
    },
  },

  mounted() {
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
    saveAndContinue() {
      /**
       * NPA signup submit event
       *
       * @event submit
       * @type {{ email: String, dontShowAgain: Boolean, offers: Array }}
       */
      if (this.$refs.email.validate()) {
        this.$emit('submit', this.form);
      }
    },
    notSelectedPlan() {
      if (this.form.npaPlanSelection === '1') {
        document.getElementById('periodic-radio-box-npa-plan-selection-item-2-parent').classList.add('not-selected');
        document.getElementById('periodic-radio-box-npa-plan-selection-item-1-parent').classList.remove('not-selected');
        document.getElementById('periodic-radio-box-npa-plan-selection-item-1-parent').classList.add('periodic-radio-box__item--selected');
        document.getElementById('periodic-radio-box-npa-plan-selection-item-2-parent').classList.remove('periodic-radio-box__item--selected');
      }
      if (this.form.npaPlanSelection === '2') {
        document.getElementById('periodic-radio-box-npa-plan-selection-item-1-parent').classList.add('not-selected');
        document.getElementById('periodic-radio-box-npa-plan-selection-item-2-parent').classList.remove('not-selected');
        document.getElementById('periodic-radio-box-npa-plan-selection-item-2-parent').classList.add('periodic-radio-box__item--selected');
        document.getElementById('periodic-radio-box-npa-plan-selection-item-1-parent').classList.remove('periodic-radio-box__item--selected');
      }
    },
  },
};
</script>

<docs>
```vue
<template>
  <NPASignupForm
    :offers="offers"
    :items="items"
    :params="params"/>
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
      ],
      items: [
        {
          heading: "Premium Alert",
          display:
          "Get real time, instant notifications when you have a new match with your $10 monthly payment!",
          icon: "clock",
          value: "1"
        },
        {
          heading: "Free Alert",
          display:
          "We’ll run your pet search daily and send you an email within 24 hours of having a new match.",
          icon: "envelope",
          value: "2"
        },
      ],
      params: {
        age: "young",
        sex: "f",
        color: "Black",
        breed: "Pittbull",
        radius: "10",
        zipcode: "90210",
        clan: "Dogs"
      },
    };
  }
};
</script>
```
</docs>
