// Atlas — the AI cofounder. Gets its own bespoke section with a dark-themed chat.

function MockAtlas(){
  const [step, setStep] = React.useState(0);
  const [typed, setTyped] = React.useState('');

  const thread = [
    {role:'user', text:"What should I focus on this week?"},
    {role:'atlas', text:"Based on your launch plan, week 4 is about proof. You've got 3 cold emails that got replies but no calls booked — let's fix that.\n\nTop 3 moves for this week:"},
    {role:'atlas-cards'},
    {role:'user', text:"Can you draft the follow-ups?"},
    {role:'atlas', text:"Already on it. Drafts are in your inbox — tone matched to each prospect's last reply. You approve, Atlas sends on Tuesday at 9:02 AM (their best open rate)."},
  ];

  React.useEffect(()=>{
    const id = setInterval(()=>{
      setStep(s=>{
        if(s>=thread.length-1) return 0;
        return s+1;
      });
      setTyped('');
    }, 3400);
    return ()=>clearInterval(id);
  },[]);

  // Simple typewriter for current assistant message
  React.useEffect(()=>{
    const cur = thread[step];
    if(!cur || cur.role==='user' || cur.role==='atlas-cards'){ setTyped(cur?.text||''); return; }
    let i=0; setTyped('');
    const id = setInterval(()=>{
      i++; setTyped(cur.text.slice(0,i));
      if(i>=cur.text.length) clearInterval(id);
    }, 14);
    return ()=>clearInterval(id);
  },[step]);

  return (
    <div style={{background:'#1B1814',borderRadius:16,overflow:'hidden',border:'1px solid #2E2822',boxShadow:'0 40px 80px -40px #00000070'}}>
      {/* Top bar */}
      <div style={{padding:'16px 20px',borderBottom:'1px solid #2E2822',display:'flex',alignItems:'center',gap:12}}>
        <div style={{width:28,height:28,borderRadius:'50%',background:'radial-gradient(circle at 35% 30%, #F3DFCF, #B8825A 50%, #5A4E3F)'}}/>
        <div style={{flex:1}}>
          <div style={{color:'#F4EFE5',fontSize:13,fontWeight:500,display:'flex',alignItems:'center',gap:8}}>
            Atlas <span style={{fontSize:9,color:'#8F8273',letterSpacing:2}} className="mono">YOUR AI COFOUNDER</span>
          </div>
          <div style={{color:'#8F8273',fontSize:11}}>Knows your calendar, your pipeline, your goals · synced 2m ago</div>
        </div>
        <div style={{fontSize:10,color:'#8F8273',padding:'4px 10px',border:'1px solid #3A342D',borderRadius:999}} className="mono">VOICE · TEXT</div>
      </div>

      {/* Chat body */}
      <div style={{padding:'22px 24px',minHeight:380,display:'flex',flexDirection:'column',gap:14,background:'radial-gradient(ellipse at top left, #25201B 0%, #1B1814 60%)'}}>
        {thread.slice(0,step+1).map((m,i)=>{
          if(m.role==='user'){
            return (
              <div key={i} style={{alignSelf:'flex-end',maxWidth:'72%',padding:'10px 14px',background:'#F4EFE5',color:'#1E1A15',borderRadius:'14px 14px 2px 14px',fontSize:13,lineHeight:1.5}}>
                {m.text}
              </div>
            );
          }
          if(m.role==='atlas-cards'){
            return (
              <div key={i} style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginLeft:36,maxWidth:580}}>
                {[
                  {n:'01',t:'Book 2 intro calls',s:'Draft follow-ups to the 3 warm replies — I\'ll send on your approval',tag:'Outreach',c:'#F3DFCF'},
                  {n:'02',t:'Ship pricing page',s:'Website builder has a draft. 2 tweaks left — I\'ll nudge tomorrow',tag:'Website',c:'#D9E2EE'},
                  {n:'03',t:'Post case study',s:'Campaign generator has 4 variants ready. Launch Thursday 9 AM',tag:'Social',c:'#E3DBEB'},
                ].map((c,k)=>(
                  <div key={k} style={{background:'#26211C',border:'1px solid #3A342D',borderRadius:10,padding:12}}>
                    <div style={{fontSize:10,color:'#8F8273',letterSpacing:1.5}} className="mono">{c.n}</div>
                    <div style={{color:'#F4EFE5',fontSize:13,fontWeight:500,marginTop:4,lineHeight:1.3}}>{c.t}</div>
                    <div style={{color:'#A89D8D',fontSize:11,lineHeight:1.45,marginTop:6}}>{c.s}</div>
                    <div style={{marginTop:10,fontSize:9,color:c.c,padding:'3px 7px',border:'1px solid '+c.c+'40',borderRadius:999,display:'inline-block',letterSpacing:1}} className="mono">{c.tag}</div>
                  </div>
                ))}
              </div>
            );
          }
          const isLast = i===step;
          const show = isLast ? typed : m.text;
          return (
            <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
              <div style={{width:26,height:26,borderRadius:'50%',background:'radial-gradient(circle at 35% 30%, #F3DFCF, #B8825A 50%, #5A4E3F)',flexShrink:0,marginTop:2}}/>
              <div style={{color:'#E8DFCB',fontSize:13,lineHeight:1.55,maxWidth:'78%',whiteSpace:'pre-line'}}>
                {show}
                {isLast && typed.length<m.text.length && <span style={{display:'inline-block',width:8,height:14,background:'#E8DFCB',marginLeft:2,verticalAlign:'-2px',animation:'blink 1s infinite'}}/>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input bar */}
      <div style={{padding:'14px 20px',borderTop:'1px solid #2E2822',display:'flex',gap:10,alignItems:'center'}}>
        <div style={{flex:1,padding:'10px 14px',background:'#26211C',border:'1px solid #3A342D',borderRadius:999,color:'#8F8273',fontSize:12}}>Ask Atlas anything — or say "brief me on today"</div>
        <div style={{width:34,height:34,borderRadius:'50%',background:'#F4EFE5',color:'#1E1A15',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </div>
      </div>
      <style>{`@keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0}}`}</style>
    </div>
  );
}

window.MockAtlas = MockAtlas;
