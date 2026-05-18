// Website builder page — prompt to site
const { useState: useStateS, useEffect: useEffectS } = React;

function SitePage({scenario, onToast}){
  const [prompt, setPrompt] = useStateS('');
  const [building, setBuilding] = useStateS(false);
  const [heroLine, setHeroLine] = useStateS('A quieter way to come back to your body.');
  const [heroMode, setHeroMode] = useStateS('split');
  const [showRetreat, setShowRetreat] = useStateS(scenario.id !== 'day3');
  const [showProcess, setShowProcess] = useStateS(false);
  const [darkPreview, setDarkPreview] = useStateS(false);
  const [version, setVersion] = useStateS(4);
  const [seoOpen, setSeoOpen] = useStateS(true);
  const [domainOpen, setDomainOpen] = useStateS(false);
  const [shareLink, setShareLink] = useStateS('');

  const promptSuggestions = [
    'Make the hero more direct',
    'Add a retreat section for October',
    'Swap to a darker, more grounded color palette',
    'Add a "what to expect in a session" block',
  ];

  const submitPrompt = (p)=>{
    if(!p) return;
    setPrompt(p); setBuilding(true);
    setTimeout(()=>{
      const lower = p.toLowerCase();
      if(lower.includes('hero')){ setHeroLine('Stop bracing. Start breathing. 1:1 somatic sessions in Lisbon.'); setHeroMode('centered'); }
      if(lower.includes('retreat')) setShowRetreat(true);
      if(lower.includes('darker') || lower.includes('grounded')) setDarkPreview(true);
      if(lower.includes('expect') || lower.includes('session')) setShowProcess(true);
      setVersion(v=>v+1);
      setBuilding(false); setPrompt('');
      onToast({message:'Site updated · v'+(version+1), sub:'Published to stillwater.hatchers.site'});
    }, 1100);
  };
  const restoreVersion = (v)=>{
    if(v===1){
      setHeroLine('A quieter way to come back to your body.');
      setHeroMode('split');
      setShowRetreat(false);
      setShowProcess(false);
      setDarkPreview(false);
    }
    if(v===2){
      setHeroLine('A quieter way to come back to your body.');
      setHeroMode('split');
      setShowRetreat(false);
      setShowProcess(false);
      setDarkPreview(false);
    }
    if(v===3){
      setHeroLine('Stop bracing. Start breathing. 1:1 somatic sessions in Lisbon.');
      setHeroMode('centered');
      setShowProcess(true);
      setShowRetreat(false);
    }
    setVersion(n=>n+1);
    onToast({message:`Restored v${v}`, sub:`Saved as v${version+1}`});
  };
  const sharePreview = ()=>{
    const link = `https://stillwater.hatchers.site/preview/v${version}?token=demo-${Math.round(Math.random()*9000+1000)}`;
    setShareLink(link);
    navigator.clipboard && navigator.clipboard.writeText(link);
    onToast({message:'Site preview shared', sub:'Preview link copied'});
  };

  return (
    <div className="os-page" style={{padding:'32px 40px 60px', maxWidth:1280, margin:'0 auto'}}>
      <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:18}}>
        <div>
          <SectionLabel style={{marginBottom:8}}>Website</SectionLabel>
          <h1 className="serif" style={{fontSize:40, lineHeight:1.05, margin:0}}>Edit by asking.</h1>
        </div>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <div className="desktop-only" style={{display:'flex', alignItems:'center', gap:8, padding:'8px 14px', borderRadius:999, background:'var(--bg-2)', border:'1px solid var(--line)', fontSize:12, color:'var(--ink-soft)'}}>
            <StatusDot color="#3F7A4A" live size={6}/> stillwater.hatchers.site
          </div>
          <Pill tone="ghost" size="md" onClick={()=>setDomainOpen(true)}>Connect domain</Pill>
          <Pill tone="solid" size="md" onClick={sharePreview}>Share preview</Pill>
        </div>
      </div>
      {shareLink && (
        <div className="fade-up" style={{margin:'-8px 0 16px auto', maxWidth:520, padding:'10px 12px', border:'1px solid var(--line)', borderRadius:8, background:'var(--bg-2)', fontSize:12, color:'var(--ink-soft)', display:'flex', gap:10, alignItems:'center'}}>
          <Icon.Copy size={13}/>
          <span style={{flex:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{shareLink}</span>
          <button onClick={()=>setShareLink('')} style={{fontSize:16, color:'var(--muted)'}}>×</button>
        </div>
      )}

      <Card pad={0} style={{marginBottom:18, overflow:'hidden'}}>
        <div style={{padding:'14px 18px', display:'flex', gap:10, alignItems:'center', borderBottom: building? '1px solid var(--line)' : 'none'}}>
          <Icon.Sparkle size={14}/>
          <input value={prompt} onChange={e=>setPrompt(e.target.value)}
            onKeyDown={e=>{ if(e.key==='Enter' && prompt.trim()){submitPrompt(prompt.trim());} }}
            placeholder='Ask Atlas to change anything — "add a retreat section", "make it darker"…'
            style={{flex:1, border:'none', outline:'none', fontSize:14, background:'transparent'}}/>
          <Pill tone="solid" size="sm" onClick={()=>submitPrompt(prompt.trim())}>Apply <Icon.Arrow size={11}/></Pill>
        </div>
        <div style={{display:'flex', flexWrap:'wrap', gap:6, padding:'12px 18px', borderTop:'1px solid var(--line-soft)', background:'var(--bg-2)'}}>
          {promptSuggestions.map((s,i)=><Pill key={i} tone="ghost" size="sm" onClick={()=>submitPrompt(s)}>{s}</Pill>)}
        </div>
      </Card>

      <div className="site-workspace" style={{display:'grid', gridTemplateColumns:'1fr 210px', gap:16, alignItems:'start'}}>
        <div style={{position:'relative'}}>
          {building && (
            <div style={{position:'absolute', inset:0, background:'#FAF7F0CC', zIndex:5, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:14}}>
              <div className="shimmer" style={{width:220, height:14, borderRadius:4, background:'#00000010'}}/>
              <div style={{fontSize:13, color:'var(--muted)'}}>Atlas is rebuilding the site…</div>
            </div>
          )}
          <Card pad={0} style={{overflow:'hidden'}}>
            <div style={{display:'flex', alignItems:'center', gap:8, padding:'10px 14px', borderBottom:'1px solid var(--line-soft)', background:'var(--bg-2)'}}>
              <span style={{width:10, height:10, borderRadius:'50%', background:'#E0C0B5'}}/>
              <span style={{width:10, height:10, borderRadius:'50%', background:'#E8D5A8'}}/>
              <span style={{width:10, height:10, borderRadius:'50%', background:'#B8D5B0'}}/>
              <div style={{flex:1, textAlign:'center', fontSize:11.5, color:'var(--muted)'}}>stillwater.hatchers.site</div>
              <span className="mono" style={{fontSize:10, color:'var(--muted)'}}>v{version}</span>
            </div>

            <div className={darkPreview?'preview-dark':''}>
              <SiteHero heroLine={heroLine} mode={heroMode}/>
              <SiteSessions/>
              {showProcess && <SiteProcess/>}
              <SiteAbout/>
              {showRetreat && <SiteRetreat/>}
              <SiteFooter/>
            </div>
          </Card>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          <VersionHistory version={version} onRestore={restoreVersion}/>
          <Card pad={0} style={{overflow:'hidden'}}>
            <button onClick={()=>setSeoOpen(o=>!o)} style={{width:'100%', padding:'13px 14px', display:'flex', justifyContent:'space-between', alignItems:'center', textAlign:'left'}}>
              <SectionLabel>SEO</SectionLabel>
              <Icon.Chevron size={12}/>
            </button>
            {seoOpen && <SeoPanel/>}
          </Card>
        </div>
      </div>

      {domainOpen && <DomainModal onClose={()=>setDomainOpen(false)} onToast={onToast}/>}
    </div>
  );
}

