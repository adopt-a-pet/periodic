<template>
  <div>
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
          font-size="m"
          font-weight="bold"
          line-height="26px"
          color="blue"
          :class="b('search-params').toString()">
          {{ params.age }} {{ params.sex }} {{ params.color }} {{ params.breed }}<span v-if="breed">s</span> within
          {{ params.radius }} miles of {{ params.zipcode }}
        </paragraph>
        <Paragraph
          v-if="!moreThanClan"
          font-size="m"
          font-weight="bold"
          line-height="26px"
          color="blue"
          :class="b('search-params').toString()">
          All {{ params.clan }} within {{ params.radius }} miles of {{ params.zipcode }}
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
          icon="lightbulb">
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
    <div :class="b('filters').toString()">
      <Heading
        :level="layout === 'desktop' ? 'h1' : 'h2'"
        font-weight="bold"
        font-family="museo">
        Filters
      </Heading>
      <div v-if="dogs">
        <Dropdown
          :value="params.radius"
          :items="[
            { display: '5 miles or less', value: 5 },
            { display: '10 miles or less', value: 10 },
            { display: '20 miles or less', value: 20 },
            { display: '50 miles or less', value: 50 },
            { display: '100 miles or less', value: 100 },
            { display: '250 miles or less', value: 250 },
            { display: '500 miles or less', value: 500 },
            { display: '3500 miles or less', value: -1 }
          ]"
          label="Distance" />

        <VSpacer size="s" />

        <DropdownMulti
          id="breedsDropdownElement"
          :key="params.breed.length"
          :class="{active: breedDropdownActive}"
          :items="breedsDropdownItems"
          :value="params.breed"
          :label="Breeds"
          :search="true"
          multi-selected-label="Multiple"
          zero-selected-label="Any"
          size="tiny"
          type="checkbox" />

        <VSpacer size="s" />

        <DropdownMulti
          label="Sex"
          zero-selected-label="Any"
          multi-selected-label="Multiple"
          :value="params.sex"
          :columns="1"
          :items="[
            { display: 'Male', value: 'm' },
            { display: 'Female', value: 'f' }
          ]" />

        <VSpacer size="s" />

        <DropdownMulti
          label="Age"
          zero-selected-label="Any"
          multi-selected-label="Multiple"
          :value="params.age"
          :columns="1"
          :items="[
            { display: 'Puppy', value: 'puppy' },
            { display: 'Young', value: 'young' },
            { display: 'Adult', value: 'adult' },
            { display: 'Senior', value: 'senior' }
          ]" />

        <VSpacer size="s" />

        <DropdownMulti
          label="Color"
          zero-selected-label="Any"
          multi-selected-label="Multiple"
          :value="params.color"
          :columns="1"
          :items="[
            { display: 'Black', value: 152 },
            { display: 'Brindle', value: 153 },
            { display: 'Brown/Chocolate', value: 154 },
            { display: 'Gray/Blue/Silver', value: 155 },
            { display: 'Merle', value: 156 },
            { display: 'Red/Golden/Orange', value: 157 },
            { display: 'Silver & Tan', value: 158 },
            { display: 'Tan/Yellow/Fawn', value: 159 },
            { display: 'Tricolor', value: 160 },
            { display: 'White', value: 161 }
          ]" />

        <VSpacer size="s" />

        <DropdownMulti
          label="Size"
          zero-selected-label="Any"
          multi-selected-label="Multiple"
          :value="params.size"
          :columns="1"
          :items="[
            { display: 'Small', value: 1 },
            { display: 'Medium', value: 2 },
            { display: 'Large', value: 3 },
            { display: 'X-Large', value: 4 }
          ]" />
      </div>
      <div v-if="cats">
        Cats
      </div>
    </div>
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
      }
      if (this.form.npaPlanSelection === '2') {
        document.getElementById('periodic-radio-box-npa-plan-selection-item-1-parent').classList.add('not-selected');
        document.getElementById('periodic-radio-box-npa-plan-selection-item-2-parent').classList.remove('not-selected');
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
        age: "",
        sex: "",
        color: "",
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
