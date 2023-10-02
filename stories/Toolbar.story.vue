<template>
  <Story title="Toolbar">
    <Timeline
      ref="timeline"
      :data="data"
      :group-by-function="(item) => item.category"
      :line-height="68"
      v-model:start-date="startDate"
      v-model:end-date="endDate"
    >
      <template #toolbar>
        <div class="toolbar">
          <a @click="prevMonth">
            prevMonth
          </a>
          <a @click="nextMonth">
            nextMonth
          </a>
          |
          from
          <input v-model.lazy="startDate" />
          to
          <input v-model.lazy="endDate" />
        </div>
      </template>
      <template #sidebar-item="props">
        <span style="padding-left: 10px; padding-right: 10px;">
          {{props.item.items[0].category}}
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
    <hr/>
    When you modify a date from the toolbar inputs, hit enter to propagate changes.
  </Story>
</template>
<script>
import Timeline from "../src/components/Timeline.vue";
import TimelineLineRendererDaysSeparator from '../src/components/TimelineLineRendererDaysSeparator.vue';
import TimelineLineRendererTimeChunks from '../src/components/TimelineLineRendererTimeChunks.vue';

export default {
  components: {
    Timeline,
    TimelineLineRendererDaysSeparator,
    TimelineLineRendererTimeChunks,
  },
  data() {
    return {
      startDate: '2023-09-01',
      endDate: '2023-09-10',
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
    prevMonth () {
      this.$refs.timeline.prevMonth();
    },
    nextMonth () {
      this.$refs.timeline.nextMonth();
    },
  }
};
</script>
<style scoped>
.timeline :deep(.el-card) {
  margin-bottom: 10px;
}
.toolbar a {
  border: 1px solid #ccc;
  margin: 4px;
  background: whitesmoke;
  cursor: pointer;
}
.toolbar a:hover {
  background: #ddd;
}

</style>
