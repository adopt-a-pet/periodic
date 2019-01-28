<template>
  <div :class="b().toString()">
    <Heading
      level="h3"
      font-family="museo"
      font-weight="bold">
      Im-PAW-sibly Good Deals!
    </Heading>

    <VSpacer size="s" />

    <Icon name="pet-sponsor" />

    <VSpacer size="s" />

    <Checkbox
      v-model="allOffersChecked"
      size="tiny">

      <span :class="b('checkbox-text').toString()">
        Get offers and tips from our sponsors.
      </span>

      <span
        :class="b('link-blue').toString()"
        style="display: inline-block"
        @click.stop="showAllOffers = !showAllOffers">

        <span>{{ showAllOffers ? 'Close' : 'Learn More' }}</span>

        <Icon
          :class="b('arrow').is({ expanded: showAllOffers }).toString()"
          name="arrow"
          fill="blue" />
      </span>

      <VSpacer size="s" />
    </Checkbox>

    <div
      v-if="showAllOffers"
      :class="b('all-offers').toString()">

      <Checkbox
        v-for="(offer, i) in offers"
        :checked="optins.includes(offer.newsletterId)"
        :key="i"
        size="tiny"
        @change="onOfferChecked($event, offer.newsletterId)">

        <span
          :class="b('checkbox-text').toString()"
          v-html="offer.displayHtml" />

        <VSpacer size="xxs" />
      </Checkbox>

      <p :class="b('footnote').toString()">
        <span>
          * I certify I am 18 years of age or older and agree that Purina
          may use my information as described in the
        </span>
        <a
          :class="b('link-blue').toString()"
          href="https://www.purina.com/privacy-policy"
          target="_blank">Privacy Policy</a>
        <span> and </span>
        <a
          :class="b('link-blue').toString()"
          href="https://www.purina.com/about-our-ads"
          target="_blank">About Our Ads</a>.
      </p>
    </div>
  </div>
</template>

<script>
/**
 * Offers Form
 */

export default {
  name: 'OffersForm',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'offers-form',
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
