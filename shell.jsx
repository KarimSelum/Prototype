// App shell — sidebar, topbar, scenario switcher, routing
const { useState: useStateApp, useEffect: useEffectApp } = React;

function App(){
  const [scenarioId, setScenarioId] = useStateApp('day3');
  const [page, setPage] = useStateApp('atlas');
  const [toast, setToast] = useStateApp(null);
  const [drawerOpen, setDrawerOpen] = useStateApp(false);
  const [commandOpen, setCommandOpen] = useStateApp(false);
  const [onboardingOpen, setOnboardingOpen] = useStateApp(true);
  const [fading, setFading] = useStateApp(false);
  const [loading, setLoading] = useStateApp(false);
  const [atlasCommand, setAtlasCommand] = useStateApp(null);
  const [campaignGenerateSignal, setCampaignGenerateSignal] = useStateApp(null);
  const [globalAtlasOpen, setGlobalAtlasOpen] = useStateApp(false);
  const [globalAtlasSeed, setGlobalAtlasSeed] = useStateApp(null);

  const scenario = SCENARIOS.find(s=>s.id===scenarioId) || SCENARIOS[0];
  const scenarioData = scenario;
  const atlasContext = atlasPageContext(page, scenario);

  const onToast = (t) => setToast(t);
  const onNav = (p) => {
    setDrawerOpen(false);
    if(p===page) return;
    setFading(true);
    setTimeout(()=>{ setPage(p); setFading(false); }, 120);
  };
  const switchScenario = (id) => {
    const next = SCENARIOS.find(s=>s.id===id);
    if(!next) return;
    setFading(true); setLoading(true);
    setTimeout(()=>{ setScenarioId(id); onToast({message:`Jumped to ${next.label} · ${next.sub}`}); }, 150);
    setTimeout(()=>{ setLoading(false); setFading(false); }, 520);
  };

  const copyBookingLink = () => {
    navigator.clipboard && navigator.clipboard.writeText('https://stillwater.hatchers.site/book');
    onToast({message:'Booking link copied', sub:'stillwater.hatchers.site/book'});
  };

  useEffectApp(()=>{
    const onKey = (e)=>{
      if((e.metaKey || e.ctrlKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); setCommandOpen(true); }
      if(e.key==='Escape'){ setCommandOpen(false); setDrawerOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return ()=>window.removeEventListener('keydown', onKey);
  },[]);

  const runCommand = (kind, value) => {
    setCommandOpen(false);
    if(kind==='atlas'){ onNav('atlas'); setAtlasCommand({id:Date.now(), seed:null}); }
    if(kind==='generate'){ onNav('campaigns'); setCampaignGenerateSignal(Date.now()); onToast({message:'Opening generator', sub:'Atlas is preparing a post'}); }
    if(kind==='copy-booking') copyBookingLink();
    if(kind==='scenario') switchScenario(value);
    if(kind==='network') onNav('network');
  };

  return (
    <div className="app-shell">
      <Sidebar page={page} onNav={onNav} scenario={scenario}/>
      <MobileTabbar page={page} onNav={onNav}/>
      <div className="content-shell">
        <Topbar scenario={scenario} scenarioId={scenarioId} switchScenario={switchScenario} page={page} onToast={onToast} onBell={()=>setDrawerOpen(true)}/>
        <div className={`page-frame ${fading ? 'is-fading':''}`}>
          {loading ? <ShellSkeleton page={page}/> : (
            <>
              {page==='atlas' && <AtlasPage scenario={scenario} scenarioData={scenarioData} onToast={onToast} onNav={onNav} atlasCommand={atlasCommand}/>}
              {page==='campaigns' && <CampaignsPage scenario={scenario} onToast={onToast} generateSignal={campaignGenerateSignal}/>}
              {page==='site' && <SitePage scenario={scenario} onToast={onToast}/>}
              {page==='bookings' && <BookingsPage scenario={scenario} onToast={onToast}/>}
              {page==='network' && <NetworkPage scenario={scenario} onToast={onToast}/>}
              {page==='messages' && <MessagesPage onToast={onToast}/>}
              {page==='settings' && <SettingsPage onToast={onToast}/>}
            </>
          )}
        </div>
      </div>
      {drawerOpen && <NotificationDrawer scenario={scenario} onClose={()=>setDrawerOpen(false)} onNav={onNav}/>}
      {commandOpen && <CommandPalette onClose={()=>setCommandOpen(false)} runCommand={runCommand}/>}
      {onboardingOpen && scenarioId==='day3' && <OnboardingOverlay onStart={()=>{setOnboardingOpen(false); switchScenario('day3');}}/>}
      {toast && <Toast message={toast.message} sub={toast.sub} onClose={()=>setToast(null)}/>}
      <FloatingAtlasButton page={page} onOpen={(seed)=>{setGlobalAtlasSeed(seed || null); setGlobalAtlasOpen(true);}}/>
      {globalAtlasOpen && (
        <AtlasChatModal
          scenario={scenario}
          seed={globalAtlasSeed}
          onClose={()=>{setGlobalAtlasOpen(false); setGlobalAtlasSeed(null);}}
          onNav={onNav}
          onToast={onToast}
          contextLabel={atlasContext.label}
          examples={atlasContext.examples}
        />
      )}
    </div>
  );
}

function atlasPageContext(page, scenario){
  const week = scenario.id==='day3' ? 'launch week' : scenario.id==='day21' ? 'first customers' : 'the growth month';
  const contexts = {
    atlas: {
      label:'today\'s operating brief',
      examples:['What should I focus on today?','Explain the one thing in plain English','What changed since yesterday?','Turn this brief into a 3-step plan']
    },
    campaigns: {
      label:'your campaigns',
      examples:['Which campaign strategy fits this week?','What should I boost with €15?','Why did this post convert?','Draft a campaign for '+week]
    },
    site: {
      label:'your website',
      examples:['What should I change on the hero?','How can I make the booking CTA clearer?','Write a stronger SEO title','What section should I add next?']
    },
    bookings: {
      label:'bookings and payments',
      examples:['Where are my open slots this week?','What would reduce no-shows?','Who should I follow up with?','Should I add a package offer?']
    },
    network: {
      label:'your founder network',
      examples:['Who should I talk to this week?','Draft a post for my cohort','Find people with similar booking problems','Write a warm intro message']
    },
    messages: {
      label:'founder messages',
      examples:['Draft a reply to Aïsha','Summarize my open conversations','Who needs a follow-up?','Write an intro message in my voice']
    },
    settings: {
      label:'your Atlas profile',
      examples:['What does Atlas know about my voice?','What should I connect next?','Summarize my business profile','What memory should I add?']
    }
  };
  return contexts[page] || contexts.atlas;
}

function FloatingAtlasButton({page,onOpen}){
  const compact = page==='atlas';
  return (
    <div className="atlas-float" style={{position:'fixed', right:22, bottom:22, zIndex:74, display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8}}>
      {!compact && (
        <div className="desktop-only" style={{maxWidth:260, padding:'10px 12px', border:'1px solid #F5B2C8', background:'#FFF5F8', color:'#7F1536', borderRadius:10, boxShadow:'0 16px 36px -26px #1E1A15', fontSize:11.5, lineHeight:1.35}}>
          Ask Atlas about this page. It can explain, draft, compare, or decide the next move.
        </div>
      )}
      <button onClick={()=>onOpen(null)} aria-label="Talk to Atlas" style={{height:52, padding:'0 18px', borderRadius:999, background:'linear-gradient(135deg,#E91E63,#B51242)', color:'#fff', border:'1px solid #FF8CB1', boxShadow:'0 18px 42px -18px #B51242', display:'flex', alignItems:'center', gap:10, fontSize:13, fontWeight:700}}>
        <Icon.Sparkle size={15}/>
        Talk to Atlas
      </button>
    </div>
  );
}

function Sidebar({page, onNav, scenario}){
  const nav = [
    {id:'atlas', l:'Atlas', I:Icon.Sparkle, badge:'AI'},
    {id:'campaigns', l:'Campaigns', I:Icon.Megaphone, badge: scenario.campaignsLive},
    {id:'site', l:'Website', I:Icon.Globe},
    {id:'bookings', l:'Bookings', I:Icon.Calendar, badge: scenario.bookings || null},
    {id:'network', l:'Network', I:Icon.Users},
    {id:'settings', l:'Settings', I:Icon.Settings},
    {id:'messages', l:'Messages', I:Icon.Message},
  ];
  return (
    <aside className="desktop-sidebar">
      <div style={{padding:'4px 8px 22px', display:'flex', alignItems:'center', gap:8}}>
        <div style={{width:26, height:26, borderRadius:7, background:'var(--ink)', color:'#FAF7F0', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:11, letterSpacing:1}}>H</div>
        <div>
          <div style={{fontSize:13, fontWeight:600, letterSpacing:.5}}>HATCHERS <span style={{color:'#E91E63'}}>AI</span></div>
          <div style={{fontSize:10, color:'var(--muted)'}}>Still Water · OS</div>
        </div>
      </div>

      <nav style={{display:'flex', flexDirection:'column', gap:2}}>
        {nav.map((n,i)=>(
          <button key={n.id} onClick={()=>onNav(n.id)} className={`nav-item ${page===n.id?'active':''}`} style={{
            display:'flex', alignItems:'center', gap:10, padding:'9px 10px', borderRadius:8,
            background: page===n.id ? '#fff' : 'transparent',
            border: page===n.id ? '1px solid var(--line)' : '1px solid transparent',
            color: page===n.id ? 'var(--ink)' : 'var(--ink-soft)',
            fontSize:13, textAlign:'left', boxShadow: page===n.id ? '0 1px 2px #00000008':'none',
            marginTop:n.id==='messages'?8:0
          }}>
            <n.I size={15}/>
            <span style={{flex:1}}>{n.l}</span>
            {n.badge && <span className="mono" style={{fontSize:10, padding:'1px 6px', borderRadius:10, background: typeof n.badge==='string'?'var(--ink)':'var(--bg-2)', color: typeof n.badge==='string'?'#FAF7F0':'var(--muted)', border: typeof n.badge==='string'?'none':'1px solid var(--line)'}}>{n.badge}</span>}
          </button>
        ))}
      </nav>

      <div style={{flex:1}}/>

      <div style={{padding:'12px', borderRadius:8, background:'#fff', border:'1px solid var(--line)', marginBottom:12}}>
        <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:8}}>
          <StatusDot color="#3F7A4A" live size={6}/>
          <span style={{fontSize:11, color:'var(--ink-soft)'}}>Atlas is working</span>
        </div>
        <div style={{fontSize:11, color:'var(--muted)', lineHeight:1.45}}>
          {scenario.id==='day3'? 'Indexing your site, learning your voice.' : scenario.id==='day21'? 'Monitoring boosted post · 4h in.' : 'Optimizing Thursday ad creative.'}
        </div>
      </div>

      <div style={{display:'flex', alignItems:'center', gap:10, padding:'6px 4px'}}>
        <Avatar gradient={BRAND.avatarGradient} size={32} initials={BRAND.initials}/>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:12.5, fontWeight:500}}>{BRAND.founder}</div>
          <div style={{fontSize:10.5, color:'var(--muted)'}}>{BRAND.handle}</div>
        </div>
      </div>
    </aside>
  );
}

