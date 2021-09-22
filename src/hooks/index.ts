import { useEffect, useState } from "react";
export const useMount = (cb: Function) => {
  useEffect(() => {
    cb();
  }, []);
};

export const useDebounce = <T>(value: T, delay = 60): T => {
  const [val, setVal] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVal(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return val;
};
