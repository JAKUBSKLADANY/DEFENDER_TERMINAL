// ═══════════════════════════════════════════════════
// DEFENDER_TERMINAL — DATA.JS
// All company, military, weather, trade route data
// ═══════════════════════════════════════════════════

// ── COMPANY FUNDAMENTALS ──
const CO_DATA = {
  LMT: {
    fundamentals: { Revenue:'$67.6B', EBITDA:'$9.2B', EPS:'$27.55', PE:'17x', Backlog:'$160B+', Dividend:'2.8%' },
    contracts: ['F-35 Poland 145 units — $5.2B', 'LRASM anti-ship missiles — $1.1B', 'THAAD Saudi Arabia — $4B', 'F-35 sustainment LT — $23B'],
    imports: ['Titanium (Russia/Ukraine alt.)', 'Advanced composites (Japan)', 'Rare earth materials (Australia)'],
    exports: ['F-35 to 17 NATO nations', 'THAAD to Middle East', 'C-130 to 70+ countries'],
  },
  RHM: {
    fundamentals: { Revenue:'EUR 9.4B', EBITDA:'EUR 1.3B', EPS:'EUR 18.2', PE:'24x', Backlog:'EUR 52B', Dividend:'1.2%' },
    contracts: ['Bundeswehr artillery — EUR 4.2B', 'Ukraine logistics — EUR 1.8B', 'Lynx IFV Hungary — $2B', 'Panther MBT development'],
    imports: ['Steel (Germany domestic)', 'Propellant chemicals (EU)', 'Electronics (Taiwan/Korea)'],
    exports: ['Artillery shells to NATO', 'Lynx IFV to Hungary/Australia', 'Panther MBT export pipeline'],
  },
  SAAB: {
    fundamentals: { Revenue:'SEK 23.5B', EBITDA:'SEK 2.8B', EPS:'SEK 14.2', PE:'27x', Backlog:'SEK 130B', Dividend:'0.8%' },
    contracts: ['Gripen-E Sweden/Hungary', 'GlobalEye AEW UAE', 'Carl-Gustaf M4 NATO', 'AT4 launcher NATO-wide'],
    imports: ['GE F414 engines (USA)', 'Radar components (global)', 'Electronics (EU/NATO supply chain)'],
    exports: ['Gripen to 10+ nations', 'Carl-Gustaf to 40+ nations', 'AT4 to 50+ nations'],
  },
  BAE: {
    fundamentals: { Revenue:'£25.3B', EBITDA:'£3.1B', EPS:'£0.62', PE:'19x', Backlog:'£66B', Dividend:'2.3%' },
    contracts: ['Type 26 Frigate UK Navy', 'F-35 components 15%', 'AUKUS submarine Australia', 'Typhoon upgrade Saudi'],
    imports: ['Steel (UK domestic)', 'Submarine components (global)', 'Electronics (US/UK)'],
    exports: ['Typhoon to KSA/Kuwait', 'Ships to Australia/Canada', 'Systems to NATO'],
  },
  HAG: {
    fundamentals: { Revenue:'EUR 2.0B', EBITDA:'EUR 270M', EPS:'EUR 1.84', PE:'20x', Backlog:'EUR 4.8B', Dividend:'1.1%' },
    contracts: ['TRILO radar Germany', 'Eurofighter AESA upgrade', 'PEGASUS signal intelligence NATO'],
    imports: ['Semiconductor ICs (global)', 'Optics (Germany domestic)', 'Rare earth magnets (China risk)'],
    exports: ['Radar to NATO members', 'EW systems EU/NATO', 'Sensors to global defense'],
  },
  TKA: {
    fundamentals: { Revenue:'EUR 35B', EBITDA:'EUR 0.6B', EPS:'-EUR 2.1', PE:'N/A', WriteDown:'EUR 3B risk', Dividend:'0%' },
    contracts: ['Submarine tkMS export', 'Steel contracts under pressure'],
    imports: ['Iron ore (global)', 'Coking coal (Australia/USA)', 'Energy (EU gas market)'],
    exports: ['Steel to EU manufacturers', 'Submarines to select nations'],
  },
  NVDA: {
    fundamentals: { Revenue:'$35.1B Q4est', EBITDA:'$23.4B', EPS:'$0.89', PE:'35x', DCrev:'+120% YoY', Dividend:'0.03%' },
    contracts: ['Microsoft Azure H200 — $10B+', 'Meta AI 150K GPU', 'Google DC — $15B', 'Amazon Blackwell ramp'],
    imports: ['TSMC wafers (Taiwan — KEY RISK)', 'HBM memory (SK Hynix Korea)', 'Substrates (Japan)'],
    exports: ['GPUs to US hyperscalers', 'H100/H200 to global AI cos', 'Export controls: China blocked'],
  },
  META: {
    fundamentals: { Revenue:'$164.5B', EBITDA:'$68.1B', EPS:'$23.86', PE:'26x', Buyback:'$60B', Dividend:'0%' },
    contracts: ['Llama 4 enterprise AI', 'Ray-Ban Meta glasses', 'Instagram AI ads', 'WhatsApp business'],
    imports: ['NVDA GPUs (AI infra)', 'Data center hardware (global)', 'Undersea cables (Pacific/Atlantic)'],
    exports: ['Ad revenue — global', 'AI models — global enterprise', 'VR hardware — consumer global'],
  },
  MSFT: {
    fundamentals: { Revenue:'$245B', EBITDA:'$116B', EPS:'$13.10', PE:'32x', Azure:'+31% YoY', Dividend:'0.7%' },
    contracts: ['Azure OpenAI exclusive', 'GitHub Copilot 1.3M paid', 'Activision Blizzard', 'Nuance Healthcare AI'],
    imports: ['NVDA/AMD GPUs', 'Data center land (global)', 'Nuclear power (SMR contracts)'],
    exports: ['Azure cloud — 60+ regions global', 'Office 365 — 345M users global', 'Xbox — consumer global'],
  },
  GOOGL: {
    fundamentals: { Revenue:'$339B', EBITDA:'$115B', EPS:'$8.04', PE:'21x', Cloud:'+28% YoY', Dividend:'0.5%' },
    contracts: ['Google Cloud AI infra', 'YouTube Premium subscriptions', 'Waymo autonomous', 'DeepMind healthcare'],
    imports: ['Custom TPU chips (TSMC)', 'Data center real estate (global)', 'Undersea cables'],
    exports: ['Search — global', 'Cloud — global', 'Android — 3B devices'],
  },
  XOM: {
    fundamentals: { Revenue:'$398B', EBITDA:'$42B', EPS:'$9.12', PE:'13x', Breakeven:'$35/bbl', Dividend:'3.4%' },
    contracts: ['Guyana Stabroek 650K bpd', 'Permian Basin record production', 'LNG Qatar 20yr offtake', 'Pioneer acquisition synergies'],
    imports: ['Drilling equipment (US/global)', 'Refinery chemicals (US domestic)', 'LNG tankers (Korea/Japan)'],
    exports: ['Crude oil — global', 'LNG — Europe/Asia', 'Refined products — Americas'],
  },
  CVX: {
    fundamentals: { Revenue:'$196B', EBITDA:'$32B', EPS:'$11.40', PE:'14x', FCF:'$14B', Dividend:'4.1%' },
    contracts: ['Hess Guyana stake closed', 'Permian + offshore production', 'TCO Kazakhstan expansion', 'LNG Australia offtake'],
    imports: ['Drilling equipment (US)', 'Pipeline materials (US/global)', 'Refinery chemicals'],
    exports: ['Crude — global', 'LNG — Pacific Basin', 'Refined products — Americas/Asia'],
  },
};

