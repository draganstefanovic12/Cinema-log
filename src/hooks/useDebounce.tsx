import { useEffect, useState } from "react";

export const useDebounce = <T,>(value: T) => {
  const [debounce, setDebounce] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return { debounce, setDebounce };
};
