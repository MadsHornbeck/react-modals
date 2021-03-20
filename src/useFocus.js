import React from "react";

export default function useFocus(ref) {
  const returnFocus = React.useRef(document.activeElement);
  const isShiftKeyDown = useShiftKey();

  React.useEffect(() => {
    if (ref.current) {
      findFocusable(ref.current).focus();
    }
    const rf = returnFocus.current;
    return () => {
      if (rf) rf.focus();
    };
  }, [ref]);

  React.useEffect(() => {
    // TODO: log warning if ref.current is undefined.
    const el = ref.current;
    if (!el) return;
    function handleFocus() {
      if (el.contains(document.activeElement)) return;
      findFocusable(el, isShiftKeyDown).focus();
    }
    document.addEventListener("focus", handleFocus, true);
    return () => {
      document.removeEventListener("focus", handleFocus, true);
    };
  }, [isShiftKeyDown, ref]);
}

function findFocusable(element, findLast = false) {
  const focusable = Array.from(
    element.querySelectorAll(
      "[tabindex],button,input,select,textarea,object,a[href]"
    )
  );
  if (findLast) focusable.reverse();
  return focusable.find((n) => n.tabIndex >= 0) || element;
}

function useShiftKey() {
  const [isShift, setIsShift] = React.useState(false);
  React.useEffect(() => {
    const keyDown = (e) => {
      if (e.key === "Shift") {
        setIsShift(true);
      }
    };
    const keyUp = (e) => {
      if (e.key === "Shift") {
        setIsShift(false);
      }
    };
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    return () => {
      document.removeEventListener("keydown", keyDown);
      document.removeEventListener("keyup", keyUp);
    };
  }, []);
  return isShift;
}
