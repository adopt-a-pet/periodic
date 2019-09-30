<template>
  <div>
    <a @click="prev">&#10094;</a>
    <a @click="next">&#10095;</a>
    <div class="slider-container">
      <transition-group
        name="fade"
        tag="div">
        <div
          v-for="i in [currentIndex]"
          :key="i">
          <img :src="currentImg">
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  blockName: 'slider',
  status: 'under-review',
  release: '1.0.0',
  props: {
    /**
     * An array of items for the slider
     */
    items: {
      type: Array,
      default: null,
    },

    /**
     * 'fade' or 'slide'
     */
    transition: {
      type: String,
      default: 'fade',
    },
  },
  data() {
    return {
      timer: null,
      currentIndex: 0,
    };
  },

  computed: {
    renderItems() {
      return this.items;
      // return this.items.map(item => (
      //   {
      //     ...item,
      //     id: this.radioId(item),
      //   }
      // ));
    },
    currentImg() {
      return this.items[Math.abs(this.currentIndex) % this.items.length];
    },
  },
  mounted() {
    this.startSlide();
  },

  methods: {
    startSlide() {
      this.timer = setInterval(this.next, 4000);
    },

    next() {
      this.currentIndex += 1;
    },
    prev() {
      this.currentIndex -= 1;
    },
  },
};
</script>

<docs>
```vue
<template>
  <div>
    <Slider
    :items="images" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: [
        "https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/05/15/14/27/eiffel-tower-768501_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/12/04/19/30/berlin-cathedral-1882397_1280.jpg"
      ]
    };
  },
};
</script>
```
</docs>
