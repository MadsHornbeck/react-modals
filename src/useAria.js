import React from "react";

import { prefixer, genId } from "./util";

export default function useAria(label) {
  return React.useMemo(() => {
    const aria = {
      describedby: genId(),
      label,
      labelledby: genId(),
      modal: true,
    };
    const attributes = Object.assign(prefixer("aria", aria), {
      role: "dialog",
    });
    return Object.assign(aria, { attributes });
  }, [label]);
}
