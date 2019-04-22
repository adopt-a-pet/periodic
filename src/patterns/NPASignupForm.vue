<template>
  <div>
    <Heading
      level="h4"
      font-weight="light"
      line-height="compact">
      Set Up Your
    </Heading>

    <Heading
      level="h1"
      font-family="museo">
      New Pet Alert
    </Heading>

    <Paragraph>
      We'll email you when new pets that match your search criteria are added to our site!
      <TextLink>What is This?</TextLink>
    </Paragraph>

    <VSpacer
      size="xl" />

    <EmailInput
      v-model="email" />

    <VSpacer
      size="xl" />

    <VDivider />

    <VSpacer
      size="xl" />

    <Checkbox v-model="dontShow">
      <Paragraph
        :class="b('checkbox-text').toString()"
        font-size="xs"
        font-weight="light">
        Don’t show me this again.
      </Paragraph>
    </Checkbox>

    <VSpacer
      size="xl" />

    <TextLink
      always-underline
      color="gray-light">
      <Paragraph
        tag="span"
        font-size="m"
        font-family="museo"
        font-weight="bold">
        Skip
      </Paragraph>
    </TextLink>

    <Button>Save & Continue</Button>
  </div>
</template>

<script>
/**
 * NPA signup form
 */

export default {
  name: 'NPASignupForm',
  blockName: 'npa-signup',
  status: 'under-review',
  release: '1.0.0',

  props: {
  },

  data() {
    return {
      email: '',
      dontShow: false,
    };
  },

  computed: {
  },

  methods: {
  },
};
</script>

<docs>
```vue
<template>
  <NPASignupForm />
</template>
<script>
export default {
  data() {
    return {
    }
  }
};
</script>
```
</docs>
