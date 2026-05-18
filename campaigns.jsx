// Campaigns page
const { useState: useStateC, useEffect: useEffectC } = React;

const CAMPAIGN_STRATEGIES = [
  {
    id:'bookings',
    name:'Book this week',
    promise:'Turn warm attention into paid sessions before the week ends.',
    objective:'6 new bookings',
    budget:'€15/day',
    channels:['ig','fb'],
    cadence:['Day 1 · proof post','Day 2 · booking reminder','Day 3 · soft scarcity'],
    fit:'Best when traffic exists but people need a clearer next step.',
    look:'For Still Water, this becomes a calm Instagram/Facebook sequence around the 4-minute morning anchor, ending in a 15-minute intro call.'
  },
  {
    id:'trust',
    name:'Build trust first',
    promise:'Teach, show proof, and let people self-select before asking them to book.',
    objective:'More saved posts and replies',
    budget:'Organic + €5 retarget',
    channels:['ig','li'],
    cadence:['Teach one tiny practice','Share a client pattern','Invite quiet replies'],
    fit:'Best when the offer is intimate or high-trust.',
    look:'For Still Water, this feels like three educational posts that make somatic work less abstract, then a gentle booking invitation.'
  },
  {
    id:'audience',
    name:'Find new audience',
    promise:'Test sharper hooks with people who have not discovered the business yet.',
    objective:'1,800 qualified views',
    budget:'€25/day',
    channels:['tt','ig'],
    cadence:['Hook test','Story test','Winning angle boost'],
    fit:'Best when the existing audience is small but the offer is clear.',
    look:'For Still Water, Atlas turns the jaw, sleep, and breathing cues into short vertical posts and boosts the winner after 6 hours.'
  },
  {
    id:'retreat',
    name:'Fill a cohort',
    promise:'Move from attention to deposits for a dated group offer.',
    objective:'8 retreat waitlist spots',
    budget:'€20/day',
    channels:['ig','li','fb'],
    cadence:['Vision post','Behind-the-scenes email','Deposit CTA'],
    fit:'Best for retreats, workshops, cohorts, or packages with a deadline.',
    look:'For Still Water, this becomes a Sintra retreat sequence: rest-first story, eight-person capacity, then a waitlist/deposit page.'
  }
];

function campaignDraftForStrategy(strategy, scenario){
  const drafts = {
    bookings:{
      title:'Book this week · Morning anchor',
      post:'A 4-minute morning anchor for the days your body starts before your calendar does.\n\nTwo hands on your ribcage. Four counts in. Six counts out. Repeat until your shoulders stop arguing with the morning.\n\nI have a few 1:1 openings this week. Start with a 15-minute intro if you want to see whether this work fits.'
    },
    trust:{
      title:'Build trust · What somatic means',
      post:'Somatic work is not a performance.\n\nIt is noticing the exact place your body starts bracing, then giving it one smaller job.\n\nThis week I am sharing three tiny practices I use with first-time clients. Save the ones that work. Ignore the ones that do not. Your body gets a vote here.'
    },
    audience:{
      title:'Find new audience · Jaw cue',
      post:'Your jaw may be doing the work your nervous system does not know how to put down yet.\n\nTry this: tongue resting, teeth apart, one slow exhale before you answer the next message.\n\nTiny cue. Big signal. If your body keeps bracing, that is the work.'
    },
    retreat:{
      title:'Fill a cohort · Sintra retreat',
      post:'October in Sintra. Eight people. Four slow days.\n\nNo productivity language. No big transformation promise. Just breath, walks, meals, and enough quiet for your body to stop performing.\n\nWaitlist opens this week. Deposits hold a place once dates are confirmed.'
    }
  };
  return drafts[strategy.id] || drafts.bookings;
}

