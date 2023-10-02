export const registry = {};

export default (el) => {
  return registry[el.dataset.componentId];
}