// ── PORTFOLIO MARKERS — HQ + SECONDARY OFFICES ──
const ALL_MARKERS = [

  // ── HOME BASE ──
  { id:'home', lat:49.21, lng:16.88, name:'HQ TVAROZNA', sym:'HOME', type:'hq', color:'#60a5fa', size:1.2,
    price:'SECURE', chg:'ONLINE', detail:'Jakub Skladany · Home Base · 49.21N 16.88E · METEOSTANICE ACTIVE' },

  // ── DEFENSE ──
  { id:'RHM', lat:51.227, lng:6.773, name:'RHEINMETALL AG', sym:'RHM', type:'asset', sector:'defense',
    color:'#22c55e', size:1.0, shares:150, price:'EUR 831', chg:'+2.88%', up:true,
    risk:'LOW', sig:'BUY ZONE', sigsym:'buy', detail:'Bundeswehr EUR 4.2B · Backlog EUR 52B' },
  { id:'RHM2', lat:52.52, lng:13.405, name:'RHM — BERLIN OFFICE', sym:'RHM', type:'office', sector:'defense',
    color:'#22c55e', size:0.5, detail:'Government relations & Bundeswehr contracts hub' },
  { id:'RHM3', lat:48.85, lng:2.35, name:'RHM — PARIS OFFICE', sym:'RHM', type:'office', sector:'defense',
    color:'#22c55e', size:0.4, detail:'EU defense procurement liaison' },

  { id:'LMT', lat:38.907, lng:-77.036, name:'LOCKHEED MARTIN HQ', sym:'LMT', type:'asset', sector:'defense',
    color:'#22c55e', size:1.0, shares:80, price:'$468.30', chg:'+1.22%', up:true,
    risk:'LOW', sig:'BUY ZONE', sigsym:'buy', detail:'F-35 Poland 145 units · LRASM · THAAD' },
  { id:'LMT2', lat:32.73, lng:-97.11, name:'LMT — FORT WORTH (F-35)', sym:'LMT', type:'office', sector:'defense',
    color:'#22c55e', size:0.6, detail:'F-35 primary production facility — 145 aircraft Poland order' },
  { id:'LMT3', lat:27.94, lng:-82.45, name:'LMT — TAMPA (CENTCOM)', sym:'LMT', type:'office', sector:'defense',
    color:'#22c55e', size:0.4, detail:'US CENTCOM proximity — THAAD/missile defense' },

  { id:'SAAB', lat:59.27, lng:16.48, name:'SAAB AB HQ', sym:'SAAB', type:'asset', sector:'defense',
    color:'#22c55e', size:0.9, shares:200, price:'SEK 388', chg:'+1.55%', up:true,
    risk:'LOW', sig:'BUY ZONE', sigsym:'buy', detail:'Gripen-E · GlobalEye · NATO re-rate' },
  { id:'SAAB2', lat:57.71, lng:11.97, name:'SAAB — GOTHENBURG (Gripen)', sym:'SAAB', type:'office', sector:'defense',
    color:'#22c55e', size:0.5, detail:'Gripen production & Swedish Air Force contracts' },

  { id:'BAE', lat:51.72, lng:-0.34, name:'BAE SYSTEMS HQ', sym:'BAE', type:'asset', sector:'defense',
    color:'#f59e0b', size:0.9, shares:120, price:'GBP 12.40', chg:'+0.88%', up:true,
    risk:'LOW', sig:'HOLD', sigsym:'hold', detail:'Type 26 · F-35 components · AUKUS' },
  { id:'BAE2', lat:53.71, lng:-2.73, name:'BAE — WARTON (Typhoon)', sym:'BAE', type:'office', sector:'defense',
    color:'#f59e0b', size:0.5, detail:'Typhoon production & Saudi upgrade contracts' },
  { id:'BAE3', lat:-33.87, lng:151.2, name:'BAE — SYDNEY (AUKUS)', sym:'BAE', type:'office', sector:'defense',
    color:'#f59e0b', size:0.4, detail:'AUKUS submarine program — Australia' },

  { id:'HAG', lat:48.74, lng:11.43, name:'HENSOLDT AG HQ', sym:'HAG', type:'asset', sector:'defense',
    color:'#f59e0b', size:0.7, shares:90, price:'EUR 36.20', chg:'-0.44%', up:false,
    risk:'MEDIUM', sig:'HOLD', sigsym:'hold', detail:'Radar systems · PEGASUS SIGINT · NATO pending' },

  { id:'TKA', lat:51.45, lng:7.01, name:'THYSSENKRUPP HQ', sym:'TKA', type:'asset', sector:'defense',
    color:'#ef4444', size:0.7, shares:100, price:'EUR 5.84', chg:'-1.20%', up:false,
    risk:'HIGH', sig:'RISK ZONE', sigsym:'risk', detail:'Steel write-down EUR 3B · Chinese competition · Restructuring' },

  // ── TECH / AI ──
  { id:'NVDA', lat:37.368, lng:-121.913, name:'NVIDIA HQ — SANTA CLARA', sym:'NVDA', type:'asset', sector:'tech',
    color:'#3b82f6', size:1.0, shares:50, price:'$138.20', chg:'+3.41%', up:true,
    risk:'MEDIUM', sig:'BUY ZONE', sigsym:'buy', detail:'Blackwell cycle · H200 sold out Q3 · DC rev +120% YoY' },
  { id:'NVDA2', lat:1.35, lng:103.82, name:'NVDA — SINGAPORE (Asia hub)', sym:'NVDA', type:'office', sector:'tech',
    color:'#3b82f6', size:0.5, detail:'Asia-Pacific sales & supply chain hub' },
  { id:'NVDA3', lat:51.5, lng:-0.12, name:'NVDA — LONDON (EU AI hub)', sym:'NVDA', type:'office', sector:'tech',
    color:'#3b82f6', size:0.4, detail:'EU AI research & enterprise sales' },

  { id:'META', lat:37.485, lng:-122.148, name:'META HQ — MENLO PARK', sym:'META', type:'asset', sector:'tech',
    color:'#3b82f6', size:0.9, shares:30, price:'$612.40', chg:'+1.22%', up:true,
    risk:'LOW', sig:'BUY ZONE', sigsym:'buy', detail:'Llama AI · $60B buyback active · Ray-Ban selling out' },
  { id:'META2', lat:52.52, lng:13.4, name:'META — BERLIN DC', sym:'META', type:'office', sector:'tech',
    color:'#3b82f6', size:0.4, detail:'European data center & GDPR compliance' },

  { id:'MSFT', lat:47.64, lng:-122.13, name:'MICROSOFT HQ — REDMOND', sym:'MSFT', type:'asset', sector:'tech',
    color:'#3b82f6', size:0.9, shares:25, price:'$418.30', chg:'+0.88%', up:true,
    risk:'LOW', sig:'HOLD', sigsym:'hold', detail:'Azure AI +31% YoY · GitHub Copilot 1.3M' },
  { id:'MSFT2', lat:51.5, lng:-0.12, name:'MSFT — LONDON (EU Azure)', sym:'MSFT', type:'office', sector:'tech',
    color:'#3b82f6', size:0.4, detail:'Azure EU sovereign cloud hub' },

  { id:'GOOGL', lat:37.422, lng:-122.084, name:'GOOGLE HQ — MOUNTAIN VIEW', sym:'GOOGL', type:'asset', sector:'tech',
    color:'#3b82f6', size:0.9, shares:20, price:'$198.70', chg:'+0.71%', up:true,
    risk:'LOW', sig:'BUY ZONE', sigsym:'buy', detail:'Cloud +28% YoY · DeepMind healthcare · Waymo' },
  { id:'GOOGL2', lat:53.34, lng:-6.26, name:'GOOGLE — DUBLIN (EU HQ)', sym:'GOOGL', type:'office', sector:'tech',
    color:'#3b82f6', size:0.5, detail:'European HQ & EMEA operations — tax efficient' },

  // ── OIL ──
  { id:'XOM', lat:32.89, lng:-97.04, name:'EXXONMOBIL HQ — IRVING TX', sym:'XOM', type:'asset', sector:'oil',
    color:'#f59e0b', size:1.0, shares:60, price:'$118.40', chg:'+0.55%', up:true,
    risk:'LOW', sig:'BUY ZONE', sigsym:'buy', detail:'Guyana $35/bbl breakeven · Div 3.4% · Pioneer synergies' },
  { id:'XOM2', lat:6.8, lng:-58.16, name:'XOM — GUYANA (Stabroek)', sym:'XOM', type:'office', sector:'oil',
    color:'#f59e0b', size:0.7, detail:'Stabroek Block — 650K bpd production · KEY ASSET · $35/bbl breakeven' },
  { id:'XOM3', lat:51.5, lng:-0.12, name:'XOM — LONDON (North Sea)', sym:'XOM', type:'office', sector:'oil',
    color:'#f59e0b', size:0.4, detail:'North Sea operations & European LNG trading' },

  { id:'CVX', lat:37.81, lng:-122.41, name:'CHEVRON HQ — SAN RAMON', sym:'CVX', type:'asset', sector:'oil',
    color:'#f59e0b', size:0.9, shares:40, price:'$156.20', chg:'+0.38%', up:true,
    risk:'LOW', sig:'BUY ZONE', sigsym:'buy', detail:'Hess closed · FCF $14B · Div 4.1%' },
  { id:'CVX2', lat:6.8, lng:-58.16, name:'CVX — GUYANA (Hess stake)', sym:'CVX', type:'office', sector:'oil',
    color:'#f59e0b', size:0.6, detail:'Hess acquisition — Guyana Stabroek access' },
  { id:'CVX3', lat:-22.9, lng:-43.18, name:'CVX — RIO BRAZIL', sym:'CVX', type:'office', sector:'oil',
    color:'#f59e0b', size:0.4, detail:'Brazil deepwater production hub' },
];

