import { useEffect, useRef, useState } from 'react';

function useReveal(ref, delay=0) {
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if(e.isIntersecting) setTimeout(()=>e.target.classList.add('visible'),delay);
    },{threshold:0.1});
    const el=ref.current; if(el) obs.observe(el);
    return ()=>{if(el)obs.unobserve(el);};
  },[ref,delay]);
}

const projects = [
  {
    id:1,
    title:'Portfolio Website',
    description:'My personal portfolio — crafted with creative flair, immersive animations and pixel-perfect precision.',
    tags:[{label:'React',color:'tag-purple'},{label:'Tailwind',color:'tag-cyan'},{label:'Canvas',color:'tag-pink'}],
    emoji:'🎨',
    gradient:'linear-gradient(135deg,rgba(168,85,247,0.2),rgba(236,72,153,0.1))',
    glowColor:'rgba(168,85,247,0.5)',
    link:'https://github.com',
    year:'2024',
  },
  {
    id:2,
    title:'E-Commerce App',
    description:'Full-featured shopping experience with cart, filtering, smooth checkout and Stripe payment integration.',
    tags:[{label:'React',color:'tag-purple'},{label:'Node.js',color:'tag-lime'},{label:'MongoDB',color:'tag-cyan'}],
    emoji:'🛒',
    gradient:'linear-gradient(135deg,rgba(6,182,212,0.2),rgba(132,204,22,0.1))',
    glowColor:'rgba(6,182,212,0.5)',
    link:'https://github.com',
    year:'2024',
  },
  {
    id:3,
    title:'Weather Dashboard',
    description:'Real-time weather with animated states, location search, 7-day forecast and beautiful data visualizations.',
    tags:[{label:'React',color:'tag-purple'},{label:'API',color:'tag-pink'},{label:'Charts',color:'tag-lime'}],
    emoji:'🌤️',
    gradient:'linear-gradient(135deg,rgba(236,72,153,0.2),rgba(168,85,247,0.1))',
    glowColor:'rgba(236,72,153,0.5)',
    link:'https://github.com',
    year:'2023',
  },
];

/* ─── 3D Tilt Card ───────────────────────────────────── */
function TiltCard({ project, delay }) {
  const ref   = useRef(null);
  const cardRef = useRef(null);
  useReveal(ref, delay);

  const [tilt, setTilt] = useState({rx:0,ry:0});
  const [shine, setShine] = useState({x:50,y:50});
  const [hovered, setHovered] = useState(false);

  const onMove = e => {
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top)  / r.height;
    setTilt({ rx:(y-0.5)*18, ry:-(x-0.5)*18 });
    setShine({ x: x*100, y: y*100 });
  };
  const onLeave = () => { setTilt({rx:0,ry:0}); setHovered(false); };
  const onEnter = () => setHovered(true);

  return (
    <div ref={ref} className="reveal" style={{perspective:1000}}>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={onEnter}
        style={{
          background:'rgba(255,255,255,0.03)',
          backdropFilter:'blur(20px)',
          border:`1px solid ${hovered ? project.glowColor.replace('0.5','0.4') : 'rgba(255,255,255,0.07)'}`,
          borderRadius:24,padding:'2rem',
          position:'relative',overflow:'hidden',
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) ${hovered?'translateZ(20px)':'translateZ(0)'}`,
          transition: hovered
            ? 'transform 0.05s ease, box-shadow 0.3s ease, border-color 0.3s ease'
            : 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border-color 0.3s ease',
          boxShadow: hovered
            ? `0 25px 60px -10px ${project.glowColor.replace('0.5','0.3')}, 0 0 0 1px ${project.glowColor.replace('0.5','0.2')}`
            : '0 4px 20px rgba(0,0,0,0.4)',
          cursor:'default',
          willChange:'transform',
        }}
      >
        {/* shine overlay */}
        <div style={{
          position:'absolute',inset:0,borderRadius:24,pointerEvents:'none',
          background:`radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.07) 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition:'opacity 0.3s ease',
        }}/>

        {/* gradient bg */}
        <div style={{
          position:'absolute',inset:0,borderRadius:24,
          background:project.gradient,
          opacity: hovered ? 1 : 0.4,
          transition:'opacity 0.3s ease',
          pointerEvents:'none',
        }}/>

        {/* content */}
        <div style={{position:'relative',zIndex:1}}>
          {/* top row */}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'1.5rem'}}>
            <div style={{
              width:56,height:56,borderRadius:16,
              background:'rgba(255,255,255,0.06)',
              border:'1px solid rgba(255,255,255,0.1)',
              display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.6rem',
              transform: hovered ? 'scale(1.12) rotate(-5deg)' : 'scale(1) rotate(0)',
              transition:'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}>
              {project.emoji}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{
                fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',
                color:'rgba(255,255,255,0.25)',letterSpacing:'0.1em',
              }}>{project.year}</span>
              <a href={project.link} target="_blank" rel="noreferrer"
                style={{
                  width:34,height:34,borderRadius:10,
                  background:'rgba(255,255,255,0.05)',
                  border:`1px solid ${hovered?project.glowColor.replace('0.5','0.4'):'rgba(255,255,255,0.08)'}`,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  color: hovered ? 'white' : 'rgba(255,255,255,0.4)',
                  fontSize:'0.9rem',textDecoration:'none',
                  transition:'all 0.25s ease',
                }}
              >↗</a>
            </div>
          </div>

          <h3 style={{
            fontFamily:'Syne,sans-serif',fontSize:'1.25rem',fontWeight:700,
            color:'white',marginBottom:'0.6rem',
          }}>{project.title}</h3>

          <p style={{color:'rgba(255,255,255,0.42)',fontSize:'0.88rem',lineHeight:1.75,marginBottom:'1.5rem'}}>
            {project.description}
          </p>

          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
            {project.tags.map(tag=>(
              <span key={tag.label} className={`tag-pill ${tag.color}`}>{tag.label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const titleRef = useRef(null);
  useReveal(titleRef);

  return (
    <section id="projects" className="mesh-bg py-28 px-6" style={{
      background:'linear-gradient(180deg,var(--bg-dark) 0%,#07071a 50%,var(--bg-dark) 100%)',
      position:'relative',
    }}>
      <div style={{
        position:'absolute',top:'30%',left:'5%',width:300,height:300,
        background:'radial-gradient(circle,rgba(6,182,212,0.08) 0%,transparent 70%)',
        filter:'blur(80px)',pointerEvents:'none',
      }}/>

      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="reveal text-center mb-16">
          <span className="section-label">{"// my work"}</span>
          <h2 style={{
            fontFamily:'Syne,sans-serif',fontSize:'clamp(2rem,5vw,3.5rem)',
            fontWeight:800,letterSpacing:'-0.03em',
          }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p style={{color:'rgba(255,255,255,0.4)',marginTop:'0.75rem',fontSize:'0.95rem'}}>
            Hover the cards — they're alive ✨
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p,i)=>(
            <TiltCard key={p.id} project={p} delay={i*120}/>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="https://github.com" target="_blank" rel="noreferrer"
            className="btn-neon btn-neon-outline"
            style={{display:'inline-flex',alignItems:'center',gap:8}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;