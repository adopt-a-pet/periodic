import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  template: '<PasswordInput v-model="password" @change="$emit(\'change\')" />',
});

describe('elements/PasswordInput', () => {
  const wrapper = mount(TestComponent, {
    data() {
      return {
        password: 'abc123',
      };
    },
  });
  const passwordInput = wrapper.find('input[type="password"]');
  const validPassword = 'Zp5KU8N$6Z64u$L!';

  it('catches invalid password', () => {
    passwordInput.trigger('blur');
    expect(wrapper.text()).toContain('Invalid Password');
  });

  it('approves valid password', () => {
    passwordInput.setValue(validPassword);
    passwordInput.trigger('blur');
    expect(wrapper.html()).toContain('valid-tick');
  });

  it('emits password on change', () => {
    passwordInput.trigger('change');
    expect(wrapper.emitted('change').length).toBe(1);
  });
});
