import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);
const message = 'Hi!';
const TestComponent = Vue.extend({
  template: `<Tooltip>${message}</Tooltip>`,
});

describe('elements/TextInput', () => {
  const wrapper = mount(TestComponent, {
    data() {
      return {
        textInput: '',
      };
    },
  });

  it('reveals popup on hover', () => {
    wrapper.find('span').trigger('mouseover');
    expect(wrapper.text()).toContain(message);
  });
});
