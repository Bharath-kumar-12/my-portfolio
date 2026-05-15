import { useEffect, useRef, useState } from 'react';

function useReveal(ref, delay=0) {
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if(e.isIntersecting) setTimeout(()=>e.target.classList.add('visible'),delay);
    },{threshold:0.1});
    const el=ref.current; if(el)obs.observe(el);
    return ()=>{if(el)obs.unobserve(el);};
  },[ref,delay]);
}

const skills = [
  {name:'React.js',    icon:'⚛️', level:90, color:'#61dafb'},
  {name:'JavaScript',  icon:'🟨', level:88, color:'#f7df1e'},
  {name:'TypeScript',  icon:'🔷', level:75, color:'#3178c6'},
  {name:'Tailwind',    icon:'🎨', level:92, color:'#38bdf8'},
  {name:'HTML & CSS',  icon:'🌐', level:95, color:'#e34f26'},
  {name:'Node.js',     icon:'🟢', level:70, color:'#68a063'},
  {name:'MongoDB',     icon:'🗄️', level:65, color:'#00ed64'},
  {name:'Git',         icon:'🐙', level:85, color:'#f05032'},
];

const tools=['VS Code','Figma','Postman','Vercel','Linux','npm','Vite','Jest'];

/* ─── Animated Radar/Spider Chart (Canvas) ───────────── */
function RadarChart() {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const animRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if(e.isIntersecting) {
        let p=0;
        const tick=()=>{ p=Math.min(p+0.02,1); setProgress(p); if(p<1) animRef.current=requestAnimationFrame(tick); };
        tick();
      }
    },{threshold:0.3});
    const el=canvasRef.current; if(el)obs.observe(el);
    return ()=>{obs.disconnect();cancelAnimationFrame(animRef.current);};
  },[]);

  useEffect(()=>{
    const canvas=canvasRef.current;
    const ctx=canvas.getContext('2d');
    const W=canvas.width=canvas.height=340;
    const cx=W/2,cy=W/2,R=120;
    const N=skills.length;
    ctx.clearRect(0,0,W,W);

    // grid rings
    for(let r=0.25;r<=1;r+=0.25){
      ctx.beginPath();
      for(let i=0;i<N;i++){
        const ang=-Math.PI/2+i*(Math.PI*2/N);
        const x=cx+R*r*Math.cos(ang),y=cy+R*r*Math.sin(ang);
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.closePath();
      ctx.strokeStyle=`rgba(168,85,247,${0.07+r*0.06})`;
      ctx.lineWidth=1;ctx.stroke();
    }

    // spoke lines
    for(let i=0;i<N;i++){
      const ang=-Math.PI/2+i*(Math.PI*2/N);
      ctx.beginPath();
      ctx.moveTo(cx,cy);
      ctx.lineTo(cx+R*Math.cos(ang),cy+R*Math.sin(ang));
      ctx.strokeStyle='rgba(168,85,247,0.12)';
      ctx.lineWidth=1;ctx.stroke();
    }

    // data polygon
    const eased = progress<0.5?2*progress*progress:1-Math.pow(-2*progress+2,2)/2;
    ctx.beginPath();
    skills.forEach((sk,i)=>{
      const ang=-Math.PI/2+i*(Math.PI*2/N);
      const r2=(sk.level/100)*R*eased;
      const x=cx+r2*Math.cos(ang),y=cy+r2*Math.sin(ang);
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    });
    ctx.closePath();
    const grad=ctx.createLinearGradient(cx-R,cy-R,cx+R,cy+R);
    grad.addColorStop(0,'rgba(168,85,247,0.35)');
    grad.addColorStop(0.5,'rgba(6,182,212,0.25)');
    grad.addColorStop(1,'rgba(236,72,153,0.3)');
    ctx.fillStyle=grad;ctx.fill();
    ctx.strokeStyle='rgba(168,85,247,0.7)';
    ctx.lineWidth=1.5;ctx.stroke();

    // dots + labels
    skills.forEach((sk,i)=>{
      const ang=-Math.PI/2+i*(Math.PI*2/N);
      const r2=(sk.level/100)*R*eased;
      const x=cx+r2*Math.cos(ang),y=cy+r2*Math.sin(ang);

      // dot
      ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);
      ctx.fillStyle=sk.color;
      ctx.shadowColor=sk.color;ctx.shadowBlur=10;
      ctx.fill();ctx.shadowBlur=0;

      // label
      const lx=cx+(R+24)*Math.cos(ang),ly=cy+(R+24)*Math.sin(ang);
      ctx.font=`600 10px "Space Grotesk",sans-serif`;
      ctx.fillStyle='rgba(255,255,255,0.65)';
      ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(sk.name,lx,ly);
    });
  },[progress]);

  return (
    <div style={{position:'relative',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
      <canvas ref={canvasRef} style={{width:340,height:340}}/>
      <div style={{
        position:'absolute',textAlign:'center',pointerEvents:'none',
      }}>
        <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',
          color:'rgba(255,255,255,0.3)',letterSpacing:'0.12em'}}>SKILLS</div>
        <div style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'1.1rem',color:'white'}}>
          RADAR
        </div>
      </div>
    </div>
  );
}

