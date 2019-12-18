import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  template: `
    <Banner>
      <template slot="header">Top Header</template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </Banner>`,
});

describe('elements/Banner', () => {
  it('accordion click', () => {
    const wrapper = mount(TestComponent);
    const main = wrapper.find('.main');
    setTimeout(() => {
      expect(main.isVisible()).toBe(false);
      wrapper.find('.header').trigger('click');
      expect(main.isVisible()).toBe(true);
    });
  });
});
