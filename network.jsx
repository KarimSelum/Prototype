// Founder Network page
const { useState: useStateN } = React;

function NetworkPage({scenario, onToast}){
  const [activeSpace, setActiveSpace] = useStateN(0);
  const [liked, setLiked] = useStateN({});
  const [openReplies, setOpenReplies] = useStateN({});
  const space = COHORT_SPACES[activeSpace];

  return (
    <div className="os-page" style={{padding:'32px 40px 60px', maxWidth:1240, margin:'0 auto'}}>
      <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:24}}>
        <div>
          <SectionLabel style={{marginBottom:8}}>Founder network</SectionLabel>
          <h1 className="serif" style={{fontSize:40, lineHeight:1.05, margin:0}}>Same stage. Same week's problems.</h1>
        </div>
        <Pill tone="solid" size="md" onClick={()=>onToast({message:'Drafted in your voice', sub:'Ready to review in Atlas'})}><Icon.Plus size={12}/> New post</Pill>
      </div>

      <div className="network-grid" style={{display:'grid', gridTemplateColumns:'220px 1fr 280px', gap:16}}>
        <div>
          <Card pad={0}>
            <div style={{padding:'14px 16px', borderBottom:'1px solid var(--line-soft)'}}>
              <SectionLabel>Spaces</SectionLabel>
            </div>
            {COHORT_SPACES.map((s,i)=>(
              <button key={i} onClick={()=>setActiveSpace(i)} style={{
                display:'flex', width:'100%', padding:'12px 16px', alignItems:'center', gap:10,
                borderLeft:'2px solid '+(activeSpace===i?'var(--ink)':'transparent'),
                background:activeSpace===i?'var(--bg-2)':'transparent',
                textAlign:'left'
              }}>
                <StatusDot color={s.dot} size={7}/>
                <div style={{flex:1, fontSize:13, color: activeSpace===i?'var(--ink)':'var(--ink-soft)', fontWeight: activeSpace===i?500:400}}>{s.n}</div>
                <span className="mono" style={{fontSize:10, color:'var(--muted)'}}>{s.count}</span>
              </button>
            ))}
          </Card>

          <div style={{padding:'18px 6px', fontSize:11.5, color:'var(--muted)', lineHeight:1.5}}>
            Atlas creates spaces automatically when 5+ founders in your cohort share a niche, stage, or question.
          </div>
        </div>

        <div>
          <SpaceHeader space={space}/>
          <div style={{display:'flex', gap:6, marginBottom:14}}>
            <Pill tone="solid" size="sm">Recent</Pill>
            <Pill tone="ghost" size="sm">Most helpful</Pill>
            <Pill tone="ghost" size="sm">Same niche</Pill>
            <Pill tone="ghost" size="sm">Atlas picks</Pill>
          </div>

          <Card pad={0} style={{marginBottom:14}}>
            <div style={{padding:'14px 18px', display:'flex', gap:12, alignItems:'center'}}>
              <Avatar gradient={BRAND.avatarGradient} size={36} initials={BRAND.initials}/>
              <div style={{flex:1, fontSize:13, color:'var(--muted)'}}>Share a win, a block, or a question for your cohort…</div>
              <Pill tone="ghost" size="sm" onClick={()=>onToast({message:'Atlas drafted a post from your week', sub:'2 wins, 1 question · in your voice'})}><Icon.Sparkle size={11}/> Draft from my week</Pill>
            </div>
          </Card>

          {COHORT_POSTS.map((p,i)=>(
            <Card key={i} pad={0} style={{marginBottom:14, border: p.isAtlas?'1px solid var(--ink)':'1px solid var(--line)'}}>
              <div style={{padding:'16px 20px'}}>
                <div style={{display:'flex', gap:12, alignItems:'center', marginBottom:12}}>
                  <Avatar gradient={p.avatar} size={38} initials={p.who.split(' ')[0][0]}/>
                  <div style={{flex:1}}>
                    <div style={{display:'flex', gap:8, alignItems:'center', flexWrap:'wrap'}}>
                      <span style={{fontSize:13.5, fontWeight:500}}>{p.who}</span>
                      {p.isAtlas && <Pill tone="solid" size="sm"><Icon.Sparkle size={10}/> Atlas</Pill>}
                    </div>
                    <div style={{fontSize:11.5, color:'var(--muted)', marginTop:2}}>{p.stage} · {p.t}</div>
                  </div>
                  <Pill tone="soft" size="sm">{p.pill}</Pill>
                </div>
                <div style={{fontSize:14, lineHeight:1.55, color:'var(--ink)', marginBottom:14, whiteSpace:'pre-wrap'}}>{p.body}</div>
                {p.isAtlas ? (
                  <div style={{display:'flex', gap:8}}>
                    <Pill tone="solid" size="sm" onClick={()=>onToast({message:'Joined: Wellness builders', sub:'6 members · Maya, Sara, Aïsha, +3'})}>Join the space</Pill>
                    <Pill tone="ghost" size="sm">Not relevant</Pill>
                  </div>
                ) : (
                  <div style={{display:'flex', gap:18, color:'var(--muted)', fontSize:12, alignItems:'center'}}>
                    <button onClick={()=>setLiked(l=>({...l, [i]:!l[i]}))} style={{display:'flex', alignItems:'center', gap:5, color: liked[i]?'#E91E63':'inherit'}}>
                      <Icon.Heart size={13}/> {p.likes + (liked[i]?1:0)}
                    </button>
                    <button onClick={()=>setOpenReplies(r=>({...r,[i]:!r[i]}))} style={{display:'flex', alignItems:'center', gap:5}}>
                      <Icon.Comment size={13}/> {p.comments}
                    </button>
                    <button onClick={()=>setOpenReplies(r=>({...r,[i]:true}))} style={{marginLeft:'auto', fontSize:11.5, color:'var(--ink)', textDecoration:'underline', textDecorationColor:'var(--taupe)', textUnderlineOffset:3}}><Icon.Sparkle size={10}/> Atlas-reply</button>
                  </div>
                )}
              </div>
              {!p.isAtlas && <ReplyThread open={!!openReplies[i]} postIndex={i} onToast={onToast}/>}
            </Card>
          ))}
        </div>

        <div className="network-right-rail" style={{display:'flex', flexDirection:'column', gap:14}}>
          <Card>
            <SectionLabel style={{marginBottom:14}}>People to know</SectionLabel>
            {COHORT_MATCHES.map((m,i)=>(
              <div key={i} style={{display:'flex', gap:10, padding:'10px 0', borderBottom: i<2?'1px solid var(--line-soft)':'none', alignItems:'center'}}>
                <Avatar gradient={m.avatar} size={36}/>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:500}}>{m.n}</div>
                  <div style={{fontSize:11, color:'var(--muted)'}}>{m.what}</div>
                  <div style={{fontSize:10.5, color:'var(--taupe-mid)', marginTop:3}}>{m.why}</div>
                </div>
              </div>
            ))}
            <Pill tone="ghost" size="sm" style={{marginTop:12}} onClick={()=>onToast({message:'Intro drafted', sub:'Atlas wrote an opener using your shared context'})}>Atlas-intro <Icon.Arrow size={11}/></Pill>
          </Card>
          <Card>
            <SectionLabel style={{marginBottom:14}}>Your cohort this week</SectionLabel>
            <div style={{fontSize:12, color:'var(--ink-soft)', lineHeight:1.6}}>
              <div style={{display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px solid var(--line-soft)'}}><span>Posts shared</span><span style={{color:'var(--ink)'}}>62</span></div>
              <div style={{display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px solid var(--line-soft)'}}><span>First sales</span><span style={{color:'var(--ink)'}}>5</span></div>
              <div style={{display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px solid var(--line-soft)'}}><span>Sites launched</span><span style={{color:'var(--ink)'}}>3</span></div>
              <div style={{display:'flex', justifyContent:'space-between', padding:'6px 0'}}><span>Top question</span><span style={{color:'var(--ink)'}}>"Pricing"</span></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SpaceHeader({space}){
  return (
    <Card pad={18} style={{marginBottom:14, background:'var(--bg-2)'}}>
      <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:8}}>
        <StatusDot color={space.dot} size={9}/>
        <div className="serif" style={{fontSize:24}}>{space.n}</div>
        <Pill tone="ghost" size="sm">{space.count} members</Pill>
      </div>
      <div style={{fontSize:13, color:'var(--ink-soft)', lineHeight:1.45, marginBottom:12}}>{space.desc}</div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:14}}>
        <div style={{display:'flex'}}>
          {space.avatars.map((a,i)=><div key={i} style={{marginLeft:i?-8:0}}><Avatar gradient={a} size={28} initials=""/></div>)}
        </div>
        <div style={{fontSize:11.5, color:'var(--muted)', lineHeight:1.45, textAlign:'right'}}><Icon.Sparkle size={10}/> {space.why}</div>
      </div>
    </Card>
  );
}

function ReplyThread({open, postIndex, onToast}){
  const [text,setText] = useStateN('');
  const replies = [
    ['The 15-minute intro worked for me once I treated it like a filter, not a sample session.','I charge a small deposit and credit it forward. Fewer no-shows.','Atlas helped me turn the booking page copy into a boundary, weirdly useful.'],
    ['The first sale relief is real. Also, email confirmations saved me twice this week.','I copied your product description structure. It felt calmer than mine.'],
    ['This is the exact stage where I needed fewer tools, not more.','The no-Shopify point is under-discussed. Services need proof before infrastructure.'],
  ];
  const shown = replies[postIndex % replies.length];
  return (
    <div style={{maxHeight:open?260:0, overflow:'hidden', transition:'max-height .22s ease', borderTop:open?'1px solid var(--line-soft)':'none', background:'var(--bg-2)'}}>
      <div style={{padding:'12px 20px 16px'}}>
        {shown.map((r,i)=>(
          <div key={i} style={{display:'flex', gap:10, padding:'8px 0'}}>
            <Avatar gradient={COHORT_MATCHES[i%COHORT_MATCHES.length].avatar} size={24}/>
            <div style={{fontSize:12.5, color:'var(--ink-soft)', lineHeight:1.45}}>{r}</div>
          </div>
        ))}
        <div style={{display:'flex', gap:8, marginTop:8}}>
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Write a reply…" style={{flex:1, border:'1px solid var(--line)', borderRadius:999, padding:'9px 12px', fontSize:12, background:'#fff'}}/>
          <Pill tone="ghost" size="sm" onClick={()=>setText('This helped me. I am learning that the simpler setup is what lets the real signal come through.')}>Atlas-reply</Pill>
          <Pill tone="solid" size="sm" onClick={()=>{setText(''); onToast({message:'Reply posted', sub:'Shared with your cohort'});}}>Send</Pill>
        </div>
      </div>
    </div>
  );
}

function MessagesPage({onToast}){
  const conversations = [
    {name:'Aïsha Bakkali', avatar:'linear-gradient(140deg,#F1DCC9,#A37550)', last:'Loved your post about slow growth 🙏', messages:['Loved your post about slow growth 🙏']},
    {name:'Diego Souza', avatar:'linear-gradient(140deg,#D9E2EE,#5B7AA1)', last:'Quick question about your booking setup', messages:['Quick question about your booking setup']},
    {name:'Atlas', avatar:'linear-gradient(140deg,#1E1A15,#5A4E3F)', last:'I have 3 founder intros ready for you when you want them', messages:['I noticed three founder matches with useful overlap.', 'Aïsha has a skincare service funnel, Diego is setting up bookings, and Sara is nearby in Porto.', 'I can draft intros in your voice.']},
  ];
  const [active,setActive] = useStateN(2);
  const [input,setInput] = useStateN('');
  const c = conversations[active];
  return (
    <div className="os-page" style={{padding:'32px 40px 60px', maxWidth:1100, margin:'0 auto'}}>
      <SectionLabel style={{marginBottom:8}}>Messages</SectionLabel>
      <h1 className="serif" style={{fontSize:40, lineHeight:1.05, margin:'0 0 24px'}}>Founder conversations.</h1>
      <div className="network-grid" style={{display:'grid', gridTemplateColumns:'320px 1fr', gap:16}}>
        <Card pad={0}>
          {conversations.map((x,i)=>(
            <button key={x.name} onClick={()=>setActive(i)} style={{display:'flex', width:'100%', gap:12, padding:'15px 18px', textAlign:'left', borderBottom:i<conversations.length-1?'1px solid var(--line-soft)':'none', background:active===i?'var(--bg-2)':'transparent'}}>
              <Avatar gradient={x.avatar} size={36} initials={x.name[0]}/>
              <div style={{flex:1}}>
                <div style={{fontSize:13, fontWeight:600, marginBottom:3}}>{x.name}</div>
                <div style={{fontSize:11.5, color:'var(--muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{x.last}</div>
              </div>
            </button>
          ))}
        </Card>
        <Card pad={0} style={{minHeight:460, display:'flex', flexDirection:'column'}}>
          <div style={{padding:'16px 20px', borderBottom:'1px solid var(--line-soft)', display:'flex', gap:12, alignItems:'center'}}>
            <Avatar gradient={c.avatar} size={34} initials={c.name[0]}/>
            <div><div style={{fontSize:13.5, fontWeight:600}}>{c.name}</div><div style={{fontSize:11, color:'var(--muted)'}}>Founder network</div></div>
          </div>
          <div style={{flex:1, padding:20}}>
            {c.messages.map((m,i)=>(
              <div key={i} style={{maxWidth:'76%', background:i%2?'var(--ink)':'var(--bg-2)', color:i%2?'#FAF7F0':'var(--ink)', border:'1px solid var(--line)', borderRadius:14, padding:'10px 12px', fontSize:13, lineHeight:1.45, margin:'0 0 10px '+(i%2?'auto':'0')}}>{m}</div>
            ))}
          </div>
          <div style={{padding:'14px 18px', borderTop:'1px solid var(--line-soft)', display:'flex', gap:10}}>
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Write a message…" style={{flex:1, border:'1px solid var(--line)', borderRadius:999, padding:'10px 14px', background:'var(--bg-2)'}}/>
            <Pill tone="solid" size="md" onClick={()=>{setInput(''); onToast({message:'Atlas drafted a reply in your voice'});}}>Send</Pill>
          </div>
        </Card>
      </div>
    </div>
  );
}

window.NetworkPage = NetworkPage;
window.MessagesPage = MessagesPage;
