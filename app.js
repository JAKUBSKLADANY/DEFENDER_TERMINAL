// ═══════════════════════════════════════════════════
// DEFENDER_TERMINAL — APP.JS
// Auth, navigation, news, markets, trading, AI
// ═══════════════════════════════════════════════════

// ── KEYS ──
var _K = { pw:'dft_pw', claude:'dft_cl', oai:'dft_oa', model:'dft_md', owm:'dft_owm', windy:'dft_wy', marine:'dft_mr' };
function hashPw(p) { var h=0; for(var i=0;i<p.length;i++){h=((h<<5)-h)+p.charCodeAt(i);h|=0;} return h.toString(36); }
var DEFAULT_PW = hashPw('123');
function getClaude() { return localStorage.getItem(_K.claude)||''; }
function getOAI()    { return localStorage.getItem(_K.oai)||''; }
function getModel()  { return localStorage.getItem(_K.model)||'claude-sonnet-4-6'; }

// ── AUTH ──
function doLogin() {
  var u = document.getElementById('l-user').value.trim();
  var p = document.getElementById('l-pass').value;
  var st = document.getElementById('lg-status');
  if (u !== 'OPERATOR_01') { st.textContent = 'ACCESS DENIED — INVALID OPERATOR ID'; st.style.color='#ef4444'; return; }
  var stored = localStorage.getItem(_K.pw) || DEFAULT_PW;
  if (hashPw(p) !== stored) { st.textContent = 'ACCESS DENIED — INVALID ACCESS CODE'; st.style.color='#ef4444'; return; }
  st.textContent = 'AUTHENTICATED — INITIALIZING DEFENDER...'; st.style.color='#22c55e';
  setTimeout(function() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    document.getElementById('app').style.flexDirection = 'column';
    initApp();
  }, 600);
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && document.getElementById('login-screen').style.display !== 'none') doLogin();
});

function doLogout() {
  document.getElementById('app').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
}

// ── NAVIGATION ──
function nav(id, tabEl) {
  document.querySelectorAll('.view').forEach(function(v) { v.classList.remove('on'); });
  document.querySelectorAll('.tb-tab').forEach(function(t) { t.classList.remove('on'); });
  document.getElementById(id).classList.add('on');
  if (tabEl) tabEl.classList.add('on');
  if (id === 'globe-view' && typeof initGlobe === 'function') {
    setTimeout(function() { if (!viewer) initGlobe(); }, 100);
  }
  if (id === 'mkts-view') drawCharts();
  if (id === 'brief-view') setBriefDate();
  if (id === 'trade-view') { initWatchlist(); if (!document.getElementById('tv-iframe').src.includes('tradingview')) tvLoad(); }
}

// ── CLOCK ──
function updateClock() {
  var n = new Date();
  var cet = new Date(n.toLocaleString('en-US', {timeZone:'Europe/Prague'}));
  var h = String(cet.getHours()).padStart(2,'0');
  var m = String(cet.getMinutes()).padStart(2,'0');
  var s = String(cet.getSeconds()).padStart(2,'0');
  var el = document.getElementById('tb-clk');
  if (el) el.textContent = h+':'+m+':'+s+' CET';
}
setInterval(updateClock, 1000);
updateClock();

// ── SIGINT HUD ──
var SIGS = ['SCANNING','UPLINK OK','PROCESSING','PASSIVE','RECEIVING','ANALYZING'];
var sigIdx = 0;
setInterval(function() {
  sigIdx = (sigIdx+1) % SIGS.length;
  var el = document.getElementById('h-sig');
  if (el) el.textContent = SIGS[sigIdx];
}, 2200);

// ── TICKER — duplicate for seamless scroll ──
(function() {
  var tk = document.getElementById('tk-scroll');
  if (tk) {
    var clone = tk.innerHTML;
    tk.innerHTML = clone + clone;
  }
})();

