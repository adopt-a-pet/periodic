import { helpers } from 'vuelidate/lib/validators';

export const zipValidator = helpers.regex(
  'zip',
  /^[0-9]{5}(?:-[0-9]{4})?$/,
);

export const canadianZipValidator = helpers.regex(
  'canadianZip',
  /^([a-zA-Z0-9]{3}((\s)?[a-zA-Z0-9]{3})?$)$/,
);

export const zipsValidator = value => {
  const zipCode = /^[0-9]{5}(?:-[0-9]{4})?$/;
  const canadianZip = /^([a-zA-Z0-9]{3}((\s)?[a-zA-Z0-9]{3})?$)$/;
  let isPassing = false;

  if (zipCode.test(value) || canadianZip.test(value)) {
    isPassing = true;
  }

  return isPassing;
};
