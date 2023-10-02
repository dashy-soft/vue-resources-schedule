<template>
  <canvas class="timeline-line-renderer-days-separator" />
</template>
<script>
import dayjs from 'dayjs';
import HasResizableObserver from '../mixins/HasResizableObserver';

export default {
  props: {
    itemProps: {
      type: Object,
      required: true,
    },
  },
  mixins: [HasResizableObserver],
  mounted() {
    this.renderCanvas();
  },
  watch: {
    'itemProps.displayedStartDate': 'renderCanvas',
    'itemProps.displayedEndDate': 'renderCanvas',
  },
  methods: {
    renderCanvas () {
      const canvas = this.$el;
      const ctx = canvas.getContext('2d');
      const displayedStartDate = dayjs(this.itemProps.displayedStartDate);
      const displayedEndDate = dayjs(this.itemProps.displayedEndDate);

      console.log('onResize!', canvas.clientWidth)

      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvas.clientHeight;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#cccccc';

      const totalDays = displayedEndDate.diff(displayedStartDate, 'day');
      const notchWidth = canvasWidth / (totalDays + 1);

      let lastMonth = null;

      for (let day = 0; day <= totalDays; day++) {
        const currentDate = displayedStartDate.add(day, 'day');
        const x = (day / totalDays) * canvasWidth;
        const yStart = 0;
        const yEnd = 10;

        if (currentDate.month() !== lastMonth) {
          ctx.strokeStyle = '#cccccc';
          ctx.fillRect(x, 0, 1, canvasHeight);
          lastMonth = currentDate.month();
        }

        ctx.beginPath();
        ctx.moveTo(x, yStart);
        ctx.lineTo(x, yEnd);
        ctx.stroke();
      }
    },
    onResize() {
      this.renderCanvas();
    }
  },
};
</script>
<style scoped>
.timeline-line-renderer-days-separator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
