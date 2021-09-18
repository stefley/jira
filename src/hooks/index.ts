import { useEffect, useState } from "react";
export const useMount = (cb: Function) => {
  useEffect(() => {
    cb();
  }, []);
};

export const useDebounce = (value: any, delay = 60) => {
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
