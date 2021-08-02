import { useState, useEffect } from "react";

const useMediaQuery = (query: string): boolean => {
  if (typeof window === "undefined" || window.matchMedia === "undefined") {
    throw new Error("window or window.matchMedia is undefined");
  }
  const mediaQuery = window.matchMedia(query);
  const [match, setMatch] = useState(mediaQuery.matches);
  useEffect(() => {
    mediaQuery.addEventListener("change", () => setMatch(mediaQuery.matches));
    return () =>
      mediaQuery.removeEventListener("change", () =>
        setMatch(mediaQuery.matches)
      );
  });
  return match;
};

export default useMediaQuery;
