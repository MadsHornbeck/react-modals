export function prefixer(prefix, obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [[`${prefix}-${k}`], v])
  );
}

export const genId = () => Math.random().toString(36).slice(2);

export function getStatic(c, t) {
  return (
    (c.props && c.props[t]) ||
    c[t] ||
    (c.type && c.type[t]) ||
    (c.type && c.type.render && c.type.render[t]) ||
    (c.type && c.type.type && (c.type.type[t] || c.type.type.render[t]))
  );
}