// ── WAR / MILITARY ASSETS ──
const WAR_MARKERS = [
  // Hot zones
  { lat:49.0, lng:32.0, name:'UKRAINE THEATER', type:'war', color:'#ef4444', size:1.4,
    detail:'Active frontline. NATO DEFCON 2. RHM LMT SAAB BAE structural bull thesis.', price:'HIGH ALERT', chg:'HOT',
    armada:'~800K UA troops · F-16 active · HIMARS deployed · Challenger 2 · Leopard 2 · Bradley IFV · RHM artillery' },
  { lat:14.0, lng:44.0, name:'RED SEA / HOUTHI OPS', type:'war', color:'#ef4444', size:1.2,
    detail:'USS Eisenhower CSG on station. 14th intercept confirmed. LMT BAE XOM beneficiary.', price:'HOT OPS', chg:'HOT',
    armada:'USS Eisenhower CVN-69 · USS Gravely DDG-107 · USS Mason DDG-87 · HMS Diamond (RN) · French Navy FDI' },
  { lat:23.0, lng:120.0, name:'TAIWAN STRAIT', type:'war', color:'#f59e0b', size:1.1,
    detail:'PLA median line crossings x3 this month. TSMC concentration risk. NVDA supply chain exposure.', price:'ELEVATED', chg:'WATCH',
    armada:'PLA East Sea Fleet · J-20 fighters x120 · DF-17 HGV · USS Ronald Reagan CVN-76 · 7th Fleet monitoring' },
  { lat:31.5, lng:35.0, name:'MIDDLE EAST / GAZA', type:'war', color:'#ef4444', size:0.9,
    detail:'Ongoing conflict. IDF operations. US carrier presence maintaining deterrence.', price:'ACTIVE', chg:'HOT',
    armada:'IDF Ground/Air/Sea · USS Dwight Eisenhower · USS Gerald R. Ford (rotated) · Iron Dome / Arrow 3' },

  // US Navy carriers
  { lat:40.5, lng:-55.0, name:'USS GERALD R. FORD', type:'fleet', color:'#ffffff', size:0.7,
    detail:'CVN-78 · Ford class · Atlantic patrol · F/A-18E/F · F-35C capable · Active', price:'CVN-78', chg:'ACTIVE',
    armada:'90 aircraft · 5000 crew · EMALS catapult · Evolved Sea Sparrow · RIM-162' },
  { lat:13.5, lng:44.0, name:'USS EISENHOWER CSG', type:'fleet', color:'#ef4444', size:0.7,
    detail:'CVN-69 · Red Sea · 14 Houthi intercepts · Hot ops tempo · LMT AMRAAM demand confirmed', price:'CVN-69', chg:'HOT OPS',
    armada:'F/A-18 · EA-18G Growler · AMRAAM (LMT) · CIWS · 2 DDG escorts' },
  { lat:20.0, lng:140.0, name:'USS NIMITZ CSG', type:'fleet', color:'#ffffff', size:0.7,
    detail:'CVN-68 · W.Pacific patrol · Taiwan Strait monitoring', price:'CVN-68', chg:'ACTIVE',
    armada:'F/A-18E/F · 90 aircraft · AEGIS escorts · SM-3 intercept capable' },
  { lat:35.5, lng:139.7, name:'USS RONALD REAGAN', type:'fleet', color:'#ffffff', size:0.6,
    detail:'CVN-76 · Japan homeport · 7th Fleet flagship · Taiwan Strait deterrence', price:'CVN-76', chg:'ACTIVE',
    armada:'Japan-based · Rapid deployment Taiwan/Korea · AEGIS DDG escort x3' },

  // NATO bases
  { lat:49.43, lng:7.6, name:'RAMSTEIN AFB', type:'base', color:'#ef4444', size:0.6,
    detail:'USAF Europe HQ · NATO air hub · F-35 transition ongoing · Ukraine air defense coordination', price:'NATO HQ', chg:'ACTIVE',
    armada:'F-35A · A-10 · KC-135 · AWACS E-3 · MQ-9 Reaper · NATO CAOC' },
  { lat:11.6, lng:43.1, name:'CAMP LEMONNIER', type:'base', color:'#ef4444', size:0.5,
    detail:'Djibouti · Red Sea ops center · MQ-9 · JSOC · Elevated posture', price:'RED SEA', chg:'ELEVATED',
    armada:'MQ-9 Reaper · AC-130 · JSOC teams · P-8 Poseidon · Red Sea intel hub' },
  { lat:36.5, lng:139.0, name:'MISAWA AB JAPAN', type:'base', color:'#3b82f6', size:0.4,
    detail:'USAF Japan · F-16 · RC-135 · Pacific SIGINT hub', price:'PACIFIC', chg:'ACTIVE',
    armada:'F-16CJ · RC-135V/W Rivet Joint · U-2 · NSA field station' },

  // Russia
  { lat:55.7, lng:37.6, name:'MOSCOW — RUSSIA HQ', type:'threat', color:'#ef4444', size:0.8,
    detail:'Sanctions: SWIFT excluded · Gold reserves accumulating · S-400 sales active · Wagner restructured', price:'THREAT', chg:'SANCTIONS',
    armada:'~3000 tanks active · Kinzhal hypersonic · S-500 AD · Tu-160 Blackjack nuclear · Poseidon SLBM' },
];

