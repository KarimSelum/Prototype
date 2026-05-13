// Tool mockups — rendered inside a browser-chrome frame.
// Each returns JSX for the "screen" content only.

function ChromeFrame({children, url, tone='light'}){
  const bg = tone==='dark' ? '#1B1814' : '#FFFFFF';
  const barBg = tone==='dark' ? '#26211C' : '#EFEAE0';
  const txt = tone==='dark' ? '#D8CFBE' : '#6B6458';
  return (
    <div style={{
      background:bg, borderRadius:14, overflow:'hidden',
      boxShadow:'0 30px 60px -30px #00000040, 0 2px 6px #00000010',
      border:'1px solid '+(tone==='dark'?'#2E2822':'#E3DCCE'),
    }}>
      <div style={{height:36,background:barBg,display:'flex',alignItems:'center',padding:'0 14px',gap:10,borderBottom:'1px solid '+(tone==='dark'?'#2E2822':'#E3DCCE')}}>
        <div style={{display:'flex',gap:6}}>
          <span style={{width:10,height:10,borderRadius:'50%',background:'#E5654A'}}/>
          <span style={{width:10,height:10,borderRadius:'50%',background:'#E5B74A'}}/>
          <span style={{width:10,height:10,borderRadius:'50%',background:'#7CB26B'}}/>
        </div>
        <div style={{flex:1,textAlign:'center',fontSize:11,color:txt,letterSpacing:.3}} className="mono">{url}</div>
      </div>
      <div style={{minHeight:440}}>{children}</div>
    </div>
  );
}

