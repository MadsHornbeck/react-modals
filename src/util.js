export const prefixer = (prefix, obj) =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [[`${prefix}-${k}`], v])
  );

export const genId = () => Math.random().toString(36).slice(2);

export const getStatic = (c, t) =>
  (c.props && c.props[t]) ||
  c[t] ||
  (c.type && c.type[t]) ||
  (c.type && c.type.render && c.type.render[t]) ||
  (c.type && c.type.type && (c.type.type[t] || c.type.type.render[t]));
