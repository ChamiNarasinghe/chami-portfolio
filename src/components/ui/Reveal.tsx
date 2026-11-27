"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  immediate?: boolean;
}

type RevealStyle = CSSProperties & {
  "--reveal-delay": string;
  "--reveal-duration": string;
  "--reveal-distance": string;
};

const observedElements = new Set<HTMLDivElement>();
const transitionEndHandlers = new Map<
  HTMLDivElement,
  (event: TransitionEvent) => void
>();
const transitionFallbackTimers = new Map<HTMLDivElement, number>();

let sharedObserver: IntersectionObserver | null = null;

function parseCssTime(value: string) {
  const time = Number.parseFloat(value);

  if (!Number.isFinite(time)) {
    return 0;
  }

  return value.trim().endsWith("ms") ? time : time * 1000;
}

function getTransitionWaitTime(element: HTMLDivElement) {
  const styles = window.getComputedStyle(element);

  if (styles.transitionProperty === "none") {
    return 0;
  }

  const durations = styles.transitionDuration
    .split(",")
    .map(parseCssTime);
  const delays = styles.transitionDelay
    .split(",")
    .map(parseCssTime);

  return Math.max(
    0,
    Math.max(...durations) + Math.max(...delays),
  );
}

function stopObserving(
  element: HTMLDivElement,
  observer: IntersectionObserver,
) {
  observer.unobserve(element);
  observedElements.delete(element);

  const transitionEndHandler = transitionEndHandlers.get(element);

  if (transitionEndHandler) {
    element.removeEventListener("transitionend", transitionEndHandler);
    transitionEndHandlers.delete(element);
  }

  const fallbackTimer = transitionFallbackTimers.get(element);

  if (fallbackTimer !== undefined) {
    window.clearTimeout(fallbackTimer);
    transitionFallbackTimers.delete(element);
  }

  if (observedElements.size === 0 && sharedObserver === observer) {
    observer.disconnect();
    sharedObserver = null;
  }
}

function getSharedObserver() {
  if (typeof IntersectionObserver === "undefined") {
    return null;
  }

  if (sharedObserver) {
    return sharedObserver;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLDivElement;

        if (entry.isIntersecting) {
          if (element.dataset.revealState === "visible") {
            continue;
          }

          const wasPending = element.dataset.revealState === "pending";

          if (wasPending && entry.intersectionRatio < 0.15) {
            continue;
          }

          element.dataset.revealState = "visible";

          if (!wasPending || element.matches(":focus-within")) {
            stopObserving(element, observer);
            continue;
          }

          const waitTime = getTransitionWaitTime(element);

          if (waitTime === 0) {
            stopObserving(element, observer);
            continue;
          }

          const finishTransition = (event?: TransitionEvent) => {
            if (
              event &&
              (event.target !== element ||
                (event.propertyName !== "opacity" &&
                  event.propertyName !== "transform"))
            ) {
              return;
            }

            stopObserving(element, observer);
          };

          const transitionEndHandler = (event: TransitionEvent) => {
            finishTransition(event);
          };

          transitionEndHandlers.set(element, transitionEndHandler);
          element.addEventListener("transitionend", transitionEndHandler);

          const fallbackTimer = window.setTimeout(
            () => finishTransition(),
            waitTime + 50,
          );
          transitionFallbackTimers.set(element, fallbackTimer);
        } else if (element.dataset.revealState === undefined) {
          element.dataset.revealState = "pending";
        }
      }
    },
    { threshold: 0.15 },
  );

  sharedObserver = observer;
  return observer;
}

function observeElement(element: HTMLDivElement) {
  const observer = getSharedObserver();

  if (!observer) {
    return undefined;
  }

  observedElements.add(element);
  observer.observe(element);

  return () => stopObserving(element, observer);
}

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  distance = 24,
  immediate = false,
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (immediate) {
      return;
    }

    const element = elementRef.current;

    if (!element) {
      return;
    }

    return observeElement(element);
  }, [immediate]);

  const style: RevealStyle = {
    "--reveal-delay": `${delay}s`,
    "--reveal-duration": `${duration}s`,
    "--reveal-distance": `${distance}px`,
  };
  const classes = [
    "reveal",
    immediate ? "reveal--immediate" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={elementRef} className={classes} style={style}>
      {children}
    </div>
  );
}
