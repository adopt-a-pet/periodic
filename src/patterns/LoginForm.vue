<template>
  <div
    data-login="login-popup"
    class="login-popup">
    <h1
      data-login="e-modal-form-heading"
      class="e-modal__form--heading m-space--medium">Log In</h1>
    <section>
      <div
        data-login="login-popup-section"
        class="login-popup__section">
        <div class="login-popup__account m-space--regular">
          <span>No account?</span>
          <a
            href="/uso/signup/accounttype"
            data-link="link-blue"
            class="link-blue gtm-uso-sign-up">Sign up here.</a>
        </div>

        <div
          data-login="login-popup-left"
          class="login-popup__column login-popup__left">
          <div class="signup janrain_embed">
            <div class="janrainContent">
              <div class="janrainPage">
                <ul
                  class="providers"
                  style="float: left; list-style-type: none; margin: 0px; padding: 0px;" />
                <ul
                  v-if="!hideExtraSocial"
                  class="providers"
                  style="float: left; list-style-type: none; margin: 0px; padding: 0px;" />
              </div>
            </div>

            <div
              v-if="allowExtraSocialExpand"
              data-link="accordion-link"
              class="h5__heading h5--bold m-space-r--tiny">
              <span
                class="accordion-link"
                @click="toggleExtraSocial">
                <svg
                  :class="{'accordion-link-up': hideExtraSocial, 'accordion-link-down': !hideExtraSocial}"
                  class="m-space-r--tiny">
                  <use xlink:href="#aap-icon-next" />
                </svg>
                <span class="link-blue">
                  {{ hideExtraSocial ? "Log in with LinkedIn and Yahoo" : "Close LinkedIn and Yahoo" }}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div
          data-login="login-popup-middle"
          class="login-popup__middle"><hr
            class="vertical-divider"
            data-content="or"></div>

        <div
          data-login="login-popup-right"
          class="login-popup__column login-popup__right">
          <div
            v-if="stateName !== 'login_submit'"
            data-login="login-popup-adoptapet">
            <form @submit.prevent="loginSubmit">
              <div class="login-popup-adoptapet__container">
                <EmailInput />
                <PasswordInput />
              </div>

              <span
                v-if="stateName === 'error_social_account'"
                class="form__error-msg--bottom p-space-t--tiny">

                Something’s wrong! If you have previously signed up with a social account,
                log in with one of the buttons above.<br>
                Forgot your password?
                <span
                  class="link-blue"
                  @click="$emit('state:next', 'FORGOT_PASSWORD')">Click here.</span>
              </span>

              <span
                v-else-if="stateName === 'error_nonexisting_account'"
                class="form__error-msg--bottom p-space-t--tiny">

                We don’t have an account
                associated with this email. Please
                <a
                  href="/uso/signup/accounttype"
                  data-link="link-blue"
                  class="link-blue">sign up.</a></span>

              <span
                v-else-if="stateName === 'error_login_other'"
                class="form__error-msg--bottom p-space-t--tiny">

                Something’s wrong! Please make sure you have the correct email address or
                <a
                  href="/uso/signup/accounttype"
                  data-link="link-blue"
                  class="link-blue">sign up</a> here.</span>

              <VSpacer size="xl" />
              <Button>Log In</Button>
            </form>

            <div
              v-if="stateName !== 'login_submit'"
              class="login-popup__forgot-rehome m-space-t--tiny">
              <div class="login-popup__forgot-link">
                <span>Forgot your password or email isn't working?</span>
                <span
                  class="link-blue gtm-uso-forgot-password"
                  @click="$emit('login:forgotPassword')">Click here.</span>
              </div>
              <div class="login-popup__rehome p-space-t--nano">
                <span>Rehome member?</span>
                <a
                  href="https://rehome.adoptapet.com/auth/login"
                  data-link="link-blue"
                  class="link-blue gtm-uso-login-rehome">Log in here.</a>
              </div>
            </div>
          </div>

          <div
            v-if="stateName === 'login_submit'"
            data-login="login-popup-right-signin"
            class="login-popup__right--signin">
            <span>Signing in ...</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const EMAIL_FIELD_ERROR_STATES = ['error_social_account', 'error_nonexisting_account'];

export default {
  name: 'LoginForm',
  status: 'under-review',
  release: '1.0.0',

  components: {
    // 'janrain-login': require('../../../../janrain-login/index.vue')
  },
  // props: [ 'layout' ],

  mixins: [
    // require('../../../../../../js/shared/mixins/server-validated-email'),
    // require('../../../../../../js/shared/mixins/fsm'),
    // require('../../../../../../js/shared/mixins/user-login'),
    // require('./fsm/handlers') // Handlers for state transitions
  ],

  props: {
    hideExtraSocial: {
      type: Boolean,
      default: true,
    },

    allowExtraSocialExpand: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
    };
  },

  computed: {
    emailFieldErrorState() {
      return EMAIL_FIELD_ERROR_STATES.includes(this.stateName);
    },
  },

  methods: {
    toggleExtraSocial() {
      this.hideExtraSocial = !this.hideExtraSocial;
    },
    // loginSubmit() {
    //     Promise.all([
    //         this.$refs.email.validate(),
    //         this.$refs.password.validate()
    //     ])
    //     .then(([ validEmail, validPassword ]) =>
    //         this.nextState('LOGIN_SUBMIT', { validEmail, validPassword })
    //     )
    //     .catch(() => {});
    // }
  },
};
</script>

<docs>
  ```jsx
  <div style="background: #fff">
    <LoginForm />
  </div>
</docs>
