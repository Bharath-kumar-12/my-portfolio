import { useEffect, useRef } from 'react';

const items = [
  {
    year: '2025', side: 'right',
    title: 'Senior Frontend Developer',
    org: 'Freelance & Open Source',
    desc: 'Building pixel-perfect React applications, contributing to open-source, and crafting award-worthy UIs for global clients.',
    tags: ['React','Next.js','TypeScript'],
    icon: '🚀', color: '#a855f7',
  },
  {
    year: '2024', side: 'left',
    title: 'Full-Stack Developer Intern',
    org: 'Tech Startup · Chennai',
    desc: 'Built scalable Node.js APIs and React dashboards. Reduced page load time by 40% through code splitting and lazy loading.',
    tags: ['Node.js','MongoDB','React'],
    icon: '⚡', color: '#06b6d4',
  },
  {
    year: '2023', side: 'right',
    title: 'UI/UX Designer & Developer',
    org: 'Self-Directed Projects',
    desc: 'Designed and built 10+ portfolio-worthy projects. Mastered Figma-to-code workflows and design systems.',
    tags: ['Figma','Tailwind','UI/UX'],
    icon: '🎨', color: '#ec4899',
  },
  {
    year: '2022', side: 'left',
    title: 'Computer Science Student',
    org: 'University · Chennai, India',
    desc: 'Discovered a passion for web development. Built first React app and fell in love with the creative possibilities of code.',
    tags: ['HTML','CSS','JavaScript'],
    icon: '🎓', color: '#84cc16',
  },
];

function TimelineCard({ item, idx }) {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), idx * 150);
      }
    }, { threshold: 0.2 });
    const el = ref.current; if (el) obs.observe(el);
    return () => { if (el) obs.unobserve(el); };
  }, [idx]);

  const isRight = item.side === 'right';

  return (
    <div ref={ref} className="reveal" style={{ display: 'flex', justifyContent: isRight ? 'flex-end' : 'flex-start', paddingLeft: isRight ? '52%' : 0, paddingRight: isRight ? 0 : '52%', marginBottom: '3rem', position: 'relative' }}>
      <div style={{ position: 'absolute', left: '50%', top: '1.5rem', transform: 'translate(-50%, -50%)', width: 14, height: 14, borderRadius: '50%', background: item.color, boxShadow: `0 0 16px ${item.color}, 0 0 32px ${item.color}80`, zIndex: 2, border: '2px solid var(--bg-dark)' }} />
      <div style={{ position: 'absolute', left: isRight ? 'calc(50% - 90px)' : 'calc(50% + 16px)', top: '0.75rem', fontFamily: 'JetBrains Mono,monospace', fontWeight: 700, fontSize: '0.8rem', color: item.color, letterSpacing: '0.1em', padding: '0.25rem 0.75rem', background: `${item.color}15`, border: `1px solid ${item.color}40`, borderRadius: 100 }}>{item.year}</div>
      <div className="neon-card" style={{ padding: '1.5rem', maxWidth: 400, width: '100%', borderColor: `${item.color}25` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: `${item.color}15`, border: `1px solid ${item.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{item.icon}</div>
          <div>
            <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '1rem', color: 'white' }}>{item.title}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'JetBrains Mono,monospace' }}>{item.org}</div>
          </div>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '1rem' }}>{item.desc}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {item.tags.map(t => (
            <span key={t} style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '0.68rem', padding: '0.2rem 0.65rem', borderRadius: 100, background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}35` }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const titleRef = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) e.target.classList.add('visible');
    }, { threshold: 0.15 });
    const el = titleRef.current; if (el) obs.observe(el);
    return () => { if (el) obs.unobserve(el); };
  }, []);

  return (
    <section id="journey" className="mesh-bg py-28 px-6" style={{ background: 'linear-gradient(180deg,var(--bg-dark) 0%,#07071c 50%,var(--bg-dark) 100%)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 400, height: 400, background: 'radial-gradient(circle,rgba(168,85,247,0.07) 0%,transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div className="max-w-5xl mx-auto">
        <div ref={titleRef} className="reveal text-center mb-20">
          <span className="section-label">{"// my journey"}</span>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>The <span className="gradient-text">Timeline</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '0.75rem', fontSize: '0.95rem' }}>Every great story has a beginning 📖</p>
        </div>
        <div style={{ position: 'relative', paddingTop: '1rem' }}>
          <div className="timeline-line" />
          {items.map((item, i) => (
            <TimelineCard key={item.year} item={item} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