function VersionHistory({version,onRestore}){
  const items = [
    {v:1, t:'Launch day', d:'May 11'},
    {v:2, t:'Added sessions grid', d:'May 12'},
    {v:3, t:'Hero copy updated', d:'May 13'},
    {v:version, t:'Current', d:'Now', current:true},
  ];
  return (
    <Card pad={14}>
      <SectionLabel style={{marginBottom:10}}>Version history</SectionLabel>
      {items.map((it,i)=>(
        <div key={i} style={{padding:'10px 0', borderBottom:i<items.length-1?'1px solid var(--line-soft)':'none', background:it.current?'var(--bg-2)':'transparent', margin:it.current?'0 -8px':'0', paddingLeft:it.current?8:0, paddingRight:it.current?8:0, borderRadius:it.current?8:0}}>
          <div style={{fontSize:12.5, fontWeight:it.current?600:500}}>v{it.v} · {it.t}</div>
          <div style={{fontSize:10.5, color:'var(--muted)', margin:'2px 0 6px'}}>{it.d}</div>
          {!it.current && <button onClick={()=>onRestore(it.v)} style={{fontSize:11, color:'var(--ink)', textDecoration:'underline', textDecorationColor:'var(--taupe)', textUnderlineOffset:3}}>Restore</button>}
        </div>
      ))}
    </Card>
  );
}

