import React from "react";

// TODO: maybe find a better structure for the keys
export default function useCloseOnKeys(resolve, keys) {
  React.useEffect(() => {
    // TODO: only do this in dev
    if (!keys || !keys.length) {
      console.warn("Warn dev about no keys passed");
    }

    function handleKeyDown(e) {
      const match = keys.find((k) => k === e.key || k[0] === e.key);
      if (match) {
        e.preventDefault();
        const value = Array.isArray(match) ? match[1] : undefined;
        resolve(typeof value === "function" ? value() : value);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [keys, resolve]);
}
