import { useEffect, useRef, useState } from 'react';

function useReveal(ref, delay=0) {
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if(e.isIntersecting) setTimeout(()=>e.target.classList.add('visible'),delay);
    },{threshold:0.15});
    const el=ref.current; if(el) obs.observe(el);
    return ()=>{if(el)obs.unobserve(el);};
  },[ref,delay]);
}

/* ─── Live Clock (Chennai / IST) ─────────────────────── */
function LiveClock() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Kolkata'}));
      const h = now.getHours().toString().padStart(2,'0');
      const m = now.getMinutes().toString().padStart(2,'0');
      const s = now.getSeconds().toString().padStart(2,'0');
      setTime(`${h}:${m}:${s}`);
      setDate(now.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'}));
    };
    tick();
    const id = setInterval(tick,1000);
    return () => clearInterval(id);
  },[]);
  return (
    <div className="neon-card" style={{padding:'1rem 1.25rem',textAlign:'center',minWidth:180}}>
      <div style={{
        fontFamily:'JetBrains Mono,monospace',fontSize:'1.6rem',fontWeight:700,
        color:'white',letterSpacing:'0.05em',
        textShadow:'0 0 20px rgba(6,182,212,0.6)',
      }}>{time}</div>
      <div style={{fontSize:'0.72rem',color:'rgba(255,255,255,0.35)',marginTop:3,letterSpacing:'0.1em'}}>
        {date} · IST
      </div>
      <div style={{
        display:'flex',alignItems:'center',justifyContent:'center',gap:5,
        marginTop:6,fontSize:'0.7rem',color:'#06b6d4',
        fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.08em',
      }}>
        <span style={{
          width:6,height:6,borderRadius:'50%',background:'#84cc16',
          boxShadow:'0 0 6px #84cc16',display:'inline-block',
          animation:'pulseGlow 2s ease-in-out infinite',
        }}/>
        LIVE · CHENNAI, INDIA
      </div>
    </div>
  );
}

