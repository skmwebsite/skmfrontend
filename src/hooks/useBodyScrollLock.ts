import { useEffect } from "react";

function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;

    if (isLocked) {
      document.body.style.overflow = "hidden";
      document.body.setAttribute("data-lenis-prevent", "true");
    } else {
      document.body.style.overflow = originalOverflow;
      document.body.removeAttribute("data-lenis-prevent");
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.removeAttribute("data-lenis-prevent");
    };
  }, [isLocked]);
}

export default useBodyScrollLock;
