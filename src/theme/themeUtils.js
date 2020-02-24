export const getThemedClass = (classes, attributeName, theme) => {
  return classes[`${attributeName}__${theme}`];
};
