export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
export const cleanObject = (object: { [key: string]: unknown }) => {
  const _object = { ...object };
  Object.keys(_object).forEach((key) => {
    const value = _object[key];
    if (isVoid(value)) {
      delete _object[key];
    }
  });
  return _object;
};

export const resetRoute = () => (window.location.href = window.location.origin);
