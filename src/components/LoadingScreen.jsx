import { useEffect, useRef, useState, useCallback } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress]   = useState(0);
  const [phase,    setPhase]       = useState('in'); // in | hold | exit
  const canvasRef = useRef(null);

  /* ── Canvas geometric lines ── */
  useEffect(() => {
    const cvs = canvasRef.current;
    const ctx = cvs.getContext('2d');
    let W = cvs.width  = window.innerWidth;
    let H = cvs.height = window.innerHeight;
    let t = 0, animId;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      // rotating spokes
      for (let i = 0; i < 8; i++) {
        const a = t * 0.3 + i * Math.PI / 4;
        const r = 160 + Math.sin(t * 2 + i) * 20;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
        ctx.strokeStyle = `rgba(168,85,247,${0.08 + 0.06 * Math.sin(t + i)})`;
        ctx.lineWidth = 1; ctx.stroke();
      }
      // rings
      [200, 145, 90].forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r + Math.sin(t * (i + 1)) * 6, 0, Math.PI * 2);
        ctx.strokeStyle = i === 1 ? 'rgba(6,182,212,0.12)' : 'rgba(168,85,247,0.1)';
        ctx.lineWidth = 0.8; ctx.stroke();
      });
      // corner brackets
      const b = 40, m = 60;
      [[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([sx,sy]) => {
        const bx = cx + sx * 250, by = cy + sy * 160;
        ctx.strokeStyle = 'rgba(168,85,247,0.2)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(bx, by + sy*(-m)); ctx.lineTo(bx, by); ctx.lineTo(bx + sx*(-b), by); ctx.stroke();
      });
      t += 0.02;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  /* ── Progress counter ── */
  const finish = useCallback(() => {
    setPhase('exit');
    setTimeout(onComplete, 900);
  }, [onComplete]);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 4 + 1;
      if (p >= 100) { p = 100; clearInterval(id); setTimeout(finish, 400); }
      setProgress(Math.floor(p));
    }, 28);
    return () => clearInterval(id);
  }, [finish]);

  const sliding = phase === 'exit';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#050510',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
      transform: sliding ? 'translateY(-100%)' : 'translateY(0)',
      transition: sliding ? 'transform 0.9s cubic-bezier(0.76,0,0.24,1)' : 'none',
    }}>
      {/* scanline */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg,transparent,rgba(168,85,247,0.8),rgba(6,182,212,0.8),transparent)',
        animation: 'scanline 2.5s linear infinite',
        boxShadow: '0 0 16px rgba(168,85,247,0.6)',
        pointerEvents: 'none',
      }} />

      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Logo */}
        <div style={{
          width: 80, height: 80, borderRadius: 22,
          background: 'linear-gradient(135deg,#a855f7,#06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 2.5rem',
          fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '2.2rem', color: 'white',
          boxShadow: '0 0 60px rgba(168,85,247,0.9),0 0 120px rgba(168,85,247,0.3)',
          animation: 'loadFadeScale 0.6s ease forwards, pulseGlow 2s ease-in-out 0.6s infinite',
        }}>B</div>

        {/* Big counter */}
        <div style={{
          fontFamily: 'Syne,sans-serif', fontWeight: 800,
          fontSize: 'clamp(5rem,16vw,11rem)',
          lineHeight: 1,
          background: 'linear-gradient(135deg,#a855f7,#06b6d4,#ec4899)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '2rem',
          animation: 'counterPop 0.15s ease',
        }}>
          {String(progress).padStart(2, '0')}
        </div>

        {/* Bar */}
        <div style={{
          width: 220, height: 2, background: 'rgba(255,255,255,0.08)',
          borderRadius: 99, margin: '0 auto 1.25rem', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', width: `${progress}%`,
            background: 'linear-gradient(90deg,#a855f7,#06b6d4,#ec4899)',
            boxShadow: '0 0 12px rgba(168,85,247,1)',
            transition: 'width 0.08s ease', borderRadius: 99,
          }} />
        </div>

        <div style={{
          fontFamily: 'JetBrains Mono,monospace', fontSize: '0.68rem',
          color: 'rgba(255,255,255,0.25)', letterSpacing: '0.22em',
        }}>
          LOADING PORTFOLIO · PLEASE WAIT
        </div>
      </div>
    </div>
  );
}
