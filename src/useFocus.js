import React from "react";

export default function useFocus(ref) {
  const returnFocus = React.useRef(document.activeElement);
  const isShiftKeyDown = useShiftKey();

  React.useEffect(() => {
    if (ref.current) {
      findTabable(ref.current).focus();
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (returnFocus.current) returnFocus.current.focus();
    };
  }, [ref]);

  React.useEffect(() => {
    // TODO: log warning if ref.current is undefined.
    if (!ref.current) return;
    function handleFocus() {
      if (ref.current.contains(document.activeElement)) return;
      findTabable(ref.current, isShiftKeyDown).focus();
    }
    document.addEventListener("focus", handleFocus, true);
    return () => {
      document.removeEventListener("focus", handleFocus, true);
    };
  }, [isShiftKeyDown, ref]);
}

function findTabable(element, findLast = false) {
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
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, []);
  return isShift;
}