function CampaignsPage({scenario, onToast, generateSignal}){
  const [camps, setCamps] = useStateC(()=>campaignsFor(scenario.id));
  const [active, setActive] = useStateC(0);
  const [generating, setGenerating] = useStateC(false);
  const [genResult, setGenResult] = useStateC(null);
  const [genTab, setGenTab] = useStateC('Instagram');
  const [boostOpen, setBoostOpen] = useStateC(false);
  const [budget, setBudget] = useStateC('€15');
  const [duration, setDuration] = useStateC('3 days');
  const [channels, setChannels] = useStateC({IG:true, TikTok:true, 'Meta Ads':false});
  const [handledSignal, setHandledSignal] = useStateC(null);
  const [analysisOpen, setAnalysisOpen] = useStateC(false);
  const [selectedStrategy, setSelectedStrategy] = useStateC(CAMPAIGN_STRATEGIES[0]);

  const c = camps[active] || camps[0];

  useEffectC(()=>{
    setCamps(campaignsFor(scenario.id));
    setActive(0);
    setAnalysisOpen(false);
    setSelectedStrategy(CAMPAIGN_STRATEGIES[0]);
  },[scenario.id]);

  const generate = (strategy=selectedStrategy)=>{
    setGenerating(true); setGenResult(null);
    setBoostOpen(false);
    setTimeout(()=>{
      setGenerating(false);
      const draft = campaignDraftForStrategy(strategy, scenario);
      setGenResult({
        post:draft.post,
        title:draft.title,
        channels:strategy.channels,
        strategy
      });
      onToast({message:strategy.name+' generated', sub:'Image + copy + schedule ready to review'});
    }, 1600);
  };

  useEffectC(()=>{
    if(generateSignal && generateSignal !== handledSignal){
      setHandledSignal(generateSignal);
      generate();
    }
  },[generateSignal]);

  const updateCampaign = (index, patch) => setCamps(list=>list.map((item,i)=>i===index ? {...item, ...patch} : item));
  const scheduleGenerated = (status='scheduled', boosted=false) => {
    if(!genResult) return;
    const next = {
      name: genResult.title + (boosted ? ' (boosted)' : ''),
      channels: genResult.channels,
      status,
      spend: boosted ? Number((budget.match(/\d+/)||['15'])[0]) : 0,
      clicks: 0,
      leads: 0,
      post: genResult.post
    };
    setCamps(list=>[next, ...list]);
    setActive(0);
    setBoostOpen(false);
    setGenResult(null);
    onToast({message: status==='live'?'Campaign live':'Campaign scheduled', sub: boosted ? `${budget} · ${duration}` : 'Ready in campaign list'});
  };

  return (
    <div className="os-page" style={{padding:'32px 40px 60px', maxWidth:1240, margin:'0 auto'}}>
      <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:24}}>
        <div>
          <SectionLabel style={{marginBottom:8}}>Campaigns</SectionLabel>
          <h1 className="serif" style={{fontSize:40, lineHeight:1.05, margin:0}}>Atlas runs your distribution.</h1>
        </div>
        <Pill tone="solid" size="md" onClick={()=>generate(selectedStrategy)}>
          <Icon.Sparkle size={12}/> Generate post
        </Pill>
      </div>

      {/* Stat row */}
      <div className="stats-grid" style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24}}>
        {[
          {l:'Live campaigns', v: camps.filter(c=>c.status==='live').length},
          {l:'Spend (7d)', v:'€'+camps.reduce((s,c)=>s+(c.spend||0),0)},
          {l:'Clicks (7d)', v: camps.reduce((s,c)=>s+(c.clicks||0),0).toLocaleString()},
          {l:'Leads (7d)', v: camps.reduce((s,c)=>s+(c.leads||0),0)},
        ].map((s,i)=>(
          <Card key={i} pad={16}>
            <div style={{fontSize:11, color:'var(--muted)', marginBottom:4}}>{s.l}</div>
            <div className="serif" style={{fontSize:28, letterSpacing:'-.01em'}}>{s.v}</div>
          </Card>
        ))}
      </div>

      <CampaignStrategySelector
        scenario={scenario}
        selected={selectedStrategy}
        onSelect={setSelectedStrategy}
        onGenerate={(strategy)=>{setSelectedStrategy(strategy); generate(strategy);}}
      />

      <div className="campaign-grid" style={{display:'grid', gridTemplateColumns:'5fr 7fr', gap:16}}>
        {/* List */}
        <Card pad={0}>
          <div style={{padding:'14px 18px', borderBottom:'1px solid var(--line-soft)'}}>
            <SectionLabel>All campaigns</SectionLabel>
          </div>
          {camps.map((cc,i)=>(
            <button key={i} onClick={()=>setActive(i)} style={{
              display:'flex', width:'100%', padding:'14px 18px', alignItems:'center', gap:12, textAlign:'left',
              borderBottom: i<camps.length-1 ? '1px solid var(--line-soft)' : 'none',
              borderLeft:'3px solid '+(active===i?'var(--ink)':'transparent'),
              background: active===i?'var(--bg-2)':'transparent',
              animationDelay:`${i*50}ms`
            }}>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13, fontWeight:500, marginBottom:4, display:'flex', alignItems:'center', gap:6}}>
                  {cc.name}
                  {cc.winner && <Pill tone="green" size="sm">Winner</Pill>}
                  {cc.viral && <Pill tone="amber" size="sm">Viral</Pill>}
                </div>
                <div style={{fontSize:11.5, color:'var(--muted)', display:'flex', alignItems:'center', gap:8}}>
                  <span style={{display:'flex', gap:4, color:'var(--ink-soft)'}}>{cc.channels.map((ch,j)=><ChannelIcon key={j} channel={ch} size={12}/>)}</span>
                  · {cc.clicks||0} clicks · {cc.leads||0} leads
                </div>
              </div>
              <Pill tone={cc.status==='live'?'green':cc.status==='scheduled'?'amber':'ghost'} size="sm">
                {cc.status==='live' && <StatusDot color="#3F7A4A" live size={6}/>}
                {cc.status}
              </Pill>
            </button>
          ))}
          <button onClick={()=>generate(selectedStrategy)} style={{
            display:'flex', width:'100%', padding:'18px', alignItems:'center', gap:10,
            borderTop:'1px solid var(--line-soft)', color:'var(--muted)', justifyContent:'center'
          }}>
            <Icon.Plus size={14}/> <span style={{fontSize:13}}>Generate new campaign from goal</span>
          </button>
        </Card>

        {/* Detail / generator */}
        <div style={{display:'flex', flexDirection:'column', gap:16}}>
          {/* Generator panel */}
          <Card>
            <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:14}}>
              <SectionLabel>One-click generator</SectionLabel>
              <Pill tone="pink" size="sm">{selectedStrategy.name}</Pill>
              {generating && <Pill tone="amber" size="sm"><StatusDot color="#B8842B" live size={6}/> Generating…</Pill>}
            </div>
            <div style={{display:'flex', gap:8, marginBottom:14, flexWrap:'wrap'}}>
              {CAMPAIGN_STRATEGIES.map((g,i)=>(
                <Pill key={g.id} tone={selectedStrategy.id===g.id?'solid':'ghost'} size="sm" onClick={()=>{setSelectedStrategy(g); generate(g);}}>{g.name}</Pill>
              ))}
            </div>
            <div style={{padding:18, borderRadius:10, background:'var(--bg-2)', border:'1px solid var(--line-soft)', minHeight:180}}>
              {generating ? (
                <div style={{display:'flex', flexDirection:'column', gap:10}}>
                  <div className="shimmer" style={{height:14, borderRadius:4, background:'#00000010'}}/>
                  <div className="shimmer" style={{height:14, borderRadius:4, background:'#00000010', width:'82%'}}/>
                  <div className="shimmer" style={{height:14, borderRadius:4, background:'#00000010', width:'68%'}}/>
                  <div className="shimmer" style={{height:80, borderRadius:8, marginTop:8, background:'#00000010'}}/>
                </div>
              ) : genResult ? (
                <div className="fade-up">
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                    <div style={{fontSize:12, color:'var(--muted)'}}>{genResult.title}</div>
                    <div style={{display:'flex', gap:6, color:'var(--muted)'}}>{genResult.channels.map((ch,i)=><ChannelIcon key={i} channel={ch} size={13}/>)}</div>
                  </div>
                  {genResult.strategy && <StrategyBreakdown strategy={genResult.strategy} compact/>}
                  <div style={{display:'flex', gap:14, marginTop:genResult.strategy?14:0}}>
                    <SocialPostArt size={120}/>
                    <div style={{flex:1, fontSize:13, color:'var(--ink-soft)', lineHeight:1.55, whiteSpace:'pre-wrap'}}>{genResult.post}</div>
                  </div>
                  <div style={{display:'flex', gap:6, marginTop:16}}>
                    {['Instagram','TikTok','LinkedIn'].map(t=>(
                      <Pill key={t} tone={genTab===t?'solid':'ghost'} size="sm" onClick={()=>setGenTab(t)}>{t}</Pill>
                    ))}
                  </div>
                  <PlatformPreview tab={genTab} post={genResult.post}/>
                  <div style={{display:'flex', gap:8, marginTop:14, flexWrap:'wrap'}}>
                    <Pill tone="solid" size="sm" onClick={()=>scheduleGenerated('scheduled')}>Schedule</Pill>
                    <Pill tone="ghost" size="sm" onClick={()=>setBoostOpen(o=>!o)}>Schedule + boost</Pill>
                    <Pill tone="ghost" size="sm" onClick={()=>generate(selectedStrategy)}>Regenerate</Pill>
                  </div>
                  {boostOpen && (
                    <BoostPanel
                      budget={budget} setBudget={setBudget}
                      duration={duration} setDuration={setDuration}
                      channels={channels} setChannels={setChannels}
                      onConfirm={()=>scheduleGenerated('live', true)}
                    />
                  )}
                </div>
              ) : (
                <div style={{fontSize:13, color:'var(--muted)', lineHeight:1.55}}>
                  Pick a strategy above — Atlas will write the copy in your voice, generate a brand-matched image, and prepare the right channel sequence.
                </div>
              )}
            </div>
          </Card>

          {/* Selected campaign detail */}
          {c && (
            <Card>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12}}>
                <div>
                  <SectionLabel style={{marginBottom:6}}>Campaign · {c.status}</SectionLabel>
                  <div className="serif" style={{fontSize:24}}>{c.name}</div>
                </div>
                {c.status==='live' && (
                  <div style={{textAlign:'right'}}>
                    <div className="serif" style={{fontSize:24}}>{c.clicks ? ((c.leads/c.clicks)*100).toFixed(1)+'%':'—'}</div>
                    <div style={{fontSize:10.5, color:'var(--muted)', letterSpacing:1}}>CLICK → LEAD</div>
                  </div>
                )}
              </div>
              <PerformanceChart key={active} campaign={c}/>
              <div style={{display:'flex', gap:18, marginBottom:18, paddingTop:8, borderTop:'1px solid var(--line-soft)', paddingTop:14}}>
                <div><div style={{fontSize:11, color:'var(--muted)'}}>Spend</div><div style={{fontSize:15, fontWeight:500}}>€{c.spend||0}</div></div>
                <div><div style={{fontSize:11, color:'var(--muted)'}}>Clicks</div><div style={{fontSize:15, fontWeight:500}}>{(c.clicks||0).toLocaleString()}</div></div>
                <div><div style={{fontSize:11, color:'var(--muted)'}}>Leads</div><div style={{fontSize:15, fontWeight:500}}>{c.leads||0}</div></div>
                <div><div style={{fontSize:11, color:'var(--muted)'}}>Channels</div><div style={{display:'flex', gap:5, marginTop:2}}>{c.channels.map((ch,i)=><ChannelIcon key={i} channel={ch} size={14}/>)}</div></div>
              </div>
              <div style={{padding:14, borderRadius:10, background:'var(--bg-2)', border:'1px solid var(--line-soft)', fontSize:13, lineHeight:1.6, color:'var(--ink-soft)', whiteSpace:'pre-wrap'}}>{c.post}</div>
              <div style={{display:'flex', gap:8, marginTop:14, flexWrap:'wrap'}}>
                {c.status==='live' && <Pill tone="ghost" size="sm" onClick={()=>{updateCampaign(active,{spend:(c.spend||0)+25}); onToast({message:'Boost increased to €25/day', sub:'Spend updated in this campaign'});}}>Increase boost</Pill>}
                {c.status==='scheduled' && <Pill tone="solid" size="sm" onClick={()=>{updateCampaign(active,{status:'live'}); onToast({message:'Published early', sub:'Live across '+c.channels.length+' channels'});}}>Publish now</Pill>}
                {c.status==='draft' && <Pill tone="solid" size="sm" onClick={()=>{updateCampaign(active,{status:'live'}); onToast({message:'Published', sub:'Live across '+c.channels.length+' channels'});}}>Approve & publish</Pill>}
                <Pill tone="ghost" size="sm" onClick={()=>{setCamps(list=>[{...c, name:c.name+' copy', status:'draft', spend:0, clicks:0, leads:0}, ...list]); setActive(0); onToast({message:'Campaign duplicated', sub:'Draft copy added to the top'});}}>Duplicate</Pill>
                <Pill tone="ghost" size="sm" onClick={()=>setAnalysisOpen(o=>!o)}>Why did this work?</Pill>
              </div>
              {analysisOpen && <CampaignAnalysis campaign={c} onSave={()=>onToast({message:'Atlas rules saved', sub:'Applied to future campaign drafts'})}/>}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function CampaignStrategySelector({scenario, selected, onSelect, onGenerate}){
  return (
    <Card style={{marginBottom:24, background:'linear-gradient(180deg,#FFFFFF 0%,#FAF7F0 100%)'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:16, marginBottom:16}}>
        <div>
          <SectionLabel style={{marginBottom:8}}>Campaign strategy selector</SectionLabel>
          <div className="serif" style={{fontSize:30, lineHeight:1.1}}>Choose the route before Atlas writes.</div>
        </div>
        <div className="desktop-only" style={{fontSize:12, color:'var(--muted)', lineHeight:1.5, maxWidth:310}}>
          Each strategy changes the copy, channels, budget, and what the campaign tries to prove for Still Water.
        </div>
      </div>
      <div className="stats-grid" style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12}}>
        {CAMPAIGN_STRATEGIES.map(strategy=>(
          <div key={strategy.id} role="button" tabIndex={0} onClick={()=>onSelect(strategy)} onKeyDown={e=>{if(e.key==='Enter') onSelect(strategy);}} style={{textAlign:'left', border:'1px solid '+(selected.id===strategy.id?'#E91E63':'var(--line)'), borderRadius:10, background:selected.id===strategy.id?'#FFF5F8':'#fff', padding:0, overflow:'hidden', boxShadow:selected.id===strategy.id?'0 14px 36px -28px #B51242':'none', cursor:'pointer'}}>
            <div style={{height:8, background:selected.id===strategy.id?'linear-gradient(90deg,#E91E63,#B51242)':'var(--bg-2)'}}/>
            <div style={{padding:16}}>
              <div style={{display:'flex', justifyContent:'space-between', gap:8, alignItems:'center', marginBottom:10}}>
                <div className="serif" style={{fontSize:23, lineHeight:1.05}}>{strategy.name}</div>
                {selected.id===strategy.id && <Icon.Check size={15}/>}
              </div>
              <div style={{fontSize:12.5, color:'var(--ink-soft)', lineHeight:1.45, minHeight:54}}>{strategy.promise}</div>
              <div style={{display:'flex', gap:5, color:'var(--muted)', margin:'12px 0'}}>
                {strategy.channels.map(ch=><ChannelIcon key={ch} channel={ch} size={13}/>)}
                <span className="mono" style={{fontSize:10, marginLeft:4}}>{strategy.budget}</span>
              </div>
              <div style={{fontSize:11.5, color:'var(--muted)', lineHeight:1.45, marginBottom:12}}>{strategy.look}</div>
              <Pill tone={selected.id===strategy.id?'pink':'ghost'} size="sm" onClick={(e)=>{e.stopPropagation(); onGenerate(strategy);}}>
                Generate this
              </Pill>
            </div>
          </div>
        ))}
      </div>
      <StrategyBreakdown strategy={selected}/>
    </Card>
  );
}

