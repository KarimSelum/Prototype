// Stroke icons for the OS prototype
const Icon = {
  Atlas: (p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18M3 12h18"/>
    </svg>
  ),
  Dashboard:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="8" height="10" rx="1.5"/>
      <rect x="13" y="3" width="8" height="6" rx="1.5"/>
      <rect x="13" y="11" width="8" height="10" rx="1.5"/>
      <rect x="3" y="15" width="8" height="6" rx="1.5"/>
    </svg>
  ),
  Sparkle:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>
    </svg>
  ),
  Megaphone:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 10v4l13 5V5L3 10zM16 8c2 0 3 1.5 3 4s-1 4-3 4"/>
    </svg>
  ),
  Globe:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9"/>
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>
    </svg>
  ),
  Calendar:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="18" height="16" rx="2"/>
      <path d="M3 9h18M8 3v4M16 3v4"/>
    </svg>
  ),
  Users:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="8" r="3.5"/>
      <path d="M2.5 20c.5-3 3-5 6.5-5s6 2 6.5 5"/>
      <circle cx="17" cy="9" r="2.5"/>
      <path d="M15.5 14.5c3 0 5 1.5 5.5 4"/>
    </svg>
  ),
  Settings:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.4.8a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.5a7 7 0 0 0-2 1.2l-2.4-.8-2 3.4 2 1.5A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.2l-2 1.5 2 3.4 2.4-.8a7 7 0 0 0 2 1.2L10 21h4l.5-2.5a7 7 0 0 0 2-1.2l2.4.8 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z"/>
    </svg>
  ),
  Send:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12l18-9-7 18-3-7-8-2z"/>
    </svg>
  ),
  Plus:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 4v16M4 12h16"/>
    </svg>
  ),
  Arrow:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  ),
  Check:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 13l4 4L19 7"/>
    </svg>
  ),
  Heart:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>
    </svg>
  ),
  Comment:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9l-5 4v-4a3 3 0 0 1 0-3z"/>
    </svg>
  ),
  Bell:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 9a6 6 0 1 1 12 0v4l2 3H4l2-3z"/>
      <path d="M10 19a2 2 0 0 0 4 0"/>
    </svg>
  ),
  Instagram:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/>
    </svg>
  ),
  TikTok:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 3v12.2a3.3 3.3 0 1 1-3.3-3.3M13 3c0 2.7 2.2 4.9 4.9 4.9"/>
    </svg>
  ),
  Facebook:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M15 3h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2z"/>
    </svg>
  ),
  LinkedIn:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 9v10M5 5.5v.2M10 19v-6c0-2.2 1.3-4 3.6-4 2 0 3.4 1.4 3.4 4v6M10 9v10"/>
    </svg>
  ),
  Stripe:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 9.5c0-1 1-1.5 2.5-1.5S12 8.5 13 9M7 14c0 1 1 1.5 3 1.5s3-.5 3-1.5c0-3-6-2-6-4.5"/>
    </svg>
  ),
  Image:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="16" rx="2"/>
      <circle cx="9" cy="10" r="2"/>
      <path d="M4 18l5-5 5 5 3-3 3 3"/>
    </svg>
  ),
  Trend:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 17l6-6 4 4 7-8"/><path d="M14 7h6v6"/>
    </svg>
  ),
  Eye:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Search:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/>
    </svg>
  ),
  Bolt:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L4 14h7l-1 8 9-12h-7z"/>
    </svg>
  ),
  Clock:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
    </svg>
  ),
  Message:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H10l-5 4v-4.5A2.5 2.5 0 0 1 4 13.5z"/>
      <path d="M8 8h8M8 11h5"/>
    </svg>
  ),
  Copy:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="8" y="8" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
  Chevron:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M8 5l8 7-8 7"/>
    </svg>
  ),
  Card:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/>
    </svg>
  ),
  Leaf:(p)=>(
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 4c-9 0-16 5-16 13 0 2 1 3 3 3 8 0 13-7 13-16z"/><path d="M4 20c4-6 9-9 13-12"/>
    </svg>
  ),
};
window.Icon = Icon;