// ---------- 1. Social Campaign Generator ----------
function MockCampaign(){
  const channels=[
    {name:'Instagram', icon:Icon.Instagram, reach:'12.4K', ctr:'3.8%'},
    {name:'Facebook', icon:Icon.Facebook, reach:'8.1K', ctr:'2.1%'},
    {name:'TikTok', icon:Icon.TikTok, reach:'21.6K', ctr:'5.4%'},
    {name:'LinkedIn', icon:Icon.LinkedIn, reach:'3.2K', ctr:'4.2%'},
  ];
  return (
    <div style={{display:'grid',gridTemplateColumns:'220px 1fr',height:440}}>
      {/* Sidebar */}
      <div style={{borderRight:'1px solid #EFEAE0',padding:'18px 14px',background:'#FBF8F2'}}>
        <div style={{fontSize:10,color:'#8F8273',letterSpacing:1.5,textTransform:'uppercase',marginBottom:10}}>Campaign</div>
        <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:20,lineHeight:1.15,color:'#1E1A15',marginBottom:18}}>Spring Membership Drive</div>
        <div style={{fontSize:10,color:'#8F8273',letterSpacing:1.5,textTransform:'uppercase',margin:'12px 0 8px'}}>Goal</div>
        <div style={{fontSize:12,color:'#1E1A15',lineHeight:1.5}}>Drive 50 new trial signups in Atlanta &amp; Austin</div>
        <div style={{fontSize:10,color:'#8F8273',letterSpacing:1.5,textTransform:'uppercase',margin:'20px 0 8px'}}>Budget</div>
        <div style={{fontSize:13,color:'#1E1A15'}}>$400 <span style={{color:'#8F8273'}}>/ week</span></div>
        <div style={{marginTop:20,padding:'10px 12px',background:'#E8EDD9',borderRadius:6,fontSize:11,color:'#4A5231',lineHeight:1.45}}>
          <span style={{fontWeight:600}}>Auto-boost on:</span> posts above 4% CTR in the first 6h will be promoted via Meta.
        </div>
      </div>
      {/* Feed */}
      <div style={{padding:18,overflow:'auto'}} className="mockscroll">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <div style={{display:'flex',gap:6}}>
            {channels.map((c,i)=>(
              <div key={i} style={{padding:'6px 10px',border:'1px solid #E3DCCE',borderRadius:999,display:'flex',alignItems:'center',gap:6,fontSize:11,background:i===0?'#1E1A15':'#fff',color:i===0?'#fff':'#1E1A15'}}>
                <c.icon size={12}/> {c.name}
              </div>
            ))}
          </div>
          <div style={{fontSize:11,color:'#8F8273'}}>Week of Apr 22</div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          {/* Post card 1 — image post */}
          <div style={{border:'1px solid #EFEAE0',borderRadius:10,overflow:'hidden'}}>
            <div style={{aspectRatio:'4/3',background:'linear-gradient(135deg,#F3DFCF 0%,#E0BFA3 60%,#8A6F52 100%)',position:'relative',display:'flex',alignItems:'flex-end',padding:14}}>
              <div style={{position:'absolute',top:10,left:10,fontSize:9,color:'#fff',padding:'3px 7px',background:'#00000040',borderRadius:4,letterSpacing:1}} className="mono">AI-GENERATED · v3</div>
              <div style={{color:'#fff',fontFamily:'Cormorant Garamond,serif',fontSize:22,lineHeight:1.05,textShadow:'0 1px 8px #0003'}}>Ship your idea<br/>this quarter.</div>
            </div>
            <div style={{padding:12}}>
              <div style={{fontSize:12,color:'#1E1A15',lineHeight:1.5}}>Stop waiting for the perfect plan. Our mentors have built $1M+ businesses — they'll help you ship yours. →</div>
              <div style={{display:'flex',gap:10,marginTop:10,fontSize:10,color:'#8F8273'}}>
                <span>#founders</span><span>#startup</span><span>#AI</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:10,paddingTop:10,borderTop:'1px solid #F3EEE3',fontSize:11}}>
                <span style={{color:'#4A5231'}}>● Scheduled Tue 9:00</span>
                <span style={{color:'#8F8273'}}>IG + FB</span>
              </div>
            </div>
          </div>

          {/* Post card 2 — carousel */}
          <div style={{border:'1px solid #EFEAE0',borderRadius:10,overflow:'hidden'}}>
            <div style={{aspectRatio:'4/3',background:'#F7F3EB',position:'relative',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:2}}>
              <div style={{background:'linear-gradient(160deg,#D9E2EE,#8AA3C4)'}}/>
              <div style={{background:'linear-gradient(160deg,#E8EDD9,#9CAE6F)'}}/>
              <div style={{background:'linear-gradient(160deg,#E3DBEB,#A088B5)'}}/>
              <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',color:'#1E1A15'}}>
                <div style={{fontSize:10,letterSpacing:2}} className="mono">CAROUSEL · 3 OF 5</div>
                <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:20,marginTop:4}}>3 mistakes first-time founders make</div>
              </div>
            </div>
            <div style={{padding:12}}>
              <div style={{fontSize:12,color:'#1E1A15',lineHeight:1.5}}>Swipe through → most founders get #2 wrong in their first 90 days.</div>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:18,paddingTop:10,borderTop:'1px solid #F3EEE3',fontSize:11}}>
                <span style={{color:'#8F8273'}}>● Draft — awaiting review</span>
                <span style={{color:'#8F8273'}}>LinkedIn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics strip */}
        <div style={{marginTop:14,padding:'12px 14px',border:'1px solid #EFEAE0',borderRadius:10,display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}}>
          {channels.map((c,i)=>(
            <div key={i} style={{borderLeft:i?'1px solid #EFEAE0':'none',paddingLeft:i?14:0}}>
              <div style={{fontSize:10,color:'#8F8273',letterSpacing:1,textTransform:'uppercase',marginBottom:4,display:'flex',alignItems:'center',gap:5}}>
                <c.icon size={10}/> {c.name}
              </div>
              <div style={{fontSize:16,color:'#1E1A15',fontWeight:500}}>{c.reach}</div>
              <div style={{fontSize:10,color:'#4A5231'}}>CTR {c.ctr}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- 2. Website Builder ----------
function MockSite(){
  return (
    <div style={{display:'grid',gridTemplateColumns:'240px 1fr',height:440}}>
      <div style={{borderRight:'1px solid #EFEAE0',padding:'18px 16px',background:'#FBF8F2'}}>
        <div style={{fontSize:10,color:'#8F8273',letterSpacing:1.5,textTransform:'uppercase',marginBottom:12}}>Prompt</div>
        <div style={{background:'#fff',border:'1px solid #E3DCCE',borderRadius:8,padding:'10px 12px',fontSize:12,color:'#1E1A15',lineHeight:1.5}}>
          A landing page for my ceramics studio in Lisbon. Warm, handmade feel. Booking + shop.
        </div>
        <div style={{display:'flex',gap:6,marginTop:10}}>
          {['Warm','Editorial','Minimal','Bold'].map((t,i)=>(
            <span key={i} style={{padding:'4px 8px',borderRadius:999,fontSize:10,border:'1px solid #E3DCCE',background:i===0?'#1E1A15':'#fff',color:i===0?'#fff':'#1E1A15'}}>{t}</span>
          ))}
        </div>
        <div style={{fontSize:10,color:'#8F8273',letterSpacing:1.5,textTransform:'uppercase',margin:'20px 0 8px'}}>Sections</div>
        {['Hero','About the studio','Shop','Workshops','Contact'].map((s,i)=>(
          <div key={i} style={{padding:'8px 10px',fontSize:12,color:'#1E1A15',display:'flex',alignItems:'center',gap:8,borderRadius:6,background:i===2?'#F3EEE3':'transparent'}}>
            <span style={{width:5,height:5,borderRadius:'50%',background:'#B8A890'}}/> {s}
          </div>
        ))}
        <div style={{marginTop:16,padding:'9px 12px',fontSize:11,border:'1px solid #1E1A15',borderRadius:999,textAlign:'center',color:'#1E1A15'}}>Publish to your domain</div>
      </div>

      {/* Preview */}
      <div style={{padding:18,background:'#F4EFE5',overflow:'auto'}} className="mockscroll">
        <div style={{background:'#FAF5EC',borderRadius:8,overflow:'hidden',boxShadow:'0 10px 30px -15px #00000020'}}>
          <div style={{padding:'16px 22px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid #EDE3D0'}}>
            <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:18}}>Barro &amp; Lume</div>
            <div style={{display:'flex',gap:16,fontSize:11,color:'#5A4E3F'}}>
              <span>Shop</span><span>Workshops</span><span>About</span><span>Visit</span>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:0}}>
            <div style={{padding:'36px 28px'}}>
              <div style={{fontSize:10,letterSpacing:2,color:'#8F8273'}} className="mono">LISBOA · EST. 2024</div>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:34,lineHeight:1.05,margin:'10px 0 10px'}}>Hand-thrown<br/>tableware, made<br/>slow in Graça.</div>
              <div style={{fontSize:12,color:'#5A4E3F',lineHeight:1.55,marginBottom:16}}>Small batches, natural glazes, fired once a month in the studio kiln.</div>
              <div style={{display:'flex',gap:8}}>
                <div style={{padding:'7px 14px',border:'1px solid #1E1A15',borderRadius:999,fontSize:11}}>Shop the kiln</div>
                <div style={{padding:'7px 14px',border:'1px solid #D9D1C2',borderRadius:999,fontSize:11,color:'#5A4E3F'}}>Book a workshop</div>
              </div>
            </div>
            <div style={{background:'linear-gradient(160deg,#E6C9AE,#B88A64 70%,#5F4328)',minHeight:230,position:'relative'}}>
              <div style={{position:'absolute',bottom:10,right:12,fontSize:9,color:'#fff9',letterSpacing:1}} className="mono">AI-COMPOSED IMAGE</div>
            </div>
          </div>
          <div style={{padding:'20px 22px',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,borderTop:'1px solid #EDE3D0'}}>
            {['Mug No. 4','Low bowl','Carafe'].map((p,i)=>(
              <div key={i}>
                <div style={{aspectRatio:'1',background:['linear-gradient(140deg,#D9C4A8,#8F6A45)','linear-gradient(140deg,#C9B596,#7A5C3A)','linear-gradient(140deg,#E4D0B5,#A68256)'][i],borderRadius:4}}/>
                <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:14,marginTop:6}}>{p}</div>
                <div style={{fontSize:11,color:'#8F8273'}}>€{[28,42,65][i]}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:10,display:'flex',justifyContent:'space-between',fontSize:10,color:'#8F8273'}} className="mono">
          <span>BUILT IN 4 MIN · 12 SECTIONS</span>
          <span>barrolume.com</span>
        </div>
      </div>
    </div>
  );
}

