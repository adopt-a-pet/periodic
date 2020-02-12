<template>
  <div :class="b().toString()">
    <input
      type="hidden"
      name="stripeToken"
      value="">
    <div
      v-if="quickPayAvailable"
      class="pay-options">
      <TextLink
        font-weight="light"
        :class="{
          'periodic-payment-form__quick-pay': !quickPaySelected,
          'periodic-payment-form__quick-pay--active': quickPaySelected
        }"
        @click="handleClickPayOption('quickPay')">
        Quickpay
      </TextLink>
      <TextLink
        font-weight="light"
        :class="{
          'periodic-payment-form__credit-card': quickPaySelected,
          'periodic-payment-form__credit-card--active': !quickPaySelected
        }"
        @click="handleClickPayOption('creditCard')">
        Credit Card
      </TextLink>
    </div>
    <div
      v-show="quickPaySelected"
      :class="b('quick-pay-box').toString()">
      <Button
        id="payment-request-button"
        :class="b('payment-request-button').toString()"
        @click="showPaymentRequestWindow">
        <Icon
          v-show="quickPayType === 'apple'"
          class="periodic-button__social-icon"
          name="apple-pay" />
        <Icon
          v-show="quickPayType !== 'apple'"
          class="periodic-button__social-icon"
          name="google-pay" />
        Pay
      </Button>
    </div>
    <!-- Use v-show instead of v-if so stripe can mount in these fields -->
    <div
      v-show="!quickPaySelected && checkedForQuickPay"
      :class="{'periodic-payment-form__form-control periodic-base': !cardErrors && !paymentError,
               'periodic-payment-form__form-control--card-errors periodic-base': cardErrors && !paymentError,
               'periodic-payment-form__form-control--payment-error periodic-base': !cardErrors && paymentError,
               'periodic-payment-form__form-control--multiple-errors periodic-base': cardErrors && paymentError
      }">
      <TextInput
        v-model="firstName"
        label="First Name"
        :class="b('first-name').toString()"
        required
        :error-messages="{
          required: 'Required'
        }"
        @change="removePaymentError"
        @click="dispatchTrackClick('firstName')" />
      <TextInput
        v-model="lastName"
        label="Last Name"
        :class="b('last-name').toString()"
        required
        :error-messages="{
          required: 'Required'
        }"
        @change="removePaymentError"
        @click="dispatchTrackClick('lastName')" />
      <TextInput
        v-model="zipCode"
        label="Zip Code"
        :class="b('zip-code').toString()"
        :validations="zipsValidator"
        required
        :error-messages="{
          zipsValidator: 'Invalid Location',
          required: 'Invalid Location'
        }"
        @change="removePaymentError"
        @click="dispatchTrackClick('zipCode')" />
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
        :class="b('text-orange').toString()"
        font-weight="normal"
        font-size="s">
        There was an error processing your payment, please check your payment information and try again.
      </Paragraph>
    </div>
    <TextLink
      :class="b('terms-and-conditions').toString()"
      @click="emitTermsClicked">
      Payment Terms >
    </TextLink>
    <VSpacer size="xl" />
  </div>
</template>

