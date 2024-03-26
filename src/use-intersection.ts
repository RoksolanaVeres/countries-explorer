import { useEffect, useState } from "react";

export default function useIntersection() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsIntersecting(entries[0].isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      },
    );

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return { ref: setRef, isIntersecting };
}
