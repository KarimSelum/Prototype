// Shared UI atoms for the OS prototype
const { useState, useEffect, useRef } = React;

function Avatar({ gradient, size=32, initials, ring=false }){
  return (
    <div style={{
      width:size, height:size, borderRadius:'50%',
      background:gradient||'linear-gradient(140deg,#E5D5C0,#7D5B45)',
      display:'flex', alignItems:'center', justifyContent:'center',
      color:'#FAF7F0', fontSize: size*0.34, fontWeight:500,
      flexShrink:0,
      boxShadow: ring ? '0 0 0 2px #FAF7F0, 0 0 0 3px #1E1A15' : 'none'
    }}>{initials||''}</div>
  );
}

function Pill({children, tone='outline', size='md', onClick, style={}, className='' }){
  const tones = {
    outline:{border:'1px solid var(--ink)', color:'var(--ink)', background:'transparent'},
    solid:{border:'1px solid var(--ink)', color:'#fff', background:'var(--ink)'},
    soft:{border:'1px solid var(--line)', color:'var(--ink)', background:'var(--bg-2)'},
    ghost:{border:'1px solid var(--line)', color:'var(--ink-soft)', background:'transparent'},
    green:{border:'1px solid var(--green)', color:'var(--green)', background:'var(--green-soft)'},
    amber:{border:'1px solid var(--amber)', color:'var(--amber)', background:'var(--amber-soft)'},
    pink:{border:'1px solid #E91E63', color:'#E91E63', background:'#FCE4EC'},
  };
  const sizes = {sm:{padding:'4px 10px', fontSize:11}, md:{padding:'7px 14px', fontSize:12}, lg:{padding:'10px 18px', fontSize:13}};
  return (
    <button className={`pill-button ${className}`} onClick={onClick} style={{
      borderRadius:999, display:'inline-flex', alignItems:'center', gap:6,
      transition:'all .12s', whiteSpace:'nowrap', letterSpacing:.2, fontWeight:400,
      ...tones[tone], ...sizes[size], ...style
    }}>{children}</button>
  );
}

function StatusDot({color='#3F7A4A', live=false, size=8}){
  return <span className={live?'pulse-dot':''} style={{display:'inline-block', width:size, height:size, borderRadius:'50%', background:color}}/>;
}

function Card({children, style={}, pad=24, onClick, hover=false, className=''}){
  const [h,setH] = useState(false);
  return (
    <div className={`${(hover || onClick) ? 'card-hover' : ''} ${className}`} onClick={onClick}
      onMouseEnter={()=>hover&&setH(true)} onMouseLeave={()=>hover&&setH(false)}
      style={{
        background:'var(--paper)', border:'1px solid var(--line)', borderRadius:8,
        padding:pad, transition:'all .15s', cursor:onClick?'pointer':'default',
        boxShadow: h ? '0 8px 24px -12px #00000020' : 'none',
        ...style
      }}>{children}</div>
  );
}

function SectionLabel({children, style={}}){
  return <div className="mono" style={{fontSize:10, letterSpacing:2, color:'var(--taupe-mid)', textTransform:'uppercase', ...style}}>{children}</div>;
}

function ChannelIcon({channel, size=14}){
  const map = {ig:Icon.Instagram, fb:Icon.Facebook, tt:Icon.TikTok, li:Icon.LinkedIn};
  const C = map[channel];
  return C ? <C size={size}/> : null;
}

// Typewriter — used in Atlas reply rendering
function Typewriter({text='', speed=14, onDone, start=true}){
  const [display,setDisplay] = useState('');
  const doneRef = useRef(false);
  useEffect(()=>{
    if(!start){ setDisplay(''); doneRef.current=false; return; }
    setDisplay(cur=>{
      if(text.startsWith(cur)) return cur;
      doneRef.current = false;
      return '';
    });
  },[text,start]);
  useEffect(()=>{
    if(!start) return;
    if(display.length >= text.length){
      if(text.length && !doneRef.current){ doneRef.current = true; onDone && onDone(); }
      return;
    }
    doneRef.current = false;
    const t = setTimeout(()=>setDisplay(text.slice(0, display.length+1)), speed);
    return ()=>clearTimeout(t);
  },[display, text, speed, start]);
  return <span>{display}{display.length<text.length && <span className="caret"/>}</span>;
}

// Toast: simple right-bottom notification
function Toast({message, sub, onClose}){
  useEffect(()=>{ const t=setTimeout(()=>onClose&&onClose(), 4500); return ()=>clearTimeout(t); },[]);
  return (
    <div className="fade-up toast-notification" style={{
      position:'fixed', right:24, bottom:92, zIndex:76,
      background:'var(--ink)', color:'#FAF7F0', borderRadius:12,
      padding:'14px 18px', maxWidth:340, boxShadow:'0 20px 40px -10px #00000050',
      display:'flex', gap:12, alignItems:'flex-start'
    }}>
      <div style={{width:8, height:8, borderRadius:'50%', background:'#7AC383', marginTop:6, flexShrink:0}}/>
      <div style={{flex:1}}>
        <div style={{fontSize:13, fontWeight:500}}>{message}</div>
        {sub && <div style={{fontSize:12, color:'#B8A890', marginTop:2}}>{sub}</div>}
      </div>
      <button onClick={onClose} style={{color:'#8F8273', fontSize:16, lineHeight:1}}>×</button>
    </div>
  );
}

window.Avatar = Avatar;
window.Pill = Pill;
window.StatusDot = StatusDot;
window.Card = Card;
window.SectionLabel = SectionLabel;
window.ChannelIcon = ChannelIcon;
window.Typewriter = Typewriter;
window.Toast = Toast;
