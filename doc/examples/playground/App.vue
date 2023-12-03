<template>
  <Timeline
    :data="data"
    :group-by-function="(item) => item.category"
    :aggregate-function="aggregateFunction"
    :line-height="68"
    start-date="2023-09-01"
    end-date="2023-09-10"
  >
    <template #sidebar-item="props">
      <span style="padding-left: 10px; padding-right: 10px;">
        {{props.item.category}}
        ({{props.item.duration}} minutes)
      </span>
    </template>
    <template #item="props">
      <TimelineLineRendererDaysSeparator :item-props="props" />
      <TimelineLineRendererTimeChunks
        :item-props="props"
        :startDateKey="'start'"
        :endDateKey="'end'"
      >
        <template #tooltip="{ chunk }">
          tooltip
        </template>
      </TimelineLineRendererTimeChunks>
    </template>
  </Timeline>
</template>
<script>
import Timeline from "vue-resources-schedule/components/Timeline.vue";
import TimelineLineRendererDaysSeparator from 'vue-resources-schedule/components/TimelineLineRendererDaysSeparator.vue';
import TimelineLineRendererTimeChunks from 'vue-resources-schedule/components/TimelineLineRendererTimeChunks.vue';
import dayjs from 'dayjs';

export default {
  components: {
    Timeline,
    TimelineLineRendererDaysSeparator,
    TimelineLineRendererTimeChunks,
  },
  data() {
    return {
      data: [{
        category: 'development',
        start: '2023-09-01 09:30',
        end: '2023-09-01 15:30',
      }, {
        category: 'meetings',
        start: '2023-09-01 11:30',
        end: '2023-09-05 15:30',
      }, {
        category: 'development',
        start: '2023-09-03 17:30',
        end: '2023-09-09 19:30',
      }, {
        category: 'HR',
        start: '2023-09-01 17:30',
        end: '2023-09-03 19:30',
      }, {
        category: 'HR',
        start: '2023-09-05 17:30',
        end: '2023-09-07 19:30',
      }]
    };
  },
  methods: {
    aggregateFunction(accumulator, item) {
      console.log('aggregate', accumulator, item)
      accumulator.category = item.category;
      if (accumulator.duration == undefined) {
        accumulator.duration = 0
      }
      const duration = dayjs(item.end).diff(dayjs(item.start), 'minute');
      console.log(item, duration)
      accumulator.duration += duration;
      return accumulator;
    },
  },
};
</script>
<style scoped>
.timeline :deep(.el-card) {
  margin-bottom: 10px;
}
</style>
