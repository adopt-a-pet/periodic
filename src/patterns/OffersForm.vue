<template>
  <div :class="b().toString()">
    <Heading
      level="h3"
      font-family="museo"
      font-weight="bold">
      Im-PAW-sibly Good Deals!
    </Heading>

    <VSpacer size="s" />

    <div class="wildest-banner">
      <div class="wildest-banner__logo">
        <img src="../assets/img/theWildestBannerLogoBlock.png">
      </div>
      <div class="wildest-banner__text">
        <Paragraph
          line-height="14px"
          font-size="xxxxs"
          font-weight="normal">
          <b>BONUS:</b> Navigate the wild world of pet parenting with our sister
          site
          <TextLink
            href="https://www.thewildest.com/signup?utm_source=adoptapetsite&utm_medium=referral&utm_campaign=adopt_a_pet_opt_in&utm_content=asset_tw_logo"
            target="_blank"
            class="link-blue">
            <b>The Wildest</b>
          </TextLink>! By submitting your info, you’ll also receive pet advice, free
          training tips, expert advice, and 24/7 access to pet pros from the
          Wildest.
        </Paragraph>
      </div>
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
      this.$emit(
        'change',
        this.offers.map(({ newsletterId }) => newsletterId),
      );
    },

    allOffers() {
      this.$emit('change:allOffersChecked', this.allOffersChecked);
    },

    newsletterCheckboxId(offer) {
      return `${tokens.prefix_component}offersform-checkbox-newsletter-${offer.techName}`;
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
          techName: 'chewy2',
          displayHtml: "I would like to receive the latest special deals"
        },
        {
          newsletterId: 2,
          techName: 'chewy2',
          displayHtml:
            "Yes, I would like to receive communications from Chewy"
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
