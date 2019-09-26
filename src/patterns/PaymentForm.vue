<template>
  <div :class="b().toString()">
    <input
      type="hidden"
      name="stripeToken"
      value="">
    <div
      :class="{'periodic-payment-form__form-control periodic-base': !cardErrors,
               'periodic-payment-form__form-control--card-errors periodic-base': cardErrors}">
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
        :class="b('zip-code').toString()"
        :validations="zipsValidator"
        :error-messages="{
          zipsValidator: 'Invalid Location',
          required: 'Invalid Location'
        }"
        required />
      <VSpacer size="xxs" />
      <TextInput
        id="card-number"
        ref="cardNumber"
        :class="b('card-number').toString()" />
      <div
        id="card-errors"
        style="display:none;"
        :class="b('card-errors').toString()"
        role="alert" />
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
      v-if="showError"
      :class="b('error-text').toString()">
      <Paragraph
        font-size="m"
        font-weight="light">
        There was an error processing your payment, please check your payment information and try again.
      </Paragraph>
    </div>
    <VSpacer size="xl" />
  </div>
</template>

<script>
/* global Stripe */
// import tokens from '@/assets/tokens/tokens.json';
import { zipsValidator } from '../utils/validators/location-vuelidate';

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
    paymentError: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      firstName: '',
      lastName: '',
      zipCode: '',
      showError: false,
      cardErrors: false,
    };
  },

  computed: {
    zipsValidator() {
      return {
        zipsValidator,
      };
    },
  },

  watch: {
    paymentError(bool) {
      if (bool === true) this.showError = true;
    },
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
     * Get stripe key, the PaymentForm expects the host
     * environment to provide a syscall vuex module so
     * we can pull in the stripe key from there. This allows
     * us to use different keys across our projects instead
     * of having one hard coded key inside our form.
     *
     * @syscall stripe/key
     * @returns {{stripeKey: String}}
     */
    this.$syscall('config/stripe/key')
      .then(response => {
        this.stripeKey = response;
      });
  },

  mounted() {
  },

  methods: {
    /**
     * When stripe is done loading inside of the created
     * lifecycle hook, we call the mountStripe method. This method
     * actually mounts the stripe elements once ready.
     */
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
          fontSize: '20px',
          color: '#4d4d4d',
          padding: '17px',

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

      /**
       * Stripes default way of handling card errors. Super handy,
       * the messages are dynamic depending on what the error is.
       */
      this.cardNumber.addEventListener('change', event => {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
          this.cardErrors = true;
          displayError.style.display = 'block';
        } else {
          displayError.textContent = '';
          this.cardErrors = false;
          displayError.style.display = 'none';
        }
      });
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
