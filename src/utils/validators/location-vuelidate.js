import { helpers } from 'vuelidate/lib/validators';

export const zipValidator = helpers.regex(
  'zip',
  /^[0-9]{5}(?:-[0-9]{4})?$/,
);
