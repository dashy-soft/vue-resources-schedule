export default {
  data() {
    return {
      resizeObserver: undefined,
    };
  },
  mounted () {
    this.resizeObserver = new ResizeObserver(this.onResize);
    this.resizeObserver.observe(this.$el);
  },

  beforeDestroy () {
    this.resizeObserver.unobserve(this.$el);
  },
  methods: {
    onResize() {}
  },
};
