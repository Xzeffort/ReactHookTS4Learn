import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

// const debounce = (fun: () => void, delay: number | undefined) => {
//   let timeout: any = null;
//   return () => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(() => {
//       fun();
//     }, delay);
//   };
// };

export const useArray = <T>(data: T[]) => {
  const [list, setList] = useState(data);
  return {
    value: list,
    setList,
    add: (item: T) => setList([...list, item]),
    clear: () => setList([]),
    removeIndex: (index: number) => {
      const copy = [...list];
      copy.splice(index, 1);
      setList(copy);
    },
  };
};
