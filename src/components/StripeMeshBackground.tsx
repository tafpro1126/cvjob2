import { useEffect, useRef } from 'react';

export function StripeMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const W = 64;
    const H = 40;
    canvas.width = W;
    canvas.height = H;
    const imgData = ctx.createImageData(W, H);
    const data = imgData.data;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let isDark = document.documentElement.classList.contains('dark');
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
      if (prefersReducedMotion) renderFrame(0);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const renderFrame = (timeSec: number) => {
      const t = timeSec * 0.65;

      // Bright luminous Stripe-inspired palette in light mode ("pas foncé")
      // vs subtle deep luminous tones in dark mode
      const bgR = isDark ? 5 : 255;
      const bgG = isDark ? 8 : 255;
      const bgB = isDark ? 17 : 255;

      const c1 = isDark ? [56, 189, 248] : [132, 226, 255]; // Sky cyan
      const c2 = isDark ? [168, 85, 247] : [208, 178, 255]; // Soft lavender
      const c3 = isDark ? [244, 114, 182] : [255, 162, 184]; // Bright coral rose
      const c4 = isDark ? [99, 102, 241] : [255, 218, 138]; // Sunlit warm gold

      let idx = 0;
      for (let y = 0; y < H; y++) {
        const v = y / (H - 1);
        for (let x = 0; x < W; x++) {
          const u = x / (W - 1);

          // Multi-harmonic undulating wave field (Stripe-style flowing silk mesh)
          const wave1 = 0.5 + 0.5 * Math.sin(u * 2.8 + t * 1.05 + Math.cos(v * 2.2 - t * 0.7) * 0.9);
          const wave2 = 0.5 + 0.5 * Math.cos(v * 2.5 - t * 0.85 + Math.sin(u * 3.1 + t * 0.6) * 0.9);
          const wave3 = 0.5 + 0.5 * Math.sin((u * 1.9 - v * 1.4) * 2.1 + t * 1.15);

          const w1 = wave1 * (1 - wave2 * 0.4);
          const w2 = wave2 * (1 - wave3 * 0.35);
          const w3 = wave3 * wave1;
          const w4 = (1 - wave1) * (1 - wave3 * 0.5);
          const wSum = w1 + w2 + w3 + w4 || 1;

          const meshR = (c1[0] * w1 + c2[0] * w2 + c3[0] * w3 + c4[0] * w4) / wSum;
          const meshG = (c1[1] * w1 + c2[1] * w2 + c3[1] * w3 + c4[1] * w4) / wSum;
          const meshB = (c1[2] * w1 + c2[2] * w2 + c3[2] * w3 + c4[2] * w4) / wSum;

          // Diagonal Stripe-like sweep: vivid across top & right, feathering smoothly to bg at bottom & lower-left
          const diagProgress = v * 0.88 + (1 - u) * 0.28;
          const clamped = Math.max(0, Math.min(1, (diagProgress - 0.16) / 0.84));
          const smoothFade = clamped * clamped * (3 - 2 * clamped);
          const meshStrength = (isDark ? 0.34 : 0.72) * (1 - smoothFade * 0.92);

          data[idx++] = Math.round(bgR + (meshR - bgR) * meshStrength);
          data[idx++] = Math.round(bgG + (meshG - bgG) * meshStrength);
          data[idx++] = Math.round(bgB + (meshB - bgB) * meshStrength);
          data[idx++] = 255;
        }
      }

      ctx.putImageData(imgData, 0, 0);
    };

    let rafId = 0;
    const startMs = performance.now();

    if (prefersReducedMotion) {
      renderFrame(0);
    } else {
      const tick = (now: number) => {
        renderFrame((now - startMs) / 1000);
        rafId = window.requestAnimationFrame(tick);
      };
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
    >
      <canvas
        ref={canvasRef}
        data-testid="stripe-hero-mesh"
        className="w-full h-full object-cover block scale-105"
        style={{ imageRendering: 'auto' }}
      />
      {/* Gentle bottom fade into page background */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--bg)] to-transparent" />
    </div>
  );
}
