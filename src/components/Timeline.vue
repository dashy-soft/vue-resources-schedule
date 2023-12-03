<template>
  <div class="timeline">
    <slot name="toolbar" />
    <div class="timeline-container">
      <div class="sidebar">
        <div class="ruler-item"></div>
        <div :class="`ressources-schedule-sidebar-${uuid}`"/>
      </div>
      <div class="main-view" v-if="showElements">
        <div class="ruler">
          <TimelineRuler
            :displayedStartDate="displayedStartDate"
            :displayedEndDate="displayedEndDate"
          />
        </div>

        <div v-for="i in displayedItems" class="line" :style="lineHeight ? `height: ${lineHeight}px` : ''">
          <Teleport :to="`.ressources-schedule-sidebar-${uuid}`">
            <div class="sidebar-line" :style="lineHeight ? `height: ${lineHeight}px` : ''">
              <slot name="sidebar-item" :item="i" />
            </div>
          </Teleport>
          <slot
            name="item"
            :item="i"
            :displayedStartDate="displayedStartDate"
            :displayedEndDate="displayedEndDate"
            :daysDisplayed="daysDisplayed"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import TimelineRuler from './TimelineRuler.vue';
import uuidGenerator from '../utils/uuid';
import HasResizableObserver from '../mixins/HasResizableObserver';

const groupBy = (values, keyFinder) => {
  // using reduce to aggregate values
  return values.reduce((a, b) => {
    // depending upon the type of keyFinder
    // if it is function, pass the value to it
    // if it is a property, access the property
    const key = typeof keyFinder === 'function' ? keyFinder(b) : b[keyFinder];

    // aggregate values based on the keys
    if(!a[key]){
      a[key] = [b];
    }else{
      a[key] = [...a[key], b];
    }

    return a;
  }, {});
};

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    groupByFunction: {
      type: Function,
      default: undefined,
    },
    aggregateFunction: {
      type: Function,
      default: undefined,
    },
    lineHeight: {
      type: Number,
      default: undefined,
    },
    startDate: {
      type: String,
      default: undefined,
    },
    endDate: {
      type: String,
      default: undefined,
    },
    startDateKey: {
      type: String,
      default: 'start',
    },
    endDateKey: {
      type: String,
      default: 'end',
    },
  },
  components: {
    TimelineRuler,
  },
  mixins: [HasResizableObserver],
  data() {
    this.$nextTick(() => {
      this.showElements = true;
    });

    const displayedStartDate = this.startDate ? dayjs(this.startDate) : dayjs().startOf('month');
    const displayedEndDate = this.endDate ? dayjs(this.endDate) : dayjs().endOf('month');

    return {
      showElements: false,
      uuid: uuidGenerator(),
      currentDate: dayjs(),
      displayedStartDate,
      displayedEndDate,
    };
  },
  watch: {
    startDate (v) {
      this.displayedStartDate = this.startDate ? dayjs(this.startDate) : dayjs().startOf('month');
      if (this.endDate <= v) {
        this.$emit('update:end-date', dayjs(v).add(1, 'day').format('YYYY-MM-DD HH:mm:ss'));
      }
    },
    endDate (v) {
      this.displayedEndDate = this.endDate ? dayjs(this.endDate) : dayjs().endOf('month');
      if (this.startDate >= v) {
        this.$emit('update:start-date', dayjs(v).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'));
      }
    },
  },
  computed: {
    displayedItems () {
      let itemsInInterval = this.data;
      if(this.startDateKey && this.endDateKey) {
        const start = dayjs(this.startDate).format('YYYY-MM-DD');
        const end = dayjs(this.endDate).format('YYYY-MM-DD');
        itemsInInterval = itemsInInterval.filter(i => {
          console.log('filter', start, i[this.startDateKey], end, i[this.endDateKey])
          if (start <= i[this.startDateKey] && end >= i[this.endDateKey]) {
            return true;
          }
          return false;
        });
      }
      if (this.groupByFunction) {
        const groupedDict = groupBy(itemsInInterval, this.groupByFunction);
        return Object.keys(groupedDict).map(key => {
          if (this.aggregateFunction) {
            const res = groupedDict[key].reduce(this.aggregateFunction, {});
            res._grouped = true;
            res.items = groupedDict[key];
            return res;
          } else {
            return { key, items: groupedDict[key], _grouped: true };
          }
        });
      }
      return itemsInInterval;
    },
    currentMonth() {
      return dayjs(this.currentDate).month();
    },
    currentYear() {
      return dayjs(this.currentDate).year();
    },
    daysInMonth() {
      return this.currentDate.daysInMonth();
    },
    daysDisplayed() {
      let hours = dayjs(this.displayedEndDate).diff(this.displayedStartDate, 'hours');
      const days = Math.ceil(hours / 24);
      hours = hours - (days * 24);

      console.log('Days: ', days);
      console.log('Hours: ', hours);

      return days;
    }
  },
  methods: {
    prevMonth() {
      this.displayedStartDate = dayjs(this.displayedStartDate).subtract(1, 'month').startOf('month');
      this.displayedEndDate = dayjs(this.displayedEndDate).subtract(1, 'month').endOf('month');

      this.$emit('update:start-date', this.displayedStartDate.format('YYYY-MM-DD HH:mm:ss'));
      this.$emit('update:end-date', this.displayedEndDate.format('YYYY-MM-DD HH:mm:ss'));
    },
    nextMonth() {
      this.displayedStartDate =  dayjs(this.displayedStartDate).add(1, 'month').startOf('month');
      this.displayedEndDate =  dayjs(this.displayedEndDate).add(1, 'month').endOf('month');

      this.$emit('update:start-date', this.displayedStartDate.format('YYYY-MM-DD HH:mm:ss'));
      this.$emit('update:end-date', this.displayedEndDate.format('YYYY-MM-DD HH:mm:ss'));
    },
    getDayNumber(day) {
      return dayjs(this.displayedStartDate).add(day - 1, 'days').format('DD');
    },
    onResize () {
      console.log('onResize');
    },
  }
};
</script>
<style>
.ruler {
  position: relative;
  display: flex;
  height: 40px;
  background: whitesmoke;
  border: 1px solid #ccc;
}
.ruler-item {
  height: 40px;
  background: whitesmoke;
  border: 1px solid #ccc;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  color: #999;
  text-align: center;
}
.timeline-container {
  display: flex;
}
.main-view {
  flex-grow: 1;
}
.sidebar-line {
  background: whitesmoke;
}
.sidebar-line, .line {
  position: relative;
  border-bottom: 1px solid #ccc;
  height: 40px;
}
</style>
