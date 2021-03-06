import { useEffect, useRef } from "react";

export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
export const cleanObject = (object: { [key: string]: unknown }) => {
  if (!object) {
    return {};
  }
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

// 返回组件挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
