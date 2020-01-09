import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  template: '<Modal :open.sync="modalIsOpen"><template slot="header">Modal Header</template><h1>Modal Body</h1></Modal>',
});

describe('elements/Modal', () => {
  const wrapper = mount(TestComponent, {
    data() {
      return {
        modalIsOpen: false,
      };
    },
  });

  it('opens', () => {
    expect(wrapper.isVisible()).toBe(false);
    wrapper.vm.modalIsOpen = true;
    expect(wrapper.isVisible()).toBe(true);
  });

  it('closes', () => {
    wrapper.find('.periodic-modal-popup__close').trigger('click');
    expect(wrapper.isVisible()).toBe(false);
  });
});