// ── NEWS / INTELLIGENCE ──
var curFilter = 'all';
function filterNews(f, el) {
  curFilter = f;
  document.querySelectorAll('.vb-btn').forEach(function(b) { b.classList.remove('on'); });
  if (el) el.classList.add('on');
  renderNews();
}
function renderNews() {
  var grid = document.getElementById('intel-grid');
  if (!grid) return;
  var items = NEWS_DATA.filter(function(n) {
    if (curFilter === 'all') return true;
    return n.secs && n.secs.indexOf(curFilter) > -1;
  });
  var sigMap = { up:'#22c55e', dn:'#ef4444', neutral:'#f59e0b' };
  var sigLbl = { up:'BULLISH', dn:'BEARISH', neutral:'NEUTRAL' };
  grid.innerHTML = items.map(function(n) {
    return '<a class="news-card" href="' + n.url + '" target="_blank" rel="noopener">' +
      (n.ai ? '<div class="news-ai">AI EYE</div>' : '') +
      '<div class="news-src"><span class="' + n.sc + '">' + n.src + '</span><span style="color:#555">' + n.tag + '</span></div>' +
      '<div class="news-img"><img src="' + n.img + '" alt="' + n.tag + '" onerror="this.parentElement.textContent=\'\'"></div>' +
      '<div class="news-title">' + n.t + '</div>' +
      '<div class="news-desc">' + n.d + '</div>' +
      '<div class="news-foot"><div class="news-tag">READ FULL</div><div style="font-size:7px;color:' + (sigMap[n.sig||'neutral']) + '">' + (sigLbl[n.sig||'neutral']) + '</div></div>' +
      '</a>';
  }).join('');
}

// ── MARKETS CHARTS ──
function drawCharts() {
  var cv1 = document.getElementById('cv-pf');
  var cv2 = document.getElementById('cv-rr');
  if (!cv1 || !cv2) return;
  setTimeout(function() {
    // Portfolio sparkline
    var W = cv1.offsetWidth * 2, H = 120;
    cv1.width = W; cv1.height = H;
    var ctx1 = cv1.getContext('2d');
    var pfData = [100,101,98,104,107,111,108,115,118,122,119,128];
    drawLine(ctx1, pfData, '#22c55e', 'rgba(34,197,94,0.08)', W, H);

    // Risk/return scatter
    cv2.width = cv2.offsetWidth * 2;
    cv2.height = 120;
    var ctx2 = cv2.getContext('2d');
    drawRR(ctx2, cv2.width, cv2.height);

    // Positions table
    buildPositionsTable();
  }, 50);
}

function drawLine(ctx, data, stroke, fill, w, h) {
  ctx.clearRect(0,0,w,h);
  var mn=Math.min(...data), mx=Math.max(...data), rng=mx-mn||1;
  var pts=data.map(function(v,i){ return [i/(data.length-1)*w, h-((v-mn)/rng)*(h*0.8)-h*0.1]; });
  ctx.beginPath(); ctx.moveTo(pts[0][0],pts[0][1]);
  pts.slice(1).forEach(function(p){ctx.lineTo(p[0],p[1]);});
  ctx.strokeStyle=stroke; ctx.lineWidth=2; ctx.stroke();
  ctx.lineTo(w,h); ctx.lineTo(0,h); ctx.closePath();
  ctx.fillStyle=fill; ctx.fill();
}

function drawRR(ctx, w, h) {
  ctx.clearRect(0,0,w,h);
  ctx.strokeStyle='#1a1a2a'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(w/2,0); ctx.lineTo(w/2,h); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,h/2); ctx.lineTo(w,h/2); ctx.stroke();
  var pts = [
    {sym:'LMT',r:12,risk:8,col:'#22c55e'},{sym:'RHM',r:28,risk:9,col:'#22c55e'},
    {sym:'NVDA',r:35,risk:22,col:'#3b82f6'},{sym:'META',r:18,risk:14,col:'#3b82f6'},
    {sym:'XOM',r:8,risk:6,col:'#f59e0b'},{sym:'TKA',r:-18,risk:20,col:'#ef4444'},
  ];
  pts.forEach(function(p) {
    var x=(p.r+40)/80*w, y=h-(p.risk/30)*h;
    ctx.beginPath(); ctx.arc(x,y,5,0,Math.PI*2);
    ctx.fillStyle=p.col; ctx.fill();
    ctx.fillStyle='#fff'; ctx.font='bold 16px IBM Plex Mono'; ctx.textAlign='center';
    ctx.fillText(p.sym,x,y-9);
  });
}

