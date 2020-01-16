<template>
  <div :class="b().toString()">
    <Paragraph
      font-size="s"
      font-weight="bold"
      line-height="$line-height-s-v2"
      class="periodic-info-box__heading"
      style="margin-bottom: 0">
      <Icon :name="icon" />
      <slot name="header" />
    </Paragraph>

    <Paragraph
      font-size="s"
      font-weight="normal"
      line-height="$line-height-s-v2"
      style="margin-bottom: 0">
      <slot name="message" />
    </Paragraph>

    <VSpacer size="xxxxs" />

    <Paragraph
      font-size="s"
      font-weight="bold"
      line-height="$line-height-s-v2"
      style="margin-bottom: 0">
      <TextLink @click="textLink">
        <slot name="link" />
      </TextLink>
    </Paragraph>
  </div>
</template>

<script>
export default {
  name: 'Infobox',
  blockName: 'info-box',
  status: 'under-review',
  release: '1.0.0',
  model: {
    event: 'change',
  },
  props: {
    /**
     * The icon to use for the tooltip.
     */
    icon: {
      type: String,
      default: 'info',
    },
  },
  data() {
    return {
      showBubble: false,
    };
  },
  methods: {
    textLink() {
      /**
       * When user clicks Text Link
       *
       * @event click:textLink
       * @type none
       */
      this.$emit('click:textLink');
    },
  },
};
</script>

<docs>
  ```jsx
  <Infobox
    icon="lightbulb">
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
  ```
</docs>
