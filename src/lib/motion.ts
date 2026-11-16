/**
 * Small motion helper. Every animation on the site goes through here (or is
 * plain CSS gated by `prefers-reduced-motion: no-preference`), so reduced
 * motion is respected everywhere.
 *
 *   import { animate, reducedMotion, observeReveal } from "../lib/motion";
 *   animate(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 400 });
 */

const QUERY = "(prefers-reduced-motion: reduce)";

/** True when the visitor asked for reduced motion (or matchMedia is missing). */
export function reducedMotion(): boolean {
  return typeof matchMedia !== "function" || matchMedia(QUERY).matches;
}

/** Call `listener` whenever the reduced-motion preference changes. Returns an unsubscribe. */
export function onReducedMotionChange(
  listener: (reduced: boolean) => void,
): () => void {
  if (typeof matchMedia !== "function") return () => {};
  const media = matchMedia(QUERY);
  const handler = () => listener(media.matches);
  media.addEventListener("change", handler);
  return () => media.removeEventListener("change", handler);
}

/**
 * Web Animations API wrapper: under reduced motion it jumps straight to the
 * final keyframe and returns null, so callers never need their own check.
 */
export function animate(
  element: Element,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions = {},
): Animation | null {
  if (reducedMotion() || typeof element.animate !== "function") {
    const last = keyframes[keyframes.length - 1];
    if (last && element instanceof HTMLElement)
      for (const [key, value] of Object.entries(last))
        if (key !== "offset" && key !== "easing" && key !== "composite")
          element.style.setProperty(
            key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`),
            String(value),
          );
    return null;
  }
  return element.animate(keyframes, {
    duration: 600,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    fill: "both",
    ...options,
  });
}

/**
 * How scroll progress (0..1) is measured for `onScrollProgress`:
 * - `exit`: 0 while the element's top is at the viewport top, 1 once it has scrolled out (heroes).
 * - `pin`: 0 when the element's top reaches the viewport top, 1 when its bottom reaches the
 *   viewport bottom (tall sections with a sticky child).
 * - `through`: 0 when the element enters at the bottom, 1 when it leaves at the top.
 */
export type ScrollMode = "exit" | "pin" | "through";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Calls `update(progress)` at most once per animation frame while `element`
 * is near the viewport. Scroll and resize listeners exist only while the
 * element is visible (IntersectionObserver). Does nothing under reduced
 * motion, so the static CSS state stays. Returns a stop function.
 */
export function onScrollProgress(
  element: Element,
  update: (progress: number) => void,
  mode: ScrollMode = "through",
): () => void {
  if (reducedMotion() || typeof IntersectionObserver !== "function")
    return () => {};
  let frame = 0;
  let listening = false;
  const measure = () => {
    frame = 0;
    const rect = element.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const progress =
      mode === "exit"
        ? -rect.top / Math.max(1, rect.height)
        : mode === "pin"
          ? -rect.top / Math.max(1, rect.height - vh)
          : (vh - rect.top) / (vh + rect.height);
    update(clamp01(progress));
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(measure);
  };
  const listen = (on: boolean) => {
    if (on === listening) return;
    listening = on;
    const method = on ? "addEventListener" : "removeEventListener";
    window[method]("scroll", schedule, { passive: true });
    window[method]("resize", schedule);
  };
  const observer = new IntersectionObserver(
    ([entry]) => {
      listen(Boolean(entry?.isIntersecting));
      schedule();
    },
    { rootMargin: "20% 0px" },
  );
  observer.observe(element);
  return () => {
    observer.disconnect();
    listen(false);
    if (frame) cancelAnimationFrame(frame);
  };
}

/**
 * Pointer position over `element` as -1..1 on each axis (0 at the centre),
 * delivered once per frame. Only for fine pointers that hover (not touch) and
 * never under reduced motion. Returns a stop function.
 */
export function onPointerTilt(
  element: HTMLElement,
  update: (x: number, y: number) => void,
): () => void {
  if (
    reducedMotion() ||
    !matchMedia("(hover: hover) and (pointer: fine)").matches
  )
    return () => {};
  let frame = 0;
  let x = 0;
  let y = 0;
  const flush = () => {
    frame = 0;
    update(x, y);
  };
  const move = (event: PointerEvent) => {
    const rect = element.getBoundingClientRect();
    x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    if (!frame) frame = requestAnimationFrame(flush);
  };
  const leave = () => {
    x = 0;
    y = 0;
    if (!frame) frame = requestAnimationFrame(flush);
  };
  element.addEventListener("pointermove", move, { passive: true });
  element.addEventListener("pointerleave", leave);
  return () => {
    element.removeEventListener("pointermove", move);
    element.removeEventListener("pointerleave", leave);
    if (frame) cancelAnimationFrame(frame);
  };
}

/**
 * Runs `tick(dtSeconds)` every frame while `element` is visible and the tab
 * is shown; pauses itself off-screen. Not started under reduced motion.
 * Returns controls to pause and resume it (for a visible Pause button).
 */
export function visibleLoop(
  element: Element,
  tick: (dt: number) => void,
): { pause(): void; resume(): void; readonly running: boolean } {
  let visible = false;
  let paused = reducedMotion();
  let frame = 0;
  let last = 0;
  const step = (now: number) => {
    const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
    last = now;
    tick(dt);
    frame = requestAnimationFrame(step);
  };
  const sync = () => {
    const run = visible && !paused && !document.hidden;
    if (run && !frame) {
      last = 0;
      frame = requestAnimationFrame(step);
    } else if (!run && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };
  if (typeof IntersectionObserver === "function")
    new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      sync();
    }).observe(element);
  document.addEventListener("visibilitychange", sync);
  return {
    pause() {
      paused = true;
      sync();
    },
    resume() {
      paused = false;
      sync();
    },
    get running() {
      return Boolean(frame);
    },
  };
}

/**
 * Marks `[data-reveal]` elements inside `root` as revealed when they scroll
 * into view (CSS in components/Reveal.astro does the transition). Without
 * IntersectionObserver, or under reduced motion, everything is revealed at once.
 */
export function observeReveal(root: ParentNode = document): void {
  const items = [
    ...root.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"),
  ];
  const show = (el: Element) => el.setAttribute("data-revealed", "");
  if (reducedMotion() || typeof IntersectionObserver !== "function") {
    items.forEach(show);
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        show(entry.target);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  items.forEach((el) => observer.observe(el));
}