function StrategyBreakdown({strategy, compact=false}){
  return (
    <div className="fade-up" style={{marginTop:compact?0:16, padding:compact?12:14, border:'1px solid var(--line-soft)', borderRadius:10, background:compact?'#fff':'var(--bg-2)'}}>
      <div style={{display:'grid', gridTemplateColumns:compact?'1fr':'1fr 1fr 1fr', gap:compact?8:12}}>
        <div>
          <div className="mono" style={{fontSize:10, color:'var(--taupe-mid)', marginBottom:5}}>OBJECTIVE</div>
          <div style={{fontSize:13, lineHeight:1.4}}>{strategy.objective}</div>
        </div>
        <div>
          <div className="mono" style={{fontSize:10, color:'var(--taupe-mid)', marginBottom:5}}>BREAKDOWN</div>
          <div style={{fontSize:12.5, color:'var(--ink-soft)', lineHeight:1.45}}>{strategy.cadence.join(' → ')}</div>
        </div>
        <div>
          <div className="mono" style={{fontSize:10, color:'var(--taupe-mid)', marginBottom:5}}>FIT</div>
          <div style={{fontSize:12.5, color:'var(--ink-soft)', lineHeight:1.45}}>{strategy.fit}</div>
        </div>
      </div>
    </div>
  );
}

