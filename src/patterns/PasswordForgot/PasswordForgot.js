export default {
  name: 'PasswordForgot',
  blockName: 'password-forgot',
  status: 'under-review',
  release: '1.0.0',
  data() {
    return {
      email: null,
      section: 'initial',
    };
  },
  methods: {
    /**
     * Request password reset link
     */
    async requestPasswordResetLink() {
      try {
        await this.$syscall('api/users/resetPassword');
      } catch (err) {
        this.error = true;
      }
      this.section = 'confirmation';
    },

    /**
     * On validation error
     */
    onValidateError() {
      //
    },
  },
};