function buildPositionsTable() {
  var el = document.getElementById('pos-table');
  if (!el) return;
  el.innerHTML = '<div class="pos-row hdr"><div>SYM</div><div>SECTOR</div><div>PRICE</div><div>1D</div><div>SIGNAL</div><div>INTEL</div></div>' +
    POSITIONS.map(function(p) {
      return '<div class="pos-row">' +
        '<div class="pos-sym">' + p.sym + '</div>' +
        '<div style="font-size:7px;color:#666">' + p.sector + '</div>' +
        '<div style="font-size:8px">' + p.price + '</div>' +
        '<div class="' + (p.u?'sig-g':'sig-r') + '">' + p.chg + '</div>' +
        '<div class="' + p.sc + '" style="font-size:7px;font-weight:700">' + p.sig + '</div>' +
        '<div style="font-size:7px;color:#666">' + p.note + '</div>' +
        '</div>';
    }).join('');
}

// ── TRADING ──
function initWatchlist() {
  var el = document.getElementById('wl-items');
  if (!el || el.children.length > 0) return;
  el.innerHTML = WL_DATA.map(function(w) {
    return '<div class="wl-row" onclick="tvSet(\'' + w.tv + '\')">' +
      '<div class="wl-sym">' + w.s + '</div>' +
      '<div><div class="wl-price">' + w.p + '</div><div class="wl-chg ' + (w.u?'up':'dn') + '">' + w.c + '</div></div>' +
      '</div>';
  }).join('');
}
function tvSet(sym) { document.getElementById('tv-sym').value = sym; tvLoad(); }
function tvSetAndGo(sym) { tvSet(sym); nav('trade-view', document.querySelectorAll('.tb-tab')[3]); }
function tvLoad() {
  var sym = document.getElementById('tv-sym').value.trim() || 'NASDAQ:NVDA';
  document.getElementById('tv-iframe').src = 'https://www.tradingview.com/widgetembed/?frameElementId=tv-iframe&symbol=' + encodeURIComponent(sym) + '&interval=D&theme=dark&style=1&timezone=Europe/Prague&withdateranges=1&showpopupbutton=1&studies=RSI%40tv-basicstudies%1FBB%40tv-basicstudies&locale=en';
}

// ── BRIEFING ──
function setBriefDate() {
  var n = new Date();
  var days=['SUN','MON','TUE','WED','THU','FRI','SAT'];
  var months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  var el = document.getElementById('brief-date');
  if (el) el.textContent = days[n.getDay()] + ' ' + String(n.getDate()).padStart(2,'0') + ' ' + months[n.getMonth()] + ' ' + n.getFullYear() + ' \u00b7 CET';
}

// ── AI CHAT ──
var chatHistory = [], msgCount = 0;

function updateAIStatus() {
  var ok = getClaude() || getOAI();
  var el = document.getElementById('ai-key-status');
  if (el) { el.className = 'ais-status ' + (ok?'ok':'no'); el.textContent = ok ? '\u2713 AI CONNECTED' : '\u2715 NO API KEY'; }
  var st = document.getElementById('ai-conn-st');
  var cm = document.getElementById('ai-cur-mdl');
  if (st) { st.textContent = ok ? 'AI CONNECTED \u00b7 ' + getModel().toUpperCase() : 'SET API KEY IN CONFIG'; st.style.color = ok?'#22c55e':'#444'; }
  if (cm) cm.textContent = ok ? getModel() : 'NOT SET';
}