function CampaignAnalysis({campaign,onSave}){
  const reasons = campaign.clicks ? [
    'Precise instruction beats abstract inspiration for Maya’s audience.',
    'The story contains one concrete client outcome instead of a list of benefits.',
    'The CTA stays soft, which protects trust while still opening the booking path.'
  ] : [
    'This draft matches the strongest format in the voice profile.',
    'It keeps one sensory instruction in the first line.',
    'It makes a low-pressure offer instead of a hard close.'
  ];
  return (
    <div className="fade-up" style={{marginTop:14, padding:14, border:'1px solid var(--line)', borderRadius:10, background:'var(--bg-2)'}}>
      <SectionLabel style={{marginBottom:10}}>Atlas readout</SectionLabel>
      {reasons.map((r,i)=><div key={i} style={{display:'flex', gap:10, padding:'7px 0', fontSize:12.5, color:'var(--ink-soft)', lineHeight:1.45}}><Icon.Check size={12}/><span>{r}</span></div>)}
      <Pill tone="solid" size="sm" style={{marginTop:10}} onClick={onSave}>Save as voice rule</Pill>
    </div>
  );
}

function SocialPostArt({size=120, vertical=false}){
  return (
    <div className="social-art" style={{width:size, height:vertical?size*1.7:size, borderRadius:10, background:'linear-gradient(145deg,#78988E 0%,#B8A890 56%,#3F7A4A 100%)', flexShrink:0, position:'relative', overflow:'hidden', color:'#FAF7F0'}}>
      <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 20% 18%, #FFFFFF50, transparent 42%), radial-gradient(circle at 80% 80%, #1E1A1540, transparent 48%)'}}/>
      <div className="serif" style={{position:'absolute', left:size*.12, right:size*.12, top:vertical?size*.28:size*.18, fontSize:vertical?size*.2:size*.18, lineHeight:1.05, letterSpacing:'-.01em'}}>
        4 in.<br/>6 out.<br/>before the phone.
      </div>
      <div className="mono" style={{position:'absolute', left:size*.12, bottom:size*.11, fontSize:Math.max(8,size*.065), letterSpacing:1.8}}>STILL WATER</div>
    </div>
  );
}

