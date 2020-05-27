import React from "react";

const genId = () => Math.random().toString(36).slice(2);

function prefixer(prefix, obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [[`${prefix}-${k}`], v])
  );
  // version without Object.fromEntries an Object.entries.
  // return Object.keys(obj).reduce((acc, key) => {
  //   acc[`${prefix}-${key}`] = obj[key];
  //   return acc;
  // }, {});
}

// TODO: find a more elegant way of handling this.
export default function useAria(label) {
  const aria = React.useMemo(
    () => ({
      describedby: genId(),
      label,
      labelledby: genId(),
      modal: true,
    }),
    [label]
  );
  const attributes = React.useMemo(() => prefixer("aria", aria), [aria]);
  return Object.assign(aria, { attributes });
}
