<template>
  <div>
    <Checkbox
      v-model="allOffersChecked"
      size="tiny">

      <span class="h6__heading h6--tiny h6--compact">Get offers and tips from our sponsors.</span>

      <span
        style="display: inline-block"
        class="link-blue accordion-link h6__heading h6--tiny h6--compact"
        @click.stop="showAllOffers = !showAllOffers">

        <span>{{ showAllOffers ? 'Close' : 'Learn More' }}</span>

        <svg
          :class="{
            'accordion-link-up': showAllOffers,
            'accordion-link-down': !showAllOffers
          }"
          class="offer-section__arrow">
          <use xlink:href="#aap-icon-prev" />
        </svg>
      </span>

      <VSpacer size="s" />
    </Checkbox>

    <div
      v-if="showAllOffers"
      class="terms-bg">

      <Checkbox
        v-for="(offer, i) in offers"
        :checked="optins.includes(offer.newsletterId)"
        :key="i"
        size="tiny"
        @change="onOfferChecked($event, offer.newsletterId)">

        <span
          class=""
          v-html="offer.displayHtml" />

        <VSpacer size="s" />
      </Checkbox>

      <div class="pet-inquiry-form__privacy">
        <p class="h6__heading">
          <span>
            * I certify I am 18 years of age or older and agree that Purina
            may use my information as described in the
          </span>
          <a
            href="https://www.purina.com/privacy-policy"
            target="_blank"
            class="link-blue">Privacy Policy</a>
          <span> and </span>
          <a
            href="https://www.purina.com/about-our-ads"
            target="_blank"
            class="link-blue">About Our Ads</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * NPA signup form
 */

export default {
  name: 'OffersForm',
  status: 'under-review',
  release: '1.0.0',
  model: {
    prop: 'optins',
    event: 'change',
  },
  props: {
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
      allOffersChecked: true,
      showAllOffers: false,
    };
  },

  computed: {
  },

  watch: {
    allOffersChecked() {
      if (!this.allOffersChecked) {
        // If the main checkbox gets unchecked, show all offer checkboxes
        this.showAllOffers = true;
        return;
      }

      // If allOffersChecked === true, check all the offers
      this.checkEveryOffer();
    },
  },

  created() {
    this.checkEveryOffer();
  },

  methods: {
    checkEveryOffer() {
      /**
       * Change event
       *
       * @event change
       * @type Array
       */
      this.$emit('change', this.offers.map(({ newsletterId }) => newsletterId));
    },

    onOfferChecked(checked, checkedNewsletterId) {
      const newsletterIds = this.offers
        .map(({ newsletterId }) => newsletterId)
        .filter(newsletterId => (
          // When we come across the newsletterId that needs to change...
          newsletterId === checkedNewsletterId
            ? checked // Remove from the list if unchecked, leave if checked
            : this.optins.includes(newsletterId) // Otherwise leave it the same
        ));

      /**
       * Change event
       *
       * @event change
       * @type Array
       */
      this.$emit('change', newsletterIds);
    },
  },
};
</script>

<docs>
```vue
<template>
  <div>
    <OffersForm
      :offers="offers"
      v-model="offersForm1" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      offersForm1: []
    }
  },

  computed: {
    offers() {
      return [
        { newsletterId: 1, displayHtml: 'I would like to receive the latest special deals' },
        { newsletterId: 2, displayHtml: 'Yes, I would like to receive communications from the Petco Foundation' }
      ];
    }
  },

  watch: {
    offersForm1(offers) {
      console.log(offers);
    }
  }
};
</script>
```
</docs>
