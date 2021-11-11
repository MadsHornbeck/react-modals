import React from "react";

import { prefixer, genId } from "./util";

export default function useAria(label) {
  return React.useMemo(() => {
    const describedby = genId();
    const labelledby = genId();
    const ariaAttrs = Object.assign(
      prefixer("aria", {
        describedby,
        label,
        labelledby,
        modal: true,
      }),
      {
        role: "dialog",
      }
    );
    return [{ describedby, labelledby }, ariaAttrs];
  }, [label]);
}
