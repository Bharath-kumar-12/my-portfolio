import { useEffect, useRef, useState } from 'react';

const ROLES = ['Frontend Developer','Creative Coder','UI/UX Enthusiast','React Specialist','Digital Artist'];

function useTypewriter(words, speed=85, pause=2000) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wordIdx % words.length];
    let t;
    if (!deleting) {
      if (charIdx < word.length) t = setTimeout(()=>setCharIdx(c=>c+1), speed);
      else t = setTimeout(()=>setDeleting(true), pause);
    } else {
      if (charIdx > 0) t = setTimeout(()=>setCharIdx(c=>c-1), speed/2);
      else { setDeleting(false); setWordIdx(i=>i+1); }
    }
    setDisplay(word.slice(0,charIdx));
    return () => clearTimeout(t);
  },[charIdx,deleting,wordIdx,words,speed,pause]);
  return display;
}

/* ─── Constellation Canvas ───────────────────────────── */
function Constellation() {
  const cvs  = useRef(null);
  const mouse= useRef({x:-9999,y:-9999});

  useEffect(()=>{
    const canvas = cvs.current;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const N = 90;
    const pts = Array.from({length:N},()=>({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-.5)*.45, vy:(Math.random()-.5)*.45,
      r:Math.random()*1.8+0.8,
      c: ['#a855f7','#06b6d4','#ec4899'][Math.floor(Math.random()*3)],
    }));
    const LINK=130, MDIST=160;
    let animId;
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      const {x:mx,y:my}=mouse.current;
      pts.forEach(p=>{
        const dx=mx-p.x,dy=my-p.y,d=Math.hypot(dx,dy);
        if(d<MDIST){ p.vx+=(dx/d)*.008; p.vy+=(dy/d)*.008; }
        p.vx*=.99; p.vy*=.99;
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0;
        if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      });
      // connections
      for(let i=0;i<N;i++){
        for(let j=i+1;j<N;j++){
          const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);
          if(d<LINK){
            const a=(1-d/LINK)*0.45;
            const g=ctx.createLinearGradient(pts[i].x,pts[i].y,pts[j].x,pts[j].y);
            g.addColorStop(0,pts[i].c+'73');
            g.addColorStop(1,pts[j].c+'73');
            ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);
            ctx.strokeStyle=g;ctx.lineWidth=a;ctx.stroke();
          }
        }
      }
      // mouse lines
      pts.forEach(p=>{
        const d=Math.hypot(mx-p.x,my-p.y);
        if(d<MDIST){
          ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(mx,my);
          ctx.strokeStyle=`rgba(6,182,212,${(1-d/MDIST)*.6})`;
          ctx.lineWidth=.8;ctx.stroke();
        }
      });
      // dots
      pts.forEach(p=>{
        const d=Math.hypot(mx-p.x,my-p.y);
        const glow=d<MDIST?1:.5;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.c;ctx.shadowColor=p.c;ctx.shadowBlur=8*glow;ctx.fill();ctx.shadowBlur=0;
      });
      // mouse node
      if(mx>0){
        ctx.beginPath();ctx.arc(mx,my,4,0,Math.PI*2);
        ctx.fillStyle='rgba(6,182,212,0.7)';ctx.shadowColor='#06b6d4';ctx.shadowBlur=18;ctx.fill();ctx.shadowBlur=0;
      }
      animId=requestAnimationFrame(draw);
    };
    draw();
    const onM=e=>{mouse.current={x:e.clientX,y:e.clientY};};
    const onL=()=>{mouse.current={x:-9999,y:-9999};};
    const onR=()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;};
    window.addEventListener('mousemove',onM);
    window.addEventListener('mouseleave',onL);
    window.addEventListener('resize',onR);
    return ()=>{cancelAnimationFrame(animId);window.removeEventListener('mousemove',onM);window.removeEventListener('mouseleave',onL);window.removeEventListener('resize',onR);};
  },[]);

  return <canvas ref={cvs} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0}}/>;
}

