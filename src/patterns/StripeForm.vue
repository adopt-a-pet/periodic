<template>
  <div :class="b().toString()">
    <input
      type="hidden"
      name="stripeToken"
      value="">
    <div :class="b('form-control').toString()">
      <TextInput
        v-model="firstName"
        label="First Name"
        :class="b('first-name').toString()"
        required />
      <TextInput
        v-model="lastName"
        label="Last Name"
        :class="b('last-name').toString()"
        required />
      <TextInput
        v-model="zipCode"
        label="Zip Code"
        type="number"
        :class="b('zip-code').toString()"
        required />
      <VSpacer size="xxs" />
      <TextInput
        id="card-number"
        ref="card-number"
        :class="b('card-number').toString()" />
      <TextInput
        id="card-expiry"
        ref="card-expiry"
        :class="b('card-expiry').toString()" />
      <TextInput
        id="card-cvc"
        ref="card-cvc"
        :class="b('card-cvc').toString()" />
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
    <VSpacer size="xl" />
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
    /**
     * Get stripe key
     *
     * @syscall stripe/key
     * @returns {{stripeKey: String}}
     */
    this.$syscall('stripe/key')
      .then(response => {
        const stripeKey = response;

        this.stripeKey = stripeKey;
      });
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
          fontWeight: 500,
          fontFamily: 'Helvetica Neue, Helvetica, Arial, Roboto, Lucida Grande, sans-serif',
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
        placeholder: 'Credit Card Number',
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

.StripeElement--complete {
  border-color: color(agreen);
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>

<docs>
```vue
<template>
  <div>
    <StripeForm />
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
