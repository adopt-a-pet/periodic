import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  methods: {
    onChange(userProfile) {
      this.$emit('change', userProfile);
    },
    onFieldChange(name, value) {
      this.$emit('field-change', name, value);
    },
  },
  template: '<UserSurvey @change="onChange" @field-change="onFieldChange" />',
});

describe('patterns/UserSurvey', () => {
  it('should not submit if a field is invalid', done => {
    const wrapper = mount(TestComponent);

    wrapper.find('form').trigger('submit');

    setTimeout(() => {
      expect(wrapper.emitted('submit')).toBeUndefined();
      expect(wrapper.emitted('validate:error').length).toBe(1);
      expect(wrapper.emitted('validate:error')[0][0]).toBe('input1');

      done();
    }, 100);
  });
});
