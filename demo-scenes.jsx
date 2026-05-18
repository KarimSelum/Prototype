// Hatchers AI — Investor demo reel
// A day in Maya's life. 90 seconds. Auto-playing.
//
// Timeline (seconds):
//   0.0 –  6.0   Scene 1  · Cold open: "Meet Maya"
//   6.0 – 18.0   Scene 2  · 7:14 AM — Atlas daily brief
//  18.0 – 28.0   Scene 3  · 11:02 AM — bookings land + Stripe
//  28.0 – 40.0   Scene 4  · 2:30 PM  — customer-side booking flow
//  40.0 – 54.0   Scene 5  · 6:48 PM  — campaign generation (shimmer → post)
//  54.0 – 66.0   Scene 6  · 9:18 PM  — site rebuild from natural language
//  66.0 – 80.0   Scene 7  · Week 1 → Week 4 — metrics grow
//  80.0 – 90.0   Scene 8  · 3,000+ signups proof + end card

// ── Brand palette ───────────────────────────────────────────────────────────
const HCH = {
  cream:   '#F1ECE3',
  paper:   '#FAF7F0',
  ink:     '#1E1A15',
  ink2:    '#4A423A',
  mute:    '#8F8273',
  rule:    '#E3DCCE',
  tan:     '#B8A890',
  pink:    '#E91E63',
  blue:    '#D9E2EE',
  blueInk: '#3E5266',
  sage:    '#E8EDD9',
  sageInk: '#4A5231',
  peach:   '#F4E3E0',
  shadow:  '0 30px 60px -20px rgba(0,0,0,.18), 0 4px 12px rgba(0,0,0,.05)',
};

const SERIF = '"Cormorant Garamond", "Source Serif Pro", Georgia, serif';
const SANS  = 'Inter, system-ui, sans-serif';
const MONO  = '"JetBrains Mono", ui-monospace, monospace';

// ── Small primitives ────────────────────────────────────────────────────────

function MonoTag({ children, style }) {
  return (
    <div style={{
      fontFamily: MONO, fontSize: 13, letterSpacing: 3,
      color: HCH.mute, textTransform: 'uppercase', ...style
    }}>{children}</div>
  );
}

function Logo({ size = 28, color = HCH.ink }) {
  return (
    <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: size, letterSpacing: 1.5, color }}>
      HATCHERS <span style={{ color: HCH.pink }}>AI</span>
    </div>
  );
}

// Soft "device" frame
function Phone({ x, y, children, scale = 1, tilt = 0 }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: 340, height: 690,
      borderRadius: 44, background: '#0a0a0a',
      padding: 10,
      boxShadow: '0 50px 90px -30px rgba(0,0,0,.35), 0 8px 24px rgba(0,0,0,.10)',
      transform: `scale(${scale}) rotate(${tilt}deg)`,
      transformOrigin: 'center',
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: 36, overflow: 'hidden',
        background: HCH.paper, position: 'relative',
      }}>
        {/* status bar */}
        <div style={{
          height: 32, display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '0 22px',
          fontFamily: SANS, fontSize: 13, fontWeight: 600, color: HCH.ink,
        }}>
          <span>9:41</span>
          <div style={{ display:'flex', gap: 4, alignItems:'center' }}>
            <span style={{ width: 16, height: 8, border: `1.5px solid ${HCH.ink}`, borderRadius: 2, position:'relative' }}>
              <span style={{ position:'absolute', inset: 1, background: HCH.ink, width: '70%' }} />
            </span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function Laptop({ x, y, scale = 1, children }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: 880, transform: `scale(${scale})`, transformOrigin: 'top left',
    }}>
      <div style={{
        background: '#1B1814', padding: 14, borderRadius: '14px 14px 6px 6px',
        boxShadow: '0 50px 90px -30px rgba(0,0,0,.4), 0 8px 24px rgba(0,0,0,.12)',
      }}>
        <div style={{
          background: HCH.paper, borderRadius: 6, overflow: 'hidden',
          height: 540,
        }}>
          <div style={{
            height: 32, background: '#EFEAE0', borderBottom: `1px solid ${HCH.rule}`,
            display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8,
          }}>
            <span style={{ width: 10, height: 10, borderRadius: 5, background: '#E5654A' }} />
            <span style={{ width: 10, height: 10, borderRadius: 5, background: '#E5B74A' }} />
            <span style={{ width: 10, height: 10, borderRadius: 5, background: '#7CB26B' }} />
            <div style={{
              marginLeft: 16, flex: 1, fontFamily: MONO, fontSize: 11, color: HCH.mute, letterSpacing: .3,
            }}>hatchers.ai/os</div>
          </div>
          {children}
        </div>
      </div>
      <div style={{
        height: 14, background: '#1B1814',
        clipPath: 'polygon(-3% 0, 103% 0, 99% 100%, 1% 100%)',
        margin: '-2px 0 0 -12px', width: 'calc(100% + 24px)',
      }} />
    </div>
  );
}

