// The code here is only for the layout switcher. Nothing else should go here.

function data() {
  return {
    layout: 'desktop',
  };
}

const computed = {
  // layoutChecks can be overridden to add more layout sizes
  layoutChecks() {
    return [
      { name: 'desktop', check: this.layoutIsDesktop },
      { name: 'tablet', check: this.layoutIsTablet },
      { name: 'mobile', check: this.layoutIsMobile },
    ];
  },
};

const methods = {
  // These are methods so the user can overwrite them if needed
  layoutIsDesktop() {
    return window.matchMedia('(min-width: 977px)').matches;
  },
  layoutIsTablet() {
    return window.matchMedia('(min-width: 750px) AND (max-width: 976px)').matches;
  },
  layoutIsMobile() {
    return window.matchMedia('(max-width: 749px)').matches;
  },

  // Find the first matching media query. Order is based on LAYOUT_CHECK_ORDER.
  resolveLayoutName() {
    const layout = this.layoutChecks.find(n => n.check());
    return layout && layout.name;
  },

  setLayoutName() {
    this.layout = this.resolveLayoutName();
  },
};

function created() {
  this.setLayoutName();
  window.addEventListener('resize', this.setLayoutName.bind(this));
}

export default {
  computed,
  created,
  data,
  methods,
};