// ── WEATHER DATA ──
const WEATHER_MARKERS = [
  { lat:49.21, lng:16.88, name:'TVAROZNA HQ', type:'hq', color:'#60a5fa', size:0.9, detail:'Home Base · Meteostanice active', price:'4C', chg:'OVERCAST' },
  { lat:51.23, lng:6.77, name:'DUSSELDORF — RHM HQ', type:'weather', color:'#22c55e', size:0.6, detail:'RHM production · Normal operations', price:'8C', chg:'CLOUDY' },
  { lat:38.9, lng:-77.0, name:'WASHINGTON DC — LMT', type:'weather', color:'#22c55e', size:0.6, detail:'Congress in session · F-35 contract zone', price:'12C', chg:'CLEAR' },
  { lat:14.0, lng:44.0, name:'RED SEA OPS ZONE', type:'weather', color:'#ef4444', size:0.8, detail:'Storm risk · Wind 28kts · Ops impact: MEDIUM', price:'34C', chg:'THUNDERSTORMS' },
  { lat:49.0, lng:32.0, name:'UKRAINE FRONTLINE', type:'weather', color:'#3b82f6', size:0.8, detail:'Winter conditions ending · Mud season · Ops impact: HIGH', price:'-2C', chg:'SNOW/FOG' },
  { lat:23.0, lng:120.0, name:'TAIWAN STRAIT', type:'weather', color:'#f59e0b', size:0.7, detail:'Typhoon season Q2 · PLA ops window approaching', price:'18C', chg:'PARTLY CLOUDY' },
  { lat:6.8, lng:-58.16, name:'GUYANA — XOM/CVX', type:'weather', color:'#f59e0b', size:0.6, detail:'Rainy season · Stabroek production unaffected (offshore)', price:'28C', chg:'RAIN' },
  { lat:59.27, lng:16.48, name:'LINKOPING — SAAB', type:'weather', color:'#22c55e', size:0.5, detail:'SAAB Gripen production · Nordic winter ending', price:'2C', chg:'PARTLY CLOUDY' },
];

