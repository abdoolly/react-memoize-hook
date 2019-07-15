import { useRef, useEffect, useCallback } from "react";

export const useMemoize = (func, deps = []) => {
  const ref = useRef<any>();

  useEffect(() => {
    return (): any => (ref.current = {});
  }, deps);

  return useCallback(
    function(this: any) {
      if (!ref.current) ref.current = {};
      let cache = ref.current;

      let key = JSON.stringify(arguments);
      if (cache[key]) return cache[key];

      let val = func.apply(this, arguments);
      cache[key] = val;
      return val;
    },
    [func]
  );
};
