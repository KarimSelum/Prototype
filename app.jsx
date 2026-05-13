// Main page
const { useState, useEffect, useRef } = React;

const TOOLS = [
{ id: 'campaign', label: 'Social Campaigns', sub: 'Generate → post → boost', Mock: MockCampaign,
  url: 'hatchers.ai/os/campaigns',
  headline: 'An end-to-end social campaign, from blank page to boosted ad.',
  body: 'Type a goal. Atlas writes the copy, generates the post image from scratch, schedules across Instagram, Facebook, TikTok and LinkedIn — then boosts the winners through Meta automatically. You approve, it ships.',
  bullets: ['Image + copy generated from brand voice', 'Scheduled across 4 networks', 'Auto-boost based on first-6-hour CTR', 'One dashboard for every channel'] },
{ id: 'site', label: 'Website Builder', sub: 'Prompt to published site', Mock: MockSite,
  url: 'hatchers.ai/os/site',
  headline: 'A real website, from a sentence.',
  body: 'Describe your business. Get a designed, editable, hostable site with copy, imagery, shop, forms and booking — already wired up. Edit by clicking. Publish to your own domain.',
  bullets: ['Designer-quality layouts, not templates', 'AI-composed imagery on brand', 'SEO + analytics included', 'Publish to your domain in minutes'] },
{ id: 'booking', label: 'Booking & Payments', sub: 'Calendar, Stripe, one place', Mock: MockBooking,
  url: 'hatchers.ai/os/bookings',
  headline: 'Take bookings and payments without stitching three tools together.',
  body: 'One link you can paste anywhere. Customers pick a time, pay, and get a confirmation. You get a calendar that reflects reality and payouts that land in your bank.',
  bullets: ['Services, packages, memberships', 'Stripe payouts built-in', 'Reminders + rescheduling handled', 'Tax + invoicing generated'] },
{ id: 'network', label: 'Founder Network', sub: 'Peers at your stage', Mock: MockNetwork,
  url: 'hatchers.ai/os/community',
  headline: 'A social network of founders building at the same phase as you.',
  body: 'Private spaces matched to your cohort, your stage, and your industry. Not a Discord full of noise — a quieter room where the advice actually applies to your situation this week.',
  bullets: ['Matched by stage, industry, and goals', 'Personalized roadmap — focused on one thing: getting you to your first paying customers', 'Weekly office hours with mentors', 'Accountability loops with your cohort'] }];


function Pill({ children, variant = 'outline', style = {} }) {
  const [hover, setHover] = useState(false);
  const base = { padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 400, letterSpacing: .2, display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', transition: 'all .15s', whiteSpace: 'nowrap' };
  const styles = {
    outline: { border: '1px solid #1E1A15', color: '#1E1A15', background: 'transparent' },
    solid: { border: '1px solid #1E1A15', color: '#fff', background: '#1E1A15' },
    dark: { border: '1px solid #5A4E3F', color: '#fff', background: '#5A4E3F' },
    ghost: { border: '1px solid #D9D1C2', color: '#1E1A15', background: 'transparent' }
  };
  const hoverStyle = hover ? { opacity: .9 } : {};
  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...styles[variant], ...hoverStyle, ...style }}>
      {hover ? 'Coming soon' : children}
    </span>
  );
}

