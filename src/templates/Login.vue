<template>
    <keep-alive>
      <component
        :is="showStep"
        @login:forgotPassword="forgotPassword"
        @login:success="loginSuccess"
      ></component>
    </keep-alive>
</template>

<script>
import layoutMixin from "@/mixins/layout"

export default {
  name: "Login",
  status: "under-review",
  release: "1.0.0",

  props: [],

  mixins: [layoutMixin],

  data() {
    return {
      showStep: "LoginForm", // null,
      email: "",
    }
  },
}
</script>

<docs>
  ```jsx
  <div style="background: #fff">
    <Login />
  </div>
</docs>
