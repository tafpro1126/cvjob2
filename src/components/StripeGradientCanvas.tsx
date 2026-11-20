import { useEffect, useRef, useState } from 'react';

interface PaletteColors {
  bg: [number, number, number];
  c1: [number, number, number];
  c2: [number, number, number];
  c3: [number, number, number];
  c4: [number, number, number];
  c5: [number, number, number];
}

function parseCssColor(raw: string, fallback: [number, number, number]): [number, number, number] {
  const s = raw.trim();
  if (s.startsWith('#')) {
    const hex = s.slice(1);
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16) / 255,
        parseInt(hex[1] + hex[1], 16) / 255,
        parseInt(hex[2] + hex[2], 16) / 255,
      ];
    }
    if (hex.length >= 6) {
      return [
        parseInt(hex.slice(0, 2), 16) / 255,
        parseInt(hex.slice(2, 4), 16) / 255,
        parseInt(hex.slice(4, 6), 16) / 255,
      ];
    }
  }
  const m = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (m) {
    return [Number(m[1]) / 255, Number(m[2]) / 255, Number(m[3]) / 255];
  }
  return fallback;
}

function readThemeWavePalette(): PaletteColors {
  const cs = getComputedStyle(document.documentElement);
  return {
    bg: parseCssColor(cs.getPropertyValue('--wave-bg'), [0.98, 0.98, 0.99]),
    c1: parseCssColor(cs.getPropertyValue('--wave-1'), [0.31, 0.27, 0.9]),
    c2: parseCssColor(cs.getPropertyValue('--wave-2'), [0.55, 0.36, 0.96]),
    c3: parseCssColor(cs.getPropertyValue('--wave-3'), [0.96, 0.45, 0.71]),
    c4: parseCssColor(cs.getPropertyValue('--wave-4'), [0.98, 0.57, 0.24]),
    c5: parseCssColor(cs.getPropertyValue('--wave-5'), [0.22, 0.74, 0.97]),
  };
}

