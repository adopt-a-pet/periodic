// A set of filters that are useful in Vue templates
// For example: {{ display | capitalize }}

export default {
  filters: {
    /**
     * Capitalize the value
     */
    capitalize(value) {
      if (!value) return '';
      const stringValue = value.toString();
      return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
    },

    /**
     * Order an array of age objects
     */
    orderAges(ages) {
      const agesOrdered = [];
      const order = [
        'Any', 'Baby', 'Puppy', 'Kitten', 'Young', 'Adult', 'Senior',
      ];
      order.forEach(key => {
        ages.forEach(age => {
          if (age.display === key) {
            agesOrdered.push(age);
          }
        });
      });
      return agesOrdered;
    },
  },
};