function MobileTabbar({page,onNav}){
  const tabs = [
    {id:'atlas', I:Icon.Sparkle},
    {id:'campaigns', I:Icon.Megaphone},
    {id:'site', I:Icon.Globe},
    {id:'bookings', I:Icon.Calendar},
    {id:'network', I:Icon.Users},
  ];
  return <div className="mobile-tabbar">{tabs.map(t=><button key={t.id} className={page===t.id?'active':''} onClick={()=>onNav(t.id)}><t.I size={18}/></button>)}</div>;
}

function Topbar({scenario, scenarioId, switchScenario, page, onBell}){
  const titles = {atlas:'Atlas · daily brief', campaigns:'Campaigns', site:'Website', bookings:'Bookings & payments', network:'Founder network', messages:'Messages', settings:'Settings'};
  return (
    <div className="topbar">
      <div className="topbar-title" style={{fontSize:12, color:'var(--muted)'}}>{titles[page]}</div>
      <div className="mobile-only" style={{alignItems:'center', gap:8, fontSize:12, color:'var(--muted)'}}>
        <span className="mono" style={{color:'var(--ink)'}}>HATCHERS <span style={{color:'#E91E63'}}>AI</span></span>
        <Pill tone="soft" size="sm">{scenario.label}</Pill>
      </div>
      <div style={{flex:1}}/>
      <div className="scenario-switch" style={{display:'flex', alignItems:'center', gap:6, background:'#fff', border:'1px solid var(--line)', borderRadius:999, padding:3}}>
        <span className="mono" style={{fontSize:9.5, color:'var(--muted)', padding:'0 8px 0 10px', letterSpacing:1.5}}>DEMO</span>
        {SCENARIOS.map(s=>(
          <button className="scenario-pill" key={s.id} onClick={()=>switchScenario(s.id)} style={{
            padding:'5px 12px', borderRadius:999, fontSize:11.5,
            background: scenarioId===s.id ? 'var(--ink)' : 'transparent',
            color: scenarioId===s.id ? '#FAF7F0' : 'var(--ink-soft)'
          }}>{s.label} · <span style={{opacity:.7}}>{s.sub}</span></button>
        ))}
      </div>
      <button className="topbar-bell" onClick={onBell} style={{position:'relative', padding:8, borderRadius:8}}>
        <Icon.Bell size={16}/>
        <span style={{position:'absolute', top:6, right:6, width:6, height:6, borderRadius:'50%', background:'#E91E63'}}/>
      </button>
    </div>
  );
}

