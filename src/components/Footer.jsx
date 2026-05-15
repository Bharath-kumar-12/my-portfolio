const MARQUEE_ITEMS = [
  '✦ React.js', '✦ Tailwind CSS', '✦ JavaScript', '✦ TypeScript',
  '✦ Node.js', '✦ MongoDB', '✦ UI/UX Design', '✦ Git & GitHub',
  '✦ Figma', '✦ Vite', '✦ REST APIs', '✦ Responsive Design',
];

function Footer() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <footer style={{ background:'var(--bg-dark)', borderTop:'1px solid rgba(168,85,247,0.1)' }}>

      {/* Marquee ticker */}
      <div style={{
        overflow:'hidden',
        borderBottom:'1px solid rgba(255,255,255,0.05)',
        padding:'0.875rem 0',
        background:'rgba(168,85,247,0.04)',
      }}>
        <div className="marquee-track">
          {items.map((item, i) => (
            <span key={i} style={{
              fontFamily:'JetBrains Mono,monospace',
              fontSize:'0.75rem',
              color:'rgba(255,255,255,0.35)',
              letterSpacing:'0.12em',
              padding:'0 1.5rem',
              whiteSpace:'nowrap',
              transition:'color 0.25s',
            }}
            onMouseEnter={e=>e.currentTarget.style.color='#a855f7'}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.35)'}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Main footer row */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4"
        style={{ padding:'1.75rem 2rem' }}>

        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{
            width:28, height:28, borderRadius:8,
            background:'linear-gradient(135deg,#a855f7,#06b6d4)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'0.75rem', fontWeight:700, color:'white',
            boxShadow:'0 0 12px rgba(168,85,247,0.4)',
          }}>B</div>
          <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'1rem' }}>
            Bharath<span style={{ color:'#a855f7' }}>.</span>
          </span>
        </div>

        {/* Center */}
        <p style={{ color:'rgba(255,255,255,0.28)', fontSize:'0.82rem' }}>
          Crafted with{' '}
          <span style={{
            background:'linear-gradient(135deg,#a855f7,#ec4899)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          }}>♥</span>
          {' '}by{' '}
          <strong style={{ color:'white' }}>Bharath</strong>
          {' '}· Chennai, India 🌏 · © 2025
        </p>

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
          style={{
            background:'rgba(168,85,247,0.08)',
            border:'1px solid rgba(168,85,247,0.22)',
            borderRadius:10, padding:'0.5rem 1rem',
            color:'#a855f7', fontSize:'0.78rem',
            cursor:'pointer', fontFamily:'Space Grotesk,sans-serif',
            transition:'all 0.25s ease',
            display:'flex', alignItems:'center', gap:6,
          }}
          onMouseEnter={e=>{
            e.currentTarget.style.background='rgba(168,85,247,0.18)';
            e.currentTarget.style.boxShadow='0 0 20px rgba(168,85,247,0.2)';
          }}
          onMouseLeave={e=>{
            e.currentTarget.style.background='rgba(168,85,247,0.08)';
            e.currentTarget.style.boxShadow='none';
          }}
        >
          ↑ Back to top
        </button>
      </div>
    </footer>
  );
}

export default Footer;