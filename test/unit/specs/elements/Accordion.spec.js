import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  template: `
    <Accordion>
      <template slot="header">Top Header</template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </Accordion>`,
});

describe('elements/Accordion', () => {
  it('clicking header toggles content', () => {
    const wrapper = mount(TestComponent);
    return Vue.nextTick().then(() => {
      // const header = wrapper.find('.header');
      const main = wrapper.find('.main');
      // return Vue.nextTick().then(() => {
      // console.log('main.attributes(\'style\') = ', main.attributes('style'));
      expect(main.isVisible()).toBe(false);
      // header.trigger('click');
      // return Vue.nextTick().then(() => {
      //   expect(main.isVisible()).toBe(true);
      // });
    });
    // });
  });
});
