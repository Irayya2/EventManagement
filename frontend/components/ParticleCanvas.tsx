import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({ x: null, y: null, radius: 120 });
  const dotsRef = useRef<{ x: number; y: number; vx: number; vy: number; r: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // CONFIG — exact match to original
    const HUB_CONNECTIONS = 8;
    const DOT_COUNT = 280;
    const SPEED = 0.15;
    const MAX_LINE_DISTANCE = 120;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize dots
    dotsRef.current = [];
    for (let i = 0; i < DOT_COUNT; i++) {
      dotsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: 1.6,
      });
    }

    // Mouse (relative to container)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Helpers
    function getLineStyle(distance: number, maxDistance: number, baseOpacity: number) {
      const t = Math.max(0, 1 - distance / maxDistance);
      return {
        opacity: baseOpacity * t,
        width: 0.3 + t * 0.7,
      };
    }

    // Animate
    const animate = () => {
      const dots = dotsRef.current;
      const mouse = mouseRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // -------- DRAW DOTS --------
      for (let dot of dots) {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        let isNear = false;
        let intensity = 0;

        if (mouse.x !== null) {
          const dx = mouse.x - dot.x;
          const dy = mouse.y! - dot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            isNear = true;
            intensity = 1 - dist / mouse.radius;
          }
        }

        // HALO
        if (isNear) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.r + 6 * intensity, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(120,200,255,${0.15 + intensity * 0.35})`;
          ctx.fill();
        }

        // DOT
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);

        if (isNear) {
          ctx.fillStyle = `rgba(180,230,255,1)`;
        } else {
          ctx.fillStyle = `rgba(86,240,255,0.6)`;
        }

        ctx.fill();
      }

      // -------- SPIDER WEB --------
      if (mouse.x !== null) {
        const hubDots: { dot: typeof dots[0]; dist: number }[] = [];

        for (let dot of dots) {
          const dx = mouse.x - dot.x;
          const dy = mouse.y! - dot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            hubDots.push({ dot, dist });
          }
        }

        hubDots.sort((a, b) => a.dist - b.dist);
        hubDots.length = Math.min(HUB_CONNECTIONS, hubDots.length);

        for (let { dot, dist } of hubDots) {
          const style = getLineStyle(dist, mouse.radius, 0.6);

          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y!);
          ctx.lineTo(dot.x, dot.y);
          ctx.strokeStyle = `rgba(86,240,255,${style.opacity})`;
          ctx.lineWidth = style.width;
          ctx.stroke();
        }

        for (let i = 0; i < hubDots.length; i++) {
          for (let j = i + 1; j < hubDots.length; j++) {
            const d1 = hubDots[i].dot;
            const d2 = hubDots[j].dot;

            const dx = d1.x - d2.x;
            const dy = d1.y - d2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MAX_LINE_DISTANCE) {
              const style = getLineStyle(dist, MAX_LINE_DISTANCE, 0.35);

              ctx.beginPath();
              ctx.moveTo(d1.x, d1.y);
              ctx.lineTo(d2.x, d2.y);
              ctx.strokeStyle = `rgba(86,240,255,${style.opacity})`;
              ctx.lineWidth = style.width;
              ctx.stroke();
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
