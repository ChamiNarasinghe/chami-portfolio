
"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

interface Pointer {
  x: number;
  y: number;
  active: boolean;
}

const SETTINGS = {
  desktopParticles: 75,
  mobileParticles: 25,

  desktopFPS: 30,
  mobileFPS: 24,

  desktopPixelRatio: 2,
  mobilePixelRatio: 1.5,

  connectionDistance: 140,
  pointerDistance: 180,

  speed: 0.4,
};

const CONNECTION_DISTANCE_SQUARED =
  SETTINGS.connectionDistance *
  SETTINGS.connectionDistance;

const POINTER_DISTANCE_SQUARED =
  SETTINGS.pointerDistance *
  SETTINGS.pointerDistance;

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d", {
      alpha: true,
    });

    if (!context) return;

    const container = canvas.parentElement;

    if (!container) return;

    const hero =
      container.closest<HTMLElement>(".hero-section");

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const mobilePreference = window.matchMedia(
      "(max-width: 767px)"
    );

    const pointerPreference = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    const supportsIntersectionObserver =
      typeof window.IntersectionObserver === "function";

    let width = 0;
    let height = 0;

    let pixelRatio = 1;

    let particles: Particle[] = [];

    let animationFrame = 0;
    let resizeFrame = 0;

    let isVisible = !supportsIntersectionObserver;
    let isDisposed = false;

    let lastFrameTime = 0;
    let frameInterval = 1000 / SETTINGS.desktopFPS;

    let canvasBounds = canvas.getBoundingClientRect();

    const pointer: Pointer = {
      x: 0,
      y: 0,
      active: false,
    };

    // =========================================
    // PARTICLE CREATION
    // =========================================

    function createParticle(): Particle {
      return {
        x: Math.random() * width,
        y: Math.random() * height,

        vx:
          (Math.random() - 0.5) *
          SETTINGS.speed,

        vy:
          (Math.random() - 0.5) *
          SETTINGS.speed,

        radius: Math.random() * 1.2 + 0.6,
        opacity: Math.random() * 0.4 + 0.2,
      };
    }

    // =========================================
    // RESPONSIVE CANVAS CONFIGURATION
    // =========================================

    function resize() {
      if (
        !canvas ||
        !context ||
        !container ||
        isDisposed
      ) {
        return;
      }

      const bounds =
        container.getBoundingClientRect();

      const nextWidth = bounds.width;
      const nextHeight = bounds.height;

      if (nextWidth <= 0 || nextHeight <= 0) {
        width = 0;
        height = 0;
        stopAnimation();
        return;
      }

      const isMobile = mobilePreference.matches;

      const nextPixelRatio = Math.min(
        window.devicePixelRatio || 1,

        isMobile
          ? SETTINGS.mobilePixelRatio
          : SETTINGS.desktopPixelRatio
      );

      const particleCount = isMobile
        ? SETTINGS.mobileParticles
        : SETTINGS.desktopParticles;

      frameInterval =
        1000 /
        (
          isMobile
            ? SETTINGS.mobileFPS
            : SETTINGS.desktopFPS
        );

      canvasBounds =
        canvas.getBoundingClientRect();

      // Avoid rebuilding an unchanged canvas.

      if (
        width === nextWidth &&
        height === nextHeight &&
        pixelRatio === nextPixelRatio &&
        particles.length === particleCount
      ) {
        return;
      }

      const previousWidth = width;
      const previousHeight = height;

      width = nextWidth;
      height = nextHeight;
      pixelRatio = nextPixelRatio;

      canvas.width = Math.round(
        width * pixelRatio
      );

      canvas.height = Math.round(
        height * pixelRatio
      );

      context.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
      );

      // Preserve existing particle positions
      // during responsive layout changes.

      if (
        particles.length > 0 &&
        previousWidth > 0 &&
        previousHeight > 0
      ) {
        const scaleX =
          width / previousWidth;

        const scaleY =
          height / previousHeight;

        for (const particle of particles) {
          particle.x *= scaleX;
          particle.y *= scaleY;
        }
      }

      // Adjust particle count without
      // rebuilding the entire network.

      if (particles.length > particleCount) {
        particles.length = particleCount;
      }

      while (particles.length < particleCount) {
        particles.push(createParticle());
      }

      pointer.active = false;

      draw();
      syncAnimation();
    }

    function scheduleResize() {
      if (resizeFrame || isDisposed) return;

      resizeFrame =
        window.requestAnimationFrame(() => {
          resizeFrame = 0;
          resize();
        });
    }

    // =========================================
    // DRAW NETWORK CONNECTION
    // =========================================

    function drawConnection(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      opacity: number
    ) {
      if (!context) return;

      context.beginPath();

      context.moveTo(x1, y1);
      context.lineTo(x2, y2);

      context.strokeStyle =
        `rgba(182, 154, 99, ${opacity})`;

      context.lineWidth = 0.9;

      context.stroke();
    }

    // =========================================
    // UPDATE PARTICLE POSITIONS
    // =========================================

    function updateParticles(delta: number) {
      for (const particle of particles) {
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;

        if (particle.x < 0) {
          particle.x = 0;
          particle.vx *= -1;
        } else if (particle.x > width) {
          particle.x = width;
          particle.vx *= -1;
        }

        if (particle.y < 0) {
          particle.y = 0;
          particle.vy *= -1;
        } else if (particle.y > height) {
          particle.y = height;
          particle.vy *= -1;
        }
      }
    }

    // =========================================
    // RENDER NETWORK
    // =========================================

    function draw() {
      if (
        !context ||
        width <= 0 ||
        height <= 0 ||
        isDisposed
      ) {
        return;
      }

      context.clearRect(
        0,
        0,
        width,
        height
      );

      const hasActivePointer =
        pointer.active &&
        pointerPreference.matches &&
        !motionPreference.matches;

      for (
        let i = 0;
        i < particles.length;
        i++
      ) {
        const particle = particles[i];

        // Draw particle node.

        context.beginPath();

        context.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        context.fillStyle =
          `rgba(241, 225, 148, ${particle.opacity})`;

        context.fill();

        // Connect nearby particles.

        for (
          let j = i + 1;
          j < particles.length;
          j++
        ) {
          const other = particles[j];

          const dx =
            particle.x - other.x;

          const dy =
            particle.y - other.y;

          const distanceSquared =
            dx * dx + dy * dy;

          // Skip distant particles without
          // calculating a square root.

          if (
            distanceSquared >=
            CONNECTION_DISTANCE_SQUARED
          ) {
            continue;
          }

          const distance =
            Math.sqrt(distanceSquared);

          const opacity =
            (
              1 -
              distance /
                SETTINGS.connectionDistance
            ) * 0.25;

          drawConnection(
            particle.x,
            particle.y,
            other.x,
            other.y,
            opacity
          );
        }

        // Cursor-responsive connections.

        if (hasActivePointer) {
          const dx =
            particle.x - pointer.x;

          const dy =
            particle.y - pointer.y;

          const distanceSquared =
            dx * dx + dy * dy;

          if (
            distanceSquared <
            POINTER_DISTANCE_SQUARED
          ) {
            const distance =
              Math.sqrt(distanceSquared);

            const opacity =
              (
                1 -
                distance /
                  SETTINGS.pointerDistance
              ) * 0.55;

            drawConnection(
              particle.x,
              particle.y,
              pointer.x,
              pointer.y,
              opacity
            );
          }
        }
      }
    }

    // =========================================
    // FRAME RATE CONTROL
    // =========================================

    function canAnimate() {
      return (
        supportsIntersectionObserver &&
        !isDisposed &&
        isVisible &&
        !document.hidden &&
        !motionPreference.matches &&
        width > 0 &&
        height > 0
      );
    }

    function animate(timestamp: number) {
      animationFrame = 0;

      if (!canAnimate()) return;

      if (!lastFrameTime) {
        lastFrameTime =
          timestamp - frameInterval;
      }

      const elapsed =
        timestamp - lastFrameTime;

      if (elapsed >= frameInterval - 0.5) {
        // Preserve movement speed across
        // different rendering frame rates.

        const delta = Math.min(
          elapsed / 16.67,
          3
        );

        lastFrameTime = timestamp;

        updateParticles(delta);
        draw();
      }

      animationFrame =
        window.requestAnimationFrame(animate);
    }

    function stopAnimation() {
      if (animationFrame) {
        window.cancelAnimationFrame(
          animationFrame
        );
      }

      animationFrame = 0;
      lastFrameTime = 0;
    }

    function syncAnimation() {
      if (canAnimate()) {
        if (!animationFrame) {
          lastFrameTime = 0;

          animationFrame =
            window.requestAnimationFrame(
              animate
            );
        }
      } else {
        stopAnimation();

        pointer.active = false;

        // Preserve a static network for
        // reduced-motion users.

        if (
          isVisible &&
          !document.hidden
        ) {
          draw();
        }
      }
    }

    // =========================================
    // POINTER INTERACTION
    // =========================================

    function handlePointerMove(
      event: PointerEvent
    ) {
      if (
        !canAnimate() ||
        !pointerPreference.matches ||
        event.pointerType !== "mouse"
      ) {
        pointer.active = false;
        return;
      }

      pointer.x =
        event.clientX - canvasBounds.left;

      pointer.y =
        event.clientY - canvasBounds.top;

      pointer.active =
        pointer.x >= 0 &&
        pointer.x <= width &&
        pointer.y >= 0 &&
        pointer.y <= height;
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    function refreshCanvasBounds() {
      if (
        !canvas ||
        !supportsIntersectionObserver ||
        !isVisible ||
        isDisposed
      ) {
        return;
      }

      canvasBounds =
        canvas.getBoundingClientRect();

      pointer.active = false;
    }

    function handlePreferenceChange() {
      pointer.active = false;
      scheduleResize();
      syncAnimation();
    }

    // =========================================
    // VIEWPORT VISIBILITY
    // =========================================

    let intersectionObserver: IntersectionObserver | null =
      null;

    if (supportsIntersectionObserver) {
      intersectionObserver =
        new window.IntersectionObserver(
          ([entry]) => {
            if (!entry) return;

            isVisible = entry.isIntersecting;

            if (isVisible) {
              refreshCanvasBounds();
            }

            syncAnimation();
          },
          {
            threshold: 0,
          }
        );

      intersectionObserver.observe(container);
    }

    // =========================================
    // RESPONSIVE LAYOUT OBSERVER
    // =========================================

    const resizeObserver =
      new ResizeObserver(scheduleResize);

    resizeObserver.observe(container);

    // =========================================
    // EVENT LISTENERS
    // =========================================

    hero?.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    hero?.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    window.addEventListener(
      "scroll",
      refreshCanvasBounds,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      scheduleResize,
      { passive: true }
    );

    document.addEventListener(
      "visibilitychange",
      syncAnimation
    );

    motionPreference.addEventListener(
      "change",
      syncAnimation
    );

    mobilePreference.addEventListener(
      "change",
      handlePreferenceChange
    );

    pointerPreference.addEventListener(
      "change",
      handlePreferenceChange
    );

    // =========================================
    // INITIALIZATION
    // =========================================

    resize();
    syncAnimation();

    // =========================================
    // RESOURCE CLEANUP
    // =========================================

    return () => {
      isDisposed = true;

      stopAnimation();

      if (resizeFrame) {
        window.cancelAnimationFrame(
          resizeFrame
        );
      }

      resizeObserver.disconnect();
      intersectionObserver?.disconnect();

      hero?.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      hero?.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      window.removeEventListener(
        "scroll",
        refreshCanvasBounds
      );

      window.removeEventListener(
        "resize",
        scheduleResize
      );

      document.removeEventListener(
        "visibilitychange",
        syncAnimation
      );

      motionPreference.removeEventListener(
        "change",
        syncAnimation
      );

      mobilePreference.removeEventListener(
        "change",
        handlePreferenceChange
      );

      pointerPreference.removeEventListener(
        "change",
        handlePreferenceChange
      );

      particles = [];
    };
  }, []);

  return (
    <div
      className="neural-network"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="neural-network-canvas"
      />
    </div>
  );
}
