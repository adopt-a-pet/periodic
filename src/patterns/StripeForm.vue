<template>
  <div :class="b().toString()">
    <input
      type="hidden"
      name="stripeToken"
      value="">
    <div class="form-control">
      <TextInput
        v-model="firstName"
        label="First Name"
        required />
      <TextInput
        v-model="lastName"
        label="Last Name"
        required />
      <TextInput
        v-model="zipCode"
        label="Zip Code"
        type="number"
        required />
      <VSpacer size="xxs" />
      <TextInput
        id="card-number"
        ref="card-number" />
      <TextInput
        id="card-expiry"
        ref="card-expiry" />
      <TextInput
        id="card-cvc"
        ref="card-cvc" />
    </div>
    <div
      id="card-errors"
      role="alert" />
    <div
      v-if="showError"
      class="error-text">
      <Paragraph
        font-size="m"
        font-weight="light">
        There was an error processing your payment, please refresh and try again.
      </Paragraph>
    </div>
  </div>
</template>

<script>
/* global Stripe */
// import tokens from '@/assets/tokens/tokens.json';

/**
 * Stripe Form
 */

export default {
  name: 'StripeForm',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'stripe-form',
  props: {
    /**
     * The stripe key to be used when mounting
     * stripe.
     */
    stripeKey: {
      required: true,
      type: String,
    },
  },

  data() {
    return {
      firstName: '',
      lastName: '',
      zipCode: '',
      showError: false,
      stripeReady: false,
    };
  },

  computed: {},

  watch: {
    stripeReady() {
      if (this.stripeReady) {
        return this.mountStripe();
      }
      return false;
    },
  },

  created() {

  },

  mounted() {
    this.checkForStripe();
  },

  methods: {
    submitPayment() {
      // console.log('paiddddd');
    },
    checkForStripe() {
      if (window.Stripe) {
        this.stripeReady = true;
      } else {
        setInterval(() => this.checkForStripe(), 1000);
      }
    },
    mountStripe() {
      const stripe = Stripe(this.stripeKey);
      /* const elements = stripe.elements();
      const card = elements.create('card');
      card.mount(this.$refs.card); */
      const elements = stripe.elements({
        fonts: [
          {
            cssSrc: 'https://fonts.googleapis.com/css?family=Quicksand',
          },
        ],
        // Stripe's examples are localized to specific languages, but if
        // you wish to have Elements automatically detect your user's locale,
        // use `locale: 'auto'` instead.
        // eslint-disable-next-line no-underscore-dangle
        locale: 'auto',
      });

      const elementStyles = {
        base: {
          color: 'color(agray)',
          fontWeight: 600,
          // fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
          fontSize: '1.25rem',
          fontSmoothing: 'antialiased',

          '::placeholder': {
            color: '#b3b3b3',
          },

          ':focus::placeholder': {
            color: '#CFD7DF',
          },
        },

        invalid: {
          color: 'orange',
          ':focus': {
            color: '#FA755A',
          },
          '::placeholder': {
            color: '#FFCCA5',
          },
        },
      };

      const cardNumber = elements.create('cardNumber', {
        style: elementStyles,
      });
      cardNumber.mount('#card-number');

      const cardExpiry = elements.create('cardExpiry', {
        style: elementStyles,
      });
      cardExpiry.mount('#card-expiry');

      const cardCvc = elements.create('cardCvc', {
        style: elementStyles,
      });
      cardCvc.mount('#card-cvc');

      // registerElements([cardNumber, cardExpiry, cardCvc], 'example3');
    },
  },
};
</script>
<style scoped>
.StripeElement {
  box-sizing: border-box;

  line-height: 1.5;

  height: 3.625rem;

  padding: 10px 12px;

  border: 1px solid color(agray, light);
  border-radius: 6px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: color(aorange);
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>

<docs>
```vue
<template>
  <div>
    <StripeForm stripe-key="pk_test_TYooMQauvdEDq54NiTphI7jx"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      offersForm1: []
    };
  },

  computed: {

  },

  watch: {

  }
};
</script>
```
</docs>
