import React from "react";

export default function useCloseOnKeys(resolve, keys = ["Escape"]) {
  React.useEffect(() => {
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
