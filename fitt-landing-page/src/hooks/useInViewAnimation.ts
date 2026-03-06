import { useRef } from "react";
import { useInView } from "framer-motion";

export function useInViewAnimation(
  threshold = 0.15
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
    amount: threshold,
  });
  return [ref, inView];
}
