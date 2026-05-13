// Simple stroke icons matching the thin-line style on the program page
const Icon = {
  Instagram: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/>
    </svg>
  ),
  Facebook: (p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M15 3h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2z"/>
    </svg>
  ),
  TikTok: (p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M13 3v12.2a3.3 3.3 0 1 1-3.3-3.3"/>
      <path d="M13 3c0 2.7 2.2 4.9 4.9 4.9"/>
    </svg>
  ),
  LinkedIn: (p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M8 10v7M8 7.5v.01M12 17v-4a2 2 0 0 1 4 0v4M12 13v4"/>
    </svg>
  ),
  Meta: (p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 15c0-5 3-9 6-9 2 0 3 1.5 4.5 4.5S17 15 19 15c1.5 0 2-1 2-2.5S20 10 18.5 10c-2 0-3 1.5-4.5 4.5S11 19 9 19c-3 0-6-4-6-9z"/>
    </svg>
  ),
  Stripe: (p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 9.5c0-1 1-1.5 2.5-1.5S12 8.5 13 9M7 14c0 1 1 1.5 3 1.5s3-.5 3-1.5c0-3-6-2-6-4.5"/>
    </svg>
  ),
  Calendar: (p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="16" rx="2"/>
      <path d="M3 9h18M8 3v4M16 3v4"/>
    </svg>
  ),
  Globe: (p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9"/>
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>
    </svg>
  ),
  Users: (p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="9" cy="8" r="3.5"/>
      <path d="M2.5 20c.5-3 3-5 6.5-5s6 2 6.5 5"/>
      <circle cx="17" cy="9" r="2.5"/>
      <path d="M15.5 14.5c3 0 5 1.5 5.5 4"/>
    </svg>
  ),
  Sparkles: (p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>
    </svg>
  ),
  Arrow: (p)=>(
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  ),
  Check: (p)=>(
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 13l4 4L19 7"/>
    </svg>
  ),
  Chat: (p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9l-5 4v-4a3 3 0 0 1 0-3z"/>
    </svg>
  ),
  Image: (p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="4" width="18" height="16" rx="2"/>
      <circle cx="9" cy="10" r="2"/>
      <path d="M4 18l5-5 5 5 3-3 3 3"/>
    </svg>
  ),
  Play: (p)=>(
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="currentColor">
      <path d="M7 5v14l12-7z"/>
    </svg>
  ),
};
window.Icon = Icon;
