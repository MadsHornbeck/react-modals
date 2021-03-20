export function prefixer(prefix, obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [[`${prefix}-${k}`], v])
  );
}

export const genId = () => Math.random().toString(36).slice(2);

export function scrollLock(targetToHide) {
  targetToHide.setAttribute("aria-hidden", "true");
  const scrollTop = window.pageYOffset;
  const scrollbarWidth = getScrollbarWidth();
  const style = {
    overflow: "hidden",
    position: "fixed",
    top: -scrollTop + "px",
    width: `calc(100% - ${scrollbarWidth}px)`,
  };
  const prevStyle = setHtmlStyle(style);
  return () => {
    targetToHide.removeAttribute("aria-hidden");
    setHtmlStyle(prevStyle);
    window.scroll(0, scrollTop);
  };
}

function setHtmlStyle(style) {
  const html = document.documentElement;
  return Object.entries(style).reduce((a, [k, v]) => {
    a[k] = html.style[k];
    html.style[k] = v;
    return a;
  }, {});
}

let scrollbarWidth;
function getScrollbarWidth() {
  if (scrollbarWidth !== void 0) return scrollbarWidth;
  const el = document.createElement("div");
  el.style.position = "absolute";
  el.style.top = "-9999px";
  el.style.overflow = "scroll";
  document.body.appendChild(el);
  const width = el.offsetWidth;
  document.body.removeChild(el);
  scrollbarWidth = width;
  return width;
}

export function getStatic(c, t) {
  return (
    (c.props && c.props[t]) ||
    c[t] ||
    (c.type && c.type[t]) ||
    (c.type && c.type.render && c.type.render[t]) ||
    (c.type && c.type.type && (c.type.type[t] || c.type.type.render[t]))
  );
}
