// Brand + scenario data for the Still Water / Maya Chen demo
const BRAND = {
  name: 'Still Water',
  founder: 'Maya Chen',
  handle: '@maya.stillwater',
  city: 'Lisbon, PT',
  niche: 'Somatic & breathwork coaching · 1:1 + small retreats',
  initials: 'MC',
  // tone words used by Atlas + generators
  voice: 'quiet, embodied, sensory — not hype.',
  avatarGradient: 'linear-gradient(140deg,#E5D5C0 0%,#B49274 60%,#7D5B45 100%)',
  brandGradient: 'linear-gradient(140deg,#B8C9C2 0%,#7D9B91 60%,#4D6962 100%)'
};

// Three time-based scenarios — investor sees the growth arc
const SCENARIOS = [
  {
    id: 'day3', label: 'Day 3', sub: 'Launch week',
    blurb: 'The site went live yesterday. First impressions, no bookings yet.',
    revenueWeek: 0, revenueMonth: 0,
    bookings: 0, leads: 4, siteVisitors: 38,
    campaignsLive: 1, postsScheduled: 3,
    funnel: [38, 14, 4, 0]
  },
  {
    id: 'day21', label: 'Day 21', sub: 'First customers',
    blurb: 'Atlas ran a boosted campaign overnight. 2 bookings came in while Maya slept.',
    revenueWeek: 280, revenueMonth: 420,
    bookings: 6, leads: 22, siteVisitors: 412,
    campaignsLive: 3, postsScheduled: 11,
    funnel: [412, 89, 22, 6]
  },
  {
    id: 'day60', label: 'Day 60', sub: 'Humming',
    blurb: 'Repeatable acquisition. Tuesday-morning post format keeps winning.',
    revenueWeek: 1820, revenueMonth: 4240,
    bookings: 23, leads: 84, siteVisitors: 2140,
    campaignsLive: 7, postsScheduled: 18,
    funnel: [2140, 312, 84, 23]
  }
];

// Atlas daily brief — different per scenario
const ATLAS_BRIEFS = {
  day3: {
    weather: 'Calm. Quiet first week.',
    headline: 'One thing today: post your launch.',
    body: 'Your site is live but no one knows yet. I drafted a launch post for Instagram & LinkedIn in your voice — soft, embodied, no hype. Approve it and I\'ll schedule for 8:30am tomorrow when your followers are most active.',
    actions: ['Review the launch post', 'Tell me about your first 10 clients (so I can target)', 'Draft 5 more posts for this week'],
    overnight: [
      {t:'Site indexed by Google', detail:'Search Console verified · ranking for "breathwork lisbon" #41'},
      {t:'Booking link tested', detail:'End-to-end checkout works · €0 fees on first 100 bookings'},
      {t:'Voice profile saved', detail:'10 reference posts analyzed. Confidence: high.'}
    ]
  },
  day21: {
    weather: 'Tailwind. First boosted post returned 4×.',
    headline: 'Two bookings while you slept. Repeat the format.',
    body: 'I boosted Sunday\'s "morning anchor" post for €18 overnight — 7 link clicks, 2 bookings (Lena Ribeiro 09:30, Ana Costa 10:15). Total payout pending: €280. The format is working. I\'ve drafted three more in the same shape — want to see them?',
    actions: ['See the 3 new drafts', 'Why did this post work?', 'Schedule the winning format daily'],
    overnight: [
      {t:'Boosted post: morning anchor', detail:'€18 spent · 7 clicks · 2 bookings · ROAS 15.6×'},
      {t:'New booking', detail:'Lena Ribeiro · Tue 09:30 · €140 1:1 session'},
      {t:'New booking', detail:'Ana Costa · Tue 10:15 · €140 1:1 session'},
      {t:'IG follower DM', detail:'"do you do retreats in October?" — drafted reply, your approval'}
    ]
  },
  day60: {
    weather: 'Strong. Acquisition is repeatable.',
    headline: 'You\'re booked out Tuesdays. Open Thursdays?',
    body: 'This week: 14 bookings, €1,820 in payouts cleared. Tuesday-morning slots filled within 6 hours of opening. Three people on the waitlist. I can open Thursday 09:00–12:00 and run the winning ad creative at €25/day to fill them — projected 6–9 new bookings by Sunday.',
    actions: ['Open Thursday mornings', 'Show me the cohort waitlist', 'Plan the October retreat campaign'],
    overnight: [
      {t:'14 bookings this week', detail:'€1,820 paid out · €0 in disputes · 31% trial-to-paid'},
      {t:'Top post (TikTok)', detail:'"4-7-8 breath on the metro" · 24k views · 312 saves'},
      {t:'Boost auto-renewed', detail:'Meta · "morning anchor v3" · €25/day · 7.2× ROAS'},
      {t:'Cohort signal', detail:'Two founders DM\'d about your booking flow. Reply?'}
    ]
  }
};

