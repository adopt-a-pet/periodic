import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  template: `
    <Infobox
      icon="lightbulb"
      @click:textLink="$emit('click:textLink')">
      <template slot="header">
        Pro tip
      </template>
      <template slot="message">
        To get the most out of your Premium experience, choose 2 or more filters.
      </template>
      <template slot="link">
        Edit Filters >
      </template>
    </Infobox>
  `,
});

describe('patterns/InfoBox', () => {
  it('should trigger event on click text link', () => {
    const wrapper = mount(TestComponent);
    wrapper.find('.periodic-textlink').trigger('click');
    expect(wrapper.emitted('click:textLink').length).toBe(1);
  });
});