/* ─── Aurora Blobs ────────────────────────────────────── */
function Aurora() {
  return (
    <div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none',zIndex:0}}>
      {[
        {top:'-20%',left:'-10%',  w:700,h:600, c:'rgba(168,85,247,0.18)', anim:'auroraBlob1 14s ease-in-out infinite'},
        {top:'5%',  right:'-15%', w:650,h:550, c:'rgba(6,182,212,0.14)',  anim:'auroraBlob2 17s ease-in-out infinite'},
        {bottom:'0',left:'25%',   w:550,h:550, c:'rgba(236,72,153,0.1)',  anim:'auroraBlob3 11s ease-in-out infinite'},
      ].map((b,i)=>(
        <div key={i} style={{
          position:'absolute',top:b.top,left:b.left,right:b.right,bottom:b.bottom,
          width:b.w,height:b.h,borderRadius:'50%',
          background:`radial-gradient(ellipse,${b.c} 0%,transparent 70%)`,
          filter:'blur(90px)',animation:b.anim,
        }}/>
      ))}
    </div>
  );
}

/* ─── Perspective Grid Floor ──────────────────────────── */
function PerspGrid() {
  return (
    <div style={{
      position:'absolute',bottom:0,left:0,right:0,height:'45%',
      perspective:400,overflow:'hidden',pointerEvents:'none',zIndex:1,
    }}>
      <div style={{
        position:'absolute',inset:0,
        backgroundImage:'linear-gradient(rgba(168,85,247,0.18) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.14) 1px,transparent 1px)',
        backgroundSize:'70px 70px',
        transform:'rotateX(55deg) scale(2.5)',
        transformOrigin:'center top',
        animation:'gridMove 6s linear infinite',
        maskImage:'linear-gradient(to bottom,transparent 0%,rgba(0,0,0,0.6) 35%,black 100%)',
        WebkitMaskImage:'linear-gradient(to bottom,transparent 0%,rgba(0,0,0,0.6) 35%,black 100%)',
      }}/>
    </div>
  );
}

/* ─── Code Rain Column ────────────────────────────────── */
function CodeRain() {
  const cvs=useRef(null);
  useEffect(()=>{
    const c=cvs.current,ctx=c.getContext('2d');
    let W=c.width=420,H=c.height=600;
    const cols=Math.floor(W/14),drops=Array(cols).fill(0).map(()=>Math.random()*30);
    const CHARS='01アイウエオ{}[]<>/\\*#$@♦♠✦⊕⊗∞≡π';
    let id;
    const draw=()=>{
      ctx.fillStyle='rgba(5,5,16,0.055)';ctx.fillRect(0,0,W,H);
      drops.forEach((y,i)=>{
        const ch=CHARS[Math.floor(Math.random()*CHARS.length)];
        const a=Math.random()*.55+.15;
        ctx.fillStyle=i%5===0?`rgba(168,85,247,${a})`:i%3===0?`rgba(6,182,212,${a})`:`rgba(236,72,153,${a*.5})`;
        ctx.font='12px JetBrains Mono,monospace';
        ctx.fillText(ch,i*14,y*14);
        if(y*14>H&&Math.random()>.975)drops[i]=0;
        drops[i]+=.6;
      });
      id=requestAnimationFrame(draw);
    };
    draw();
    return ()=>cancelAnimationFrame(id);
  },[]);
  return <canvas ref={cvs} style={{
    position:'absolute',right:0,top:0,width:420,height:'100%',
    opacity:.2,pointerEvents:'none',zIndex:1,
    maskImage:'linear-gradient(to right,transparent,rgba(0,0,0,0.7) 40%,black)',
    WebkitMaskImage:'linear-gradient(to right,transparent,rgba(0,0,0,0.7) 40%,black)',
  }}/>;
}

