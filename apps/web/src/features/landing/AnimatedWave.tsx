import { useEffect, useRef } from 'react';

function resolveCanvasColor(alpha: number) {
  const rgb = getComputedStyle(document.documentElement).getPropertyValue('--landing-canvas-rgb').trim() || '17 17 17';
  const normalized = rgb.replace(/\s+/g, ', ');
  return `rgba(${normalized}, ${alpha})`;
}

export function AnimatedWave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (/jsdom/i.test(window.navigator.userAgent)) return;
    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext('2d');
    } catch {
      return;
    }
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const chars = '·∘○◯◌●◉';
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const cols = Math.max(8, Math.floor(rect.width / 22));
      const rows = Math.max(4, Math.floor(rect.height / 22));
      ctx.font = '14px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const px = (x + 0.5) * (rect.width / cols);
          const py = (y + 0.5) * (rect.height / rows);
          const wave1 = Math.sin(x * 0.22 + time * 1.7) * Math.cos(y * 0.18 + time);
          const wave2 = Math.sin((x + y) * 0.1 + time * 1.2);
          const wave3 = Math.cos(x * 0.08 - y * 0.12 + time * 0.75);
          const combined = (wave1 + wave2 + wave3) / 3;
          const normalized = (combined + 1) / 2;
          const charIndex = Math.max(0, Math.min(chars.length - 1, Math.floor(normalized * (chars.length - 1))));
          ctx.fillStyle = resolveCanvasColor(0.08 + normalized * 0.36);
          ctx.fillText(chars[charIndex], px, py);
        }
      }

      time += reduceMotion ? 0.002 : 0.025;
      frameRef.current = window.requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="landing-canvas" aria-hidden="true" />;
}
