import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  methods: {
    onChange(userProfile) {
      this.$emit('change', userProfile);
    },
    onFieldChange(name, value) {
      this.$emit('field-change', name, value);
    },
  },
  template: '<UserSurvey @change="onChange" @field-change="onFieldChange" />',
});

describe('patterns/UserSurvey', () => {
  it('should emit change on hasChildren change', () => {
    const wrapper = mount(TestComponent);

    const hasChildren = wrapper.findAll('input[name="haschildren"]');

    hasChildren.at(0).trigger('click');

    const change = wrapper.emitted('change');

    expect(change).toHaveLength(1);
    expect(change[0][0]).toEqual({ hasChildren: true });

    hasChildren.at(1).trigger('click');

    expect(change[0][0]).toEqual({ hasChildren: false });
  });

  it('should emit field-change on homeType change', () => {
    const wrapper = mount(TestComponent);

    const hasChildren = wrapper.findAll('input[name="hometype"]');

    hasChildren.at(0).trigger('click');

    const fieldChange = wrapper.emitted('field-change');

    expect(fieldChange[0]).toEqual(['hometype', 'house']);
  });
});
