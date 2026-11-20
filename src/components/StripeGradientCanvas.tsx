import { useEffect, useRef } from 'react';

/**
 * Stripe-inspired luminous pastel mesh gradient canvas.
 * Smooth multi-wave radial/bezier color interpolation with bright hues,
 * keeping Hero borders intact and respecting prefers-reduced-motion.
 */
export function StripeGradientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rafId = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      // Keep internal resolution lightweight (scaled by browser smoothly via CSS)
      width = Math.max(320, Math.round((rect?.width || window.innerWidth) * 0.5));
      height = Math.max(240, Math.round((rect?.height || 640) * 0.5));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const drawFrame = (timeMs: number) => {
      const t = prefersReducedMotion ? 0 : timeMs * 0.00028;

      // Clean bright ivory-white base
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Soft organic glowing pastel blobs drifting in bright Stripe-inspired tones
      const blobs = [
        {
          // Lavender-violet top-right wash
          x: width * (0.76 + Math.sin(t * 1.1) * 0.1),
          y: height * (0.28 + Math.cos(t * 0.9) * 0.14),
          r: Math.max(width, height) * 0.52,
          c0: 'rgba(169, 96, 238, 0.52)',
          c1: 'rgba(169, 96, 238, 0)',
        },
        {
          // Coral-peach mid-right warmth
          x: width * (0.86 + Math.cos(t * 0.85) * 0.09),
          y: height * (0.56 + Math.sin(t * 1.15) * 0.14),
          r: Math.max(width, height) * 0.48,
          c0: 'rgba(255, 118, 128, 0.42)',
          c1: 'rgba(255, 118, 128, 0)',
        },
        {
          // Sunny amber glow
          x: width * (0.64 + Math.sin(t * 0.7 + 1.5) * 0.11),
          y: height * (0.24 + Math.sin(t * 1.05 + 0.8) * 0.12),
          r: Math.max(width, height) * 0.44,
          c0: 'rgba(255, 203, 87, 0.40)',
          c1: 'rgba(255, 203, 87, 0)',
        },
        {
          // Airy cyan-sky bottom-right stream
          x: width * (0.70 + Math.cos(t * 0.95 + 2.2) * 0.12),
          y: height * (0.78 + Math.sin(t * 0.8 + 1.1) * 0.1),
          r: Math.max(width, height) * 0.5,
          c0: 'rgba(144, 224, 255, 0.52)',
          c1: 'rgba(144, 224, 255, 0)',
        },
      ];

      for (const b of blobs) {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, b.c0);
        grad.addColorStop(1, b.c1);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    drawFrame(0);

    if (!prefersReducedMotion) {
      const loop = (now: number) => {
        drawFrame(now);
        rafId = window.requestAnimationFrame(loop);
      };
      rafId = window.requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="w-full h-full block opacity-95 dark:opacity-25 transition-opacity duration-300"
    />
  );
}
