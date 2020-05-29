import React from "react";

const genId = () => Math.random().toString(36).slice(2);

function prefixer(prefix, obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [[`${prefix}-${k}`], v])
  );
}

export default function useAria(label) {
  const aria = React.useMemo(
    () => ({
      describedby: genId(),
      label,
      labelledby: genId(), // TODO: maybe omit this if label is set
      modal: true,
    }),
    [label]
  );
  const attributes = React.useMemo(
    () => Object.assign(prefixer("aria", aria), { role: "dialog" }),
    [aria]
  );
  return Object.assign(aria, { attributes });
}
