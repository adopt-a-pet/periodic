import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const ITEMS = [{ display: 'Green', value: 'a' }, { display: 'Blue', value: 'b' }];

const TestComponent = Vue.extend({
  data() {
    return {
      items: ITEMS,
      selected: null,
    };
  },
  methods: {
    onChange(v) {
      this.$emit('change', v);
    },
  },
  template: '<RadioGroup @change="onChange" :items="items" v-model="selected"></RadioGroup>',
});

describe('elements/RadioGroup', () => {
  it('input click', () => {
    const wrapper = mount(TestComponent);
    const inputs = wrapper.findAll('input[type="radio"]');

    inputs.at(0).trigger('click');

    expect(wrapper.emitted('change').length).toBe(1);
    expect(wrapper.emitted('change')[0]).toEqual(['a']);
  });

  it('click both buttons', () => {
    const wrapper = mount(TestComponent);
    const inputs = wrapper.findAll('input[type="radio"]');

    inputs.at(0).trigger('click');

    expect(wrapper.emitted('change').length).toBe(1);
    expect(wrapper.emitted('change')[0]).toEqual(['a']);

    inputs.at(1).trigger('click');

    expect(wrapper.emitted('change').length).toBe(2);
    expect(wrapper.emitted('change')[1]).toEqual(['b']);
  });

  it('label click works just as the buttons', () => {
    const wrapper = mount(TestComponent);
    const inputs = wrapper.findAll('input[type="radio"]');
    const labels = wrapper.findAll('label');

    inputs.at(1).trigger('click');

    expect(wrapper.emitted('change').length).toBe(1);
    expect(wrapper.emitted('change')[0]).toEqual(['b']);
    expect(inputs.at(0).element.checked).toBe(false);
    expect(inputs.at(1).element.checked).toBe(true);

    labels.at(0).trigger('click');

    expect(wrapper.emitted('change').length).toBe(2);
    expect(wrapper.emitted('change')[1]).toEqual(['a']);
    expect(inputs.at(0).element.checked).toBe(true);
    expect(inputs.at(1).element.checked).toBe(false);
  });

  it('works with v-model', () => {
    const wrapper = mount(TestComponent);
    const inputs = wrapper.findAll('input[type="radio"]');

    inputs.at(0).setChecked();

    expect(wrapper.vm.selected).toBe('a');

    inputs.at(1).setChecked();

    expect(wrapper.vm.selected).toBe('b');
  });
});
