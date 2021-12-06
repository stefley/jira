import { useMountedRef } from "./index";
import React, { useCallback, useReducer, useState } from "react";
interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  error: null,
  data: null,
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef?.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );

  const [retry, setRetry] = useState(() => () => {});
  const safeDispatch = useSafeDispatch(dispatch);
  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: "success",
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: "error",
        data: null,
      }),
    [safeDispatch]
  );

  // 触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入Promise类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      safeDispatch({ stat: "loading" });
      return promise
        .then((data: D) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          // catch 会消化异常，如果其他地方需要catch异常需return promise
          if (config.throwOnError) return Promise.reject(error);
          // 不需要抛出异常时正常return
          return error;
        });
    },
    [config.throwOnError, setData, dispatch, setError, safeDispatch]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
