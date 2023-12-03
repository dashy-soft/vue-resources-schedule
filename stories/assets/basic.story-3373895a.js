import { _ as _export_sfc, T as Timeline, a as TimelineLineRendererDaysSeparator, b as TimelineLineRendererTimeChunks } from "./TimelineLineRendererTimeChunks-5392991a.js";
import { aq as resolveComponent, ar as openBlock, as as createBlock, at as withCtx, au as createVNode, av as createBaseVNode, az as toDisplayString, aw as createTextVNode } from "./vendor-7a101243.js";
const basic_story_vue_vue_type_style_index_0_scoped_9f14ffff_lang = "";
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
  }
};
const _hoisted_1 = { style: { "padding-left": "10px", "padding-right": "10px" } };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TimelineLineRendererDaysSeparator = resolveComponent("TimelineLineRendererDaysSeparator");
  const _component_TimelineLineRendererTimeChunks = resolveComponent("TimelineLineRendererTimeChunks");
  const _component_Timeline = resolveComponent("Timeline");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, { title: "Simple" }, {
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
            endDateKey: "end"
          }, {
            tooltip: withCtx(({ chunk }) => [
              createTextVNode(" tooltip ")
            ]),
            _: 2
            /* DYNAMIC */
          }, 1032, ["item-props"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["data", "group-by-function"])
    ]),
    _: 1
    /* STABLE */
  });
}
_sfc_main.__file = "stories/basic.story.vue";
const basic_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9f14ffff"], ["__file", "/home/runner/work/vue-resources-schedule/vue-resources-schedule/stories/basic.story.vue"]]);
export {
  basic_story as default
};
