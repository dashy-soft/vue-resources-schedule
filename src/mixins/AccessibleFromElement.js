import uuid from '../utils/uuid';
import { registry } from '../utils/getComponentFromElement';

export default {
  data () {
    return {
      accessibleFromElementComponentId: undefined
    }
  },
  mounted() {
    const id = 'component_' + uuid();
    this.accessibleFromElementComponentId = id;
    registry[id] = this;
    this.$el.dataset.componentId = id;
  },
  beforeUnmount() {
    delete registry[this.accessibleFromElementComponentId];
  }
};
