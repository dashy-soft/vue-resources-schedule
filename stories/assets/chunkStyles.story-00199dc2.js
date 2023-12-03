import { _ as _export_sfc, T as Timeline, a as TimelineLineRendererDaysSeparator, b as TimelineLineRendererTimeChunks } from "./TimelineLineRendererTimeChunks-d0a9c175.js";
import { aq as resolveComponent, ar as openBlock, as as createBlock, at as withCtx, au as createVNode, av as createBaseVNode, az as toDisplayString, aw as createTextVNode } from "./vendor-7a101243.js";
const chunkStyles_story_vue_vue_type_style_index_0_scoped_e95bb102_lang = "";
function stringToColor(str, colorArray) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colorArray.length;
  return colorArray[index];
}
const colors = ["#FF5733", "#3399FF", "#33FF42", "#FF33A4", "#33FF99"];
const _sfc_main = {
  components: {
    Timeline,
    TimelineLineRendererDaysSeparator,
    TimelineLineRendererTimeChunks
  },
  data() {
    return {
      data: [{
        category: "development",
        start: "2023-09-01 09:30",
        end: "2023-09-01 15:30"
      }, {
        category: "meetings",
        start: "2023-09-01 11:30",
        end: "2023-09-05 15:30"
      }, {
        category: "development",
        start: "2023-09-03 17:30",
        end: "2023-09-09 19:30"
      }, {
        category: "HR",
        start: "2023-09-01 17:30",
        end: "2023-09-03 19:30"
      }, {
        category: "HR",
        start: "2023-09-05 17:30",
        end: "2023-09-07 19:30"
      }]
    };
  },
  methods: {
    getChunkStyle(chunk) {
      const color = stringToColor(chunk.category, colors);
      return `background: ${color}50; border: 1px solid ${color}`;
    }
  }
};
const _hoisted_1 = { style: { "padding-left": "10px", "padding-right": "10px" } };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TimelineLineRendererDaysSeparator = resolveComponent("TimelineLineRendererDaysSeparator");
  const _component_TimelineLineRendererTimeChunks = resolveComponent("TimelineLineRendererTimeChunks");
  const _component_Timeline = resolveComponent("Timeline");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, { title: "Chunk styles" }, {
    default: withCtx(() => [
      createVNode(_component_Timeline, {
        data: $data.data,
        "group-by-function": (item) => item.category,
        "line-height": 68,
        "start-date": "2023-09-01",
        "end-date": "2023-09-10"
      }, {
        "sidebar-item": withCtx((props) => [
          createBaseVNode(
            "span",
            _hoisted_1,
            toDisplayString(props.item.items[0].category),
            1
            /* TEXT */
          )
        ]),
        item: withCtx((props) => [
          createVNode(_component_TimelineLineRendererDaysSeparator, { "item-props": props }, null, 8, ["item-props"]),
          createVNode(_component_TimelineLineRendererTimeChunks, {
            "item-props": props,
            startDateKey: "start",
            endDateKey: "end",
            chunkStyle: $options.getChunkStyle
          }, {
            tooltip: withCtx(({ chunk }) => [
              createTextVNode(" tooltip ")
            ]),
            _: 2
            /* DYNAMIC */
          }, 1032, ["item-props", "chunkStyle"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["data", "group-by-function"])
    ]),
    _: 1
    /* STABLE */
  });
}
_sfc_main.__file = "stories/chunkStyles.story.vue";
const chunkStyles_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e95bb102"], ["__file", "/home/runner/work/vue-ressources-schedule/vue-ressources-schedule/stories/chunkStyles.story.vue"]]);
export {
  chunkStyles_story as default
};
