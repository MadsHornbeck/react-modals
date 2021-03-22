import React from "react";

import { getStatic } from "./util";

export default function useCloseOnKeys({ children, props, resolve }) {
  const [keys, setCloseOnKeys] = React.useState(
    props.closeOnKeys || getStatic(children, "closeOnKeys") || ["Escape"]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    function handleKeyDown(e) {
      const match = keys.find((k) => k === e.key || k[0] === e.key);
      if (match) {
        e.preventDefault();
        const value = Array.isArray(match) ? match[1] : undefined;
        resolve(typeof value === "function" ? value() : value);
      }
    }
  }, [keys, resolve]);

  React.useDebugValue(keys);

  return setCloseOnKeys;
}
