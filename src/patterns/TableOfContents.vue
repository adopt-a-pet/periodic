<template>
  <div :class="b().toString()">
    <Heading
      level="h3"
      font-weight="bold">
      {{ heading }}
    </Heading>
    <nav>
      <li
        v-for="(link, index) in links"
        :key="index">
        <TextLink :href="link.href">
          {{ link.display }}
        </TextLink>
      </li>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'TableOfContents',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'table-of-contents',

  props: {
    /**
      The title of the table.
    */
    heading: {
      type: String,
      default: null,
    },
    /**
      Text links included in the table.
    */
    links: {
      type: Array,
      default: null,
    },
  },
};
</script>

<docs>
  ```vue
  <div>
    <TableOfContents
      heading="Hello!"
      :links='[
        { display: "linkOne", href: "https://google.com" },
        { display: "linkTwo", href: "https://adoptapet.com" },
        { display: "linkThree", href: "https://adoptapet.com" },
        { display: "linkFour", href: "https://adoptapet.com" },
        { display: "linkFive", href: "https://adoptapet.com" },
        { display: "linkSix", href: "https://adoptapet.com" },
      ]' />
  </div>
  ```
</docs>
