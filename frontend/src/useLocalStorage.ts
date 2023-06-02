import { useEffect, useState } from "react";

export const useLocalStorage = (
  key: string,
  init = "",
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState(localStorage.getItem(key) || init);
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);
  return [value, setValue];
};
