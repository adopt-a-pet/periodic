<template>
<div data-login="login-popup" class="login-popup">
    <h1 data-login="e-modal-form-heading" class="e-modal__form--heading m-space--medium">Log In</h1>
    <section>
        <div data-login="login-popup-section" class="login-popup__section">
            <div class="login-popup__account m-space--regular">
                <span>No account?</span>
                <a href="/uso/signup/accounttype" data-link="link-blue" class="link-blue gtm-uso-sign-up">Sign up here.</a>
            </div>

            <div data-login="login-popup-left" class="login-popup__column login-popup__left">
                <!-- <janrain-login @login:success="nextState('SOCIAL_LOGIN_SUCCESS')"></janrain-login> -->
            </div>

            <div data-login="login-popup-middle" class="login-popup__middle"><hr class="vertical-divider" data-content="or"></div>

            <div data-login="login-popup-right" class="login-popup__column login-popup__right">
                <div data-login="login-popup-adoptapet" v-if="stateName !== 'login_submit'">
                    <form @submit.prevent="loginSubmit">
                        <div class="login-popup-adoptapet__container">
                            <EmailInput />
                            <PasswordInput />
                        </div>

                        <span
                          v-if="stateName === 'error_social_account'"
                          class="form__error-msg--bottom p-space-t--tiny">Something’s wrong! If you have previously signed up with a social account, log in with one of the buttons above.<br>Forgot your password? <span @click="$emit('state:next', 'FORGOT_PASSWORD')" class="link-blue">Click here.</span></span>

                        <span
                          v-else-if="stateName === 'error_nonexisting_account'"
                          class="form__error-msg--bottom p-space-t--tiny">We don’t have an account associated with this email. Please <a href="/uso/signup/accounttype" data-link="link-blue" class="link-blue">sign up.</a></span>

                        <span
                          v-else-if="stateName === 'error_login_other'"
                          class="form__error-msg--bottom p-space-t--tiny">Something’s wrong! Please make sure you have the correct email address or <a href="/uso/signup/accounttype" data-link="link-blue" class="link-blue">sign up</a> here.</span>

                        <VSpacer size="xl" />
                        <Button>Log In</Button>
                    </form>

                    <div class="login-popup__forgot-rehome m-space-t--tiny" v-if="stateName !== 'login_submit'">
                        <div class="login-popup__forgot-link">
                            <span>Forgot your password or email isn't working?</span>
                            <span @click="$emit('state:next', 'FORGOT_PASSWORD')" class="link-blue gtm-uso-forgot-password">Click here.</span>
                        </div>
                        <div class="login-popup__rehome p-space-t--nano">
                            <span>Rehome member?</span>
                            <a href="https://rehome.adoptapet.com/auth/login" data-link="link-blue" class="link-blue gtm-uso-login-rehome">Log in here.</a>
                        </div>
                    </div>
                </div>

                <div data-login="login-popup-right-signin" class="login-popup__right--signin" v-if="stateName === 'login_submit'">
                    <span>Signing in ...</span>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
const EMAIL_FIELD_ERROR_STATES = ["error_social_account", "error_nonexisting_account"]

export default {
  name: "LoginForm",
  status: "under-review",
  release: "1.0.0",
  // props: [ 'layout' ],

  mixins: [
    // require('../../../../../../js/shared/mixins/server-validated-email'),
    // require('../../../../../../js/shared/mixins/fsm'),
    // require('../../../../../../js/shared/mixins/user-login'),
    // require('./fsm/handlers') // Handlers for state transitions
  ],

  data() {
    return {
      credentials: {
        email: "",
        password: "",
      },
    }
  },

  computed: {
    emailFieldErrorState() {
      return EMAIL_FIELD_ERROR_STATES.includes(this.stateName)
    },
  },

  methods: {
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

  components: {
    // 'janrain-login': require('../../../../janrain-login/index.vue')
  },
}
</script>

<docs>
  ```jsx
  <div style="background: #fff">
    <LoginForm />
  </div>
</docs>
