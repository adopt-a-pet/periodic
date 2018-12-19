<template>
  <component
    :is="tag"
    :href="href"
    :type="type"
    :class="[b({ color, size }).toString(), state]"
    :disabled="disabled"
    @click="click">
    <slot />
  </component>
</template>

<script>
/**
 * Buttons are generally used for interface actions. Suitable for all-purpose use.
 * Defaults to green/large.
 */
export default {
  name: 'Button',
  blockName: 'button',
  status: 'under-review',
  release: '1.0.0',
  props: {
    /**
     * The html element used for the button.
     * `button, a`
     */
    tag: {
      type: String,
      default: 'button',
      validator: value => value.match(/(button|a)/),
    },
    /**
     * The size of the button.
     * `small, large`
     */
    size: {
      type: String,
      default: 'large',
      validator: value => value.match(/(small|large)/),
    },
    /**
     * When setting the button’s type to a link, use this option to give a href.
     */
    href: {
      type: String,
      default: null,
    },
    /**
     * Set the type to “button” to prevent button clicks from submiting a form.
     * `button, submit`
     */
    type: {
      type: String,
      default: null,
      validator: value => value.match(/(button|submit)/),
    },
    /**
     * Manually trigger various states of the button.
     * `hover, active, focus`
     */
    state: {
      type: String,
      default: null,
      validator: value => value.match(/(hover|active|focus)/),
    },
    /**
     * Color allows us to easily change the color.
     * `color`
     */
    color: {
      type: String,
      default: 'green',
      validator: value => value.match(/(green|blue|orange)/),
    },
    /**
     * Is the button disabled?
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    click() {
      if (this.disabled) return;
      /**
       * Click event
       *
       * @event click
       * @type none
       */
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
@include b('button') {
  display: block;
  background-color: color(awhite, base);
  @include border(2px solid color(agray, light));
  border-radius: $border-radius;
  color: color(agray, light);
  font-family: $font_museo;
  font-weight: $weight_bold;
  @include rem-fallback('font-size', 20px);
  cursor: pointer;
  line-height: 2.7;
  width: 100%;
  transition: background $duration_medium ease;
  margin: 0 auto;
  padding: 0;

  &:focus {
    outline: 0;
  }

  &:hover {
    background-color: $color_forty_per_lighter_grey;
    @include border(2px solid color(agray, light));
    color: color(agray, light);
  }

  &:active {
    background-color: color(agray, light);
    color: color(awhite, base);
  }

  @include modifier('size') {
    &-small {
      line-height: 2.5;
      @include rem-fallback('font-size', 16px);
    }
  }

  @include modifier('color') {
    &-green {
      background-color: color(agreen, base);
      border: 0;
      line-height: 2.9;
      color: color(awhite, base);

      &:hover,
      &.hover {
        background-color: color(agreen, dark);
        border: 0;
        box-shadow: $btn-shade-hover;
        color: color(awhite, base);
      }

      &:active,
      &.active {
        background-color: color(agreen, base);
        box-shadow: $btn-shade-active;
      }
    }

    &-orange {
      background-color: color(aorange, base);
      border: 0;
      line-height: 2.9;
      color: color(awhite, base);

      &:hover,
      &.hover {
        background-color: color(aorange, dark);
        border: 0;
        box-shadow: $btn-shade-hover;
        color: color(awhite, base);
      }

      &:active,
      &.active {
        background-color: color(aorange, base);
        box-shadow: $btn-shade-active;
      }
    }

    &-blue {
      background-color: color(ablue, base);
      border: 0;
      line-height: 2.9;
      color: color(awhite, base);

      &:hover,
      &.hover {
        box-shadow: $btn-shade-hover;
        border: 0;
        background-color: color(ablue, dark);
        color: color(awhite, base);
      }

      &:active,
      &.active {
        box-shadow: $btn-shade-active;
        background-color: color(ablue, base);
      }
    }
  }

  &[disabled] {
    background-color: color(agray, lighter);
    border: 0;
    line-height: 2.9;
    cursor: not-allowed;
    pointer-events: none;
    color: color(awhite);
  }

  @include element('image') {
    float: left;
    @include rem-fallback('width', 58px);
    @include rem-fallback('height', 58px);
    display: flex;
  }

  @include element('icon') {
    fill: color(awhite);
    @include rem-fallback('width', 24px);
    @include rem-fallback('height', 23px);
    display: inline-flex;
    vertical-align: middle;
    @include rem-fallback('margin-right', 5px);
  }

  // @include element ('ask-about-me') {
  //     font-family: $museo700;
  //     color: color(awhite);
  //     @include font-size(20);
  //     @include rem-fallback('line-height', 26px);
  //     @include rem-fallback('letter-spacing', -.25px);
  // }
}
</style>

<docs>
```vue
<template>
  <div>
    <Button>Default</Button> <br />
    <Button state="hover">:hover</Button> <br />
    <Button state="active">:active</Button> <br />
    <Button size="small">Small</Button> <br />
    <Button :disabled="true">Disabled</Button> <br />
    <Button :disabled="true" size="small">Small Disabled</Button> <br />
    <Button color="blue">Blue</Button> <br />
    <Button color="blue" size="small">Small Blue</Button> <br />
    <Button color="orange">Orange</Button> <br />
    <Button color="orange" size="small">Small Orange</Button> <br />
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
};
</script>
```
</docs>
