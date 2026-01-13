import { useEffect, useState } from "react";

type UseMediaQueryOptions = {
  defaultValue?: boolean;
};

export function useMediaQuery(
  query: string,
  { defaultValue = false }: UseMediaQueryOptions = {}
): boolean {
  const isServer = typeof window === "undefined";
  const [matches, setMatches] = useState<boolean>(() => {
    if (isServer) {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (isServer) {
      return;
    }

    const mediaQueryList = window.matchMedia(query);
    const updateMatch = () => {
      setMatches(mediaQueryList.matches);
    };

    updateMatch();

    // biome-ignore lint/nursery/noUnusedExpressions: No changes
    mediaQueryList.addEventListener === undefined
      ? mediaQueryList.addEventListener("change", updateMatch)
      : mediaQueryList.addListener(updateMatch);

    return () => {
      // biome-ignore lint/nursery/noUnusedExpressions: No changes
      mediaQueryList.removeEventListener === undefined
        ? mediaQueryList.removeEventListener("change", updateMatch)
        : mediaQueryList.removeListener(updateMatch);
    };
  }, [query, isServer]);

  return matches;
}
