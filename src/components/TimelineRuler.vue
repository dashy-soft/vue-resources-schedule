<template>
  <canvas class="timeline-ruler" />
</template>
<script>
import dayjs from 'dayjs';
import HasResizableObserver from '../mixins/HasResizableObserver';

export default {
  props: {
    displayedStartDate: {
      type: Object,
      required: true,
    },
    displayedEndDate: {
      type: Object,
      required: true,
    },
  },
  mixins: [HasResizableObserver],
  mounted() {
    this.renderCanvas();
  },
  watch: {
    'displayedStartDate': 'renderCanvas',
    'displayedEndDate': 'renderCanvas',
  },
  methods: {
    renderCanvas () {
      const canvas = this.$el;
      const ctx = canvas.getContext('2d');
      const displayedStartDate = dayjs(this.displayedStartDate);
      const displayedEndDate = dayjs(this.displayedEndDate);

      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvas.clientHeight;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#999999';

      ctx.fillStyle = '#999999';
      ctx.textAlign = 'left';

      ctx.font = '14px Arial';

      const totalDays = displayedEndDate.diff(displayedStartDate, 'day');
      const notchWidth = canvasWidth / (totalDays + 1);

      let lastMonth = null;

      for (let day = 0; day <= totalDays; day++) {
        const currentDate = displayedStartDate.add(day, 'day');
        const x = (day / totalDays) * canvasWidth;
        const yStart = 40;
        const yEnd = 30;

        if (currentDate.month() !== lastMonth) {
          ctx.fillRect(x, 0, 1, canvasHeight);

          const monthName = currentDate.format('MMMM');
          ctx.textAlign = 'left';
          ctx.fillText(monthName, x + 5, 16);
          lastMonth = currentDate.month();
        }

        ctx.beginPath();
        ctx.moveTo(x, yStart);
        ctx.lineTo(x, yEnd);
        ctx.stroke();

        ctx.textAlign = 'center';

        if (notchWidth > 30) {
          const dayNumber = currentDate.date();
          ctx.fillText(dayNumber.toString(), x + notchWidth / 2, 35);
        }
      }
    },
    onResize() {
      this.renderCanvas();
    }
  },
};
</script>
<style scoped>
.timeline-ruler {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