// Cohort feed — peer founders at the same stage
const COHORT_POSTS = [
  {
    who: 'Yui · Tokyo · ceramics studio', stage: 'Stage 2 · first sale',
    t: '12m', avatar:'linear-gradient(140deg,#F3E0D6,#C8857A)',
    body: 'Atlas wrote my product descriptions in 4 different "voices" — I picked the most me. First order this morning. I almost forgot to set up email confirmations 😅',
    likes: 18, comments: 5, pill: 'First sale'
  },
  {
    who: 'Diego · São Paulo · running coach', stage: 'Stage 1 · pre-launch',
    t: '1h', avatar:'linear-gradient(140deg,#D9E2EE,#5B7AA1)',
    body: 'Quick question — anyone running booking through Hatchers with a free intro call? Trying to decide if 15min free is too short or if I should just charge €15 and refund if they book.',
    likes: 9, comments: 12, pill: 'Question · bookings'
  },
  {
    who: 'Atlas · for you', stage: 'AI suggestion',
    t: '2h', avatar:'linear-gradient(140deg,#1E1A15,#5A4E3F)',
    body: 'Three founders in your cohort have launched somatic / wellness products in the last week. I made a "Wellness builders" space for you — same stage, same niche. 6 members so far.',
    likes: 0, comments: 0, pill: 'Suggested space', isAtlas: true
  },
  {
    who: 'Aïsha · Marrakech · skincare', stage: 'Stage 2 · first sale',
    t: '3h', avatar:'linear-gradient(140deg,#F1DCC9,#A37550)',
    body: 'The "what would you have done differently in month 1" thread saved me a week. Skipped the Shopify rabbit hole entirely. Hatchers site + Stripe + Calendly-via-bookings is enough for now.',
    likes: 41, comments: 8, pill: 'Lesson learned'
  },
  {
    who: 'Jonas · Berlin · meditation app', stage: 'Stage 3 · scaling',
    t: '5h', avatar:'linear-gradient(140deg,#E3DBEB,#6E5A8C)',
    body: 'Hot take: the founders posting daily are not the ones shipping daily. The ones posting weekly with a real customer-side story are the ones with traction. Atlas summaries > vibes.',
    likes: 67, comments: 19, pill: 'Take'
  }
];

const COHORT_SPACES = [
  {n:'Your cohort · March \'26', count:38, dot:'#1E1A15', active:true, desc:'The founders who started building alongside you this spring.', why:'You were added here because you joined the March 2026 cohort and are shipping your first commercial surface.', avatars:['linear-gradient(140deg,#F3E0D6,#C8857A)','linear-gradient(140deg,#D9E2EE,#5B7AA1)','linear-gradient(140deg,#F1DCC9,#A37550)']},
  {n:'Wellness builders', count:6, dot:'#3F7A4A', desc:'Service founders building wellness products, retreats, and booking flows.', why:'You were added here because 5 founders in your cohort have wellness service businesses at your exact stage.', avatars:['linear-gradient(140deg,#E5EDD9,#7A9456)','linear-gradient(140deg,#E3DBEB,#8C6FB5)','linear-gradient(140deg,#F3DFCF,#B8825A)']},
  {n:'Same stage · first sale', count:142, dot:'#B8842B', desc:'People turning the first real transaction into a repeatable system.', why:'You were added here because your account crossed from setup to first-customer signals this month.', avatars:['linear-gradient(140deg,#D9E5C9,#6F8F4C)','linear-gradient(140deg,#F3E0D6,#C8857A)','linear-gradient(140deg,#D9E2EE,#5B7AA1)']},
  {n:'Bookings + services', count:89, dot:'#5B7AA1', desc:'Tactics for calendars, deposits, no-shows, and packages.', why:'You were added here because bookings are your primary revenue motion.', avatars:['linear-gradient(140deg,#D9E2EE,#5B7AA1)','linear-gradient(140deg,#F1DCC9,#A37550)','linear-gradient(140deg,#E5EDD9,#7A9456)']},
  {n:'Atlas tips', count:'∞', dot:'#1E1A15', desc:'Small ways founders are teaching Atlas to sound more like them.', why:'You were added here because Atlas has high confidence in your voice profile.', avatars:['linear-gradient(140deg,#1E1A15,#5A4E3F)','linear-gradient(140deg,#B8A890,#5A4E3F)','linear-gradient(140deg,#FAF7F0,#B8A890)']},
];