function PlatformPreview({tab, post}){
  const short = post.split('\n')[0];
  if(tab==='TikTok'){
    return (
      <div className="fade-up" style={{marginTop:12, display:'flex', justifyContent:'center'}}>
        <div style={{width:170, aspectRatio:'9/16', borderRadius:18, background:'#111', padding:8, position:'relative', color:'#fff', overflow:'hidden'}}>
          <SocialPostArt size={154} vertical/>
          <div style={{position:'absolute', left:14, bottom:24, right:48, fontSize:10.5, lineHeight:1.35}}>
            <div style={{fontWeight:600, marginBottom:4}}>@maya.stillwater</div>
            <div>{short}</div>
          </div>
          <div style={{position:'absolute', right:14, bottom:34, display:'flex', flexDirection:'column', gap:10, alignItems:'center', fontSize:10}}>
            <Icon.Heart size={15}/><Icon.Comment size={15}/><Icon.Arrow size={15}/>
          </div>
        </div>
      </div>
    );
  }
  if(tab==='LinkedIn'){
    return (
      <div className="fade-up" style={{marginTop:12, border:'1px solid var(--line)', borderRadius:10, background:'#fff', padding:14}}>
        <div style={{display:'flex', gap:10, alignItems:'center', marginBottom:10}}>
          <Avatar gradient={BRAND.avatarGradient} size={32} initials="MC"/>
          <div><div style={{fontSize:12, fontWeight:600}}>Maya Chen</div><div style={{fontSize:10, color:'var(--muted)'}}>Founder · Still Water</div></div>
        </div>
        <div style={{fontSize:12.5, color:'var(--ink-soft)', lineHeight:1.5, marginBottom:10}}>{short}</div>
        <SocialPostArt size={190}/>
      </div>
    );
  }
  return (
    <div className="fade-up" style={{marginTop:12, display:'grid', gridTemplateColumns:'150px 1fr', gap:12, alignItems:'center'}}>
      <div style={{border:'1px solid var(--line)', borderRadius:10, overflow:'hidden', background:'#fff'}}>
        <SocialPostArt size={148}/>
        <div style={{padding:'8px 10px', display:'flex', gap:10, color:'var(--ink-soft)'}}><Icon.Heart size={13}/><Icon.Comment size={13}/><Icon.Send size={13}/></div>
      </div>
      <div style={{fontSize:12, color:'var(--muted)', lineHeight:1.5}}>Square feed post with saved-image energy. Atlas keeps the CTA soft and lets the instruction carry the post.</div>
    </div>
  );
}

