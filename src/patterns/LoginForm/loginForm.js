import Vue from 'vue';

export default Vue.extend({
  name: 'LoginForm',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const section = this.$route.query.loginModalSection ? this.$route.query.loginModalSection : 'login';
    return {
      credsLoginError: null,
      email: null,
      password: null,
      section,
      socialLoginError: null,
    };
  },
  watch: {
    // Reset after every close
    open() { this.section = 'login'; },
  },
  methods: {
    /**
     * Social Login
     */
    async socialLogin(service) {
      // Reset the error every time we try
      this.socialLoginError = null;

      try {
        await this.$store.dispatch('session/socialLogin', { service });
      } catch (err) {
        return;
      }

      this.section = 'loginConfirmation';
    },

    /**
     * Email Login
     */
    async credsLogin() {
      const creds = { email: this.email, password: this.password };

      // Reset the error every time we try
      this.credsLoginError = null;

      try {
        await this.$store.dispatch('session/credsLogin', creds);
      } catch (err) {
        // If we want to differentiate errors, we can inspect err
        this.credsLoginError = 1;
        return;
      }

      this.section = 'loginConfirmation';
    },

    /**
     * Change Section
     */
    changeSection(section) {
      this.section = section;
      const query = JSON.parse(JSON.stringify(this.$route.query));
      query.loginModalSection = section;
      this.$router.push({ query });
      const modalLoginMain = document.getElementById('login-modal-main');
      modalLoginMain.scrollTop = 0;
    },
  },
});
