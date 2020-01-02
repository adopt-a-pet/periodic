import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  template: '<TextLink href="/" @click="$emit(\'click\')" />',
});

describe('elements/TextLink', () => {
  it('textLink click', () => {
    const wrapper = mount(TestComponent);

    wrapper.find('a').trigger('click');

    expect(wrapper.emitted('click').length).toBe(1);
  });
});