// ── RISK MARKERS ──
const RISK_MARKERS = [
  { lat:49.0, lng:32.0, name:'UKRAINE — CRITICAL', type:'risk', color:'#ef4444', size:1.4, detail:'Geopolitical: 95/100 · Sanctions active · Supply: Disrupted · NATO activated', price:'RISK 95', chg:'CRITICAL' },
  { lat:14.0, lng:44.0, name:'RED SEA — HIGH', type:'risk', color:'#ef4444', size:1.2, detail:'Shipping disruption · Insurance +400% · Oil transport +$3/bbl · LMT BAE beneficiary', price:'RISK 82', chg:'HIGH' },
  { lat:23.0, lng:120.0, name:'TAIWAN — ELEVATED', type:'risk', color:'#f59e0b', size:1.0, detail:'TSMC concentration · PLA exercises · NVDA supply chain exposure · 54% chips here', price:'RISK 68', chg:'ELEVATED' },
  { lat:55.7, lng:37.6, name:'RUSSIA — SANCTIONS', type:'risk', color:'#ef4444', size:1.0, detail:'Full SWIFT exclusion · TKA steel competition · Energy redirect · Gold accumulation', price:'RISK 88', chg:'CRITICAL' },
  { lat:35.0, lng:104.0, name:'CHINA — MONITOR', type:'risk', color:'#f59e0b', size:0.9, detail:'Taiwan PLA exercises · Rare earth export risk · HAG/NVDA supply chain', price:'RISK 58', chg:'ELEVATED' },
  { lat:24.0, lng:45.0, name:'MIDDLE EAST — HIGH', type:'risk', color:'#ef4444', size:0.9, detail:'OIL supply risk · Strait of Hormuz · US carrier presence required', price:'RISK 71', chg:'HIGH' },
  { lat:51.5, lng:-0.1, name:'UK — LOW', type:'risk', color:'#22c55e', size:0.6, detail:'BAE domicile · NATO core · Stable political · Post-Brexit FX risk only', price:'RISK 18', chg:'LOW' },
  { lat:38.9, lng:-77.0, name:'USA — STABLE', type:'risk', color:'#22c55e', size:0.7, detail:'LMT NVDA META MSFT GOOGL XOM CVX · Election year noise only · Core stable', price:'RISK 14', chg:'LOW' },
];

// ── TRADE ROUTES ──
const TRADE_ROUTES = [
  // Defense exports from HQ cities
  { from:[51.23,6.77], to:[52.52,13.4], label:'RHM → Bundeswehr', color:'#22c55e', width:2, value:'EUR 4.2B' },
  { from:[51.23,6.77], to:[49.0,32.0], label:'RHM → Ukraine', color:'#22c55e', width:1.5, value:'EUR 1.8B' },
  { from:[51.23,6.77], to:[47.5,19.04], label:'RHM → Hungary (Lynx)', color:'#22c55e', width:1.5, value:'$2B' },
  { from:[38.9,-77.0], to:[52.23,21.0], label:'LMT → Poland (F-35)', color:'#22c55e', width:2.5, value:'$5.2B' },
  { from:[38.9,-77.0], to:[24.68,46.72], label:'LMT → Saudi (THAAD)', color:'#22c55e', width:1.5, value:'$4B' },
  { from:[59.27,16.48], to:[47.5,19.04], label:'SAAB → Hungary (Gripen)', color:'#22c55e', width:1.5, value:'SEK 12B' },
  // Oil flows
  { from:[6.8,-58.16], to:[38.9,-77.0], label:'XOM Guyana crude → US', color:'#f59e0b', width:2, value:'$650K bpd' },
  { from:[6.8,-58.16], to:[51.5,-0.1], label:'Guyana crude → Europe', color:'#f59e0b', width:1.5, value:'$200K bpd' },
  { from:[25.0,55.0], to:[51.5,-0.1], label:'Gulf LNG → Europe', color:'#f59e0b', width:1.5, value:'LNG trade' },
  { from:[25.0,55.0], to:[35.7,139.7], label:'Gulf LNG → Japan', color:'#f59e0b', width:1.5, value:'LNG trade' },
  // Tech supply chains
  { from:[25.04,121.53], to:[37.37,-122.03], label:'TSMC → NVDA (wafers)', color:'#3b82f6', width:2, value:'CRITICAL' },
  { from:[37.37,-122.03], to:[47.64,-122.13], label:'NVDA → MSFT (H200)', color:'#3b82f6', width:1.5, value:'$10B+' },
  { from:[37.37,-122.03], to:[37.48,-122.15], label:'NVDA → META (150K GPU)', color:'#3b82f6', width:1.5, value:'$8B' },
  { from:[37.37,-122.03], to:[37.42,-122.08], label:'NVDA → Google DC', color:'#3b82f6', width:1.5, value:'$15B' },
  // Red Sea risk route
  { from:[14.0,44.0], to:[29.9,32.5], label:'Suez Canal → Med (disrupted)', color:'#ef4444', width:1.5, value:'BLOCKED/RISK' },
];

