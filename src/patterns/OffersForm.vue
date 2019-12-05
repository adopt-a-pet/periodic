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
      id="allSponsorOffers"
      v-model="allOffersChecked"
      size="tiny"
      @change="allOffers">
      <Paragraph
        tag="span"
        :class="b('checkbox-text').toString()"
        font-size="xxs"
        font-weight="normal"
        line-height="15px">
        Get offers and tips from our sponsors.
      </Paragraph>

      <span
        style="display: inline-block"
        @click.stop="showAllOffers = !showAllOffers">
        <Paragraph
          tag="span"
          :class="b('link-blue').toString()"
          font-size="xxs"
          font-weight="normal"
          line-height="15px">
          {{ showAllOffers ? 'Close' : 'Learn More' }}
        </Paragraph>

        <Icon
          :class="b('arrow').is({ expanded: showAllOffers }).toString()"
          name="arrow"
          fill="link-blue" />
      </span>
    </Checkbox>
    <VSpacer size="s" />

    <div
      v-if="showAllOffers"
      :class="b('all-offers').toString()">
      <div
        v-for="(offer, i) in offers"
        :key="i">
        <Checkbox
          :id="newsletterCheckboxId(offer)"
          :name="newsletterCheckboxId(offer)"
          :checked="optins.includes(offer.newsletterId)"
          size="tiny"
          @change="onOfferChecked($event, offer.newsletterId)">
          <Paragraph
            tag="span"
            :class="b('checkbox-text').toString()"
            font-size="xxs"
            line-height="15px"
            v-html="offer.displayHtml" />
        </Checkbox>

        <VSpacer size="xxs" />
      </div>

      <Paragraph
        :class="b('footnote').toString()"
        font-size="xxs"
        font-weight="normal"
        line-height="15px">
        * I certify I am 18 years of age or older and agree that Purina
        may use my information as described in the
        <TextLink
          href="https://www.purina.com/privacy-policy"
          target="_blank">
          Privacy Policy
        </TextLink>
        <span>and</span>
        <TextLink
          href="https://www.purina.com/about-our-ads"
          target="_blank">
          About Our Ads
        </TextLink>
      </Paragraph>
    </div>
  </div>
</template>

<script>
import tokens from '@/assets/tokens/tokens.json';

/**
 * Offers Form
 */

export default {
  name: 'OffersForm',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'offers-form',
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
    /**
     * Status of all checkboxes checkedNewsletterId
     */
    allOffersChecked: {
      type: Boolean,
    },
  },

  data() {
    return {
      showAllOffers: false,
    };
  },

  computed: {},

  watch: {
    allOffersChecked(allOffersChecked) {
      if (allOffersChecked) {
        // If allOffersChecked === true, check all the offers
        this.checkEveryOffer();
      } else {
        // If the main checkbox gets unchecked, show all offer checkboxes
        this.showAllOffers = true;
      }
    },
  },

  created() {
    // this.checkEveryOffer();
    /* this.offers = [
      { display: 'One', value: 1 },
      { display: 'Two', value: 2 },
      { display: 'Three', value: 3 },
    ]; */
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

    allOffers() {
      this.$emit('change:allOffersChecked', this.allOffersChecked);
    },

    newsletterCheckboxId(offer) {
      return `${tokens.prefix_component}offersform-checkbox-newsletter-${
        offer.techName
      }`;
    },

    onOfferChecked(checked, checkedNewsletterId) {
      const newsletterIds = this.offers
        .map(({ newsletterId }) => newsletterId)
        .filter(
          newsletterId =>
            // When we come across the newsletterId that needs to change...
            (newsletterId === checkedNewsletterId
              ? checked // Remove from the list if unchecked, leave if checked
              : this.optins.includes(newsletterId)), // Otherwise leave it the same
        );

      /**
       * Change event
       *
       * @event change
       * @type Array
       */
      this.$emit('change', newsletterIds);
      this.$emit('change:optins', newsletterIds);
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
     :allOffersChecked="allOffersChecked"
     :optins="optins"
     v-model="offersForm1" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      offersForm1: [],
      allOffersChecked: true,
      optins: [1, 2],
    };
  },

  computed: {
    offers() {
      return [
        {
          newsletterId: 1,
          techName: 'petcof2',
          displayHtml: "I would like to receive the latest special deals"
        },
        {
          newsletterId: 2,
          techName: 'petcof2',
          displayHtml:
            "Yes, I would like to receive communications from the Petco Foundation"
        }
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