async function sendMsg() {
  var inp = document.getElementById('ai-input');
  var q = inp.value.trim();
  if (!q) return;
  appendMsg('usr', q);
  inp.value = '';
  chatHistory.push({ role:'user', content:q });
  msgCount++;
  var mc = document.getElementById('ai-msg-cnt');
  if (mc) mc.textContent = msgCount;
  var thinking = appendThinking();
  var hasKey = getClaude() || getOAI();
  if (!hasKey) {
    var ql = q.toLowerCase();
    var resp = null;
    for (var k in SMART_REPLIES) { if (ql.includes(k)) { resp = SMART_REPLIES[k]; break; } }
    if (!resp) resp = 'DEFENDER AI: Set your Claude API key in \u2699 CONFIG to unlock live institutional intelligence.\n\nAvailable offline: MORNING BRIEFING, SIMULATION, PLAN FOR RHM, TKA DECISION\n\n\ud83d\udcd0 DEFENDER TEACHES: The API key is your gateway to live AI analysis. Visit anthropic.com to get yours.';
    setTimeout(function() { thinking.remove(); appendMsg('ai', resp.replace(/\n/g,'<br>')); }, 1000 + Math.random()*400);
    return;
  }
  try {
    var resp2;
    if (getClaude() && getModel().startsWith('claude')) {
      var r = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{'Content-Type':'application/json','x-api-key':getClaude(),'anthropic-version':'2023-06-01'},
        body: JSON.stringify({ model:getModel(), max_tokens:1800, system:DEFENDER_SYSTEM, messages:chatHistory.slice(-14) })
      });
      var d = await r.json();
      resp2 = (d.content && d.content[0] && d.content[0].text) || 'Response unavailable.';
    } else {
      var r2 = await fetch('https://api.openai.com/v1/chat/completions', {
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+getOAI()},
        body: JSON.stringify({ model:'gpt-4o', max_tokens:1800, messages:[{role:'system',content:DEFENDER_SYSTEM},...chatHistory.slice(-14)] })
      });
      var d2 = await r2.json();
      resp2 = (d2.choices && d2.choices[0] && d2.choices[0].message && d2.choices[0].message.content) || 'Response unavailable.';
    }
    thinking.remove();
    chatHistory.push({ role:'assistant', content:resp2 });
    appendMsg('ai', resp2.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>'));
  } catch(err) {
    thinking.remove();
    appendMsg('ai', '\u26a0 API Error: ' + err.message);
  }
}

function appendMsg(role, html) {
  var msgs = document.getElementById('ai-messages');
  var wrap = document.createElement('div'); wrap.className = 'ai-msg ' + role;
  var av = document.createElement('div'); av.className = 'ai-av'; av.textContent = role==='ai'?'AI':'YOU';
  var inner = document.createElement('div');
  var bub = document.createElement('div'); bub.className = 'ai-bubble'; bub.innerHTML = html;
  var ts = document.createElement('div'); ts.className = 'ai-ts';
  var n = new Date(); ts.textContent = String(n.getHours()).padStart(2,'0') + ':' + String(n.getMinutes()).padStart(2,'0') + ' CET';
  inner.appendChild(bub); inner.appendChild(ts);
  wrap.appendChild(av); wrap.appendChild(inner);
  msgs.appendChild(wrap); msgs.scrollTop = msgs.scrollHeight;
}

function appendThinking() {
  var msgs = document.getElementById('ai-messages');
  var wrap = document.createElement('div'); wrap.className = 'ai-msg ai';
  var av = document.createElement('div'); av.className = 'ai-av'; av.textContent = 'AI';
  var bub = document.createElement('div'); bub.className = 'ai-bubble';
  bub.innerHTML = '<div class="ai-think"><div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div></div>';
  wrap.appendChild(av); wrap.appendChild(bub);
  msgs.appendChild(wrap); msgs.scrollTop = msgs.scrollHeight;
  return wrap;
}