function SeoPanel(){
  const desc = 'Somatic and breathwork sessions in Lisbon with Maya Chen. 1:1 sessions, breathwork, and small retreats for people who want quieter body work.';
  return (
    <div style={{padding:'0 14px 14px'}}>
      <div style={{fontSize:11, color:'var(--muted)', marginBottom:8}}>Page title</div>
      <div style={{fontSize:12.5, lineHeight:1.35, marginBottom:10}}>Still Water · Somatic & Breathwork · Lisbon</div>
      <div style={{fontSize:11, color:'var(--muted)', marginBottom:8}}>Meta description</div>
      <div style={{fontSize:12, color:'var(--ink-soft)', lineHeight:1.45, marginBottom:12}}>{desc.slice(0,155)}…</div>
      <div style={{border:'1px solid var(--line)', borderRadius:8, padding:10, background:'#fff', marginBottom:10}}>
        <div style={{fontSize:13, color:'#1a0dab', marginBottom:2}}>Still Water · Somatic & Breathwork · Lisbon</div>
        <div style={{fontSize:10.5, color:'#006621', marginBottom:4}}>stillwater.pt</div>
        <div style={{fontSize:11.5, color:'#545454', lineHeight:1.35}}>Somatic and breathwork sessions in Lisbon with Maya Chen. 1:1 sessions, breathwork, and small retreats…</div>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:7, fontSize:11.5, color:'var(--green)'}}><StatusDot color="#3F7A4A" live size={6}/> Atlas optimized this</div>
    </div>
  );
}

