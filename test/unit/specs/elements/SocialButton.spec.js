import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  template: '<div><SocialButton class="social-button" service="google" @click="$emit(\'click\')">Google</SocialButton><SocialButton class="social-button" service="facebook" @click="$emit(\'click\')">Facebook</SocialButton></div>',
});

describe('elements/SocialButton', () => {
  it('socialButton click', () => {
    const wrapper = mount(TestComponent);
    const buttons = wrapper.findAll('.social-button');
    Object.keys(buttons).forEach(button => {
      button.trigger('click');
      expect(wrapper.emitted('click').length).toBe(1);
    });
  });
});
