
"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

export default function GenerativeSurface() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    const hero = container.closest<HTMLElement>(
      ".hero-section"
    );

    if (!hero) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let width = 0;
    let height = 0;

    let time = 0;
    let lastTime = 0;
    let frameId = 0;

    let isInView = true;
    let isRunning = false;

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

   const settings = {
  desktopGrid: 30,
  mobileGrid: 18,
  waveSpeed: 0.22,
  waveHeight: 1.15,
  pointerStrength: 1.8,
  lineOpacity: 0.32,
  lineWidth: 0.55,
};

    function resize() {
      if (!container || !canvas || !context) return;

      const bounds = container.getBoundingClientRect();

      width = bounds.width;
      height = bounds.height;

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      draw();
    }

    function project(x: number, z: number): Point {
      const scale = width / 34;

      const waveOne =
        Math.sin(
          x * 0.38 +
          z * 0.24 +
          time +
          pointer.x * settings.pointerStrength
        ) * settings.waveHeight;

      const waveTwo =
        Math.cos(
          z * 0.45 -
          time * 0.75 +
          pointer.y * settings.pointerStrength
        ) * 0.95;

      const y = waveOne + waveTwo;

      return {
  x: width * 0.58 + (x - z * 0.62) * scale,

  y:
    height * 0.82 +
    (z * 0.36 + y) * scale,
};
    }

    function draw() {
      if (!context || width <= 0 || height <= 0) {
        return;
      }

      context.clearRect(0, 0, width, height);

      const grid =
        window.innerWidth < 900
          ? settings.mobileGrid
          : settings.desktopGrid;

      const half = grid / 2;
      const step = 0.5;

      context.lineWidth = settings.lineWidth;
      context.lineJoin = "round";
      context.lineCap = "round";

      const gradient = context.createLinearGradient(
        0,
        0,
        width,
        height
      );

      gradient.addColorStop(
        0,
        "rgba(241, 225, 148, 0.03)"
      );

      gradient.addColorStop(
        0.45,
        `rgba(241, 225, 148, ${settings.lineOpacity})`
      );

      gradient.addColorStop(
        1,
        "rgba(241, 225, 148, 0.04)"
      );

      context.strokeStyle = gradient;

      // Draw horizontal mathematical curves.

      for (let z = -half; z <= half; z++) {
        context.beginPath();

        for (let x = -half; x <= half; x += step) {
          const point = project(x, z);

          if (x === -half) {
            context.moveTo(point.x, point.y);
          } else {
            context.lineTo(point.x, point.y);
          }
        }

        context.stroke();
      }

      // Draw vertical mathematical curves.

      for (let x = -half; x <= half; x++) {
        context.beginPath();

        for (let z = -half; z <= half; z += step) {
          const point = project(x, z);

          if (z === -half) {
            context.moveTo(point.x, point.y);
          } else {
            context.lineTo(point.x, point.y);
          }
        }

        context.stroke();
      }
    }

    function animate(timestamp: number) {
      if (!isRunning) return;

      const delta = lastTime
        ? Math.min((timestamp - lastTime) / 1000, 0.05)
        : 0;

      lastTime = timestamp;

      time += delta * settings.waveSpeed;

      const smoothing = 1 - Math.exp(-delta * 4);

      pointer.x +=
        (pointer.targetX - pointer.x) * smoothing;

      pointer.y +=
        (pointer.targetY - pointer.y) * smoothing;

      draw();

      frameId = requestAnimationFrame(animate);
    }

    function stop() {
      isRunning = false;

      cancelAnimationFrame(frameId);

      frameId = 0;
      lastTime = 0;
    }

    function start() {
      if (
        isRunning ||
        reducedMotion.matches ||
        document.hidden ||
        !isInView
      ) {
        return;
      }

      isRunning = true;

      frameId = requestAnimationFrame(animate);
    }

    function handlePointerMove(event: PointerEvent) {
      if (
        event.pointerType === "touch" ||
        reducedMotion.matches
      ) {
        return;
      }

      if (!hero) return;

      const bounds = hero.getBoundingClientRect();

      pointer.targetX =
        ((event.clientX - bounds.left) /
          bounds.width -
          0.5) * 2;

      pointer.targetY =
        ((event.clientY - bounds.top) /
          bounds.height -
          0.5) * 2;
    }

    function handlePointerLeave() {
      pointer.targetX = 0;
      pointer.targetY = 0;
    }

    function handleVisibility() {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    }

    function handleMotionPreference() {
      if (reducedMotion.matches) {
        stop();

        time = 0;
        pointer.x = 0;
        pointer.y = 0;

        draw();
      } else {
        start();
      }
    }

    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(container);

    const intersectionObserver =
      new IntersectionObserver(
        ([entry]) => {
          isInView = entry.isIntersecting;

          if (isInView) {
            start();
          } else {
            stop();
          }
        },
        {
          threshold: 0,
        }
      );

    intersectionObserver.observe(container);

    hero.addEventListener(
      "pointermove",
      handlePointerMove
    );

    hero.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    reducedMotion.addEventListener(
      "change",
      handleMotionPreference
    );

    resize();

    start();

    return () => {
      stop();

      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      hero.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      hero.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );

      reducedMotion.removeEventListener(
        "change",
        handleMotionPreference
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="generative-surface"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
