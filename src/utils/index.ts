export const isFalsy = (value: any) => (value === 0 ? false : !value);
export const cleanObject = <T extends object, K extends keyof T>(object: T) => {
  const _object: T = { ...object };
  Object.keys(_object).forEach((key: string) => {
    const value = _object[key as K];
    if (isFalsy(value)) {
      delete _object[key as K];
    }
  });
  return _object;
};
