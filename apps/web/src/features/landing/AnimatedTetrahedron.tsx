import { useEffect, useRef } from 'react';

function resolveCanvasColor(alpha: number) {
  const rgb = getComputedStyle(document.documentElement).getPropertyValue('--landing-canvas-rgb').trim() || '17 17 17';
  const normalized = rgb.replace(/\s+/g, ', ');
  return `rgba(${normalized}, ${alpha})`;
}

export function AnimatedTetrahedron() {
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
    const vertices = [
      { x: 0, y: 1, z: 0 },
      { x: -0.943, y: -0.333, z: -0.5 },
      { x: 0.943, y: -0.333, z: -0.5 },
      { x: 0, y: -0.333, z: 1 }
    ];
    const edges = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
      [2, 3],
      [3, 1]
    ] as const;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rotateY = (point: { x: number; y: number; z: number }, angle: number) => ({
      x: point.x * Math.cos(angle) - point.z * Math.sin(angle),
      y: point.y,
      z: point.x * Math.sin(angle) + point.z * Math.cos(angle)
    });
    const rotateX = (point: { x: number; y: number; z: number }, angle: number) => ({
      x: point.x,
      y: point.y * Math.cos(angle) - point.z * Math.sin(angle),
      z: point.y * Math.sin(angle) + point.z * Math.cos(angle)
    });

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const scale = Math.min(rect.width, rect.height) * 0.36;

      const projected = vertices.map((vertex) => {
        const rotated = rotateX(rotateY(vertex, time * 0.7), time * 0.45);
        return {
          x: centerX + rotated.x * scale,
          y: centerY + rotated.y * scale,
          z: rotated.z
        };
      });

      ctx.lineWidth = 1.4;
      edges.forEach(([a, b], index) => {
        const start = projected[a];
        const end = projected[b];
        ctx.strokeStyle = resolveCanvasColor(0.2 + (index % 3) * 0.16);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      });

      projected.forEach((point, index) => {
        ctx.fillStyle = resolveCanvasColor(0.24 + (index % 2) * 0.2);
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      time += reduceMotion ? 0.003 : 0.02;
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
