/* ════════════════════════════════════════════════════════════
   RAVENFORD — data.js
   세계관 · 기숙사 · 인물 · 관계 · 인트로 · 기숙사 배정 문답 · OST
   한국어 원문. 다른 언어는 js/lang/*.js 가 덮어쓴다
   ════════════════════════════════════════════════════════════ */
window.RAVENFORD = {

  /* ════════ 기숙사 ════════ */
  HOUSES: {
    brevalin: {
      id: 'brevalin', name: '브레벌린', en: 'Brevalin', color: '#d4383b', rgb: '212,56,59',
      animal: '흑표범', colorName: '빨강', motto: '희생과 정의', mottoEn: 'SACRIFICE & JUSTICE',
      stance: '마법사는 블립을 포함한 세상을 그림자 속에서 지키는 영웅이어야 한다고 믿는다. 마법은 선을 위한 도구로 쓰여야 한다고 보기에 4계명에 반대한다.',
      against: 4, againstKind: 'oppose',
      clause: '대체로 찬성하지만, 그 범위를 두고 의견이 갈린다.'
    },
    clamis: {
      id: 'clamis', name: '클라미스', en: 'Clamis', color: '#e8b830', rgb: '232,184,48',
      animal: '백조', colorName: '노랑', motto: '조화와 평화', mottoEn: 'HARMONY & PEACE',
      stance: '온화한 성품으로, 블립과 조화롭게 공존하며 마법까지 나누기를 바란다. 모든 블립이 마법을 배워 함께 더 나은 세상을 만들 기회를 가져야 한다고 믿기에 5계명에 반대한다.',
      against: 5, againstKind: 'oppose',
      clause: '너무 위험하다고 본다.'
    },
    curringlindt: {
      id: 'curringlindt', name: '커링린트', en: 'Curringlindt', color: '#3f7fe0', rgb: '63,127,224',
      animal: '송골매', colorName: '파랑', motto: '명예와 탁월함', mottoEn: 'HONOR & EXCELLENCE',
      stance: '블립을 차별적으로 바라보며, 마법사가 우월하므로 지배해야 한다고 믿는다. 타고난 힘의 차이를 인정하는 현실주의자들이라 3계명과 자주 충돌한다. 계산적이고 냉철하다.',
      against: 3, againstKind: 'clash',
      clause: '너무 약하다고 본다.'
    }
  },

  /* 인물 묶음 (카드 탭 · 관계도 · 음악 분류) */
  GROUPS: {
    leader:       { name: '학교 지도부', en: 'LEADERSHIP', rgb: '236,226,204' },
    prof:         { name: '교수진', en: 'FACULTY', rgb: '216,178,106' },
    brevalin:     { name: '브레벌린', en: 'BREVALIN', rgb: '212,56,59' },
    clamis:       { name: '클라미스', en: 'CLAMIS', rgb: '232,184,48' },
    curringlindt: { name: '커링린트', en: 'CURRINGLINDT', rgb: '63,127,224' },
    hunter:       { name: '마녀 사냥꾼', en: 'WITCH HUNTERS', rgb: '128,160,116' }
  },

  /* ════════ 인물 ════════
     house: 학생은 소속 기숙사, 교직원은 출신 기숙사 */
  CHARACTERS: [
    /* ── 학교 지도부 ── */
    {
      id: 'kaiden', name: '카이든 볼트', en: 'Kaiden Bolt', group: 'leader', house: 'brevalin',
      role: '교장 · 전직 수호자', age: '73', height: '188cm',
      look: '희끗해진 짙은 붉은 머리를 짧게 깎음, 파란 눈, 각진 턱과 넓은 어깨, 노인이지만 곧은 자세, 흰 교장 로브, 가슴에 빛바랜 수호자 휘장',
      persona: ['무뚝뚝함', '엄격함', '과보호', '헨리의 빈자리를 늘 의식함', '학생의 생존을 최우선으로 둠'],
      speech: '짧고 묵직한 노장의 반말, "~다", "~나"로 끊어 말함',
      tics: ['흠.', '쓸데없는 소리.'],
      quote: '흠. 겁이 나나? 좋다. 겁을 아는 놈이 오래 사는 법이다.'
    },
    {
      id: 'isabella', name: '이사벨라 블랙우드', en: 'Isabella Blackwood', group: 'leader', house: 'curringlindt',
      role: '교감', age: '52', height: '168cm',
      look: '밝은 파란색 머리를 빈틈없이 올려 묶음, 검은 눈, 가는 은테 안경, 곧고 차가운 인상, 흰 교감 로브, 장갑을 낀 손',
      persona: ['냉철함', '효율 중시', '결과로 판단함', '재능에는 관대함', '감정 표현을 낭비라 여김'],
      speech: '건조하고 사무적인 존댓말, 학생에게도 존댓말을 쓰지만 철저히 선을 그음',
      tics: ['비효율적이군요.', '결론부터 말씀드리죠.'],
      quote: '변명은 비효율적입니다. 결과로 증명하세요. ...그 정도는 기대해도 되겠죠?'
    },

    /* ── 교수진 ── */
    {
      id: 'silas', name: '사일라스 토른', en: 'Silas Thorn', group: 'prof', house: 'brevalin',
      role: '징계 및 경비 담당 교수', age: '40', height: '182cm',
      look: '짧게 정돈한 갈색 머리, 붉은 눈, 무표정한 얼굴, 검은 교수 로브 위에 순찰용 망토, 허리에 랜턴',
      persona: ['차가움', '침착함', '말수가 적음', '규칙에 예외를 두지 않음', '속으로는 학생을 지키려 함'],
      speech: '낮고 건조한 반말, 감정을 싣지 않고 사실만 짧게 말함',
      tics: ['...그래서?', '변명은 안 듣는다.'],
      quote: '통금 7분 초과. 벌점 3점. ...다음엔 어기지 마. 밤의 숲은 실수를 두 번 봐주지 않는다.'
    },
    {
      id: 'finn', name: '핀 리들', en: 'Finn Riddle', group: 'prof', house: 'clamis', subject: 'practical',
      role: '실용마법 교수', age: '40', height: '155cm',
      look: '주황색 짧은 트윈테일, 녹색 눈, 동안, 검은 교수 로브 소매를 걷어붙임, 로브 주머니마다 블립 물건이 삐져나옴',
      persona: ['장난기', '호기심', '덜렁댐', '블립 문화 덕후', '새로운 걸 보면 참지 못함'],
      speech: '통통 튀는 들뜬 반말, "~라구!", "~거든!"처럼 말끝을 튕김',
      tics: ['짜잔~!', '에헤헤.'],
      quote: '짜잔~! 오늘의 교재는 블립들의 \'보조배터리\'라구! 에헤헤, 걱정 마. 안 터져. ...아마?'
    },
    {
      id: 'hannah', name: '한나 마르텔', en: 'Hannah Martel', group: 'prof', house: 'brevalin', subject: 'combat',
      role: '전투마법 교수 · 현역 수호자', age: '42', height: '172cm',
      look: '빨간 포니테일, 노란 눈, 탄탄한 체격, 검은 교수 로브 안에 수호자 전투복, 팔에 수호자 완장',
      persona: ['정의로움', '열혈', '원칙주의', '학생 시절보다 유연해짐', '칭찬도 꾸중도 크게 함'],
      speech: '시원하고 힘 있는 교관식 반말',
      tics: ['좋아!', '한 번 더!'],
      quote: '좋아, 방금 거 나쁘지 않았어! 그러니까 한 번 더! 쓰러질 때까지가 아니라, 해낼 때까지!'
    },
    {
      id: 'jasmine', name: '자스민 케네스', en: 'Jasmine Kenneth', group: 'prof', house: 'brevalin', subject: 'alchemy',
      role: '연금술 교수', age: '41', height: '166cm',
      look: '플래티넘 블론드 땋은 머리를 한쪽 어깨로 넘김, 아쿠아색 눈, 반쯤 감긴 듯한 무심한 눈매, 검은 교수 로브, 손목에 약재 얼룩',
      persona: ['쿨데레', '과묵함', '냉소적', '학생을 몰래 챙김', '마녀 사냥꾼 이야기에 예민함'],
      speech: '짧고 무뚝뚝한 반말, 말 앞뒤에 침묵("...")이 붙음',
      tics: ['...흥.', '...별로.'],
      quote: '...그 정도로 칭찬받을 생각은 하지 마. ...뭐, 나쁘진 않았어.'
    },
    {
      id: 'seraphina', name: '세라피나 리우', en: 'Seraphina Liu', group: 'prof', house: 'clamis', subject: 'sociology',
      role: '사회학 교수', age: '42', height: '170cm',
      look: '검은 사이드 포니테일, 파란 눈, 온화한 미소, 검은 교수 로브에 노란 숄, 늘 찻잔을 들고 다님',
      persona: ['우아함', '너그러움', '중재자', '질문으로 이끄는 교육자', '이상을 위해서라면 단호함'],
      speech: '부드럽고 품위 있는 존댓말, "~랍니다", "~지요"',
      tics: ['후후.', '그렇다면, 질문을 하나 해 볼까요?'],
      quote: '후후, 답은 이미 당신 안에 있어요. 저는 그저 그 문을 두드릴 뿐이랍니다.'
    },
    {
      id: 'rosel', name: '로젤 그린', en: 'Rosel Green', group: 'prof', house: 'clamis', subject: 'biology',
      role: '생물학 교수', age: '40', height: '158cm',
      look: '짙은 녹색 단발(보브컷), 갈색 눈, 움츠린 어깨, 검은 교수 로브에 풀잎과 털이 묻어 있음, 어깨에 늘 작은 불도마뱀',
      persona: ['소심함', '낯가림', '자존감이 낮음', '마법 생물 앞에서는 당당함', '서툴러도 진심'],
      speech: '작은 목소리의 존댓말, 자주 더듬고 놀라면 소리를 냄',
      tics: ['히, 히잇...!', '죄, 죄송해요...'],
      quote: '히, 히잇...! 가, 갑자기 말 걸지 마세요... 아, 이 아이요? 착한 아이예요. 저보다 훨씬요...'
    },
    {
      id: 'damian', name: '데미안 블랙우드', en: 'Damian Blackwood', group: 'prof', house: 'curringlindt', subject: 'tactics',
      role: '전술학 교수', age: '42', height: '185cm',
      look: '단정히 넘긴 회색 머리, 검은 눈, 늘 엷은 미소, 검은 교수 로브를 귀족적으로 차려입음, 검은 장갑',
      persona: ['냉정한 전략가', '매력을 무기로 씀', '속을 알 수 없음', '사람을 장기말처럼 봄', '한나에게만은 진심으로 승부욕을 보임'],
      speech: '귀공자 같은 정중한 존댓말, 미소를 띤 채 날카로운 말을 함',
      tics: ['후후.', '흥미롭군요.'],
      quote: '후후, 걱정 마십시오. 저는 언제나 이기는 편에 서 있으니까요. ...문제는 그 편이 어디냐는 거죠.'
    },
    {
      id: 'aiden', name: '에이든 와일드', en: 'Aiden Wilde', group: 'prof', house: 'curringlindt',
      role: '은퇴한 전 교수 · 지팡이 가게 주인', age: '62', height: '180cm',
      look: '희끗한 긴 검은 머리를 뒤로 묶음, 짙은 붉은 눈, 깊은 미간 주름, 작업용 앞치마, 돋보기 안경',
      persona: ['퉁명스러움', '장인 기질', '투덜대면서도 챙겨 줌', '고집이 셈'],
      speech: '투박하고 퉁명스러운 반말',
      tics: ['쯧.', '또 너냐.'],
      quote: '쯧, 또 너냐. 지팡이를 그렇게 굴리면 지팡이가 먼저 널 버린다.'
    },

    /* ── 브레벌린 ── */
    {
      id: 'leah', name: '레아 하트웰', en: 'Leah Hartwell', group: 'brevalin', house: 'brevalin',
      role: '3학년 · 사감장', year: 3, age: '22', height: '170cm',
      look: '짙은 갈색 웨이브 긴 머리, 호박색 눈, 시원한 웃음, 빨간 로브, 가슴에 사감장 배지',
      persona: ['듬직한 맏언니', '잘 웃음', '후배를 잘 챙김', '책임을 혼자 짊어지려 함'],
      speech: '시원시원하고 다정한 반말',
      tics: ['자자~', '언니한테 맡겨!'],
      quote: '자자, 울상 짓지 말고! 언니가 있잖아? ...응, 걱정은 나한테 다 넘겨.'
    },
    {
      id: 'caleb', name: '칼렙 스톰', en: 'Caleb Storm', group: 'brevalin', house: 'brevalin',
      role: '2학년', year: 2, age: '21', height: '178cm',
      look: '짧은 금발, 초록 눈, 자신만만한 표정, 빨간 로브를 망토처럼 휘날림',
      persona: ['허세', '자신감 과잉', '사실은 겁이 많음', '결정적 순간에는 도망치지 않음'],
      speech: '과장되고 잘난 척하는 반말, 놀라면 목소리가 뒤집힘',
      tics: ['하하!', '이 칼렙 님이!'],
      quote: '하하! 이 칼렙 스톰 님이 왔으니 안심하라고! ...자, 잠깐, 방금 그거 무슨 소리야?!'
    },
    {
      id: 'iris', name: '아이리스 베인', en: 'Iris Vane', group: 'brevalin', house: 'brevalin',
      role: '2학년', year: 2, age: '21', height: '165cm',
      look: '검은 단발, 회색 눈, 무표정, 빨간 로브를 단정하게 여밈',
      persona: ['과묵함', '원칙주의', '약속은 반드시 지킴', '정의를 핑계로 규칙을 어기는 사람을 싫어함'],
      speech: '짧고 딱딱한 반말',
      tics: ['규칙이야.', '...예외는 없어.'],
      quote: '규칙이야. 예외는 없어. ...설령 네가 옳더라도.'
    },
    {
      id: 'mia', name: '미아 로우', en: 'Mia Lowe', group: 'brevalin', house: 'brevalin',
      role: '1학년', year: 1, age: '20', height: '160cm',
      look: '밝은 갈색 하이 포니테일, 갈색 눈, 늘 반짝이는 표정, 빨간 로브 소매를 걷어붙임',
      persona: ['활발함', '모험가 기질', '수다쟁이', '출입 금지 구역만 보면 못 참음'],
      speech: '숨 넘어가게 빠르고 들뜬 반말',
      tics: ['있잖아, 있잖아!', '딱 5분만!'],
      quote: '있잖아, 있잖아! 장막의 숲에 밤마다 빛이 보인대! 가 보자, 응? 딱 5분! 진짜 딱 5분만!'
    },
    {
      id: 'theo', name: '테오 바렛', en: 'Theo Barrett', group: 'brevalin', house: 'brevalin',
      role: '1학년', year: 1, age: '20', height: '190cm',
      look: '짙은 갈색 곱슬머리, 파란 눈, 큰 키와 넓은 어깨, 순한 인상, 빨간 로브가 작아 보임',
      persona: ['대형견 같은 순함', '다정함', '힘이 셈', '집안의 기대를 웃음 뒤에 숨김'],
      speech: '느긋하고 순한 반말',
      tics: ['헤헤.', '괜찮아, 괜찮아.'],
      quote: '헤헤, 그거 내가 들게! 괜찮아, 괜찮아. 나 힘 하나는 진짜 좋거든!'
    },

    /* ── 클라미스 ── */
    {
      id: 'elodie', name: '엘로디 마쉬', en: 'Elodie Marsh', group: 'clamis', house: 'clamis',
      role: '3학년 · 사감장', year: 3, age: '22', height: '167cm',
      look: '연한 금발 긴 웨이브 머리, 하늘색 눈, 포근한 미소, 노란 로브, 머리에 하얀 리본',
      persona: ['다정함', '온화함', '평화주의', '평화를 위해서라면 교수진과도 맞섬'],
      speech: '부드럽고 따뜻한 반말',
      tics: ['괜찮아~', '다 같이, 알지?'],
      quote: '괜찮아~ 다 같이 웃을 수 있는 방법은 꼭 있어. 난 그렇게 믿어.'
    },
    {
      id: 'nora', name: '노라 애쉬', en: 'Nora Ash', group: 'clamis', house: 'clamis',
      role: '2학년', year: 2, age: '21', height: '157cm',
      look: '민트색 땋은 머리, 회색 눈, 수줍은 표정, 노란 로브 위에 하얀 앞치마',
      persona: ['수줍음', '남 앞에 나서길 힘들어함', '다친 사람 앞에서는 단호해짐'],
      speech: '조용하고 조심스러운 존댓말, 치료할 때만 단호해짐',
      tics: ['저, 저기...', '움직이지 마세요.'],
      quote: '저, 저기... 아니, 움직이지 마세요. 지금은 제 말이 우선이에요.'
    },
    {
      id: 'julian', name: '줄리안 레이', en: 'Julian Ray', group: 'clamis', house: 'clamis',
      role: '2학년', year: 2, age: '21', height: '176cm',
      look: '백금색 짧은 머리, 보라색 눈, 능글맞은 미소, 노란 로브를 대충 걸침',
      persona: ['장난꾸러기', '능글맞음', '눈치가 빠름', '친구 일에는 진지함'],
      speech: '능글맞고 장난스러운 반말',
      tics: ['헤에~', '예술이지?'],
      quote: '헤에~ 걸리면 사고, 안 걸리면 예술. 오늘은 예술 쪽으로 가 볼까?'
    },
    {
      id: 'lillian', name: '릴리안 문', en: 'Lillian Moon', group: 'clamis', house: 'clamis',
      role: '1학년', year: 1, age: '20', height: '162cm',
      look: '크림색 긴 생머리, 초록 눈, 몽롱한 눈빛, 노란 로브, 귀에 깃펜을 꽂고 다님',
      persona: ['상냥함', '몽상가', '관찰을 좋아함', '남의 이야기에 진심으로 귀 기울임'],
      speech: '나긋나긋하고 몽환적인 반말, 말끝을 길게 늘임',
      tics: ['음~', '이야기 냄새가 나.'],
      quote: '음~ 너한테선 이야기 냄새가 나. 결말이 궁금해지는, 그런 냄새.'
    },
    {
      id: 'ezra', name: '에즈라 퀸', en: 'Ezra Quinn', group: 'clamis', house: 'clamis',
      role: '1학년', year: 1, age: '20', height: '177cm',
      look: '밤색 곱슬머리, 녹갈색 눈, 느긋한 웃음, 노란 로브 주머니에 늘 간식',
      persona: ['낙천적', '느긋함', '갈등을 싫어함', '먹을 것으로 분위기를 풂'],
      speech: '여유롭고 다정한 반말',
      tics: ['자자, 일단 먹어.'],
      quote: '자자, 일단 먹어. 배고프면 세상이 다 미워 보이는 법이거든.'
    },

    /* ── 커링린트 ── */
    {
      id: 'vivian', name: '비비안 윈터', en: 'Vivian Winter', group: 'curringlindt', house: 'curringlindt',
      role: '3학년 · 사감장', year: 3, age: '22', height: '169cm',
      look: '은백색 긴 생머리, 연보라색 눈, 차갑고 단정한 미모, 파란 로브에 눈꽃 브로치',
      persona: ['완벽주의', '아가씨(오죠사마)', '도도함', '블립 출신을 낮잡아 봄', '실력으로 증명하는 사람은 인정함'],
      speech: '우아하고 도도한 존댓말, 정중하게 상대를 깎아내림',
      tics: ['어머.', '품위를 지키세요.'],
      quote: '어머, 블립 출신이시라고요? 흥미롭네요. 부디 그 흥미가 실망으로 바뀌지 않기를 바랄게요.'
    },
    {
      id: 'lucian', name: '루시안 블랙우드', en: 'Lucian Blackwood', group: 'curringlindt', house: 'curringlindt',
      role: '2학년', year: 2, age: '21', height: '179cm',
      look: '헝클어진 회색 머리, 검은 눈, 졸린 눈매, 파란 로브를 풀어헤쳐 입음',
      persona: ['반항아', '귀찮아함', '냉소적', '사실은 머리가 아주 좋음', '가문 이야기를 싫어함'],
      speech: '귀찮은 듯 늘어지는 냉소적인 반말',
      tics: ['하아...', '귀찮게.'],
      quote: '하아... 블랙우드니까 잘해야 한다고? 그럼 난 그만할래, 블랙우드.'
    },
    {
      id: 'margo', name: '마고 렌', en: 'Margo Wren', group: 'curringlindt', house: 'curringlindt',
      role: '2학년', year: 2, age: '21', height: '164cm',
      look: '짙은 남색 반묶음 머리, 청록색 눈, 날카로운 눈매, 파란 로브를 단단히 여밈',
      persona: ['강경파', '직설적', '블립을 믿지 않음', '자기 사람에게는 끝까지 의리를 지킴'],
      speech: '날카롭고 직설적인 반말',
      tics: ['하?', '꿈 깨.'],
      quote: '하? 평화? 그건 이긴 쪽이 쓰는 단어야. 우린 아직 안 이겼거든?'
    },
    {
      id: 'celine', name: '셀린 듀크', en: 'Celine Duke', group: 'curringlindt', house: 'curringlindt',
      role: '1학년', year: 1, age: '20', height: '166cm',
      look: '짙은 적갈색 긴 머리, 금색 눈, 도도한 표정, 파란 로브를 완벽하게 차려입음',
      persona: ['츤데레', '자존심이 셈', '지는 걸 싫어함', '정정당당하지 않은 승리는 거부함'],
      speech: '도도하고 도발적인 반말, 당황하면 말이 빨라짐',
      tics: ['흥!', '딱히 너 때문은 아니거든?'],
      quote: '흥! 딱히 너한테 관심 있는 거 아니거든? 널 이기는 데 관심 있는 거지!'
    },
    {
      id: 'leo', name: '레오 카스텔', en: 'Leo Castel', group: 'curringlindt', house: 'curringlindt',
      role: '1학년', year: 1, age: '20', height: '172cm',
      look: '검푸른 머리, 둥근 안경, 회색 눈, 무표정, 파란 로브에 약품 얼룩',
      persona: ['무표정', '연금술 천재', '사회성 부족', '사실만 말함', '감정 표현이 서툶'],
      speech: '감정 없는 단조로운 말투',
      tics: ['...정정.', '데이터상으로는.'],
      quote: '...정정. 끓는점 3도 초과. 실패야. ...다음엔, 같이 해도 돼.'
    },

    /* ── 마녀 사냥꾼 ── */
    {
      id: 'jane', name: '제인 칼빈스', en: 'Jane Calvins', group: 'hunter', house: null,
      role: '마녀 사냥꾼 수장 · 네 번째 선구자', age: '88 (외모 30대)', height: '171cm',
      look: '갈색 단발 포니테일, 짙은 녹색 눈, 그을린 피부, 영약 덕분에 30대 외모, 짙은 녹색 롱코트, 목에 부러진 지팡이 모양의 은 브로치',
      persona: ['차분함', '우아함', '흔들림 없는 증오', '아이를 타이르듯 상대를 대함', '헨리에게만은 미련이 남아 있음'],
      speech: '나긋하고 서늘한 반말',
      tics: ['얘야.', '가엾기도 하지.'],
      quote: '얘야, 마법이 너를 특별하게 만들었다고 믿니? 가엾기도 하지. 그건 괴물이 되는 첫걸음일 뿐이란다.'
    },
    {
      id: 'morgan', name: '모건 크로우', en: 'Morgan Crow', group: 'hunter', house: null,
      role: '마녀 사냥꾼 부관', age: '54', height: '186cm',
      look: '짧은 검은 머리, 회색 눈, 군인다운 자세, 수호자 시절의 제복을 검게 물들여 입음, 휘장을 뜯어낸 자국',
      persona: ['과묵함', '규율에 엄격함', '광신에 가까운 충성', '적이라도 실력자에게는 경의를 표함'],
      speech: '딱딱하고 짧은 군인식 말투',
      tics: ['...그렇군.', '명령이다.'],
      quote: '...그렇군. 실력은 인정한다. 그래서 더 아깝다. 잘못된 편에 서 있다는 게.'
    },
    {
      id: 'vera', name: '베라 녹스', en: 'Vera Knox', group: 'hunter', house: null,
      role: '마녀 사냥꾼 기술 책임자', age: '34', height: '168cm',
      look: '짙은 와인색 긴 머리를 하나로 느슨하게 묶음, 은테 안경, 연회색 눈, 하얀 실험 가운 위에 사냥꾼 코트를 어깨에만 걸침, 얇은 검은 장갑',
      persona: ['나른함', '여유로움', '천재 괴짜', '마법사를 표본처럼 관찰함', '웃음 밑에 식은 분노', '블립 아이들에게만은 다정함'],
      speech: '나른하고 느긋한 반말, 말끝을 늘이며 흥미가 생기면 눈을 반짝임',
      tics: ['흐응~', '재밌네.'],
      quote: '흐응~ 그게 마법이야? 재밌네. ...한번 분해해 봐도 될까? 걱정 마, 아프진 않게 할게. 아마도.'
    },
    {
      id: 'amber', name: '엠버 헤일', en: 'Ember Hale', group: 'hunter', house: null,
      role: '마녀 사냥꾼 전투원', age: '21', height: '163cm',
      look: '은색 짧은 머리, 금색 눈, 날 선 눈매, 검은 후드 전투복과 가벼운 가죽 갑옷',
      persona: ['거칢', '직설적', '거짓말을 못 함', '제인을 어머니처럼 따름', '믿음이 흔들리면 가장 크게 무너질 인물'],
      speech: '거칠고 직설적인 반말, 화나면 소리부터 지름',
      tics: ['웃기지 마!', '온실 애들 주제에.'],
      quote: '웃기지 마! 온실에서 곱게 자란 주제에 뭘 안다고!'
    },
    {
      id: 'owen', name: '오웬 그레이브스', en: 'Owen Graves', group: 'hunter', house: null,
      role: '마녀 사냥꾼 첩보원', age: '30대 중반(추정)', height: '175cm (본모습 기준)',
      look: '기억에 남지 않는 평범한 얼굴, 회갈색 머리, 회색 눈, 평소에는 위장 신분에 맞는 옷, 본모습일 때는 회색 코트',
      persona: ['상냥함', '사교적', '속은 텅 비어 있음', '임무 자체를 즐김', '남의 인생을 연기하는 데서 쾌감을 느낌'],
      speech: '상대에 따라 바뀌는 상냥한 말투, 본래 말투는 나른하고 가벼움',
      tics: ['아하하.', '뭐, 아무래도 상관없죠.'],
      quote: '아하하, 처음 뵙겠습니다. ...어라, 처음이 아니었던가요? 뭐, 아무래도 상관없죠.'
    }
  ],

  /* 카드가 없는 인물 (관계도에만 등장) */
  GHOSTS: {
    henry: { name: '헨리 패딩스톨', en: 'Henry Paddingstall', role: '전 교장 · 고인', group: 'leader' },
    luna:  { name: '루나', en: 'Luna', role: '행방 미정', group: 'prof' }
  },

  /* ════════ 관계 ════════  dir: '<>' 양방향 · '>' a → b · star: 핵심 관계(★) */
  RELATIONS: [
    { a: 'jane', b: 'henry', dir: '<>', star: true, label: '블립 시절부터의 절친. 헨리의 죽음이 제인 귀환의 신호. 제인의 부러진 브로치는 헨리가 준 것.' },
    { a: 'kaiden', b: 'morgan', dir: '<>', star: true, label: '옛 상관과 부하. 모건이 뜯어낸 휘장은 카이든이 달아 준 것.' },
    { a: 'hannah', b: 'amber', dir: '<>', star: true, label: '엠버의 부모를 쓰러뜨린 부대에 한나가 있었다. 둘 다 모른다.' },
    { a: 'aiden', b: 'owen', dir: '<>', star: true, label: '변신으로도 지팡이는 못 바꾼다. 첩자를 알아볼 수 있는 유일한 사람.' },
    { a: 'kaiden', b: 'jane', dir: '<>', label: '창립자의 서고를 아는 마지막 두 사람(카이든 · 에이든). 제인의 표적.' },
    { a: 'aiden', b: 'jane', dir: '<>', label: '창립자의 서고를 아는 마지막 두 사람(카이든 · 에이든). 제인의 표적.' },
    { a: 'jasmine', b: 'vera', dir: '<>', label: '한쪽은 사냥꾼에게, 한쪽은 마법사에게 가족을 잃었다. 서로를 비추는 거울.' },
    { a: 'finn', b: 'vera', dir: '<>', label: '마키나 룹투스 대 억제 장비. 작품으로만 아는 라이벌 기술자.' },
    { a: 'theo', b: 'morgan', dir: '<>', label: '모건이 배신하던 날 유일하게 살려 보낸 동료가 테오의 아버지.' },
    { a: 'margo', b: 'amber', dir: '<>', label: '"평화는 이긴 쪽의 단어." 진영만 다른 거울.' },
    { a: 'amber', b: 'jane', dir: '<>', label: '전쟁고아와 양모. 엠버에게 제인은 세상의 전부.' },
    { a: 'vera', b: 'jane', dir: '<>', label: '갈 곳 없던 자신을 거둔 은인. 사상보다 은혜에 충성.' },
    { a: 'hannah', b: 'damian', dir: '<>', star: true, label: '학창 시절부터의 라이벌. 앙숙 이상의 무언가가 남아 있다.' },
    { a: 'kaiden', b: 'isabella', dir: '<>', label: '지킬 것인가, 단련할 것인가. 부딪히지만 서로를 가장 믿는다.' },
    { a: 'silas', b: 'aiden', dir: '<>', label: '전임자와 후임자. 순찰 랜턴을 물려받았다.' },
    { a: 'finn', b: 'rosel', dir: '<>', label: '소꿉친구. 불도마뱀 \'퐁퐁\'의 이름은 핀이 지었다.' },
    { a: 'jasmine', b: 'luna', dir: '<>', label: '소꿉친구. 약재 상자 속의 그림.' },
    { a: 'isabella', b: 'damian', dir: '<>', label: '블랙우드 3대. 지키는 자, 이용하는 자, 거부하는 자.' },
    { a: 'damian', b: 'lucian', dir: '<>', label: '블랙우드 3대. 지키는 자, 이용하는 자, 거부하는 자.' },
    { a: 'hannah', b: 'leah', dir: '>', label: '스승과 제자. 물려준 사감장 배지.' },
    { a: 'seraphina', b: 'elodie', dir: '>', label: '스승과 제자. 말리지도 돕지도 않고 질문만 던진다.' },
    { a: 'finn', b: 'julian', dir: '>', label: '애제자. 같이 사고 치고 같이 벌점 받는다.' },
    { a: 'isabella', b: 'leo', dir: '>', label: '직접 눈여겨보는 연금술 천재.' },
    { a: 'silas', b: 'mia', dir: '<>', label: '사고뭉치 미아에게서 전쟁 전의 밝았던 자신을 본다. 미아의 비밀 지도는 사일라스가 학생 시절 그린 지도의 사본.' },
    { a: 'silas', b: 'iris', dir: '<>', label: '지금의 냉정한 사일라스를 동경하는 학생. 사일라스는 자신을 닮아 가려는 그녀가 걱정스럽다.' },
    { a: 'vivian', b: 'lucian', dir: '<>', star: true, label: '라이벌 가문의 후계자. 무산된 정략 혼담. 앙숙 겸 썸.' },
    { a: 'leah', b: 'vivian', dir: '<>', label: '사감장 라이벌. 한나와 데미안의 재현.' },
    { a: 'elodie', b: 'margo', dir: '<>', label: '비상 조항 반대파와 강화파. 토론회 단골 맞수.' },
    { a: 'caleb', b: 'iris', dir: '<>', label: '어릴 적부터 알던 허세꾼과 단칼.' }
  ],

  /* ════════ 인트로 ════════
     ch: 장이 바뀔 때 먼저 보여 주는 장 제목 · kind: n 지문 / d 대사 · tint: 화면 색 */
  INTRO: [
    { ch: { no: '00', era: '오프닝', title: '숨겨진 세계' }, img: 'intro/gate', kind: 'n',
      text: '평범한 인간들 몰래, 마법사는 언제나 존재해 왔다. 두 세계는 \'게이트\'로만 이어져 있다.' },
    { ch: { no: '01', era: '20년 전', title: '마녀 사냥꾼 전쟁' }, img: 'intro/war', kind: 'n',
      text: '20년 전, 마법을 악이라 부르는 자들이 일어섰다. 마녀 사냥꾼. 그들과 마법사 사회의 전면전이 시작됐다.' },
    { img: 'intro/victory', kind: 'n',
      text: '헨리 패딩스톨 교장과 수호자들, 그리고 어린 학생들까지 함께 싸웠다. 그리고 마침내, 승리했다.' },
    { img: 'intro/jane', kind: 'd', who: '제인의 최후', text: '…이것으로 끝이라 생각하지 마라.' },
    { img: 'intro/jane', kind: 'n',
      text: '마녀 사냥꾼의 수장, 제인 칼빈스는 최종전에서 쓰러졌다. 그러나 그 시신은, 끝내 발견되지 않았다.' },
    { ch: { no: '02', era: '이후 15년', title: '평화기' }, img: 'intro/grownup', kind: 'n',
      text: '전쟁은 끝났고, 마법사 사회는 상처를 재건해 갔다. 전쟁을 겪은 아이들은 어른이 되었고, 일부는 교수가 되어 학교로 돌아왔다.' },
    { img: 'intro/missing', kind: 'n',
      text: '하지만 그 평온한 세월 속에서도— 원인을 알 수 없는 실종이, 조용히 이어지고 있었다.' },
    { ch: { no: '03', era: '5년 전', title: '헨리의 서거' }, img: 'intro/henry', kind: 'n',
      text: '그리고 5년 전, 위대한 교장 헨리 패딩스톨이 노환으로 눈을 감았다.' },
    { img: 'intro/henry', kind: 'd', who: '헨리의 유언', text: '모든 선구자는… 강력한 신념에 이끌린다.' },
    { img: 'intro/kaiden', kind: 'n', text: '전직 수호자 카이든 볼트가 교장직을 이었고,' },
    { img: 'intro/aiden', kind: 'n', text: '생활 지도를 맡던 에이든 와일드는 은퇴해, 레이븐빌에서 작은 지팡이 가게를 열었다.' },
    { ch: { no: '04', era: '현재', title: '돌아온 공포' }, img: 'intro/raid', kind: 'n',
      text: '그리고 지금— 마녀 사냥꾼의 습격이, 다시 시작되었다.' },
    { img: 'intro/witness', kind: 'd', who: '생존자의 증언', text: '봤어… 분명히 봤다고. 제인 칼빈스를.' },
    { img: 'bg/castle', kind: 'n', tint: 'war',
      text: '죽었어야 할 자를 보았다는 증언이 잇따른다. 레이븐포드는 다시 한번, 전시 체제에 들어갔다.' },
    { ch: { no: '05', era: '올해', title: '여섯 번째 선구자' }, img: 'intro/pioneer', kind: 'n',
      text: '수십 년간, 새로운 선구자는 나타나지 않았다. 그런데 올해, 마법사 혈통 없이, 블립 세계에서 스스로 마력을 깨운 신입생이 학교에 들어섰다.' },
    { img: 'intro/crystal', kind: 'n', text: '기숙사 배정식. 천리안 수정이, 그의 신념을 들여다본다.' }
  ],

  /* ════════ 지난 20년 ════════ */
  TIMELINE: [
    { when: '20년 전', title: '마녀 사냥꾼 전쟁', img: 'intro/war',
      text: '마녀 사냥꾼과 마법사 사회 사이에 전면전이 벌어졌다. 헨리 패딩스톨 교장과 수호자들, 그리고 당시 레이븐포드의 학생들이 함께 싸워 승리했다. 제인 칼빈스는 최종전에서 사망한 것으로 처리되었으나, 시신은 끝내 발견되지 않았다. 조직은 와해되었다.' },
    { when: '이후 15년', title: '평화기', img: 'intro/grownup',
      text: '마법사 사회는 재건에 들어갔다. 전쟁을 겪은 학생들은 졸업 후 각자의 길을 걸었고, 그중 일부는 교수가 되어 레이븐포드로 돌아왔다. 다만 이 기간에도 원인을 알 수 없는 실종 사건이 간간이 이어졌다.' },
    { when: '약 5년 전', title: '헨리의 서거', img: 'intro/henry',
      text: '헨리 패딩스톨이 노환으로 세상을 떠났다. 전직 수호자 카이든 볼트가 교장직을 이어받았고, 생활 지도 담당이던 에이든 와일드는 은퇴해 레이븐빌에서 지팡이 가게를 열었다.' },
    { when: '현재', title: '돌아온 공포', img: 'intro/raid', now: true,
      text: '마녀 사냥꾼의 습격이 다시 시작되었다. 습격 현장에서 "제인 칼빈스를 봤다"는 증언이 잇따르며, 마법사 사회는 공포에 휩싸여 있다. 레이븐포드는 다시 한번 전시 체제에 들어갔다.' }
  ],

  /* ════════ 마법 체계 ════════ */
  COMMANDMENTS: [
    '마법으로 생명을 해치거나 범죄를 저질러서는 안 된다.',
    '마법 사용의 모든 책임은 사용자에게 있다.',
    '마법을 개인의 권력, 명예, 이익을 위해 사용해서는 안 된다.',
    '마법사는 블립 세계에서 정체를 숨겨야 하며 존재를 공개해서는 안 된다. 블립의 일에 개입해 중대한 역사적·사회적 변화를 일으켜서는 안 된다.',
    '마법 지식은 마법사 사이에서만 전수되어야 한다. 블립에게 공개하거나 무단으로 유출하는 것은 엄격히 금지된다.'
  ],

  SPELLS: {
    basic: [
      { n: '비마', la: 'VIMA', k: '공격', opt: ['썬더', '파이어', '아이스', '워터', '윈드'], d: '특정 속성의 마력 광선을 발사하는 공격 주문. (예: \'비마 썬더\'는 번개 광선을 발사한다.)' },
      { n: '엔프로텍토', la: 'ENPROTECTO', k: '방어', d: '몸 주위에 보호막을 만드는 방어 주문.' },
      { n: '포그마 엔도', la: 'FOGMA ENDO', k: '회피', d: '지정한 위치로 몸을 순간이동시키는 회피 주문. (단거리만 가능)' }
    ],
    war: [
      { n: '마키나 룹투스', la: 'MACHINA RUPTUS', k: '교란', d: '주변 블립 기술 장치에 마력 과부하를 일으켜 오작동시키는 주문. 마녀 사냥꾼의 마력 억제 장비에 대응하기 위해 개발됐다.' },
      { n: '리가투스', la: 'LIGATUS', k: '구속', d: '마력의 사슬로 대상을 묶어 제압하는 비살상 구속 주문. 비상 조항 아래 학생이 쓸 수 있는 대표 주문.' },
      { n: '레벨로', la: 'REVELO', k: '탐지', d: '반경 안의 숨겨진 존재, 은신, 변신, 환영을 드러내는 탐지 주문.' },
      { n: '무루스 아르카눔', la: 'MURUS ARCANUM', k: '결계', d: '여러 명이 함께 시전하는 광역 결계. 시전자가 많을수록 단단해진다. 전술학의 핵심 주문.', play: 'b-murus' }
    ],
    forbidden: [
      { n: '아니마 비타', la: 'ANIMA VITA', k: '금지', d: '생명을 파괴하는(죽이는) 주문.' },
      { n: '도미나투스', la: 'DOMINATUS', k: '금지', d: '대상을 꼭두각시처럼 조종하는 주문.' },
      { n: '하우리 비타', la: 'HAURI VITA', k: '금지', d: '대상의 생명력을 빨아들이는 주문. 전쟁 이후 금지 목록에 추가되었다.' }
    ]
  },

  /* ════════ 과목 ════════  prof: 담당 교수 (인물 데이터에서 이름을 가져옴) */
  SUBJECTS: [
    { id: 'alchemy', name: '연금술', prof: 'jasmine' },
    { id: 'practical', name: '실용마법', prof: 'finn' },
    { id: 'biology', name: '생물학', prof: 'rosel' },
    { id: 'sociology', name: '사회학', prof: 'seraphina' },
    { id: 'combat', name: '전투마법', prof: 'hannah' },
    { id: 'tactics', name: '전술학', prof: 'damian', isNew: true,
      d: '전쟁 이후 신설된 과목. 집단 전투와 진형, 정보전, 함정 설계, 마력 억제 장비 대응법을 가르친다. 개인의 실력을 다루는 전투마법과 달리, 판을 읽고 팀으로 싸우는 법을 가르친다.' }
  ],

  /* ════════ 장소 ════════  kind: facility 시설 / region 지역 */
  PLACES: [
    { id: 'hall', kind: 'facility', name: '창립자의 홀', en: 'HALL OF THE FOUNDERS', img: 'place/hall', play: 'p-hall',
      tags: ['식사', '배정식 · 입학식', '학교 행사'],
      d: '레이븐포드 성의 중심에 있는 대강당. 전교생이 이곳에 모여 식사를 하고, 학교의 크고 작은 행사도 모두 이곳에서 열린다. 해마다 3월 3일, 신입생들이 천리안 수정 앞에서 기숙사를 배정받는 배정식과 입학식이 치러지는 자리이기도 하다.' },
    { id: 'archive', kind: 'facility', name: '레이븐포드 기록관', en: 'RAVENFORD ARCHIVE', img: 'place/archive', play: 'p-archive',
      tags: ['도서관', '자습', '고대 서적'],
      d: '레이븐포드의 도서관. 수업에 쓰는 책부터 마법사 세계의 오래된 기록까지 보관되어 있어, 빈 시간에 자습하는 학생들이 가장 많이 찾는 곳이다. 주문은 수업뿐 아니라 고대 서적으로도 익힐 수 있어서, 새로운 주문을 찾는 학생들의 발길이 끊이지 않는다.' },
    { id: 'stacks', kind: 'facility', name: '창립자의 서고', en: 'THE FOUNDERS\' STACKS', img: 'place/stacks', play: 'p-stacks', secret: true,
      tags: ['비밀', '금지된 지식'], people: ['kaiden', 'aiden'],
      d: '금지된 마법 지식이 보관된 숨겨진 방. 그 존재를 아는 사람은 극소수이며, 위치까지 아는 사람은 교장 카이든 볼트와 은퇴한 에이든 와일드, 단 두 명뿐이다. 마녀 사냥꾼의 수장 제인 칼빈스가 두 사람을 노리는 이유이기도 하다.' },
    { id: 'commons', kind: 'facility', name: '기숙사 휴게실과 숙소', en: 'COMMON ROOMS', imgs: ['place/brevalin', 'place/clamis', 'place/curringlindt'],
      tags: ['기숙사 생활', '통금 밤 10시'], people: ['leah', 'elodie', 'vivian'],
      d: '브레벌린, 클라미스, 커링린트. 세 기숙사가 각자의 휴게실과 숙소를 쓴다. 학생들은 3년 동안 이곳에서 생활하며, 밤 10시 통금 전에는 모두 자기 기숙사로 돌아와야 한다. 기숙사마다 3학년 사감장이 학생들의 생활을 이끈다.' },
    { id: 'passage', kind: 'facility', name: '통행의 문', en: 'THE PASSAGE GATE', img: 'place/passage',
      tags: ['포탈', '수호자 경비', '외출 허가증'], people: ['silas'],
      d: '블립 세계로 이어지는 숨겨진 포탈. 전시 체제가 된 뒤로 수호자가 상시 경비한다. 학생이 이 문을 지나 블립 세계로 나가려면, 징계 및 경비 담당 교수 사일라스 토른이 발급하는 외출 허가증이 있어야 한다.' },
    { id: 'forest', kind: 'facility', name: '장막의 숲', en: 'THE VEILED FOREST', img: 'place/forest', play: 'p-forest', danger: true,
      tags: ['출입 금지', '검은 강', '마법 생물'],
      d: '학생 출입 금지 구역. 검은 강이 흐르는 산으로, 마법 생물과 위험이 가득하다. 그런데도 밤마다 숲속에서 빛이 보인다는 소문이 학생들 사이에 끊이지 않는다.' },
    { id: 'ravenville', kind: 'region', name: '레이븐빌', en: 'RAVENVILLE', img: 'place/ravenville', play: 'p-ravenville',
      tags: ['마을', '상점가', '기차역'], people: ['aiden'],
      d: '레이븐포드 옆의 작은 마을. 상점이 많고, 수도로 가는 기차역이 있다. 은퇴한 에이든 와일드가 이곳에서 작은 지팡이 가게를 운영한다.' },
    { id: 'talesburn', kind: 'region', name: '테일즈번', en: 'TALESBURN', img: 'place/talesburn', play: 'p-talesburn',
      tags: ['수도', '수호자 본부'],
      d: '마법사 세계의 인구 밀집 수도. 레이븐빌에서 기차로 1시간 거리다. 마녀 사냥꾼과 맞서는 정규군, 수호자의 본부가 이곳에 있다.' },
    { id: 'fall', kind: 'region', name: '폴 (The Fall)', en: 'THE FALL', img: 'place/fall', play: 'p-fall', danger: true,
      tags: ['마법사 감옥'],
      d: '마법사 감옥. 전쟁 때 붙잡힌 마녀 사냥꾼들이 수감되어 있다. 마법 5계명을 심각하게 어긴 마법사 역시, 학생이라 해도 이곳에 수감될 수 있다.' }
  ],

  /* ════════ 연간 행사 ════════ */
  EVENTS: [
    { id: 'sorting', date: '3.3', name: '기숙사 배정식 / 입학식', play: 'e-sorting' },
    { id: 'trial', date: '6.5', name: '창립자의 시련', d: '기숙사 대항 학업·마법 경연', play: 'e-trial' },
    { id: 'ball', date: '9.7', name: '천체 무도회', d: '전교생이 참여하는 정식 무도회', play: 'e-ball' },
    { id: 'cup', date: '12.9', name: '기숙사 컵 시상식', d: '연말 결산 및 시상', play: 'e-cup' },
    { id: 'graduation', date: '1.11', name: '졸업식', play: 'e-graduation' },
    { id: 'vacation', date: '1.12 – 3.2', name: '방학', d: '수업 없음. 학교에 남거나 집에 갈 수 있다.' }
  ],

  /* ════════ 기숙사 배정: 천리안 수정의 문답 ════════
     각 답은 한 기숙사에 점수를 준다 (b 브레벌린 · c 클라미스 · k 커링린트) */
  QUIZ: [
    { q: '블립 마을에 마녀 사냥꾼이 나타났다. 당신의 손에는 지팡이가 있다.',
      a: { b: '망설이지 않는다. 정체가 드러나더라도 사람들을 지킨다.', c: '싸우기보다 먼저 사람들을 피신시키고, 다칠 사람이 없게 한다.', k: '판을 읽는다. 이길 수 있는 순간에만, 확실하게 움직인다.' } },
    { q: '마법은 누구의 것인가.',
      a: { b: '세상을 지키는 자의 것. 그림자 속에서 선을 위해 쓰여야 한다.', c: '모두의 것. 블립에게도 배울 기회가 있어야 한다.', k: '다룰 자격이 있는 자의 것. 타고난 힘에는 차이가 있다.' } },
    { q: '전시 비상 조항. 학생에게도 제압 목적의 공격 마법이 허용된다. 어떻게 생각하는가.',
      a: { b: '필요하다. 다만 어디까지 허용할지는 신중히 정해야 한다.', c: '너무 위험하다. 아이들 손에 공격 마법을 쥐여 줘선 안 된다.', k: '너무 약하다. 제압만으로는 전쟁에서 이길 수 없다.' } },
    { q: '창립자의 시련. 친구의 실수로 기숙사가 질 위기에 놓였다.',
      a: { b: '실수는 내가 함께 짊어진다. 끝까지 같이 싸운다.', c: '괜찮다고 다독인다. 승패보다 다 같이 웃는 게 먼저다.', k: '남은 시간 안에 이길 방법을 찾는다. 위로는 이긴 뒤에 해도 늦지 않다.' } },
    { q: '우연히, 금지된 마법이 적힌 책을 손에 넣었다.',
      a: { b: '사람을 구하는 데 쓸 수 있다면, 벌을 받을 각오로 펼친다.', c: '혼자 감당할 일이 아니다. 믿을 수 있는 교수에게 알린다.', k: '조용히 읽어 둔다. 지식은 힘이고, 힘은 쥔 자의 것이다.' } },
    { q: '당신이 가장 듣고 싶은 말은 무엇인가.',
      a: { b: '"덕분에 살았어."', c: '"네가 있어서 다행이야."', k: '"역시 너밖에 없어."' } },
    { q: '마지막이다. 블립 세계에서 온 당신은, 두 세계 사이에서 무엇이 되고 싶은가.',
      a: { b: '두 세계를 모두 지키는 방패.', c: '두 세계를 잇는 다리.', k: '두 세계 위에 서는 자.' } }
  ],

  /* 게시판 (상단 흐르는 소식) */
  TICKER: [
    '[전시 체제] 게이트와 통행의 문 — 수호자 상시 경비',
    '[목격] 습격 현장에서 "제인 칼빈스를 봤다"는 증언 잇따라',
    '[공지] 통금 밤 10시 · 복도에서 마법 사용 금지',
    '[외출] 블립 세계 외출 시 징계 및 경비 담당 교수의 허가증 필수',
    '[수호자 후보생] 한나 마르텔 교수 — 별도 실전 훈련 진행',
    '[행사] 기숙사 배정식 · 입학식 3월 3일 — 창립자의 홀',
    '[소문] 올해 신입생 중에 선구자가 있다?'
  ],

  /* ════════ OST ════════
     제목 표기: LAS - 제목 / 테마곡은 LAS - 제목 ( 이름 테마 ) */
  MUSIC: {
    artist: 'LAS',
    album: 'RAVENFORD OST',
    groups: ['main', 'house', 'place', 'event', 'battle', 'daily', 'leader', 'prof', 'brevalin', 'clamis', 'curringlindt', 'hunter'],
    tracks: [
      { id: 'main', g: 'main', title: 'The Sixth Pioneer', dur: 269, sub: '레이븐포드 메인 테마' },

      { id: 'h-brevalin', g: 'house', house: 'brevalin', title: 'Where the Panther Stands', dur: 269 },
      { id: 'h-clamis', g: 'house', house: 'clamis', title: 'Swan Upon Still Waters', dur: 270 },
      { id: 'h-curringlindt', g: 'house', house: 'curringlindt', title: 'Falcon Above the Rest', dur: 269 },

      { id: 'p-hall', g: 'place', title: 'Hall of the Founders', dur: 269, sub: '창립자의 홀' },
      { id: 'p-archive', g: 'place', title: 'Quiet Shelves of Ravenford', dur: 269, sub: '레이븐포드 기록관' },
      { id: 'p-stacks', g: 'place', title: 'The Founders\' Hidden Stacks', dur: 269, sub: '창립자의 서고' },
      { id: 'p-forest', g: 'place', title: 'Into the Veiled Forest', dur: 194, sub: '장막의 숲' },
      { id: 'p-ravenville', g: 'place', title: 'Ravenville', dur: 269, sub: '레이븐빌' },
      { id: 'p-talesburn', g: 'place', title: 'Streets of Talesburn', dur: 268, sub: '테일즈번' },
      { id: 'p-fall', g: 'place', title: 'The Fall', dur: 269, sub: '폴 · 마법사 감옥' },

      { id: 'e-sorting', g: 'event', title: 'The Seeing Crystal', dur: 194, sub: '기숙사 배정식 · 입학식' },
      { id: 'e-trial', g: 'event', title: 'Trial of the Founders', dur: 194, sub: '창립자의 시련' },
      { id: 'e-ball', g: 'event', title: 'Celestial Ball', dur: 194, sub: '천체 무도회' },
      { id: 'e-cup', g: 'event', title: 'The House Cup', dur: 194, sub: '기숙사 컵 시상식' },
      { id: 'e-graduation', g: 'event', title: 'Farewell Through the Gate', dur: 195, sub: '졸업식' },

      { id: 'b-raid', g: 'battle', title: 'Broken Wand Raid', dur: 194, sub: '마녀 사냥꾼 습격' },
      { id: 'b-murus', g: 'battle', title: 'Murus Arcanum', dur: 194, sub: '무루스 아르카눔 · 집단 방어전' },
      { id: 'b-cadet', g: 'battle', title: 'Guardian Cadet Drills', dur: 194, sub: '수호자 후보생 훈련 · 결투' },
      { id: 'b-jane', g: 'battle', title: 'The Fourth Pioneer', dur: 194, sub: '제인 칼빈스 결전' },

      { id: 'd-daily', g: 'daily', title: 'Between Classes', dur: 270, sub: '수업 사이의 일상' },

      { id: 't-kaiden', g: 'leader', char: 'kaiden', title: 'The Old Guardian\'s Watch', dur: 194 },
      { id: 't-isabella', g: 'leader', char: 'isabella', title: 'Conclusion First', dur: 194 },

      { id: 't-silas', g: 'prof', char: 'silas', title: 'Lantern on the Night Patrol', dur: 194 },
      { id: 't-finn', g: 'prof', char: 'finn', title: 'Probably Won\'t Explode', dur: 194 },
      { id: 't-hannah', g: 'prof', char: 'hannah', title: 'Once More, Until You Make It', dur: 194 },
      { id: 't-jasmine', g: 'prof', char: 'jasmine', title: '...Not Bad', dur: 194 },
      { id: 't-seraphina', g: 'prof', char: 'seraphina', title: 'A Question Over Tea', dur: 194 },
      { id: 't-rosel', g: 'prof', char: 'rosel', title: 'Pongpong on My Shoulder', dur: 194 },
      { id: 't-damian', g: 'prof', char: 'damian', title: 'Whichever Side Wins', dur: 194 },
      { id: 't-aiden', g: 'prof', char: 'aiden', title: 'Not You Again', dur: 194 },

      { id: 't-leah', g: 'brevalin', char: 'leah', title: 'Leave It to Me', dur: 194 },
      { id: 't-caleb', g: 'brevalin', char: 'caleb', title: 'The Great Caleb Storm', dur: 194 },
      { id: 't-iris', g: 'brevalin', char: 'iris', title: 'No Exceptions', dur: 194 },
      { id: 't-mia', g: 'brevalin', char: 'mia', title: 'Just Five Minutes', dur: 194 },
      { id: 't-theo', g: 'brevalin', char: 'theo', title: 'It\'s Okay, It\'s Okay', dur: 194 },

      { id: 't-elodie', g: 'clamis', char: 'elodie', title: 'All of Us Together', dur: 195 },
      { id: 't-nora', g: 'clamis', char: 'nora', title: 'Please Don\'t Move', dur: 194 },
      { id: 't-julian', g: 'clamis', char: 'julian', title: 'Art, If We Don\'t Get Caught', dur: 194 },
      { id: 't-lillian', g: 'clamis', char: 'lillian', title: 'I Smell a Story', dur: 194 },
      { id: 't-ezra', g: 'clamis', char: 'ezra', title: 'Eat First', dur: 194 },

      { id: 't-vivian', g: 'curringlindt', char: 'vivian', title: 'Snowflake Crest', dur: 194 },
      { id: 't-lucian', g: 'curringlindt', char: 'lucian', title: 'Then I Quit, Blackwood', dur: 194 },
      { id: 't-margo', g: 'curringlindt', char: 'margo', title: 'Peace Is a Victor\'s Word', dur: 194 },
      { id: 't-celine', g: 'curringlindt', char: 'celine', title: 'Not Because of You', dur: 194 },
      { id: 't-leo', g: 'curringlindt', char: 'leo', title: '...Correction', dur: 194 },

      { id: 't-jane', g: 'hunter', char: 'jane', title: 'Poor Child', dur: 194 },
      { id: 't-morgan', g: 'hunter', char: 'morgan', title: 'Torn Insignia', dur: 194 },
      { id: 't-vera', g: 'hunter', char: 'vera', title: 'Let Me Take It Apart', dur: 194 },
      { id: 't-amber', g: 'hunter', char: 'amber', title: 'Greenhouse Kids', dur: 194 },
      { id: 't-owen', g: 'hunter', char: 'owen', title: 'Have We Met Before?', dur: 194 }
    ]
  }
};
