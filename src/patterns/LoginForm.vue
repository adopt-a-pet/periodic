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
                <div class="signup janrain_embed">
                    <div class="janrainContent">
                        <div class="janrainPage">
                            <ul class="providers" style="float: left; list-style-type: none; margin: 0px; padding: 0px;">
                                <li @click="janrainOpen('facebook')" id="janrain-facebook" role="button" style="list-style: none; height: 50px; width: 229px; margin-top: 0px; margin-right: 5px; margin-bottom: 5px; position: relative; border: 1px solid rgb(204, 204, 204); border-radius: 4px; cursor: pointer; white-space: nowrap; overflow: hidden; background-color: rgb(227, 227, 227); background-image: -webkit-linear-gradient(bottom, rgb(238, 238, 238), rgb(255, 255, 255));"><a tabindex="1" href="javascript:void(0);" class="gtm-uso-facebook" style="font-family: Helvetica, &quot;lucida grande&quot;, Verdana, sans-serif; font-size: 12px; line-height: 14px; margin-left: auto; margin-right: auto; text-decoration: none; display: block; padding-left: 5px; padding-right: 5px; text-align: left;"><span class="janrain-provider-icon-32 janrain-provider-icon-facebook" style="margin-top: 9px; background-color: transparent; margin-left: 5px;"></span><span class="janrain-provider-text-color-facebook" style="font-family: arial; cursor: pointer; margin-left: 7px; text-align: left; margin-top: 16px; font-size: 16px; line-height: 20px; vertical-align: top; display: inline-block;">Facebook</span></a></li>
                                <li @click="janrainOpen('googleplus')" id="janrain-googleplus" role="button" style="list-style: none; height: 50px; width: 229px; margin-top: 0px; margin-right: 5px; margin-bottom: 5px; position: relative; border: 1px solid rgb(204, 204, 204); border-radius: 4px; cursor: pointer; white-space: nowrap; overflow: hidden; background-color: rgb(227, 227, 227); background-image: -webkit-linear-gradient(bottom, rgb(238, 238, 238), rgb(255, 255, 255));"><a tabindex="3" href="javascript:void(0);" class="gtm-uso-googleplus" style="font-family: Helvetica, &quot;lucida grande&quot;, Verdana, sans-serif; font-size: 12px; line-height: 14px; margin-left: auto; margin-right: auto; text-decoration: none; display: block; padding-left: 5px; padding-right: 5px; text-align: left;"><span class="janrain-provider-icon-32 janrain-provider-icon-googleplus" style="margin-top: 9px; background-color: transparent; margin-left: 5px;"></span><span class="janrain-provider-text-color-googleplus" style="font-family: arial; cursor: pointer; margin-left: 7px; text-align: left; margin-top: 16px; font-size: 16px; line-height: 20px; vertical-align: top; display: inline-block;">Google</span></a></li>
                            </ul>
                            <ul v-if="!hideExtraSocial" class="providers" style="float: left; list-style-type: none; margin: 0px; padding: 0px;">
                                <li @click="janrainOpen('yahoo')" id="janrain-yahoo" role="button" style="list-style: none; height: 50px; width: 229px; margin-top: 0px; margin-right: 5px; margin-bottom: 5px; position: relative; border: 1px solid rgb(204, 204, 204); border-radius: 4px; cursor: pointer; white-space: nowrap; overflow: hidden; background-color: rgb(227, 227, 227); background-image: -webkit-linear-gradient(bottom, rgb(238, 238, 238), rgb(255, 255, 255));"><a tabindex="2" href="javascript:void(0);" class="gtm-uso-yahoo" style="font-family: Helvetica, &quot;lucida grande&quot;, Verdana, sans-serif; font-size: 12px; line-height: 14px; margin-left: auto; margin-right: auto; text-decoration: none; display: block; padding-left: 5px; padding-right: 5px; text-align: left;"><span class="janrain-provider-icon-32 janrain-provider-icon-yahoo" style="margin-top: 9px; background-color: transparent; margin-left: 5px;"></span><span class="janrain-provider-text-color-yahoo" style="font-family: arial; cursor: pointer; margin-left: 7px; text-align: left; margin-top: 16px; font-size: 16px; line-height: 20px; vertical-align: top; display: inline-block;">Yahoo!</span></a></li>
                                <li @click="janrainOpen('linkedin')" id="janrain-linkedin" role="button" style="list-style: none; height: 50px; width: 229px; margin-top: 0px; margin-right: 5px; margin-bottom: 5px; position: relative; border: 1px solid rgb(204, 204, 204); border-radius: 4px; cursor: pointer; white-space: nowrap; overflow: hidden; background-image: -webkit-linear-gradient(bottom, rgb(238, 238, 238), rgb(255, 255, 255));"><a tabindex="4" href="javascript:void(0);" class="gtm-uso-linkedin" style="font-family: Helvetica, &quot;lucida grande&quot;, Verdana, sans-serif; font-size: 12px; line-height: 14px; margin-left: auto; margin-right: auto; text-decoration: none; display: block; padding-left: 5px; padding-right: 5px; text-align: left;"><span class="janrain-provider-icon-32 janrain-provider-icon-linkedin" style="margin-top: 9px; background-color: transparent; margin-left: 5px;"></span><span class="janrain-provider-text-color-linkedin" style="font-family: arial; cursor: pointer; margin-left: 7px; text-align: left; margin-top: 16px; font-size: 16px; line-height: 20px; vertical-align: top; display: inline-block;">LinkedIn</span></a></li>
                            </ul>
                        </div>
                    </div>

                    <div v-if="allowExtraSocialExpand" data-link="accordion-link" class="h5__heading h5--bold m-space-r--tiny">
                        <span @click="toggleExtraSocial" class="accordion-link">
                            <svg class="m-space-r--tiny" v-bind:class="{'accordion-link-up': hideExtraSocial, 'accordion-link-down': !hideExtraSocial}">
                                <use xlink:href="#aap-icon-next"></use>
                            </svg>
                            <span class="link-blue" >{{ hideExtraSocial ? "Log in with LinkedIn and Yahoo" : "Close LinkedIn and Yahoo" }}</span>
                        </span>
                    </div>
                </div>
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
                            <span @click="$emit('login:forgotPassword')" class="link-blue gtm-uso-forgot-password">Click here.</span>
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
    toggleExtraSocial() {
      this.hideExtraSocial = !this.hideExtraSocial
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
