export const styleNames = (...styleMap) => styleMap
  .filter(({ condition }) => condition)
  .map(({ style }) => style);