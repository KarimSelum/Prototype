// Atlas — daily brief dashboard + multi-turn chat
const { useState: useStateAtlas, useEffect: useEffectAtlas, useRef: useRefAtlas } = React;

function AtlasPage({ scenario, scenarioData, onToast, onNav, atlasCommand, onAtlasCommandHandled }){
  const brief = ATLAS_BRIEFS[scenario.id];
  const [chatOpen, setChatOpen] = useStateAtlas(false);
  const [seed, setSeed] = useStateAtlas(null); // seeded user message
  const [afterChatNav, setAfterChatNav] = useStateAtlas(null);
  const handledCommand = useRefAtlas(null);

  const actionNav = {
    'Review the launch post':'campaigns',
    'See the 3 new drafts':'campaigns',
    'Open Thursday mornings':'bookings'
  };
  const startChat = (msg) => { setAfterChatNav(actionNav[msg] || null); setSeed(msg); setChatOpen(true); };
  const closeChat = () => {
    setChatOpen(false); setSeed(null);
    if(afterChatNav){ setTimeout(()=>onNav(afterChatNav), 120); setAfterChatNav(null); }
  };

  useEffectAtlas(()=>{
    if(atlasCommand && atlasCommand.id !== handledCommand.current){
      handledCommand.current = atlasCommand.id;
      setSeed(atlasCommand.seed || null);
      setAfterChatNav(null);
      setChatOpen(true);
      onAtlasCommandHandled && onAtlasCommandHandled(atlasCommand.id);
    }
  },[atlasCommand]);

  return (
    <div className="os-page atlas-page" style={{padding:'32px 40px 60px', maxWidth:1200, margin:'0 auto'}}>
      {/* Header */}
      <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:24}}>
        <div>
          <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:6}}>
            <StatusDot color="#3F7A4A" live/>
            <SectionLabel>Atlas · daily brief · {new Date().toLocaleDateString('en-GB',{weekday:'long', day:'numeric', month:'long'})}</SectionLabel>
          </div>
          <h1 className="serif" style={{fontSize:44, lineHeight:1.05, margin:0, letterSpacing:'-.015em'}}>
            Good morning, Maya.
          </h1>
        </div>
        <div style={{display:'flex', gap:8}}>
          <Pill tone="ghost" size="md" onClick={()=>onToast({message:'Brief shared with your cohort space'})}>Share brief</Pill>
          <Pill tone="solid" size="md" onClick={()=>setChatOpen(true)}><Icon.Sparkle size={12}/> Ask Atlas</Pill>
        </div>
      </div>

      {/* Top brief card */}
      <Card pad={0} style={{overflow:'hidden', marginBottom:24}} className="fade-up">
        <div className="card-stack" style={{display:'grid', gridTemplateColumns:'1fr 320px'}}>
          <div style={{padding:'28px 32px', borderRight:'1px solid var(--line)'}}>
            <SectionLabel style={{marginBottom:14}}>The one thing</SectionLabel>
            <div className="serif" style={{fontSize:32, lineHeight:1.15, margin:'0 0 14px', letterSpacing:'-.01em'}}>
              <Typewriter text={brief.headline} speed={20}/>
            </div>
            <p style={{fontSize:14.5, lineHeight:1.6, color:'var(--ink-soft)', margin:'0 0 22px'}}>{brief.body}</p>
            <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
              {brief.actions.map((a,i)=>(
                <Pill key={i} tone={i===0?'solid':'outline'} size="md" onClick={()=>startChat(a)}>
                  {i===0 && <Icon.Bolt size={12}/>} {a}
                </Pill>
              ))}
            </div>
          </div>
          <div style={{padding:'24px 26px', background:'var(--ivory)'}}>
            <SectionLabel style={{marginBottom:14}}>Weather</SectionLabel>
            <div style={{fontSize:14, color:'var(--ink)', marginBottom:18, lineHeight:1.5}}>{brief.weather}</div>
            <SectionLabel style={{marginBottom:10}}>While you slept</SectionLabel>
            {brief.overnight.map((o,i)=>(
              <div key={i} className="fade-up" style={{padding:'10px 0', borderBottom: i<brief.overnight.length-1 ? '1px solid var(--line)' : 'none', animationDelay:`${50+i*50}ms`}}>
                <div style={{fontSize:12.5, color:'var(--ink)', fontWeight:500, marginBottom:2}}>{o.t}</div>
                <div style={{fontSize:11.5, color:'var(--muted)', lineHeight:1.4}}>{o.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Stats row */}
      <div className="stats-grid" style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24}}>
        <StatTile label="Bookings this week" metric="bookings" scenarioId={scenario.id} value={scenarioData.bookings} delta={scenario.id==='day60'?'+9 vs last week':scenario.id==='day21'?'+6 vs last week':'—'} onClick={()=>onNav('bookings')}/>
        <StatTile label="Revenue (week)" metric="revenue" scenarioId={scenario.id} value={`€${scenarioData.revenueWeek.toLocaleString()}`} delta={scenario.id==='day60'?'+34% MoM':scenario.id==='day21'?'first revenue':'—'} onClick={()=>onNav('bookings')}/>
        <StatTile label="Site visitors" metric="visitors" scenarioId={scenario.id} value={scenarioData.siteVisitors.toLocaleString()} delta={scenario.id==='day60'?'2,140 / week':scenario.id==='day21'?'412 / week':'38 since launch'} onClick={()=>onNav('site')}/>
        <StatTile label="Campaigns live" metric="campaigns" scenarioId={scenario.id} value={scenarioData.campaignsLive} delta={`${scenarioData.postsScheduled} scheduled`} onClick={()=>onNav('campaigns')}/>
      </div>

      {/* Two columns: funnel + cohort signal */}
      <div className="atlas-grid" style={{display:'grid', gridTemplateColumns:'7fr 5fr', gap:16, marginBottom:24}}>
        <Card>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18}}>
            <SectionLabel>This week's funnel</SectionLabel>
            <div className="mono" style={{fontSize:10, color:'var(--muted)'}}>SOURCE: ALL CHANNELS</div>
          </div>
          <Funnel key={scenario.id} data={scenarioData.funnel}/>
        </Card>
        <Card>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18}}>
            <SectionLabel>Cohort signal</SectionLabel>
            <span style={{fontSize:11, color:'var(--muted)'}}>March '26 · 38 founders</span>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:12}}>
            {[
              {who:'Yui Tanaka', what:'Shipped first sale.', when:'12m ago', g:'linear-gradient(140deg,#F3E0D6,#C8857A)'},
              {who:'Diego Souza', what:'Asked about your booking setup.', when:'1h ago', g:'linear-gradient(140deg,#D9E2EE,#5B7AA1)'},
              {who:'Aïsha Bakkali', what:'Liked your post on slow growth.', when:'3h ago', g:'linear-gradient(140deg,#F1DCC9,#A37550)'},
            ].map((s,i)=>(
              <div key={i} style={{display:'flex', gap:12, alignItems:'center', padding:'6px 0'}}>
                <Avatar gradient={s.g} size={32}/>
                <div style={{flex:1, fontSize:13, lineHeight:1.4}}>
                  <div><span style={{fontWeight:500}}>{s.who}</span> <span style={{color:'var(--muted)'}}>· {s.what}</span></div>
                  <div style={{fontSize:11, color:'var(--muted)'}}>{s.when}</div>
                </div>
              </div>
            ))}
            <Pill tone="ghost" size="sm" onClick={()=>onNav('network')} style={{alignSelf:'flex-start', marginTop:6}}>Open feed <Icon.Arrow size={12}/></Pill>
          </div>
        </Card>
      </div>

      {/* Try-Atlas prompts */}
      <Card>
        <SectionLabel style={{marginBottom:14}}>Try Atlas — set prompts</SectionLabel>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10}}>
          {[
            'What should I focus on today?',
            'Why did the morning anchor post work?',
            'Draft an October retreat announcement',
            'Who in my cohort should I talk to this week?',
            'Show me my best converting traffic source',
            'Write a follow-up to people who booked an intro but didn\'t rebook'
          ].map((p,i)=>(
            <button key={i} onClick={()=>startChat(p)} style={{
              textAlign:'left', padding:'14px 16px', borderRadius:10,
              border:'1px solid var(--line)', background:'var(--bg-2)', color:'var(--ink-soft)',
              fontSize:13, lineHeight:1.4, transition:'all .12s'
            }}
            onMouseEnter={e=>{e.currentTarget.style.background='#fff'; e.currentTarget.style.borderColor='var(--ink)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='var(--bg-2)'; e.currentTarget.style.borderColor='var(--line)'}}>
              <Icon.Sparkle size={11}/> &nbsp;{p}
            </button>
          ))}
        </div>
      </Card>

      {chatOpen && <AtlasChatModal scenario={scenario} seed={seed} onClose={closeChat} onNav={onNav} onToast={onToast}/>}
    </div>
  );
}