/* ─── Skill Bar Card ─────────────────────────────────── */
function SkillBar({skill, delay}) {
  const ref=useRef(null);
  const barRef=useRef(null);
  const [hovered,setHovered]=useState(false);

  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){
        setTimeout(()=>{
          ref.current?.classList.add('visible');
          if(barRef.current) barRef.current.style.width=skill.level+'%';
        },delay);
      }
    },{threshold:0.15});
    const el=ref.current;if(el)obs.observe(el);
    return ()=>{if(el)obs.unobserve(el);};
  },[delay,skill.level]);

  return (
    <div
      ref={ref}
      className="reveal skill-badge"
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      style={{
        boxShadow:hovered?`0 8px 30px ${skill.color}22`:'none',
        borderColor:hovered?`${skill.color}40`:'rgba(255,255,255,0.1)',
        transition:'all 0.3s ease',
      }}
    >
      <div style={{position:'relative',zIndex:1}}>
        <div style={{fontSize:'2rem',marginBottom:'0.5rem',
          transform:hovered?'scale(1.2)':'scale(1)',transition:'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)'}}>
          {skill.icon}
        </div>
        <div style={{fontWeight:700,fontSize:'0.88rem',color:'white',marginBottom:'0.75rem'}}>
          {skill.name}
        </div>
        <div className="progress-bar-track">
          <div ref={barRef} className="progress-bar-fill" style={{
            width:0,
            background:`linear-gradient(90deg,${skill.color}88,${skill.color})`,
            transition:'width 1.4s cubic-bezier(0.22,1,0.36,1)',
          }}/>
        </div>
        <div style={{
          display:'flex',justifyContent:'space-between',marginTop:'0.35rem',
          fontSize:'0.65rem',color:'rgba(255,255,255,0.28)',
          fontFamily:'JetBrains Mono,monospace',
        }}>
          <span>skill</span>
          <span style={{color:skill.color,fontWeight:600}}>{skill.level}%</span>
        </div>
      </div>
    </div>
  );
}

function Skills() {
  const titleRef=useRef(null);
  const toolsRef=useRef(null);
  useReveal(titleRef);
  useReveal(toolsRef,100);

  return (
    <section id="skills" className="mesh-bg py-28 px-6" style={{background:'var(--bg-dark)',position:'relative'}}>
      <div style={{
        position:'absolute',bottom:'20%',right:'10%',width:350,height:350,
        background:'radial-gradient(circle,rgba(168,85,247,0.08) 0%,transparent 70%)',
        filter:'blur(80px)',pointerEvents:'none',
      }}/>

      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="reveal text-center mb-16">
          <span className="section-label">// my arsenal</span>
          <h2 style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:800,letterSpacing:'-0.03em'}}>
            Skills & <span className="gradient-text">Tech</span>
          </h2>
          <p style={{color:'rgba(255,255,255,0.4)',marginTop:'0.75rem',fontSize:'0.95rem'}}>
            Technologies I wield — and how deep I've gone 🎯
          </p>
        </div>

        {/* Two-column: radar + bars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">

          {/* Radar chart */}
          <div className="neon-card flex items-center justify-center" style={{padding:'2rem'}}>
            <RadarChart/>
          </div>

          {/* Bar cards */}
          <div className="grid grid-cols-2 gap-3">
            {skills.map((sk,i)=>(
              <SkillBar key={sk.name} skill={sk} delay={i*60}/>
            ))}
          </div>
        </div>

        {/* Tools row */}
        <div ref={toolsRef} className="reveal neon-card" style={{padding:'2rem'}}>
          <h3 style={{
            fontFamily:'JetBrains Mono,monospace',fontSize:'0.72rem',
            color:'#a855f7',letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:'1.25rem',
          }}>
            Tools & Environments
          </h3>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {tools.map(tool=>(
              <span key={tool} style={{
                fontFamily:'JetBrains Mono,monospace',fontSize:'0.78rem',
                padding:'0.4rem 1rem',borderRadius:100,
                background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.1)',
                color:'rgba(255,255,255,0.65)',
                transition:'all 0.25s ease',cursor:'default',
              }}
              onMouseEnter={e=>{
                e.currentTarget.style.borderColor='rgba(168,85,247,0.5)';
                e.currentTarget.style.color='#a855f7';
                e.currentTarget.style.background='rgba(168,85,247,0.08)';
                e.currentTarget.style.boxShadow='0 0 20px rgba(168,85,247,0.15)';
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';
                e.currentTarget.style.color='rgba(255,255,255,0.65)';
                e.currentTarget.style.background='rgba(255,255,255,0.04)';
                e.currentTarget.style.boxShadow='none';
              }}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;