<template>
  <Story title="Chunk styles">
    <Timeline
      :data="data"
      :group-by-function="(item) => item.category"
      :line-height="68"
      start-date="2023-09-01"
      end-date="2023-09-10"
    >
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
          :chunkStyle="getChunkStyle"
        >
          <template #tooltip="{ chunk }">
            tooltip
          </template>
        </TimelineLineRendererTimeChunks>
      </template>

    </Timeline>
  </Story>
</template>
<script>
import Timeline from "../src/components/Timeline.vue";
import TimelineLineRendererDaysSeparator from '../src/components/TimelineLineRendererDaysSeparator.vue';
import TimelineLineRendererTimeChunks from '../src/components/TimelineLineRendererTimeChunks.vue';


function stringToColor(str, colorArray) {
  // Hash the input string to generate an index for the color array
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Calculate an index within the bounds of the color array
  const index = Math.abs(hash) % colorArray.length;

  // Return the color from the array
  return colorArray[index];
}

// Define your array of colors
const colors = ['#FF5733', '#3399FF', '#33FF42', '#FF33A4', '#33FF99'];


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
    getChunkStyle (chunk) {
      const color = stringToColor(chunk.category, colors);
      return `background: ${color}50; border: 1px solid ${color}`;
    }
  }
};
</script>
<style scoped>
.timeline :deep(.el-card) {
  margin-bottom: 10px;
}
</style>
