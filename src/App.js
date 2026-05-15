import { useEffect, useRef, useState, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import About     from './components/About';
import Timeline  from './components/Timeline';
import Projects  from './components/Projects';
import Skills    from './components/Skills';
import Contact   from './components/Contact';
import Footer    from './components/Footer';

/* ─── Scroll Progress Bar ─────────────────────────────── */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      setPct(d.scrollHeight > d.clientHeight ? (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, zIndex: 9998,
      height: 3, width: `${pct}%`,
      background: 'linear-gradient(90deg,#a855f7,#06b6d4,#ec4899)',
      boxShadow: '0 0 12px rgba(168,85,247,0.9)',
      transition: 'width 0.1s ease',
      pointerEvents: 'none',
    }} />
  );
}

/* ─── Floating Social Dock ────────────────────────────── */
function FloatingSocials() {
  const links = [
    { href:'https://github.com',   icon:'GH', color:'#a855f7', label:'GitHub'   },
    { href:'https://linkedin.com', icon:'IN', color:'#06b6d4', label:'LinkedIn'  },
    { href:'https://twitter.com',  icon:'TW', color:'#ec4899', label:'Twitter'   },
  ];
  const [hov, setHov] = useState(null);
  return (
    <div style={{
      position: 'fixed', left: '1.25rem', top: '50%',
      transform: 'translateY(-50%)', zIndex: 200,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 1, height: 60,
        background: 'linear-gradient(to bottom,transparent,rgba(168,85,247,0.5))',
      }} />
      {links.map((l, i) => (
        <a key={l.icon} href={l.href} target="_blank" rel="noreferrer"
          title={l.label}
          onMouseEnter={() => setHov(i)}
          onMouseLeave={() => setHov(null)}
          style={{
            width: 38, height: 38, borderRadius: 12,
            background: hov === i ? `${l.color}20` : 'rgba(255,255,255,0.04)',
            border: `1px solid ${hov === i ? l.color + '80' : 'rgba(255,255,255,0.1)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none',
            color: hov === i ? l.color : 'rgba(255,255,255,0.35)',
            fontSize: '0.6rem', fontFamily: 'JetBrains Mono,monospace', fontWeight: 700,
            transition: 'all 0.25s ease',
            boxShadow: hov === i ? `0 0 20px ${l.color}50` : 'none',
            animation: `socialFloat ${2 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        >{l.icon}</a>
      ))}
      <div style={{
        width: 1, height: 60,
        background: 'linear-gradient(to top,transparent,rgba(168,85,247,0.5))',
      }} />
    </div>
  );
}

/* ─── Custom Cursor + Particle Trail ─────────────────── */
function CursorFX() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const cvs     = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const particles = [];
    const COLORS = ['#a855f7','#06b6d4','#ec4899','#84cc16','#f59e0b'];

    const onMove = e => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mx-4}px,${my-4}px)`;
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: mx+(Math.random()-.5)*10, y: my+(Math.random()-.5)*10,
          vx:(Math.random()-.5)*1.4,   vy:(Math.random()-.5)*1.4-.5,
          r: Math.random()*3+1.5,      life:1,
          decay: Math.random()*.03+.025,
          color: COLORS[Math.floor(Math.random()*COLORS.length)],
        });
      }
    };

    const canvas = cvs.current;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const lerp = (a,b,t) => a+(b-a)*t;
    let animId;

    const loop = () => {
      rx = lerp(rx,mx,.13); ry = lerp(ry,my,.13);
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${rx-18}px,${ry-18}px)`;
      ctx.clearRect(0,0,W,H);
      for (let i = particles.length-1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i,1); continue; }
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r*p.life,0,Math.PI*2);
        ctx.fillStyle = p.color+Math.floor(p.life*255).toString(16).padStart(2,'0');
        ctx.fill();
      }
      animId = requestAnimationFrame(loop);
    };
    loop();

    const onResize = () => { W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; };
    const onEnter  = () => ringRef.current?.classList.add('hover');
    const onLeave  = () => ringRef.current?.classList.remove('hover');
    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', onResize);
    document.querySelectorAll('a,button').forEach(el=>{
      el.addEventListener('mouseenter',onEnter);
      el.addEventListener('mouseleave',onLeave);
    });
    return () => { cancelAnimationFrame(animId); window.removeEventListener('mousemove',onMove); window.removeEventListener('resize',onResize); };
  }, []);

  return (
    <>
      <canvas ref={cvs} style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:9995,width:'100%',height:'100%'}}/>
      <div ref={dotRef}  className="cursor-dot"/>
      <div ref={ringRef} className="cursor-ring"/>
    </>
  );
}

/* ─── Click Explosion ─────────────────────────────────── */
function ClickExplosion() {
  const cvs = useRef(null);
  useEffect(() => {
    const canvas = cvs.current;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const bursts = [];
    const COLORS = ['#a855f7','#06b6d4','#ec4899','#84cc16','#f59e0b','#ffffff'];
    let animId;

    const loop = () => {
      ctx.clearRect(0,0,W,H);
      for (let i = bursts.length-1; i >= 0; i--) {
        const p = bursts[i];
        p.x+=p.vx; p.y+=p.vy; p.vy+=0.18; p.life-=p.decay;
        if (p.life <= 0) { bursts.splice(i,1); continue; }
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r*p.life,0,Math.PI*2);
        ctx.fillStyle = p.color+Math.floor(p.life*255).toString(16).padStart(2,'0');
        ctx.shadowColor = p.color; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
      }
      animId = requestAnimationFrame(loop);
    };
    loop();

    const onClick = e => {
      for (let i = 0; i < 18; i++) {
        bursts.push({
          x:e.clientX, y:e.clientY,
          vx:(Math.random()-.5)*9, vy:(Math.random()-.5)*9-2,
          r: Math.random()*4+2, life:1,
          decay: Math.random()*.025+.018,
          color: COLORS[Math.floor(Math.random()*COLORS.length)],
        });
      }
    };
    const onResize = () => { W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; };
    window.addEventListener('click', onClick);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('click',onClick);
      window.removeEventListener('resize',onResize);
    };
  }, []);

  return <canvas ref={cvs} style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:9994,width:'100%',height:'100%'}}/>;
}

/* ─── App ─────────────────────────────────────────────── */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const onComplete = useCallback(() => setLoaded(true), []);

  return (
    <div className="noise" style={{ background:'var(--bg-dark)', minHeight:'100vh' }}>
      {!loaded && <LoadingScreen onComplete={onComplete} />}
      <CursorFX />
      <ClickExplosion />
      {loaded && (
        <>
          <ScrollProgress />
          <FloatingSocials />
          <Navbar />
          <Hero />
          <About />
          <Timeline />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}