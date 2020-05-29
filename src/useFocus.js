import React from "react";

export default function useFocus(ref, autoFocus = true) {
  // TODO: investigate how returnfocus works with multiple modals
  const returnFocus = React.useRef(document.activeElement);
  React.useEffect(() => {
    if (autoFocus && ref.current) {
      findFirstTabable(ref.current).focus();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!ref.current) return;

    // TODO: handle backwards tab (shift + tab)
    function handleFocus() {
      if (ref.current.contains(document.activeElement)) return;
      findFirstTabable(ref.current).focus();
    }

    document.addEventListener("focus", handleFocus, true);
    return () => {
      document.removeEventListener("focus", handleFocus, true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (returnFocus.current) returnFocus.current.focus();
    };
  }, [ref, returnFocus]);
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
