/* ============================================================
   QuizVerse AI — main script
   Vanilla JS · Local storage · Routing · Quiz engine · Effects
============================================================ */
/* ---------- Question Bank ---------- */
const CATEGORIES = [
  { id:'tech',     name:'Technology',        icon:'💻', tag:'Tech' },
  { id:'prog',     name:'Programming',       icon:'⌨️', tag:'Code' },
  { id:'ai',       name:'Artificial Intelligence', icon:'🤖', tag:'AI' },
  { id:'web',      name:'Web Development',   icon:'🌐', tag:'Web' },
  { id:'cyber',    name:'Cybersecurity',     icon:'🔐', tag:'Sec' },
  { id:'physics',  name:'Physics',           icon:'⚛️', tag:'Science' },
  { id:'chem',     name:'Chemistry',         icon:'🧪', tag:'Science' },
  { id:'bio',      name:'Biology',           icon:'🧬', tag:'Science' },
  { id:'space',    name:'Space',             icon:'🪐', tag:'Science' },
  { id:'movies',   name:'Movies',            icon:'🎬', tag:'Fun' },
  { id:'tv',       name:'TV Shows',          icon:'📺', tag:'Fun' },
  { id:'anime',    name:'Anime',             icon:'🍙', tag:'Fun' },
  { id:'gaming',   name:'Gaming',            icon:'🎮', tag:'Fun' },
  { id:'history',  name:'History',           icon:'🏛️', tag:'GK' },
  { id:'geo',      name:'Geography',         icon:'🗺️', tag:'GK' },
  { id:'current',  name:'Current Affairs',   icon:'📰', tag:'GK' },
  { id:'people',   name:'Famous Personalities', icon:'🌟', tag:'GK' },
  { id:'cricket',  name:'Cricket',           icon:'🏏', tag:'Sports' },
  { id:'football', name:'Football',          icon:'⚽', tag:'Sports' },
  { id:'olympics', name:'Olympics',          icon:'🥇', tag:'Sports' },
  { id:'f1',       name:'Formula 1',         icon:'🏎️', tag:'Sports' },
  { id:'memes',    name:'Memes',             icon:'😂', tag:'Casual' },
  { id:'social',   name:'Social Media',      icon:'📱', tag:'Casual' },
  { id:'music',    name:'Music',             icon:'🎵', tag:'Casual' },
  { id:'facts',    name:'Random Facts',      icon:'💡', tag:'Casual' },
];
/* Helper to define a question quickly */
const q = (text, opts, correct, diff='easy', expl='') => ({text, opts, correct, diff, expl});
const BANK = {
  tech: [
    q('What does CPU stand for?',['Central Processing Unit','Computer Personal Unit','Central Processor Utility','Core Power Unit'],0,'easy','CPU = Central Processing Unit.'),
    q('Which company makes the M-series chips?',['Intel','AMD','Apple','Qualcomm'],2,'easy'),
    q('How many bits in a byte?',['4','8','16','32'],1,'easy'),
    q('Which is NOT an operating system?',['Linux','Oracle','Windows','macOS'],1,'medium'),
    q('What does HTTP stand for?',['Hyper Transfer Text Protocol','HyperText Transfer Protocol','High Transfer Text Protocol','HyperText Transmission Process'],1,'medium'),
    q('Which company founded Android?',['Google','Apple','Samsung','Android Inc.'],3,'hard','Android Inc. was acquired by Google in 2005.'),
    q('RAM is a type of?',['Storage','Memory','Processor','Power'],1,'easy'),
  ],
  prog: [
    q('Which language runs in a browser natively?',['Java','C','Python','JavaScript'],3,'easy'),
    q('Which symbol starts a comment in Python?',['//','#','/*','--'],1,'easy'),
    q('Big-O of binary search?',['O(n)','O(log n)','O(n log n)','O(1)'],1,'medium'),
    q('Which is NOT a JS framework?',['React','Vue','Laravel','Svelte'],2,'medium','Laravel is a PHP framework.'),
    q('What does API mean?',['App Process Interface','Application Programming Interface','Applied Program Interaction','Auto Program Index'],1,'easy'),
    q('Which is a strongly-typed language?',['JavaScript','Python','TypeScript','PHP'],2,'medium'),
    q('Which sorting is O(n log n) average?',['Bubble','Insertion','Quick','Selection'],2,'hard'),
  ],
  ai: [
    q('What does AI stand for?',['Auto Intelligence','Artificial Intelligence','Applied Internet','Algorithmic Inference'],1,'easy'),
    q('Which is a popular LLM?',['GPT','HTTP','CSS','SQL'],0,'easy'),
    q('Neural networks are inspired by?',['Stars','The brain','The internet','Atoms'],1,'easy'),
    q('Which framework is by Google?',['PyTorch','TensorFlow','MXNet','Caffe'],1,'medium'),
    q('Supervised learning uses?',['No data','Labeled data','Only images','Random data'],1,'medium'),
    q('What is "tokenization" in NLP?',['Encrypting text','Splitting text into units','Translating text','Compressing text'],1,'hard'),
  ],
  web: [
    q('CSS stands for?',['Computer Style Sheets','Cascading Style Sheets','Creative Style System','Coded Style Set'],1,'easy'),
    q('Which tag creates a hyperlink?',['<link>','<a>','<href>','<url>'],1,'easy'),
    q('Which is a CSS preprocessor?',['SASS','HTML','JSON','XML'],0,'medium'),
    q('Default HTTP port?',['21','22','80','443'],2,'medium'),
    q('Which company created React?',['Google','Microsoft','Meta','Twitter'],2,'easy'),
    q('Which storage persists across sessions?',['sessionStorage','localStorage','cookieJar','memory'],1,'medium'),
  ],
  cyber: [
    q('What is phishing?',['A type of malware','Fraud to steal info','A firewall type','Encryption'],1,'easy'),
    q('HTTPS uses which protocol?',['SSL/TLS','FTP','SSH','SMTP'],0,'medium'),
    q('A strong password should…',['Be your name','Be 12+ chars and mixed','Use only digits','Be your birthday'],1,'easy'),
    q('DDoS stands for?',['Direct Denial of Service','Distributed Denial of Service','Data Deletion of Service','Dynamic Defense Override'],1,'medium'),
    q('Which is a hashing algorithm?',['AES','SHA-256','RSA','Base64'],1,'hard'),
  ],
  physics: [
    q('Speed of light (approx) in m/s?',['3×10^5','3×10^8','3×10^6','3×10^10'],1,'medium'),
    q('Unit of force?',['Joule','Newton','Pascal','Watt'],1,'easy'),
    q('Gravity on Earth (approx)?',['9.8 m/s²','5 m/s²','12 m/s²','15 m/s²'],0,'easy'),
    q('Who proposed relativity?',['Newton','Einstein','Tesla','Hawking'],1,'easy'),
    q('Smallest particle of matter?',['Atom','Molecule','Quark','Cell'],2,'hard'),
  ],
  chem: [
    q('Symbol for gold?',['Go','Au','Ag','Gd'],1,'easy'),
    q('Water is?',['H2O','HO2','H3O','O2H'],0,'easy'),
    q('pH of pure water?',['5','7','9','12'],1,'easy'),
    q('Most abundant gas in air?',['Oxygen','Nitrogen','CO2','Argon'],1,'medium'),
    q('Atomic number of Carbon?',['4','6','8','12'],1,'medium'),
  ],
  bio: [
    q('Powerhouse of the cell?',['Nucleus','Mitochondria','Ribosome','Golgi'],1,'easy'),
    q('DNA stands for?',['Deoxyribonucleic Acid','Dual Nucleotide Acid','Deoxy Nitric Acid','Dynamic Nuclear Acid'],0,'medium'),
    q('Humans have how many chromosomes?',['23','46','42','48'],1,'medium'),
    q('Largest organ in the body?',['Liver','Brain','Skin','Heart'],2,'easy'),
  ],
  space: [
    q('Largest planet?',['Earth','Mars','Saturn','Jupiter'],3,'easy'),
    q('Closest star to Earth?',['Sun','Proxima Centauri','Sirius','Alpha Centauri'],0,'easy'),
    q('Galaxy we live in?',['Andromeda','Milky Way','Whirlpool','Triangulum'],1,'easy'),
    q('Year of first Moon landing?',['1965','1969','1972','1958'],1,'medium'),
    q('A "light year" measures?',['Time','Distance','Brightness','Speed'],1,'medium'),
  ],
  movies: [
    q('Director of Inception?',['Spielberg','Nolan','Cameron','Tarantino'],1,'easy'),
    q('Highest-grossing film (2023)?',['Avatar','Titanic','Avengers: Endgame','Avatar: The Way of Water'],0,'medium'),
    q('Who played Iron Man?',['Chris Evans','Robert Downey Jr.','Mark Ruffalo','Tom Holland'],1,'easy'),
    q('Studio behind Toy Story?',['DreamWorks','Pixar','Disney','Sony'],1,'easy'),
  ],
  tv: [
    q('"Breaking Bad" main character?',['Walter White','Jesse Pinkman','Saul Goodman','Hank'],0,'easy'),
    q('Network behind Stranger Things?',['HBO','Netflix','Prime','Apple TV'],1,'easy'),
    q('"Game of Thrones" is based on?',['Wheel of Time','ASOIAF','LOTR','The Witcher'],1,'medium'),
  ],
  anime: [
    q('Author of One Piece?',['Kishimoto','Oda','Toriyama','Kubo'],1,'easy'),
    q('Main character of Naruto?',['Sasuke','Naruto','Kakashi','Itachi'],1,'easy'),
    q('Studio of Attack on Titan (S1-3)?',['MAPPA','Wit Studio','Ufotable','Bones'],1,'medium'),
    q('"Demon Slayer" main character?',['Tanjiro','Zenitsu','Inosuke','Giyu'],0,'easy'),
  ],
  gaming: [
    q('Creator of Minecraft?',['Notch','Gabe','Miyamoto','Carmack'],0,'easy'),
    q('Mario is from which company?',['Sega','Sony','Nintendo','Microsoft'],2,'easy'),
    q('"Fortnite" was released by?',['Epic Games','Valve','Activision','EA'],0,'easy'),
    q('PUBG genre?',['MOBA','Battle Royale','RTS','MMO'],1,'easy'),
  ],
  history: [
    q('WWII ended in?',['1942','1945','1948','1950'],1,'easy'),
    q('First President of USA?',['Lincoln','Washington','Jefferson','Adams'],1,'easy'),
    q('Year India gained independence?',['1942','1945','1947','1950'],2,'easy'),
    q('Great Wall is in?',['India','Japan','China','Korea'],2,'easy'),
  ],
  geo: [
    q('Largest ocean?',['Atlantic','Indian','Arctic','Pacific'],3,'easy'),
    q('Capital of Australia?',['Sydney','Melbourne','Canberra','Perth'],2,'medium'),
    q('Longest river?',['Amazon','Nile','Yangtze','Mississippi'],1,'medium'),
    q('Smallest country?',['Monaco','Vatican City','San Marino','Malta'],1,'medium'),
  ],
  current: [
    q('Headquarters of the UN?',['Geneva','New York','Paris','Vienna'],1,'easy'),
    q('Currency of Japan?',['Won','Yen','Yuan','Ringgit'],1,'easy'),
    q('SpaceX founder?',['Bezos','Musk','Branson','Page'],1,'easy'),
  ],
  people: [
    q('Theory of relativity?',['Newton','Einstein','Bohr','Curie'],1,'easy'),
    q('Painted the Mona Lisa?',['Van Gogh','Da Vinci','Picasso','Michelangelo'],1,'easy'),
    q('CEO of Tesla (2024)?',['Cook','Musk','Pichai','Nadella'],1,'easy'),
  ],
  cricket: [
    q('Most ODI runs (all-time)?',['Tendulkar','Kohli','Ponting','Sangakkara'],0,'easy'),
    q('Cricket originated in?',['India','England','Australia','SA'],1,'easy'),
    q('How many players in a team?',['9','10','11','12'],2,'easy'),
    q('First T20 World Cup winner?',['India','Pakistan','Australia','SL'],0,'medium'),
  ],
  football: [
    q('Most Ballon d\'Or wins?',['Ronaldo','Messi','Pelé','Maradona'],1,'easy'),
    q('FIFA World Cup is held every?',['2 years','3 years','4 years','5 years'],2,'easy'),
    q('Champions League is for?',['Countries','European clubs','World clubs','Africa'],1,'easy'),
  ],
  olympics: [
    q('Olympics held every?',['2 years','3 years','4 years','5 years'],2,'easy'),
    q('Olympic rings count?',['4','5','6','7'],1,'easy'),
    q('Olympic motto contains?',['Stronger','Fast','Proud','Brave'],0,'medium'),
  ],
  f1: [
    q('Most F1 titles (tied)?',['Hamilton & Schumacher','Senna','Vettel','Alonso'],0,'medium'),
    q('Monaco GP is held in?',['Italy','France','Monaco','Spain'],2,'easy'),
    q('Red Bull driver (2024) world champ?',['Verstappen','Perez','Sainz','Norris'],0,'easy'),
  ],
  memes: [
    q('"Doge" meme features?',['Cat','Shiba Inu','Frog','Bird'],1,'easy'),
    q('"Stonks" implies?',['Loss','Gain','Crash','Neutral'],1,'easy'),
    q('Rickroll song?',['Despacito','Never Gonna Give You Up','Friday','Baby'],1,'easy'),
  ],
  social: [
    q('Instagram is owned by?',['Google','Meta','Twitter','TikTok'],1,'easy'),
    q('TikTok parent company?',['ByteDance','Tencent','Alibaba','Baidu'],0,'medium'),
    q('"X" was formerly?',['Facebook','Twitter','Snapchat','MySpace'],1,'easy'),
  ],
  music: [
    q('"Bohemian Rhapsody" by?',['Beatles','Queen','U2','Pink Floyd'],1,'easy'),
    q('Most-streamed artist (2023)?',['Drake','Bad Bunny','Taylor Swift','The Weeknd'],2,'medium'),
    q('How many keys on a piano?',['76','88','100','108'],1,'medium'),
  ],
  facts: [
    q('Honey never…',['Freezes','Spoils','Melts','Burns'],1,'easy','Honey can last for thousands of years.'),
    q('Bananas are technically?',['Vegetables','Berries','Nuts','Grains'],1,'medium'),
    q('Octopuses have how many hearts?',['1','2','3','4'],2,'medium'),
    q('A group of crows is called?',['Pack','Murder','Flock','Swarm'],1,'medium'),
  ],
};
/* ---------- State ---------- */
const STATE = {
  view:'home',
  cat:null,
  difficulty:'easy',
  count:10,
  timePerQ:30,
  questions:[],
  index:0,
  answers:[],     // {selected, correct, skipped, time}
  startTime:0,
  qStart:0,
  timerId:null,
  totalTime:0,
  bookmarks: loadLS('qv_bookmarks',[]),
  history:   loadLS('qv_history',[]),
  achievements: loadLS('qv_ach',[]),
  xp: loadLS('qv_xp',0),
  streak: loadLS('qv_streak',0),
  lastPlay: loadLS('qv_last',null),
  sound: loadLS('qv_sound',true),
  theme: loadLS('qv_theme','dark'),
};
function loadLS(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
function saveLS(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
/* ---------- Routing ---------- */
function go(view){
  STATE.view = view;
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active', v.dataset.view===view));
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.toggle('active', l.dataset.route===view));
  window.scrollTo({top:0,behavior:'smooth'});
  if(view==='dashboard') renderDashboard();
  if(view==='select') renderCats();
  if(view==='leaderboard') renderLeaderboard();
  if(view==='bookmarks') renderBookmarks();
  if(view==='home') renderHero();
}
document.querySelectorAll('[data-route]').forEach(el=>{
  el.addEventListener('click',()=>go(el.dataset.route));
});
/* ---------- Theme & Sound ---------- */
function applyTheme(){
  document.documentElement.classList.toggle('light', STATE.theme==='light');
  document.getElementById('themeToggle').textContent = STATE.theme==='light' ? '☀️':'🌙';
}
document.getElementById('themeToggle').onclick = ()=>{
  STATE.theme = STATE.theme==='light'?'dark':'light';
  saveLS('qv_theme',STATE.theme);applyTheme();
};
function applySound(){document.getElementById('soundToggle').textContent = STATE.sound?'🔊':'🔇'}
document.getElementById('soundToggle').onclick = ()=>{
  STATE.sound = !STATE.sound;saveLS('qv_sound',STATE.sound);applySound();
};
/* ---------- Sound (WebAudio beeps) ---------- */
let actx=null;
function beep(freq=440,dur=.12,type='sine',vol=.06){
  if(!STATE.sound) return;
  try{
    actx = actx || new (window.AudioContext||window.webkitAudioContext)();
    const o=actx.createOscillator(),g=actx.createGain();
    o.type=type;o.frequency.value=freq;
    g.gain.value=vol;o.connect(g);g.connect(actx.destination);
    o.start();g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime+dur);
    o.stop(actx.currentTime+dur);
  }catch(e){}
}
const SFX = {
  click: ()=>beep(600,.05,'square',.04),
  ok:    ()=>{beep(660,.1);setTimeout(()=>beep(990,.12),90)},
  bad:   ()=>beep(180,.18,'sawtooth',.06),
  done:  ()=>{beep(523,.12);setTimeout(()=>beep(659,.12),120);setTimeout(()=>beep(784,.18),240)},
};
/* ---------- Ripple ---------- */
document.addEventListener('click',e=>{
  const btn = e.target.closest('.ripple');
  if(!btn) return;
  SFX.click();
  const c=document.createElement('span');c.className='ripple-circle';
  const r=btn.getBoundingClientRect(),s=Math.max(r.width,r.height);
  c.style.width=c.style.height=s+'px';
  c.style.left=(e.clientX-r.left-s/2)+'px';
  c.style.top=(e.clientY-r.top-s/2)+'px';
  btn.appendChild(c);setTimeout(()=>c.remove(),600);
});
/* ---------- Hero ---------- */
function renderHero(){
  const h = STATE.history;
  const avg = h.length ? Math.round(h.reduce((s,x)=>s+x.pct,0)/h.length):0;
  const best = h.length ? Math.max(...h.map(x=>x.pct)):0;
  $('#heroQuizzes').textContent = h.length;
  $('#heroAvg').textContent = avg+'%';
  $('#heroBest').textContent = best+'%';
  $('#heroXP').textContent = STATE.xp;
  $('#heroLvl').textContent = level(STATE.xp).lvl;
}
/* ---------- Dashboard ---------- */
function level(xp){
  const lvl = Math.floor(xp/200)+1;
  const into = xp%200;
  return {lvl, into, pct: into/200*100};
}
function renderDashboard(){
  const h = STATE.history;
  $('#dashQuizzes').textContent = h.length;
  const avg = h.length ? Math.round(h.reduce((s,x)=>s+x.pct,0)/h.length):0;
  const best = h.length ? Math.max(...h.map(x=>x.pct)):0;
  $('#dashAvg').textContent = avg+'%';
  $('#dashBest').textContent = best+'%';
  $('#dashStreak').textContent = STATE.streak;
  // strongest / weakest by category avg
  const byCat={};
  h.forEach(x=>{byCat[x.catId]=byCat[x.catId]||[];byCat[x.catId].push(x.pct)});
  let best1=null,worst=null;
  Object.entries(byCat).forEach(([id,arr])=>{
    const a=arr.reduce((s,v)=>s+v,0)/arr.length;
    if(!best1||a>best1.a)best1={id,a};
    if(!worst||a<worst.a)worst={id,a};
  });
  const cName = id=>CATEGORIES.find(c=>c.id===id)?.name||'—';
  $('#dashStrong').textContent = best1?cName(best1.id):'—';
  $('#dashWeak').textContent = worst?cName(worst.id):'—';
  const avgT = h.length ? Math.round(h.reduce((s,x)=>s+x.avgTime,0)/h.length):0;
  $('#dashTime').textContent = avgT?avgT+'s':'—';
  const lv = level(STATE.xp);
  $('#dashLvl').textContent = lv.lvl;
  $('#dashXP').textContent = STATE.xp;
  $('#xpFill').style.width = lv.pct+'%';
  // badges
  const ALL = ['Quiz Master','Fast Thinker','Genius','Perfect Score','Knowledge Hunter','Streak x3','Streak x7'];
  $('#badgesList').innerHTML = ALL.map(b=>{
    const has = STATE.achievements.includes(b);
    return `<div class="badge ${has?'':'locked'}">${has?'✓ ':'🔒 '}${b}</div>`;
  }).join('');
  // history
  $('#historyList').innerHTML = h.slice().reverse().slice(0,8).map(x=>`
    <div class="history-item">
      <div>${CATEGORIES.find(c=>c.id===x.catId)?.icon||'📘'}</div>
      <div><strong>${cName(x.catId)}</strong><div class="muted">${new Date(x.date).toLocaleString()}</div></div>
      <div class="pill diff">${x.diff}</div>
      <div><strong>${x.pct}%</strong></div>
    </div>
  `).join('') || '<div class="muted">No attempts yet. Take a quiz!</div>';
}
/* ---------- Quiz Select ---------- */
function setupSegs(){
  setupSeg('#difficultySeg', v => STATE.difficulty=v);
  setupSeg('#countSeg',      v => STATE.count=+v);
  setupSeg('#timeSeg',       v => STATE.timePerQ=+v);
}
function setupSeg(sel,cb){
  const seg = $(sel); if(!seg) return;
  seg.querySelectorAll('button').forEach(b=>{
    b.onclick=()=>{
      seg.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
      b.classList.add('active'); cb(b.dataset.val);
    };
  });
}
function renderCats(){
  const grid = $('#catGrid');
  grid.innerHTML = CATEGORIES.map((c,i)=>`
    <button class="cat glass" data-id="${c.id}" style="animation:fadeUp .5s ${i*0.03}s both">
      <span class="cat-tag">${c.tag}</span>
      <div class="cat-icon">${c.icon}</div>
      <div class="cat-name">${c.name}</div>
      <div class="cat-sub">${(BANK[c.id]||[]).length} questions</div>
    </button>`).join('');
  grid.querySelectorAll('.cat').forEach(b=>b.onclick=()=>startQuiz(b.dataset.id));
  // daily
  const today = new Date().toDateString();
  const seed = hashStr(today);
  const daily = CATEGORIES[seed%CATEGORIES.length];
  $('#dailyTitle').textContent = `${daily.icon} ${daily.name}`;
  $('#startDaily').onclick = ()=>startQuiz(daily.id,true);
}
function hashStr(s){let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))&0x7fffffff;return h}
/* ---------- Quiz Engine ---------- */
function startQuiz(catId, isDaily=false){
  const cat = CATEGORIES.find(c=>c.id===catId);
  STATE.cat = cat;
  let pool = (BANK[catId]||[]).slice();
  // filter by difficulty but fall back to all if too few
  let filt = pool.filter(q=>q.diff===STATE.difficulty);
  if(filt.length < 3) filt = pool;
  shuffle(filt);
  STATE.questions = filt.slice(0, isDaily?10:STATE.count).map(q=>({
    ...q,
    optsShuffled: shuffleIndexed(q.opts, q.correct)
  }));
  STATE.index = 0;
  STATE.answers = STATE.questions.map(()=>({selected:null,correct:false,skipped:true,time:0}));
  STATE.startTime = Date.now();
  STATE.isDaily = isDaily;
  $('#quizCatPill').textContent = cat.icon+' '+cat.name;
  $('#quizDiffPill').textContent = STATE.difficulty.toUpperCase();
  go('quiz');
  renderQuestion();
}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function shuffleIndexed(opts, correctIdx){
  const arr = opts.map((t,i)=>({t,c:i===correctIdx}));
  shuffle(arr);
  return arr;
}
function renderQuestion(){
  const i = STATE.index, total = STATE.questions.length;
  const q = STATE.questions[i];
  $('#qNum').textContent = `Q${i+1}`;
  $('#qText').textContent = q.text;
  $('#qIndex').textContent = `Question ${i+1} of ${total}`;
  const pct = Math.round(((i)/total)*100);
  $('#qPct').textContent = pct+'%';
  $('#progressFill').style.width = pct+'%';
  const ans = STATE.answers[i];
  const KEYS = ['A','B','C','D','E'];
  $('#options').innerHTML = q.optsShuffled.map((o,idx)=>`
    <button class="option ${ans.selected===idx?'selected':''}" data-idx="${idx}">
      <div class="key">${KEYS[idx]}</div><div>${o.t}</div>
    </button>`).join('');
  $('#options').querySelectorAll('.option').forEach(b=>{
    b.onclick=()=>selectOption(+b.dataset.idx);
  });
  $('#bookmarkBtn').textContent = isBookmarked(q)?'★':'☆';
  $('#bookmarkBtn').onclick = ()=>{toggleBookmark(q);$('#bookmarkBtn').textContent=isBookmarked(q)?'★':'☆'};
  $('#prevBtn').disabled = i===0;
  $('#nextBtn').style.display = i<total-1?'inline-block':'none';
  $('#submitBtn').style.display = i===total-1?'inline-block':'none';
  startTimer();
}
function selectOption(idx){
  const i = STATE.index;
  const q = STATE.questions[i];
  const ans = STATE.answers[i];
  ans.selected = idx;
  ans.skipped = false;
  ans.correct = q.optsShuffled[idx].c;
  ans.time = Math.round((Date.now()-STATE.qStart)/1000);
  const opts = $('#options').querySelectorAll('.option');
  opts.forEach((b,k)=>{
    b.classList.remove('selected');
    if(q.optsShuffled[k].c) b.classList.add('correct');
    if(k===idx && !q.optsShuffled[k].c) b.classList.add('wrong');
    b.style.pointerEvents='none';
  });
  ans.correct ? SFX.ok() : SFX.bad();
  stopTimer();
  setTimeout(()=>{
    if(i<STATE.questions.length-1){STATE.index++;renderQuestion()}
  }, 900);
}
$('#prevBtn').onclick=()=>{if(STATE.index>0){STATE.index--;renderQuestion()}};
$('#nextBtn').onclick=()=>{if(STATE.index<STATE.questions.length-1){STATE.index++;renderQuestion()}};
$('#skipBtn').onclick=()=>{
  const a=STATE.answers[STATE.index];a.skipped=true;a.selected=null;
  if(STATE.index<STATE.questions.length-1){STATE.index++;renderQuestion()}else finishQuiz();
};
$('#submitBtn').onclick=()=>finishQuiz();
/* Timer */
function startTimer(){
  stopTimer();
  let t = STATE.timePerQ;
  STATE.qStart = Date.now();
  const ring = $('#ringFg'); ring.classList.remove('warn','bad');
  const update=()=>{
    $('#timerNum').textContent = t;
    const off = 100 - (t/STATE.timePerQ)*100;
    ring.style.strokeDashoffset = off;
    if(t<=Math.max(5,STATE.timePerQ*0.3)) ring.classList.add('warn');
    if(t<=3) ring.classList.add('bad');
  };
  update();
  STATE.timerId = setInterval(()=>{
    t--; update();
    if(t<=0){
      stopTimer();
      const a=STATE.answers[STATE.index];a.skipped=true;a.time=STATE.timePerQ;
      if(STATE.index<STATE.questions.length-1){STATE.index++;renderQuestion()}
      else finishQuiz();
    }
  },1000);
}
function stopTimer(){if(STATE.timerId){clearInterval(STATE.timerId);STATE.timerId=null}}
/* Keyboard */
document.addEventListener('keydown',e=>{
  if(STATE.view!=='quiz') return;
  if(e.key==='ArrowRight') $('#nextBtn').click();
  else if(e.key==='ArrowLeft') $('#prevBtn').click();
  else if(e.key===' '){e.preventDefault();$('#skipBtn').click()}
  else if(e.key==='Enter'){
    const sel = document.querySelector('.option.selected'); if(sel) sel.click();
  } else if(/^[1-4]$/.test(e.key)){
    const opt = document.querySelectorAll('.option')[+e.key-1]; if(opt) opt.click();
  }
});
/* Bookmarks */
function bmKey(q){return q.text}
function isBookmarked(q){return STATE.bookmarks.some(b=>b.text===bmKey(q))}
function toggleBookmark(q){
  if(isBookmarked(q)) STATE.bookmarks = STATE.bookmarks.filter(b=>b.text!==bmKey(q));
  else STATE.bookmarks.push({text:q.text,opts:q.opts,correct:q.correct,catId:STATE.cat?.id});
  saveLS('qv_bookmarks',STATE.bookmarks);
}
function renderBookmarks(){
  $('#bookmarkList').innerHTML = STATE.bookmarks.length ? STATE.bookmarks.map(b=>`
    <div class="review-item">
      <div class="review-q">${b.text}</div>
      <div class="review-a"><strong>Answer:</strong> ${b.opts[b.correct]}</div>
    </div>`).join('') : '<div class="muted">No bookmarks yet. Tap ☆ on any question to save it.</div>';
}
/* ---------- Finish & Results ---------- */
function finishQuiz(){
  stopTimer();
  const total = STATE.questions.length;
  const correct = STATE.answers.filter(a=>a.correct).length;
  const wrong = STATE.answers.filter(a=>!a.correct && !a.skipped && a.selected!==null).length;
  const skipped = STATE.answers.filter(a=>a.skipped).length;
  const timeTaken = Math.round((Date.now()-STATE.startTime)/1000);
  const pct = Math.round((correct/total)*100);
  const avgTime = Math.round(STATE.answers.reduce((s,a)=>s+(a.time||0),0)/total);
  // XP
  let xpGain = correct*10 + (STATE.difficulty==='medium'?correct*2:STATE.difficulty==='hard'?correct*5:0);
  if(STATE.isDaily) xpGain += 50;
  STATE.xp += xpGain; saveLS('qv_xp',STATE.xp);
  // Streak
  const today = new Date().toDateString();
  if(STATE.lastPlay !== today){
    const y = new Date(); y.setDate(y.getDate()-1);
    STATE.streak = (STATE.lastPlay===y.toDateString())?STATE.streak+1:1;
    STATE.lastPlay = today;
    saveLS('qv_streak',STATE.streak);saveLS('qv_last',today);
  }
  // Achievements
  const newAch=[];
  const add=b=>{if(!STATE.achievements.includes(b)){STATE.achievements.push(b);newAch.push(b)}};
  if(pct===100) add('Perfect Score');
  if(pct>=80) add('Quiz Master');
  if(avgTime<=8) add('Fast Thinker');
  if(STATE.xp>=500) add('Knowledge Hunter');
  if(STATE.xp>=1500) add('Genius');
  if(STATE.streak>=3) add('Streak x3');
  if(STATE.streak>=7) add('Streak x7');
  saveLS('qv_ach',STATE.achievements);
  // History
  STATE.history.push({
    catId:STATE.cat.id, diff:STATE.difficulty, total, correct, wrong, skipped,
    pct, timeTaken, avgTime, xp:xpGain, date:Date.now()
  });
  saveLS('qv_history',STATE.history);
  // Render
  renderResults({total,correct,wrong,skipped,timeTaken,pct,xpGain,newAch});
  SFX.done();
  if(pct>=70) confettiBurst();
  go('results');
}
function renderResults({total,correct,wrong,skipped,timeTaken,pct,xpGain,newAch}){
  $('#rCorrect').textContent = correct;
  $('#rWrong').textContent = wrong;
  $('#rSkipped').textContent = skipped;
  $('#rTime').textContent = timeTaken+'s';
  $('#rXP').textContent = '+'+xpGain;
  // animate score number + ring
  const ring = $('#scoreRing');
  ring.style.strokeDashoffset = 326;
  setTimeout(()=>{ring.style.strokeDashoffset = 326 - (pct/100)*326},80);
  animateNum($('#scoreNum'), 0, pct, 1400, v=>v+'%');
  // AI feedback
  const cName = STATE.cat.name;
  let msg;
  if(pct===100) msg=`Flawless! 🏆 Perfect run in ${cName}. You're operating at expert level.`;
  else if(pct>=80) msg=`Excellent performance in ${cName}! You answered ${pct}% correctly — your strongest category may be ${cName}.`;
  else if(pct>=50) msg=`Solid effort in ${cName}. Review the misses below to push past 80%.`;
  else msg=`${cName} is a growth area for you. Try the daily challenge and revisit the explanations.`;
  $('#aiFeedback').textContent = msg;
  // badges shown
  $('#earnedBadges').innerHTML = (newAch.length?newAch:['+'+xpGain+' XP']).map(b=>`<div class="badge">${b}</div>`).join('');
  // review
  const KEYS=['A','B','C','D'];
  $('#reviewList').innerHTML = STATE.questions.map((q,i)=>{
    const a = STATE.answers[i];
    const correctText = q.optsShuffled.find(o=>o.c).t;
    const userText = a.selected!=null?q.optsShuffled[a.selected].t:'<em>Skipped</em>';
    const cls = a.correct?'correct':(a.skipped?'':'wrong');
    return `<div class="review-item ${cls}">
      <div class="review-q">Q${i+1}. ${q.text}</div>
      <div class="review-a">Your answer: <strong>${userText}</strong></div>
      <div class="review-a">Correct: <strong>${correctText}</strong></div>
      ${q.expl?`<div class="review-a">💡 ${q.expl}</div>`:''}
    </div>`;
  }).join('');
}
function animateNum(el,from,to,dur,fmt=v=>v){
  const start=performance.now();
  const step=t=>{
    const p=Math.min(1,(t-start)/dur);
    const v=Math.round(from+(to-from)*(1-Math.pow(1-p,3)));
    el.textContent = fmt(v);
    if(p<1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
/* ---------- Leaderboard ---------- */
function renderLeaderboard(){
  const top = STATE.history.slice().sort((a,b)=>b.pct-a.pct || a.timeTaken-b.timeTaken).slice(0,10);
  const cName = id=>CATEGORIES.find(c=>c.id===id)?.name||id;
  const cIcon = id=>CATEGORIES.find(c=>c.id===id)?.icon||'📘';
  $('#leaderList').innerHTML = top.length ? top.map((x,i)=>{
    const cls = i===0?'gold':i===1?'silver':i===2?'bronze':'';
    return `<div class="leader-item ${cls}">
      <div class="rank">${i+1}</div>
      <div><strong>${cIcon(x.catId)} ${cName(x.catId)}</strong><div class="muted">${new Date(x.date).toLocaleDateString()} · ${x.diff}</div></div>
      <div class="pill">${x.timeTaken}s</div>
      <div><strong>${x.pct}%</strong></div>
    </div>`;
  }).join('') : '<div class="muted">Play a quiz to enter the leaderboard.</div>';
}
/* ---------- Confetti ---------- */
function confettiBurst(){
  const c = $('#confetti'); const ctx=c.getContext('2d');
  c.width=innerWidth;c.height=innerHeight;
  const parts=[];
  for(let i=0;i<160;i++) parts.push({
    x:innerWidth/2, y:innerHeight/3,
    vx:(Math.random()-.5)*10, vy:Math.random()*-8-3,
    g:0.25, color:`hsl(${Math.random()*360},90%,60%)`,
    s:Math.random()*6+3, life:120
  });
  let t=0;
  const tick=()=>{
    t++; ctx.clearRect(0,0,c.width,c.height);
    parts.forEach(p=>{p.vy+=p.g;p.x+=p.vx;p.y+=p.vy;p.life--;
      ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,p.s,p.s);
    });
    if(t<140) requestAnimationFrame(tick); else ctx.clearRect(0,0,c.width,c.height);
  };
  tick();
}
/* ---------- Particles BG ---------- */
function initParticles(){
  const c=$('#particles'),ctx=c.getContext('2d');
  let parts=[],mouse={x:-1000,y:-1000};
  function resize(){c.width=innerWidth;c.height=innerHeight;
    parts = Array.from({length:Math.min(70,Math.floor(innerWidth/24))},()=>({
      x:Math.random()*c.width,y:Math.random()*c.height,
      vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,
      r:Math.random()*2+.6
    }));
  }
  resize();addEventListener('resize',resize);
  addEventListener('mousemove',e=>{
    mouse.x=e.clientX;mouse.y=e.clientY;
    const sp=$('#spotlight');sp.style.left=e.clientX+'px';sp.style.top=e.clientY+'px';
  });
  function loop(){
    ctx.clearRect(0,0,c.width,c.height);
    parts.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>c.width)p.vx*=-1;
      if(p.y<0||p.y>c.height)p.vy*=-1;
      // mouse repel
      const dx=p.x-mouse.x,dy=p.y-mouse.y,d=Math.hypot(dx,dy);
      if(d<120){p.x+=dx/d*1.2;p.y+=dy/d*1.2}
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(180,180,255,.55)';ctx.fill();
    });
    // lines
    for(let i=0;i<parts.length;i++)for(let j=i+1;j<parts.length;j++){
      const a=parts[i],b=parts[j],d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<110){ctx.strokeStyle=`rgba(124,77,255,${(1-d/110)*.25})`;
        ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
    }
    requestAnimationFrame(loop);
  }
  loop();
}
/* ---------- Init ---------- */
function $(s){return document.querySelector(s)}
function init(){
  applyTheme();applySound();
  setupSegs();
  renderHero();
  initParticles();
}
init();
