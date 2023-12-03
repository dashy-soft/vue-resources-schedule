import { aC as dayjs, ar as openBlock, aD as createElementBlock, aq as resolveComponent, aE as renderSlot, av as createBaseVNode, aF as normalizeClass, au as createVNode, aG as Fragment, aH as renderList, aI as createCommentVNode, aJ as normalizeStyle, as as createBlock, aK as Teleport, at as withCtx } from "./vendor-7a101243.js";
const HasResizableObserver = {
  data() {
    return {
      resizeObserver: void 0
    };
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(this.onResize);
    this.resizeObserver.observe(this.$el);
  },
  beforeDestroy() {
    this.resizeObserver.unobserve(this.$el);
  },
  methods: {
    onResize() {
    }
  }
};
const TimelineRuler_vue_vue_type_style_index_0_scoped_f18a5d5f_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3 = {
  props: {
    displayedStartDate: {
      type: Object,
      required: true
    },
    displayedEndDate: {
      type: Object,
      required: true
    }
  },
  mixins: [HasResizableObserver],
  mounted() {
    this.renderCanvas();
  },
  watch: {
    "displayedStartDate": "renderCanvas",
    "displayedEndDate": "renderCanvas"
  },
  methods: {
    renderCanvas() {
      const canvas = this.$el;
      const ctx = canvas.getContext("2d");
      const displayedStartDate = dayjs(this.displayedStartDate);
      const displayedEndDate = dayjs(this.displayedEndDate);
      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvas.clientHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#999999";
      ctx.fillStyle = "#999999";
      ctx.textAlign = "left";
      ctx.font = "14px Arial";
      const totalDays = displayedEndDate.diff(displayedStartDate, "day");
      const notchWidth = canvasWidth / (totalDays + 1);
      let lastMonth = null;
      for (let day = 0; day <= totalDays; day++) {
        const currentDate = displayedStartDate.add(day, "day");
        const x = day / totalDays * canvasWidth;
        const yStart = 40;
        const yEnd = 30;
        if (currentDate.month() !== lastMonth) {
          ctx.fillRect(x, 0, 1, canvasHeight);
          const monthName = currentDate.format("MMMM");
          ctx.textAlign = "left";
          ctx.fillText(monthName, x + 5, 16);
          lastMonth = currentDate.month();
        }
        ctx.beginPath();
        ctx.moveTo(x, yStart);
        ctx.lineTo(x, yEnd);
        ctx.stroke();
        ctx.textAlign = "center";
        if (notchWidth > 30) {
          const dayNumber = currentDate.date();
          ctx.fillText(dayNumber.toString(), x + notchWidth / 2, 35);
        }
      }
    },
    onResize() {
      this.renderCanvas();
    }
  }
};
const _hoisted_1$3 = { class: "timeline-ruler" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("canvas", _hoisted_1$3);
}
_sfc_main$3.__file = "src/components/TimelineRuler.vue";
const TimelineRuler = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-f18a5d5f"], ["__file", "/home/runner/work/vue-resources-schedule/vue-resources-schedule/src/components/TimelineRuler.vue"]]);
let s4 = () => {
  return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
};
const uuidGenerator = () => `${s4()}-${s4()}-${s4()}-${s4()}`;
const Timeline_vue_vue_type_style_index_0_lang = "";
const groupBy = (values, keyFinder) => {
  return values.reduce((a, b) => {
    const key = typeof keyFinder === "function" ? keyFinder(b) : b[keyFinder];
    if (!a[key]) {
      a[key] = [b];
    } else {
      a[key] = [...a[key], b];
    }
    return a;
  }, {});
};
const _sfc_main$2 = {
  props: {
    data: {
      type: Array,
      required: true
    },
    groupByFunction: {
      type: Function,
      default: void 0
    },
    aggregateFunction: {
      type: Function,
      default: void 0
    },
    lineHeight: {
      type: Number,
      default: void 0
    },
    startDate: {
      type: String,
      default: void 0
    },
    endDate: {
      type: String,
      default: void 0
    },
    startDateKey: {
      type: String,
      default: "start"
    },
    endDateKey: {
      type: String,
      default: "end"
    }
  },
  components: {
    TimelineRuler
  },
  mixins: [HasResizableObserver],
  data() {
    this.$nextTick(() => {
      this.showElements = true;
    });
    const displayedStartDate = this.startDate ? dayjs(this.startDate) : dayjs().startOf("month");
    const displayedEndDate = this.endDate ? dayjs(this.endDate) : dayjs().endOf("month");
    return {
      showElements: false,
      uuid: uuidGenerator(),
      currentDate: dayjs(),
      displayedStartDate,
      displayedEndDate
    };
  },
  watch: {
    startDate(v) {
      this.displayedStartDate = this.startDate ? dayjs(this.startDate) : dayjs().startOf("month");
      if (this.endDate <= v) {
        this.$emit("update:end-date", dayjs(v).add(1, "day").format("YYYY-MM-DD HH:mm:ss"));
      }
    },
    endDate(v) {
      this.displayedEndDate = this.endDate ? dayjs(this.endDate) : dayjs().endOf("month");
      if (this.startDate >= v) {
        this.$emit("update:start-date", dayjs(v).subtract(1, "day").format("YYYY-MM-DD HH:mm:ss"));
      }
    }
  },
  computed: {
    displayedItems() {
      let itemsInInterval = this.data;
      if (this.startDateKey && this.endDateKey) {
        const start = dayjs(this.startDate).format("YYYY-MM-DD");
        const end = dayjs(this.endDate).format("YYYY-MM-DD");
        itemsInInterval = itemsInInterval.filter((i) => {
          console.log("filter", start, i[this.startDateKey], end, i[this.endDateKey]);
          if (start <= i[this.startDateKey] && end >= i[this.endDateKey]) {
            return true;
          }
          return false;
        });
      }
      if (this.groupByFunction) {
        const groupedDict = groupBy(itemsInInterval, this.groupByFunction);
        return Object.keys(groupedDict).map((key) => {
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
      let hours = dayjs(this.displayedEndDate).diff(this.displayedStartDate, "hours");
      const days = Math.ceil(hours / 24);
      hours = hours - days * 24;
      console.log("Days: ", days);
      console.log("Hours: ", hours);
      return days;
    }
  },
  methods: {
    prevMonth() {
      this.displayedStartDate = dayjs(this.displayedStartDate).subtract(1, "month").startOf("month");
      this.displayedEndDate = dayjs(this.displayedEndDate).subtract(1, "month").endOf("month");
      this.$emit("update:start-date", this.displayedStartDate.format("YYYY-MM-DD HH:mm:ss"));
      this.$emit("update:end-date", this.displayedEndDate.format("YYYY-MM-DD HH:mm:ss"));
    },
    nextMonth() {
      this.displayedStartDate = dayjs(this.displayedStartDate).add(1, "month").startOf("month");
      this.displayedEndDate = dayjs(this.displayedEndDate).add(1, "month").endOf("month");
      this.$emit("update:start-date", this.displayedStartDate.format("YYYY-MM-DD HH:mm:ss"));
      this.$emit("update:end-date", this.displayedEndDate.format("YYYY-MM-DD HH:mm:ss"));
    },
    getDayNumber(day) {
      return dayjs(this.displayedStartDate).add(day - 1, "days").format("DD");
    },
    onResize() {
      console.log("onResize");
    }
  }
};
const _hoisted_1$2 = { class: "timeline" };
const _hoisted_2$1 = { class: "timeline-container" };
const _hoisted_3 = { class: "sidebar" };
const _hoisted_4 = /* @__PURE__ */ createBaseVNode(
  "div",
  { class: "ruler-item" },
  null,
  -1
  /* HOISTED */
);
const _hoisted_5 = {
  key: 0,
  class: "main-view"
};
const _hoisted_6 = { class: "ruler" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TimelineRuler = resolveComponent("TimelineRuler");
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    renderSlot(_ctx.$slots, "toolbar"),
    createBaseVNode("div", _hoisted_2$1, [
      createBaseVNode("div", _hoisted_3, [
        _hoisted_4,
        createBaseVNode(
          "div",
          {
            class: normalizeClass(`ressources-schedule-sidebar-${$data.uuid}`)
          },
          null,
          2
          /* CLASS */
        )
      ]),
      $data.showElements ? (openBlock(), createElementBlock("div", _hoisted_5, [
        createBaseVNode("div", _hoisted_6, [
          createVNode(_component_TimelineRuler, {
            displayedStartDate: $data.displayedStartDate,
            displayedEndDate: $data.displayedEndDate
          }, null, 8, ["displayedStartDate", "displayedEndDate"])
        ]),
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList($options.displayedItems, (i) => {
            return openBlock(), createElementBlock(
              "div",
              {
                class: "line",
                style: normalizeStyle($props.lineHeight ? `height: ${$props.lineHeight}px` : "")
              },
              [
                (openBlock(), createBlock(Teleport, {
                  to: `.ressources-schedule-sidebar-${$data.uuid}`
                }, [
                  createBaseVNode(
                    "div",
                    {
                      class: "sidebar-line",
                      style: normalizeStyle($props.lineHeight ? `height: ${$props.lineHeight}px` : "")
                    },
                    [
                      renderSlot(_ctx.$slots, "sidebar-item", { item: i })
                    ],
                    4
                    /* STYLE */
                  )
                ], 8, ["to"])),
                renderSlot(_ctx.$slots, "item", {
                  item: i,
                  displayedStartDate: $data.displayedStartDate,
                  displayedEndDate: $data.displayedEndDate,
                  daysDisplayed: $options.daysDisplayed
                })
              ],
              4
              /* STYLE */
            );
          }),
          256
          /* UNKEYED_FRAGMENT */
        ))
      ])) : createCommentVNode("v-if", true)
    ])
  ]);
}
_sfc_main$2.__file = "src/components/Timeline.vue";
const Timeline = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "/home/runner/work/vue-resources-schedule/vue-resources-schedule/src/components/Timeline.vue"]]);
const TimelineLineRendererDaysSeparator_vue_vue_type_style_index_0_scoped_42d5c8d3_lang = "";
const _sfc_main$1 = {
  props: {
    itemProps: {
      type: Object,
      required: true
    }
  },
  mixins: [HasResizableObserver],
  mounted() {
    this.renderCanvas();
  },
  watch: {
    "itemProps.displayedStartDate": "renderCanvas",
    "itemProps.displayedEndDate": "renderCanvas"
  },
  methods: {
    renderCanvas() {
      const canvas = this.$el;
      const ctx = canvas.getContext("2d");
      const displayedStartDate = dayjs(this.itemProps.displayedStartDate);
      const displayedEndDate = dayjs(this.itemProps.displayedEndDate);
      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvas.clientHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#cccccc";
      const totalDays = displayedEndDate.diff(displayedStartDate, "day");
      let lastMonth = null;
      for (let day = 0; day <= totalDays; day++) {
        const currentDate = displayedStartDate.add(day, "day");
        const x = day / totalDays * canvasWidth;
        const yStart = 0;
        const yEnd = 10;
        if (currentDate.month() !== lastMonth) {
          ctx.strokeStyle = "#cccccc";
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
  }
};
const _hoisted_1$1 = { class: "timeline-line-renderer-days-separator" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("canvas", _hoisted_1$1);
}
_sfc_main$1.__file = "src/components/TimelineLineRendererDaysSeparator.vue";
const TimelineLineRendererDaysSeparator = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-42d5c8d3"], ["__file", "/home/runner/work/vue-resources-schedule/vue-resources-schedule/src/components/TimelineLineRendererDaysSeparator.vue"]]);
const TimelineLineRendererTimeChunks_vue_vue_type_style_index_0_scoped_a78e6acc_lang = "";
function datePourcentageInInterval(date, start, end) {
  if (typeof date === "string") {
    date = dayjs(date);
  }
  if (typeof start === "string") {
    start = dayjs(start);
  }
  if (typeof end === "string") {
    end = dayjs(end);
  }
  return (date - start) / (end - start) * 100;
}
const _sfc_main = {
  props: {
    itemProps: {
      type: Object,
      required: true
    },
    startDateKey: {
      type: String,
      default: "start"
    },
    endDateKey: {
      type: String,
      default: "end"
    },
    chunkStyle: {
      type: Function,
      default: void 0
    }
  },
  computed: {
    chunks() {
      if (this.itemProps.item._grouped) {
        return this.itemProps.item.items;
      }
    },
    numberOfDays() {
      return this.itemProps.daysDisplayed;
    }
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
        return "display: none;";
      }
      if (this.chunkStyle) {
        style += this.chunkStyle(c);
      }
      return style;
    }
  }
};
const _hoisted_1 = { class: "timeline-line-renderer-time-chunks" };
const _hoisted_2 = ["onClick"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tooltip = resolveComponent("el-tooltip");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    (openBlock(true), createElementBlock(
      Fragment,
      null,
      renderList($options.chunks, (c) => {
        return openBlock(), createBlock(
          _component_el_tooltip,
          null,
          {
            content: withCtx(() => [
              renderSlot(_ctx.$slots, "tooltip", { chunk: c }, void 0, true)
            ]),
            default: withCtx(() => [
              createBaseVNode("div", {
                class: "chunk",
                style: normalizeStyle($options.getChunkStyle(c)),
                onClick: ($event) => _ctx.$emit("click-on-chunk", c)
              }, null, 12, _hoisted_2)
            ]),
            _: 2
            /* DYNAMIC */
          },
          1024
          /* DYNAMIC_SLOTS */
        );
      }),
      256
      /* UNKEYED_FRAGMENT */
    ))
  ]);
}
_sfc_main.__file = "src/components/TimelineLineRendererTimeChunks.vue";
const TimelineLineRendererTimeChunks = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a78e6acc"], ["__file", "/home/runner/work/vue-resources-schedule/vue-resources-schedule/src/components/TimelineLineRendererTimeChunks.vue"]]);
export {
  Timeline as T,
  _export_sfc as _,
  TimelineLineRendererDaysSeparator as a,
  TimelineLineRendererTimeChunks as b
};
