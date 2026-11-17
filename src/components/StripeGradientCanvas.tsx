import { useEffect, useRef } from 'react';

/**
 * Lightweight Stripe.com-inspired flowing liquid gradient canvas.
 * Renders smooth multi-wave pastel-vivid color fields on a low-res offscreen buffer
 * upscaled cleanly with CSS blur, maintaining high luminance (never dark) and ~0.3ms/frame cost.
 */
export function StripeGradientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const width = 88;
    const height = 52;
    canvas.width = width;
    canvas.height = height;

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    // Bright, luminous Stripe-style pastel-vivid palette (kept high-luminance, never dark)
    const cSky = [138, 232, 255];      // Luminous cyan
    const cLavender = [188, 152, 255]; // Soft bright violet
    const cCoral = [255, 134, 168];    // Bright coral rose
    const cPeach = [255, 214, 136];    // Warm luminous gold-peach

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rafId = 0;
    const startTime = performance.now();

    const renderFrame = (timeMs: number) => {
      const t = (timeMs - startTime) * 0.00055;

      let ptr = 0;
      for (let y = 0; y < height; y++) {
        const ny = y / height;
        for (let x = 0; x < width; x++) {
          const nx = x / width;

          // Flowing diagonal liquid wave interference fields (Stripe mesh feel)
          const w1 = Math.sin(nx * 3.1 + ny * 1.9 - t * 1.35 + Math.cos(ny * 2.4 + t * 0.8));
          const w2 = Math.cos(nx * 2.3 - ny * 2.9 + t * 1.1 + Math.sin(nx * 2.1 - t * 0.7));
          const w3 = Math.sin((nx + ny) * 3.4 + t * 1.6);

          // Normalized smooth blend weights [0..1]
          const u = 0.5 + 0.5 * w1;
          const v = 0.5 + 0.5 * w2;
          const d = 0.5 + 0.5 * w3;

          // Bilinear mix across 4 bright stops + diagonal wave shimmer
          const topR = cSky[0] * (1 - u) + cLavender[0] * u;
          const topG = cSky[1] * (1 - u) + cLavender[1] * u;
          const topB = cSky[2] * (1 - u) + cLavender[2] * u;

          const botR = cCoral[0] * (1 - d) + cPeach[0] * d;
          const botG = cCoral[1] * (1 - d) + cPeach[1] * d;
          const botB = cCoral[2] * (1 - d) + cPeach[2] * d;

          // Gently lift towards white highlight on wave crests so colors never darken
          const crest = 0.14 * Math.max(0, w1 * w2);
          const r = Math.min(255, topR * (1 - v) + botR * v + 28 * crest);
          const g = Math.min(255, topG * (1 - v) + botG * v + 28 * crest);
          const b = Math.min(255, topB * (1 - v) + botB * v + 28 * crest);

          data[ptr++] = r;
          data[ptr++] = g;
          data[ptr++] = b;
          data[ptr++] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    renderFrame(startTime);

    if (!reducedMotion) {
      let lastDraw = 0;
      const tick = (now: number) => {
        // ~30fps cap for silky liquid wave motion with minimal CPU load
        if (now - lastDraw >= 32) {
          lastDraw = now;
          renderFrame(now);
        }
        rafId = window.requestAnimationFrame(tick);
      };
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="w-full h-full object-cover scale-110 blur-[26px] opacity-75 dark:opacity-35 transition-opacity duration-300"
    />
  );
}
