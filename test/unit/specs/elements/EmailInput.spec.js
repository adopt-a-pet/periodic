import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  template: '<EmailInput v-model="email" @change="$emit(\'change\')" />',
});

describe('elements/EmailInput', () => {
  const wrapper = mount(TestComponent, {
    data() {
      return {
        email: 'foo',
      };
    },
  });
  const emailInput = wrapper.find('input[type="email"]');
  const validEmail = 'steve@adoptapet.com';

  it('catches invalid email address', () => {
    emailInput.trigger('blur');
    expect(wrapper.text()).toContain('Invalid Email');
  });

  it('approves valid email address', () => {
    emailInput.setValue(validEmail);
    emailInput.trigger('blur');
    expect(wrapper.html()).toContain('valid-tick');
  });

  it('emits email address on change', () => {
    emailInput.trigger('change');
    expect(wrapper.emitted('change').length).toBe(1);
  });
});
