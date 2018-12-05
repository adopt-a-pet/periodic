// A set of filters that are useful in Vue templates
// For example: {{ display | capitalize }}

exports.filters = {
  // Function to Capitalize the value
  capitalize(value) {
    if (!value) return '';
    const stringValue = value.toString();
    return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
  },
};