// ── NEWS DATA ──
const NEWS_DATA = [
  { src:'WSJ', sc:'s-wsj', t:'F-35: Poland Orders 145 Aircraft in $5.2B Contract', d:'Lockheed Martin confirms delivery 2027-2030. Backlog reinforced. NATO standardization deepens.', tag:'DEFENSE', secs:['def'], ai:true, sig:'up', url:'https://wsj.com', img:'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=400&q=60' },
  { src:'BLOOMBERG', sc:'s-blg', t:'Rheinmetall Secures EUR 4.2B Bundeswehr Artillery Contract', d:'German defense giant wins multi-year deal. Order backlog now exceeds EUR 52 billion.', tag:'DEFENSE', secs:['def'], ai:true, sig:'up', url:'https://bloomberg.com', img:'https://images.unsplash.com/photo-1562408590-e32931084e23?w=400&q=60' },
  { src:"BARRON'S", sc:'s-bar', t:'NVIDIA Blackwell: Why $200B AI Capex Is Just the Beginning', d:'Microsoft, Meta, Google committed record AI infrastructure. DC revenue +120% YoY confirmed.', tag:'AI/TECH', secs:['tech'], ai:true, sig:'up', url:'https://barrons.com', img:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=60' },
  { src:'BLOOMBERG', sc:'s-blg', t:'USS Gravely Intercepts 14th Houthi Drone in Red Sea', d:'LMT AMRAAM + CIWS demand confirmed. Commercial shipping detour adds $3/bbl transport cost.', tag:'GEOPOLITICS', secs:['geo','def','oil'], ai:true, sig:'up', url:'https://bloomberg.com', img:'https://images.unsplash.com/photo-1545987796-200677ee1011?w=400&q=60' },
  { src:'WSJ', sc:'s-wsj', t:'Federal Reserve Signals Patience as Core PCE Approaches', d:'Data-dependent stance. Market pricing 2 cuts in 2025. Thursday PCE decisive for rate path.', tag:'MACRO', secs:['idx'], ai:true, sig:'neutral', url:'https://wsj.com', img:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=60' },
  { src:'SEEKING ALPHA', sc:'s-sa', t:'ExxonMobil Q4: Guyana Sets Up 2025 Outperformance', d:'Stabroek block 650K bpd. Lowest breakeven $35/bbl globally. Dividend yield 3.4% — institutional grade.', tag:'OIL', secs:['oil'], ai:true, sig:'up', url:'https://seekingalpha.com', img:'https://images.unsplash.com/photo-1537884944318-390069bb8665?w=400&q=60' },
  { src:"BARRON'S", sc:'s-bar', t:'SAAB: Sweden NATO Membership Creates Structural Investment Case', d:'Gripen-E export pipeline building. NATO premium. Institutions re-rating Swedish defense sector.', tag:'DEFENSE', secs:['def'], ai:true, sig:'up', url:'https://barrons.com', img:'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=400&q=60' },
  { src:'BLOOMBERG', sc:'s-blg', t:'PLA Navy: Third Taiwan Strait Crossing This Month', d:'US 7th Fleet monitoring. TSMC supply chain risk flagged by institutions. Scenario planning required.', tag:'GEOPOLITICS', secs:['geo'], ai:true, sig:'neutral', url:'https://bloomberg.com', img:'https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?w=400&q=60' },
  { src:'REUTERS', sc:'s-rt', t:'ECB Expected to Cut 25bp Thursday — EUR Weakness Follows', d:'Consensus near-certain. EUR/USD pressure at 1.08 support. EU defense stocks FX headwind moderate.', tag:'EU/MACRO', secs:['idx'], ai:true, sig:'neutral', url:'https://reuters.com', img:'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&q=60' },
  { src:'FT', sc:'s-ft', t:'ThyssenKrupp Steel Faces EUR 3B Write-Down Risk', d:'Chinese dumping -25% margin. Restructuring costs EUR 800M+. Capital misallocated vs RHM opportunity cost.', tag:'DEFENSE', secs:['def'], ai:true, sig:'dn', url:'https://ft.com', img:'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=60' },
  { src:'BLOOMBERG', sc:'s-blg', t:'Gold Hits All-Time High $2,934 — Central Banks at Record Pace', d:'China, India, Russia accumulated 1,035 tonnes in 2024. Goldman target raised to $3,100.', tag:'COMMODITIES', secs:['idx','geo'], ai:true, sig:'up', url:'https://bloomberg.com', img:'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&q=60' },
  { src:'WSJ', sc:'s-wsj', t:'NATO: All 32 Members Hit Bravo Readiness Standard', d:'23 members now above 2% GDP defense spend. Structural rearmament cycle confirmed for decade.', tag:'GEOPOLITICS', secs:['geo','def'], ai:true, sig:'up', url:'https://wsj.com', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=60' },
  { src:'SEEKING ALPHA', sc:'s-sa', t:'Chevron CVX: Hess Integration Complete, $14B Annual FCF', d:'10% production growth through 2026. Permian + Guyana offshore. Dividend yield 4.1%.', tag:'OIL', secs:['oil'], ai:false, sig:'up', url:'https://seekingalpha.com', img:'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=60' },
  { src:"BARRON'S", sc:'s-bar', t:'Microsoft Azure AI +31% YoY — Copilot Adoption Doubles', d:'Enterprise AI accelerating. GitHub Copilot 1.3M paid. Azure beating AWS on AI workloads.', tag:'AI/TECH', secs:['tech'], ai:false, sig:'up', url:'https://barrons.com', img:'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=60' },
  { src:'YAHOO FINANCE', sc:'s-yf', t:'Meta Platforms: Llama 4 Accelerates Enterprise AI Adoption', d:'Open-source strategy captures enterprise. $60B buyback active. Ray-Ban AI selling out globally.', tag:'AI/TECH', secs:['tech'], ai:false, sig:'up', url:'https://finance.yahoo.com', img:'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=400&q=60' },
];

// ── WATCHLIST ──
const WL_DATA = [
  { s:'RHM', p:'EUR 831', c:'+2.88%', u:true, tv:'XETR:RHM' },
  { s:'LMT', p:'$468.30', c:'+1.22%', u:true, tv:'NASDAQ:LMT' },
  { s:'SAAB-B', p:'SEK 388', c:'+1.55%', u:true, tv:'OMX:SAAB_B' },
  { s:'BAE', p:'GBP 12.40', c:'+0.88%', u:true, tv:'LSE:BA' },
  { s:'HAG', p:'EUR 36.20', c:'-0.44%', u:false, tv:'XETR:HAG' },
  { s:'TKA', p:'EUR 5.84', c:'-1.20%', u:false, tv:'XETR:TKA' },
  { s:'NVDA', p:'$138.20', c:'+3.41%', u:true, tv:'NASDAQ:NVDA' },
  { s:'META', p:'$612.40', c:'+1.22%', u:true, tv:'NASDAQ:META' },
  { s:'MSFT', p:'$418.30', c:'+0.88%', u:true, tv:'NASDAQ:MSFT' },
  { s:'GOOGL', p:'$198.70', c:'+0.71%', u:true, tv:'NASDAQ:GOOGL' },
  { s:'XOM', p:'$118.40', c:'+0.55%', u:true, tv:'NYSE:XOM' },
  { s:'CVX', p:'$156.20', c:'+0.38%', u:true, tv:'NYSE:CVX' },
  { s:'GOLD', p:'$2,934', c:'+0.67%', u:true, tv:'TVC:GOLD' },
  { s:'OIL', p:'$74.82', c:'-1.12%', u:false, tv:'TVC:USOIL' },
  { s:'BTC', p:'98,420', c:'+2.14%', u:true, tv:'BITSTAMP:BTCUSD' },
];

// ── POSITIONS TABLE ──
const POSITIONS = [
  { sym:'RHM', sector:'DEFENSE', price:'EUR 831', chg:'+2.88%', u:true, sig:'BUY ZONE', sc:'sig-g', note:'Top conviction — EUR 52B backlog' },
  { sym:'LMT', sector:'DEFENSE', price:'$468.30', chg:'+1.22%', u:true, sig:'BUY ZONE', sc:'sig-g', note:'F-35 Poland 145 units' },
  { sym:'SAAB', sector:'DEFENSE', price:'SEK 388', chg:'+1.55%', u:true, sig:'BUY ZONE', sc:'sig-g', note:'NATO re-rate underway' },
  { sym:'BAE', sector:'DEFENSE', price:'GBP 12.40', chg:'+0.88%', u:true, sig:'HOLD', sc:'sig-a', note:'AUKUS watch' },
  { sym:'HAG', sector:'DEFENSE', price:'EUR 36.20', chg:'-0.44%', u:false, sig:'HOLD', sc:'sig-a', note:'Radar order pending' },
  { sym:'TKA', sector:'STEEL', price:'EUR 5.84', chg:'-1.20%', u:false, sig:'RISK ZONE', sc:'sig-r', note:'Rotate to RHM' },
  { sym:'NVDA', sector:'AI/TECH', price:'$138.20', chg:'+3.41%', u:true, sig:'BUY ZONE', sc:'sig-g', note:'Blackwell cycle' },
  { sym:'META', sector:'AI/TECH', price:'$612.40', chg:'+1.22%', u:true, sig:'BUY ZONE', sc:'sig-g', note:'$60B buyback' },
  { sym:'MSFT', sector:'TECH', price:'$418.30', chg:'+0.88%', u:true, sig:'HOLD', sc:'sig-a', note:'Azure +31%' },
  { sym:'GOOGL', sector:'AI/TECH', price:'$198.70', chg:'+0.71%', u:true, sig:'BUY ZONE', sc:'sig-g', note:'Cloud +28%' },
  { sym:'XOM', sector:'OIL', price:'$118.40', chg:'+0.55%', u:true, sig:'BUY ZONE', sc:'sig-g', note:'Guyana $35/bbl' },
  { sym:'CVX', sector:'OIL', price:'$156.20', chg:'+0.38%', u:true, sig:'BUY ZONE', sc:'sig-g', note:'FCF $14B div 4.1%' },
];

// ── DEFENDER AI SYSTEM PROMPT ──
const DEFENDER_SYSTEM = `You are DEFENDER — a private institutional investment intelligence system built exclusively for Jakub Skladany (Kubo), age 20, Czech Republic.
Style: BlackRock Aladdin x Bloomberg Terminal x Hedge Fund Risk Desk. Zero emotions, only data.

PORTFOLIO (130,000 CZK total):
- DEFENSE (30K CZK): LMT, RHM, SAAB-B, BAE, HAG, TKA
- TECH/AI (30K CZK): NVDA, META, MSFT, GOOGL  
- OIL (20K CZK): XOM, CVX
- CORE (50K CZK): S&P500 ETF + Dividend Kings, DCA 500 CZK/month

PHILOSOPHY: Generational wealth. Never sell core. Buy in crises. Follow capital flows not headlines.
GOAL: Build generational wealth — family companies and investment funds for his future family.

RULES:
- Respond in the language of the question (Czech or English)
- No emotions, no hype — data, probabilities, scenarios only
- Institutional style: facts, capital flows, risk-adjusted analysis
- End every response with: "📐 DEFENDER TEACHES:" — one key educational insight
- Always mention portfolio impact when analyzing geopolitical events

ACTIVATION COMMANDS:
- DEFENDER — MORNING BRIEFING → 8-section institutional daily briefing
- DEFENDER — FRIDAY CLOSE → weekly performance review  
- DEFENDER — SUNDAY STRATEGIC RESET → full strategic rebalance
- SIMULATION: [scenario] → Monte Carlo portfolio scenario analysis
- DEFENDER — PLAN FOR [ticker] → deep DCF analysis with fair value and entry zones`;

const SMART_REPLIES = {
  'morning briefing': `🛡️ DEFENDER — MORNING BRIEFING\n\n1️⃣ MACRO:\n🔴 Red Sea: USS Gravely intercept #14. LMT AMRAAM demand structural.\n🔴 Ukraine: Frontline stable. NATO BRAVO. RHM SAAB LMT LT bull thesis intact.\n🟡 Taiwan: PLA crossing #3. NVDA/TSMC exposure — monitor.\n🟡 Fed: Core PCE Thursday. Data-dependent stance.\n\n2️⃣ MARKETS:\nRisk-ON. SPX +0.42%. VIX 18.34 — elevated but not fear.\nInstitutions accumulating: Defense + AI. Retail in cash/ETFs.\nGold ATH $2,934. Central banks hoarding — geopolitical hedge.\n\n3️⃣ YOUR POSITIONS:\n🟢 RHM — Top conviction. EUR 4.2B contract. Backlog EUR 52B.\n🟢 LMT — F-35 Poland 145 units confirmed. Backlog $160B+.\n🟢 NVDA — Blackwell just starting. Do NOT sell before next earnings.\n🔴 TKA — Capital not working. Consider EUR 1 TKA = EUR 1 RHM rotation.\n\n7️⃣ STRATEGIC SENTENCE:\n"Institutions accumulate defense quietly. You are positioned correctly."\n\n📐 DEFENDER TEACHES: VIX 18 = institutions nervous but not scared. Buy zone starts below VIX 20. Panic zone: VIX 30+. Your entry targets: LMT <$450, RHM <EUR 800.`,
  
  'simulation': `⚡ DEFENDER SIM — NATO ESCALATION SCENARIO\n\n📊 PROBABILITY: 23% within 18 months\n\nPHASE 1 (PANIC): Everything -15-25%, correlation = 1.0\nPHASE 2 (DIFFERENTIATION): Defense +35-55%, Tech -30-50%, Oil volatile\nPHASE 3 (NEW BASELINE): Defense re-rated permanently higher\n\n🟢 LMT: +35-55% (F-35 acceleration, LRASM demand)\n🟢 RHM: +30-45% (Bundeswehr emergency orders)\n🟢 SAAB: +25-40% (Gripen exports, NATO standardization)\n🔴 NVDA: -30-50% (Taiwan supply chain risk, risk-off)\n🟡 XOM: ±5% (Guyana offshore unaffected by most scenarios)\n\n📐 DEFENDER TEACHES: BlackRock runs this exact scenario monthly. They buy defense in Phase 1 panic. Your job: keep 15% cash for Phase 1 dips in LMT/RHM.`,

  'plan for rhm': `🎯 DEFENDER — PLAN FOR RHM\n\nFUNDAMENTALS:\nBacklog: EUR 52B (3+ year revenue visibility)\nBundeswehr: EUR 4.2B confirmed\nRevenue 2025: EUR 15B+ (+35% YoY)\nEBIT margin: 14% → 15%+ target\n\nFAIR VALUE:\nDCF (8% discount, 25% growth 3Y): EUR 940-1,020\nP/E forward (24x vs sector 28x): EUR 870-950\nWeighted target: EUR 920-1,000\nCurrent: EUR 831 → 10-20% upside\n\n🟢 SIGNAL: BUY ZONE\n→ Accumulate EUR 800-860\n→ 12M target: EUR 950-1,050\n→ Mental stop: EUR 750 (below 200D MA)\n\n📐 DEFENDER TEACHES: Order backlog is the #1 metric for defense. EUR 52B = contracted revenues. This certainty doesn't exist in tech or consumer sectors.`,

  'tka': `⚠️ DEFENDER — TKA ANALYSIS\n\nPROBLEM:\nSteel division: Chinese dumping -25% margins\nWrite-down risk: EUR 3B\nRestructuring: EUR 800M+ cost\nTKA since Oct 2024: -18% vs RHM +44% → 62pp opportunity cost\n\nRECOMMENDATION:\n🔴 Sell 100% TKA → Rotate 100% to RHM\nYou realize -18% loss but free the capital\nRHM has 10-year structural tailwind. TKA does not.\n\n📐 DEFENDER TEACHES: Sunk cost fallacy is the #1 retail investor mistake. Ask: "Would I buy TKA TODAY at EUR 5.84?" If no — sell. Capital belongs where it works.`,
};
