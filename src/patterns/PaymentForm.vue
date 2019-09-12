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
        :validations="zipValidator"
        :error-messages="{
          zipValidator: 'Invalid Location',
          required: 'Invalid Location'
        }"
        required />
      <VSpacer size="xxs" />
      <TextInput
        id="card-number"
        ref="cardNumber"
        :class="b('card-number').toString()" />
      <TextInput
        id="card-expiry"
        ref="cardExpiry"
        :class="b('card-expiry').toString()" />
      <TextInput
        id="card-cvc"
        ref="cardCvc"
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
import { zipValidator } from '../utils/validators/location-vuelidate';

/**
 * Payment Form
 */

export default {
  name: 'PaymentForm',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'payment-form',
  props: {
    email: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      firstName: '',
      lastName: '',
      zipCode: '',
      showError: false,
    };
  },

  computed: {
    zipValidator() {
      return {
        zipValidator,
      };
    },
  },

  watch: {
  },

  created() {
    /**
     * Append the Stripe script to the head of our HTML
     * (Stripe only supports it being in the head). Wait for
     * the script to finish loading and then mount the Stripe
     * Elements
     */
    const stripeScript = document.createElement('script');
    document.head.appendChild(stripeScript);
    stripeScript.onload = () => {
      this.mountStripe();
    };
    stripeScript.setAttribute('src', 'https://js.stripe.com/v3/');
    /**
     * Get stripe key
     *
     * @syscall stripe/key
     * @returns {{stripeKey: String}}
     */
    this.$syscall('syscall/config/stripe/key')
      .then(response => {
        this.stripeKey = response;
      });
  },

  mounted() {
  },

  methods: {
    mountStripe() {
      this.stripe = Stripe(this.stripeKey);

      const elements = this.stripe.elements({
        // Stripe's examples are localized to specific languages, but if
        // you wish to have Elements automatically detect your user's locale,
        // use `locale: 'auto'` instead.
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

      this.cardNumber = elements.create('cardNumber', {
        style: elementStyles,
        placeholder: 'Credit Card Number',
      });
      this.cardNumber.mount('#card-number');

      this.cardExpiry = elements.create('cardExpiry', {
        style: elementStyles,
      });
      this.cardExpiry.mount('#card-expiry');

      this.cardCvc = elements.create('cardCvc', {
        style: elementStyles,
      });
      this.cardCvc.mount('#card-cvc');
    },
    /**
     * If we ever need to check before creating a Stripe Token
     * we can do so here.
     */
    handleSubmit() {
      this.createStripeToken();
    },
    /**
     * Creates our stripe token to send off to the VML. Notice
     * we only have to pass in one of the stripe elements (cardNumber)
     * even though there are multiple elements (cardExpiry, cardCvc). Stripe
     * knows to pull all of these in.
     */
    createStripeToken() {
      this.stripe.createToken(this.cardNumber).then(result => {
        if (result.token) {
          /**
         * paymentInfo event
         *
         * @event paymentInfo
         * @type {{ stripeToken: String, zipCode: String }}
         */
          this.$emit(
            'paymentInfo',
            {
              stripeToken: result.token.id,
              zipCode: this.zipCode,
            },
          );
        }
        if (result.error) {
          this.hasCardErrors = true;
          this.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
        }
      });
    },
  },
};
</script>
<style scoped>
/**
 Scoped Stripe styles
 Stripe sets these classes when it mounts
 */
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
    <PaymentForm />
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
