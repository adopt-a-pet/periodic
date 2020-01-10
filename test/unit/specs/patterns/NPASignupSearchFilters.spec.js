import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  data() {
    return {
      filters: {
        age: ['young', 'senior'],
        clan: 1,
        color: [153],
        geoRange: 10,
        hair: ['short'],
        sex: ['f'],
        size: [1, 2],
        zipCode: '90210',
      },
    };
  },
  template: '<NPASignupSearchFilters :filters=\'filters\' @click:saveAndClose="close" />',
});

describe('patterns/InfoBox', () => {
  it('should trigger event on click text link', () => {
    const wrapper = mount(TestComponent);
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted('close').length).toBe(1);
  });
});