function Header() {
  return (
    <>
      <div style={{ background: '#F4E3E0', height: 32, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 36px', gap: 14, color: '#1E1A15' }}>
        <Icon.Instagram size={14} /><Icon.Facebook size={14} /><Icon.LinkedIn size={14} />
      </div>
      <header style={{ background: '#B8A890', padding: '16px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 700, letterSpacing: 1, fontSize: 18, color: '#1E1A15' }}>
          HATCHERS <span style={{ color: '#E91E63' }}>AI</span>
        </div>
        <nav style={{ display: 'flex', gap: 32, fontSize: 14, color: '#1E1A15' }}>
          <a>Home</a>
          <a>Why Hatchers?</a>
          <a style={{ position: 'relative' }}>
            AI Tools
            <span style={{ position: 'absolute', left: 0, right: 0, bottom: -6, height: 1, background: '#1E1A15' }} />
          </a>
          <a>About us</a>
          <a>Testimonials</a>
          <a>FAQ</a>
        </nav>
      </header>
    </>);

}

function Hero() {
  return (
    <section style={{ background: '#F1ECE3', padding: '72px 36px 120px', textAlign: 'center', position: 'relative' }}>
      <div style={{ maxWidth: 880, margin: '0 auto 56px', textAlign: 'left', border: '1px solid #1E1A15', background: '#FAF7F0', borderRadius: 14, padding: '28px 32px 30px', position: 'relative' }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: 3, color: '#8F8273', marginBottom: 14 }}>IS THIS YOU?</div>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: '#1E1A15', margin: 0 }}>
          You built the thing. Maybe in a day. Maybe in a week. Now what? Getting it in front of customers — without paying for ads, without a marketing team, without knowing where to start — <span style={{ borderBottom: '1px solid #1E1A15' }}>that's the hard part</span>. That's exactly what Hatchers solves.
        </p>
      </div>
      <div style={{ display: 'inline-block', padding: '6px 16px', background: '#D9E2EE', borderRadius: 999, fontSize: 13, color: '#3E5266', marginBottom: 36 }}>
        The Hatchers AI OS
      </div>
      <h1 className="serif" style={{ fontSize: 72, lineHeight: 1.02, margin: '0 auto 32px', maxWidth: 1080, fontWeight: 400, color: '#1E1A15', letterSpacing: '-.015em' }}>
        Five AI tools that run your business<br />while you focus on building it.
      </h1>
      <p style={{ maxWidth: 720, margin: '0 auto 44px', fontSize: 17, lineHeight: 1.55, color: '#4A423A' }}>Most founders waste their first year stitching together a marketing agency, a booking tool, a website builder and three newsletters. Hatchers gives you one operating system — built for non-technical founders, all in one place.

      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 70 }}>
        <Pill variant="outline">See the tools</Pill>
        <Pill variant="ghost">Try Atlas free <Icon.Arrow size={14} /></Pill>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', maxWidth: 900, margin: '0 auto', fontSize: 14, color: '#4A423A' }}>
        <span>Built for non-technical founders</span>
        <span>One login, one bill</span>
        <span>Included in $49/month</span>
      </div>
      {/* divider gradient like program page */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,#B8A890,#D9C8B8,#D4B5B0,#C0A8B8,#B8B0C4,#A8B0C4,#B8A890)' }} />
    </section>);

}