function StatTile({label, value, delta, onClick, metric, scenarioId}){
  return (
    <Card pad={18} onClick={onClick} hover style={{animationDelay:'50ms'}} >
      <div style={{fontSize:11, color:'var(--muted)', marginBottom:6, letterSpacing:.3}}>{label}</div>
      <div className="serif" style={{fontSize:32, lineHeight:1, marginBottom:6, letterSpacing:'-.01em'}}>{value}</div>
      <div style={{fontSize:11, color:'var(--ink-soft)', display:'flex', alignItems:'center', gap:4}}>
        {delta !== '—' && delta.includes('+') && <Icon.Trend size={11}/>}
        {delta}
      </div>
      <Sparkline metric={metric} scenarioId={scenarioId}/>
    </Card>
  );
}

function sparkData(metric, scenarioId){
  const flat = [0,0,0,0,0,0,0];
  const day21 = {
    bookings:[0,0,1,0,1,2,2], revenue:[0,0,140,0,140,280,280], visitors:[22,34,46,52,74,88,96], campaigns:[1,1,2,2,2,3,3]
  };
  const day60 = {
    bookings:[7,8,9,11,12,13,14], revenue:[820,940,1040,1280,1420,1640,1820], visitors:[220,260,290,340,360,420,470], campaigns:[4,5,5,6,6,7,7]
  };
  if(scenarioId==='day3') return flat;
  return (scenarioId==='day60'?day60:day21)[metric] || flat;
}

