/* ════════════════════════════════════════════════════════════
   RAVENFORD — main.js
   인트로(이야기) · 화면 전환 · 세계관/학교 렌더 · 기숙사 배정(천리안 수정)
   인물 카드(치비) · 상세 모달 · 관계도 · 검색 · 음악 플레이어
   ════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const D = window.RAVENFORD;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const body = document.body;
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffled = a => { const o = a.slice(); for (let i = o.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; } return o; };

  /* 브라우저 저장소: 실패해도 페이지는 정상 동작 */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('ravenford.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('ravenford.' + k, JSON.stringify(v)); } catch (e) {} }
  };
  const sess = {
    get(k) { try { return sessionStorage.getItem('ravenford.' + k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem('ravenford.' + k, v); } catch (e) {} }
  };

  /* ════════════════════ 언어 ════════════════════
     한국어 원문은 index.html · data.js 에 있고, 다른 언어는 js/lang/*.js 가 덮어쓴다 */
  const WANT = window.RAVENFORD_LANG || 'ko';
  const LX = WANT !== 'ko' && window.RAVENFORD_L10N && window.RAVENFORD_L10N.code === WANT ? window.RAVENFORD_L10N : null;
  const LANG = LX ? WANT : 'ko';
  const LD = (LX && LX.data) || {};

  /* 스크립트가 만드는 문구 — 한국어 기본값 (번역 파일 ui 에 같은 키가 있으면 그쪽을 씀) */
  const KO = {
    'site.title': 'RAVENFORD — 레이븐포드 마법학교', 'q': '“{t}”',
    'stat.houses': '기숙사', 'stat.chars': '기록된 인물', 'stat.rels': '관계', 'stat.tracks': '수록곡',
    'pio.kyle': '카일 브레벌린', 'pio.elizabeth': '엘리자베스 클라미스', 'pio.blake': '블레이크 커링린트', 'pio.you': '당신',
    'pio.founder': '창립자 · {house}', 'pio.jane': '마녀 사냥꾼의 수장', 'pio.youNote': '올해의 신입생',
    'pio.o1': '첫 번째', 'pio.o2': '두 번째', 'pio.o3': '세 번째', 'pio.o4': '네 번째', 'pio.o5': '다섯 번째',
    'cmd.oppose': '{house} 반대', 'cmd.clash': '{house}와 충돌',
    'spell.opt': '속성', 'tl.now': 'NOW',
    'house.animal': '상징', 'house.color': '기숙사 색', 'house.motto': '이념', 'house.clause': '비상 조항에 대해',
    'house.members': '구성원 보기', 'house.common': '휴게실',
    'sub.new': '전쟁 이후 신설', 'sub.prof': '담당',
    'tt.d1': '월', 'tt.d2': '화', 'tt.d3': '수', 'tt.d4': '목', 'tt.d5': '금',
    'tt.p1': '오전 1교시', 'tt.p2': '오전 2교시', 'tt.p3': '오후', 'tt.free': '자습', 'tt.cadet': '후보생 훈련',
    'pl.secret': '극비', 'pl.forbidden': '출입 금지', 'pl.prison': '감옥', 'pl.facility': '시설', 'pl.region': '지역',
    'so.start.t': '천리안 수정 앞에 서다',
    'so.start.d': '수정은 일곱 개의 질문을 던진다. 정답은 없다. 마음이 먼저 가는 쪽을 고르면 된다.',
    'so.name': '이름 (선택)', 'so.namePh': '당신', 'so.begin': '수정에 손을 얹는다',
    'so.voice0': '…다가오라, 블립 세계에서 온 아이여. 네 신념을 들여다보겠다.',
    'so.q': '질문 {i} / {n}',
    'so.r1': '…흠.', 'so.r2': '…그렇군.', 'so.r3': '…보인다.', 'so.r4': '…흥미롭구나.', 'so.r5': '…계속하라.',
    'so.reading': '수정이 당신의 신념을 읽고 있다……',
    'so.tie': '…드물구나. 두 갈래의 신념이 팽팽하다. 그렇다면 — 마지막 대답을 따르겠다.',
    'so.verdict': '…보인다. {name}의 신념은 — {house}.',
    'so.you': '당신', 'so.result': '배정 결과', 'so.ratio': '신념의 비율', 'so.members': '함께할 사람들',
    'so.again': '다시 문답하기', 'so.toChars': '{house} 인물 보기', 'so.alumni': '출신 교직원',
    'so.v.brevalin': '희생을 두려워하지 않는 자. 그림자 속에서 세상을 지키려는 자.',
    'so.v.clamis': '손을 내미는 자. 두 세계가 함께 웃는 날을 믿는 자.',
    'so.v.curringlindt': '높이 나는 자. 힘의 차이를 똑바로 보고, 탁월함으로 증명하는 자.',
    'so.back': '이전 질문',
    'card.aria': '{name} 기록 열람', 'age': '{n}세',
    'tab.all': '전체', 'cb.count': '{n}명',
    'cb.all': '레이븐포드와 그 바깥, 기록된 모든 인물.',
    'cb.leader': '흰 로브를 입는 두 사람. 레이븐포드를 이끈다.',
    'cb.prof': '검은 로브의 교수진. 전쟁을 겪은 학생 중 일부는 교수가 되어 학교로 돌아왔다.',
    'cb.hunter': '마법을 악으로 규정하는 비밀 조직. 검은 후드 롱코트, 왼쪽 가슴의 부러진 지팡이 문장.',
    'cm.alt': '{name} 일러스트', 'cm.close': '닫기', 'cm.count': '{i} / {n}',
    'cm.group': '소속', 'cm.house': '기숙사', 'cm.alma': '출신 기숙사', 'cm.age': '나이', 'cm.height': '키',
    'cm.secP': 'PERSONALITY · 성격', 'cm.secA': 'APPEARANCE · 외형', 'cm.secS': 'VOICE · 말투', 'cm.tics': '말버릇',
    'cm.secRel': 'RELATIONS · 관계', 'cm.star': '핵심 관계', 'cm.none': '—',
    'rg.hint': '노드를 선택하세요. 드래그로 위치를 옮길 수 있습니다.', 'rg.open': '인물 기록 열람 ›', 'rg.ghost': '카드 없는 인물',
    'rs.inside': '{g} 안에서', 'rs.cross': '묶음을 넘는 관계', 'rs.count': '{n}건', 'rs.none': '찾는 관계가 없습니다.', 'rs.relN': '관계 {n}',
    'rs.starT': '이야기의 열쇠가 되는 관계',
    'pal.none': '검색 결과가 없습니다.', 'toc.top': '처음',
    'intro.bgmOn': 'BGM 끄기', 'intro.bgm': 'BGM 켜기',
    'mu.g.all': '전체', 'mu.g.main': '메인 테마', 'mu.g.house': '기숙사 테마', 'mu.g.place': '장소', 'mu.g.event': '행사', 'mu.g.battle': '전투', 'mu.g.daily': '일상',
    'mu.theme': '{name} 테마',
    'mu.soon': '음원 준비 중', 'mu.count': '{n}곡', 'mu.empty': '찾는 곡이 없습니다.', 'mu.err': '이 곡을 불러오지 못했습니다.',
    'mu.rep.all': '전체 반복', 'mu.rep.one': '한 곡 반복', 'mu.rep.off': '반복 끔',
    'mu.shuffleOn': '셔플 켜짐', 'mu.shuffleOff': '셔플 꺼짐',
    'mu.play': '재생', 'mu.pause': '일시정지', 'mu.playTheme': '테마곡 재생', 'mu.playHouse': '기숙사 테마 재생',
    'mu.select': '선택', 'mu.cancel': '취소', 'mu.addTo': '플레이리스트에 담기', 'mu.newPh': '플레이리스트 이름', 'mu.create': '새로 만들기',
    'mu.newList': '새 플레이리스트', 'mu.selCount': '{n}곡 선택됨', 'mu.myLists': '내 플레이리스트',
    'mu.added': '「{name}」에 {n}곡을 담았습니다.', 'mu.removed': '「{name}」에서 뺐습니다.', 'mu.created': '「{name}」 플레이리스트를 만들었습니다.',
    'mu.rename': '이름 변경', 'mu.delete': '삭제', 'mu.renamePrompt': '플레이리스트의 새 이름', 'mu.delConfirm': '「{name}」 플레이리스트를 삭제할까요?',
    'mu.listEmpty': '아직 담긴 곡이 없습니다. 「전체」 탭에서 곡 옆의 ＋ 를 눌러 담아 보세요.', 'mu.removeFrom': '이 플레이리스트에서 빼기',
    'mu.noLists': '아직 만든 플레이리스트가 없습니다. 아래에서 새로 만들어 보세요.', 'mu.defaultName': '내 플레이리스트 {n}'
  };
  const UI = Object.assign({}, KO, (LX && LX.ui) || {});
  const T = (key, vars) => {
    let s = UI[key] != null ? UI[key] : key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
    return s;
  };

  /* ── 데이터 번역 덮어쓰기 ── */
  D.CHARACTERS.forEach(c => { c.nameKo = c.name; });
  if (LX) {
    const merge = (dst, src, keys) => { if (!src) return; keys.forEach(k => { if (src[k] != null) dst[k] = src[k]; }); };
    Object.entries(LD.houses || {}).forEach(([id, h]) => merge(D.HOUSES[id], h, ['name', 'animal', 'colorName', 'motto', 'stance', 'clause']));
    Object.entries(LD.groups || {}).forEach(([id, g]) => merge(D.GROUPS[id], g, ['name']));
    D.CHARACTERS.forEach(c => merge(c, (LD.chars || {})[c.id], ['name', 'role', 'age', 'height', 'look', 'persona', 'speech', 'tics', 'quote']));
    Object.entries(LD.ghosts || {}).forEach(([id, g]) => merge(D.GHOSTS[id], g, ['name', 'role']));
    (LD.relations || []).forEach((label, i) => { if (D.RELATIONS[i] && label) D.RELATIONS[i].label = label; });
    (LD.intro || []).forEach((b, i) => {
      const t = D.INTRO[i]; if (!t || !b) return;
      merge(t, b, ['who', 'text']);
      if (t.ch) merge(t.ch, b, ['era', 'title']);
    });
    (LD.timeline || []).forEach((b, i) => merge(D.TIMELINE[i] || {}, b, ['when', 'title', 'text']));
    if (LD.commandments) D.COMMANDMENTS = LD.commandments;
    Object.entries(LD.spells || {}).forEach(([k, list]) => list.forEach((s, i) => merge(D.SPELLS[k][i] || {}, s, ['n', 'k', 'opt', 'd'])));
    D.SUBJECTS.forEach(s => merge(s, (LD.subjects || {})[s.id], ['name', 'd']));
    D.PLACES.forEach(p => merge(p, (LD.places || {})[p.id], ['name', 'd']));
    D.EVENTS.forEach(e => merge(e, (LD.events || {})[e.id], ['name', 'd']));
    (LD.quiz || []).forEach((q, i) => { if (D.QUIZ[i] && q) { if (q.q) D.QUIZ[i].q = q.q; if (q.a) Object.assign(D.QUIZ[i].a, q.a); } });
    if (LD.ticker) D.TICKER = LD.ticker;
  }

  const CHARS = D.CHARACTERS;
  const byId = Object.fromEntries(CHARS.map(c => [c.id, c]));
  const H = D.HOUSES, G = D.GROUPS, GH = D.GHOSTS;
  const HOUSE_IDS = ['brevalin', 'clamis', 'curringlindt'];
  const GROUP_IDS = ['leader', 'prof', 'brevalin', 'clamis', 'curringlindt', 'hunter'];
  const isGhost = id => !!GH[id];
  const person = id => byId[id] || GH[id];
  const nameOf = id => person(id).name;
  const groupOf = id => person(id).group;
  const accOf = c => c.house ? H[c.house].rgb : G[c.group].rgb;
  const thumb = id => `assets/char/thumb/${id}.jpg`;
  const full = id => `assets/char/full/${id}.jpg`;
  const chibi = id => `assets/chibi/${id}.png`;
  const crest = h => `assets/crest/${h}.png`;
  const qt = s => T('q', { t: s });
  const ageText = a => /^\d+$/.test(a) ? T('age', { n: a }) : a;
  const sigOf = c => c.house ? `<img src="${crest(c.house)}" alt="">` : `<svg><use href="#sig-${c.group}"/></svg>`;
  /* 같은 화면 안의 이름 표시(data-cname / data-crole) 번역 반영 */
  $$('[data-cname]').forEach(el => { el.textContent = byId[el.dataset.cname].name; });
  $$('[data-crole]').forEach(el => { el.textContent = byId[el.dataset.crole].role; });

  /* 괄호 안 구분자는 무시하고 나누기 (한국어 쉼표 · 일본어/중국어 「、」「，」) */
  function splitTop(s) {
    const out = []; let depth = 0, cur = '';
    for (const ch of s) {
      if (ch === '(' || ch === '（') depth++;
      if (ch === ')' || ch === '）') depth--;
      if ((ch === ',' || ch === '、' || ch === '，') && depth === 0) { if (cur.trim()) out.push(cur.trim()); cur = ''; } else cur += ch;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  }

  /* 정적인 문구 번역 (data-i18n · data-i18n-html · data-i18n-attr) */
  if (LX) {
    const ui = LX.ui || {};
    $$('[data-i18n]').forEach(el => { const v = ui[el.dataset.i18n]; if (v != null) el.textContent = v; });
    $$('[data-i18n-html]').forEach(el => { const v = ui[el.dataset.i18nHtml]; if (v != null) el.innerHTML = v; });
    $$('[data-i18n-attr]').forEach(el => el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split(':');
      if (ui[key] != null) el.setAttribute(attr, ui[key]);
    }));
    const desc = document.querySelector('meta[name="description"]');
    if (desc && ui['meta.desc']) desc.setAttribute('content', ui['meta.desc']);
  }
  document.title = T('site.title');

  /* ════════════════════ 파티클 (촛불 · 마력의 티끌) ════════════════════ */
  const FX = (() => {
    const cv = $('#fx'), cx = cv.getContext('2d');
    let W = 0, H2 = 0, parts = [], running = true;
    const COL = { g: '255,208,140', o: '255,168,96', b: '176,196,255' };
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = innerWidth; H2 = innerHeight;
      cv.width = W * dpr; cv.height = H2 * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawn(p, init) {
      p.x = Math.random() * W;
      p.y = init ? Math.random() * H2 : H2 + 10;
      p.r = Math.random() * 1.6 + .4;
      p.vx = (Math.random() - .5) * .18;
      p.vy = -(Math.random() * .32 + .06);
      p.a = Math.random() * .6 + .2;
      p.t = Math.random() * 6.28;
      p.c = Math.random() < .62 ? 'g' : Math.random() < .6 ? 'o' : 'b';
      return p;
    }
    function populate() {
      const n = REDUCE ? 0 : Math.round(clamp(W * H2 / 17000, 26, 96));
      parts = Array.from({ length: n }, () => spawn({}, true));
    }
    function frame() {
      if (running) {
        cx.clearRect(0, 0, W, H2);
        for (const p of parts) {
          p.t += .018;
          p.x += p.vx + Math.sin(p.t) * .2;
          p.y += p.vy;
          if (p.y < -20 || p.x < -20 || p.x > W + 20) spawn(p, false);
          const a = p.a * (.5 + .5 * Math.sin(p.t * 1.7));
          cx.fillStyle = `rgba(${COL[p.c]},${a * .14})`;
          cx.beginPath(); cx.arc(p.x, p.y, p.r * 3.8, 0, 6.283); cx.fill();
          cx.fillStyle = `rgba(${COL[p.c]},${a})`;
          cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.283); cx.fill();
        }
      }
      requestAnimationFrame(frame);
    }
    resize(); populate(); requestAnimationFrame(frame);
    addEventListener('resize', () => { resize(); populate(); });
    document.addEventListener('visibilitychange', () => { running = !document.hidden; });
    return {};
  })();

  /* ════════════════════ 게시판 · 토스트 ════════════════════ */
  $('#notice').innerHTML = D.TICKER.map(t => {
    const m = t.match(/^\[(.+?)\]\s*(.*)$/);
    return m ? `<li><b>${esc(m[1])}</b><span>${esc(m[2])}</span></li>` : `<li><span>${esc(t)}</span></li>`;
  }).join('');

  let toastTimer;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('is-on');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('is-on'), 2600);
  }

  addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--dim', clamp(scrollY / (innerHeight * 1.1), 0, 1).toFixed(3));
  }, { passive: true });

  /* ════════════════════ 리빌 (스크롤 등장) ════════════════════ */
  const io = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add('in');
      io.unobserve(el);
      if (el.id === 'heroStats') countUp(el);
      if (el.style.transitionDelay) setTimeout(() => { el.style.transitionDelay = ''; }, 1400);
    });
  }, { threshold: .12, rootMargin: '0px 0px -5% 0px' });
  const revealScan = () => { if (!body.classList.contains('is-intro')) $$('.reveal:not(.in)').forEach(el => io.observe(el)); };

  function countUp(root) {
    $$('b[data-n]', root).forEach(b => {
      const n = +b.dataset.n, t0 = performance.now();
      const step = t => { const k = clamp((t - t0) / 1200, 0, 1); b.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }

  /* ════════════════════ 라우터 · 화면 전환 ════════════════════ */
  const VIEWS = ['world', 'school', 'sorting', 'characters', 'relations'];
  const LABEL = { world: 'nav.world', school: 'nav.school', sorting: 'nav.sorting', characters: 'nav.characters', relations: 'nav.relations' };
  const NAV_KO = { 'nav.world': '세계관', 'nav.school': '레이븐포드', 'nav.sorting': '기숙사 배정', 'nav.characters': '인물', 'nav.relations': '관계도' };
  let current = null, busy = false;
  const onEnter = {}, onLeave = {};

  function show(view, push = true, anchor) {
    if (current && onLeave[current]) onLeave[current]();
    $$('.view').forEach(v => { v.hidden = v.dataset.view !== view; });
    body.dataset.view = view;
    $$('#hudNav a').forEach(a => a.classList.toggle('is-active', a.dataset.go === view));
    $('#hud').classList.remove('is-menu');
    window.scrollTo(0, 0);
    const el = $('#v-' + view);
    el.classList.remove('is-entering'); void el.offsetWidth; el.classList.add('is-entering');
    current = view;
    if (push && location.hash.slice(1) !== view) history.pushState(null, '', '#' + view);
    if (onEnter[view]) onEnter[view]();
    Toc.build(view);
    $('#progress i').style.transform = 'scaleX(0)';
    $('#toTop').classList.remove('is-on');
    revealScan();
    if (anchor) setTimeout(() => { const a = document.getElementById(anchor); if (a) a.scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth', block: 'start' }); }, 120);
  }

  async function go(view, opts = {}) {
    if (!VIEWS.includes(view)) view = 'world';
    if (busy) return;
    if (view === current) {
      if (opts.anchor) { const a = document.getElementById(opts.anchor); if (a) a.scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth', block: 'start' }); }
      else if (opts.after) opts.after();
      return;
    }
    if (opts.instant) { show(view, !opts.pop, opts.anchor); if (opts.after) opts.after(); return; }
    busy = true;
    try {
      const v = $('#veil');
      const key = LABEL[view];
      $('#veilTitle').textContent = UI[key] || NAV_KO[key];
      v.classList.add('is-on');
      await sleep(REDUCE ? 40 : 520);
      show(view, !opts.pop, opts.anchor);
      if (opts.after) opts.after();
      await sleep(REDUCE ? 40 : 220);
      v.classList.remove('is-on');
    } finally { busy = false; }
  }
  addEventListener('popstate', () => go(location.hash.slice(1) || 'world', { pop: true }));

  /* ════════════════════ 인트로 (이야기) ════════════════════
     시작 화면 → 장 제목 → 지문/대사 (누르면 다음) → 타이틀.
     BGM 은 기본으로 꺼져 있고, 시작 화면에서 켤 수 있다 */
  const Intro = (() => {
    const el = $('#intro'), slides = $('#introSlides'), box = $('#introBox'), txt = $('#introText'), who = $('#introWho');
    const chap = $('#introChapter'), prog = $('#introProg');
    const beats = D.INTRO;
    let i = -1, phase = 'off', typing = false, full = '', typeT = null, autoOn = false, autoT = null, chapT = null, done = false, bgmByIntro = false;

    function setSlide(src, tint) {
      const s = document.createElement('div');
      s.className = 'intro__slide';
      s.style.backgroundImage = `url('assets/${src}.jpg')`;
      slides.appendChild(s);
      void s.offsetWidth;
      s.classList.add('is-on');
      const old = $$('.intro__slide', slides).slice(0, -1);
      setTimeout(() => old.forEach(o => o.remove()), 1800);
      el.dataset.tint = tint || '';
    }
    function clearTimers() { clearTimeout(typeT); clearTimeout(autoT); clearTimeout(chapT); typeT = autoT = chapT = null; }
    function scheduleAuto() {
      clearTimeout(autoT);
      if (!autoOn || phase !== 'beat') return;
      autoT = setTimeout(next, 1700 + [...full].length * 42);
    }
    function type(s) {
      full = s; typing = true; txt.textContent = '';
      box.classList.remove('is-done');
      const chars = [...s]; let n = 0;
      const step = () => {
        n++;
        txt.textContent = chars.slice(0, n).join('');
        if (n < chars.length) typeT = setTimeout(step, chars[n - 1] === ',' || chars[n - 1] === '.' || chars[n - 1] === '—' ? 150 : 36);
        else { typing = false; box.classList.add('is-done'); scheduleAuto(); }
      };
      if (REDUCE) { txt.textContent = s; typing = false; box.classList.add('is-done'); scheduleAuto(); return; }
      typeT = setTimeout(step, 260);
    }
    function finishType() { clearTimeout(typeT); txt.textContent = full; typing = false; box.classList.add('is-done'); scheduleAuto(); }

    function showChapter(b) {
      phase = 'chapter';
      box.classList.remove('is-on');
      $('#chNo').textContent = b.ch.no;
      $('#chEra').textContent = b.ch.era;
      $('#chTitle').textContent = b.ch.title;
      chap.classList.remove('is-on'); void chap.offsetWidth; chap.classList.add('is-on');
      setSlide(b.img, b.tint);
      el.classList.add('is-chapter');
      chapT = setTimeout(() => { if (phase === 'chapter') showText(); }, REDUCE ? 900 : 2600);
    }
    function showText() {
      clearTimeout(chapT);
      const b = beats[i];
      phase = 'beat';
      chap.classList.remove('is-on');
      el.classList.remove('is-chapter');
      box.classList.toggle('is-line', b.kind === 'd');
      who.textContent = b.kind === 'd' ? b.who : '';
      box.classList.remove('is-on'); void box.offsetWidth; box.classList.add('is-on');
      type(b.kind === 'd' ? qt(b.text) : b.text);
    }
    function showBeat(k) {
      i = k;
      prog.style.transform = `scaleX(${(k + 1) / (beats.length + 1)})`;
      const b = beats[k];
      if (b.ch) { showChapter(b); return; }
      const prev = beats[k - 1];
      if (!prev || prev.img !== b.img || prev.tint !== b.tint) setSlide(b.img, b.tint);
      showText();
    }
    function showTitle() {
      clearTimers();
      phase = 'title';
      prog.style.transform = 'scaleX(1)';
      box.classList.remove('is-on'); chap.classList.remove('is-on');
      el.classList.remove('is-chapter');
      setSlide('bg/castle', '');
      el.classList.add('is-title');
    }
    function next() {
      if (phase === 'start') { begin(); return; }
      if (phase === 'chapter') { showText(); return; }
      if (phase !== 'beat') return;
      if (typing) { finishType(); return; }
      clearTimeout(autoT);
      if (i + 1 >= beats.length) showTitle();
      else showBeat(i + 1);
    }
    function begin() {
      el.classList.remove('is-start');
      el.classList.add('is-story');
      showBeat(0);
    }
    function preload() { [...new Set(beats.map(b => b.img)), 'bg/castle'].forEach(s => { const im = new Image(); im.src = `assets/${s}.jpg`; }); }
    function paintBgm() {
      const on = Music.isPlaying;
      const b = $('#introBgm');
      b.setAttribute('aria-pressed', String(on));
      $('span', b).textContent = on ? T('intro.bgmOn') : T('intro.bgm');
    }

    function finish() {
      if (done) return; done = true;
      clearTimers();
      phase = 'off';
      sess.set('intro', '1');
      el.classList.add('is-out');
      body.classList.remove('is-intro');
      setTimeout(revealScan, 450);
      setTimeout(() => { el.hidden = true; el.className = 'intro'; slides.innerHTML = ''; }, 1300);
    }
    function play() {
      done = false; i = -1; autoOn = false;
      clearTimers();
      el.hidden = false;
      el.className = 'intro is-start';
      el.dataset.tint = '';
      slides.innerHTML = '';
      box.classList.remove('is-on'); chap.classList.remove('is-on');
      $('#introAuto').setAttribute('aria-pressed', 'false');
      prog.style.transform = 'scaleX(0)';
      body.classList.add('is-intro');
      phase = 'start';
      setSlide('intro/gate', 'dim');
      preload(); paintBgm();
      setTimeout(() => $('#introBegin').focus({ preventScroll: true }), 60);
    }

    el.addEventListener('click', e => {
      if (e.target.closest('button')) return;
      next();
    });
    $('#introBegin').addEventListener('click', begin);
    $('#introJump').addEventListener('click', finish);
    $('#introEnter').addEventListener('click', finish);
    $('#introSkip').addEventListener('click', () => { if (phase === 'start') finish(); else showTitle(); });
    $('#introAuto').addEventListener('click', e => {
      autoOn = !autoOn;
      e.currentTarget.setAttribute('aria-pressed', String(autoOn));
      if (autoOn && phase === 'beat' && !typing) scheduleAuto();
      if (!autoOn) clearTimeout(autoT);
    });
    $('#introBgm').addEventListener('click', () => {
      if (Music.isPlaying) Music.pause();
      else { bgmByIntro = true; Music.playId('main'); }
      setTimeout(paintBgm, 60);
    });
    document.addEventListener('keydown', e => {
      if (phase === 'off') return;
      if (e.key === 'Escape') { finish(); return; }
      if ((e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') && !(e.target.closest && e.target.closest('button'))) { e.preventDefault(); next(); }
    });
    return {
      start(force) {
        if (!force && sess.get('intro')) { el.hidden = true; body.classList.remove('is-intro'); revealScan(); return; }
        play();
      },
      paintBgm,
      get isOpen() { return phase !== 'off'; }
    };
  })();

  /* ════════════════════ 공용 조각 ════════════════════ */
  const playBtn = (id, label, cls = '') => `<button class="btn-ghost play-btn ${cls}" type="button" data-play="${id}"><svg><use href="#i-music"/></svg><span>${esc(label || Music.titleOf(id))}</span></button>`;
  const avatar = id => `<button type="button" class="av" data-char="${id}" title="${esc(byId[id].name)}" style="background-image:url('${thumb(id)}')"></button>`;
  const houseChip = h => `<span class="hchip" style="--hc:${H[h].rgb}"><img src="${crest(h)}" alt="">${esc(H[h].name)}</span>`;

  /* ════════════════════ 세계관 페이지 ════════════════════ */
  function renderWorld() {
    $('#heroStats').innerHTML = [
      [HOUSE_IDS.length, T('stat.houses')], [CHARS.length, T('stat.chars')], [D.RELATIONS.length, T('stat.rels')], [D.MUSIC.tracks.length, T('stat.tracks')]
    ].map(([n, l]) => `<div><b data-n="${n}">0</b><span>${l}</span></div>`).join('');

    /* 선구자 */
    const P = [
      { k: 'pio.kyle', h: 'brevalin', note: T('pio.founder', { house: H.brevalin.name }) },
      { k: 'pio.elizabeth', h: 'clamis', note: T('pio.founder', { house: H.clamis.name }) },
      { k: 'pio.blake', h: 'curringlindt', note: T('pio.founder', { house: H.curringlindt.name }) },
      { k: 'jane', note: T('pio.jane') },
      { k: 'you', note: T('pio.youNote') }
    ];
    const ROMAN = ['I', 'II', 'III', 'IV', 'V'];
    $('#pioneers').innerHTML = P.map((p, i) => {
      let face, name;
      if (p.h) { face = `<img src="${crest(p.h)}" alt="">`; name = T(p.k); }
      else if (p.k === 'jane') { face = `<img class="is-photo" src="${thumb('jane')}" alt="">`; name = byId.jane.name; }
      else { face = '<b class="pio__q">?</b>'; name = T('pio.you'); }
      const tag = p.k === 'jane' ? 'button' : 'div';
      return `<${tag} class="pio${p.k === 'you' ? ' is-you' : ''}${p.k === 'jane' ? ' is-jane' : ''}" ${p.k === 'jane' ? 'type="button" data-char="jane"' : ''} style="--d:${i}${p.h ? `;--hc:${H[p.h].rgb}` : ''}">
        <span class="pio__no">${ROMAN[i]}</span>
        <span class="pio__face">${face}</span>
        <span class="pio__ord">${T('pio.o' + (i + 1))}</span>
        <b class="pio__name">${esc(name)}</b>
        <small class="pio__note">${esc(p.note)}</small>
      </${tag}>`;
    }).join('');

    /* 지난 20년 */
    $('#timeline').innerHTML = D.TIMELINE.map((t, i) => `
      <li class="tl reveal${t.now ? ' is-now' : ''}" style="transition-delay:${i * 70}ms">
        <div class="tl__img" style="background-image:url('assets/${t.img}.jpg')"></div>
        <div class="tl__body">
          <span class="tl__when">${esc(t.when)}${t.now ? ` <i>${T('tl.now')}</i>` : ''}</span>
          <h3>${esc(t.title)}</h3>
          <p>${esc(t.text)}</p>
        </div>
      </li>`).join('');

    /* 5계명 */
    const against = {};
    HOUSE_IDS.forEach(h => { against[H[h].against] = h; });
    $('#commands').innerHTML = D.COMMANDMENTS.map((c, i) => {
      const h = against[i + 1];
      return `<li><span class="commands__no">${ROMAN[i]}</span><p>${esc(c)}${h ? `<span class="commands__h" style="--hc:${H[h].rgb}"><img src="${crest(h)}" alt="">${T(H[h].againstKind === 'clash' ? 'cmd.clash' : 'cmd.oppose', { house: esc(H[h].name) })}</span>` : ''}</p></li>`;
    }).join('');

    /* 비상 조항 */
    $('#clauseStances').innerHTML = ['curringlindt', 'clamis', 'brevalin'].map(h => `<li style="--hc:${H[h].rgb}"><img src="${crest(h)}" alt=""><b>${esc(H[h].name)}</b><span>${esc(H[h].clause)}</span></li>`).join('');

    renderSpells('basic');

    $('#hunterAvatars').innerHTML = CHARS.filter(c => c.group === 'hunter').map(c => avatar(c.id)).join('');
    $('#guardAvatars').innerHTML = ['kaiden', 'hannah'].map(avatar).join('');
  }

  function renderSpells(kind) {
    $$('#spellTabs [data-sp]').forEach(b => { const on = b.dataset.sp === kind; b.classList.toggle('is-on', on); b.setAttribute('aria-selected', String(on)); });
    $('#spellGrid').innerHTML = D.SPELLS[kind].map((s, i) => `
      <article class="spell${kind === 'forbidden' ? ' is-forbid' : kind === 'war' ? ' is-war' : ''}" style="--d:${i}">
        <span class="spell__la">${esc(s.la)}</span>
        <h4>${esc(s.n)}<em>${esc(s.k)}</em></h4>
        ${s.opt ? `<div class="spell__opt"><small>${T('spell.opt')}</small>${s.opt.map(o => `<span>${esc(o)}</span>`).join('')}</div>` : ''}
        <p>${esc(s.d)}</p>
        ${kind === 'forbidden' ? '<svg class="spell__lock"><use href="#i-lock"/></svg>' : ''}
        ${s.play ? playBtn(s.play, null, 'spell__play') : ''}
      </article>`).join('');
  }
  $('#spellTabs').addEventListener('click', e => { const b = e.target.closest('[data-sp]'); if (b) renderSpells(b.dataset.sp); });

  /* ════════════════════ 학교 페이지 ════════════════════ */
  function renderSchool() {
    /* 기숙사 */
    $('#houseGrid').innerHTML = HOUSE_IDS.map((id, i) => {
      const h = H[id], mem = CHARS.filter(c => c.group === id);
      return `<article class="house reveal" style="--hc:${h.rgb};transition-delay:${i * 90}ms">
        <div class="house__img" style="background-image:url('assets/place/${id}.jpg')">
          <img class="house__crest" src="${crest(id)}" alt="${esc(h.name)}">
        </div>
        <div class="house__body">
          <span class="house__en">${esc(h.en.toUpperCase())} · ${esc(h.mottoEn)}</span>
          <h3 class="house__name">${esc(h.name)}</h3>
          <dl class="house__facts">
            <div><dt>${T('house.animal')}</dt><dd>${esc(h.animal)}</dd></div>
            <div><dt>${T('house.color')}</dt><dd><i class="swatch"></i>${esc(h.colorName)}</dd></div>
            <div><dt>${T('house.motto')}</dt><dd>${esc(h.motto)}</dd></div>
          </dl>
          <p class="house__stance">${esc(h.stance)}</p>
          <p class="house__clause"><b>${T('house.clause')}</b>${esc(h.clause)}</p>
          <div class="house__foot">
            <span class="avatars">${mem.map(c => avatar(c.id)).join('')}</span>
            <button class="btn-ghost" type="button" data-cgroup="${id}">${T('house.members')} ›</button>
          </div>
          ${playBtn('h-' + id, null, 'house__play')}
        </div>
      </article>`;
    }).join('');

    /* 과목 */
    $('#subjects').innerHTML = D.SUBJECTS.map(s => {
      const p = byId[s.prof];
      return `<div class="subj${s.isNew ? ' is-new' : ''}">
        <div class="subj__head"><b>${esc(s.name)}</b>${s.isNew ? `<em>${T('sub.new')}</em>` : ''}</div>
        <button type="button" class="subj__prof" data-char="${p.id}"><img src="${thumb(p.id)}" alt=""><span><small>${T('sub.prof')}</small>${esc(p.name)}</span></button>
        ${s.d ? `<p>${esc(s.d)}</p>` : ''}
      </div>`;
    }).join('');

    renderTimetable();

    /* 시설 · 지역 */
    const badge = p => p.id === 'stacks' ? `<span class="place__badge is-secret"><svg><use href="#i-lock"/></svg>${T('pl.secret')}</span>`
      : p.id === 'forest' ? `<span class="place__badge is-danger"><svg><use href="#i-warn"/></svg>${T('pl.forbidden')}</span>`
      : p.id === 'fall' ? `<span class="place__badge is-danger">${T('pl.prison')}</span>` : '';
    const placeHTML = (p, i) => `
      <article class="place reveal${p.imgs ? ' place--commons' : ''}" style="transition-delay:${(i % 3) * 70}ms">
        <div class="place__img">${p.imgs ? p.imgs.map((s, k) => `<span style="background-image:url('assets/${s}.jpg')" data-h="${HOUSE_IDS[k]}"></span>`).join('') : `<span style="background-image:url('assets/${p.img}.jpg')"></span>`}${badge(p)}</div>
        <div class="place__body">
          <span class="place__en">${esc(p.en)}</span>
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.d)}</p>
          ${p.imgs ? `<div class="place__plays">${HOUSE_IDS.map(h => `<button type="button" class="hplay" data-play="h-${h}" style="--hc:${H[h].rgb}"><img src="${crest(h)}" alt=""><span>${esc(H[h].name)}</span><svg><use href="#i-music"/></svg></button>`).join('')}</div>` : ''}
          ${p.play ? playBtn(p.play) : ''}
        </div>
      </article>`;
    $('#facilities').innerHTML = D.PLACES.filter(p => p.kind === 'facility').map(placeHTML).join('');
    $('#regions').innerHTML = D.PLACES.filter(p => p.kind === 'region').map(placeHTML).join('');

    /* 행사 */
    $('#events').innerHTML = D.EVENTS.map((e, i) => `
      <li class="ev reveal${e.id === 'vacation' ? ' is-vac' : ''}" style="transition-delay:${i * 60}ms">
        <span class="ev__date">${e.date.replace(/(\d+)\.(\d+)/g, '<b>$1</b><i>/</i><b>$2</b>')}</span>
        <div class="ev__body"><h3>${esc(e.name)}</h3>${e.d ? `<p>${esc(e.d)}</p>` : ''}</div>
        ${e.play ? `<button type="button" class="ev__play" data-play="${e.play}" aria-label="${esc(Music.titleOf(e.play))}" title="${esc(Music.titleOf(e.play))}"><svg><use href="#i-music"/></svg></button>` : ''}
      </li>`).join('');
  }

  /* 시간표 예시: 6과목 × 주 2회 + 빈 3칸, 같은 날 같은 과목은 겹치지 않게 */
  function renderTimetable() {
    let grid = null;
    for (let tries = 0; tries < 80 && !grid; tries++) {
      const pool = shuffled([...D.SUBJECTS.flatMap(s => [s.id, s.id]), 'free', 'free', 'cadet']);
      const g = [0, 1, 2, 3, 4].map(d => pool.slice(d * 3, d * 3 + 3));
      if (g.every(day => { const s = day.filter(x => x !== 'free' && x !== 'cadet'); return new Set(s).size === s.length; })) grid = g;
    }
    const sub = Object.fromEntries(D.SUBJECTS.map(s => [s.id, s]));
    const cell = x => x === 'free' ? `<span class="tt__c is-free">${T('tt.free')}</span>`
      : x === 'cadet' ? `<span class="tt__c is-cadet">${T('tt.cadet')}</span>`
      : `<span class="tt__c${sub[x].isNew ? ' is-new' : ''}" data-s="${x}">${esc(sub[x].name)}</span>`;
    $('#ttGrid').innerHTML = `<span class="tt__h"></span>${[1, 2, 3, 4, 5].map(d => `<span class="tt__h">${T('tt.d' + d)}</span>`).join('')}`
      + [0, 1, 2].map(p => `<span class="tt__p">${T('tt.p' + (p + 1))}</span>${grid.map(day => cell(day[p])).join('')}`).join('');
  }
  $('#ttShuffle').addEventListener('click', renderTimetable);

  /* ════════════════════ 기숙사 배정 (천리안 수정) ════════════════════ */
  const Sort = (() => {
    const panel = $('#sortPanel'), orb = $('#orb'), voice = $('#orbVoice'), crestImg = $('#orbCrest');
    const KEYS = { b: 'brevalin', c: 'clamis', k: 'curringlindt' };
    let answers = [], qi = 0, name = '', order = [];

    function say(s) { voice.classList.remove('is-on'); void voice.offsetWidth; voice.textContent = s; voice.classList.add('is-on'); }
    function tint(h) { orb.style.setProperty('--oc', h ? H[h].rgb : '255,214,150'); orb.dataset.house = h || ''; }
    function lead() {
      const s = { brevalin: 0, clamis: 0, curringlindt: 0 };
      answers.forEach(a => s[a]++);
      const max = Math.max(...Object.values(s));
      if (!max) return null;
      const top = HOUSE_IDS.filter(h => s[h] === max);
      return top.length === 1 ? top[0] : null;
    }

    function start() {
      answers = []; qi = 0;
      orb.className = 'orb'; tint(null); crestImg.removeAttribute('src');
      say(T('so.voice0'));
      panel.innerHTML = `<div class="sp sp--start">
        <p class="eyebrow">THE SEEING CRYSTAL</p>
        <h2>${T('so.start.t')}</h2>
        <p>${T('so.start.d')}</p>
        <form id="sortForm" autocomplete="off">
          <label><span>${T('so.name')}</span><input id="sortName" type="text" maxlength="20" placeholder="${esc(T('so.namePh'))}" value="${esc(name)}"></label>
          <button class="btn-main" type="submit"><svg><use href="#i-wand"/></svg><span>${T('so.begin')}</span></button>
        </form>
      </div>`;
      $('#sortForm').addEventListener('submit', e => {
        e.preventDefault();
        name = $('#sortName').value.trim().slice(0, 20);
        orb.classList.add('is-awake');
        ask(0);
      });
    }

    function ask(i) {
      qi = i;
      const q = D.QUIZ[i];
      order = shuffled(['b', 'c', 'k']);
      if (i > 0) say(T('so.r' + (1 + Math.floor(Math.random() * 5))));
      panel.innerHTML = `<div class="sp sp--q">
        <div class="sp__prog">${D.QUIZ.map((_, k) => `<i class="${k < i ? 'is-done' : k === i ? 'is-cur' : ''}"></i>`).join('')}<small>${T('so.q', { i: i + 1, n: D.QUIZ.length })}</small></div>
        <h2 class="sp__q">${esc(q.q)}</h2>
        <div class="sp__ans">${order.map((k, n) => `<button type="button" class="sp__a" data-k="${k}" style="--d:${n}"><i>${'ABC'[n]}</i><span>${esc(q.a[k])}</span></button>`).join('')}</div>
        ${i > 0 ? `<button type="button" class="sp__back" id="sortBack">‹ ${T('so.back')}</button>` : ''}
      </div>`;
    }

    function pick(k) {
      answers[qi] = KEYS[k];
      answers.length = qi + 1;
      tint(lead());
      orb.classList.remove('is-pulse'); void orb.offsetWidth; orb.classList.add('is-pulse');
      if (qi + 1 < D.QUIZ.length) ask(qi + 1);
      else reveal();
    }

    async function reveal() {
      const s = { brevalin: 0, clamis: 0, curringlindt: 0 };
      answers.forEach(a => s[a]++);
      const max = Math.max(...Object.values(s));
      const top = HOUSE_IDS.filter(h => s[h] === max);
      /* 동점이면 동점인 기숙사 중 가장 나중에 고른 대답을 따른다 */
      let house = top[0], tie = top.length > 1;
      if (tie) for (let i = answers.length - 1; i >= 0; i--) { if (top.includes(answers[i])) { house = answers[i]; break; } }

      panel.innerHTML = `<div class="sp sp--reading"><span class="sp__spin" aria-hidden="true"></span><p>${T('so.reading')}</p></div>`;
      say(tie ? T('so.tie') : T('so.reading'));
      orb.classList.add('is-reading');
      tint(null);
      await sleep(REDUCE ? 200 : 2400);
      orb.classList.remove('is-reading');
      tint(house);
      crestImg.src = crest(house);
      orb.classList.add('is-result');
      const who = name || T('so.you');
      say(T('so.verdict', { name: who, house: H[house].name }));
      result(house, s);
    }

    function result(id, s) {
      const h = H[id], n = answers.length;
      const students = CHARS.filter(c => c.group === id);
      const alumni = CHARS.filter(c => c.house === id && (c.group === 'leader' || c.group === 'prof'));
      panel.innerHTML = `<div class="sp sp--result" style="--hc:${h.rgb}">
        <p class="eyebrow">${T('so.result')} · ${esc(name || T('so.you'))}</p>
        <div class="sp__house">
          <img src="${crest(id)}" alt="">
          <div><span>${esc(h.en.toUpperCase())} · ${esc(h.mottoEn)}</span><h2>${esc(h.name)}</h2><p>${esc(h.animal)} · ${esc(h.colorName)} · ${esc(h.motto)}</p></div>
        </div>
        <blockquote class="sp__verdict">${esc(qt(T('so.v.' + id)))}</blockquote>
        <p class="sp__stance">${esc(h.stance)}</p>
        <div class="sp__ratio"><small>${T('so.ratio')}</small>
          ${HOUSE_IDS.map(x => `<div class="sp__bar" style="--hc:${H[x].rgb};--w:${Math.round(s[x] / n * 100)}%"><span>${esc(H[x].name)}</span><i></i><b>${Math.round(s[x] / n * 100)}%</b></div>`).join('')}
        </div>
        <div class="sp__mem"><small>${T('so.members')}</small><span class="avatars">${students.map(c => avatar(c.id)).join('')}</span>
          <small>${T('so.alumni')}</small><span class="avatars">${alumni.map(c => avatar(c.id)).join('')}</span></div>
        <div class="sp__btns">
          ${playBtn('h-' + id)}
          <button class="btn-ghost" type="button" data-cgroup="${id}">${T('so.toChars', { house: esc(h.name) })} ›</button>
          <button class="btn-ghost" type="button" id="sortAgain"><svg><use href="#i-replay"/></svg><span>${T('so.again')}</span></button>
        </div>
      </div>`;
      store.set('house', id);
    }

    panel.addEventListener('click', e => {
      const a = e.target.closest('.sp__a'); if (a) { pick(a.dataset.k); return; }
      if (e.target.closest('#sortBack')) { answers.length = Math.max(0, qi - 1); tint(lead()); ask(qi - 1); return; }
      if (e.target.closest('#sortAgain')) start();
    });
    start();
    return { start };
  })();

  /* ════════════════════ 인물 카드 ════════════════════ */
  function cardHTML(c, i) {
    const q = c.quote.length > 60 ? c.quote.slice(0, 58) + '…' : c.quote;
    return `
      <button class="ccard" type="button" data-char="${c.id}" style="--acc:${accOf(c)};--d:${i}" aria-label="${esc(T('card.aria', { name: c.name }))}">
        <span class="ccard__clip">
          <img class="ccard__img" src="${thumb(c.id)}" alt="" loading="lazy" decoding="async">
          <span class="ccard__shade"></span><span class="ccard__glare"></span>
        </span>
        <span class="ccard__frame"></span>
        <span class="ccard__top"><span class="ccard__sig" title="${esc(c.house ? H[c.house].name : G[c.group].name)}">${sigOf(c)}</span><span class="ccard__en">${esc(c.en)}</span></span>
        <span class="ccard__info">
          <span class="ccard__role">${esc(c.role)}</span>
          <span class="ccard__name">${esc(c.name)}</span>
          <span class="ccard__meta">${esc(ageText(c.age))}<i></i>${esc(c.height)}</span>
          <span class="ccard__quote">${esc(qt(q))}</span>
        </span>
        <span class="ccard__chibi${c.id === 'celine' ? ' is-tall' : ''}" aria-hidden="true"><img src="${chibi(c.id)}" alt="" loading="lazy" decoding="async"></span>
      </button>`;
  }

  /* 카드 기울기 (마우스 전용) */
  document.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || REDUCE) return;
    const card = e.target.closest('.ccard');
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    card.classList.add('is-tilting');
    card.style.setProperty('--ry', ((px - .5) * 14).toFixed(2) + 'deg');
    card.style.setProperty('--rx', ((.5 - py) * 12).toFixed(2) + 'deg');
    card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
    card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
  });
  document.addEventListener('pointerout', e => {
    const card = e.target.closest && e.target.closest('.ccard');
    if (!card || card.contains(e.relatedTarget)) return;
    card.classList.remove('is-tilting');
    card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg');
  });

  /* ════════════════════ 인물 페이지 ════════════════════ */
  const C = (() => {
    const state = { group: 'all', q: '' };
    let list = [];
    function tabs() {
      const ids = ['all', ...GROUP_IDS];
      $('#ctabs').innerHTML = ids.map(id => {
        const n = id === 'all' ? CHARS.length : CHARS.filter(c => c.group === id).length;
        const rgb = id === 'all' ? '216,178,106' : G[id].rgb;
        const icon = HOUSE_IDS.includes(id) ? `<img src="${crest(id)}" alt="">` : `<svg><use href="#sig-${id === 'all' ? 'raven' : id}"/></svg>`;
        return `<button class="ctab${state.group === id ? ' is-active' : ''}" type="button" role="tab" aria-selected="${state.group === id}" data-tab="${id}" style="--fc:${rgb}">${icon}${id === 'all' ? T('tab.all') : esc(G[id].name)}<small>${n}</small></button>`;
      }).join('');
    }
    function banner() {
      const id = state.group, b = $('#cbanner');
      const n = id === 'all' ? CHARS.length : CHARS.filter(c => c.group === id).length;
      if (HOUSE_IDS.includes(id)) {
        const h = H[id];
        b.style.setProperty('--fc', h.rgb);
        b.innerHTML = `<img class="cbanner__crest" src="${crest(id)}" alt=""><div><span class="cbanner__en">${esc(h.en.toUpperCase())} · ${esc(h.mottoEn)}</span><h2>${esc(h.name)} <small>${T('cb.count', { n })}</small></h2><p>${esc(h.animal)} · ${esc(h.colorName)} · ${esc(h.motto)} — ${esc(h.stance)}</p></div>${playBtn('h-' + id)}`;
      } else {
        const rgb = id === 'all' ? '216,178,106' : G[id].rgb;
        b.style.setProperty('--fc', rgb);
        b.innerHTML = `<svg class="cbanner__sig"><use href="#sig-${id === 'all' ? 'raven' : id}"/></svg><div><span class="cbanner__en">${id === 'all' ? 'ALL RECORDS' : G[id].en}</span><h2>${id === 'all' ? T('tab.all') : esc(G[id].name)} <small>${T('cb.count', { n })}</small></h2><p>${T('cb.' + id)}</p></div>`;
      }
    }
    function filtered() {
      const q = state.q.trim().toLowerCase();
      let l = CHARS.filter(c => state.group === 'all' || c.group === state.group);
      if (q) l = l.filter(c => [c.name, c.nameKo, c.en, c.role, G[c.group].name, c.house ? H[c.house].name : '', ...c.persona].join(' ').toLowerCase().includes(q));
      return l;
    }
    function grid() {
      list = filtered();
      $('#cards').innerHTML = list.map(cardHTML).join('');
      $('#cardsEmpty').hidden = list.length > 0;
    }
    function render() { tabs(); banner(); grid(); $('#qInput').value = state.q; }
    $('#ctabs').addEventListener('click', e => {
      const t = e.target.closest('[data-tab]'); if (!t || t.dataset.tab === state.group) return;
      state.group = t.dataset.tab; tabs(); banner(); grid();
    });
    let qT;
    $('#qInput').addEventListener('input', e => { clearTimeout(qT); qT = setTimeout(() => { state.q = e.target.value; grid(); }, 140); });
    $('#btnRandom').addEventListener('click', () => {
      if (!list.length) return;
      const c = list[Math.floor(Math.random() * list.length)];
      Modal.open(c.id, list.map(x => x.id));
    });
    return { state, render, get ids() { return list.map(c => c.id); } };
  })();
  onEnter.characters = () => C.render();

  /* 묶음 버튼 (구성원 보기) → 인물 페이지의 해당 탭 */
  document.addEventListener('click', e => {
    const g = e.target.closest('[data-cgroup]');
    if (!g) return;
    e.preventDefault();
    C.state.group = g.dataset.cgroup; C.state.q = '';
    if (Modal.isOpen) Modal.close();
    if (current === 'characters') { C.render(); window.scrollTo({ top: 0, behavior: REDUCE ? 'auto' : 'smooth' }); }
    else go('characters');
  });

  /* 카드 · 아바타 클릭 → 상세 */
  document.addEventListener('click', e => {
    const card = e.target.closest('[data-char]');
    if (!card || card.closest('#cmodal')) return;
    e.preventDefault();
    const id = card.dataset.char;
    Modal.open(id, card.closest('#cards') ? C.ids : null);
  });

  /* ════════════════════ 인물 상세 모달 ════════════════════ */
  const Modal = (() => {
    const root = $('#cmodal'), panel = $('#cmPanel');
    let ctx = [], idx = 0, lastFocus = null;
    function relsOf(id) {
      return D.RELATIONS.filter(r => r.a === id || r.b === id).map(r => {
        const other = r.a === id ? r.b : r.a;
        const arrow = r.dir === '<>' ? '↔' : (r.a === id ? '→' : '←');
        return { other, arrow, label: r.label, star: r.star };
      }).sort((a, b) => (b.star ? 1 : 0) - (a.star ? 1 : 0));
    }
    function relHTML(rel) {
      const star = rel.star ? `<i class="cm__star" title="${T('cm.star')}"><svg><use href="#i-star"/></svg></i>` : '';
      if (isGhost(rel.other)) {
        const g = GH[rel.other];
        return `<div class="cm__rel is-ghost${rel.star ? ' is-star' : ''}"><span class="cm__ghost"><svg><use href="#sig-ghost"/></svg></span><span><b>${esc(g.name)}<em>${rel.arrow}</em>${star}<small>${esc(g.role)}</small></b><span>${esc(rel.label)}</span></span></div>`;
      }
      const o = byId[rel.other];
      return `<button class="cm__rel${rel.star ? ' is-star' : ''}" type="button" data-rel="${o.id}" style="--rc:${accOf(o)}">
        <img src="${thumb(o.id)}" alt="" loading="lazy">
        <span><b>${esc(o.name)}<em>${rel.arrow}</em>${star}</b><span>${esc(rel.label)}</span></span>
      </button>`;
    }
    function html(c) {
      const g = G[c.group], rels = relsOf(c.id);
      const isStudent = HOUSE_IDS.includes(c.group);
      const houseCell = c.house ? `${houseChip(c.house)}` : T('cm.none');
      return `
        <div class="cm__portrait">
          <img src="${full(c.id)}" alt="${esc(T('cm.alt', { name: c.name }))}">
          <span class="cm__flabel">${sigOf(c)}${esc(c.house && isStudent ? H[c.house].name : g.name)}</span>
          <span class="cm__wm">${esc(c.en.split(' ')[0].toUpperCase())}</span>
        </div>
        <div class="cm__content">
          <button class="cm__close" type="button" data-close aria-label="${T('cm.close')}"><svg><use href="#i-close"/></svg></button>
          <p class="cm__eyebrow">${esc(g.en)} · ${esc(c.role)}${ctx.length > 1 ? `<span class="cm__count">${T('cm.count', { i: idx + 1, n: ctx.length })}</span>` : ''}</p>
          <h2 class="cm__name" id="cmName">${esc(c.name)}</h2>
          <p class="cm__en">${esc(c.en)}</p>
          <div class="cm__stats">
            <div><small>${T('cm.group')}</small><b>${esc(g.name)}</b></div>
            <div><small>${isStudent ? T('cm.house') : T('cm.alma')}</small><b>${houseCell}</b></div>
            <div><small>${T('cm.age')}</small><b>${esc(ageText(c.age))}</b></div>
            <div><small>${T('cm.height')}</small><b>${esc(c.height)}</b></div>
          </div>
          <blockquote class="cm__quote">
            <span class="cm__chibi${c.id === 'celine' ? ' is-tall' : ''}" aria-hidden="true"><img src="${chibi(c.id)}" alt=""></span>
            <p>${esc(qt(c.quote))}</p>
          </blockquote>
          ${Music.has('t-' + c.id) ? `<button class="cm__theme${Music.cur === 't-' + c.id ? ' is-cur' : ''}" type="button" data-play="t-${c.id}"><svg><use href="#i-music"/></svg><span><small>${T('mu.playTheme')}</small><b>${esc(Music.titleOf('t-' + c.id))}</b></span><i class="eq" aria-hidden="true"><b></b><b></b><b></b></i></button>` : ''}
          <section class="cm__sec"><h4>${T('cm.secP')}</h4><div class="cm__chips cm__chips--persona">${c.persona.map(p => `<span>${esc(p)}</span>`).join('')}</div></section>
          <section class="cm__sec"><h4>${T('cm.secA')}</h4><div class="cm__chips">${splitTop(c.look).map(p => `<span>${esc(p)}</span>`).join('')}</div></section>
          <section class="cm__sec"><h4>${T('cm.secS')}</h4><p>${esc(c.speech)}</p><div class="cm__tics"><small>${T('cm.tics')}</small>${c.tics.map(t => `<span>${esc(qt(t))}</span>`).join('')}</div></section>
          ${rels.length ? `<section class="cm__sec"><h4>${T('cm.secRel')}</h4><div class="cm__rels">${rels.map(relHTML).join('')}</div></section>` : ''}
        </div>`;
    }
    function paint(dir) {
      const c = byId[ctx[idx]];
      panel.style.setProperty('--acc', accOf(c));
      panel.innerHTML = html(c);
      panel.scrollTop = 0;
      const ct = $('.cm__content', panel); if (ct) ct.scrollTop = 0;
      if (dir) {
        panel.style.setProperty('--sx', dir > 0 ? '40px' : '-40px');
        panel.classList.remove('is-swap'); void panel.offsetWidth; panel.classList.add('is-swap');
      }
      const multi = ctx.length > 1;
      $('#cmPrev').hidden = !multi; $('#cmNext').hidden = !multi;
    }
    function open(id, list) {
      const c = byId[id];
      if (!c) return;
      ctx = list && list.includes(id) ? list : CHARS.filter(x => x.group === c.group).map(x => x.id);
      idx = ctx.indexOf(id);
      const wasOpen = !root.hidden;
      if (!wasOpen) lastFocus = document.activeElement;
      root.hidden = false;
      body.classList.add('is-locked');
      paint(wasOpen ? 1 : 0);
      if (!wasOpen) { panel.style.animation = 'none'; void panel.offsetWidth; panel.style.animation = ''; }
      $('.cm__close', panel).focus({ preventScroll: true });
    }
    function close() {
      if (root.hidden) return;
      root.hidden = true;
      if (!Music.isOpen) body.classList.remove('is-locked');
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    function step(d) { if (ctx.length < 2) return; idx = (idx + d + ctx.length) % ctx.length; paint(d); }
    root.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) { close(); return; }
      const rel = e.target.closest('[data-rel]');
      if (rel) {
        const o = byId[rel.dataset.rel];
        if (!ctx.includes(o.id)) ctx = CHARS.filter(x => x.group === o.group).map(x => x.id);
        idx = ctx.indexOf(o.id); paint(1);
      }
    });
    $('#cmPrev').addEventListener('click', () => step(-1));
    $('#cmNext').addEventListener('click', () => step(1));
    /* 모바일 스와이프 */
    let sx = null, sy = null;
    panel.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    panel.addEventListener('touchend', e => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; sx = null;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.4) step(dx < 0 ? 1 : -1);
    });
    return { open, close, step, get isOpen() { return !root.hidden; } };
  })();

  /* ════════════════════ 관계도 ════════════════════ */
  const Rel = (() => {
    const svg = $('#relSvg'), stage = $('#relStage'), panel = $('#relPanel');
    const NS = 'http://www.w3.org/2000/svg';
    const ANCHOR = { leader: [.4, .2], prof: [.4, .47], brevalin: [.15, .76], clamis: [.42, .84], curringlindt: [.7, .76], hunter: [.82, .3], 'g:henry': [.64, .12], 'g:luna': [.14, .36] };
    let W = 800, H2 = 600, nodes = [], edges = [], raf = null, alpha = 1, sel = null, built = false;
    const hidden = new Set();
    const mk = (tag, attrs = {}) => { const el = document.createElementNS(NS, tag); for (const k in attrs) el.setAttribute(k, attrs[k]); return el; };
    const anchorOf = n => ANCHOR[n.ghost ? 'g:' + n.id : n.g];

    function build() {
      svg.innerHTML = '';
      W = stage.clientWidth; H2 = stage.clientHeight;
      svg.setAttribute('viewBox', `0 0 ${W} ${H2}`);
      const defs = mk('defs');
      defs.innerHTML = `<clipPath id="nclip"><circle r="21"/></clipPath>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="rgba(70,45,22,.55)"/></marker>
        <marker id="arrHi" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--accent)"/></marker>`;
      svg.appendChild(defs);
      const gE = mk('g'), gL = mk('g'), gN = mk('g');
      svg.append(gE, gL, gN);

      nodes = CHARS.map(c => ({ id: c.id, c, g: c.group, r: 22 }));
      Object.keys(GH).forEach(id => nodes.push({ id, ghost: true, g: GH[id].group, r: 20 }));
      nodes.forEach(n => {
        const [ax, ay] = anchorOf(n);
        n.x = ax * W + (Math.random() - .5) * 120; n.y = ay * H2 + (Math.random() - .5) * 120; n.vx = 0; n.vy = 0;
        const g = mk('g', { class: 'r-node' + (n.ghost ? ' is-ghost' : ''), 'data-id': n.id, tabindex: '0' });
        const rgb = n.ghost ? '110,84,58' : accOf(n.c);
        g.appendChild(mk('circle', { r: n.r, fill: n.ghost ? '#efe3c6' : '#2a1f16' }));
        if (n.ghost) {
          const u = mk('use', { href: '#sig-ghost', x: -13, y: -13, width: 26, height: 26 });
          u.style.color = `rgb(${rgb})`; g.appendChild(u);
        } else {
          g.appendChild(mk('image', { class: 'r-img', href: thumb(n.id), x: -21, y: -21, width: 42, height: 42, 'clip-path': 'url(#nclip)', preserveAspectRatio: 'xMidYMin slice' }));
        }
        g.appendChild(mk('circle', { class: 'r-ring', r: n.r, stroke: `rgb(${rgb})` }));
        const t = mk('text', { y: n.r + 15 }); t.textContent = nameOf(n.id); g.appendChild(t);
        n.el = g; gN.appendChild(g);
      });
      const byN = Object.fromEntries(nodes.map(n => [n.id, n]));
      edges = D.RELATIONS.map(r => {
        const e = { a: byN[r.a], b: byN[r.b], dir: r.dir, label: r.label, star: r.star };
        e.el = mk('path', { class: 'r-edge' + (r.star ? ' is-star' : ''), 'marker-end': 'url(#arr)' });
        if (r.dir === '<>') e.el.setAttribute('marker-start', 'url(#arr)');
        e.lab = mk('text', { class: 'r-edge-label', 'text-anchor': 'middle' });
        e.lab.textContent = (r.star ? '★ ' : '') + (r.label.length > 22 ? r.label.slice(0, 21) + '…' : r.label);
        gE.appendChild(e.el); gL.appendChild(e.lab);
        return e;
      });
      legend();
      bind();
      built = true;
    }

    function legend() {
      $('#relLegend').innerHTML = GROUP_IDS.map(id => `<button type="button" class="${hidden.has(id) ? 'is-off' : ''}" data-lf="${id}" style="--fc:${G[id].rgb}"><i></i>${esc(G[id].name)}</button>`).join('');
    }
    const off = n => hidden.has(n.g);

    function tick() {
      const k = alpha;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (off(a)) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (off(b)) continue;
          let dx = b.x - a.x, dy = b.y - a.y, d2 = dx * dx + dy * dy || 1;
          const min = a.r + b.r + 34;
          const f = (2400 / d2) * k;
          const d = Math.sqrt(d2);
          dx /= d; dy /= d;
          let push = f;
          if (d < min) push += (min - d) * .5;
          a.vx -= dx * push; a.vy -= dy * push; b.vx += dx * push; b.vy += dy * push;
        }
      }
      for (const e of edges) {
        if (off(e.a) || off(e.b)) continue;
        const dx = e.b.x - e.a.x, dy = e.b.y - e.a.y, d = Math.hypot(dx, dy) || 1;
        const f = (d - 150) * .01 * k;
        e.a.vx += dx / d * f; e.a.vy += dy / d * f; e.b.vx -= dx / d * f; e.b.vy -= dy / d * f;
      }
      for (const n of nodes) {
        const [ax, ay] = anchorOf(n);
        n.vx += (ax * W - n.x) * .014 * k; n.vy += (ay * H2 - n.y) * .014 * k;
        if (n.fixed) { n.vx = n.vy = 0; continue; }
        n.vx *= .82; n.vy *= .82;
        n.x = clamp(n.x + n.vx, n.r + 6, W - n.r - 6);
        n.y = clamp(n.y + n.vy, n.r + 6, H2 - n.r - 24);
      }
      alpha = Math.max(.02, alpha * .992);
    }

    function draw() {
      for (const n of nodes) {
        n.el.setAttribute('transform', `translate(${n.x.toFixed(1)},${n.y.toFixed(1)})`);
        n.el.style.display = off(n) ? 'none' : '';
      }
      for (const e of edges) {
        const hide = off(e.a) || off(e.b);
        e.el.style.display = e.lab.style.display = hide ? 'none' : '';
        if (hide) continue;
        const dx = e.b.x - e.a.x, dy = e.b.y - e.a.y, d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d;
        const x1 = e.a.x + ux * (e.a.r + 3), y1 = e.a.y + uy * (e.a.r + 3), x2 = e.b.x - ux * (e.b.r + 3), y2 = e.b.y - uy * (e.b.r + 3);
        const mx = (x1 + x2) / 2 - uy * 18, my = (y1 + y2) / 2 + ux * 18;
        e.el.setAttribute('d', `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`);
        e.lab.setAttribute('x', ((x1 + x2) / 2 - uy * 12).toFixed(1));
        e.lab.setAttribute('y', ((y1 + y2) / 2 + ux * 12).toFixed(1));
      }
    }
    function loop() { tick(); draw(); raf = requestAnimationFrame(loop); }

    function select(id) {
      sel = id;
      const nb = new Set([id]);
      edges.forEach(e => {
        const on = id && (e.a.id === id || e.b.id === id);
        if (on) { nb.add(e.a.id); nb.add(e.b.id); }
        e.el.classList.toggle('is-hi', !!on); e.el.classList.toggle('is-dim', !!id && !on);
        e.el.setAttribute('marker-end', on ? 'url(#arrHi)' : 'url(#arr)');
        if (e.dir === '<>') e.el.setAttribute('marker-start', on ? 'url(#arrHi)' : 'url(#arr)');
        e.lab.classList.toggle('is-on', !!on);
      });
      nodes.forEach(n => { n.el.classList.toggle('is-dim', !!id && !nb.has(n.id)); n.el.classList.toggle('is-hi', n.id === id); });
      paintPanel(id);
    }

    function paintPanel(id) {
      if (!id) { panel.innerHTML = `<p class="rel__hint">${T('rg.hint')}</p>`; return; }
      const rels = D.RELATIONS.filter(r => r.a === id || r.b === id);
      let head;
      if (isGhost(id)) {
        const g = GH[id];
        head = `<div class="rp__head"><span class="rp__ghost"><svg><use href="#sig-ghost"/></svg></span><div><b>${esc(g.name)}</b><span>${esc(g.role)} · ${T('rg.ghost')}</span></div></div>`;
      } else {
        const c = byId[id];
        head = `<div class="rp__head"><img src="${thumb(c.id)}" alt=""><div><b>${esc(c.name)}</b><span>${esc(G[c.group].name)} · ${esc(c.role)}</span></div></div>`;
      }
      panel.innerHTML = head + `<ul class="rp__list">${rels.map(r => {
        const other = r.a === id ? r.b : r.a, arrow = r.dir === '<>' ? '↔' : (r.a === id ? '→' : '←');
        return `<li data-pick="${other}" class="${r.star ? 'is-star' : ''}"><b>${esc(nameOf(id))}</b><em>${arrow}</em><b>${esc(nameOf(other))}</b>${r.star ? ' <i class="rp__star">★</i>' : ''}<br>${esc(r.label)}</li>`;
      }).join('')}</ul>` + (!isGhost(id) ? `<button class="btn-ghost" type="button" data-char="${id}">${T('rg.open')}</button>` : '');
    }

    function bind() {
      let drag = null, moved = false, lastTap = 0, lastId = null;
      const pt = e => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H2]; };
      svg.addEventListener('pointerdown', e => {
        const g = e.target.closest('.r-node');
        if (!g) { select(null); return; }
        const n = nodes.find(x => x.id === g.dataset.id);
        drag = n; moved = false; n.fixed = true;
        try { svg.setPointerCapture(e.pointerId); } catch (err) {}
        svg.classList.add('is-drag');
        alpha = Math.max(alpha, .5);
      });
      svg.addEventListener('pointermove', e => {
        if (!drag) return;
        const [x, y] = pt(e);
        if (Math.hypot(x - drag.x, y - drag.y) > 3) moved = true;
        drag.x = x; drag.y = y;
      });
      const end = () => {
        if (!drag) return;
        const n = drag; drag = null; n.fixed = false; svg.classList.remove('is-drag');
        if (!moved) {
          const now = Date.now();
          if (lastId === n.id && now - lastTap < 380 && !n.ghost) Modal.open(n.id);
          lastTap = now; lastId = n.id;
          select(n.id);
        }
      };
      svg.addEventListener('pointerup', end);
      svg.addEventListener('pointercancel', end);
      svg.addEventListener('keydown', e => { const g = e.target.closest('.r-node'); if (g && e.key === 'Enter') select(g.dataset.id); });
      panel.addEventListener('click', e => { const li = e.target.closest('[data-pick]'); if (li) select(li.dataset.pick); });
      $('#relLegend').addEventListener('click', e => {
        const b = e.target.closest('[data-lf]'); if (!b) return;
        const id = b.dataset.lf;
        hidden.has(id) ? hidden.delete(id) : hidden.add(id);
        alpha = .8; legend();
      });
      addEventListener('resize', () => {
        if (current !== 'relations') return;
        W = stage.clientWidth; H2 = stage.clientHeight; svg.setAttribute('viewBox', `0 0 ${W} ${H2}`); alpha = .7;
      });
    }

    function reset() {
      hidden.clear();
      nodes.forEach(n => { const [ax, ay] = anchorOf(n); n.x = ax * W + (Math.random() - .5) * 120; n.y = ay * H2 + (Math.random() - .5) * 120; n.vx = n.vy = 0; });
      alpha = 1; legend(); select(null);
    }
    $('#relReset').addEventListener('click', () => { if (built) reset(); });

    return {
      enter() {
        if (!built) build();
        else { W = stage.clientWidth; H2 = stage.clientHeight; svg.setAttribute('viewBox', `0 0 ${W} ${H2}`); }
        alpha = 1; paintPanel(sel);
        cancelAnimationFrame(raf); raf = requestAnimationFrame(loop);
      },
      leave() { cancelAnimationFrame(raf); raf = null; },
      focus(id) {
        if (!built) return;
        const n = nodes.find(x => x.id === id);
        if (n && hidden.has(n.g)) { hidden.delete(n.g); legend(); }
        alpha = Math.max(alpha, .4);
        select(id);
        stage.scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth', block: 'center' });
      }
    };
  })();
  onEnter.relations = () => { Rel.enter(); RelSum.render(); };
  onLeave.relations = () => Rel.leave();

  /* ════════════════════ 관계 총정리 ════════════════════ */
  const RelSum = (() => {
    const box = $('#rsBody');
    let mode = 'group', q = '';
    const rgbOf = id => isGhost(id) ? '200,190,175' : accOf(byId[id]);
    const face = id => isGhost(id) ? `<span class="rs__hub"><svg><use href="#sig-ghost"/></svg></span>` : `<img src="${thumb(id)}" alt="" loading="lazy">`;
    const who = id => isGhost(id)
      ? `<span class="rs__who is-ghost" style="--fc:${rgbOf(id)}">${face(id)}<b>${esc(nameOf(id))}</b></span>`
      : `<button type="button" class="rs__who" data-rs-char="${id}" style="--fc:${rgbOf(id)}">${face(id)}<b>${esc(nameOf(id))}</b></button>`;
    const hay = id => isGhost(id) ? `${GH[id].name} ${GH[id].role}` : `${byId[id].name} ${byId[id].nameKo} ${byId[id].en}`;
    const match = r => !q || `${hay(r.a)} ${hay(r.b)} ${r.label}`.toLowerCase().includes(q);
    const star = r => r.star ? '<i class="rs__star">★</i>' : '';
    const row = r => `<li class="rs__row${r.star ? ' is-star' : ''}" data-rs-pick="${r.a}">${who(r.a)}<span class="rs__arrow">${r.dir === '<>' ? '↔' : '→'}</span>${who(r.b)}${star(r)}<p class="rs__label">${esc(r.label)}</p></li>`;

    function byGroup() {
      const groups = {}; GROUP_IDS.forEach(g => { groups[g] = []; }); groups.cross = [];
      D.RELATIONS.filter(match).forEach(r => { const a = groupOf(r.a), b = groupOf(r.b); groups[a === b ? a : 'cross'].push(r); });
      return Object.entries(groups).filter(([, l]) => l.length).map(([g, l]) => `
        <div class="rs__group" style="--fc:${g === 'cross' ? '216,178,106' : G[g].rgb}">
          <h4 class="rs__gh">${g === 'cross' ? `<svg><use href="#sig-raven"/></svg>${T('rs.cross')}` : `${HOUSE_IDS.includes(g) ? `<img src="${crest(g)}" alt="">` : `<svg><use href="#sig-${g}"/></svg>`}${T('rs.inside', { g: esc(G[g].name) })}`}<small>${T('rs.count', { n: l.length })}</small></h4>
          <ul class="rs__list">${l.map(row).join('')}</ul>
        </div>`).join('');
    }
    function byStar() {
      const l = D.RELATIONS.filter(r => r.star && match(r));
      if (!l.length) return '';
      return `<div class="rs__group is-star" style="--fc:216,178,106"><h4 class="rs__gh"><svg><use href="#i-star"/></svg>${T('rs.starT')}<small>${T('rs.count', { n: l.length })}</small></h4><ul class="rs__list">${l.map(row).join('')}</ul></div>`;
    }
    function byPerson() {
      const people = [...CHARS.map(c => c.id), ...Object.keys(GH)].map(id => ({ id, rels: D.RELATIONS.filter(r => (r.a === id || r.b === id) && match(r)) }))
        .filter(p => p.rels.length).sort((a, b) => b.rels.length - a.rels.length);
      return `<div class="rs__people">${people.map(({ id, rels }) => `
        <article class="rs__person" style="--fc:${rgbOf(id)}">
          <header data-rs-pick="${id}">${who(id)}<small>${esc(G[groupOf(id)].name)} · ${T('rs.relN', { n: rels.length })}</small></header>
          <ul>${rels.map(r => {
            const other = r.a === id ? r.b : r.a, arrow = r.dir === '<>' ? '↔' : (r.a === id ? '→' : '←');
            return `<li data-rs-pick="${id}" class="${r.star ? 'is-star' : ''}"><em>${arrow}</em>${who(other)}${star(r)}<p class="rs__label">${esc(r.label)}</p></li>`;
          }).join('')}</ul>
        </article>`).join('')}</div>`;
    }
    function render() {
      const html = mode === 'group' ? byGroup() : mode === 'star' ? byStar() : byPerson();
      box.innerHTML = html.trim() ? html : `<p class="empty">${T('rs.none')}</p>`;
    }
    let qT;
    $('#rsInput').addEventListener('input', e => { clearTimeout(qT); qT = setTimeout(() => { q = e.target.value.trim().toLowerCase(); render(); }, 120); });
    $('.rsum__mode').addEventListener('click', e => {
      const b = e.target.closest('[data-mode]'); if (!b || b.dataset.mode === mode) return;
      mode = b.dataset.mode;
      $$('.rsum__mode button').forEach(x => x.classList.toggle('is-on', x === b));
      render();
    });
    box.addEventListener('click', e => {
      const ch = e.target.closest('[data-rs-char]');
      if (ch) { Modal.open(ch.dataset.rsChar); return; }
      const pick = e.target.closest('[data-rs-pick]');
      if (pick) Rel.focus(pick.dataset.rsPick);
    });
    return { render };
  })();

  /* ════════════════════ 편의 기능: 읽기 진행 · 목차 · 맨 위로 ════════════════════ */
  const Toc = (() => {
    const nav = $('#toc');
    let spy = null;
    function build(view) {
      if (spy) spy.disconnect();
      nav.innerHTML = '';
      if (view !== 'world' && view !== 'school') { nav.hidden = true; return; }
      const root = $('#v-' + view);
      const secs = $$(':scope > .hero, :scope > section.block', root);
      secs.forEach((s, i) => { if (!s.id) s.id = `${view}-s${i}`; });
      nav.innerHTML = secs.map((s, i) => {
        const t = $('.block__title span', s);
        const label = t ? t.textContent.trim() : T('toc.top');
        return `<a href="#${s.id}" data-toc="${s.id}"><i></i><span>${esc(label)}</span><b>${String(i).padStart(2, '0')}</b></a>`;
      }).join('');
      nav.hidden = false;
      spy = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) $$('a', nav).forEach(a => a.classList.toggle('is-on', a.dataset.toc === e.target.id));
      }), { rootMargin: '-40% 0px -55% 0px' });
      secs.forEach(s => spy.observe(s));
    }
    nav.addEventListener('click', e => {
      const a = e.target.closest('[data-toc]'); if (!a) return;
      e.preventDefault();
      document.getElementById(a.dataset.toc).scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth', block: 'start' });
    });
    return { build };
  })();

  const progressBar = $('#progress i'), toTop = $('#toTop');
  addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progressBar.style.transform = `scaleX(${max > 0 ? clamp(scrollY / max, 0, 1) : 0})`;
    toTop.classList.toggle('is-on', scrollY > innerHeight * .9);
  }, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: REDUCE ? 'auto' : 'smooth' }));

  /* ════════════════════ 검색 팔레트 ════════════════════ */
  const Palette = (() => {
    const root = $('#palette'), input = $('#palInput'), ul = $('#palList');
    let items = [], selI = 0;
    function render() {
      const q = input.value.trim().toLowerCase();
      items = CHARS.filter(c => !q || [c.name, c.nameKo, c.en, c.role, G[c.group].name, c.house ? H[c.house].name : ''].join(' ').toLowerCase().includes(q));
      selI = clamp(selI, 0, Math.max(0, items.length - 1));
      ul.innerHTML = items.length ? items.map((c, i) => `<li class="${i === selI ? 'is-sel' : ''}" data-i="${i}" role="option" aria-selected="${i === selI}" style="--acc:${accOf(c)}">
          <img src="${thumb(c.id)}" alt="">
          <div><b>${esc(c.name)}</b><span>${esc(G[c.group].name)} · ${esc(c.role)}</span></div>
          <em>${c.house ? `<img src="${crest(c.house)}" alt="">` : `<svg><use href="#sig-${c.group}"/></svg>`}</em></li>`).join('') : `<li class="palette__empty">${T('pal.none')}</li>`;
      const s = $('.is-sel', ul); if (s) s.scrollIntoView({ block: 'nearest' });
    }
    function open() { root.hidden = false; input.value = ''; selI = 0; render(); setTimeout(() => input.focus(), 30); }
    function close() { root.hidden = true; }
    function choose(i) { const c = items[i]; if (!c) return; close(); Modal.open(c.id); }
    input.addEventListener('input', () => { selI = 0; render(); });
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); selI = Math.min(items.length - 1, selI + 1); render(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); selI = Math.max(0, selI - 1); render(); }
      if (e.key === 'Enter') { e.preventDefault(); choose(selI); }
    });
    ul.addEventListener('click', e => { const li = e.target.closest('[data-i]'); if (li) choose(+li.dataset.i); });
    root.addEventListener('click', e => { if (e.target.closest('[data-close]')) close(); });
    return { open, close, get isOpen() { return !root.hidden; } };
  })();

  /* ════════════════════ 음악 플레이어 ════════════════════
     하나의 <audio> 를 사이트 전체가 공유 → 페이지를 옮겨도, 화면이 꺼져도 계속 재생.
     처음에는 멈춘 상태. 셔플 · 반복 · 볼륨 · 마지막 곡 · 내 플레이리스트는 브라우저에 기억 */
  const Music = (() => {
    const MU = D.MUSIC, audio = $('#audio'), root = $('#music');
    const tracks = MU.tracks.map(t => Object.assign({}, t, { playable: t.audio !== false }));
    const byTid = Object.fromEntries(tracks.map(t => [t.id, t]));
    let cur = store.get('m.track', 'main');
    if (!byTid[cur] || !byTid[cur].playable) cur = 'main';
    let shuffle = store.get('m.shuffle', true), repeat = store.get('m.repeat', 'all');
    let vol = store.get('m.vol', .7), muted = store.get('m.muted', false);
    let base = [], order = [], filter = 'all', q = '', loadedId = null, seeking = false;
    let advancing = false, resumeWhenVisible = false;

    /* 내 플레이리스트: [{ id, name, ids: [곡 id…] }] */
    let lists = store.get('m.lists', []).filter(l => l && l.id && Array.isArray(l.ids));
    const saveLists = () => store.set('m.lists', lists);
    const listOf = id => lists.find(l => l.id === id);
    let selecting = false, picked = new Set(), sheetIds = [];

    const groupName = g => G[g] ? G[g].name : T('mu.g.' + g);
    const isTheme = t => !!(t.char || t.house);
    const themeName = t => t.char ? byId[t.char].name : H[t.house].name;
    const fmt = s => (isFinite(s) && s > 0) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '0:00';
    const subLocal = t => ((LD.music || {})[t.id]) || t.sub || '';
    const titleOf = t => `${MU.artist} - ${t.title}` + (isTheme(t) ? ` ( ${T('mu.theme', { name: themeName(t) })} )` : '');
    const subOf = t => {
      if (t.char) return `${groupName(t.g)} · ${byId[t.char].role}`;
      if (t.house) return `${groupName('house')} · ${H[t.house].animal} · ${H[t.house].motto}`;
      if (t.g === 'main') return subLocal(t);
      return `${groupName(t.g)} · ${subLocal(t)}`;
    };
    const coverOf = t => `assets/cover/${t.id}.jpg`;
    const hay = t => [t.title, titleOf(t), subOf(t), t.char ? byId[t.char].nameKo : '', groupName(t.g)].join(' ').toLowerCase();

    /* ── 재생 순서 ── */
    function setBase(list) {
      base = list.filter(t => t.playable).map(t => t.id);
      if (!base.length) base = tracks.filter(t => t.playable).map(t => t.id);
      buildOrder();
    }
    function buildOrder() {
      order = base.slice();
      if (shuffle) {
        for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
        const k = order.indexOf(cur);
        if (k > 0) { order.splice(k, 1); order.unshift(cur); }
      }
    }
    function step(d, auto) {
      if (!order.length) setBase(tracks);
      let i = order.indexOf(cur);
      if (i < 0) i = 0;
      let n = i + d;
      if (n >= order.length) {
        if (auto && repeat === 'off') { audio.pause(); audio.currentTime = 0; return; }
        if (shuffle) { buildOrder(); n = order[0] === cur && order.length > 1 ? 1 : 0; } else n = 0;
      }
      if (n < 0) n = order.length - 1;
      play(order[n]);
    }

    /* ── 재생 ── */
    function load(id) {
      const t = byTid[id];
      if (!t || !t.playable) return false;
      cur = id; store.set('m.track', id);
      if (loadedId !== id) {
        audio.preload = 'auto';
        audio.src = `assets/audio/${id}.mp3`;
        audio.load();
        loadedId = id;
      }
      advancing = false;
      paint();
      return true;
    }
    function play(id) {
      if (id && !load(id)) { toast(T('mu.soon')); return; }
      if (!loadedId) load(cur);
      audio.loop = repeat === 'one';
      const p = audio.play();
      if (p && p.catch) p.catch(() => {
        /* 화면이 꺼진 상태에서 브라우저가 재생을 막으면, 화면이 다시 켜질 때 이어서 재생 */
        if (document.hidden) resumeWhenVisible = true;
      });
    }
    function toggle() { if (audio.paused) play(); else audio.pause(); }
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && resumeWhenVisible) { resumeWhenVisible = false; play(); }
    });

    /* ── 화면 ── */
    function paint() {
      const t = byTid[cur];
      $$('[data-m-title]').forEach(e => { e.textContent = titleOf(t); });
      $$('[data-m-sub]').forEach(e => { e.textContent = subOf(t); });
      $$('[data-m-cover]').forEach(e => { e.src = coverOf(t); e.alt = t.title; });
      $('#mGroup').textContent = groupName(t.g).toUpperCase();
      $('#mBg').style.backgroundImage = `url('${coverOf(t)}')`;
      const ch = $('#mChar');
      ch.hidden = !t.char;
      ch.dataset.char = t.char || '';
      $$('[data-m-dur]').forEach(e => { e.textContent = fmt(audio.duration || t.dur); });
      $$('.mt').forEach(li => li.classList.toggle('is-cur', li.dataset.tid === cur));
      $$('[data-play]').forEach(b => b.classList.toggle('is-cur', b.dataset.play === cur));
      media(t);
    }
    function paintState() {
      const on = !audio.paused;
      body.classList.toggle('is-playing', on);
      $$('[data-m="play"]').forEach(b => { $('use', b).setAttribute('href', on ? '#i-pause' : '#i-play'); const l = on ? T('mu.pause') : T('mu.play'); b.setAttribute('aria-label', l); b.setAttribute('title', l); });
      $$('[data-m="shuffle"]').forEach(b => { b.setAttribute('aria-pressed', String(shuffle)); b.classList.toggle('is-on', shuffle); });
      $$('[data-m="repeat"]').forEach(b => {
        b.classList.toggle('is-on', repeat !== 'off');
        $('use', b).setAttribute('href', repeat === 'one' ? '#i-repeat1' : '#i-repeat');
        b.setAttribute('title', T('mu.rep.' + repeat));
      });
      $$('[data-m="mute"]').forEach(b => { $('use', b).setAttribute('href', muted || vol === 0 ? '#i-mute' : '#i-vol'); });
      $$('[data-m-vol]').forEach(r => { r.value = Math.round((muted ? 0 : vol) * 100); r.style.setProperty('--p', r.value + '%'); });
      if ('mediaSession' in navigator) { try { navigator.mediaSession.playbackState = on ? 'playing' : 'paused'; } catch (e) {} }
      if (Intro.isOpen) Intro.paintBgm();
    }
    function paintTime() {
      const d = audio.duration || byTid[cur].dur || 0, c = audio.currentTime || 0;
      if (!seeking) $$('[data-m-seek]').forEach(r => { r.value = d ? Math.round(c / d * 1000) : 0; r.style.setProperty('--p', (d ? c / d * 100 : 0) + '%'); });
      $$('[data-m-cur]').forEach(e => { e.textContent = fmt(c); });
      $$('[data-m-dur]').forEach(e => { e.textContent = fmt(d); });
    }

    /* ── 잠금화면 · 알림창 제어 (백그라운드 재생) ── */
    let posT = 0;
    function media(t) {
      if (!('mediaSession' in navigator)) return;
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: titleOf(t), artist: MU.artist, album: MU.album,
          artwork: [{ src: new URL(coverOf(t), location.href).href, sizes: '512x512', type: 'image/jpeg' }]
        });
      } catch (e) {}
    }
    if ('mediaSession' in navigator) {
      const ms = navigator.mediaSession, set = (a, f) => { try { ms.setActionHandler(a, f); } catch (e) {} };
      set('play', () => play()); set('pause', () => audio.pause());
      set('previoustrack', () => step(-1)); set('nexttrack', () => step(1));
      set('seekto', d => { if (d.seekTime != null) audio.currentTime = d.seekTime; });
      set('seekbackward', d => { audio.currentTime = Math.max(0, audio.currentTime - (d.seekOffset || 10)); });
      set('seekforward', d => { audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + (d.seekOffset || 10)); });
    }

    /* ── 목록 ── */
    function filtered() {
      let l;
      if (filter.startsWith('u:')) { const pl = listOf(filter.slice(2)); l = pl ? pl.ids.map(id => byTid[id]).filter(Boolean) : []; }
      else l = filter === 'all' ? tracks : tracks.filter(t => t.g === filter);
      if (q) l = l.filter(t => hay(t).includes(q));
      return l;
    }
    function renderTabs() {
      if (filter.startsWith('u:') && !listOf(filter.slice(2))) filter = 'all';
      const gs = ['all', ...MU.groups];
      $('#mTabs').innerHTML = gs.map(g => {
        const n = g === 'all' ? tracks.length : tracks.filter(t => t.g === g).length;
        return `<button type="button" role="tab" aria-selected="${filter === g}" class="${filter === g ? 'is-on' : ''}" data-mg="${g}">${g === 'all' ? T('mu.g.all') : esc(groupName(g))}<small>${n}</small></button>`;
      }).join('')
        + `<span class="music__tabs-sep" aria-hidden="true"></span>`
        + lists.map(l => `<button type="button" role="tab" aria-selected="${filter === 'u:' + l.id}" class="is-user${filter === 'u:' + l.id ? ' is-on' : ''}" data-mg="u:${l.id}">★ ${esc(l.name)}<small>${l.ids.length}</small></button>`).join('')
        + `<button type="button" class="is-new" data-mnew>＋ ${T('mu.newList')}</button>`;
    }
    function renderListHead() {
      const box = $('#mListHead');
      if (!filter.startsWith('u:')) { box.hidden = true; box.innerHTML = ''; return; }
      const pl = listOf(filter.slice(2));
      box.hidden = false;
      box.innerHTML = `<div><p class="eyebrow">${T('mu.myLists')}</p><h3>${esc(pl.name)}</h3><small>${T('mu.count', { n: pl.ids.length })}</small></div>
        <div class="music__lh-btns">
          <button type="button" class="btn-ghost" data-mlist="rename">${T('mu.rename')}</button>
          <button type="button" class="btn-ghost is-danger" data-mlist="delete">${T('mu.delete')}</button>
        </div>`;
    }
    function renderList() {
      const l = filtered(), user = filter.startsWith('u:');
      const inAny = new Set(lists.flatMap(x => x.ids));
      let html = '', lastG = null, n = 0;
      l.forEach(t => {
        if (filter === 'all' && !q && t.g !== lastG) { html += `<li class="mt__head">${esc(groupName(t.g))}</li>`; lastG = t.g; }
        n++;
        const side = selecting
          ? `<span class="mt__check${picked.has(t.id) ? ' is-on' : ''}" aria-hidden="true"></span>`
          : user
            ? `<button type="button" class="mt__btn" data-mdel="${t.id}" aria-label="${T('mu.removeFrom')}" title="${T('mu.removeFrom')}">−</button>`
            : `<button type="button" class="mt__btn${inAny.has(t.id) ? ' is-in' : ''}" data-madd="${t.id}" aria-label="${T('mu.addTo')}" title="${T('mu.addTo')}">${inAny.has(t.id) ? '✓' : '＋'}</button>`;
        html += `<li class="mt${t.id === cur ? ' is-cur' : ''}${t.playable ? '' : ' is-off'}${selecting && picked.has(t.id) ? ' is-picked' : ''}" data-tid="${t.id}" tabindex="0" role="button" aria-label="${esc(titleOf(t))}">
          <span class="mt__no">${String(n).padStart(2, '0')}</span>
          <span class="mt__art"><img src="${coverOf(t)}" alt="" loading="lazy"><i class="eq" aria-hidden="true"><b></b><b></b><b></b></i></span>
          <span class="mt__text"><b>${esc(titleOf(t))}</b><small>${esc(subOf(t))}</small></span>
          <span class="mt__dur">${t.playable ? fmt(t.dur) : T('mu.soon')}</span>
          ${side}
        </li>`;
      });
      $('#mTracks').innerHTML = html || `<li class="empty">${user && !q ? T('mu.listEmpty') : T('mu.empty')}</li>`;
      $('#mCount').textContent = T('mu.count', { n: tracks.filter(t => t.playable).length });
      renderListHead();
      paintSelect();
    }

    /* ── 선택 모드 · 담기 ── */
    function paintSelect() {
      root.classList.toggle('is-selecting', selecting);
      $('#mSelBtn').classList.toggle('is-on', selecting);
      $('#mSelBar').hidden = !selecting;
      $('#mSelCount').textContent = T('mu.selCount', { n: picked.size });
      $('#mSelAdd').disabled = !picked.size;
    }
    function setSelecting(on) { selecting = on; picked.clear(); renderList(); }
    function openSheet(ids) {
      sheetIds = ids;
      const sh = $('#mSheet');
      $('#mSheetList').innerHTML = lists.length
        ? lists.map(l => { const all = ids.length && ids.every(id => l.ids.includes(id)); return `<li><button type="button" data-msheet="${l.id}" class="${all ? 'is-in' : ''}"><b>★ ${esc(l.name)}</b><small>${T('mu.count', { n: l.ids.length })}</small><i>${all ? '✓' : '＋'}</i></button></li>`; }).join('')
        : `<li class="empty">${T('mu.noLists')}</li>`;
      $('#mSheetName').value = '';
      $('#mSheetName').placeholder = T('mu.defaultName', { n: lists.length + 1 });
      sh.hidden = false; void sh.offsetWidth; sh.classList.add('is-open');
    }
    function closeSheet() { const sh = $('#mSheet'); sh.classList.remove('is-open'); setTimeout(() => { sh.hidden = true; }, 250); }
    function addTo(listId, ids) {
      const l = listOf(listId); if (!l) return;
      const before = l.ids.length;
      ids.forEach(id => { if (!l.ids.includes(id)) l.ids.push(id); });
      saveLists();
      toast(T('mu.added', { name: l.name, n: l.ids.length - before }));
    }
    function createList(name, ids) {
      const l = { id: 'p' + Date.now().toString(36), name: name || T('mu.defaultName', { n: lists.length + 1 }), ids: ids.filter(id => byTid[id]) };
      lists.push(l); saveLists();
      toast(T('mu.created', { name: l.name }));
      return l;
    }

    /* ── 열기 · 닫기 ── */
    let closeT;
    function open() {
      clearTimeout(closeT);
      renderTabs(); renderList(); paint(); paintState(); paintTime();
      root.hidden = false; void root.offsetWidth;
      root.classList.add('is-open');
      body.classList.add('is-locked', 'is-music');
      /* 지금 곡이 보이도록 목록만 스크롤. 모바일은 창 전체가 하나로 스크롤되므로 맨 위에서 시작 */
      root.scrollTop = 0;
      const list = $('#mTracks'), main = $('.music__main', root), c = $('.mt.is-cur', root);
      main.scrollTop = 0;
      if (c && getComputedStyle(list).overflowY === 'auto') {
        list.scrollTop += c.getBoundingClientRect().top - list.getBoundingClientRect().top - list.clientHeight / 2 + c.offsetHeight / 2;
      }
      $('[data-m="close"]', root).focus({ preventScroll: true });
    }
    function close() {
      if (root.hidden) return;
      if (selecting) setSelecting(false);
      if (!$('#mSheet').hidden) closeSheet();
      root.classList.remove('is-open');
      body.classList.remove('is-music');
      if (!Modal.isOpen) body.classList.remove('is-locked');
      closeT = setTimeout(() => { root.hidden = true; }, 420);
    }

    /* ── 입력 ── */
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-m]');
      if (b) {
        const a = b.dataset.m;
        if (a === 'play') toggle();
        else if (a === 'next') step(1);
        else if (a === 'prev') { if (audio.currentTime > 3) audio.currentTime = 0; else step(-1); }
        else if (a === 'shuffle') { shuffle = !shuffle; store.set('m.shuffle', shuffle); buildOrder(); paintState(); toast(shuffle ? T('mu.shuffleOn') : T('mu.shuffleOff')); }
        else if (a === 'repeat') { repeat = { all: 'one', one: 'off', off: 'all' }[repeat]; store.set('m.repeat', repeat); audio.loop = repeat === 'one'; paintState(); toast(T('mu.rep.' + repeat)); }
        else if (a === 'mute') {
          if (vol === 0) { vol = .5; muted = false; } else muted = !muted;
          audio.muted = muted; audio.volume = vol;
          store.set('m.muted', muted); store.set('m.vol', vol);
          paintState();
        }
        else if (a === 'open') { $('#hud').classList.remove('is-menu'); open(); }
        else if (a === 'close') close();
        else if (a === 'shuffleAll') {
          shuffle = true; store.set('m.shuffle', true);
          const l = filtered().filter(t => t.playable);
          if (!l.length) return;
          cur = l[Math.floor(Math.random() * l.length)].id;
          setBase(l); play(cur); paintState();
        }
        return;
      }
      const p = e.target.closest('[data-play]');
      if (p) {
        e.preventDefault(); e.stopPropagation();
        const id = p.dataset.play;
        if (id === cur && !audio.paused) audio.pause();
        else { if (!base.includes(id)) setBase(tracks); play(id); }
      }
    }, true);

    $('#mTracks').addEventListener('click', e => {
      const add = e.target.closest('[data-madd]');
      if (add) { e.stopPropagation(); openSheet([add.dataset.madd]); return; }
      const del = e.target.closest('[data-mdel]');
      if (del) {
        e.stopPropagation();
        const l = listOf(filter.slice(2));
        if (l) { l.ids = l.ids.filter(id => id !== del.dataset.mdel); saveLists(); toast(T('mu.removed', { name: l.name })); renderTabs(); renderList(); }
        return;
      }
      const li = e.target.closest('.mt'); if (!li) return;
      const t = byTid[li.dataset.tid];
      if (selecting) {
        if (!t.playable) return;
        picked.has(t.id) ? picked.delete(t.id) : picked.add(t.id);
        li.classList.toggle('is-picked', picked.has(t.id));
        const ck = $('.mt__check', li); if (ck) ck.classList.toggle('is-on', picked.has(t.id));
        paintSelect();
        return;
      }
      if (!t.playable) { toast(T('mu.soon')); return; }
      if (t.id === cur && loadedId) { toggle(); return; }
      cur = t.id; setBase(filtered()); play(t.id);
    });
    $('#mTracks').addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.classList.contains('mt')) e.target.click(); });
    /* PC 마우스 휠(세로)로도 태그 줄이 옆으로 넘어가게 */
    $('#mTabs').addEventListener('wheel', e => {
      const el = e.currentTarget;
      if (el.scrollWidth <= el.clientWidth || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }, { passive: false });
    $('#mTabs').addEventListener('click', e => {
      if (e.target.closest('[data-mnew]')) { openSheet(selecting ? [...picked] : []); return; }
      const b = e.target.closest('[data-mg]'); if (!b) return;
      filter = b.dataset.mg; renderTabs(); renderList(); $('#mTracks').scrollTop = 0;
    });
    $('#mListHead').addEventListener('click', e => {
      const b = e.target.closest('[data-mlist]'); if (!b) return;
      const l = listOf(filter.slice(2)); if (!l) return;
      if (b.dataset.mlist === 'rename') {
        const name = (window.prompt(T('mu.renamePrompt'), l.name) || '').trim();
        if (name) { l.name = name.slice(0, 30); saveLists(); renderTabs(); renderListHead(); }
      } else if (b.dataset.mlist === 'delete') {
        if (window.confirm(T('mu.delConfirm', { name: l.name }))) { lists = lists.filter(x => x !== l); saveLists(); filter = 'all'; renderTabs(); renderList(); }
      }
    });
    $('#mSelBtn').addEventListener('click', () => setSelecting(!selecting));
    $('#mSelCancel').addEventListener('click', () => setSelecting(false));
    $('#mSelAdd').addEventListener('click', () => { if (picked.size) openSheet([...picked]); });
    $('#mSheet').addEventListener('click', e => {
      if (e.target.closest('[data-msheet-close]')) { closeSheet(); return; }
      const b = e.target.closest('[data-msheet]');
      if (b) {
        if (!sheetIds.length) { filter = 'u:' + b.dataset.msheet; closeSheet(); renderTabs(); renderList(); return; }
        addTo(b.dataset.msheet, sheetIds); closeSheet();
        if (selecting) setSelecting(false); else { renderTabs(); renderList(); }
      }
    });
    $('#mSheetForm').addEventListener('submit', e => {
      e.preventDefault();
      const l = createList($('#mSheetName').value.trim().slice(0, 30), sheetIds);
      closeSheet();
      selecting = false; picked.clear();
      filter = 'u:' + l.id; renderTabs(); renderList();
    });
    let qT;
    $('#mSearch').addEventListener('input', e => { clearTimeout(qT); qT = setTimeout(() => { q = e.target.value.trim().toLowerCase(); renderList(); }, 120); });
    $('#mChar').addEventListener('click', e => { const id = e.currentTarget.dataset.char; if (!id) return; close(); setTimeout(() => Modal.open(id), 250); });

    $$('[data-m-seek]').forEach(r => {
      r.addEventListener('input', () => { seeking = true; r.style.setProperty('--p', r.value / 10 + '%'); const d = audio.duration || byTid[cur].dur; $$('[data-m-cur]').forEach(e => { e.textContent = fmt(r.value / 1000 * d); }); });
      r.addEventListener('change', () => {
        seeking = false;
        if (!loadedId) load(cur);
        const d = audio.duration || byTid[cur].dur;
        if (d) audio.currentTime = r.value / 1000 * d;
      });
    });
    $$('[data-m-vol]').forEach(r => r.addEventListener('input', () => {
      vol = r.value / 100; muted = vol === 0 ? muted : false;
      audio.volume = vol; audio.muted = muted;
      store.set('m.vol', vol); store.set('m.muted', muted);
      paintState();
    }));

    audio.addEventListener('play', paintState);
    audio.addEventListener('pause', paintState);
    audio.addEventListener('loadedmetadata', paintTime);
    audio.addEventListener('timeupdate', () => {
      paintTime();
      const now = performance.now();
      if ('mediaSession' in navigator && navigator.mediaSession.setPositionState && audio.duration && now - posT > 1000) {
        posT = now;
        try { navigator.mediaSession.setPositionState({ duration: audio.duration, playbackRate: audio.playbackRate, position: Math.min(audio.currentTime, audio.duration) }); } catch (e) {}
      }
      /* 연속 재생: 곡이 완전히 끝나 '정지' 상태가 되기 직전에 다음 곡으로 넘긴다.
         모바일은 화면이 꺼진 뒤 한 번 멈춘 오디오를 다시 켜지 못하게 막는 경우가 있어서,
         재생이 끊기지 않은 채로 곡을 바꿔야 백그라운드에서도 이어진다 */
      if (!advancing && repeat !== 'one' && !audio.paused && audio.duration && audio.duration - audio.currentTime < .3) {
        advancing = true;
        step(1, true);
      }
    });
    audio.addEventListener('ended', () => { if (repeat === 'one') { audio.currentTime = 0; play(); } else if (!advancing) { advancing = true; step(1, true); } });
    audio.addEventListener('error', () => { if (loadedId) toast(T('mu.err')); });

    /* 아이폰 Safari 는 스크립트로 볼륨을 못 바꾼다 → 볼륨 바 대신 기기 버튼 사용 */
    audio.volume = .5;
    if (Math.abs(audio.volume - .5) > .01) body.classList.add('no-vol');
    audio.volume = vol; audio.muted = muted;

    setBase(tracks);
    paint(); paintState(); paintTime();
    /* 화면에 미리 그려 둔 재생 버튼의 곡 이름 */
    $$('[data-mtitle]').forEach(el => { const t = byTid[el.dataset.mtitle]; if (t) el.textContent = titleOf(t); });

    return {
      open, close, toggle,
      pause: () => audio.pause(),
      playId(id) { if (!base.includes(id)) setBase(tracks); play(id); },
      get isPlaying() { return !audio.paused; },
      get isOpen() { return !root.hidden && root.classList.contains('is-open'); },
      get sheetOpen() { return !$('#mSheet').hidden; },
      closeSheet,
      has: id => !!(byTid[id] && byTid[id].playable),
      get cur() { return cur; },
      titleOf: id => byTid[id] ? titleOf(byTid[id]) : ''
    };
  })();

  /* 터치 기기에서 그림 · 카드 · 버튼을 꾹 누르면 뜨는 메뉴(이미지 저장 등) 막기 */
  if (matchMedia('(pointer: coarse)').matches) {
    document.addEventListener('contextmenu', e => {
      if (e.target.closest('img, button, a, .ccard, .mt, .r-node, .intro')) e.preventDefault();
    });
  }

  /* ════════════════════ 전역 입력 ════════════════════ */
  document.addEventListener('click', e => {
    const g = e.target.closest('[data-go]');
    if (g) {
      e.preventDefault();
      if (Modal.isOpen) Modal.close();
      go(g.dataset.go, { anchor: g.dataset.anchor });
    }
  });

  addEventListener('keydown', e => {
    if (Intro.isOpen) return;
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); Palette.isOpen ? Palette.close() : Palette.open(); return; }
    if (e.key === '/' && !typing && !Palette.isOpen) { e.preventDefault(); Palette.open(); return; }
    if (Music.isOpen && !typing && e.code === 'Space') { e.preventDefault(); Music.toggle(); return; }
    if (e.key === 'Escape') {
      if (Palette.isOpen) Palette.close();
      else if (Music.isOpen) { if (Music.sheetOpen) Music.closeSheet(); else Music.close(); }
      else if (Modal.isOpen) Modal.close();
      else $('#hud').classList.remove('is-menu');
      return;
    }
    if (Modal.isOpen && !typing) {
      if (e.key === 'ArrowLeft') Modal.step(-1);
      if (e.key === 'ArrowRight') Modal.step(1);
    }
  });

  $('#btnSearch').addEventListener('click', () => Palette.open());
  $('#btnMenu').addEventListener('click', () => $('#hud').classList.toggle('is-menu'));
  /* 인트로로 돌아가기 (상단 버튼 · 푸터) */
  const replayIntro = () => {
    if (Palette.isOpen) Palette.close();
    if (Modal.isOpen) Modal.close();
    if (Music.isOpen) Music.close();
    $('#hud').classList.remove('is-menu');
    window.scrollTo(0, 0);
    Intro.start(true);
  };
  $('#replayIntro').addEventListener('click', replayIntro);
  $('#btnIntro').addEventListener('click', replayIntro);

  /* 언어 고르기: 선택을 저장하고 같은 화면으로 다시 읽는다 */
  (() => {
    const box = $('#lang'), btn = $('#langBtn'), menu = $('#langMenu');
    const CODES = { ko: 'KO', en: 'EN', ja: 'JA', zh: '繁中' };
    $('#langCur').textContent = CODES[LANG];
    $$('[data-lang]', menu).forEach(b => b.setAttribute('aria-checked', String(b.dataset.lang === LANG)));
    const set = open => { box.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open)); };
    btn.addEventListener('click', e => { e.stopPropagation(); set(!box.classList.contains('is-open')); });
    document.addEventListener('click', e => { if (!box.contains(e.target)) set(false); });
    addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
    menu.addEventListener('click', e => {
      const b = e.target.closest('[data-lang]');
      if (!b) return;
      if (b.dataset.lang === LANG) { set(false); return; }
      try { localStorage.setItem('ravenford.lang', b.dataset.lang); } catch (err) {}
      /* 주소에 ?lang= 이 있으면 지워서 다시 읽고, 없으면 그냥 새로고침 (해시만 같은 주소로 바꾸면 다시 읽지 않음) */
      const u = new URL(location.href);
      if (u.searchParams.has('lang')) { u.searchParams.delete('lang'); location.replace(u.href); }
      else location.reload();
    });
  })();

  /* ════════════════════ 시작 ════════════════════ */
  renderWorld();
  renderSchool();
  let start = location.hash.slice(1);
  if (!VIEWS.includes(start)) start = 'world';
  show(start, false);
  history.replaceState(null, '', '#' + start);
  Intro.start(false);
})();
