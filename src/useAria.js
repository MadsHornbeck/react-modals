import React from "react";

const genId = () => Math.random().toString(36).slice(2);

function prefixer(prefix, obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [[`${prefix}-${k}`], v])
  );
}

export default function useAria(label) {
  return React.useMemo(() => {
    const aria = {
      describedby: genId(),
      label,
      labelledby: genId(), // TODO: maybe omit this if label is set
      modal: true,
    };
    const attributes = Object.assign(prefixer("aria", aria), {
      role: "dialog",
    });
    return Object.assign(aria, { attributes });
  }, [label]);
}
