import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const ITEMS = [
  { display: 'One', value: 1 },
  { display: 'Two', value: 2 },
  { display: 'Three', value: 3 },
];

const TestComponent = Vue.extend({
  data() {
    return {
      items: ITEMS,
    };
  },
  template: '<Dropdown :items="items" />',
});

describe('elements/Dropdown', () => {
  it('should start at index 0', () => {
    const wrapper = mount(TestComponent);
    const input = wrapper.find('input');

    // Should display the first item
    expect(input.element.value).toBe('One');
  });
});