function BoostPanel({budget,setBudget,duration,setDuration,channels,setChannels,onConfirm}){
  const custom = budget==='custom';
  const selectedCount = Object.values(channels).filter(Boolean).length || 1;
  const base = budget==='€5'?700:budget==='€25'?5200:custom?2400:3400;
  const reach = `Est. ${Math.round(base*.35*selectedCount).toLocaleString()}–${Math.round(base*selectedCount).toLocaleString()} people`;
  return (
    <div className="fade-up" style={{marginTop:14, padding:14, border:'1px solid var(--line)', borderRadius:10, background:'#fff'}}>
      <SectionLabel style={{marginBottom:10}}>Boost settings</SectionLabel>
      <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:10}}>
        {['€5','€15','€25','custom'].map(b=><Pill key={b} tone={budget===b?'solid':'ghost'} size="sm" onClick={()=>setBudget(b)}>{b}</Pill>)}
      </div>
      <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:10}}>
        {['24h','3 days','7 days'].map(d=><Pill key={d} tone={duration===d?'solid':'ghost'} size="sm" onClick={()=>setDuration(d)}>{d}</Pill>)}
      </div>
      <div style={{display:'flex', gap:8, flexWrap:'wrap', marginBottom:12}}>
        {Object.keys(channels).map(ch=>(
          <Pill key={ch} tone={channels[ch]?'green':'ghost'} size="sm" onClick={()=>setChannels({...channels,[ch]:!channels[ch]})}>
            <StatusDot color={channels[ch]?'#3F7A4A':'#B8A890'} size={6}/> {ch}
          </Pill>
        ))}
      </div>
      <div style={{fontSize:12, color:'var(--ink-soft)', marginBottom:12}}>{reach}</div>
      <Pill tone="solid" size="sm" onClick={onConfirm}>Confirm boost</Pill>
    </div>
  );
}

