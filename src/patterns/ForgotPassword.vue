<template>
  <!-- eslint-disable-max-len -->
  <div class="login-popup forgot-popup">
    <h1
      data-login="e-modal-form-heading"
      class="e-modal__form--heading forgot-heading__desktop">Forgot Password?</h1>
    <div class="container">
      <h1
        data-login="e-modal-form-heading"
        class="e-modal__form--heading forgot-heading__mobile">Forgot Password?</h1>
      <div class="forgot-password__left">
        <div
          data-login="login-popup-forgot-pwd"
          class="login-popup__forgot-pwd">

          <!-- eslint-disable-next-line max-len -->
          <p class="p__body-copy p--light m-space--regular">Enter your email address and we'll send you a link to reset your password.</p>

          <form @submit.prevent="submit">
            <EmailInput
              ref="email"
              :value.sync="email"
              name="email"
              label="Email" />

            <div class="m-space-t--sm-medium">
              <Button>Send My Reset Link</Button>
            </div>
          </form>
        </div>
      </div>
      <div class="forgot-password__middle">
        <div class="divider" />
      </div>
      <div class="forgot-password__right">
        <h3
          data-h3="heading-museo-xcompact"
          class="h3__heading">Can't log in with your email address?</h3>

        <!-- eslint-disable-next-line max-len -->
        <p class="p__body-copy p--light p-space-tb--small">Check to make sure there are no typos or misspellings in your entry, and make sure you are using the correct email address associated with your account.</p>
        <p class="p__body-copy p--light">Need more help? Email us at
          <a
            href="mailto:info@adoptapet.com"
            class="link-blue">info@adoptapet.com.</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  status: 'under-review',
  release: '1.0.0',
  data() {
    return {
      email: '',
    };
  },

  methods: {
    submit() {
      this.$refs.email
        .validate()
        .then(valid => {
          if (!valid) return;

          this.$emit('state:next', 'FORGOT_PASSWORD_SUBMIT');

          this.$http
            .post('/uso/user-forgot-password', { email: this.email })
            .then(() => this.$emit('state:next', 'FORGOT_PASSWORD_SUCCESS'))
            .catch(() => this.$emit('state:next', 'FORGOT_PASSWORD_ERROR'));
        })
        .catch(() => {});
    },
  },
};
</script>

<docs>
  ```jsx
  <div>
    <ForgotPassword />
  </div>
</docs>