function lerpVec3(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

// Vertex shader : plan subdivisé 128×128 sommets déformé par bruit Simplex 3D + normales
const VERTEX_SHADER_SRC = `
  precision highp float;
  attribute vec2 aPos;
  uniform float uTime;
  uniform float uAspect;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;

  // Bruit Simplex 3D (Ashima) pour des ondulations continues sans couture
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  float waveHeight(vec2 uv, float t) {
    // Grande houle + onde secondaire pour former crêtes et creux fluides (cycle ~16 s)
    float w1 = snoise(vec3(uv.x * 2.1 + t * 0.25, uv.y * 1.8 - t * 0.16, t * 0.38));
    float w2 = snoise(vec3(uv.x * 4.2 - t * 0.18, uv.y * 3.4 + t * 0.22, t * 0.52 + 3.1)) * 0.42;
    return (w1 + w2) * 0.16;
  }

  void main() {
    vec2 overscanPos = aPos * 1.18;
    vUv = overscanPos * 0.5 + 0.5;
    float h = waveHeight(vUv, uTime);
    float eps = 0.015;
    float hx = waveHeight(vUv + vec2(eps, 0.0), uTime);
    float hy = waveHeight(vUv + vec2(0.0, eps), uTime);

    vec3 tangentX = normalize(vec3(eps * 2.0, 0.0, hx - h));
    vec3 tangentY = normalize(vec3(0.0, eps * 2.0, hy - h));
    vNormal = normalize(cross(tangentX, tangentY));
    vElevation = h;

    // Perspective subtile inclinant le ruban ondulant sans jamais découvrir les bords
    vec2 warped = overscanPos;
    warped.y += h * 0.62;
    warped.x += h * (0.26 / max(uAspect, 0.7));
    gl_Position = vec4(warped, h * 0.2, 1.0);
  }
`;

// Fragment shader : mélange fluide des 5 couleurs + éclairage des crêtes + masque diagonal doux
const FRAGMENT_SHADER_SRC = `
  precision highp float;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;

  uniform float uTime;
  uniform vec3 uBg;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform vec3 uC4;
  uniform vec3 uC5;

  void main() {
    // Ondulation des coordonnées couleurs synchronisée à la hauteur du maillage
    vec2 p = vUv + vec2(vElevation * 0.9, -vElevation * 0.7);
    float flow1 = sin(p.x * 3.1 + uTime * 0.42 + p.y * 1.6) * 0.5 + 0.5;
    float flow2 = cos(p.y * 3.5 - uTime * 0.35 + p.x * 2.2) * 0.5 + 0.5;
    float flow3 = sin((p.x - p.y) * 4.0 + uTime * 0.28) * 0.5 + 0.5;

    vec3 colA = mix(uC1, uC2, smoothstep(0.1, 0.9, flow1));
    vec3 colB = mix(uC3, uC4, smoothstep(0.15, 0.85, flow2));
    vec3 colC = mix(colA, colB, smoothstep(0.2, 0.8, flow3));
    vec3 surfaceColor = mix(colC, uC5, smoothstep(0.3, 0.9, vUv.x * 0.5 + (1.0 - vUv.y) * 0.4 + vElevation));

    // Léger éclairage directionnel faisant ressortir les crêtes et les creux de l'ondulation
    vec3 lightDir = normalize(vec3(-0.35, 0.55, 0.75));
    float diff = max(dot(vNormal, lightDir), 0.0);
    float crestHighlight = smoothstep(-0.08, 0.14, vElevation);
    surfaceColor += (diff - 0.55) * 0.14 + crestHighlight * 0.08;

    // Ruban diagonal (côté droit et haut) avec bords fondus vers le fond du thème
    float diag = (vUv.x * 0.72 + vUv.y * 0.58) + vElevation * 0.85;
    float ribbonMask = smoothstep(0.22, 0.96, diag);
    float bottomFade = smoothstep(0.0, 0.28, vUv.y);
    float rightEdgeFade = 1.0 - smoothstep(0.95, 1.02, vUv.x) * 0.12;
    float alpha = clamp(ribbonMask * bottomFade * rightEdgeFade, 0.0, 1.0);

    vec3 finalRgb = mix(uBg, surfaceColor, alpha * 0.88);
    gl_FragColor = vec4(finalRgb, 1.0);
  }
`;

/**
 * WebGL natif : plan subdivisé 128×128 sommets déformé par bruit Simplex 3D (cycle ~16 s).
 * - Palette lue depuis les variables CSS par thème, interpolation fluide de 400 ms au changement de thème.
 * - DPR <= 1.5 (<= 1 mobile), FPS 60 ou 30 sur matériel modeste, pause hors écran & onglet masqué, ResizeObserver.
 * - Repli automatique CSS statique si WebGL indisponible ou prefers-reduced-motion.
 */
export function StripeGradientCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [useStaticFallback, setUseStaticFallback] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setUseStaticFallback(true);
      return;
    }

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = (canvas.getContext('webgl', {
        alpha: false,
        antialias: true,
        powerPreference: 'low-power',
      }) ||
        canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }

    if (!gl) {
      setUseStaticFallback(true);
      return;
    }

    const compileShader = (type: number, source: string) => {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    const program = vs && fs ? gl.createProgram() : null;

    if (!vs || !fs || !program) {
      setUseStaticFallback(true);
      return;
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setUseStaticFallback(true);
      return;
    }

    gl.useProgram(program);

    // Génération de la grille subdivisée 128×128 sommets (16 384 sommets, indices Uint16)
    const GRID = 128;
    const vertices = new Float32Array(GRID * GRID * 2);
    let ptr = 0;
    for (let y = 0; y < GRID; y++) {
      const ny = (y / (GRID - 1)) * 2 - 1;
      for (let x = 0; x < GRID; x++) {
        const nx = (x / (GRID - 1)) * 2 - 1;
        vertices[ptr++] = nx;
        vertices[ptr++] = ny;
      }
    }

    const indices = new Uint16Array((GRID - 1) * (GRID - 1) * 6);
    let iPtr = 0;
    for (let y = 0; y < GRID - 1; y++) {
      for (let x = 0; x < GRID - 1; x++) {
        const a = y * GRID + x;
        const b = a + 1;
        const c = (y + 1) * GRID + x;
        const d = c + 1;
        indices[iPtr++] = a;
        indices[iPtr++] = b;
        indices[iPtr++] = c;
        indices[iPtr++] = b;
        indices[iPtr++] = d;
        indices[iPtr++] = c;
      }
    }

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const ebo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const aPosLoc = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uAspectLoc = gl.getUniformLocation(program, 'uAspect');
    const uBgLoc = gl.getUniformLocation(program, 'uBg');
    const uC1Loc = gl.getUniformLocation(program, 'uC1');
    const uC2Loc = gl.getUniformLocation(program, 'uC2');
    const uC3Loc = gl.getUniformLocation(program, 'uC3');
    const uC4Loc = gl.getUniformLocation(program, 'uC4');
    const uC5Loc = gl.getUniformLocation(program, 'uC5');

    // Interpolation de palette 400ms lors du basculement clair / sombre
    let currentPalette = readThemeWavePalette();
    let startPalette = currentPalette;
    let targetPalette = currentPalette;
    let transitionStart = 0;
    const TRANSITION_MS = 400;

    const themeObserver = new MutationObserver(() => {
      startPalette = { ...currentPalette };
      targetPalette = readThemeWavePalette();
      transitionStart = performance.now();
      ensureRunning();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Dimensionnement plafonné (DPR <= 1.5 desktop, <= 1 mobile)
    const updateSize = () => {
      if (!gl) return;
      const rect = container.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);
      const w = Math.max(2, Math.round(rect.width * dpr));
      const h = Math.max(2, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform1f(uAspectLoc, w / Math.max(1, h));
      }
    };
    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    // Adaptation FPS : 30 fps sur matériel modeste, 60 fps sinon
    const devMem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const isLowSpec = (navigator.hardwareConcurrency || 8) <= 4 || (devMem !== undefined && devMem <= 4);
    const frameInterval = 1000 / (isLowSpec ? 30 : 60);

    let isVisible = true;
    let isTabVisible = !document.hidden;
    let rafId = 0;
    let lastDrawTime = 0;
    let elapsedSimSec = 0;
    let prevTickMs = performance.now();

    const draw = (now: number) => {
      rafId = 0;
      if (!gl || !isVisible || !isTabVisible || motionQuery.matches) return;

      rafId = window.requestAnimationFrame(draw);

      if (now - lastDrawTime < frameInterval) return;
      const dt = Math.min(0.1, (now - prevTickMs) / 1000);
      prevTickMs = now;
      lastDrawTime = now;

      // Avancement lent (~16 s pour un cycle complet de phase)
      elapsedSimSec += dt * 0.4;

      if (transitionStart > 0) {
        const p = Math.min(1, (now - transitionStart) / TRANSITION_MS);
        currentPalette = {
          bg: lerpVec3(startPalette.bg, targetPalette.bg, p),
          c1: lerpVec3(startPalette.c1, targetPalette.c1, p),
          c2: lerpVec3(startPalette.c2, targetPalette.c2, p),
          c3: lerpVec3(startPalette.c3, targetPalette.c3, p),
          c4: lerpVec3(startPalette.c4, targetPalette.c4, p),
          c5: lerpVec3(startPalette.c5, targetPalette.c5, p),
        };
        if (p >= 1) transitionStart = 0;
      }

      gl.clearColor(currentPalette.bg[0], currentPalette.bg[1], currentPalette.bg[2], 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTimeLoc, elapsedSimSec);
      gl.uniform3fv(uBgLoc, currentPalette.bg);
      gl.uniform3fv(uC1Loc, currentPalette.c1);
      gl.uniform3fv(uC2Loc, currentPalette.c2);
      gl.uniform3fv(uC3Loc, currentPalette.c3);
      gl.uniform3fv(uC4Loc, currentPalette.c4);
      gl.uniform3fv(uC5Loc, currentPalette.c5);

      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    };

    const ensureRunning = () => {
      if (!rafId && isVisible && isTabVisible && !motionQuery.matches) {
        prevTickMs = performance.now();
        rafId = window.requestAnimationFrame(draw);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) {
          ensureRunning();
        } else if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { threshold: 0.01 }
    );
    io.observe(container);

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        ensureRunning();
      } else if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const onMotionChange = () => {
      if (motionQuery.matches) {
        setUseStaticFallback(true);
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
      } else {
        setUseStaticFallback(false);
        ensureRunning();
      }
    };
    motionQuery.addEventListener('change', onMotionChange);

    // Rendu immédiat de la première frame + lancement de boucle
    ensureRunning();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      io.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      motionQuery.removeEventListener('change', onMotionChange);
      if (gl) {
        gl.deleteBuffer(vbo);
        gl.deleteBuffer(ebo);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      }
    };
  }, []);

  if (useStaticFallback) {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className="w-full h-full hero-wave-fallback pointer-events-none"
      />
    );
  }

  return (
    <div ref={containerRef} aria-hidden="true" className="w-full h-full pointer-events-none">
      <canvas ref={canvasRef} aria-hidden="true" className="w-full h-full block pointer-events-none" />
    </div>
  );
}
