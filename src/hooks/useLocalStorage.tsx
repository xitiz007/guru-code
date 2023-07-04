import { useEffect, useState } from "react";

const useLocalStorage = (key: string, initialValue: string) => {
  const [data, setData] = useState(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    }
    return initialValue;
  });


  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(data));
    }
  }, [data, key]);

  return [data, setData];
};

export default useLocalStorage;