// ── Scene 1 · 0.0–6.0s · Cold open ─────────────────────────────────────────
function Scene1Open() {
  return (
    <Sprite start={0} end={6}>
      {({ localTime }) => {
        const t = Easing.easeOutCubic(clamp(localTime / 1.0, 0, 1));
        const t2 = Easing.easeOutCubic(clamp((localTime - 0.6) / 1.0, 0, 1));
        const t3 = Easing.easeOutCubic(clamp((localTime - 2.0) / 1.0, 0, 1));
        const exit = clamp((localTime - 5.2) / 0.8, 0, 1);
        const op = 1 - Easing.easeInCubic(exit);
        return (
          <div style={{ position:'absolute', inset: 0, background: HCH.cream, opacity: op }}>
            {/* faint grid */}
            <div style={{
              position:'absolute', inset: 0, opacity: .25,
              backgroundImage: `linear-gradient(${HCH.rule} 1px, transparent 1px), linear-gradient(90deg, ${HCH.rule} 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}/>
            <div style={{
              position: 'absolute', left: 160, top: 240,
              opacity: t, transform: `translateY(${(1-t)*20}px)`,
            }}>
              <MonoTag>An investor demo · 90 seconds</MonoTag>
            </div>
            <div style={{
              position: 'absolute', left: 160, top: 290, width: 1100,
              opacity: t2, transform: `translateY(${(1-t2)*20}px)`,
              fontFamily: SERIF, fontSize: 124, lineHeight: 1.0, color: HCH.ink, letterSpacing: '-.02em',
            }}>
              Meet Maya.
            </div>
            <div style={{
              position: 'absolute', left: 160, top: 440, width: 1100,
              opacity: t3, transform: `translateY(${(1-t3)*20}px)`,
              fontFamily: SERIF, fontSize: 48, lineHeight: 1.2, color: HCH.ink2,
            }}>
              She opened a small coffee shop in Lisbon last month.<br/>
              No marketing team. No agency. No technical skills.
            </div>
            <div style={{ position:'absolute', left: 160, bottom: 80, opacity: t3 }}>
              <Logo size={20} />
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ── Scene 2 · 6.0–18.0s · 7:14 AM Atlas daily brief ────────────────────────
function Scene2Brief() {
  const items = [
    { t: 0.5, label: 'Good morning, Maya.' },
    { t: 1.4, label: '2 new bookings came in overnight ☕' },
    { t: 2.4, label: 'Yesterday\'s post got 1,240 views — your best yet.' },
    { t: 3.4, label: 'Today: I\'ll draft this week\'s campaign by 7pm.' },
  ];
  return (
    <Sprite start={6} end={18}>
      {({ localTime }) => {
        const enter = Easing.easeOutCubic(clamp(localTime / 0.6, 0, 1));
        const exit = clamp((localTime - 11.2) / 0.8, 0, 1);
        const op = enter * (1 - Easing.easeInCubic(exit));
        return (
          <div style={{ position:'absolute', inset: 0, background: HCH.cream, opacity: op }}>
            {/* Time label */}
            <div style={{ position:'absolute', left: 110, top: 110 }}>
              <MonoTag>07:14 — Tuesday</MonoTag>
              <div style={{ fontFamily: SERIF, fontSize: 72, color: HCH.ink, lineHeight: 1.05, marginTop: 18, letterSpacing: '-.015em', maxWidth: 700 }}>
                Atlas wakes up<br/>before she does.
              </div>
              <div style={{ marginTop: 28, fontFamily: SANS, fontSize: 20, color: HCH.ink2, lineHeight: 1.5, maxWidth: 560 }}>
                Maya's AI cofounder reads her calendar, her bookings, her<br/>campaigns — and writes the day's brief while the kettle's on.
              </div>
            </div>

            {/* Phone with Atlas brief */}
            <Phone x={1230} y={140}>
              <div style={{ padding: '8px 22px 24px' }}>
                <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 18 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 14,
                    background: 'linear-gradient(140deg,#F3DFCF,#B8825A)',
                  }} />
                  <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: HCH.ink }}>Atlas</span>
                  <span style={{ marginLeft:'auto', fontFamily: MONO, fontSize: 10, color: HCH.mute, letterSpacing: 1 }}>DAILY BRIEF</span>
                </div>

                {items.map((it, i) => {
                  const reveal = Easing.easeOutCubic(clamp((localTime - it.t) / 0.5, 0, 1));
                  return (
                    <div key={i} style={{
                      opacity: reveal,
                      transform: `translateY(${(1-reveal)*8}px)`,
                      padding: '12px 14px', marginBottom: 10,
                      background: i === 0 ? HCH.peach : HCH.paper,
                      border: `1px solid ${HCH.rule}`,
                      borderRadius: 14,
                      fontFamily: SANS, fontSize: 15, color: HCH.ink, lineHeight: 1.45,
                    }}>{it.label}</div>
                  );
                })}

                {/* CTA */}
                {(() => {
                  const r = Easing.easeOutCubic(clamp((localTime - 4.4) / 0.6, 0, 1));
                  return (
                    <div style={{
                      marginTop: 18,
                      opacity: r,
                      transform: `translateY(${(1-r)*8}px)`,
                      padding: '14px 16px',
                      background: HCH.ink, color: HCH.paper, borderRadius: 14,
                      fontFamily: SANS, fontSize: 14, display: 'flex', justifyContent:'space-between', alignItems:'center',
                    }}>
                      <span>Approve the day</span>
                      <span style={{ fontFamily: MONO, fontSize: 11, opacity: .7 }}>↵</span>
                    </div>
                  );
                })()}
              </div>
            </Phone>

            {/* numbered marker */}
            <div style={{ position:'absolute', left: 110, bottom: 90 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, color: HCH.mute, letterSpacing: 2 }}>01 · MORNING</div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ── Scene 3 · 18.0–28.0s · 11:02 AM bookings land ─────────────────────────
function Scene3Bookings() {
  const bookings = [
    { t: 1.6, name: 'Sarah K.', service: 'Pour-over tasting', amount: '€32', avatar: 'linear-gradient(140deg,#F3DFCF,#B8825A)' },
    { t: 3.0, name: 'Tomás R.',  service: 'Beans (250g) · subscription',    amount: '€18', avatar: 'linear-gradient(140deg,#D9E2EE,#3E5266)' },
  ];
  return (
    <Sprite start={18} end={28}>
      {({ localTime }) => {
        const enter = Easing.easeOutCubic(clamp(localTime / 0.5, 0, 1));
        const exit = clamp((localTime - 9.3) / 0.7, 0, 1);
        const op = enter * (1 - Easing.easeInCubic(exit));
        return (
          <div style={{ position:'absolute', inset: 0, background: HCH.paper, opacity: op }}>
            <div style={{ position:'absolute', left: 110, top: 110 }}>
              <MonoTag>11:02 · Mid-morning</MonoTag>
              <div style={{ fontFamily: SERIF, fontSize: 72, color: HCH.ink, lineHeight: 1.05, marginTop: 18, letterSpacing: '-.015em', maxWidth: 760 }}>
                Two bookings landed<br/>while she was pulling shots.
              </div>
              <div style={{ marginTop: 28, fontFamily: SANS, fontSize: 20, color: HCH.ink2, lineHeight: 1.5, maxWidth: 600 }}>
                Stripe, calendar, confirmation, customer record — Hatchers handles<br/>the plumbing. She gets a notification. The money's in her account.
              </div>
            </div>

            {/* Notifications */}
            <div style={{ position:'absolute', right: 110, top: 160, width: 460 }}>
              {bookings.map((b, i) => {
                const r = Easing.easeOutBack(clamp((localTime - b.t) / 0.7, 0, 1));
                return (
                  <div key={i} style={{
                    opacity: r, transform: `translateY(${(1-r)*-20}px) scale(${0.96 + 0.04*Math.min(1,r)})`,
                    marginBottom: 14,
                    background: '#fff', border: `1px solid ${HCH.rule}`,
                    borderRadius: 16, padding: '16px 18px',
                    boxShadow: HCH.shadow,
                    display: 'flex', alignItems: 'center', gap: 14,
                  }}>
                    <div style={{ width: 44, height: 44, borderRadius: 22, background: b.avatar, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: SANS, fontSize: 12, color: HCH.mute, letterSpacing: 1, marginBottom: 4 }}>NEW BOOKING</div>
                      <div style={{ fontFamily: SANS, fontSize: 16, color: HCH.ink, fontWeight: 500 }}>{b.name}</div>
                      <div style={{ fontFamily: SANS, fontSize: 13, color: HCH.ink2 }}>{b.service}</div>
                    </div>
                    <div style={{ fontFamily: SERIF, fontSize: 26, color: HCH.ink }}>{b.amount}</div>
                  </div>
                );
              })}

              {/* Stripe deposit */}
              {(() => {
                const r = Easing.easeOutCubic(clamp((localTime - 4.6) / 0.7, 0, 1));
                return (
                  <div style={{
                    opacity: r, transform: `translateY(${(1-r)*-20}px)`,
                    marginTop: 24,
                    background: HCH.ink, color: HCH.paper,
                    borderRadius: 16, padding: '18px 22px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <div>
                      <div style={{ fontFamily: MONO, fontSize: 10, color: '#8F8273', letterSpacing: 2 }}>STRIPE · INSTANT PAYOUT</div>
                      <div style={{ fontFamily: SANS, fontSize: 14, color: HCH.paper, marginTop: 4 }}>Settling to Caixa ••4421</div>
                    </div>
                    <div style={{ fontFamily: SERIF, fontSize: 34 }}>+ €50</div>
                  </div>
                );
              })()}

              {/* Running tally */}
              {(() => {
                const r = clamp((localTime - 6.3) / 0.8, 0, 1);
                const valSarah = clamp((localTime - 1.6) / 0.7, 0, 1) > 0.3 ? 32 : 0;
                const valTomas = clamp((localTime - 3.0) / 0.7, 0, 1) > 0.3 ? 18 : 0;
                const total = valSarah + valTomas;
                return (
                  <div style={{
                    opacity: r, transform: `translateY(${(1-r)*-12}px)`,
                    marginTop: 18, textAlign: 'right',
                    fontFamily: SANS, fontSize: 13, color: HCH.mute,
                  }}>
                    This week so far · <span style={{ color: HCH.ink, fontWeight: 600 }}>€{total}</span>
                  </div>
                );
              })()}
            </div>

            <div style={{ position:'absolute', left: 110, bottom: 90 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, color: HCH.mute, letterSpacing: 2 }}>02 · BOOKINGS</div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ── Scene 4 · 28.0–40.0s · Customer booking flow (3 clicks) ───────────────
function Scene4Customer() {
  // Stage A 0–3.5: pick service · B 3.5–7.0: pick time · C 7.0–11.5: paid
  return (
    <Sprite start={28} end={40}>
      {({ localTime }) => {
        const enter = Easing.easeOutCubic(clamp(localTime / 0.5, 0, 1));
        const exit = clamp((localTime - 11.3) / 0.7, 0, 1);
        const op = enter * (1 - Easing.easeInCubic(exit));
        const step = localTime < 3.5 ? 1 : localTime < 7.0 ? 2 : 3;
        return (
          <div style={{ position:'absolute', inset: 0, background: HCH.cream, opacity: op }}>
            <div style={{ position:'absolute', left: 110, top: 110 }}>
              <MonoTag>From a customer's phone</MonoTag>
              <div style={{ fontFamily: SERIF, fontSize: 72, color: HCH.ink, lineHeight: 1.05, marginTop: 18, letterSpacing: '-.015em', maxWidth: 760 }}>
                Three taps.<br/>Maya gets paid.
              </div>
              <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 460 }}>
                {[
                  { n: 1, label: 'Pick a service' },
                  { n: 2, label: 'Pick a time' },
                  { n: 3, label: 'Pay with Apple Pay' },
                ].map((s, i) => {
                  const active = step >= s.n;
                  return (
                    <div key={i} style={{
                      display: 'flex', gap: 14, alignItems: 'center',
                      fontFamily: SANS, fontSize: 22, color: active ? HCH.ink : HCH.mute,
                      transition: 'color .3s',
                    }}>
                      <span style={{
                        width: 36, height: 36, borderRadius: 18,
                        background: active ? HCH.ink : 'transparent',
                        border: `1.5px solid ${active ? HCH.ink : HCH.rule}`,
                        color: active ? HCH.paper : HCH.mute,
                        display: 'flex', alignItems:'center', justifyContent:'center',
                        fontFamily: MONO, fontSize: 14,
                      }}>{s.n}</span>
                      {s.label}
                      {step === s.n && <span style={{ color: HCH.pink, fontFamily: MONO, fontSize: 12, letterSpacing: 1 }}>NOW</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            <Phone x={1240} y={110} scale={.95}>
              <CustomerBookingPhone t={localTime} />
            </Phone>

            <div style={{ position:'absolute', left: 110, bottom: 90 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, color: HCH.mute, letterSpacing: 2 }}>03 · CONVERSION</div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

function CustomerBookingPhone({ t }) {
  // t = localTime within scene (0..12)
  const stage = t < 3.5 ? 'A' : t < 7.0 ? 'B' : 'C';
  return (
    <div style={{ padding: '4px 18px 20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ fontFamily: SERIF, fontSize: 20, color: HCH.ink, lineHeight: 1.05 }}>Casa do Café<br/><span style={{ fontFamily: SANS, fontSize: 11, color: HCH.mute, letterSpacing: 1, textTransform: 'uppercase' }}>Lisbon · Príncipe Real</span></div>
        <div style={{ width: 34, height: 34, borderRadius: 17, background: 'linear-gradient(140deg,#F3DFCF,#B8825A)' }} />
      </div>

      {stage === 'A' && (
        <div>
          <div style={{ fontFamily: SANS, fontSize: 12, color: HCH.mute, marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase' }}>Book a service</div>
          {[
            { t: 'Pour-over tasting', d: '45 min', p: '€32', highlight: t > 2.4 },
            { t: 'Beans subscription', d: '250g · weekly', p: '€18' },
            { t: 'Espresso class', d: '90 min', p: '€55' },
          ].map((s,i)=>(
            <div key={i} style={{
              padding: '14px 14px',
              border: `1.5px solid ${s.highlight ? HCH.ink : HCH.rule}`,
              background: s.highlight ? HCH.peach : '#fff',
              borderRadius: 14, marginBottom: 10,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              transition: 'all .3s',
            }}>
              <div>
                <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: HCH.ink }}>{s.t}</div>
                <div style={{ fontFamily: SANS, fontSize: 12, color: HCH.mute }}>{s.d}</div>
              </div>
              <div style={{ fontFamily: SERIF, fontSize: 20, color: HCH.ink }}>{s.p}</div>
            </div>
          ))}
        </div>
      )}

      {stage === 'B' && (
        <div>
          <div style={{ fontFamily: SANS, fontSize: 12, color: HCH.mute, marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase' }}>Pick a time</div>
          <div style={{ fontFamily: SANS, fontSize: 13, color: HCH.ink, marginBottom: 12 }}>Saturday 18 · April</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8 }}>
            {['10:00','11:00','12:00','14:00','15:00','16:00'].map((s,i)=>{
              const isPick = i === 3 && t > 5.5;
              return (
                <div key={s} style={{
                  padding: '14px 0', textAlign:'center',
                  border: `1.5px solid ${isPick ? HCH.ink : HCH.rule}`,
                  background: isPick ? HCH.ink : '#fff',
                  color: isPick ? HCH.paper : HCH.ink,
                  borderRadius: 12, fontFamily: SANS, fontSize: 15,
                  transition: 'all .3s',
                }}>{s}</div>
              );
            })}
          </div>
        </div>
      )}

      {stage === 'C' && (
        <div style={{ flex:1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: SANS, fontSize: 12, color: HCH.mute, marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase' }}>Review</div>
          <div style={{ padding: '14px', border: `1px solid ${HCH.rule}`, background: '#fff', borderRadius: 14, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: SANS, fontSize: 14, color: HCH.ink2 }}>Pour-over tasting</span>
              <span style={{ fontFamily: SANS, fontSize: 14, color: HCH.ink2 }}>€32</span>
            </div>
            <div style={{ fontFamily: SANS, fontSize: 13, color: HCH.mute }}>Sat 18 Apr · 14:00 · 45 min</div>
            <div style={{ borderTop: `1px solid ${HCH.rule}`, marginTop: 10, paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: SANS, fontSize: 14, color: HCH.ink, fontWeight: 600 }}>Total</span>
              <span style={{ fontFamily: SERIF, fontSize: 22, color: HCH.ink }}>€32</span>
            </div>
          </div>

          {(() => {
            const paying = t < 9.2;
            const done = t > 9.5;
            return (
              <div style={{
                marginTop: 'auto', padding: '16px',
                background: done ? HCH.sage : '#000', color: done ? HCH.sageInk : '#fff',
                borderRadius: 14, textAlign: 'center',
                fontFamily: SANS, fontSize: 16, fontWeight: 600,
                transition: 'all .3s',
              }}>
                {done ? '✓ Paid · Confirmation sent' : (paying ? ' Pay €32' : '⟳ Processing…')}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

// ── Scene 5 · 40.0–54.0s · Campaign generation ────────────────────────────
function Scene5Campaign() {
  return (
    <Sprite start={40} end={54}>
      {({ localTime }) => {
        const enter = Easing.easeOutCubic(clamp(localTime / 0.5, 0, 1));
        const exit = clamp((localTime - 13.3) / 0.7, 0, 1);
        const op = enter * (1 - Easing.easeInCubic(exit));
        // Phases: 0–2 prompt typing, 2–5 shimmer, 5–10 post reveal, 10–14 hold
        const phase = localTime < 2 ? 'type' : localTime < 5 ? 'shimmer' : 'post';
        return (
          <div style={{ position:'absolute', inset: 0, background: HCH.paper, opacity: op }}>
            <div style={{ position:'absolute', left: 110, top: 110 }}>
              <MonoTag>18:48 · Closing the till</MonoTag>
              <div style={{ fontFamily: SERIF, fontSize: 72, color: HCH.ink, lineHeight: 1.05, marginTop: 18, letterSpacing: '-.015em', maxWidth: 720 }}>
                One sentence in.<br/>
                A full campaign out.
              </div>
              <div style={{ marginTop: 28, fontFamily: SANS, fontSize: 20, color: HCH.ink2, lineHeight: 1.5, maxWidth: 540 }}>
                Atlas writes the copy, generates the image, schedules<br/>across 4 networks and auto-boosts the winner on Meta.
              </div>
            </div>

            <Laptop x={1080} y={140} scale={0.78}>
              <div style={{ padding: '20px 24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* prompt bar */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18 }}>
                  <span style={{ width: 22, height: 22, borderRadius: 11, background: 'linear-gradient(140deg,#F3DFCF,#B8825A)' }} />
                  <div style={{
                    flex: 1, padding: '12px 14px',
                    border: `1.5px solid ${HCH.rule}`, borderRadius: 12, background: '#fff',
                    fontFamily: SANS, fontSize: 14, color: HCH.ink, minHeight: 40,
                  }}>
                    <TypewriterText
                      text="Launch the Saturday tasting — friendly, Lisbon vibe, push to bookings."
                      startTime={0.3} endTime={1.8} t={localTime}
                    />
                    {localTime < 1.9 && <span style={{ display: 'inline-block', width: 2, height: 16, background: HCH.ink, verticalAlign: '-3px', marginLeft: 2, opacity: Math.floor(localTime*3)%2 }}/>}
                  </div>
                </div>

                {/* output */}
                {phase === 'shimmer' && (
                  <div style={{ flex: 1, display:'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    {[0,1].map(i => (
                      <div key={i} style={{
                        background: `linear-gradient(110deg, ${HCH.rule} 30%, #fff 50%, ${HCH.rule} 70%)`,
                        backgroundSize: '200% 100%',
                        backgroundPosition: `${((localTime-2)*-80) % 200}% 0`,
                        borderRadius: 12, height: '100%',
                      }}/>
                    ))}
                  </div>
                )}

                {phase === 'post' && <CampaignPosts t={localTime - 5} />}
              </div>
            </Laptop>

            <div style={{ position:'absolute', left: 110, bottom: 90 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, color: HCH.mute, letterSpacing: 2 }}>04 · CAMPAIGN</div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

function TypewriterText({ text, startTime, endTime, t }) {
  const p = clamp((t - startTime) / (endTime - startTime), 0, 1);
  const chars = Math.floor(text.length * p);
  return <span>{text.slice(0, chars)}</span>;
}

function CampaignPosts({ t }) {
  // t = seconds since reveal
  const platforms = [
    { name: 'Instagram', tone: '#F4E3E0', meta: '12.4K reach · 3.8% CTR' },
    { name: 'TikTok',    tone: '#D9E2EE', meta: '21.6K reach · 5.4% CTR' },
    { name: 'Facebook',  tone: '#E8EDD9', meta: '8.1K reach · 2.1% CTR' },
    { name: 'LinkedIn',  tone: '#F1ECE3', meta: '3.2K reach · 4.2% CTR' },
  ];
  return (
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      {platforms.map((p, i) => {
        const reveal = Easing.easeOutCubic(clamp((t - i * 0.3) / 0.5, 0, 1));
        const boost = i === 1; // TikTok auto-boosted
        return (
          <div key={p.name} style={{
            opacity: reveal, transform: `translateY(${(1-reveal)*10}px) scale(${0.96 + 0.04*reveal})`,
            background: '#fff', border: `1px solid ${HCH.rule}`, borderRadius: 12,
            padding: 12, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ height: 96, borderRadius: 8, background: p.tone, marginBottom: 10, position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: SERIF, fontSize: 18, color: HCH.ink, textAlign: 'center', padding: 10, lineHeight: 1.15,
              }}>
                Pour-over Saturdays<br/>
                <span style={{ fontFamily: SANS, fontSize: 10, color: HCH.ink2, letterSpacing: 1, textTransform: 'uppercase' }}>Casa do Café · Lisboa</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: SANS, fontSize: 12, color: HCH.ink, fontWeight: 500 }}>{p.name}</span>
              {boost && t > 2.5 && (
                <span style={{
                  fontFamily: MONO, fontSize: 9, letterSpacing: 1,
                  background: HCH.ink, color: HCH.paper, padding: '3px 6px', borderRadius: 3,
                }}>AUTO-BOOSTED</span>
              )}
            </div>
            <div style={{ fontFamily: SANS, fontSize: 11, color: HCH.mute, marginTop: 2 }}>{p.meta}</div>
          </div>
        );
      })}
    </div>
  );
}