<script>
/* global Stripe */
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

    /**
     * Show payment error div if
     * stripe returns error.
     */
    paymentError: {
      type: Boolean,
      default: false,
    },

    /** Amount to be displayed in
     * quick pay window
     */
    premiumPlanId: {
      type: String,
      default: 'plan_FmSGrwj2xKEwx5',
    },
  },

  data() {
    return {
      firstName: '',
      lastName: '',
      zipCode: '',
      showError: false,
      cardErrors: false,
      quickPayAvailable: false,
      quickPaySelected: false,
      checkedForQuickPay: false,
      quickPayType: 'apple',
      quickPayAmount: 499,
    };
  },

  computed: {
    zipsValidator() {
      return {
        zipsValidator,
      };
    },
    headingIsActive() {
      return 'light';
    },
  },

  watch: {
    paymentError(bool) {
      if (bool === true) this.showError = true;
    },
    premiumPlanId(id) {
      this.quickPayAmountSwitch(id);
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
    if (this.premiumPlanId !== '') {
      this.quickPayAmountSwitch(this.premiumPlanId);
    }
  },

  updated() {
    this.quickPayAmountSwitch(this.premiumPlanId);
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

      this.paymentRequest = this.stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Adopt-a-Pet.com Premium New Pet Alert',
          amount: this.quickPayAmount,
        },
        requestPayerName: true,
        requestPayerEmail: false,
      });

      // Check the availability of the Payment Request API first.
      this.paymentRequest.canMakePayment().then(result => {
        if (result) {
          if (result.applePay !== true) {
            this.dispatchTrackLoad('googlePayLoads');
            this.quickPayType = 'google';
          } else {
            this.dispatchTrackLoad('applePayLoads');
          }

          this.quickPaySelected = true;
          this.quickPayAvailable = true;
          this.checkedForQuickPay = true;
          return true;
        }
        this.quickPayAvailable = false;
        document.getElementById('payment-request-button').style.display = 'none';
        this.checkedForQuickPay = true;
        return false;
      });

      this.paymentRequest.on('token', ev => {
        this.$emit(
          'paymentInfo',
          {
            stripeToken: ev.token.id,
            zipCode: ev.token.card.address_zip,
            ev,
          },
        );
        ev.complete('success');
      });

      /**
       * Have to add these listeners manually, we need them
       * to track the clicking of these stripe fields. Unfortunately
       * @click does not work properly with these fields. We're using
       * blur instead of click because the click events did not seem
       * to work either.
       */
      this.cardNumber.addEventListener('blur', () => {
        this.dispatchTrackClick('cardNumber');
      });

      this.cardCvc.addEventListener('blur', () => {
        this.dispatchTrackClick('cardCVC');
      });

      this.cardExpiry.addEventListener('blur', () => {
        this.dispatchTrackClick('cardExpiration');
      });

      /**
       * Stripes default way of handling card errors. Super handy,
       * the messages are dynamic depending on what the error is.
       */
      this.cardNumber.addEventListener('change', event => {
        this.showError = false;
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

      /**
       * Had to add these to manually pick up on changes so we
       * can remove the paymentError text. Adding a change event
       * listener in the template for these stripe fields does not
       * work
       */
      this.cardExpiry.addEventListener('change', () => {
        this.showError = false;
      });

      this.cardCvc.addEventListener('change', () => {
        this.showError = false;
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
          this.showError = false;
        }
        if (result.error) {
          this.showError = true;
          this.$emit('tokenError:creation');
          this.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
        }
      });
    },
    removePaymentError() {
      this.showError = false;
    },
    /**
     * Dispatch analytics track with an eventAction
     * or eventLabel
     */
    dispatchTrackClick(event) {
      this.$syscall(`analytics/track/PaymentForm/${event}/click`);
    },
    dispatchTrackLoad(event) {
      this.$syscall(`analytics/track/PaymentForm/${event}/load`);
    },
    showPaymentRequestWindow() {
      if (this.quickPayType === 'apple') {
        this.dispatchTrackClick('applePay');
      } else {
        this.dispatchTrackClick('googlePay');
      }

      if (this.email === '' || this.email === undefined) {
        this.$emit('noEmail');
        return false;
      }

      this.paymentRequest.show();
      return true;
    },
    handleClickPayOption(option) {
      if (option === 'creditCard') {
        this.dispatchTrackClick('creditCard');
        this.quickPaySelected = false;
      } else {
        this.dispatchTrackClick('quickPay');
        this.quickPaySelected = true;
      }
    },
    quickPayAmountSwitch(id) {
      switch (id) {
        case 'plan_FmSGrwj2xKEwx5':
          this.quickPayAmount = 1000;
          break;
        case 'plan_GNSdel7hWq8aNc':
          this.quickPayAmount = 999;
          break;
        case 'plan_GDXBNQ7dmqUXZN':
          this.quickPayAmount = 499;
          break;
        case 'plan_GDX9FmuaU0V3Lk':
          this.quickPayAmount = 299;
          break;
        default:
          this.quickPayAmount = 1000;
      }


      // update quick pay window with amount
      if (this.paymentRequest) {
        this.paymentRequest.update({
          total: {
            label: 'Adopt-a-Pet.com Premium New Pet Alert',
            amount: this.quickPayAmount,
          },
        });
      }
    },
    emitTermsClicked() {
      this.$emit('paymentTermsClicked');
      this.dispatchTrackClick('termsAndConditions');
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