function DistributionSection() {
  return (
    <section style={{ background: '#1E1A15', color: '#FAF7F0', padding: '110px 36px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: 3, color: '#B8A890', marginBottom: 16 }}>THE NEW BOTTLENECK</div>
          <h2 className="serif" style={{ fontSize: 56, lineHeight: 1.04, margin: 0, fontWeight: 400, letterSpacing: '-.01em' }}>
            Code is getting solved.<br />
            <span style={{ color: '#B8A890' }}>Distribution isn't.</span>
          </h2>
        </div>
        <div>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#D9D1C2', margin: '0 0 22px' }}>
            Anyone can vibe-code an MVP today. The challenge was never building — it was getting customers.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#D9D1C2', margin: 0 }}>
            Hatchers gives you the complete system: <span style={{ color: '#FAF7F0', borderBottom: '1px solid #5A4E3F' }}>market intelligence</span>, a <span style={{ color: '#FAF7F0', borderBottom: '1px solid #5A4E3F' }}>step-by-step campaign</span>, and <span style={{ color: '#FAF7F0', borderBottom: '1px solid #5A4E3F' }}>AI agents that run execution</span> for you — so you get to customers without paid ads and without figuring it all out alone.
          </p>
        </div>
      </div>
    </section>);

}

function ToolSwitcher() {
  const [active, setActive] = useState(0);
  const t = TOOLS[active];
  const M = t.Mock;

  return (
    <section style={{ background: '#FAF7F0', padding: '96px 36px 110px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: 3, color: '#8F8273', marginBottom: 12 }}>THE TOOLS</div>
          <h2 className="serif" style={{ fontSize: 56, lineHeight: 1.05, margin: '0 auto 20px', maxWidth: 1000 }}>
            AI Agents That Run Your Customer Acquisition
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: '#4A423A', maxWidth: 720, margin: '0 auto' }}>
            We automate your outreach, content, and follow-up — end-to-end. Built for founders who don't want to touch 10 different tools.
          </p>
        </div>

        {/* Tab rail */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #E3DCCE', marginBottom: 40, overflow: 'auto' }}>
          {TOOLS.map((tool, i) =>
          <button key={tool.id} onClick={() => setActive(i)} style={{
            background: 'none', border: 'none', padding: '18px 24px', textAlign: 'left',
            borderBottom: '2px solid ' + (i === active ? '#1E1A15' : 'transparent'),
            marginBottom: -1, flex: '1 1 0', minWidth: 180
          }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: 2, color: '#8F8273', marginBottom: 4 }}>
                0{i + 1}
              </div>
              <div style={{ fontSize: 16, color: i === active ? '#1E1A15' : '#5A4E3F', fontWeight: i === active ? 500 : 400, marginBottom: 2 }}>
                {tool.label}
              </div>
              <div style={{ fontSize: 12, color: '#8F8273' }}>{tool.sub}</div>
            </button>
          )}
        </div>

        {/* Active tool: copy + mock */}
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 56, alignItems: 'center' }}>
          <div>
            <h3 className="serif" style={{ fontSize: 40, lineHeight: 1.1, margin: '0 0 20px', fontWeight: 400 }}>
              {t.headline}
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: '#4A423A', margin: '0 0 24px' }}>
              {t.body}
            </p>
            <div style={{ borderTop: '1px solid #E3DCCE' }}>
              {t.bullets.map((b, i) =>
              <div key={i} style={{ padding: '14px 0', borderBottom: '1px solid #E3DCCE', display: 'flex', alignItems: 'center', gap: 14, fontSize: 14, color: '#1E1A15' }}>
                  <span className="mono" style={{ fontSize: 10, color: '#8F8273', letterSpacing: 1, minWidth: 24 }}>0{i + 1}</span>
                  {b}
                </div>
              )}
            </div>
            <div style={{ marginTop: 28 }}>
              <Pill variant="outline">See this in action <Icon.Arrow size={14} /></Pill>
            </div>
          </div>
          <div>
            <ChromeFrame url={t.url}>
              <M />
            </ChromeFrame>
          </div>
        </div>
      </div>
    </section>);

}

function AtlasSection() {
  return (
    <section style={{ background: '#F1ECE3', padding: '110px 36px 120px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: 3, color: '#8F8273', marginBottom: 12 }}>05 · THE DIFFERENCE</div>
            <h2 className="serif" style={{ fontSize: 60, lineHeight: 1.02, margin: '0 0 24px', fontWeight: 400 }}>
              Meet Atlas.<br />Your AI cofounder.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: '#4A423A', margin: '0 0 20px' }}>
              Atlas is the layer that ties it all together. It knows your calendar, your pipeline, your goals, and the launch plan your mentor built with you.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: '#4A423A', margin: '0 0 32px' }}>
              Ask it anything — "what should I focus on today?", "draft the follow-ups", "what's working and what isn't?" — and it moves through your tools to get it done.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid #D9D1C2', borderRadius: 8, overflow: 'hidden', marginBottom: 28 }}>
              {[
              { t: 'Reads your context', s: 'Calendar, CRM, website traffic, campaigns' },
              { t: 'Writes + drafts', s: 'Emails, posts, pitches, plans' },
              { t: 'Acts across tools', s: 'Schedules, publishes, follows up' },
              { t: 'Reports back', s: 'Daily brief. What moved. What\'s stuck.' }].
              map((c, i) =>
              <div key={i} style={{ padding: '18px 18px', borderRight: i % 2 === 0 ? '1px solid #D9D1C2' : 'none', borderBottom: i < 2 ? '1px solid #D9D1C2' : 'none', background: '#FAF7F0' }}>
                  <div style={{ fontSize: 14, color: '#1E1A15', fontWeight: 500, marginBottom: 4 }}>{c.t}</div>
                  <div style={{ fontSize: 12, color: '#7A7165', lineHeight: 1.45 }}>{c.s}</div>
                </div>
              )}
            </div>
            <Pill variant="dark">Start with Atlas <Icon.Arrow size={14} /></Pill>
          </div>
          <div>
            <MockAtlas />
          </div>
        </div>
      </div>
    </section>);

}