/* ─── 3D Globe ────────────────────────────────────────── */
function Globe() {
  const cvs=useRef(null);
  useEffect(()=>{
    const canvas=cvs.current,ctx=canvas.getContext('2d');
    const W=canvas.width=canvas.height=360,cx=W/2,cy=W/2,R=148;
    let rot=0,animId,dragging=false,startX=0,dragRot=0;
    const CITIES=[
      {name:'Chennai',lat:13.08,lon:80.27,color:'#ec4899',size:7,label:true},
      {name:'NY',     lat:40.71,lon:-74.0, color:'#a855f7',size:4},
      {name:'London', lat:51.5, lon:-.12,  color:'#06b6d4',size:4},
      {name:'Tokyo',  lat:35.67,lon:139.65,color:'#84cc16',size:4},
      {name:'Sydney', lat:-33.8,lon:151.2, color:'#f59e0b',size:4},
      {name:'Dubai',  lat:25.2, lon:55.27, color:'#a855f7',size:4},
    ];
    const latLon=(lat,lon)=>{
      const phi=(90-lat)*Math.PI/180, theta=(lon+rot*180/Math.PI)*Math.PI/180;
      return {x:R*Math.sin(phi)*Math.cos(theta),y:R*Math.cos(phi),z:R*Math.sin(phi)*Math.sin(theta)};
    };
    const proj=({x,y,z})=>({sx:cx+x,sy:cy-y,vis:z>0});
    const draw=()=>{
      ctx.clearRect(0,0,W,W);
      // glow halo
      const halo=ctx.createRadialGradient(cx,cy,R*.6,cx,cy,R*1.4);
      halo.addColorStop(0,'rgba(168,85,247,0)');
      halo.addColorStop(.7,'rgba(168,85,247,0.08)');
      halo.addColorStop(1,'rgba(6,182,212,0.15)');
      ctx.beginPath();ctx.arc(cx,cy,R*1.4,0,Math.PI*2);ctx.fillStyle=halo;ctx.fill();
      // sphere
      const sg=ctx.createRadialGradient(cx-45,cy-45,8,cx,cy,R);
      sg.addColorStop(0,'rgba(28,18,55,0.98)');sg.addColorStop(1,'rgba(5,5,16,0.98)');
      ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.fillStyle=sg;ctx.fill();
      // border
      const bg=ctx.createLinearGradient(cx-R,cy-R,cx+R,cy+R);
      bg.addColorStop(0,'rgba(168,85,247,0.7)');bg.addColorStop(.5,'rgba(6,182,212,0.5)');bg.addColorStop(1,'rgba(236,72,153,0.6)');
      ctx.strokeStyle=bg;ctx.lineWidth=1.5;ctx.stroke();
      // lat lines
      for(let lat=-60;lat<=60;lat+=30){
        ctx.beginPath();let f=true;
        for(let lon=-180;lon<=180;lon+=4){
          const p=proj(latLon(lat,lon));
          if(p.vis){if(f){ctx.moveTo(p.sx,p.sy);f=false;}else ctx.lineTo(p.sx,p.sy);}else f=true;
        }
        ctx.strokeStyle='rgba(168,85,247,0.18)';ctx.lineWidth=.6;ctx.stroke();
      }
      // lon lines
      for(let lon=-180;lon<=180;lon+=30){
        ctx.beginPath();let f=true;
        for(let lat=-90;lat<=90;lat+=4){
          const p=proj(latLon(lat,lon));
          if(p.vis){if(f){ctx.moveTo(p.sx,p.sy);f=false;}else ctx.lineTo(p.sx,p.sy);}else f=true;
        }
        ctx.strokeStyle='rgba(6,182,212,0.12)';ctx.lineWidth=.5;ctx.stroke();
      }
      // cities
      CITIES.forEach(city=>{
        const p3=latLon(city.lat,city.lon),pr=proj(p3);
        if(!pr.vis)return;
        if(city.label){
          const pulse=.5+.5*Math.sin(Date.now()*.004);
          [16+pulse*8,10+pulse*4].forEach((r,i)=>{
            ctx.beginPath();ctx.arc(pr.sx,pr.sy,r,0,Math.PI*2);
            ctx.strokeStyle=`rgba(236,72,153,${(.45-i*.15)*(1-pulse*.5)})`;
            ctx.lineWidth=1.2;ctx.stroke();
          });
        }
        const dg=ctx.createRadialGradient(pr.sx-1,pr.sy-1,0,pr.sx,pr.sy,city.size);
        dg.addColorStop(0,'white');dg.addColorStop(1,city.color);
        ctx.beginPath();ctx.arc(pr.sx,pr.sy,city.size,0,Math.PI*2);
        ctx.fillStyle=dg;ctx.shadowColor=city.color;ctx.shadowBlur=14;ctx.fill();ctx.shadowBlur=0;
        if(city.label){
          ctx.fillStyle='white';ctx.font='bold 10px JetBrains Mono,monospace';
          ctx.fillText('📍 Chennai',pr.sx+9,pr.sy-4);
          ctx.fillStyle='rgba(236,72,153,0.7)';ctx.font='8px Space Grotesk,sans-serif';
          ctx.fillText('India',pr.sx+22,pr.sy+7);
        }
      });
      rot+=.003;
      animId=requestAnimationFrame(draw);
    };
    draw();
    canvas.addEventListener('mousedown',e=>{dragging=true;startX=e.clientX;dragRot=rot;});
    window.addEventListener('mouseup',()=>{dragging=false;});
    window.addEventListener('mousemove',e=>{if(dragging)rot=dragRot+(e.clientX-startX)*.005;});
    return ()=>cancelAnimationFrame(animId);
  },[]);
  return (
    <div style={{position:'relative',display:'inline-block'}}>
      <canvas ref={cvs} style={{cursor:'grab',borderRadius:'50%',display:'block'}}/>
      <div style={{position:'absolute',bottom:14,left:'50%',transform:'translateX(-50%)',fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'rgba(255,255,255,0.3)',letterSpacing:'0.14em',whiteSpace:'nowrap'}}>
        ← drag to rotate →
      </div>
    </div>
  );
}