// ---------- 3. Booking & Payments ----------
function MockBooking(){
  const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const slots=[
    {d:1,t:'10:00',who:'Maya L.',svc:'60 min consult',pay:'$120'},
    {d:2,t:'14:30',who:'Jon K.',svc:'Workshop session',pay:'$65'},
    {d:3,t:'09:00',who:'Priya S.',svc:'60 min consult',pay:'$120'},
    {d:3,t:'16:00',who:'Dana R.',svc:'Intro call',pay:'Free'},
    {d:5,t:'11:00',who:'Lucas M.',svc:'Package · 4x',pay:'$440'},
  ];
  return (
    <div style={{padding:20,height:440,display:'grid',gridTemplateColumns:'1fr 260px',gap:16}}>
      <div style={{border:'1px solid #EFEAE0',borderRadius:10,padding:14,background:'#FBF8F2'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:12}}>
          <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:20}}>April 22 – 28</div>
          <div style={{fontSize:11,color:'#8F8273'}}>5 bookings · $745</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:6,height:340}}>
          {days.map((d,i)=>(
            <div key={i} style={{border:'1px solid #EFEAE0',borderRadius:6,padding:8,background:'#fff',position:'relative'}}>
              <div style={{fontSize:10,color:'#8F8273',letterSpacing:1,textTransform:'uppercase'}}>{d}</div>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:22,lineHeight:1}}>{22+i}</div>
              <div style={{marginTop:6,display:'flex',flexDirection:'column',gap:4}}>
                {slots.filter(s=>s.d===i).map((s,j)=>(
                  <div key={j} style={{background:s.pay==='Free'?'#E8EDD9':'#F3DFCF',borderLeft:'2px solid '+(s.pay==='Free'?'#7A8B45':'#B8825A'),padding:'4px 5px',borderRadius:2,fontSize:9}}>
                    <div style={{color:'#1E1A15',fontWeight:500}}>{s.t}</div>
                    <div style={{color:'#5A4E3F'}}>{s.who}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{border:'1px solid #EFEAE0',borderRadius:10,padding:14,background:'#FBF8F2'}}>
          <div style={{fontSize:10,color:'#8F8273',letterSpacing:1.5,textTransform:'uppercase',marginBottom:8}}>Services</div>
          {[
            {n:'60-min consult',p:'$120',c:'#F3DFCF'},
            {n:'Workshop session',p:'$65',c:'#D9E2EE'},
            {n:'Package of 4',p:'$440',c:'#E3DBEB'},
            {n:'Intro call',p:'Free',c:'#E8EDD9'},
          ].map((s,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:i<3?'1px solid #EFEAE0':'none',fontSize:12}}>
              <span style={{display:'flex',alignItems:'center',gap:8}}><span style={{width:8,height:8,borderRadius:'50%',background:s.c}}/>{s.n}</span>
              <span style={{color:'#8F8273'}}>{s.p}</span>
            </div>
          ))}
        </div>
        <div style={{marginTop:12,border:'1px solid #EFEAE0',borderRadius:10,padding:14,background:'#FBF8F2'}}>
          <div style={{fontSize:10,color:'#8F8273',letterSpacing:1.5,textTransform:'uppercase',marginBottom:6}}>Payouts · April</div>
          <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:28}}>$3,240</div>
          <div style={{display:'flex',gap:4,marginTop:10,alignItems:'flex-end',height:40}}>
            {[18,32,24,38,28,44,36,50,42,58,48,62].map((h,i)=>(
              <div key={i} style={{flex:1,background:'#B8A890',borderRadius:1,height:h+'%'}}/>
            ))}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:4,fontSize:9,color:'#8F8273'}} className="mono">
            <span>APR 1</span><span>APR 22</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- 4. Social Network ----------