function Sparkline({metric, scenarioId}){
  const data = sparkData(metric, scenarioId);
  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const points = data.map((v,i)=>{
    const x = 4 + i*(92/(data.length-1));
    const y = 24 - ((v-min)/Math.max(1,max-min))*18;
    return [x,y];
  });
  const d = points.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const positive = data[data.length-1] > data[0];
  return (
    <svg className="sparkline" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
      <path d="M4 25 H96" stroke="#E0D6CC" strokeWidth="1"/>
      <path d={d} fill="none" stroke={positive?'#3F7A4A':'#B8A890'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={points[points.length-1][0]} cy={points[points.length-1][1]} r="2" fill={positive?'#3F7A4A':'#B8A890'}/>
    </svg>
  );
}

function Funnel({data}){
  const [active,setActive] = useStateAtlas(false);
  useEffectAtlas(()=>{ const t=setTimeout(()=>setActive(true),40); return ()=>clearTimeout(t); },[]);
  const max = Math.max(...data, 1);
  const labels = ['Visitors', 'Intro clicks', 'Leads', 'Bookings'];
  const colors = ['#B8A890', '#8F8273', '#5A4E3F', '#1E1A15'];
  return (
    <div>
      {data.map((v,i)=>(
        <div key={i} style={{display:'flex', alignItems:'center', gap:14, marginBottom:10}}>
          <div style={{width:80, fontSize:12, color:'var(--ink-soft)'}}>{labels[i]}</div>
          <div style={{flex:1, height:18, background:'var(--ivory)', borderRadius:3, overflow:'hidden', position:'relative'}}>
            <div style={{height:'100%', width: active?`${(v/max)*100}%`:'0%', background:colors[i], borderRadius:3, transition:`width .6s ease-out ${i*80}ms`}}/>
          </div>
          <div className="mono" style={{width:60, textAlign:'right', fontSize:12, color:'var(--ink)'}}>{v.toLocaleString()}</div>
        </div>
      ))}
      {data[0]>0 && (
        <div style={{marginTop:14, fontSize:12, color:'var(--muted)', paddingTop:12, borderTop:'1px solid var(--line-soft)'}}>
          <span style={{color:'var(--ink)'}}><CountUp value={(data[3]/data[0])*100} decimals={1} suffix="%"/></span> visitor → booking · <span style={{color:'var(--ink)'}}><CountUp value={(data[3]/Math.max(data[2],1))*100} suffix="%"/></span> lead → booking
        </div>
      )}
    </div>
  );
}

function CountUp({value, decimals=0, suffix=''}){
  const [n,setN] = useStateAtlas(0);
  useEffectAtlas(()=>{
    let frame = 0;
    const total = 24;
    const tick = ()=>{
      frame += 1;
      setN(value * Math.min(1, frame/total));
      if(frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },[value]);
  return <>{n.toFixed(decimals)}{suffix}</>;
}

// ─── Chat modal ────────────────────────────────────────────────────────
const ATLAS_REPLIES = {
  'Review the launch post': {
    text:"Here's the draft. I kept it in your voice — quiet, embodied, not pitchy. No emoji except the wave, since that's the only one you've used on your account before.\n\nReady when you are. I'll schedule for 8:30am tomorrow when 62% of your IG audience is most active.",
    chip:{kind:'post', title:'Launch post · Instagram + LinkedIn', channels:['ig','li']},
    follow:['Schedule it', 'Tweak the opening', 'Show me 3 alternatives']
  },
  'Tell me about your first 10 clients (so I can target)': {
    text:"Good. Two questions to start: (1) what brought them to you — referral, IG, search, an event? (2) what were they bracing for when they first walked in?\n\nI'll turn the patterns into 3 audience definitions you can boost against, and 5 post hooks each. Estimated time once you reply: 6 minutes.",
    chip:null, follow:['Mostly Instagram + word-of-mouth', 'Skip — just guess from my site', 'Show me audience examples']
  },
  'Draft 5 more posts for this week': {
    text:"Done. 5 drafts, sequenced from least to most direct — the way that fits your account's existing rhythm.\n\nTuesday and Thursday mornings will outperform; I've front-loaded the strongest hooks there.",
    chip:{kind:'list', title:'5 drafts ready for review', items:['Mon · "What I mean by somatic"','Tue · "4-minute morning anchor"','Wed · Client quote (Lena, with permission)','Thu · "Why I stopped saying mindfulness"','Sat · Retreat teaser (Sintra)']},
    follow:['Schedule all 5', 'Show me Tuesday\'s draft', 'Swap Wednesday for something else']
  },
  'See the 3 new drafts': {
    text:"All three follow the format that converted yesterday: a precise instruction, then a small story, then a soft offer. Median read-time predicted: 11 seconds. I think the second one will outperform.\n\nWant me to boost the strongest for €15 once we have 6 hours of organic data?",
    chip:{kind:'list', title:'3 drafts in winning format', items:['"3-breath reset before a hard email"', '"What your jaw is doing right now"', '"The cue I give first-timers"']},
    follow:['Yes, boost the winner after 6h', 'Just schedule, no boost', 'Make them more direct']
  },
  'Why did this post work?': {
    text:"Three reasons, ranked by signal strength:\n\n1. The hook is a precise instruction (\"two hands on your ribcage\") — your audience saves instructional posts at 4× the rate of inspirational ones.\n2. The proof point is a single specific client outcome, not a list of benefits.\n3. The CTA is soft (\"if you want the longer version\") — your audience responds 2.3× better to soft CTAs than to direct \"book now.\"\n\nI've added these as rules to your voice profile.",
    chip:null, follow:['Apply this template to my next 5 posts', 'Show me posts that broke these rules', 'What\'s rule #4?']
  },
  'Schedule the winning format daily': {
    text:"Set. One post per weekday at 8:30am Lisbon time, alternating IG → TikTok → LinkedIn. I'll auto-generate drafts the day before and notify you at 7pm to review. Anything I publish without your review will be soft-boost only (max €5/day).\n\nYou can pause this anytime.",
    chip:{kind:'confirm', title:'Daily campaign · live'},
    follow:['Sounds good', 'Make me approve every post', 'Add Thursdays at 6pm too']
  },
  'Open Thursday mornings': {
    text:"Opening Thursdays 09:00–12:00, three 60-minute slots. Booking link updated. I'll run the winning ad creative at €25/day starting tonight and pause it when the slots are full.\n\nProjected fill: 6–9 new bookings by Sunday based on last week's conversion rate.",
    chip:{kind:'confirm', title:'Thursday mornings opened · ad live'},
    follow:['Show me the ad', 'What if it overfills?', 'Open Saturdays too']
  },
  'Show me the cohort waitlist': {
    text:"4 people on the retreat waitlist (October · Sintra). Two already paid the €200 deposit. I drafted a personal note to each — \"thank you, here's what to expect, here's the dossier.\" Want to review or just send?",
    chip:{kind:'list', title:'October waitlist', items:['Marta L. · paid deposit', 'Sofia P. · paid deposit', 'Henrique R. · waiting', 'Beatriz N. · waiting']},
    follow:['Send the drafts as-is', 'Show me Marta\'s draft', 'Add 2 more spots if I can']
  },
  'Plan the October retreat campaign': {
    text:"I'd run this in three waves, each with a different angle:\n\n• Wave 1 (now): waitlist signal — soft posts on IG/LinkedIn, no spend. Goal: confirm 2 remaining spots.\n• Wave 2 (in 2 weeks): the experience — TikTok video of the location, IG carousel of the day-by-day.\n• Wave 3 (final week): the people — short clips from past attendees with their permission.\n\nTotal budget: €180 across 3 weeks. Projected: full retreat + 8-person waitlist for next.",
    chip:{kind:'list', title:'3-wave plan ready', items:['Wave 1 · 4 drafts ready','Wave 2 · script + shot list','Wave 3 · pending past-attendee permission']},
    follow:['Approve the plan', 'Cheaper version?', 'Skip wave 2']
  },
  'What should I focus on today?':{
    text:"One thing: respond to Lena's DM. She booked a 1:1 on Tuesday and asked a question that signals she's ready for the 4-session package (€520, your highest-LTV product). Reply within 4 hours and she converts at 78% based on similar threads on your account.\n\nI've drafted a reply in your voice — review and send.",
    chip:{kind:'post', title:'DM reply · Lena Ribeiro', channels:['ig']},
    follow:['Send the draft', 'What\'s the package landing page?', 'What else can wait?']
  },
  'Why did the morning anchor post work?':{
    text:"Same three reasons as before — precise instruction, single specific outcome, soft CTA. New this time: it landed on a Sunday evening when your audience is 1.4× more likely to engage with \"start the week\" content.\n\nI've scheduled v3 for Sunday at 7:15pm.",
    chip:null, follow:['Show v3', 'What time on weekdays?', 'Apply to LinkedIn too']
  },
  'Draft an October retreat announcement':{
    text:"Two spots left. Here's a soft-signal draft for IG that doesn't feel like a fire-sale — just an honest update.\n\nI'd avoid posting it on Friday (your retreat audience overlaps with your weekend-traveler audience and Friday underperforms for this segment).",
    chip:{kind:'post', title:'October retreat · 2 spots left', channels:['ig','li']},
    follow:['Schedule for Tuesday', 'Make it more urgent', 'Pair it with a video']
  },
  'Who in my cohort should I talk to this week?':{
    text:"Three founders worth a 20-minute call:\n\n• Aïsha (skincare, Marrakech) — same stage, asked her audience the same \"what brought you in\" question last week. Her data will sharpen yours.\n• Yui (ceramics, Tokyo) — first sale yesterday. She's in the moment you were in 5 weeks ago. Pay it forward.\n• Diego (running coach) — DM\'d about your booking setup. Worth 10 minutes; he'll send 2 referrals over the next 60 days based on cohort patterns.",
    chip:{kind:'list', title:'3 intros suggested', items:['Aïsha · skincare · Marrakech','Yui · ceramics · Tokyo','Diego · running coach · São Paulo']},
    follow:['Intro me to Aïsha', 'Open the cohort feed', 'Pick a slower week']
  },
  'Show me my best converting traffic source':{
    text:"Instagram bio link → booking page is your #1 source: 412 clicks, 18 bookings, 4.3% conversion. That's 2.7× higher than the cohort median for your niche.\n\nTikTok is #2 by volume (240 clicks) but #3 by conversion (1.2%). Worth tightening the bio-to-landing-page handoff before pushing more TikTok spend.",
    chip:null, follow:['Audit the TikTok handoff', 'Show me the IG bio', 'What\'s a good cohort median?']
  },
  'Write a follow-up to people who booked an intro but didn\'t rebook':{
    text:"3 people fit. Different reasons, different drafts:\n\n• Sofia P. — booked, no-showed. Draft: gentle nudge with rescheduling link, no shame.\n• Henrique R. — booked, came, didn't rebook in 14 days. Draft: \"how did the post-session week feel?\" — opens with their words from intake.\n• Beatriz N. — booked, came, said yes-then-ghosted on package. Draft: surface the friction directly.",
    chip:{kind:'list', title:'3 follow-ups drafted', items:['Sofia P. · gentle reschedule','Henrique R. · check-in','Beatriz N. · friction surface']},
    follow:['Send all 3', 'Show me Beatriz\'s', 'Skip Sofia']
  }
};

const DEFAULT_REPLY = {
  text:"I read the shape of this. The useful move is small: name the exact next action, keep the offer quiet, and avoid making the business feel louder than your work.\n\nI can turn this into copy, a booking change, or a founder note.",
  follow:['What should I focus on today?','Why did the morning anchor post work?','Show me my best converting traffic source']
};

function getLocalAtlasReply(message, scenario, contextLabel){
  if(ATLAS_REPLIES[message]) return ATLAS_REPLIES[message];
  const text = message.toLowerCase();
  const stage = scenario.id==='day3' ? 'launch week' : scenario.id==='day21' ? 'first-customer stage' : 'growth stage';
  const reply = (body, follow=DEFAULT_REPLY.follow, chip=null)=>({text:body, follow, chip});
  const done = (body, title='Atlas action ready')=>reply(body, ['Show me the reasoning', 'Make it gentler', 'Open the right page'], {kind:'confirm', title});

  const exact = {
    'Explain the one thing in plain English': reply(`The one thing means: do not add more surface area today. In ${stage}, the highest-leverage move is to make the next customer action clearer.\n\nFor Still Water, that usually means one of three things: tighten the booking CTA, follow up with the warmest lead, or boost the campaign that already has proof. Everything else can wait until the signal is cleaner.`, ['Turn this into a 3-step plan','What else can wait?','Open the right page']),
    'What changed since yesterday?': reply(`Three things changed.\n\n1. The booking page got warmer traffic from Instagram.\n2. The campaign with a precise body cue outperformed the softer brand post.\n3. Your cohort activity shifted from encouragement to practical questions, especially around booking setup.\n\nThat means the business is moving from explanation to conversion.`, ['What should I focus on today?','Show me my best converting traffic source','Draft the next best action for me']),
    'Turn this brief into a 3-step plan': reply(`Today’s plan:\n\n1. Reply to the warmest lead first, before creating anything new.\n2. Publish one post that uses the winning format: precise instruction, small proof, soft CTA.\n3. Check the booking page CTA after lunch and remove one sentence if it feels like over-explaining.\n\nThat is enough movement for today.`, ['Draft the post','What should I remove from the site?','Who needs a follow-up?']),
    'Which campaign strategy fits this week?': reply(`Use “Book this week.”\n\nYou already have enough trust signals for the current audience; the constraint is action. The best campaign is a calm conversion sequence: proof post, booking reminder, soft scarcity.\n\nI would not start with “Find new audience” until the booking CTA is converting cleanly.`, ['Generate the booking campaign','What should I boost with €15?','Why not find new audience?']),
    'What should I boost with €15?': reply(`Boost the post with the clearest instruction, not the prettiest visual.\n\nFor Still Water, that is the morning anchor angle: one tiny practice, one client outcome, one soft invitation. Spend €15/day for 3 days on Instagram and Facebook, then pause if booking-page clicks stay below 3%.`, ['Show me the ad','Just schedule, no boost','Which audience should I target?']),
    'Why did this post convert?': ATLAS_REPLIES['Why did this post work?'],
    'Draft a campaign for launch week': reply(`Launch-week campaign: “Start with one small practice.”\n\nPost 1 teaches the 4-minute morning anchor. Post 2 explains who the first session is for. Post 3 invites a 15-minute intro call.\n\nKeep spend light: €10–15/day, only after the first post proves saves or replies.`, ['Generate this campaign','Make it more direct','Use the trust-first strategy']),
    'Draft a campaign for first customers': reply(`First-customer campaign: “People like you are already booking.”\n\nLead with proof, then reduce uncertainty: what happens in a session, what the first 15 minutes feel like, and how payment works. This should point to the 4-session package only after someone has clicked the booking page.`, ['Generate this campaign','Show me proof angles','Add package CTA']),
    'Draft a campaign for the growth month': reply(`Growth-month campaign: “Make the offer repeatable.”\n\nI’d run two tracks: a retargeting campaign for people who visited booking but did not book, and a cohort/retreat campaign for people engaging with longer-form content. Budget: €25/day for retargeting, €15/day for retreat signal.`, ['Generate this campaign','Cheaper version?','Plan the October retreat campaign']),
    'What should I change on the hero?': reply(`Make the hero more concrete.\n\nCurrent feeling: beautiful, but slightly abstract. Stronger version: “Stop bracing. Start breathing. 1:1 somatic sessions in Lisbon.”\n\nThen keep the supporting copy quiet and specific. One primary CTA: “Book a 15-minute intro.”`, ['Apply this hero','Make it softer','What section should I add next?']),
    'How can I make the booking CTA clearer?': reply(`Use one verb and one expectation.\n\nBest CTA: “Book a 15-minute intro.” Supporting line: “We’ll decide together if 1:1 work fits.”\n\nAvoid “learn more” here. It lets ready people drift instead of choosing a low-pressure next step.`, ['Apply this CTA','What should the intro page say?','What would reduce no-shows?']),
    'Write a stronger SEO title': reply(`Use: “Still Water · Somatic Therapy & Breathwork in Lisbon.”\n\nIt keeps the brand, includes the search terms people actually use, and does not over-promise. Meta description: “Quiet 1:1 somatic and breathwork sessions in Lisbon with Maya Chen. Start with a 15-minute intro call.”`, ['Update SEO','Write a meta description','What section should I add next?']),
    'What section should I add next?': reply(`Add “What to expect in a first session.”\n\nThis page does not need more brand feeling. It needs to lower uncertainty. Use three steps: arrive slowly, map what your body is doing, leave with one usable cue.`, ['Draft that section','Make it more direct','What should I remove from the site?']),
    'Where are my open slots this week?': reply(`The best slots to open are Thursday 09:00–12:00.\n\nYour audience books calm, morning appointments more reliably than late afternoon. I would open three 60-minute slots and let Atlas pause the campaign once two are filled.`, ['Open Thursday mornings','What if it overfills?','Should I add Saturday?']),
    'What would reduce no-shows?': reply(`Two changes will reduce no-shows fastest:\n\n1. Add a small deposit for paid sessions and credit it forward.\n2. Send a reminder 24 hours before with one sentence: “No need to prepare; arrive as you are.”\n\nThat keeps the boundary clear without making the experience feel clinical.`, ['Enable reminders','Add a deposit','Draft the reminder']),
    'Who should I follow up with?': reply(`Follow up with Lena first, then Henrique.\n\nLena is warm because she asked about the package after booking. Henrique is worth a softer check-in because he attended but did not rebook. Skip cold leads today; the warm replies are more valuable.`, ['Send the draft','Show me Beatriz\'s','What else can wait?']),
    'Should I add a package offer?': reply(`Yes, but place it after the first session, not before.\n\nThe 4-session package is your strongest LTV product, but showing it too early makes the first step feel heavier. Mention it in follow-up copy once someone has booked or attended an intro.`, ['Draft package follow-up','What\'s the package landing page?','Add package CTA']),
    'Who should I talk to this week?': ATLAS_REPLIES['Who in my cohort should I talk to this week?'],
    'Draft a post for my cohort': reply(`Draft:\n\nSmall win from this week: I made the booking page less persuasive and more precise. Fewer promises, one clearer next step.\n\nThe surprising part: it made the offer feel safer, not smaller. Curious if anyone else has seen clarity beat explanation on their page.`, ['Post this','Make it more vulnerable','Find people with similar booking problems']),
    'Find people with similar booking problems': reply(`Three useful matches:\n\nAïsha is solving “warm interest, slow bookings.” Diego is solving calendar setup and no-shows. Sara is testing deposits for a service business.\n\nStart with Diego because the exchange is most concrete: booking page structure for referral language.`, ['Intro me to Diego','Write a warm intro message','Open the cohort feed']),
    'Write a warm intro message': reply(`Draft:\n\n“Hey Diego — saw your note about booking setup. I’m working through the same thing at Still Water. Happy to compare what’s working: my cleanest signal so far is making the first step smaller, not louder. Want to trade notes for 15 minutes this week?”`, ['Send it','Make it shorter','Open the cohort feed']),
    'Draft a reply to Aïsha': reply(`Draft:\n\n“Thank you, Aïsha. The slow growth post came from me trying to stop turning every signal into a sprint. I’d love to hear what’s been working in your skincare funnel too, especially around the first booking step.”`, ['Send the draft','Make it warmer','Summarize my open conversations']),
    'Summarize my open conversations': reply(`Open conversations:\n\nAïsha is warm and reflective; good for a peer exchange. Diego is practical; respond with booking setup details. Atlas has three intro suggestions waiting.\n\nNothing here needs urgency except Diego if you want the referral upside.`, ['Draft a reply to Aïsha','Write an intro message in my voice','Who needs a follow-up?']),
    'Who needs a follow-up?': reply(`Two people: Diego and Lena.\n\nDiego asked about booking setup, which can become a useful founder relationship. Lena has buyer intent around the 4-session package. Reply to Lena first if you want revenue; Diego first if you want network leverage.`, ['Send the draft','Draft a reply to Aïsha','What else can wait?']),
    'Write an intro message in my voice': reply(`Draft:\n\n“Hi Aïsha — Atlas noticed we’re both working through the same quiet middle: people understand the work, but the first booking step still needs trust. I’d love to compare notes for 20 minutes if that would be useful.”`, ['Send it','Make it more casual','Intro me to Aïsha']),
    'What does Atlas know about my voice?': reply(`Your voice profile is: quiet, specific, embodied, low-pressure.\n\nStrong patterns: precise physical cues, one concrete client story, soft invitations. Weak patterns: abstract wellness language, stacked benefits, urgency that feels louder than the work.`, ['What memory should I add?','Apply this template to my next 5 posts','Show me posts that broke these rules']),
    'What should I connect next?': reply(`Connect WhatsApp Business next.\n\nFor Still Water, booking questions are intimate and often happen in DMs. WhatsApp gives Atlas a cleaner follow-up path after intro calls without forcing people into a heavy CRM flow.`, ['Connect WhatsApp','What about Mailchimp?','Summarize my business profile']),
    'Summarize my business profile': reply(`Still Water is a Lisbon-based somatic and breathwork practice run by Maya Chen. The strongest offer is 1:1 work, with a 4-session package as the highest-LTV path. The audience responds to quiet specificity: small body cues, clear expectations, and soft next steps.`, ['What memory should I add?','Write a stronger SEO title','Draft a campaign for this week']),
    'What memory should I add?': reply(`Add this memory:\n\n“When writing for Still Water, avoid making the work sound like a transformation promise. Use one physical cue, one grounded outcome, and one low-pressure invitation.”\n\nThat will improve campaigns, site copy, and follow-ups.`, ['Save this memory','Make it shorter','What does Atlas know about my voice?']),
    'What is working in my funnel?': reply(`The strongest part of the funnel is the Instagram bio link to booking page.\n\nPeople who click from Instagram are arriving with context, so they need less persuasion and more clarity. The weak point is the jump from intro call to package; that needs a better follow-up sequence.`, ['Show me my best converting traffic source','Draft package follow-up','What should I focus on today?']),
    'Draft the next best action for me': reply(`Next best action:\n\nReply to the warmest lead, then publish one precise post. Do not redesign the site today.\n\nMessage: “I’d start with a 15-minute intro so we can feel whether this is the right fit. If it is, the 4-session package gives us enough room to work without rushing.”`, ['Send the draft','Make it gentler','What else can wait?']),
    'What should I stop doing this week?': reply(`Stop adding new surfaces.\n\nNo new channels, no extra landing pages, no complicated funnel. This week wants fewer open loops: one campaign, one booking CTA, one follow-up sequence. The business will feel calmer and the signal will be easier to read.`, ['What should I focus on today?','Which campaign strategy fits this week?','What else can wait?'])
  };
  if(exact[message]) return exact[message];

  if(text.includes('schedule') || text.includes('approve') || text.includes('send') || text.includes('open') || text.includes('enable') || text.includes('connect') || text.includes('save')){
    return done(`Done in draft mode.\n\nI would still keep one review step here because this touches ${contextLabel}. The change is ready, but the tone should stay careful: clear action, low pressure, no extra noise.`, 'Draft action prepared');
  }
  if(text.includes('cheaper') || text.includes('budget')){
    return reply(`Cheaper version: keep it organic for 48 hours, then spend €5/day only on the post with the strongest save or reply rate.\n\nThat protects the learning. If the signal is weak, we improve the message before buying more attention.`, ['Which post should I test first?','What should I boost with €15?','Just schedule, no boost']);
  }
  if(text.includes('urgent') || text.includes('direct')){
    return reply(`More direct, without getting loud:\n\n“I have a few 1:1 openings this week. If your body has been asking for a slower kind of support, start with a 15-minute intro.”\n\nThat names the offer and keeps the doorway soft.`, ['Use this version','Make it softer','Schedule for Tuesday']);
  }
  if(text.includes('linkedin') || text.includes('tiktok') || text.includes('ig') || text.includes('bio')){
    return reply(`Channel read: Instagram is your conversion channel, TikTok is discovery, LinkedIn is trust.\n\nDo not use the same job for all three. Put the booking CTA on Instagram, a short cue on TikTok, and the reflective version on LinkedIn.`, ['Apply to LinkedIn too','Audit the TikTok handoff','Show me the IG bio']);
  }
  if(text.includes('site') || text.includes('landing') || text.includes('hero') || text.includes('seo')){
    return exact['What should I change on the hero'];
  }
  if(text.includes('booking') || text.includes('slot') || text.includes('no-show') || text.includes('package')){
    return exact['Where are my open slots this week?'];
  }
  if(text.includes('cohort') || text.includes('intro') || text.includes('founder') || text.includes('aïsha') || text.includes('diego')){
    return exact['Who should I talk to this week?'];
  }
  if(text.includes('campaign') || text.includes('boost') || text.includes('post')){
    return exact['Which campaign strategy fits this week?'];
  }
  return reply(`For ${contextLabel}, I would make the next move smaller and more measurable.\n\nAsk: what is the one action a warm person should take next? Then remove anything that competes with it. In Still Water’s case, that usually means a clearer intro call, one precise post, or one warm follow-up.`, ['What should I focus on today?','Draft the next best action for me','Which campaign strategy fits this week?']);
}

function AtlasChatModal({scenario, seed, onClose, onNav, onToast, contextLabel='your business', examples}){
  const [thread, setThread] = useStateAtlas([]); // {role:'user'|'atlas', text, chip?, follow?, typing?}
  const [input, setInput] = useStateAtlas('');
  const [thinking, setThinking] = useStateAtlas(false);
  const scrollRef = useRefAtlas(null);
  const inputRef = useRefAtlas(null);
  const handledSeed = useRefAtlas(false);

  const updateMessage = (id, patch) => {
    setThread(prev=>prev.map(m=>m.id===id ? {...m, ...patch} : m));
  };

  const send = async (text)=>{
    const userMsg = {role:'user', text};
    const canned = getLocalAtlasReply(text, scenario, contextLabel);
    if(canned){
      setThread(prev=>[...prev, userMsg, {role:'atlas', ...canned, typing:true}]);
      return;
    }
    const id = `atlas-${Date.now()}-${Math.random()}`;
    setThinking(true);
    setThread(prev=>[...prev, userMsg, {id, role:'atlas', text:'', follow:[], typing:true}]);
    try{
      const result = await askAnthropicAtlas(text, scenario, (partial)=>updateMessage(id,{text:partial || ' '}));
      updateMessage(id, {...result, typing:true});
    }catch(e){
      updateMessage(id, {...DEFAULT_REPLY, typing:true});
    }finally{
      setThinking(false);
    }
  };

  useEffectAtlas(()=>{
    if(seed && !handledSeed.current){ handledSeed.current = true; send(seed); }
  },[seed]);

  useEffectAtlas(()=>{
    if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  },[thread]);
  useEffectAtlas(()=>{ setTimeout(()=>inputRef.current && inputRef.current.focus(), 80); },[]);

  const onTypingDone = (i)=>setThread(prev=>prev.map((m,j)=>j===i?{...m, typing:false}:m));
  const promptExamples = examples || [
    'What should I focus on today?',
    'What is working in my funnel?',
    'Draft the next best action for me',
    'What should I stop doing this week?'
  ];

  return (
    <div className="chat-backdrop" style={{position:'fixed', inset:0, background:'#1E1A1580', zIndex:95, display:'flex', alignItems:'center', justifyContent:'center', padding:24}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} className="fade-up chat-dialog" style={{
        width:'min(820px,100%)', maxHeight:'90vh', background:'var(--paper)',
        borderRadius:16, border:'1px solid var(--line)', boxShadow:'0 40px 80px -20px #00000040',
        display:'flex', flexDirection:'column', overflow:'hidden'
      }}>
        <div style={{padding:'16px 22px', borderBottom:'1px solid var(--line)', display:'flex', alignItems:'center', justifyContent:'space-between', background:'var(--bg-2)'}}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <Avatar gradient="linear-gradient(140deg,#1E1A15,#5A4E3F)" size={32} initials="A"/>
            <div>
              <div style={{fontSize:13, fontWeight:500}}>Atlas</div>
              <div style={{fontSize:11, color:'var(--muted)', display:'flex', alignItems:'center', gap:6}}>
                <StatusDot color="#3F7A4A" live size={6}/> Reading your last 7 days · campaigns, bookings, network
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{fontSize:20, color:'var(--muted)', padding:'4px 10px'}}>×</button>
        </div>

        <div ref={scrollRef} style={{flex:1, overflow:'auto', padding:'22px 28px 18px', minHeight:300}}>
          {thread.length===0 && (
            <div style={{padding:'28px 10px 16px'}}>
              <div style={{textAlign:'center', maxWidth:520, margin:'0 auto 22px'}}>
                <div className="serif" style={{fontSize:30, color:'var(--ink)', marginBottom:8}}>Ask Atlas about {contextLabel}.</div>
                <div style={{color:'var(--muted)', fontSize:13, lineHeight:1.55}}>
                  Atlas is reading your last 7 days of campaigns, bookings, website, and cohort activity. Start with one of these or ask anything.
                </div>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(2, minmax(0,1fr))', gap:10}}>
                {promptExamples.map((p,i)=>(
                  <button key={i} onClick={()=>send(p)} style={{textAlign:'left', padding:'13px 14px', borderRadius:10, border:'1px solid var(--line)', background:i===0?'#FFF5F8':'var(--bg-2)', color:'var(--ink-soft)', fontSize:12.5, lineHeight:1.45}}>
                    <Icon.Sparkle size={11}/> &nbsp;{p}
                  </button>
                ))}
              </div>
            </div>
          )}
          {thread.map((m,i)=> m.role==='user' ? (
            <div key={i} style={{display:'flex', justifyContent:'flex-end', margin:'8px 0'}}>
              <div style={{background:'var(--ink)', color:'#FAF7F0', padding:'10px 14px', borderRadius:'14px 14px 4px 14px', maxWidth:'78%', fontSize:13.5, lineHeight:1.5}}>{m.text}</div>
            </div>
          ) : (
            <div key={i} className="fade-up" style={{display:'flex', gap:12, margin:'14px 0 18px'}}>
              <Avatar gradient="linear-gradient(140deg,#1E1A15,#5A4E3F)" size={28} initials="A"/>
              <div style={{flex:1}}>
                <div style={{fontSize:13.5, lineHeight:1.65, color:'var(--ink)', whiteSpace:'pre-wrap'}}>
                  {m.typing ? <Typewriter text={m.text} speed={8} onDone={()=>onTypingDone(i)}/> : m.text}
                </div>
                {!m.typing && m.chip && <ResultChip chip={m.chip} onNav={onNav}/>}
                {!m.typing && m.follow && (
                  <div style={{display:'flex', flexWrap:'wrap', gap:6, marginTop:14}}>
                    {m.follow.map((f,j)=>(<Pill key={j} tone="ghost" size="sm" onClick={()=>send(f)}>{f}</Pill>))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="fade-up" style={{display:'flex', alignItems:'center', gap:8, color:'var(--muted)', fontSize:12, margin:'8px 0 0 40px'}}>
              <StatusDot color="#3F7A4A" live size={7}/> Atlas is thinking…
            </div>
          )}
        </div>

        <div style={{padding:'14px 22px', borderTop:'1px solid var(--line)', display:'flex', gap:10, alignItems:'center'}}>
          <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{if(e.key==='Enter' && input.trim()){send(input.trim()); setInput('');}}}
            placeholder="Ask Atlas anything about your business…"
            style={{flex:1, border:'1px solid var(--line)', borderRadius:999, padding:'10px 16px', fontSize:13, background:'var(--bg-2)', outline:'none'}}/>
          <button onClick={()=>{if(input.trim()){send(input.trim()); setInput('');}}}
            style={{width:38, height:38, borderRadius:'50%', background:'var(--ink)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Icon.Send size={14}/>
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultChip({chip, onNav}){
  if(chip.kind==='post'){
    return (
      <div style={{marginTop:14, border:'1px solid var(--line)', borderRadius:10, padding:14, background:'var(--bg-2)'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
          <div style={{fontSize:12, color:'var(--muted)', display:'flex', alignItems:'center', gap:8}}>
            <Icon.Image size={12}/> {chip.title}
          </div>
          <div style={{display:'flex', gap:6, color:'var(--muted)'}}>{chip.channels.map((c,i)=><ChannelIcon key={i} channel={c} size={13}/>)}</div>
        </div>
        <div style={{display:'flex', gap:12}}>
          <div style={{width:80, height:80, borderRadius:8, background:BRAND.brandGradient, flexShrink:0, position:'relative', overflow:'hidden'}}>
            <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 30% 30%, #FFFFFF40, transparent 60%)'}}/>
            <div className="serif" style={{position:'absolute', bottom:10, left:10, color:'#FAF7F0', fontSize:14, lineHeight:1.1, paddingRight:10}}>Still Water</div>
          </div>
          <div style={{flex:1, fontSize:12, color:'var(--ink-soft)', lineHeight:1.5}}>
            "There's a quieter way to come back to your body. Booking opens today — link in bio. 🌊"
            <div style={{marginTop:8, display:'flex', gap:6}}>
              <Pill tone="solid" size="sm" onClick={()=>onNav('campaigns')}>Open in Campaigns <Icon.Arrow size={10}/></Pill>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if(chip.kind==='list'){
    return (
      <div style={{marginTop:14, border:'1px solid var(--line)', borderRadius:10, padding:14, background:'var(--bg-2)'}}>
        <div style={{fontSize:12, color:'var(--muted)', marginBottom:10}}>{chip.title}</div>
        {chip.items.map((it,i)=>(
          <div key={i} style={{display:'flex', alignItems:'center', gap:10, padding:'6px 0', fontSize:13}}>
            <Icon.Check size={12}/> {it}
          </div>
        ))}
      </div>
    );
  }
  if(chip.kind==='confirm'){
    return (
      <div style={{marginTop:14, border:'1px solid var(--green)', borderRadius:10, padding:'12px 14px', background:'var(--green-soft)', display:'flex', alignItems:'center', gap:10}}>
        <Icon.Check size={14}/>
        <span style={{fontSize:13}}>{chip.title}</span>
      </div>
    );
  }
  return null;
}

function parseAtlasReply(raw){
  const text = raw || DEFAULT_REPLY.text;
  const match = text.match(/\n?\s*CHIPS:\s*(.+)$/i);
  if(!match) return {text:text.trim(), follow:DEFAULT_REPLY.follow};
  const follow = match[1].split('|').map(s=>s.trim().replace(/^"|"$/g,'')).filter(Boolean).slice(0,3);
  return {text:text.replace(match[0],'').trim(), follow: follow.length ? follow : DEFAULT_REPLY.follow};
}

async function askAnthropicAtlas(message, scenario, onPartial){
  const key = window.ANTHROPIC_API_KEY || localStorage.getItem('ANTHROPIC_API_KEY') || localStorage.getItem('anthropic_api_key');
  if(!key) throw new Error('Missing Anthropic key');
  const system = `You are Atlas, the AI cofounder inside Hatchers AI OS. You're helping Maya Chen, founder of Still Water — a somatic and breathwork coaching business in Lisbon, Portugal. Maya is a non-technical founder. You have access to her business context: she's currently at ${scenario.label} (${scenario.id === 'day3' ? 'Day 3 = launch week' : scenario.id === 'day21' ? 'Day 21 = first customers' : 'Day 60 = established traction'}). Her revenue this week is €${scenario.revenueWeek}. She has ${scenario.bookings} bookings and ${scenario.siteVisitors} site visitors. Your voice: quiet, direct, embodied. Never use hype. Respond as if you've been reading her business for days. Keep replies under 150 words. End every reply with 2–3 follow-up action chips formatted as: CHIPS: "action 1" | "action 2" | "action 3"`;
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method:'POST',
    headers:{
      'content-type':'application/json',
      'x-api-key':key,
      'anthropic-version':'2023-06-01',
      'anthropic-dangerous-direct-browser-access':'true'
    },
    body:JSON.stringify({
      model:'claude-sonnet-4-20250514',
      max_tokens:420,
      stream:true,
      system,
      messages:[{role:'user', content:message}]
    })
  });
  if(!res.ok || !res.body) throw new Error('Anthropic request failed');
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  let full = '';
  while(true){
    const {done,value} = await reader.read();
    if(done) break;
    buf += decoder.decode(value,{stream:true});
    const chunks = buf.split('\n\n');
    buf = chunks.pop() || '';
    chunks.forEach(chunk=>{
      const line = chunk.split('\n').find(l=>l.startsWith('data: '));
      if(!line) return;
      const data = line.slice(6).trim();
      if(data === '[DONE]') return;
      try{
        const json = JSON.parse(data);
        const delta = json.delta && json.delta.text;
        if(delta){
          full += delta;
          onPartial && onPartial(full.replace(/\n?\s*CHIPS:\s*.*$/i,''));
        }
      }catch(e){}
    });
  }
  return parseAtlasReply(full);
}

window.AtlasPage = AtlasPage;