function qPrompt(t) { document.getElementById('ai-input').value = t; sendMsg(); }
function aiKeyDown(e) { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); } }
function clearChat() {
  chatHistory = []; msgCount = 0;
  var mc = document.getElementById('ai-msg-cnt'); if(mc) mc.textContent = '0';
  var msgs = document.getElementById('ai-messages'); if(msgs) msgs.innerHTML = '';
  appendMsg('ai', '\ud83d\udee1\ufe0f DEFENDER session cleared. Ready for new intelligence briefing.');
}

// ── SETTINGS ──
function openSett() {
  document.getElementById('s-claude').value = getClaude();
  document.getElementById('s-oai').value = getOAI();
  document.getElementById('s-model').value = getModel();
  var sw=document.getElementById('s-windy'); if(sw) sw.value=localStorage.getItem(_K.windy)||'';
  var so=document.getElementById('s-owm');   if(so) so.value=localStorage.getItem(_K.owm)||'';
  var sm=document.getElementById('s-marine');if(sm) sm.value=localStorage.getItem(_K.marine)||'';
  document.getElementById('s-msg').textContent = '';
  document.getElementById('setm').classList.add('on');
}
function closeSett() { document.getElementById('setm').classList.remove('on'); }
function saveSettings() {
  var curpw = document.getElementById('s-curpw').value;
  var newpw = document.getElementById('s-newpw').value;
  var confpw= document.getElementById('s-confpw').value;
  var msg = document.getElementById('s-msg');
  if (newpw) {
    if (hashPw(curpw) !== (localStorage.getItem(_K.pw)||DEFAULT_PW)) { msg.style.color='#ef4444'; msg.textContent='WRONG CURRENT PASSWORD'; return; }
    if (newpw !== confpw) { msg.style.color='#ef4444'; msg.textContent='PASSWORDS DO NOT MATCH'; return; }
    localStorage.setItem(_K.pw, hashPw(newpw));
  }
  var cl=document.getElementById('s-claude').value.trim();
  var oa=document.getElementById('s-oai').value.trim();
  var md=document.getElementById('s-model').value;
  var wy=document.getElementById('s-windy')?document.getElementById('s-windy').value.trim():'';
  var owm=document.getElementById('s-owm')?document.getElementById('s-owm').value.trim():'';
  var mr=document.getElementById('s-marine')?document.getElementById('s-marine').value.trim():'';
  if(cl) localStorage.setItem(_K.claude,cl); else localStorage.removeItem(_K.claude);
  if(oa) localStorage.setItem(_K.oai,oa); else localStorage.removeItem(_K.oai);
  if(wy) localStorage.setItem(_K.windy,wy); else localStorage.removeItem(_K.windy);
  if(owm) localStorage.setItem(_K.owm,owm); else localStorage.removeItem(_K.owm);
  if(mr) localStorage.setItem(_K.marine,mr); else localStorage.removeItem(_K.marine);
  localStorage.setItem(_K.model, md);
  updateAIStatus();
  msg.style.color='#22c55e'; msg.textContent='CONFIGURATION SAVED \u2713';
  setTimeout(closeSett, 800);
}

// ── INIT ──
function initApp() {
  updateAIStatus();
  renderNews();
  buildPositionsTable();
  setBriefDate();
  appendMsg('ai', '\ud83d\udee1\ufe0f DEFENDER v2.0 ONLINE \u00b7 Welcome, OPERATOR_01\n\n12 portfolio positions tracked \u00b7 Real-time 3D globe active \u00b7 Navigate to GLOBE to see your assets, war zones, trade routes and weather.\n\n\ud83d\udcd0 DEFENDER TEACHES: The globe is your intelligence layer — click any marker for full institutional analysis.');
  setTimeout(function() {
    if (!viewer) initGlobe();
  }, 500);
}
