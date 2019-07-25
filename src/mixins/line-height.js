
const lineHeightIsToken = /compact|x-compact|x-x-compact/;

const props = {
  /**
   * The line height can be either a token name (compact) or a value (1.5)
   */
  lineHeight: {
    type: String,
    default: null,
  },
};

// These computeds are useful so in your components you can do:
//
// :class="{ lh: lineHeightToken }"
// :style="{ lineHeight: lineHeightNonToken }">
//
// So that whichever one is null (lineHeightToken or lineHeightNonToken) will get
// filtered out by Vue. Because lineHeightToken and lineHeightNonToken are
// are mutually exclusive, you will never have both non-null at the same time.
const computed = {
  lineHeightToken() {
    return lineHeightIsToken.test(this.lineHeight) ? this.lineHeight : null;
  },
  lineHeightNonToken() {
    return lineHeightIsToken.test(this.lineHeight) ? null : this.lineHeight;
  },
};

export default {
  props,
  computed,
};