const COHORT_MATCHES = [
  {n:'Aïsha Bakkali', what:'Skincare · Marrakech', why:'Same stage · service product overlap', avatar:'linear-gradient(140deg,#F1DCC9,#A37550)'},
  {n:'Yui Tanaka', what:'Ceramics · Tokyo', why:'Both shipped in week 1', avatar:'linear-gradient(140deg,#F3E0D6,#C8857A)'},
  {n:'Sara Dias', what:'Pilates · Porto', why:'Same niche · same city region', avatar:'linear-gradient(140deg,#E5EDD9,#7A9456)'},
];

// Bookings — Maya's calendar
function bookingsFor(scenarioId){
  if(scenarioId==='day3') return [];
  if(scenarioId==='day21') return [
    {who:'Lena Ribeiro', service:'1:1 Somatic · 60min', when:'Tue · 09:30', price:140, status:'paid', new:true,
     avatar:'linear-gradient(140deg,#F3DFCF,#B8825A)', note:'First-time · found via IG boost'},
    {who:'Ana Costa', service:'1:1 Breathwork · 60min', when:'Tue · 10:15', price:140, status:'paid', new:true,
     avatar:'linear-gradient(140deg,#E3DBEB,#8C6FB5)', note:'Mentioned anxiety, prefers morning'},
    {who:'Joana M.', service:'Intro call · 15min', when:'Wed · 14:00', price:0, status:'free',
     avatar:'linear-gradient(140deg,#D9E5C9,#6F8F4C)', note:''},
    {who:'Pedro S.', service:'1:1 Somatic · 60min', when:'Thu · 11:00', price:140, status:'paid',
     avatar:'linear-gradient(140deg,#D9E2EE,#5B7AA1)', note:'Returning · 3rd session'},
  ];
  // day60
  return [
    {who:'Lena Ribeiro', service:'1:1 Somatic · 60min', when:'Today · 09:30', price:140, status:'paid', live:true,
     avatar:'linear-gradient(140deg,#F3DFCF,#B8825A)', note:'4th session · package member'},
    {who:'Ana Costa', service:'1:1 Breathwork · 60min', when:'Today · 10:15', price:140, status:'paid',
     avatar:'linear-gradient(140deg,#E3DBEB,#8C6FB5)', note:'Weekly · auto-renew'},
    {who:'Joana M.', service:'Package · 4 sessions', when:'Today · 11:30', price:520, status:'paid', new:true,
     avatar:'linear-gradient(140deg,#D9E5C9,#6F8F4C)', note:'Just upgraded from intro'},
    {who:'Pedro S.', service:'1:1 Somatic · 60min', when:'Today · 14:00', price:140, status:'paid',
     avatar:'linear-gradient(140deg,#D9E2EE,#5B7AA1)', note:''},
    {who:'Inês T.', service:'Intro call · 15min', when:'Today · 17:00', price:0, status:'free',
     avatar:'linear-gradient(140deg,#F1DCC9,#A37550)', note:'From TikTok'},
    {who:'Tomás R.', service:'1:1 Breathwork · 60min', when:'Tomorrow · 09:00', price:140, status:'paid',
     avatar:'linear-gradient(140deg,#E5EDD9,#7A9456)', note:''},
    {who:'Marta L.', service:'Retreat deposit · Oct', when:'Tomorrow · 10:30', price:200, status:'paid', new:true,
     avatar:'linear-gradient(140deg,#F3DFCF,#A37550)', note:'October Sintra retreat'},
  ];
}

// Stripe payouts
function payoutsFor(scenarioId){
  if(scenarioId==='day3') return [];
  if(scenarioId==='day21') return [
    {date:'Today', amount:140, status:'In transit · arrives Wed', source:'Lena Ribeiro · 1:1'},
    {date:'Today', amount:140, status:'In transit · arrives Wed', source:'Ana Costa · 1:1'},
  ];
  return [
    {date:'Today', amount:520, status:'Pending · payout Fri', source:'Joana M. · 4-session package'},
    {date:'Today', amount:140, status:'In transit', source:'Lena Ribeiro · 1:1'},
    {date:'Yesterday', amount:280, status:'Paid out', source:'2 sessions · Mon'},
    {date:'2 days ago', amount:200, status:'Paid out', source:'Marta L. · Retreat deposit'},
    {date:'3 days ago', amount:420, status:'Paid out', source:'3 sessions · Sat'},
    {date:'5 days ago', amount:140, status:'Paid out', source:'Pedro S. · 1:1'},
  ];
}

