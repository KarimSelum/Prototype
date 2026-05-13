// Bookings page — calendar, customer side, payouts
const { useState: useStateB } = React;

function BookingsPage({ scenario, onToast }){
  const [view, setView] = useStateB('today'); // today | week | customer | payouts | clients
  const bookings = bookingsFor(scenario.id);
  const payouts = payoutsFor(scenario.id);
  const clients = clientsFor(scenario.id);

  return (
    <div className="os-page" style={{padding:'32px 40px 60px', maxWidth:1240, margin:'0 auto'}}>
      <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:24}}>
        <div>
          <SectionLabel style={{marginBottom:8}}>Bookings & payments</SectionLabel>
          <h1 className="serif" style={{fontSize:40, lineHeight:1.05, margin:0}}>Your week, at a glance.</h1>
        </div>
        <div style={{display:'flex', gap:8}}>
          <Pill tone="ghost" size="md" onClick={()=>onToast({message:'Booking link copied', sub:'stillwater.hatchers.site/book'})}>Copy booking link</Pill>
          <Pill tone="solid" size="md" onClick={()=>onToast({message:'New session type — Somatic 90min', sub:'Live on your booking page now'})}><Icon.Plus size={12}/> New service</Pill>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex', gap:0, borderBottom:'1px solid var(--line)', marginBottom:22}}>
        {[
          {id:'today', l:'Today'},
          {id:'week', l:'This week'},
          {id:'customer', l:'Customer view'},
          {id:'payouts', l:'Payouts'},
          {id:'clients', l:'Clients'},
        ].map(t=>(
          <button key={t.id} onClick={()=>setView(t.id)} style={{
            padding:'12px 18px', fontSize:13,
            borderBottom:'2px solid '+(view===t.id?'var(--ink)':'transparent'),
            color: view===t.id?'var(--ink)':'var(--muted)',
            marginBottom:-1
          }}>{t.l}</button>
        ))}
      </div>

      {view==='today' && <TodayView bookings={bookings} scenario={scenario} onToast={onToast}/>}
      {view==='week' && <WeekView bookings={bookings} scenario={scenario} onToast={onToast}/>}
      {view==='customer' && <CustomerView onToast={onToast}/>}
      {view==='payouts' && <PayoutsView payouts={payouts} scenario={scenario}/>}
      {view==='clients' && <ClientsView clients={clients} scenario={scenario} onToast={onToast} onBookAgain={()=>setView('customer')}/>}
    </div>
  );
}

