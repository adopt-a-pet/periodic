export default {
  name: 'LoginForm',
  blockName: 'login-form',
  status: 'under-review',
  release: '1.0.0',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    section: {
      type: String,
      default: 'login',
    },
  },
  data() {
    return {
      credsLoginError: null,
      email: null,
      password: null,
      sec: this.section,
      socialLoginError: null,
    };
  },
  methods: {
    /**
     * Social Login
     */
    async socialLogin(service) {
      // Reset the error every time we try
      this.socialLoginError = null;

      try {
        await this.$syscall('session/socialLogin', { service });
      } catch (err) {
        return;
      }

      this.sec = 'loginConfirmation';
    },

    /**
     * Email Login
     */
    async credsLogin() {
      const creds = { email: this.email, password: this.password };

      // Reset the error every time we try
      this.credsLoginError = null;

      try {
        await this.$syscall('session/credsLogin', creds);
      } catch (err) {
        // If we want to differentiate errors, we can inspect err
        this.credsLoginError = 1;
        return;
      }

      this.sec = 'loginConfirmation';
    },

    /**
     * Change Section
     */
    changeSection(section) {
      this.sec = section;
      this.$emit('changeSection', section);
    },
  },
};