/* ─── Magnetic Button ─────────────────────────────────── */
function MagBtn({children,href,className,style,strength=0.38}){
  const ref=useRef(null);
  const onM=e=>{const r=ref.current.getBoundingClientRect();ref.current.style.transform=`translate(${(e.clientX-(r.left+r.width/2))*strength}px,${(e.clientY-(r.top+r.height/2))*strength}px)`;};
  const onL=()=>{ref.current.style.transform='translate(0,0)';ref.current.style.transition='transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';};
  const onE=()=>{ref.current.style.transition='transform 0.1s ease';};
  return <a ref={ref} href={href} className={className} style={style} onMouseMove={onM} onMouseLeave={onL} onMouseEnter={onE}>{children}</a>;
}

/* ─── Split Text ──────────────────────────────────────── */
function SplitText({text,className,style,delay=0}){
  const [vis,setVis]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold:.2});
    if(ref.current)obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <span ref={ref} className={className} style={{...style,display:'inline-block'}}>
      {text.split('').map((ch,i)=>(
        <span key={i} style={{
          display:'inline-block',
          opacity:vis?1:0,
          transform:vis?'translateY(0)':'translateY(50px)',
          transition:`opacity 0.5s ease ${delay+i*38}ms,transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay+i*38}ms`,
          whiteSpace:ch===' '?'pre':'normal',
        }}>{ch}</span>
      ))}
    </span>
  );
}

