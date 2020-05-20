import React from "react";

// TODO: maybe find a better structure for the keys
export function useCloseOnKeys(resolve, keys) {
  React.useEffect(() => {
    // TODO: only do this in dev
    if (!keys || !keys.length) {
      console.warn("Warn dev about no keys passed");
    }

    function handleKeyDown(e) {
      const k = keys.find((k) => k === e.key || k[0] === e.key);
      if (k) {
        const a = Array.isArray(k) ? k[1] : undefined;
        resolve(typeof a === "function" ? a() : a);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [keys, resolve]);
}

// TODO: handle parameters better
export function useFocus(ref, autoFocus = true) {
  React.useEffect(() => {
    if (autoFocus && ref.current) {
      findFirstTabable(ref.current).focus();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!ref.current) return;

    function handleFocus() {
      if (ref.current.contains(document.activeElement)) return;
      findFirstTabable(ref.current).focus();
    }

    document.addEventListener("focus", handleFocus, true);
    return () => {
      document.removeEventListener("focus", handleFocus, true);
    };
  }, [ref]);
}

function findFirstTabable(element) {
  return (
    Array.from(
      element.querySelectorAll(
        "[tabindex],button,input,select,textarea,object,a[href]"
      )
    ).find((n) => n.tabIndex >= 0) || element
  );
}