// ── Scene 6 · 54.0–66.0s · Site rebuild from prompt ───────────────────────
function Scene6Site() {
  return (
    <Sprite start={54} end={66}>
      {({ localTime }) => {
        const enter = Easing.easeOutCubic(clamp(localTime / 0.5, 0, 1));
        const exit = clamp((localTime - 11.3) / 0.7, 0, 1);
        const op = enter * (1 - Easing.easeInCubic(exit));
        // Phases: 0–2 site v1 · 2–4 type prompt · 4–6 morph · 6–12 site v2
        return (
          <div style={{ position:'absolute', inset: 0, background: HCH.cream, opacity: op }}>
            <div style={{ position:'absolute', left: 110, top: 110 }}>
              <MonoTag>21:18 · After hours</MonoTag>
              <div style={{ fontFamily: SERIF, fontSize: 72, color: HCH.ink, lineHeight: 1.05, marginTop: 18, letterSpacing: '-.015em', maxWidth: 720 }}>
                "Make it feel cozier,<br/>more like Lisbon."
              </div>
              <div style={{ marginTop: 28, fontFamily: SANS, fontSize: 20, color: HCH.ink2, lineHeight: 1.5, maxWidth: 540 }}>
                She talks to her website like a designer.<br/>It rebuilds itself in seconds — copy, palette, layout, photography.
              </div>
            </div>

            <Laptop x={1060} y={130} scale={0.82}>
              <SiteMorph t={localTime} />
            </Laptop>

            <div style={{ position:'absolute', left: 110, bottom: 90 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, color: HCH.mute, letterSpacing: 2 }}>05 · SITE</div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

function SiteMorph({ t }) {
  // v1 design — clinical / corporate
  // v2 design — warm / Lisbon
  const morphStart = 4.2, morphEnd = 6.0;
  const m = Easing.easeInOutCubic(clamp((t - morphStart) / (morphEnd - morphStart), 0, 1));

  // crossfade between two designs
  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Prompt bar at top */}
      {t > 1.8 && t < 4.5 && (
        <div style={{
          position: 'absolute', left: 16, top: 12, right: 16, zIndex: 4,
          background: HCH.ink, color: HCH.paper, borderRadius: 12,
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
          opacity: clamp((t - 1.8) / 0.4, 0, 1) * (1 - clamp((t - 4.2)/0.3, 0, 1)),
          boxShadow: HCH.shadow,
        }}>
          <span style={{ fontFamily: MONO, fontSize: 10, color: '#8F8273', letterSpacing: 1 }}>PROMPT</span>
          <span style={{ fontFamily: SANS, fontSize: 14 }}>
            <TypewriterText text="make it feel cozier, more like Lisbon" startTime={2.0} endTime={3.6} t={t} />
          </span>
        </div>
      )}

      {/* v1 (corporate) */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 1 - m,
        background: '#fff', padding: 30,
      }}>
        <div style={{ fontFamily: SANS, fontSize: 12, color: HCH.mute, letterSpacing: 2, marginBottom: 12 }}>CASA DO CAFÉ</div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 36, color: HCH.ink, lineHeight: 1.1 }}>
          Specialty coffee.<br/>Now in Lisbon.
        </div>
        <div style={{ background: '#EFEAE0', height: 140, marginTop: 24, borderRadius: 4 }} />
        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[0,1,2].map(i => <div key={i} style={{ background: '#EFEAE0', height: 80, borderRadius: 4 }}/>)}
        </div>
      </div>

      {/* v2 (cozy Lisbon) */}
      <div style={{
        position: 'absolute', inset: 0, opacity: m,
        background: 'linear-gradient(160deg, #F4E3E0 0%, #F1ECE3 100%)', padding: 30,
      }}>
        <div style={{ fontFamily: MONO, fontSize: 11, color: HCH.sageInk, letterSpacing: 3, marginBottom: 12 }}>CASA DO CAFÉ · PRÍNCIPE REAL</div>
        <div style={{ fontFamily: SERIF, fontSize: 52, color: HCH.ink, lineHeight: 1.0, letterSpacing: '-.01em' }}>
          A slow coffee bar.<br/>
          <span style={{ fontStyle: 'italic', color: '#8B5A3C' }}>Right where the trams stop.</span>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #B8825A 0%, #6B4226 100%)',
          height: 140, marginTop: 22, borderRadius: 14,
          display: 'flex', alignItems: 'flex-end', padding: 14,
          fontFamily: SERIF, fontStyle: 'italic', fontSize: 18, color: HCH.paper,
        }}>
          "Best pour-over in the bairro" — Tomás, regular
        </div>
        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {['linear-gradient(140deg,#F3DFCF,#B8825A)', 'linear-gradient(140deg,#E8EDD9,#6B4226)', 'linear-gradient(140deg,#F4E3E0,#8B5A3C)'].map((g,i) =>
            <div key={i} style={{ background: g, height: 80, borderRadius: 12 }}/>
          )}
        </div>
        <div style={{
          marginTop: 16, padding: '10px 14px', background: HCH.ink, color: HCH.paper,
          borderRadius: 999, width: 'fit-content', fontFamily: SANS, fontSize: 13,
        }}>Book a tasting →</div>
      </div>

      {/* PUBLISHED toast */}
      {t > 6.5 && (
        <div style={{
          position: 'absolute', right: 16, top: 14,
          background: HCH.sage, color: HCH.sageInk,
          padding: '8px 14px', borderRadius: 999,
          fontFamily: MONO, fontSize: 10, letterSpacing: 2,
          opacity: clamp((t - 6.5)/0.4, 0, 1),
        }}>✓ PUBLISHED IN 4.2S</div>
      )}
    </div>
  );
}