function PerformanceChart({campaign}){
  const clicks = performanceSeries(campaign.clicks || 0);
  const leads = performanceSeries(campaign.leads || 0);
  const path = (arr)=>{
    const max = Math.max(...clicks, ...leads, 1);
    return arr.map((v,i)=>{
      const x = 12 + i*44;
      const y = 86 - (v/max)*62;
      return `${i?'L':'M'}${x} ${y}`;
    }).join(' ');
  };
  return (
    <div style={{margin:'4px 0 16px', padding:14, border:'1px solid var(--line-soft)', borderRadius:10, background:'var(--bg-2)'}}>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}>
        <SectionLabel>7-day performance</SectionLabel>
        <div style={{display:'flex', gap:12, fontSize:10.5, color:'var(--muted)'}}>
          <span><StatusDot color="#3F7A4A" size={6}/> Clicks</span>
          <span><StatusDot color="#B8842B" size={6}/> Leads</span>
        </div>
      </div>
      <svg viewBox="0 0 292 96" width="100%" height="116" preserveAspectRatio="none">
        {[0,1,2].map(i=><path key={i} d={`M10 ${28+i*24}H282`} stroke="#E0D6CC" strokeWidth="1"/>)}
        <path className="chart-line" d={path(clicks)} fill="none" stroke="#3F7A4A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path className="chart-line" d={path(leads)} fill="none" stroke="#B8842B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{animationDelay:'.12s'}}/>
      </svg>
    </div>
  );
}

function performanceSeries(total){
  if(!total) return [0,0,0,0,0,0,0];
  const weights = [0.04,0.08,0.1,0.12,0.18,0.22,0.26];
  return weights.map(w=>Math.max(0, Math.round(total*w)));
}

window.CampaignsPage = CampaignsPage;