function NotificationDrawer({scenario,onClose,onNav}){
  const tone = {green:'#3F7A4A', blue:'#5B7AA1', taupe:'#B8A890'};
  const items = NOTIFICATIONS[scenario.id] || [];
  return (
    <>
      <div className="drawer-backdrop" onClick={onClose}/>
      <aside className="drawer">
        <div style={{padding:'18px 20px', borderBottom:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div><SectionLabel style={{marginBottom:5}}>Notifications</SectionLabel><div className="serif" style={{fontSize:26}}>{scenario.label}</div></div>
          <button onClick={onClose} style={{fontSize:22, color:'var(--muted)'}}>×</button>
        </div>
        <div style={{padding:14}}>
          {items.map((n,i)=>(
            <div key={i} style={{padding:'14px 10px', borderBottom:i<items.length-1?'1px solid var(--line-soft)':'none'}}>
              <div style={{display:'flex', gap:10, alignItems:'flex-start'}}>
                <StatusDot color={tone[n.tone]} size={8}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:13, lineHeight:1.4, marginBottom:4}}>{n.title}</div>
                  <div style={{fontSize:11, color:'var(--muted)', marginBottom:10}}>{n.time}</div>
                  <Pill tone="ghost" size="sm" onClick={()=>{onNav(n.page); onClose();}}>{n.action}</Pill>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

function CommandPalette({onClose,runCommand}){
  const actions = [
    {k:'atlas', l:'Ask Atlas…', sub:'Open the cofounder chat', I:Icon.Sparkle},
    {k:'generate', l:'Generate post', sub:'Open Campaigns and start the generator', I:Icon.Megaphone},
    {k:'copy-booking', l:'New booking link', sub:'Copy stillwater.hatchers.site/book', I:Icon.Calendar},
    {k:'scenario', v:'day3', l:'Day 3', sub:'Launch week', I:Icon.Clock},
    {k:'scenario', v:'day21', l:'Day 21', sub:'First customers', I:Icon.Clock},
    {k:'scenario', v:'day60', l:'Day 60', sub:'Humming', I:Icon.Clock},
    {k:'network', l:'Open network feed', sub:'Founder cohort and spaces', I:Icon.Users},
  ];
  return (
    <div className="overlay-backdrop" onClick={onClose} style={{zIndex:90}}>
      <div className="command-panel" onClick={e=>e.stopPropagation()}>
        <div style={{padding:'14px 18px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid var(--line)'}}>
          <Icon.Search size={16}/>
          <div style={{fontSize:13, color:'var(--muted)'}}>Command palette · ⌘K</div>
        </div>
        <div style={{padding:8}}>
          {actions.map((a,i)=>(
            <button key={i} onClick={()=>runCommand(a.k,a.v)} style={{width:'100%', display:'flex', gap:12, alignItems:'center', padding:'12px 14px', borderRadius:8, textAlign:'left'}}>
              <a.I size={15}/>
              <div style={{flex:1}}>
                <div style={{fontSize:13, fontWeight:500}}>{a.l}</div>
                <div style={{fontSize:11, color:'var(--muted)', marginTop:2}}>{a.sub}</div>
              </div>
              <Icon.Chevron size={12}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function OnboardingOverlay({onStart}){
  return (
    <div className="overlay-backdrop">
      <div className="overlay-card" style={{width:'min(640px,100%)', padding:'28px 30px'}}>
        <SectionLabel style={{marginBottom:10}}>Atlas</SectionLabel>
        <h1 className="serif" style={{fontSize:38, lineHeight:1.05, margin:'0 0 12px'}}>Good morning, Maya.</h1>
        <p style={{fontSize:14, lineHeight:1.6, color:'var(--ink-soft)', margin:'0 0 22px'}}>Your business has a shape now. I will keep the system quiet: site, bookings, campaigns, revenue. One thing at a time.</p>
        <div className="stats-grid" style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:24}}>
          {['Site live','Bookings ready','Campaigns drafted','Revenue watched'].map((x,i)=>(
            <div key={x} style={{padding:14, border:'1px solid var(--line)', borderRadius:8, background:'#fff'}}>
              <div className="mono" style={{fontSize:10, color:'var(--taupe-mid)', marginBottom:10}}>0{i+1}</div>
              <div style={{fontSize:13, lineHeight:1.35}}>{x}</div>
            </div>
          ))}
        </div>
        <Pill tone="solid" size="lg" onClick={onStart}>Start with Day 3</Pill>
      </div>
    </div>
  );
}

function ShellSkeleton({page}){
  const count = page==='campaigns' ? 5 : 4;
  return (
    <div className="os-page" style={{padding:'32px 40px 60px', maxWidth:1200, margin:'0 auto'}}>
      <div className="shimmer" style={{height:36, width:280, borderRadius:8, marginBottom:22}}/>
      <div className="stats-grid" style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:22}}>
        {Array.from({length:4}).map((_,i)=><div key={i} className="shimmer" style={{height:118, borderRadius:8}}/> )}
      </div>
      <div style={{display:'grid', gap:12}}>
        {Array.from({length:count}).map((_,i)=><div key={i} className="shimmer" style={{height:i===0?180:74, borderRadius:8}}/> )}
      </div>
    </div>
  );
}

function SettingsPage({onToast}){
  const [profile,setProfile] = useStateApp("I work with people who think they've already tried the body stuff. 1:1 sessions and small retreats.");
  const [billingOpen,setBillingOpen] = useStateApp(false);
  const [integrations,setIntegrations] = useStateApp([
    {n:'Stripe', s:'Connected · Bank: BPI ****4421', live:true},
    {n:'Google Calendar', s:'Connected · maya@stillwater.pt', live:true},
    {n:'Meta Ads', s:'Connected · Still Water Page', live:true},
    {n:'TikTok for Business', s:'Connected · @maya.stillwater', live:true},
    {n:'Mailchimp', s:'Not connected', live:false},
    {n:'WhatsApp Business', s:'Not connected', live:false},
  ]);
  const [atlasFacts,setAtlasFacts] = useStateApp([
    ['Niche','Somatic coaching'],
    ['Voice','Quiet, embodied'],
    ['Top post','Precise instruction'],
    ['Booking source','Instagram bio'],
    ['Best channel','IG + TikTok'],
  ]);
  const [memory,setMemory] = useStateApp('');
  const connectIntegration = (name)=>{
    setIntegrations(list=>list.map(x=>x.n===name ? {...x, live:true, s:'Connected · just now'} : x));
    onToast({message:name+' connected', sub:'Atlas can use it in future workflows'});
  };
  const saveMemory = ()=>{
    const text = memory.trim();
    if(!text) return;
    setAtlasFacts(list=>[['New memory', text], ...list].slice(0,5));
    setMemory('');
    onToast({message:'Atlas updated', sub:'Will apply to future content'});
  };
  return (
    <div className="os-page" style={{padding:'32px 40px 60px', maxWidth:1060, margin:'0 auto'}}>
      <SectionLabel style={{marginBottom:8}}>Settings</SectionLabel>
      <h1 className="serif" style={{fontSize:40, margin:'0 0 24px'}}>Account & integrations.</h1>

      <div className="bookings-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16}}>
        <Card>
          <SectionLabel style={{marginBottom:14}}>Profile</SectionLabel>
          <div style={{display:'flex', gap:14, alignItems:'center', marginBottom:16}}>
            <Avatar gradient={BRAND.avatarGradient} size={56} initials={BRAND.initials}/>
            <div>
              <div style={{fontSize:14, fontWeight:600}}>Maya Chen</div>
              <div style={{fontSize:12, color:'var(--muted)'}}>Still Water · Lisbon, PT</div>
            </div>
          </div>
          <textarea value={profile} onChange={e=>setProfile(e.target.value)} style={{width:'100%', minHeight:92, border:'1px solid var(--line)', borderRadius:8, padding:12, background:'var(--bg-2)', lineHeight:1.5, marginBottom:12}}/>
          <Pill tone="solid" size="sm" onClick={()=>onToast({message:'Profile saved', sub:`${profile.length} characters stored in voice profile`})}>Save profile</Pill>
        </Card>

        <Card>
          <SectionLabel style={{marginBottom:14}}>Plan</SectionLabel>
          <div className="serif" style={{fontSize:30, marginBottom:4}}>Premium plan</div>
          <div style={{fontSize:12, color:'var(--muted)', marginBottom:14}}>Current plan</div>
          {['Atlas cofounder chat','Website builder','Bookings + Stripe payouts','Campaign generator','Founder network','Voice profile memory'].map(x=>(
            <div key={x} style={{display:'flex', gap:8, padding:'6px 0', fontSize:13}}><Icon.Check size={13}/> {x}</div>
          ))}
          <Pill tone="ghost" size="sm" style={{marginTop:14}} onClick={()=>setBillingOpen(o=>!o)}>Manage billing</Pill>
          {billingOpen && (
            <div className="fade-up" style={{marginTop:12, padding:12, border:'1px solid var(--line-soft)', borderRadius:8, background:'var(--bg-2)', fontSize:12.5, color:'var(--ink-soft)', lineHeight:1.5}}>
              Premium plan active · Card ending 4242.
              <div style={{display:'flex', gap:6, marginTop:10}}>
                <Pill tone="ghost" size="sm" onClick={()=>onToast({message:'Plan receipt downloaded', sub:'May 2026'})}>Download receipt</Pill>
                <Pill tone="ghost" size="sm" onClick={()=>onToast({message:'Card update link opened'})}>Update card</Pill>
              </div>
            </div>
          )}
        </Card>
      </div>

      <Card style={{marginBottom:16}}>
        <SectionLabel style={{marginBottom:14}}>Integrations</SectionLabel>
        <div className="stats-grid" style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12}}>
          {integrations.map(x=>(
            <div key={x.n} style={{padding:14, border:'1px solid var(--line)', borderRadius:8, background:'var(--bg-2)'}}>
              <div style={{display:'flex', justifyContent:'space-between', gap:8, marginBottom:8}}>
                <div style={{fontSize:13, fontWeight:600}}>{x.n}</div>
                <Pill tone={x.live?'green':'ghost'} size="sm">{x.live?'Connected':'Connect'}</Pill>
              </div>
              <div style={{fontSize:11.5, color:'var(--muted)', lineHeight:1.4}}>{x.s}</div>
              {!x.live && <button onClick={()=>connectIntegration(x.n)} style={{fontSize:11, color:'var(--ink)', marginTop:10, textDecoration:'underline', textDecorationColor:'var(--taupe)', textUnderlineOffset:3}}>Connect</button>}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel style={{marginBottom:14}}>Atlas profile</SectionLabel>
        <div className="stats-grid" style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10, marginBottom:16}}>
          {atlasFacts.map(([k,v])=>(
            <div key={k} style={{padding:12, border:'1px solid var(--line)', borderRadius:8, background:'var(--bg-2)'}}>
              <div className="mono" style={{fontSize:10, color:'var(--taupe-mid)', marginBottom:6}}>{k}</div>
              <div style={{fontSize:12.5, lineHeight:1.35}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex', gap:10}}>
          <input value={memory} onChange={e=>setMemory(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') saveMemory();}} placeholder="Teach Atlas something new…" style={{flex:1, border:'1px solid var(--line)', borderRadius:999, padding:'10px 14px', background:'var(--bg-2)'}}/>
          <Pill tone="solid" size="md" onClick={saveMemory}>Save</Pill>
        </div>
      </Card>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