// ── Scene 7 · 66.0–80.0s · Metrics grow ────────────────────────────────────
function Scene7Metrics() {
  return (
    <Sprite start={66} end={80}>
      {({ localTime }) => {
        const enter = Easing.easeOutCubic(clamp(localTime / 0.5, 0, 1));
        const exit = clamp((localTime - 13.3) / 0.7, 0, 1);
        const op = enter * (1 - Easing.easeInCubic(exit));
        // Counters run 1.0 → 12.0
        const week = localTime < 4 ? 1 : localTime < 8 ? 2 : 4;
        const p = clamp((localTime - 1.0) / 10, 0, 1);
        const rev   = Math.floor(interpolate([0, 0.4, 0.8, 1], [0, 280, 1100, 1820], Easing.easeOutCubic)(p));
        const book  = Math.floor(interpolate([0, 0.4, 0.8, 1], [0, 6, 14, 23],       Easing.easeOutCubic)(p));
        const visit = Math.floor(interpolate([0, 0.4, 0.8, 1], [38, 412, 1280, 2140], Easing.easeOutCubic)(p));
        return (
          <div style={{ position:'absolute', inset: 0, background: HCH.ink, color: HCH.paper, opacity: op }}>
            {/* faint grid */}
            <div style={{
              position:'absolute', inset: 0, opacity: .08,
              backgroundImage: `linear-gradient(${HCH.tan} 1px, transparent 1px), linear-gradient(90deg, ${HCH.tan} 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }}/>

            <div style={{ position:'absolute', left: 110, top: 110 }}>
              <MonoTag style={{ color: HCH.tan }}>Maya's first month</MonoTag>
              <div style={{ fontFamily: SERIF, fontSize: 88, color: HCH.paper, lineHeight: 1.02, marginTop: 18, letterSpacing: '-.02em', maxWidth: 1200 }}>
                From nothing to a<br/>
                <span style={{ fontStyle: 'italic', color: HCH.tan }}>real business —</span> in 4 weeks.
              </div>
            </div>

            <div style={{ position: 'absolute', left: 110, right: 110, top: 470, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40 }}>
              {[
                { label: 'WEEKLY REVENUE', value: `€${rev.toLocaleString()}`, sub: '€0 → €1,820' },
                { label: 'WEEKLY BOOKINGS', value: `${book}`, sub: '0 → 23' },
                { label: 'SITE VISITORS',  value: `${visit.toLocaleString()}`, sub: '38 → 2,140' },
              ].map((m, i) => (
                <div key={i} style={{
                  borderTop: `1px solid ${HCH.tan}`,
                  paddingTop: 18,
                }}>
                  <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: 3, color: HCH.tan, marginBottom: 14 }}>{m.label}</div>
                  <div style={{ fontFamily: SERIF, fontSize: 116, color: HCH.paper, lineHeight: 1, letterSpacing: '-.02em', fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
                  <div style={{ fontFamily: MONO, fontSize: 13, color: HCH.tan, marginTop: 12 }}>{m.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ position:'absolute', left: 110, bottom: 70, fontFamily: SANS, fontSize: 18, color: HCH.tan }}>
              <span style={{ color: HCH.paper, fontWeight: 600 }}>Week {week}</span> · No paid ads · No marketer · No code
            </div>

            <div style={{ position:'absolute', right: 110, bottom: 70 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, color: HCH.tan, letterSpacing: 2 }}>06 · OUTCOME</div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ── Scene 8 · 80.0–90.0s · Proof + end card ───────────────────────────────
function Scene8End() {
  return (
    <Sprite start={80} end={90}>
      {({ localTime }) => {
        // 0–2.5 proof beat · 2.5–10 end card
        const phase = localTime < 2.8 ? 'proof' : 'end';
        return (
          <div style={{ position:'absolute', inset: 0, background: HCH.cream }}>
            {phase === 'proof' && (() => {
              const r = Easing.easeOutCubic(clamp(localTime / 0.6, 0, 1));
              const exit = clamp((localTime - 2.4) / 0.4, 0, 1);
              const op = r * (1 - Easing.easeInCubic(exit));
              return (
                <div style={{
                  position:'absolute', inset: 0, opacity: op,
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                }}>
                  <MonoTag>Already validated</MonoTag>
                  <div style={{
                    fontFamily: SERIF, fontSize: 220, color: HCH.ink, lineHeight: 1, marginTop: 16,
                    letterSpacing: '-.03em', fontVariantNumeric: 'tabular-nums',
                  }}>3,000+</div>
                  <div style={{ fontFamily: SANS, fontSize: 30, color: HCH.ink2, marginTop: 12 }}>founders signed up to our private beta.</div>
                </div>
              );
            })()}

            {phase === 'end' && (() => {
              const lt = localTime - 2.8;
              const r1 = Easing.easeOutCubic(clamp(lt / 0.8, 0, 1));
              const r2 = Easing.easeOutCubic(clamp((lt - 0.4) / 1.0, 0, 1));
              const r3 = Easing.easeOutCubic(clamp((lt - 1.4) / 1.0, 0, 1));
              const r4 = Easing.easeOutCubic(clamp((lt - 2.6) / 1.0, 0, 1));
              return (
                <div style={{
                  position:'absolute', inset: 0,
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                  background: HCH.cream,
                }}>
                  <div style={{
                    opacity: r1, transform: `translateY(${(1-r1)*16}px)`,
                  }}>
                    <Logo size={42} />
                  </div>
                  <div style={{
                    opacity: r2, transform: `translateY(${(1-r2)*16}px)`,
                    marginTop: 48, fontFamily: SERIF, fontSize: 96,
                    color: HCH.ink, letterSpacing: '-.02em', textAlign: 'center', lineHeight: 1.0,
                    maxWidth: 1500,
                  }}>
                    All-in-one AI to launch<br/>
                    <span style={{ fontStyle: 'italic' }}>and grow small businesses.</span>
                  </div>
                  <div style={{
                    opacity: r3, transform: `translateY(${(1-r3)*12}px)`,
                    marginTop: 48,
                    display: 'flex', gap: 36, fontFamily: SANS, fontSize: 16, color: HCH.ink2,
                  }}>
                    <span>Mentor-guided</span>
                    <span style={{ color: HCH.tan }}>·</span>
                    <span>AI-operated</span>
                    <span style={{ color: HCH.tan }}>·</span>
                    <span>$49/month</span>
                  </div>
                  <div style={{
                    opacity: r4, transform: `translateY(${(1-r4)*10}px)`,
                    position: 'absolute', bottom: 70,
                    fontFamily: MONO, fontSize: 13, letterSpacing: 4, color: HCH.mute,
                  }}>HATCHERS.AI</div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </Sprite>
  );
}

// ── Reel root ──────────────────────────────────────────────────────────────
function Reel() {
  return (
    <Stage width={1920} height={1080} duration={90} background={HCH.cream}
           fps={60} loop={true} autoplay={true} persistKey="hatchers-reel">
      <Scene1Open />
      <Scene2Brief />
      <Scene3Bookings />
      <Scene4Customer />
      <Scene5Campaign />
      <Scene6Site />
      <Scene7Metrics />
      <Scene8End />

      {/* Persistent watermark — top-left */}
      <div style={{
        position: 'absolute', top: 40, left: 110,
        fontFamily: MONO, fontSize: 11, letterSpacing: 3, color: HCH.mute,
        zIndex: 100, pointerEvents: 'none',
      }}>HATCHERS · INVESTOR REEL</div>
    </Stage>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Reel />);
