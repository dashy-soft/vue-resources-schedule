<template>
  <div class="timeline-line-renderer-time-chunks">
    <el-tooltip v-for="c in chunks">
      <template #content>
        <slot
          name="tooltip"
          :chunk="c"
        />
      </template>
      <div class="chunk"
        :style="getChunkStyle(c)"
        @click="$emit('click-on-chunk', c)"
      />
    </el-tooltip>
  </div>
</template>
<script>
import dayjs from 'dayjs';

function datePourcentageInInterval(date, start, end) {
  if (typeof date === 'string') {
    date = dayjs(date);
  }
  if (typeof start === 'string') {
    start = dayjs(start);
  }
  if (typeof end === 'string') {
    end = dayjs(end);
  }
  return ( ( date - start ) / ( end - start ) ) * 100;
}

export default {
  props: {
    itemProps: {
      type: Object,
      required: true,
    },
    startDateKey: {
      type: String,
      default: 'start',
    },
    endDateKey: {
      type: String,
      default: 'end',
    },
    chunkStyle: {
      type: Function,
      default: undefined,
    },
  },
  computed: {
    chunks() {
      if (this.itemProps.item._grouped) {
        return this.itemProps.item.items;
      }
    },
    numberOfDays() {
      return this.itemProps.daysDisplayed;
    },
  },
  methods: {
    getChunkStyle(c) {
      let percentStart = datePourcentageInInterval(c[this.startDateKey], this.itemProps.displayedStartDate, this.itemProps.displayedEndDate);
      let percentEnd = datePourcentageInInterval(c[this.endDateKey], this.itemProps.displayedStartDate, this.itemProps.displayedEndDate);

      if (percentStart < 0) {
        percentStart = 0;
      }
      if (percentEnd > 100) {
        percentEnd = 100;
      }
      let style = `left: ${percentStart}%; right: ${100 - percentEnd}%;`;
      if (percentStart > 100 || percentEnd < 0) {
        return 'display: none;';
      }
      if (this.chunkStyle) {
        style += this.chunkStyle(c);
      }
      return style;
    }
  }
};
</script>
<style scoped>
.timeline-line-renderer-time-chunks {
  width: 100%;
  height: 100%;
  position: relative;
}
.chunk {
  position: absolute;
  background: #ff000050;
  background-blend-mode: multiply;
  border: 1px solid red;
  height: 100%;
  top: 0;
  opacity: 0.5;
  transition: opacity 0.4s;
}
.chunk:hover {
  opacity: 1;
}
</style>