/* ─── Tilt Photo ─────────────────────────────────────── */
function TiltPhoto() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({rx:0,ry:0});
  const [sh, setSh] = useState({x:50,y:50});
  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
    setTilt({rx:(y-0.5)*14,ry:-(x-0.5)*14});
    setSh({x:x*100,y:y*100});
  };
  const onLeave = () => setTilt({rx:0,ry:0});
  return (
    <div style={{perspective:900,display:'inline-block'}}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          position:'relative',
          transform:`rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition:'transform 0.08s ease',
          willChange:'transform',
        }}
      >
        {/* Corner accents */}
        {[{top:-10,left:-10},{top:-10,right:-10},{bottom:-10,left:-10},{bottom:-10,right:-10}].map((pos,i)=>(
          <div key={i} style={{
            position:'absolute',...pos,width:22,height:22,
            border:'2px solid',borderRadius:4,
            borderColor:i%2===0?'#a855f7':'#06b6d4',
          }}/>
        ))}

        {/* Photo */}
        <div className="pulse-glow" style={{
          width:300,height:300,borderRadius:24,overflow:'hidden',
          border:'1px solid rgba(168,85,247,0.3)',position:'relative',
        }}>
          <img
            src="https://avatar.iran.liara.run/public/boy"
            alt="Bharath"
            style={{width:'100%',height:'100%',objectFit:'cover'}}
          />
          {/* shine */}
          <div style={{
            position:'absolute',inset:0,
            background:`radial-gradient(circle at ${sh.x}% ${sh.y}%,rgba(255,255,255,0.12) 0%,transparent 60%)`,
            pointerEvents:'none',
          }}/>
          <div style={{
            position:'absolute',inset:0,
            background:'linear-gradient(to top,rgba(5,5,16,0.5) 0%,transparent 50%)',
          }}/>
        </div>

        {/* Floating badge */}
        <div className="neon-card" style={{
          position:'absolute',bottom:-18,right:-18,
          padding:'0.6rem 0.875rem',
          background:'rgba(5,5,16,0.92)',
          display:'flex',alignItems:'center',gap:7,
        }}>
          <span style={{
            width:7,height:7,borderRadius:'50%',background:'#84cc16',
            boxShadow:'0 0 8px #84cc16',animation:'pulseGlow 2s ease-in-out infinite',
          }}/>
          <span style={{fontSize:'0.78rem',fontFamily:'JetBrains Mono,monospace',color:'rgba(255,255,255,0.75)'}}>
            Available
          </span>
        </div>

        {/* XP badge */}
        <div className="neon-card" style={{
          position:'absolute',top:-18,right:-18,
          padding:'0.5rem 0.75rem',
          background:'rgba(168,85,247,0.15)',
          borderColor:'rgba(168,85,247,0.3)',
          display:'flex',alignItems:'center',gap:6,
        }}>
          <span style={{fontSize:'1rem'}}>⚡</span>
          <span style={{
            fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'0.8rem',color:'#c084fc',
          }}>2+ yrs</span>
        </div>
      </div>
    </div>
  );
}

function About() {
  const secRef  = useRef(null);
  const textRef = useRef(null);
  useReveal(secRef);
  useReveal(textRef,150);

  const info=[
    {icon:'📍',label:'Location',value:'Chennai, India'},
    {icon:'🎓',label:'Role',   value:'Frontend Developer'},
    {icon:'📧',label:'Email',  value:'bharath@gmail.com'},
    {icon:'🟢',label:'Status', value:'Open to opportunities'},
  ];

  return (
    <section id="about" className="mesh-bg py-28 px-6" style={{background:'var(--bg-dark)',position:'relative'}}>
      <div style={{
        position:'absolute',top:'20%',right:'5%',width:300,height:300,
        background:'radial-gradient(circle,rgba(236,72,153,0.09) 0%,transparent 70%)',
        filter:'blur(70px)',pointerEvents:'none',
      }}/>

      <div className="max-w-6xl mx-auto">
        <div ref={secRef} className="reveal text-center mb-16">
          <span className="section-label">// about me</span>
          <h2 style={{
            fontFamily:'Syne,sans-serif',fontSize:'clamp(2rem,5vw,3.5rem)',
            fontWeight:800,letterSpacing:'-0.03em',
          }}>
            Who I <span className="gradient-text">Am</span>
          </h2>
        </div>

        <div ref={textRef} className="reveal grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left: photo + clock */}
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:24}}>
            <TiltPhoto/>
            <LiveClock/>
          </div>

          {/* Right: text */}
          <div>
            <h3 style={{fontFamily:'Syne,sans-serif',fontSize:'1.75rem',fontWeight:700,marginBottom:'1rem'}}>
              Hi, I'm Bharath 👋
            </h3>
            <p style={{color:'rgba(255,255,255,0.5)',lineHeight:1.85,marginBottom:'1rem'}}>
              I'm a passionate <strong style={{color:'#a855f7'}}>Frontend Developer</strong> based in Chennai, India.
              I love crafting modern, responsive web experiences with clean and creative designs that leave a lasting impression.
            </p>
            <p style={{color:'rgba(255,255,255,0.5)',lineHeight:1.85,marginBottom:'1.75rem'}}>
              I specialize in <strong style={{color:'#06b6d4'}}>React.js</strong>, Tailwind CSS, and JavaScript —
              always pushing boundaries to build interfaces that feel truly alive. 🚀
            </p>

            {/* info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{marginBottom:'2rem'}}>
              {info.map(({icon,label,value})=>(
                <div key={label} className="neon-card"
                  style={{padding:'0.875rem 1rem',display:'flex',alignItems:'center',gap:10}}>
                  <span style={{fontSize:'1.1rem'}}>{icon}</span>
                  <div>
                    <div style={{fontSize:'0.65rem',color:'rgba(255,255,255,0.3)',
                      fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.12em'}}>
                      {label.toUpperCase()}
                    </div>
                    <div style={{fontSize:'0.88rem',color:'rgba(255,255,255,0.85)',fontWeight:500}}>
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-neon btn-neon-primary">Get In Touch ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;