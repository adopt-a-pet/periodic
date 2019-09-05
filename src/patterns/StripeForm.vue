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
      <div class="card-wrapper">
        <VSpacer size="xxs" />
        <div
          id="card-element"
          ref="card" />
      </div>
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
    <Button
      @click="submitPayment">
      Submit Payment
    </Button>
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
      const elements = stripe.elements();
      const card = elements.create('card');
      card.mount(this.$refs.card);
    },
  },
};
</script>

<docs>
```vue
<template>
  <div>
    <StripeForm stripeKey="pk_test_TYooMQauvdEDq54NiTphI7jx"/>
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
