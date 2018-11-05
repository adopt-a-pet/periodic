<template>
<div data-login="unconfirm-user" class="login-popup unconfirm-user">
    <div data-login-confirm="login-confirm" class="login-confirm">
        <div data-login-confirm="login-confirm-left" class="login-confirm__column login-confirm__left">
            <div>
                <h1 data-login-confirm="login-confirm-heading" class="h1__heading h1--museo m-space--regular">Before You Can Log In...</h1>
                <h3 data-h3="heading-museo-xcompact" class="h3__heading m-space--small">You need to activate your account. Check your inbox for the activation email we sent.</h3>
                <h3 data-h3="heading-museo-xcompact" class="h3__heading m-space--regular">Can't find the email? Click below!</h3>
                <div data-login-confirm="login-confirm-button" class="login-popup__button">
                    <button @click="resend" data-button="login" class="button button--green">Re-send Activation Link</button>
                </div>
            </div>
        </div>

        <div data-login-confirm="login-confirm-right" class="login-confirm__column login-confirm__right">
            <img src="https://images-ra-staging.adoptapet.com/images/caton-chair.png">
        </div>
    </div>
</div>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: "",
    },
  },

  data() {
    return {}
  },

  methods: {
    // resend() {
    //   this.$http.get(`${VMLEndpoint}/utilities/emailInfo/${this.email}?type=emailid`).then(response => {
    //     const userID = response.body.body
    //
    //     this.$http
    //       .post("/uso/resend-activation-link", {
    //         email: this.email,
    //         uuId: userID,
    //         type: "resend_activation_email",
    //       })
    //       .then(() => this.$emit("state:next", "CONFIRM_ACCOUNT_SUCCESS"))
    //       .catch(() => this.$emit("state:next", "CONFIRM_ACCOUNT_SUCCESS"))
    //   })
    // },
  },
}
</script>