/* ─── Hero ────────────────────────────────────────────── */
export default function Hero(){
  const typed=useTypewriter(ROLES);
  const [show,setShow]=useState(false);
  useEffect(()=>{setTimeout(()=>setShow(true),300);},[]);

  return (
    <section className="min-h-screen flex items-center px-6 relative overflow-hidden mesh-bg"
      style={{background:'var(--bg-dark)'}}>

      <Aurora/>
      <Constellation/>
      <PerspGrid/>
      <CodeRain/>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pt-24 pb-20"
        style={{position:'relative',zIndex:2}}>

        {/* LEFT */}
        <div>
          {/* Badge */}
          <div style={{
            display:'inline-flex',alignItems:'center',gap:8,
            background:'rgba(168,85,247,0.08)',border:'1px solid rgba(168,85,247,0.22)',
            borderRadius:100,padding:'0.4rem 1rem',marginBottom:'1.75rem',
          }}>
            <span style={{width:7,height:7,borderRadius:'50%',background:'#84cc16',
              boxShadow:'0 0 8px #84cc16',animation:'pulseGlow 2s ease-in-out infinite'}}/>
            <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.7rem',
              color:'rgba(255,255,255,0.6)',letterSpacing:'0.1em'}}>
              OPEN TO WORK · CHENNAI, INDIA 🌏
            </span>
          </div>

          {/* Headline */}
          <div style={{fontFamily:'Syne,sans-serif',fontWeight:800,lineHeight:1.02,
            fontSize:'clamp(3rem,7vw,6.5rem)',letterSpacing:'-0.04em',marginBottom:'1.25rem'}}>
            <SplitText text="I Build" style={{color:'white',display:'block'}} delay={80}/>
            <SplitText text="Digital" className="gradient-text" style={{display:'block'}} delay={260}/>
            <SplitText text="Magic." style={{color:'white',display:'block'}} delay={440}/>
          </div>

          {/* Typewriter */}
          <div style={{
            fontSize:'clamp(1rem,2.5vw,1.25rem)',color:'rgba(255,255,255,0.65)',
            marginBottom:'1.75rem',fontWeight:500,
            display:'flex',alignItems:'center',gap:8,minHeight:'2em',
          }}>
            <span style={{color:'#06b6d4',fontFamily:'JetBrains Mono,monospace'}}>&gt;</span>
            <span style={{fontFamily:'JetBrains Mono,monospace'}}>{typed}</span>
            <span className="typewriter-cursor"/>
          </div>

          <p style={{color:'rgba(255,255,255,0.38)',fontSize:'1rem',lineHeight:1.85,
            marginBottom:'2.5rem',maxWidth:490}}>
            Passionate frontend developer crafting immersive web experiences from&nbsp;
            <strong style={{color:'#ec4899'}}>Chennai, India</strong>.
            I turn bold ideas into pixel-perfect digital realities that leave people speechless.
          </p>

          <div style={{display:'flex',gap:16,flexWrap:'wrap',marginBottom:'3rem'}}>
            <MagBtn href="#projects" className="btn-neon btn-neon-primary">View My Work ↗</MagBtn>
            <MagBtn href="#contact"  className="btn-neon btn-neon-outline">Let's Connect</MagBtn>
          </div>

          {/* Stats */}
          <div style={{display:'flex',gap:'2.5rem',flexWrap:'wrap'}}>
            {[{n:'10+',l:'Projects'},{n:'2+',l:'Years Exp.'},{n:'5★',l:'Client Rating'},{n:'∞',l:'Passion'}].map(({n,l})=>(
              <div key={l}>
                <div className="shimmer-text" style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'1.85rem',lineHeight:1}}>{n}</div>
                <div style={{fontSize:'0.72rem',color:'rgba(255,255,255,0.3)',marginTop:4,letterSpacing:'0.06em'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Globe */}
        <div style={{
          display:'flex',flexDirection:'column',alignItems:'center',gap:16,
          opacity:show?1:0,transform:show?'scale(1)':'scale(0.82) translateY(30px)',
          transition:'opacity 0.9s ease,transform 0.9s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <Globe/>
          <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.68rem',
            color:'rgba(255,255,255,0.3)',letterSpacing:'0.14em',textAlign:'center'}}>
            <span style={{color:'#ec4899'}}>◉</span>&nbsp; LIVE LOCATION · CHENNAI, INDIA
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{position:'absolute',bottom:'1.5rem',left:'50%',transform:'translateX(-50%)',
        zIndex:2,display:'flex',flexDirection:'column',alignItems:'center',gap:6,opacity:.4}}>
        <span style={{fontSize:'0.62rem',letterSpacing:'0.2em',fontFamily:'JetBrains Mono,monospace'}}>SCROLL</span>
        <div style={{width:1,height:40,background:'linear-gradient(to bottom,rgba(168,85,247,0.9),transparent)',animation:'float 2s ease-in-out infinite'}}/>
      </div>
    </section>
  );
}