const SiteHero = React.memo(function SiteHero({heroLine, mode}){
  const centered = mode === 'centered';
  return (
    <div className="site-hero" style={{padding:centered?'76px 64px 86px':'72px 64px 80px', background:'var(--site-bg, linear-gradient(170deg,#F4EDE3 0%,#E8DCC9 100%))', borderBottom:'1px solid var(--site-line, var(--line))', position:'relative', color:'var(--site-text, var(--ink))'}}>
      <div className="site-hero-inner" style={{display:'grid', gridTemplateColumns:centered?'1fr':'7fr 5fr', gap:48, alignItems:'center', textAlign:centered?'center':'left'}}>
        <div style={{maxWidth:centered?720:'none', margin:centered?'0 auto':'0'}}>
          <div className="mono" style={{fontSize:10.5, letterSpacing:3, color:'var(--taupe-mid)', marginBottom:18}}>STILL WATER · LISBON</div>
          <h1 className="serif" style={{fontSize:centered?60:56, lineHeight:1.05, margin:'0 0 22px', letterSpacing:'-.015em', color:'var(--site-text, var(--ink))'}}>{heroLine}</h1>
          <p style={{fontSize:15, lineHeight:1.6, color:'var(--site-soft, var(--ink-soft))', maxWidth: centered?560:440, margin:centered?'0 auto 28px':'0 0 28px'}}>Somatic and breathwork sessions, 1:1 and small retreats. I work with people who think they've already tried "the body stuff" and want something quieter.</p>
          <div style={{display:'flex', gap:10, justifyContent:centered?'center':'flex-start'}}>
            <Pill tone="solid" size="lg">Book a session</Pill>
            <Pill tone="outline" size="lg" style={centered?{background:'#FAF7F020'}:{}}>A 15-min intro</Pill>
          </div>
        </div>
        {!centered && (
          <div style={{aspectRatio:'4/5', borderRadius:8, background:BRAND.brandGradient, position:'relative', overflow:'hidden'}}>
            <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 25% 20%, #FFFFFF35, transparent 50%)'}}/>
            <div style={{position:'absolute', bottom:18, left:18, right:18, color:'#FAF7F0'}}>
              <div className="serif" style={{fontSize:24, marginBottom:4}}>Maya Chen</div>
              <div style={{fontSize:12, opacity:.8}}>Certified somatic experiencing · breathwork · 8 years</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

const SiteSessions = React.memo(function SiteSessions(){
  return (
    <div className="site-section" style={{padding:'72px 64px', background:'var(--site-panel, #FAF7F0)', color:'var(--site-text, var(--ink))'}}>
      <div className="mono" style={{fontSize:10.5, letterSpacing:3, color:'var(--taupe-mid)', marginBottom:12}}>SESSIONS</div>
      <h2 className="serif" style={{fontSize:36, lineHeight:1.1, margin:'0 0 32px', maxWidth:680}}>Slow work. Lasting change.</h2>
      <div className="stats-grid" style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:0, border:'1px solid var(--site-line, var(--line))', borderRadius:8, overflow:'hidden'}}>
        {[
          {n:'1:1 Somatic',d:'A grounded 60-minute session. Online or in Lisbon studio.', p:'€140 / 60min'},
          {n:'1:1 Breathwork',d:'Guided breathwork for sleep, anxiety, or grounding.', p:'€140 / 60min'},
          {n:'4-session package',d:'For first-timers — four sessions, 10% off, mapped to your goal.', p:'€520'},
        ].map((s,i)=>(
          <div key={i} style={{padding:'28px 24px', borderLeft: i>0?'1px solid var(--site-line, var(--line))':'none', background:'var(--site-card, var(--paper))'}}>
            <div className="serif" style={{fontSize:24, marginBottom:8}}>{s.n}</div>
            <div style={{fontSize:13, color:'var(--site-soft, var(--ink-soft))', lineHeight:1.55, marginBottom:18}}>{s.d}</div>
            <div className="mono" style={{fontSize:12, color:'var(--taupe-mid)', letterSpacing:1.5}}>{s.p}</div>
          </div>
        ))}
      </div>
    </div>
  );
});

const SiteProcess = React.memo(function SiteProcess(){
  return (
    <div className="site-section" style={{padding:'64px', background:'var(--site-bg, #F5F1EA)', borderTop:'1px solid var(--site-line, var(--line))', color:'var(--site-text, var(--ink))'}}>
      <div className="mono" style={{fontSize:10.5, letterSpacing:3, color:'var(--taupe-mid)', marginBottom:12}}>WHAT TO EXPECT</div>
      <div className="stats-grid" style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14}}>
        {['Arrive slowly','Map what your body is doing','Leave with one usable cue'].map((t,i)=>(
          <div key={t} style={{padding:20, border:'1px solid var(--site-line, var(--line))', borderRadius:8, background:'var(--site-panel, #FAF7F0)'}}>
            <div className="mono" style={{fontSize:11, color:'var(--taupe-mid)', marginBottom:10}}>0{i+1}</div>
            <div className="serif" style={{fontSize:24, marginBottom:8}}>{t}</div>
            <div style={{fontSize:13, lineHeight:1.55, color:'var(--site-soft, var(--ink-soft))'}}>No performance. No big catharsis required. Just enough structure to feel what changes.</div>
          </div>
        ))}
      </div>
    </div>
  );
});

const SiteAbout = React.memo(function SiteAbout(){
  return (
    <div className="site-section" style={{padding:'72px 64px', background:'var(--site-panel, var(--ivory))', borderTop:'1px solid var(--site-line, var(--line))', color:'var(--site-text, var(--ink))'}}>
      <div className="site-about-inner" style={{display:'grid', gridTemplateColumns:'5fr 7fr', gap:56}}>
        <div>
          <div className="mono" style={{fontSize:10.5, letterSpacing:3, color:'var(--taupe-mid)', marginBottom:12}}>ABOUT</div>
          <h2 className="serif" style={{fontSize:32, lineHeight:1.15, margin:0}}>Who this is for.</h2>
        </div>
        <div>
          <p style={{fontSize:15, lineHeight:1.65, color:'var(--site-soft, var(--ink-soft))', margin:'0 0 16px'}}>People who think they've tried the body work. Who can't quite slow down. Who are tired of being told to "breathe" in a way that doesn't help.</p>
          <p style={{fontSize:15, lineHeight:1.65, color:'var(--site-soft, var(--ink-soft))', margin:0}}>This is not a class. It's not a wellness package. It's a slow, careful 60 minutes where I read what your body is doing and we work with it — not against it.</p>
        </div>
      </div>
    </div>
  );
});

const SiteRetreat = React.memo(function SiteRetreat(){
  return (
    <div className="site-section" style={{padding:'80px 64px', background:'linear-gradient(180deg,#7D9B91 0%,#4D6962 100%)', color:'#FAF7F0'}}>
      <div className="mono" style={{fontSize:10.5, letterSpacing:3, color:'#FAF7F099', marginBottom:14}}>OCTOBER 18–22 · SINTRA</div>
      <h2 className="serif" style={{fontSize:42, lineHeight:1.1, margin:'0 0 18px', maxWidth:600}}>A small retreat. 8 people. No agenda but rest.</h2>
      <p style={{fontSize:15, lineHeight:1.65, maxWidth:520, opacity:.85, margin:'0 0 24px'}}>Four days in the Sintra hills. We walk, we breathe, we eat well, we don't talk about productivity.</p>
      <Pill tone="outline" size="lg" style={{border:'1px solid #FAF7F0', color:'#FAF7F0'}}>Join the waitlist</Pill>
    </div>
  );
});

const SiteFooter = React.memo(function SiteFooter(){
  return (
    <div style={{padding:'40px 64px', background:'var(--ink)', color:'#D9D1C2', fontSize:12, display:'flex', justifyContent:'space-between'}}>
      <span>Still Water · Lisbon, PT</span>
      <span>hello@stillwater.pt</span>
    </div>
  );
});

function DomainModal({onClose,onToast}){
  const [step,setStep] = useStateS(1);
  const [verified,setVerified] = useStateS(false);
  useEffectS(()=>{
    if(step===2){ const t=setTimeout(()=>setStep(3),3000); return ()=>clearTimeout(t); }
    if(step===3){ const t=setTimeout(()=>setVerified(true),1500); return ()=>clearTimeout(t); }
  },[step]);
  const copy = (text)=>{ navigator.clipboard && navigator.clipboard.writeText(text); onToast({message:'DNS value copied', sub:text}); };
  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-card" onClick={e=>e.stopPropagation()} style={{width:'min(620px,100%)', padding:24}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18}}>
          <div><SectionLabel style={{marginBottom:6}}>Connect domain</SectionLabel><div className="serif" style={{fontSize:30}}>stillwater.pt</div></div>
          <button onClick={onClose} style={{fontSize:22, color:'var(--muted)'}}>×</button>
        </div>
        <div style={{display:'flex', gap:8, marginBottom:22}}>
          {[1,2,3].map(i=><div key={i} style={{flex:1, height:4, borderRadius:999, background:step>=i?'var(--ink)':'var(--line)'}}/> )}
        </div>
        {step===1 && (
          <div>
            <div style={{fontSize:13, color:'var(--muted)', marginBottom:10}}>Step 1 · enter your domain</div>
            <input defaultValue="stillwater.pt" style={{width:'100%', border:'1px solid var(--line)', borderRadius:8, padding:'12px 14px', background:'#fff', marginBottom:16}}/>
            <Pill tone="solid" size="md" onClick={()=>setStep(2)}>Continue</Pill>
          </div>
        )}
        {step===2 && (
          <div>
            <div style={{fontSize:13, color:'var(--muted)', marginBottom:12}}>Step 2 · add these DNS records</div>
            <div style={{border:'1px solid var(--line)', borderRadius:8, overflow:'hidden', marginBottom:14}}>
              {[{type:'A', host:'@', value:'76.76.21.21'}, {type:'CNAME', host:'www', value:'hatchers-sites.global'}].map((r,i)=>(
                <div key={i} style={{display:'grid', gridTemplateColumns:'70px 1fr 1.6fr 36px', gap:8, alignItems:'center', padding:'12px 14px', borderBottom:i===0?'1px solid var(--line-soft)':'none', fontSize:12}}>
                  <strong>{r.type}</strong><span>{r.host}</span><span className="mono" style={{fontSize:11}}>{r.value}</span>
                  <button onClick={()=>copy(r.value)}><Icon.Copy size={14}/></button>
                </div>
              ))}
            </div>
            <div style={{display:'flex', alignItems:'center', gap:8, fontSize:12, color:'var(--muted)'}}><StatusDot color="#B8842B" live size={7}/> Checking DNS propagation…</div>
          </div>
        )}
        {step===3 && (
          <div style={{textAlign:'center', padding:'20px 0'}}>
            {!verified ? (
              <>
                <StatusDot color="#B8842B" live size={12}/>
                <div style={{fontSize:13, color:'var(--muted)', marginTop:12}}>Verification pending…</div>
              </>
            ) : (
              <>
                <div style={{width:58, height:58, borderRadius:'50%', background:'var(--green-soft)', color:'var(--green)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px'}}><Icon.Check size={28}/></div>
                <div className="serif" style={{fontSize:28, marginBottom:6}}>Verified · site live at stillwater.pt</div>
                <Pill tone="solid" size="md" onClick={onClose}>Done</Pill>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

window.SitePage = SitePage;
