<template>
    <keep-alive>
      <component
        :is="showStep"
      ></component>
    </keep-alive>
</template>

<script>
export default {
  name: "Login",
  status: "under-review",
  release: "1.0.0",

  props: [],

  mixins: [
    // require('../../../js/shared/mixins/layout'), // Layout switcher
  ],

  data() {
    return {
      showStep: "LoginForm", // null,
      email: "",
    }
  },

  components: {
    // 'ConfirmAccount': require('./subcomponents/steps/confirm-account.vue'),
    // 'confirm-account-success': require('./subcomponents/steps/confirm-account-success.vue'),
    // 'forgot-password': require('./subcomponents/steps/forgot-password.vue'),
    // 'forgot-password-submitting': require('./subcomponents/steps/forgot-password-submitting.vue'),
    // 'forgot-password-success': require('./subcomponents/steps/forgot-password-success.vue')
  },
}
</script>

<docs>
  ```jsx
  <div style="background: #fff">
    <Login />
  </div>
</docs>