const NOTIFICATIONS = {
  day3: [
    {title:'Your site just went live', time:'2m ago', tone:'green', action:'Review', page:'site'},
    {title:'Voice profile saved — 10 posts analyzed', time:'18m ago', tone:'taupe', action:'Open Atlas', page:'atlas'},
    {title:'Google indexed your first page', time:'1h ago', tone:'taupe', action:'Review', page:'site'},
  ],
  day21: [
    {title:'2 bookings while you slept · €280 incoming', time:'7m ago', tone:'green', action:'Review', page:'bookings'},
    {title:'Boosted post: morning anchor · 4× ROAS', time:'22m ago', tone:'blue', action:'See campaign', page:'campaigns'},
    {title:'New DM: "do you do retreats?"', time:'43m ago', tone:'taupe', action:'Open Atlas', page:'atlas'},
  ],
  day60: [
    {title:"You're booked out Tuesdays — open Thursdays?", time:'5m ago', tone:'green', action:'Review', page:'bookings'},
    {title:'Viral TikTok · 24k views · 312 saves', time:'31m ago', tone:'blue', action:'See campaign', page:'campaigns'},
    {title:'Retreat waitlist: 4 people, 2 deposits', time:'1h ago', tone:'green', action:'Open Atlas', page:'atlas'},
  ]
};

function clientsFor(scenarioId){
  if(scenarioId==='day3') return [];
  const base = [
    {name:'Lena Ribeiro', sessions:4, spend:520, last:'May 13', status:'Active', avatar:'linear-gradient(140deg,#F3DFCF,#B8825A)', history:['Intro call · Apr 24','1:1 Somatic · May 2','Package started · May 9'], note:'Lena is ready for the 4-session package — 78% conversion probability.'},
    {name:'Ana Costa', sessions:3, spend:420, last:'May 13', status:'Active', avatar:'linear-gradient(140deg,#E3DBEB,#8C6FB5)', history:['Found via IG boost · May 7','Breathwork · May 10','Somatic · May 13'], note:'Ana responds best to short morning reminders and soft language.'},
    {name:'Pedro Santos', sessions:3, spend:420, last:'May 12', status:'Active', avatar:'linear-gradient(140deg,#D9E2EE,#5B7AA1)', history:['Referral · Apr 30','Somatic · May 6','Somatic · May 12'], note:'Pedro may convert to weekly if offered a fixed Thursday slot.'},
    {name:'Joana Martins', sessions:1, spend:0, last:'May 11', status:'Lead', avatar:'linear-gradient(140deg,#D9E5C9,#6F8F4C)', history:['Intro call · May 11'], note:'Joana asked about pricing twice. Send the package explanation with less urgency.'},
  ];
  if(scenarioId==='day21') return base;
  return [
    ...base,
    {name:'Marta Lopes', sessions:2, spend:340, last:'May 12', status:'Active', avatar:'linear-gradient(140deg,#F1DCC9,#A37550)', history:['Retreat deposit · May 8','1:1 Somatic · May 12'], note:'Marta is a likely retreat advocate if given the dossier to forward.'},
    {name:'Inês Teixeira', sessions:1, spend:140, last:'May 13', status:'Active', avatar:'linear-gradient(140deg,#E5EDD9,#7A9456)', history:['TikTok → booking · May 13'], note:'Came from the viral metro breathing post. Ask for language she would share.'},
    {name:'Tomás Rocha', sessions:2, spend:280, last:'May 14', status:'Active', avatar:'linear-gradient(140deg,#F3E0D6,#C8857A)', history:['Intro · May 2','Somatic · May 14'], note:'Good candidate for the Thursday morning expansion.'},
    {name:'Sofia Pinto', sessions:1, spend:0, last:'Apr 28', status:'Inactive', avatar:'linear-gradient(140deg,#D9E2EE,#8EA6C8)', history:['Intro call · Apr 28','No-show follow-up · May 2'], note:'Gentle reschedule nudge. Avoid mentioning the missed call directly.'},
    {name:'Henrique Reis', sessions:1, spend:140, last:'Apr 30', status:'Inactive', avatar:'linear-gradient(140deg,#E3DBEB,#6E5A8C)', history:['Breathwork · Apr 30'], note:'Ask how the post-session week felt. He used the word "unclenched".'},
    {name:'Beatriz Nunes', sessions:1, spend:140, last:'May 1', status:'Lead', avatar:'linear-gradient(140deg,#F3DFCF,#A37550)', history:['Somatic · May 1','Package quote sent · May 4'], note:'Surface the package friction directly and offer a smaller bridge.'},
    {name:'Sara Dias', sessions:0, spend:0, last:'May 10', status:'Lead', avatar:'linear-gradient(140deg,#E5EDD9,#7A9456)', history:['DM about retreats · May 10'], note:'Retreat waitlist fit. Send the October dossier.'},
  ];
}