function Replaces() {
  const items = [
  { tool: 'Hootsuite / Buffer', cost: '$99/mo', category: 'Social scheduling' },
  { tool: 'Canva Pro', cost: '$15/mo', category: 'Creative' },
  { tool: 'Meta Ads manager', cost: 'hours/week', category: 'Ads' },
  { tool: 'Squarespace / Webflow', cost: '$30/mo', category: 'Website' },
  { tool: 'Calendly + Stripe', cost: '$24/mo', category: 'Bookings' },
  { tool: 'Mighty Networks / Slack', cost: '$39/mo', category: 'Community' },
  { tool: 'A freelance marketer', cost: '$1,500/campaign', category: 'Campaigns' },
  { tool: 'A VA for follow-ups', cost: '$800/mo', category: 'Admin' }];

  return (
    <section style={{ background: '#FAF7F0', padding: '96px 36px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 56, alignItems: 'flex-start' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: 3, color: '#8F8273', marginBottom: 12 }}>WHAT HATCHERS REPLACES</div>
            <h2 className="serif" style={{ fontSize: 52, lineHeight: 1.05, margin: '0 0 20px', fontWeight: 400 }}>
              Stop paying for eight things that don't talk to each other.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: '#4A423A', margin: '0 0 28px' }}>
              Most founders spend $300–$600 a month on a zoo of tools that each do one thing, none of them well enough, and none of them connected.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: '#1E1A15', margin: 0 }}>
              Hatchers replaces the stack. <span style={{ borderBottom: '1px solid #1E1A15' }}>One login. One bill. $49/month.</span>
            </p>
          </div>
          <div style={{ background: '#F1ECE3', border: '1px solid #E3DCCE', borderRadius: 10, padding: '4px 24px' }}>
            {items.map((it, i) =>
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr auto', alignItems: 'center', padding: '16px 0', borderBottom: i < items.length - 1 ? '1px solid #E3DCCE' : 'none', gap: 16 }}>
                <div style={{ fontSize: 14, color: '#1E1A15', textDecoration: 'line-through', textDecorationColor: '#B8A890', textDecorationThickness: 1 }}>{it.tool}</div>
                <div className="mono" style={{ fontSize: 11, color: '#8F8273', letterSpacing: 1 }}>{it.category.toUpperCase()}</div>
                <div style={{ fontSize: 13, color: '#8F8273' }}>{it.cost}</div>
              </div>
            )}
            <div style={{ padding: '22px 0 18px', borderTop: '2px solid #1E1A15', marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 24 }}>Hatchers AI OS</div>
              <div style={{ fontSize: 16, color: '#1E1A15', fontWeight: 500 }}>$49 / mo</div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function Integrations() {
  const logos = [
  { n: 'Instagram', I: Icon.Instagram },
  { n: 'Facebook', I: Icon.Facebook },
  { n: 'TikTok', I: Icon.TikTok },
  { n: 'LinkedIn', I: Icon.LinkedIn },
  { n: 'Meta Ads', I: Icon.Meta },
  { n: 'Stripe', I: Icon.Stripe },
  { n: 'Google Calendar', I: Icon.Calendar },
  { n: 'Custom domain', I: Icon.Globe }];

  return (
    <section style={{ background: '#F1ECE3', padding: '80px 36px', borderTop: '1px solid #E3DCCE', borderBottom: '1px solid #E3DCCE' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: 3, color: '#8F8273', textAlign: 'center', marginBottom: 28 }}>
          POSTS, PAYS, BOOKS, AND CONNECTS WITH
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 2 }}>
          {logos.map((l, i) =>
          <div key={i} style={{ padding: '22px 8px', textAlign: 'center', color: '#5A4E3F', borderLeft: i ? '1px solid #E3DCCE' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                <l.I size={22} />
              </div>
              <div style={{ fontSize: 11, color: '#7A7165' }}>{l.n}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function Quote() {
  return (
    <section style={{ background: '#FAF7F0', padding: '110px 36px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
        <div className="serif" style={{ fontSize: 44, lineHeight: 1.2, color: '#1E1A15', letterSpacing: '-.005em' }}>

        </div>
        <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(140deg,#F3DFCF,#B8825A)' }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 13, color: '#1E1A15', fontWeight: 500 }}>
</div>
            <div style={{ fontSize: 12, color: '#7A7165' }}>
</div>
          </div>
        </div>
      </div>
    </section>);}

function FinalCTA() {
  return (
    <section style={{ padding: '120px 36px 140px', textAlign: 'center', background: "rgb(250, 247, 240)" }}>
      <div className="serif" style={{ fontSize: 64, lineHeight: 1.02, color: '#1E1A15', letterSpacing: '-.015em', margin: '0 auto 28px', maxWidth: 900 }}>
        Your tools shouldn't be<br />the reason you're stuck.
      </div>
      <p style={{ fontSize: 16, lineHeight: 1.55, color: '#4A423A', maxWidth: 680, margin: '0 auto 40px' }}>The distribution system founders were missing. Mentors, AI agents, and a step-by-step path to your first customers.

      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 44 }}>
        <Pill variant="outline">Apply for free trial</Pill>
        <Pill variant="ghost">See a live demo</Pill>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 80, fontSize: 13, color: '#7A7165' }}>
        <span>30-day money-back guarantee</span>
        <span>No equity taken</span>
        <span>Cancel anytime</span>
      </div>
    </section>);

}

function Footer() {
  return (
    <footer style={{ background: '#1E1A15', color: '#D9D1C2', padding: '56px 36px 40px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <div style={{ fontWeight: 700, letterSpacing: 1, fontSize: 18, color: '#FAF7F0', marginBottom: 14 }}>
            HATCHERS <span style={{ color: '#E91E63' }}>AI</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.55, color: '#8F8273', maxWidth: 320, margin: 0 }}>
            A mentor-guided program and an AI operating system for non-technical founders going from idea to first paying customers.
          </p>
        </div>
        {[
        { h: 'Product', l: ['AI Tools', 'Atlas', 'Website builder', 'Bookings', 'Network'] },
        { h: 'Program', l: ['Why Hatchers', 'Mentors', 'Cohorts', 'Pricing', 'FAQ'] },
        { h: 'Company', l: ['About', 'Testimonials', 'Careers', 'Press', 'Contact'] }].
        map((c, i) =>
        <div key={i}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: '#8F8273', marginBottom: 12 }} className="mono">{c.h.toUpperCase()}</div>
            {c.l.map((x, j) => <div key={j} style={{ fontSize: 13, color: '#D9D1C2', padding: '4px 0' }}>{x}</div>)}
          </div>
        )}
      </div>
      <div style={{ maxWidth: 1240, margin: '40px auto 0', paddingTop: 24, borderTop: '1px solid #2E2822', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8F8273' }}>
        <span>© 2026 Hatchers AI</span>
        <span>hello@hatchers.ai</span>
      </div>
    </footer>);

}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showHero": true,
  "showDistribution": true,
  "showTools": true,
  "showAtlas": true,
  "showReplaces": true,
  "showIntegrations": true,
  "showQuote": true,
  "showFinalCTA": true
} /*EDITMODE-END*/;

const SECTION_META = [
{ key: 'showHero', label: 'Hero', desc: '"Five AI tools…" headline + intro' },
{ key: 'showDistribution', label: 'Distribution callout', desc: '"Code is solved. Distribution isn\'t."' },
{ key: 'showTools', label: 'Tool switcher', desc: 'Tabbed demo of the 4 tools' },
{ key: 'showAtlas', label: 'Atlas spotlight', desc: 'AI cofounder chat demo' },
{ key: 'showReplaces', label: 'What Hatchers replaces', desc: 'Stack comparison list' },
{ key: 'showIntegrations', label: 'Integrations strip', desc: 'Logos row' },
{ key: 'showQuote', label: 'Founder quote', desc: 'Testimonial pull quote' },
{ key: 'showFinalCTA', label: 'Final CTA', desc: '"Your tools shouldn\'t be…" closing' }];


function TweaksPanel({ tweaks, onChange, onClose }) {
  return (
    <div style={{
      position: 'fixed', right: 20, bottom: 20, width: 320, zIndex: 9999,
      background: '#FAF7F0', border: '1px solid #D9D1C2', borderRadius: 12,
      boxShadow: '0 30px 60px -20px #00000035, 0 4px 12px #00000015',
      fontFamily: 'Inter, sans-serif', color: '#1E1A15',
      maxHeight: '80vh', display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #E3DCCE', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Tweaks</div>
          <div style={{ fontSize: 11, color: '#7A7165', marginTop: 2 }}>Toggle sections on/off</div>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#7A7165', fontSize: 18, cursor: 'pointer', padding: 4 }}>×</button>
      </div>
      <div style={{ padding: '6px 8px', overflow: 'auto' }}>
        {SECTION_META.map((s) => {
          const on = !!tweaks[s.key];
          return (
            <label key={s.key} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '10px 10px', borderRadius: 8, cursor: 'pointer',
              background: on ? 'transparent' : '#F1ECE3'
            }}>
              <input
                type="checkbox"
                checked={on}
                onChange={(e) => onChange(s.key, e.target.checked)}
                style={{ marginTop: 3, accentColor: '#1E1A15' }} />
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: on ? '#1E1A15' : '#8F8273', textDecoration: on ? 'none' : 'line-through' }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 11, color: '#8F8273', lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            </label>);

        })}
      </div>
      <div style={{ padding: '10px 14px', borderTop: '1px solid #E3DCCE', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <button
          onClick={() => SECTION_META.forEach((s) => onChange(s.key, true))}
          style={{ flex: 1, padding: '8px 10px', fontSize: 12, border: '1px solid #D9D1C2', background: 'transparent', borderRadius: 6, cursor: 'pointer', color: '#1E1A15' }}>
          Show all
        </button>
        <button
          onClick={() => SECTION_META.forEach((s) => onChange(s.key, false))}
          style={{ flex: 1, padding: '8px 10px', fontSize: 12, border: '1px solid #D9D1C2', background: 'transparent', borderRadius: 6, cursor: 'pointer', color: '#1E1A15' }}>
          Hide all
        </button>
      </div>
    </div>);

}

function App() {
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setEditing(true);
      if (d.type === '__deactivate_edit_mode') setEditing(false);
    };
    window.addEventListener('message', handler);
    try {window.parent.postMessage({ type: '__edit_mode_available' }, '*');} catch (e) {}
    return () => window.removeEventListener('message', handler);
  }, []);

  const update = (key, value) => {
    setTweaks((prev) => {
      const next = { ...prev, [key]: value };
      try {window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*');} catch (e) {}
      return next;
    });
  };

  return (
    <div>
      {tweaks.showHero && <Hero />}
      {tweaks.showDistribution && <DistributionSection />}
      {tweaks.showTools && <ToolSwitcher />}
      {tweaks.showAtlas && <AtlasSection />}
      {tweaks.showReplaces && <Replaces />}
      {tweaks.showIntegrations && <Integrations />}
      {tweaks.showQuote && <Quote />}
      {tweaks.showFinalCTA && <FinalCTA />}
      {editing && <TweaksPanel tweaks={tweaks} onChange={update} onClose={() => setEditing(false)} />}
    </div>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);