function TodayView({bookings, scenario, onToast}){
  const today = bookings.filter(b=>b.when.includes('Today') || b.when.includes('Tue ·') || scenario.id==='day21');
  return (
    <div className="bookings-grid" style={{display:'grid', gridTemplateColumns:'7fr 5fr', gap:16}}>
      <Card pad={0}>
        <div style={{padding:'18px 22px', borderBottom:'1px solid var(--line-soft)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <SectionLabel>Sessions</SectionLabel>
          <div className="mono" style={{fontSize:11, color:'var(--muted)'}}>{today.length} TODAY</div>
        </div>
        {today.length===0 ? (
          <EmptyState
            title="No sessions yet."
            sub="Atlas is running your launch announcement. First bookings usually arrive within 48 hours of the first boost."
            action="Open campaigns"
            onAction={()=>onToast({message:'Switch to Campaigns from the sidebar'})}
          />
        ) : today.map((b,i)=>(
          <div key={i} style={{display:'flex', alignItems:'center', gap:16, padding:'18px 22px', borderBottom: i<today.length-1?'1px solid var(--line-soft)':'none', background: b.live?'var(--bg-2)':'transparent'}}>
            <Avatar gradient={b.avatar} size={42} initials={b.who.split(' ').map(s=>s[0]).join('').slice(0,2)}/>
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:3}}>
                <span style={{fontSize:14, fontWeight:500}}>{b.who}</span>
                {b.new && <Pill tone="pink" size="sm">New</Pill>}
                {b.live && <Pill tone="green" size="sm"><StatusDot color="#3F7A4A" live size={6}/> In session</Pill>}
              </div>
              <div style={{fontSize:12.5, color:'var(--muted)'}}>{b.service} · {b.when}</div>
              {b.note && <div style={{fontSize:11.5, color:'var(--taupe-mid)', marginTop:4, fontStyle:'italic'}}>{b.note}</div>}
            </div>
            <div style={{textAlign:'right'}}>
              <div className="serif" style={{fontSize:22}}>{b.price>0?`€${b.price}`:'Free'}</div>
              <div style={{fontSize:10, color: b.status==='paid'?'var(--green)':'var(--muted)', textTransform:'uppercase', letterSpacing:1, marginTop:2}}>
                {b.status==='paid'? <><Icon.Check size={10}/> Paid</> : 'Intro call'}
              </div>
            </div>
          </div>
        ))}
      </Card>

      <div style={{display:'flex', flexDirection:'column', gap:16}}>
        <Card>
          <SectionLabel style={{marginBottom:14}}>Today's earnings</SectionLabel>
          <div className="serif" style={{fontSize:44, lineHeight:1, letterSpacing:'-.01em', marginBottom:6}}>
            €{today.reduce((s,b)=>s+(b.status==='paid'?b.price:0),0).toLocaleString()}
          </div>
          <div style={{fontSize:12, color:'var(--muted)', marginBottom:18}}>
            via Stripe · {today.filter(b=>b.status==='paid').length} paid sessions · €0 fees
          </div>
          <div style={{padding:14, borderRadius:10, background:'var(--bg-2)', border:'1px solid var(--line-soft)'}}>
            <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:6}}>
              <Icon.Stripe size={14}/>
              <span style={{fontSize:12, fontWeight:500}}>Next payout</span>
            </div>
            <div style={{fontSize:13, color:'var(--ink-soft)'}}>
              {scenario.id==='day21'? '€280 · Wednesday' : scenario.id==='day60'? '€1,820 · Friday' : '—'}
            </div>
          </div>
        </Card>

        <Card>
          <SectionLabel style={{marginBottom:14}}>Atlas suggestions</SectionLabel>
          {[
            scenario.id==='day3' && {t:'Add a "first session" intake form', s:'Reduces no-shows by 38% per cohort data'},
            scenario.id!=='day3' && {t:'Open Thursday mornings', s:'3 people on waitlist · projected fill: 100%'},
            scenario.id==='day60' && {t:'Launch retreat deposit page', s:'€200 × 8 = €1,600 secured before October'},
            {t:'Add SMS reminders', s:'Cuts no-show rate from 12% to 4%'},
          ].filter(Boolean).map((s,i)=>(
            <div key={i} style={{padding:'12px 0', borderBottom: i<2?'1px solid var(--line-soft)':'none', display:'flex', gap:10}}>
              <Icon.Sparkle size={14}/>
              <div style={{flex:1}}>
                <div style={{fontSize:13, fontWeight:500, marginBottom:2}}>{s.t}</div>
                <div style={{fontSize:11.5, color:'var(--muted)'}}>{s.s}</div>
              </div>
              <button onClick={()=>onToast({message:'Enabled · Atlas will set this up'})} style={{fontSize:11, color:'var(--ink)', textDecoration:'underline', textDecorationColor:'var(--taupe)', textUnderlineOffset:3}}>Enable</button>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function WeekView({bookings, scenario, onToast}){
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const slots = ['08:00','09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00','18:00'];
  const [popover, setPopover] = useStateB(null);
  const [blocked, setBlocked] = useStateB({});
  // For demo, render a sparse grid with bookings hashed in
  const placed = {};
  bookings.forEach((b,i)=>{
    const day = b.when.split('·')[0].trim();
    const time = (b.when.split('·')[1]||'').trim().slice(0,5);
    const di = ['Today','Tomorrow','Mon','Tue','Wed','Thu','Fri','Sat','Sun'].indexOf(day);
    const realDi = di===0?2:di===1?3:Math.max(0,di-2);
    const key = `${realDi}-${time}`;
    placed[key] = b;
  });
  return (
    <Card pad={0}>
      <div style={{padding:'18px 22px', borderBottom:'1px solid var(--line-soft)', display:'flex', justifyContent:'space-between'}}>
        <SectionLabel>Week of 11–17 May</SectionLabel>
        <span className="mono" style={{fontSize:11, color:'var(--muted)'}}>{bookings.length} BOOKED · {Math.max(0,21-bookings.length)} SLOTS OPEN</span>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'70px repeat(7,1fr)', borderTop:'1px solid var(--line-soft)'}}>
        <div/>
        {days.map(d=><div key={d} style={{padding:'10px 6px', borderLeft:'1px solid var(--line-soft)', borderBottom:'1px solid var(--line-soft)', fontSize:11, color:'var(--muted)', textAlign:'center'}}>{d}</div>)}
        {slots.map(slot=>(
          <React.Fragment key={slot}>
            <div style={{padding:'12px 8px', borderTop:'1px solid var(--line-soft)', fontSize:10, color:'var(--muted)', textAlign:'right'}}>{slot}</div>
            {days.map((d,di)=>{
              const key = `${di}-${slot}`;
              const b = placed[key];
              const isBlocked = blocked[key];
              return (
                <div key={di+slot} onClick={()=>!b && !isBlocked && setPopover({key, day:d, slot})} style={{borderLeft:'1px solid var(--line-soft)', borderTop:'1px solid var(--line-soft)', minHeight:42, padding:4, position:'relative', background:b?'var(--bg-2)':isBlocked?'#00000008':'transparent', cursor:b?'default':'pointer'}}>
                  {b && (
                    <div style={{height:'100%', borderRadius:6, padding:'4px 6px', background:'#fff', border:'1px solid var(--line)', fontSize:10.5, lineHeight:1.2}}>
                      <div style={{display:'flex', alignItems:'center', gap:4, marginBottom:2}}>
                        <Avatar gradient={b.avatar} size={14}/>
                        <span style={{fontWeight:500, color:'var(--ink)'}}>{b.who.split(' ')[0]}</span>
                      </div>
                      <div style={{color:'var(--muted)', fontSize:10}}>{b.service.split(' · ')[0]}</div>
                    </div>
                  )}
                  {isBlocked && (
                    <div style={{height:'100%', borderRadius:6, padding:'6px', background:'#0000000D', border:'1px dashed var(--taupe)', fontSize:10.5, color:'var(--muted)'}}>Blocked</div>
                  )}
                  {popover && popover.key===key && (
                    <div onClick={e=>e.stopPropagation()} className="fade-up" style={{position:'absolute', zIndex:6, top:36, left:4, width:210, padding:12, border:'1px solid var(--line)', borderRadius:8, background:'#fff', boxShadow:'0 16px 40px -20px #00000070'}}>
                      <div style={{fontSize:12, fontWeight:600, marginBottom:4}}>New booking</div>
                      <div style={{fontSize:11, color:'var(--muted)', marginBottom:10}}>{popover.day} · {popover.slot}</div>
                      <select defaultValue="1:1 Somatic" style={{width:'100%', border:'1px solid var(--line)', borderRadius:7, padding:'8px', fontSize:12, marginBottom:8, background:'#fff'}}>
                        <option>1:1 Somatic</option><option>1:1 Breathwork</option><option>Intro call</option>
                      </select>
                      <div style={{display:'flex', gap:6, marginBottom:10}}>
                        <Pill tone="solid" size="sm" onClick={()=>{setBlocked({...blocked,[key]:true}); setPopover(null); onToast({message:'Time blocked', sub:`${popover.day} · ${popover.slot}`});}}>Block time</Pill>
                        <Pill tone="ghost" size="sm" onClick={()=>{setPopover(null); onToast({message:'Slot opened for bookings', sub:`${popover.day} · ${popover.slot}`});}}>Open</Pill>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
}

function CustomerView({onToast}){
  const [step, setStep] = useStateB(0); // 0 service, 1 time, 2 details, 3 paid
  const [service, setService] = useStateB(null);
  const [time, setTime] = useStateB(null);
  return (
    <div>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:14, fontSize:12, color:'var(--muted)'}}>
        <Icon.Globe size={12}/> stillwater.hatchers.site/book · what your customer sees
      </div>
      <Card pad={0} style={{overflow:'hidden', maxWidth:560, margin:'0 auto'}}>
        {/* customer-facing header */}
        <div style={{padding:'28px 32px 22px', background:'linear-gradient(160deg,#F4EDE3,#E8DCC9)', borderBottom:'1px solid var(--line)'}}>
          <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:14}}>
            <div style={{width:56, height:56, borderRadius:'50%', background:BRAND.brandGradient}}/>
            <div>
              <div className="serif" style={{fontSize:24, letterSpacing:'-.01em'}}>Still Water</div>
              <div style={{fontSize:12, color:'var(--muted)'}}>Maya Chen · Lisbon · somatic & breathwork</div>
            </div>
          </div>
        </div>

        <div style={{padding:'24px 32px 32px'}}>
          <div style={{display:'flex', gap:8, justifyContent:'center', marginBottom:18}}>
            {[0,1,2].map(i=><span key={i} style={{width:i===step?26:8, height:8, borderRadius:999, background:i<=Math.min(step,2)?'var(--ink)':'var(--line)', transition:'all .2s ease'}}/> )}
          </div>
          {step===0 && (
            <>
              <div style={{fontSize:13, color:'var(--muted)', marginBottom:14}}>Step 1 of 3 — choose a session</div>
              {[
                {n:'Intro call',d:'15min · free · over Zoom', p:'Free'},
                {n:'1:1 Somatic session',d:'60min · online or Lisbon studio', p:'€140'},
                {n:'1:1 Breathwork',d:'60min · online or Lisbon studio', p:'€140'},
                {n:'4-session package',d:'4 × 60min · 10% off · best for first-timers', p:'€520'},
              ].map((s,i)=>(
                <button key={i} onClick={()=>{setService(s); setStep(1);}} style={{
                  display:'flex', width:'100%', textAlign:'left', padding:'16px 18px', borderRadius:10,
                  border:'1px solid var(--line)', background:'#fff', marginBottom:10, gap:12, alignItems:'center'
                }}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14, fontWeight:500, marginBottom:2}}>{s.n}</div>
                    <div style={{fontSize:12, color:'var(--muted)'}}>{s.d}</div>
                  </div>
                  <div className="serif" style={{fontSize:20}}>{s.p}</div>
                </button>
              ))}
            </>
          )}
          {step===1 && (
            <>
              <div style={{fontSize:13, color:'var(--muted)', marginBottom:14}}>Step 2 of 3 — pick a time</div>
              <div style={{fontSize:13, marginBottom:10, color:'var(--ink-soft)'}}>{service.n} · {service.p}</div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:10}}>
                {['Tue 09:30','Tue 10:15','Wed 14:00','Thu 11:00','Thu 16:30','Fri 09:00'].map(t=>(
                  <button key={t} onClick={()=>{setTime(t); setStep(2);}} style={{padding:'12px 8px', borderRadius:8, border:'1px solid var(--line)', background:'#fff', fontSize:12.5}}>{t}</button>
                ))}
              </div>
              <button onClick={()=>setStep(0)} style={{fontSize:12, color:'var(--muted)'}}>← Back</button>
            </>
          )}
          {step===2 && (
            <>
              <div style={{fontSize:13, color:'var(--muted)', marginBottom:14}}>Step 3 of 3 — your details</div>
              <div style={{fontSize:12, color:'var(--ink-soft)', marginBottom:14}}>{service.n} · {time} · {service.p}</div>
              <input placeholder="Your name" style={{width:'100%', padding:'12px 14px', borderRadius:8, border:'1px solid var(--line)', fontSize:13, marginBottom:8, background:'#fff'}}/>
              <input placeholder="Email" style={{width:'100%', padding:'12px 14px', borderRadius:8, border:'1px solid var(--line)', fontSize:13, marginBottom:8, background:'#fff'}}/>
              <input placeholder="What brought you here? (optional)" style={{width:'100%', padding:'12px 14px', borderRadius:8, border:'1px solid var(--line)', fontSize:13, marginBottom:14, background:'#fff'}}/>
              {service.p!=='Free' && (
                <div style={{padding:'12px 14px', borderRadius:8, border:'1px solid var(--line)', background:'var(--bg-2)', marginBottom:14, display:'flex', alignItems:'center', gap:10}}>
                  <Icon.Card size={14}/> <span style={{fontSize:12.5, color:'var(--ink-soft)'}}>Card · paid securely via Stripe</span>
                </div>
              )}
              <Pill tone="solid" size="lg" onClick={()=>{setStep(3); onToast({message:'New booking · Maya was notified', sub:`${service.n} · ${time}`});}} style={{width:'100%', justifyContent:'center'}}>
                {service.p==='Free'?'Confirm booking':`Pay ${service.p} & book`}
              </Pill>
            </>
          )}
          {step===3 && (
            <div className="fade-up" style={{textAlign:'center', padding:'20px 0'}}>
              <div style={{width:56, height:56, borderRadius:'50%', background:'var(--green-soft)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px', color:'var(--green)'}}>
                <Icon.Check size={26}/>
              </div>
              <div className="serif" style={{fontSize:26, marginBottom:8}}>You're booked.</div>
              <div style={{fontSize:13, color:'var(--ink-soft)', marginBottom:6}}>{service.n} · {time}</div>
              <div style={{fontSize:12, color:'var(--muted)', marginBottom:20}}>A confirmation has been sent. Maya will be in touch beforehand.</div>
              <EmailPreview service={service} time={time}/>
              <Pill tone="ghost" size="md" onClick={()=>{setStep(0); setService(null); setTime(null);}}>Book another</Pill>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function EmailPreview({service,time}){
  return (
    <div style={{textAlign:'left', border:'1px solid var(--line)', borderRadius:10, background:'#fff', margin:'0 0 18px', overflow:'hidden'}}>
      <div style={{padding:'10px 14px', borderBottom:'1px solid var(--line-soft)', fontSize:11, color:'var(--muted)'}}>Confirmation email preview</div>
      <div style={{padding:16}}>
        <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:12}}>
          <Avatar gradient={BRAND.avatarGradient} size={36} initials="MC"/>
          <div>
            <div style={{fontSize:13, fontWeight:600}}>Still Water · Booking Confirmed</div>
            <div style={{fontSize:11, color:'var(--muted)'}}>from Maya Chen</div>
          </div>
        </div>
        <div style={{fontSize:12.5, color:'var(--ink-soft)', lineHeight:1.5, marginBottom:12}}>{service.n} is confirmed for {time}. You will receive a short intake note before we meet.</div>
        <Pill tone="ghost" size="sm"><Icon.Calendar size={11}/> Add to calendar</Pill>
      </div>
    </div>
  );
}

function PayoutsView({payouts, scenario}){
  const total = payouts.reduce((s,p)=>s+p.amount,0);
  return (
    <div className="bookings-grid" style={{display:'grid', gridTemplateColumns:'7fr 5fr', gap:16}}>
      <Card pad={0}>
        <div style={{padding:'18px 22px', borderBottom:'1px solid var(--line-soft)', display:'flex', justifyContent:'space-between'}}>
          <SectionLabel>Stripe payouts</SectionLabel>
          <span className="mono" style={{fontSize:11, color:'var(--muted)'}}>LAST 7 DAYS</span>
        </div>
        <div style={{padding:'18px 22px', borderBottom:'1px solid var(--line-soft)'}}>
          <RevenueBars scenario={scenario}/>
        </div>
        {payouts.length===0 ? (
          <EmptyState title="No payouts yet." sub="Your first paid booking will show here. Money lands in your bank within 2 days."/>
        ) : payouts.map((p,i)=>(
          <div key={i} style={{display:'flex', alignItems:'center', gap:16, padding:'16px 22px', borderBottom: i<payouts.length-1?'1px solid var(--line-soft)':'none'}}>
            <div style={{width:36, height:36, borderRadius:8, background:p.status.includes('Paid')?'var(--green-soft)':'var(--bg-2)', display:'flex', alignItems:'center', justifyContent:'center', color:p.status.includes('Paid')?'var(--green)':'var(--muted)'}}>
              <Icon.Stripe size={16}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13.5, fontWeight:500}}>{p.source}</div>
              <div style={{fontSize:11.5, color:'var(--muted)'}}>{p.date} · {p.status}</div>
            </div>
            <div className="serif" style={{fontSize:20}}>€{p.amount}</div>
          </div>
        ))}
      </Card>
      <div style={{display:'flex', flexDirection:'column', gap:16}}>
        <Card>
          <SectionLabel style={{marginBottom:12}}>Total this period</SectionLabel>
          <div className="serif" style={{fontSize:56, lineHeight:1, letterSpacing:'-.015em'}}>€{total.toLocaleString()}</div>
          <div style={{fontSize:12, color:'var(--muted)', marginTop:6}}>{payouts.length} transactions · 0 disputes · 0 chargebacks</div>
        </Card>
        <Card>
          <SectionLabel style={{marginBottom:12}}>Connected</SectionLabel>
          {[
            {n:'Stripe', s:'Payouts to BPI · ****4421', i:Icon.Stripe},
            {n:'Calendar', s:'Google · maya@stillwater.pt', i:Icon.Calendar},
            {n:'Booking page', s:'stillwater.hatchers.site/book', i:Icon.Globe},
          ].map((x,i)=>(
            <div key={i} style={{display:'flex', gap:12, padding:'10px 0', borderBottom: i<2?'1px solid var(--line-soft)':'none', alignItems:'center'}}>
              <x.i size={14}/>
              <div style={{flex:1}}>
                <div style={{fontSize:13, fontWeight:500}}>{x.n}</div>
                <div style={{fontSize:11.5, color:'var(--muted)'}}>{x.s}</div>
              </div>
              <Pill tone="green" size="sm"><StatusDot color="#3F7A4A" size={6}/> Live</Pill>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function RevenueBars({scenario}){
  const [hover,setHover] = useStateB(null);
  const data = revenueSeriesFor(scenario.id);
  const max = Math.max(...data,1);
  return (
    <div style={{position:'relative'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
        <SectionLabel>30-day revenue</SectionLabel>
        <span className="mono" style={{fontSize:10, color:'var(--muted)'}}>MAY</span>
      </div>
      <svg viewBox="0 0 320 110" width="100%" height="130" preserveAspectRatio="none">
        {data.map((v,i)=>{
          const h = Math.max(2,(v/max)*88);
          return <rect key={i} x={8+i*10.2} y={100-h} width="6.5" height={h} rx="2" fill={v?'#3F7A4A':'#B8A890'} opacity={hover===i?1:.72} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)} style={{transformBox:'fill-box', transformOrigin:'bottom', animation:`barGrow .45s ease-out ${i*12}ms both`}}/>;
        })}
      </svg>
      {hover!==null && (
        <div style={{position:'absolute', top:22, left:`${Math.min(82, hover*3.1)}%`, transform:'translateX(-50%)', background:'var(--ink)', color:'#FAF7F0', borderRadius:8, padding:'7px 9px', fontSize:11, pointerEvents:'none'}}>
          May {hover+1} · €{data[hover]}
        </div>
      )}
    </div>
  );
}

function ClientsView({clients, scenario, onToast, onBookAgain}){
  const [open,setOpen] = useStateB(null);
  if(scenario.id==='day3'){
    return <Card><EmptyState title="Your first clients will appear here when they book." sub="Atlas is watching bookings, payments, and follow-up signals so this becomes a living CRM automatically."/></Card>;
  }
  return (
    <Card pad={0} style={{overflow:'hidden'}}>
      <div style={{padding:'16px 20px', borderBottom:'1px solid var(--line-soft)', display:'flex', alignItems:'center', gap:12}}>
        <Icon.Search size={14}/>
        <input placeholder="Search clients, notes, status…" style={{flex:1, border:'none', outline:'none', background:'transparent', fontSize:13}}/>
        <Pill tone="ghost" size="sm">Active</Pill>
        <Pill tone="ghost" size="sm">Leads</Pill>
      </div>
      {clients.map((c,i)=>(
        <div key={c.name} style={{borderBottom:i<clients.length-1?'1px solid var(--line-soft)':'none'}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{display:'grid', gridTemplateColumns:'minmax(190px,1.7fr) .7fr .8fr .9fr .7fr', gap:12, alignItems:'center', width:'100%', padding:'15px 20px', textAlign:'left'}}>
            <div style={{display:'flex', gap:12, alignItems:'center'}}>
              <Avatar gradient={c.avatar} size={36} initials={c.name.split(' ').map(s=>s[0]).join('').slice(0,2)}/>
              <div><div style={{fontSize:13.5, fontWeight:600}}>{c.name}</div><div style={{fontSize:11, color:'var(--muted)'}}>Still Water client</div></div>
            </div>
            <div style={{fontSize:12}}>{c.sessions}</div>
            <div style={{fontSize:12}}>€{c.spend}</div>
            <div style={{fontSize:12, color:'var(--muted)'}}>{c.last}</div>
            <Pill tone={c.status==='Active'?'green':c.status==='Lead'?'amber':'ghost'} size="sm">{c.status}</Pill>
          </button>
          {open===i && (
            <div className="fade-up" style={{padding:'0 20px 18px 68px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:18}}>
              <div>
                <SectionLabel style={{marginBottom:8}}>Booking history</SectionLabel>
                {c.history.map((h,j)=><div key={j} style={{fontSize:12.5, padding:'7px 0', color:'var(--ink-soft)', borderBottom:j<c.history.length-1?'1px solid var(--line-soft)':'none'}}>{h}</div>)}
              </div>
              <div>
                <SectionLabel style={{marginBottom:8}}>Atlas notes</SectionLabel>
                <div style={{fontSize:13, lineHeight:1.5, color:'var(--ink-soft)', marginBottom:12}}>{c.note}</div>
                <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                  <Pill tone="solid" size="sm" onClick={()=>onToast({message:'Atlas drafted a message', sub:`Follow-up for ${c.name}`})}>Send follow-up</Pill>
                  <Pill tone="ghost" size="sm" onClick={onBookAgain}>Book again</Pill>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </Card>
  );
}

function EmptyState({title, sub, action, onAction}){
  return (
    <div style={{padding:'50px 30px', textAlign:'center'}}>
      <div className="serif" style={{fontSize:22, marginBottom:8}}>{title}</div>
      <div style={{fontSize:13, color:'var(--muted)', maxWidth:420, margin:'0 auto 16px', lineHeight:1.5}}>{sub}</div>
      {action && <Pill tone="ghost" size="md" onClick={onAction}>{action}</Pill>}
    </div>
  );
}

window.BookingsPage = BookingsPage;