function MockNetwork(){
  const posts=[
    {who:'Amira · skincare DTC',stage:'Stage 2 · pre-launch',t:'2h',
     body:'Finally shipped landing v3. Dropped the hero video, replaced with a before/after grid. Instagram CTR went 1.9% → 4.6%. Sharing the page here:',
     pill:'Feedback needed',likes:24,comments:8},
    {who:'Jun · bakery in Seoul',stage:'Stage 1 · ideation',t:'5h',
     body:"Cohort workshop tomorrow — the brief is 'what's the smallest thing you could ship by Friday?' Mine: a waitlist form + one IG post. That's it.",
     pill:'Cohort: March \'26',likes:41,comments:14},
    {who:'Sam · B2B SaaS',stage:'Stage 3 · first revenue',t:'1d',
     body:'Just closed MRR #5. Not the biggest deal, but it was from a DM I almost didn\'t send. Post your "I almost didn\'t" wins below — I\'ll go first 👇',
     pill:'Win',likes:132,comments:48},
  ];
  return (
    <div style={{display:'grid',gridTemplateColumns:'200px 1fr 220px',height:440}}>
      <div style={{borderRight:'1px solid #EFEAE0',padding:'16px 12px',background:'#FBF8F2'}}>
        <div style={{fontSize:10,color:'#8F8273',letterSpacing:1.5,textTransform:'uppercase',marginBottom:10}}>Spaces</div>
        {['Your cohort','Same stage','Same industry','Mentors','Announcements'].map((s,i)=>(
          <div key={i} style={{padding:'7px 8px',fontSize:12,borderRadius:5,color:'#1E1A15',background:i===0?'#F3EEE3':'transparent',display:'flex',justifyContent:'space-between'}}>
            <span>{s}</span>
            {i===0 && <span style={{color:'#B8825A',fontSize:10}}>●3</span>}
          </div>
        ))}
        <div style={{fontSize:10,color:'#8F8273',letterSpacing:1.5,textTransform:'uppercase',margin:'20px 0 8px'}}>Live now</div>
        <div style={{fontSize:11,color:'#1E1A15',lineHeight:1.5,padding:'8px 10px',background:'#E8EDD9',borderRadius:6}}>
          <span style={{width:5,height:5,borderRadius:'50%',background:'#7A8B45',display:'inline-block',marginRight:6}}/>
          12 founders in Weekly Office Hours
        </div>
      </div>

      <div style={{padding:16,overflow:'auto'}} className="mockscroll">
        <div style={{display:'flex',gap:8,marginBottom:14,padding:'10px 12px',border:'1px solid #EFEAE0',borderRadius:8,background:'#fff'}}>
          <div style={{width:28,height:28,borderRadius:'50%',background:'linear-gradient(140deg,#E3DBEB,#A088B5)'}}/>
          <div style={{flex:1,fontSize:12,color:'#8F8273',alignSelf:'center'}}>Share a win, a block, or a question for your cohort…</div>
        </div>
        {posts.map((p,i)=>(
          <div key={i} style={{border:'1px solid #EFEAE0',borderRadius:8,padding:14,marginBottom:10,background:'#fff'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
              <div style={{width:32,height:32,borderRadius:'50%',background:['linear-gradient(140deg,#F3DFCF,#B8825A)','linear-gradient(140deg,#D9E2EE,#6B85A8)','linear-gradient(140deg,#E8EDD9,#7A8B45)'][i]}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:12,color:'#1E1A15',fontWeight:500}}>{p.who}</div>
                <div style={{fontSize:10,color:'#8F8273'}}>{p.stage} · {p.t}</div>
              </div>
              <div style={{fontSize:10,padding:'3px 8px',border:'1px solid #E3DCCE',borderRadius:999,color:'#5A4E3F'}}>{p.pill}</div>
            </div>
            <div style={{fontSize:12.5,color:'#1E1A15',lineHeight:1.55}}>{p.body}</div>
            <div style={{display:'flex',gap:16,marginTop:10,fontSize:11,color:'#8F8273'}}>
              <span>♡ {p.likes}</span><span>💬 {p.comments}</span><span>Save</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{borderLeft:'1px solid #EFEAE0',padding:'16px 12px',background:'#FBF8F2'}}>
        <div style={{fontSize:10,color:'#8F8273',letterSpacing:1.5,textTransform:'uppercase',marginBottom:10}}>Matched for you</div>
        {[
          {n:'Hana · bookstore',why:'Same stage, EU'},
          {n:'Diego · fitness app',why:'Also pre-launch'},
          {n:'Yemi · agency',why:'Same cohort'},
        ].map((m,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:i<2?'1px solid #EFEAE0':'none'}}>
            <div style={{width:30,height:30,borderRadius:'50%',background:['#E3DBEB','#D9E2EE','#F3DFCF'][i]}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:11.5,color:'#1E1A15'}}>{m.n}</div>
              <div style={{fontSize:10,color:'#8F8273'}}>{m.why}</div>
            </div>
            <div style={{fontSize:10,color:'#1E1A15',padding:'3px 8px',border:'1px solid #D9D1C2',borderRadius:999}}>Connect</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ChromeFrame, MockCampaign, MockSite, MockBooking, MockNetwork });
