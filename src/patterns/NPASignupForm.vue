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
            v-model="npaPlanSelection"
            name="npa-plan-selection"
            :columns="2"
            :items="items" />
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
          :v-model="dogsDistance"
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
        <!-- <div
          v-show="dropdown.breeds"
          class="dropdown breedCheckboxesContainer">
          <div
            class="breedCheckboxes"
            @click="expandBreedsDropdown()">
            <DropdownMulti
              id="breedsDropdownElement"
              :class="{active: breedDropdownActive}"
              :items="breedsDropdownItems"
              :value="selectedBreedIds"
              :label="Breeds"
              :search="true"
              :key="breedsDropdownItems.length"
              multi-selected-label="Multiple"
              zero-selected-label="Any"
              size="tiny"
              type="checkbox" />
            <ul id="selectedBreeds">
              <li
                v-for="breed in selectedBreeds"
                :key="breed">
                <svg
                  class="x-close"
                  width="21px"
                  height="21px"
                  viewBox="0 0 22 22"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  @click="removeBreed(breed)">
                  <g
                    id="PSR-Dogs-&amp;-Cats"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd">
                    <g
                      id="PSR-Dogs---Few-Results"
                      transform="translate(-149.000000, -868.000000)"
                      fill="#00A8DE">
                      <g
                        id="noun_X_2222077_000000"
                        transform="translate(149.000000, 868.000000)">
                        <path
                          id="Shape-Copy-2"
                          d="M10.9863693,0 C17.0656753,0 22,4.9070632 22,10.9863693 C22,17.0656753
                          17.0656753,22 10.9863693,22 C4.9070632,22 0,17.0656753 0,10.9863693
                          C0,4.9070632 4.9070632,0 10.9863693,0 Z M10.9863693,9.24163569
                          L14.3667906,5.86121437 L16.1387856,7.60594796 L12.7583643,10.9863693
                          L16.1387856,14.3667906 L14.3667906,16.1387856 L10.9863693,12.7583643
                          L7.60594796,16.1387856 L5.86121437,14.3667906 L9.24163569,10.9863693
                           L5.86121437,7.60594796 L7.60594796,5.86121437 L10.9863693,9.24163569 Z" />
                      </g>
                    </g>
                  </g>
                </svg> {{ breed.display }}
              </li>
            </ul>
          </div>
        </div> -->
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
      },
      npaPlanSelection: '2',
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
          "Get real time, instant notifications when you have a new match with your $5 monthly donation!",
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
        radius: "10 miles or less",
        zipcode: "90210",
        clan: "Dogs"
      },
    };
  }
};
</script>
```
</docs>