function revenueSeriesFor(scenarioId){
  if(scenarioId==='day3') return Array.from({length:30}, (_,i)=> i>26 ? (i-26)*8 : (i%7===0?3:0));
  if(scenarioId==='day21') return [0,0,0,0,0,20,0,0,0,140,0,0,0,280,0,0,40,0,140,0,0,280,0,0,0,140,280,0,0,140];
  return Array.from({length:30}, (_,i)=> Math.round(60 + i*10 + Math.sin(i*.9)*45 + (i%6===0?120:0)));
}

// Campaigns
function campaignsFor(scenarioId){
  if(scenarioId==='day3') return [
    {name:'Launch announcement', channels:['ig','li'], status:'draft', spend:0, clicks:0, leads:0,
     post:'There\'s a quieter way to come back to your body. I\'ve been holding space for it in 1:1 sessions in Lisbon for a long time — now there\'s a way to book one online. New site, link in bio. 🌊'},
  ];
  if(scenarioId==='day21') return [
    {name:'Morning anchor (boost)', channels:['ig'], status:'live', spend:18, clicks:7, leads:2, winner:true,
     post:'A 4-minute morning anchor. Two hands on your ribcage, four counts in, six counts out. Done before your phone\'s unlocked. I taught this to a client who hadn\'t slept through the night in three weeks. She slept that night. Try it tomorrow — link in bio if you want the longer version.'},
    {name:'What is somatic, really', channels:['ig','tt'], status:'scheduled', spend:0, clicks:0, leads:0,
     post:'"Somatic" gets thrown around. Here\'s what I actually mean: your body has been keeping a record. We\'re going to read it together, slowly, with no agenda. 60 minutes. No homework. Lisbon or online.'},
    {name:'Retreat waitlist (Oct)', channels:['ig','li'], status:'live', spend:0, clicks:14, leads:6,
     post:'A small retreat in the Sintra hills, 4 days in October. 8 people. We walk, we breathe, we eat well, we don\'t talk about productivity. Waitlist open.'},
  ];
  return [
    {name:'Morning anchor v3 (auto-boost)', channels:['ig','tt'], status:'live', spend:175, clicks:312, leads:24, winner:true,
     post:'A 4-minute morning anchor. Two hands on your ribcage, four counts in, six counts out. Done before your phone\'s unlocked.'},
    {name:'Retreat: Sintra · October', channels:['ig','li','fb'], status:'live', spend:120, clicks:189, leads:14,
     post:'Sintra retreat · 4 days · 8 people · October 18–22. Two spots left. Reply with "trees" if you want the dossier.'},
    {name:'4-7-8 on the metro', channels:['tt'], status:'live', spend:0, clicks:240, leads:9, viral:true,
     post:'You\'re on the metro. You\'re bracing. Try this for one stop: 4 in, 7 hold, 8 out. That\'s it.'},
    {name:'Why I stopped saying "mindfulness"', channels:['li'], status:'scheduled', spend:0, clicks:0, leads:0,
     post:'I used to say "mindfulness." I stopped because nobody knew what they were buying. Here\'s the language I use now, and why it matters for what you actually feel.'},
    {name:'Client story · Lena', channels:['ig'], status:'draft', spend:0, clicks:0, leads:0,
     post:'Lena came in saying she couldn\'t feel her shoulders. Six sessions later, she\'s sleeping through the night. With her permission, what changed →'},
  ];
}

window.BRAND = BRAND;
window.SCENARIOS = SCENARIOS;
window.ATLAS_BRIEFS = ATLAS_BRIEFS;
window.COHORT_POSTS = COHORT_POSTS;
window.COHORT_SPACES = COHORT_SPACES;
window.COHORT_MATCHES = COHORT_MATCHES;
window.NOTIFICATIONS = NOTIFICATIONS;
window.bookingsFor = bookingsFor;
window.payoutsFor = payoutsFor;
window.campaignsFor = campaignsFor;
window.clientsFor = clientsFor;
window.revenueSeriesFor = revenueSeriesFor;
