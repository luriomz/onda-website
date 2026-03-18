import { useReducedMotion } from "framer-motion";

export const viewportOnce = { once: true, margin: "-80px" };

export function useFadeUp(delay = 0) {
  const reduced = useReducedMotion();
  if (reduced) return { initial: {}, animate: {}, transition: {} };
  return {
    initial: { y: 28, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: viewportOnce,
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

export function useSlideLeft(delay = 0) {
  const reduced = useReducedMotion();
  if (reduced) return {};
  return {
    initial: { x: -32, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: viewportOnce,
    transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] },
  };
}
