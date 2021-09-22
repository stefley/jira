export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;
export const cleanObject = (object: { [key: string]: unknown }) => {
  const _object = { ...object };
  Object.keys(_object).forEach((key) => {
    const value = _object[key];
    if (isFalsy(value)) {
      delete _object[key];
    }
  });
  return _object;
};
