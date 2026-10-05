// 데이터팀 JSON → 앱 데이터 변환 도구 (앱이 아니라 개발용. Node.js만 있으면 됨, 설치할 패키지 없음)
// 사용: node tools/convert-samples.js docs/원본데이터/PICKWISE_dataset_v2.4.json
// 만드는 파일:
//   data/samples.js           — 체험 시나리오 (예시로 체험하기)
//   data/criteria.js          — 분류별 기준 (직접 입력에도 쓰는 데이터셋 기준)
//   data/keywords-dataset.js  — 데이터셋 기준의 점수 단어 (단위·좋은 방향으로 자동 생성)
const fs = require('fs');
const path = require('path');
const src = process.argv[2];
const outDir = path.join(__dirname, '..', 'data');
const d = JSON.parse(fs.readFileSync(src, 'utf8'));
const VERSION = d.schema_version;
const REF = (d.developer_notes.value_confidence && d.developer_notes.value_confidence.reference_date) || '';

const CAT = { housing: 'housing', consumer: 'shopping', leisure: 'leisure', finance: 'finance', self_development: 'selfdev' };
const catOf = {};
d.categories.forEach(c => c.decision_ids.forEach(id => { catOf[id] = CAT[c.id] || 'etc'; }));

/* ---------- 아이콘 ---------- */
const ICON = [
  [/cost|price|rent|deposit|principal|cap|min_deposit|interest$|total_interest|after_tax|monthly/, 'wallet'],
  [/rate|return_on/, 'chart'],
  [/time|duration|tenure|months|minutes|renewal|sessions/, 'clock'],
  [/weight|volume|envelope/, 'box'],
  [/screen|display|pixel/, 'camera'],
  [/storage|memory|core|port|battery|capacity/, 'star'],
  [/anc|transparency|wireless/, 'volume'],
  [/protection/, 'shield'],
  [/co_resident|group|one_to_one|conversation/, 'users'],
  [/transit|transport/, 'bus'],
  [/lodging/, 'bed'],
  [/meal/, 'utensils'],
  [/temperature|weather|outdoor/, 'sun'],
  [/calorie/, 'heart'],
  [/auto_saving|withdrawal/, 'refresh'],
  [/reservation|prep|equipment/, 'doc']
];
const iconOf = id => (ICON.find(([re]) => re.test(id)) || [null, 'dot'])[1];
const r4 = n => Math.round(n * 10000) / 10000;

/* ---------- 공통 기준 (데이터셋 developer_notes.common_criteria) ---------- */
const COMMON = {
  initial_cost:    { name: '초기 비용', icon: 'wallet', better: 'low',  format: 'won',    question: '처음에 드는 돈은 얼마인가요? (보증금·가격·첫 달 비용 등)' },
  usable_duration: { name: '사용 기간', icon: 'clock',  better: 'high', format: 'number', question: '얼마나 오래 쓸 수 있나요? (계약기간·배터리 등)' },
  time_required:   { name: '소요 시간', icon: 'clock',  better: 'low',  format: 'number', question: '시간이 얼마나 걸리나요? (이동 시간·주당 시간·돈이 묶이는 기간 등)' }
};
const COMMON_BY_CAT = {
  housing: ['initial_cost', 'usable_duration'], shopping: ['initial_cost', 'usable_duration'],
  leisure: ['initial_cost', 'time_required'], selfdev: ['initial_cost', 'time_required'],
  finance: ['initial_cost', 'time_required'], etc: ['initial_cost', 'time_required']
};

/* ---------- 조사 (질문 문장용) ---------- */
function josa(w, a, b) {
  const ch = w.replace(/[\s)\]]+$/, '').slice(-1);
  const code = ch.charCodeAt(0) - 0xAC00;
  const has = code >= 0 && code <= 11171 ? code % 28 !== 0 : /[0136789lmnr]/i.test(ch);
  return w + (has ? a : b);
}
function questionFor(c) {
  const f = (c.display && c.display.format) || '';
  if (/^won/.test(f)) return josa(c.label, '은', '는') + ' 얼마인가요?';
  if (/^boolean/.test(f)) return josa(c.label, '이', '가') + ' 되나요?';
  return josa(c.label, '은', '는') + ' 어느 정도인가요?';
}

/* ---------- 점수 단어 자동 생성: 단위(format·unit) + 좋은 방향 ---------- */
const FAMILY = {
  money:    { low: { pos: ['저렴', '싸게', '가성비', '합리적', '할인', '적게 들', '부담이 적', '무료'], neg: ['비싸', '비싼', '부담', '많이 들', '고가'] },
              high: { pos: ['많이 주', '넉넉', '높', '많'], neg: ['적게 주', '부족', '낮', '적'] } },
  time:     { low: { pos: ['짧', '금방', '빨리', '가깝', '바로'], neg: ['오래 걸', '시간이 많이', '멀', '오래', '길어', '길고', '긴 편'] },
              high: { pos: ['오래', '넉넉', '길'], neg: ['짧', '금방 닳', '부족'] } },
  weight:   { low: { pos: ['가볍', '가벼'], neg: ['무겁', '무거'] }, high: { pos: ['무겁'], neg: ['가볍'] } },
  size:     { low: { pos: ['작', '콤팩트', '휴대가 편'], neg: ['크', '부피가'] }, high: { pos: ['크', '넓', '시원'], neg: ['작', '좁'] } },
  percent:  { low: { pos: ['낮', '저렴'], neg: ['높', '비싸'] }, high: { pos: ['높', '많이 주', '좋'], neg: ['낮', '적'] } },
  count:    { low: { pos: ['적', '간단', '필요 없', '없어', '없고', '혼자'], neg: ['많', '번거롭', '복잡'] }, high: { pos: ['많', '넉넉', '높', '빠르', '선명'], neg: ['적', '부족', '낮', '느리'] } },
  possible: { high: { pos: ['가능', '할 수 있', '돼', '되요', '지원', '있어'], neg: ['불가', '안 돼', '못 해', '미지원'] },
              low: { pos: ['불가'], neg: ['가능'] } },
  required: { low: { pos: ['필요 없', '바로', '안 해도'], neg: ['필요', '해야', '예매'] }, high: { pos: ['필요'], neg: ['필요 없'] } }
};
function familyOf(c) {
  const f = (c.display && c.display.format) || '', u = c.unit || '';
  if (/^won/.test(f)) return 'money';
  if (f === 'boolean_required') return 'required';
  if (/^boolean/.test(f)) return 'possible';
  if (/^percent/.test(f)) return 'percent';
  if (/kg|g$/.test(u) || /weight/.test(c.id)) return 'weight';
  if (/cm|인치|cm³|volume|diagonal/.test(u + c.id)) return 'size';
  if (/시간|개월|분|년|일|duration|time|months|tenure/.test(u + c.id)) return 'time';
  return 'count';
}
const EXTRA_ALIASES = {
  initial_cost: ['비용', '가격', '값', '돈', '보증금', '수강료', '회비', '경비', '물가', '예산', '처음', '숙소비', '항공권', '입장료', '티켓', '요금', '월세', '전세'],
  usable_duration: ['기간', '배터리', '수명', '오래', '계약'],
  time_required: ['시간', '소요', '걸리', '이동', '기간', '묶이'],
  weather_free: ['날씨', '실내', '비 와도', '우천'],
  co_resident_count: ['동거인', '같이 사는', '룸메이트'],
  group_size: ['같이', '함께', '그룹', '인원'],
  conversation: ['대화', '얘기', '이야기'],
  calorie_per_hour: ['칼로리', '열량', '운동량'],
  anc_supported: ['노캔', '노이즈', '소음 차단'],
  screen_diagonal: ['화면', '디스플레이', '인치'],
  interest_rate: ['금리', '이자율'], total_interest: ['이자'],
  early_withdrawal_rate: ['중도해지', '해지'], auto_saving: ['자동 납입', '자동이체']
};
// 이름 조각 중 여러 기준에 흔히 들어가는 말은 기준을 가리키는 말로 쓰지 않는다
const STOP = ['금리', '비용', '시간', '기간', '사용', '가능', '무관', '대표', '전체', '개인', '일반', '표시', '날씨와', '이자', '무게', '보증금', '지원', '한도'];
function keywordsFor(id, c, better) {
  const fam = FAMILY[familyOf(c)][better === 'low' ? 'low' : 'high'];
  const label = c.label.replace(/\(.*?\)/g, '').trim();
  const parts = label.split(/\s+/).filter(w => w.length >= 2 && STOP.indexOf(w) < 0);
  const aliases = [label].concat(parts, EXTRA_ALIASES[id] || []);
  // needsAlias: 좋은/나쁜 표현은 같은 문장 조각에 이 기준을 가리키는 말이 있을 때만 센다 (다른 기준으로 번지지 않게)
  return { aliases: Array.from(new Set(aliases)), pos: fam.pos.slice(), neg: fam.neg.slice(), needsAlias: true };
}

/* ---------- 1) 체험 시나리오 ---------- */
const samples = d.decisions.map(x => {
  const criteria = x.criteria.slice().sort((a, b) => (a.display_order || 0) - (b.display_order || 0)).map(c => ({
    id: c.id, name: c.label, icon: iconOf(c.id), unit: c.unit || '',
    better: c.direction === 'lower_better' ? 'low' : 'high',
    group: c.scope === 'common' ? 'common' : (c.display_group === 'additional' ? 'more' : 'main'),
    selected: !!c.selected, importance: c.importance || 0, help: c.help_text || ''
  }));
  const values = {}, info = {};
  x.options.forEach(o => {
    values[o.label] = {}; info[o.label] = o.known_information || '';
    criteria.forEach(c => {
      const e = (o.evaluations || {})[c.id] || {};
      values[o.label][c.id] = { score: typeof e.score === 'number' ? r4(e.score) : null, text: (o.facts_display || {})[c.id] || '', estimated: !!e.requires_verification };
    });
  });
  const a = x.analysis || {}, ctx = x.context || {};
  const notes = ['eligibility', 'assumptions', 'cost_calculation_assumptions', 'price_basis', 'battery_basis', 'limitations', 'criteria_limitations', 'reference_period'].filter(k => ctx[k]).map(k => ctx[k]);
  return {
    id: x.id, title: x.title, topic: x.title, category: catOf[x.id] || 'etc', options: x.options.map(o => o.label),
    criteria, values, info,
    analysis: {
      ranking: (a.ranking || []).map(r => ({ name: r.label, score: r.display_score })),
      summary: a.summary || '', explanation: a.explanation || '', sensitivity: (a.sensitivity || []).map(s => s.text),
      whatIf: (a.what_if || []).map(w => ({ label: w.label, criterion: w.criterion_id, multiplier: w.multiplier,
        winner: (w.ranking && w.ranking[0] && w.ranking[0].label) || '', scores: (w.ranking || []).map(r => ({ name: r.label, score: r.display_score })) }))
    },
    overlap: (x.criteria_overlap_warnings || []).map(o => ({ ids: o.criterion_ids, message: o.message })),
    next: (x.next_decision_suggestions || []).map(n => n.title),
    notes,
    sources: (x.data_sources || []).map(s => ({ label: s.label, url: s.url || '', asOf: s.as_of || '', note: s.note || '' }))
  };
});

/* ---------- 2) 분류별 기준 (직접 입력용) ---------- */
const categories = {}, keywords = {}, nextByCat = {};
Object.keys(COMMON).forEach(id => {
  const cm = COMMON[id];
  keywords[id] = keywordsFor(id, { id, label: cm.name, display: { format: cm.format }, unit: cm.format === 'number' ? '시간' : '원' }, cm.better);
});
d.categories.forEach(cat => {
  const app = CAT[cat.id];
  const main = [], more = [], seenId = new Set(), seenName = new Set(), overlap = [];
  const commonIds = COMMON_BY_CAT[app];
  cat.decision_ids.forEach(did => {
    const x = d.decisions.find(z => z.id === did);
    (x.criteria_overlap_warnings || []).forEach(o => overlap.push({ ids: o.criterion_ids, message: o.message }));
    (x.next_decision_suggestions || []).forEach(n => { (nextByCat[app] = nextByCat[app] || []).includes(n.title) || nextByCat[app].push(n.title); });
    x.criteria.slice().sort((a, b) => (a.display_order || 0) - (b.display_order || 0)).forEach(c => {
      if (c.scope === 'common' || commonIds.includes(c.id)) return;
      const name = c.label;
      if (seenId.has(c.id) || seenName.has(name)) { // 이미 있는 기준이면 "기본 선택" 여부만 합친다
        const ex = main.concat(more).find(m => m.id === c.id || m.name === name);
        if (ex && c.selected) ex.default = true;
        return;
      }
      seenId.add(c.id); seenName.add(name);
      const better = c.direction === 'lower_better' ? 'low' : 'high';
      const item = { id: c.id, name, icon: iconOf(c.id), default: !!c.selected, better,
        question: questionFor(c), search: '{option} ' + name.replace(/\(.*?\)/g, '').trim(), help: c.help_text || '' };
      (c.display_group === 'additional' ? more : main).push(item);
      keywords[c.id] = keywordsFor(c.id, c, better);
    });
  });
  // 추가 제안에만 있는데 데이터셋에서 기본 선택된 기준은 카드로 올린다 (예: 총 재생시간)
  for (let i = more.length - 1; i >= 0; i--) if (more[i].default) main.push(more.splice(i, 1)[0]);
  categories[app] = {
    common: commonIds.map(id => ({ id, name: COMMON[id].name, icon: COMMON[id].icon, default: true, better: COMMON[id].better, question: COMMON[id].question, search: '{option} ' + COMMON[id].name })),
    main, more, overlap
  };
});
// 기타: 데이터셋에 시나리오가 없어 공통 기준 + 범용 임시안 기준
categories.etc = {
  common: COMMON_BY_CAT.etc.map(id => ({ id, name: COMMON[id].name, icon: COMMON[id].icon, default: true, better: COMMON[id].better, question: COMMON[id].question, search: '{option} ' + COMMON[id].name })),
  main: [
    { id: 'risk', name: '위험·불확실성', icon: 'alert', default: true, question: '잘못될 수 있는 점은 무엇인가요?', search: '{option} 단점' },
    { id: 'longterm', name: '장기적 영향', icon: 'chart', default: true, question: '1년 뒤의 나에게 어떤 영향을 줄까요?', search: '{option} 장단점' },
    { id: 'satisfaction', name: '만족도', icon: 'smile', default: false, question: '고른 뒤 얼마나 만족할 것 같나요?', search: '{option} 후기' },
    { id: 'effort', name: '노력·수고', icon: 'tool', default: false, question: '준비하거나 신경 쓸 일이 많나요?', search: '{option} 준비' },
    { id: 'people', name: '주변 사람 영향', icon: 'users', default: false, question: '가족, 친구, 동료에게 어떤 영향이 있나요?', search: '{option} 경험담' }
  ],
  more: [
    { id: 'fun', name: '재미·흥미', icon: 'spark', question: '하면서 즐거울 것 같나요?', search: '{option} 재미' },
    { id: 'reversible', name: '되돌릴 수 있는지', icon: 'refresh', question: '마음이 바뀌면 되돌릴 수 있나요?', search: '{option} 취소 환불' },
    { id: 'learning', name: '배울 점', icon: 'book', question: '새로 배우거나 얻는 경험이 있나요?', search: '{option} 경험' },
    { id: 'health', name: '건강', icon: 'heart', question: '몸과 마음 건강에 어떤 영향이 있나요?', search: '{option} 건강' }
  ],
  overlap: []
};

/* ---------- 3) 시나리오별 기준 (직접 입력 시 주제에 가장 가까운 시나리오의 기준을 씀) ----------
   hints: 주제 문장에 이 단어가 많이 들어 있으면 이 시나리오로 본다. 데이터팀이 시나리오를 추가하면 여기에 단어도 추가 */
const SCENARIO_HINTS = {
  housing_region:   ['청년전세임대', '전세임대', '지역', '수도권', '광역시', '서울', '경기', '지방', '이사', '자취', '원룸', '오피스텔', '투룸', '전세', '월세', '집'],
  housing_sharing:  ['공동거주', '셰어', '셰어하우스', '룸메이트', '동거', '같이 살', '혼자 살', '단독', '2인', '3인', '친구랑'],
  laptop_purchase:  ['노트북', '맥북', '그램', '갤럭시북', '랩탑', '컴퓨터', '맥', '아이패드', '태블릿'],
  earbuds_purchase: ['이어폰', '버즈', '에어팟', '헤드폰', '헤드셋', '블루투스', '무선 이어폰'],
  travel_domestic:  ['여행', '여행지', '국내', '휴가', '제주', '부산', '전주', '강릉', '경주', '여수', '속초', '숙소', '해외'],
  weekend_activity: ['주말', '영화', '피크닉', '한강', '데이트', '전시', '전시회', '공연', '산책', '등산', '놀이공원', '카페', '뭐 하지', '뭐 할까'],
  savings_choice:   ['적금', '예금', '저축', '통장', '파킹', '이자', '금리', '청약'],
  exercise_choice:  ['운동', '헬스', 'pt', '필라테스', '테니스', '요가', '수영', '러닝', '클라이밍', '골프', '크로스핏', '복싱']
};
const scenarios = {};
d.decisions.forEach(x => {
  const app = catOf[x.id] || 'etc';
  const byOrder = x.criteria.slice().sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  const item = c => ({ id: c.id, name: c.label, icon: iconOf(c.id), default: !!c.selected, better: c.direction === 'lower_better' ? 'low' : 'high',
    question: COMMON[c.id] && c.scope === 'common' ? questionFor(c) : questionFor(c), search: '{option} ' + c.label.replace(/\(.*?\)/g, '').trim() });
  const common = byOrder.filter(c => c.scope === 'common').map(item);
  const main = byOrder.filter(c => c.scope !== 'common' && (c.display_group !== 'additional' || c.selected)).map(item);
  const more = byOrder.filter(c => c.scope !== 'common' && c.display_group === 'additional' && !c.selected).map(item);
  byOrder.forEach(c => { if (!keywords[c.id]) keywords[c.id] = keywordsFor(c.id, c, c.direction === 'lower_better' ? 'low' : 'high'); });
  scenarios[x.id] = {
    title: x.title, category: app, hints: SCENARIO_HINTS[x.id] || x.title.split(/\s+/),
    common, main, more,
    overlap: (x.criteria_overlap_warnings || []).map(o => ({ ids: o.criterion_ids, message: o.message })),
    next: (x.next_decision_suggestions || []).map(n => n.title)
  };
});

/* ---------- 쓰기 ---------- */
const stamp = `원본: 데이터팀 PICKWISE_dataset v${VERSION} (기준일 ${REF}) · tools/convert-samples.js 로 자동 생성 — 직접 고치지 말고 원본 수정 후 다시 변환`;
fs.writeFileSync(path.join(outDir, 'samples.js'),
`/* 체험용 완성 시나리오 (담당: 데이터팀 · 정리: 조원2)
   ${stamp}
   - 기준 점수(values[].score)와 중요도(importance)는 0~100. 점수는 선택지끼리 수치를 비교해 최고 100 · 최저 0 (같으면 50)
   - estimated: true = 시연용 추정값(확인 필요) → 화면에 "추정" 표시
   - analysis: 기본 기준·중요도 그대로일 때 보여줄 데이터팀 작성 문장 */
Pickwise.data.samples = ${JSON.stringify(samples, null, 1)};
Pickwise.data.datasetNext = ${JSON.stringify(nextByCat, null, 1)};
`);
fs.writeFileSync(path.join(outDir, 'criteria.js'),
`/* 분류별 비교 기준 — 직접 입력에도 쓰는 데이터셋 기준 (담당: 데이터팀 · 정리: 조원3)
   ${stamp}
   - scenarios.시나리오: 직접 입력한 주제가 hints 단어와 가장 많이 맞는 시나리오의 기준을 그대로 쓴다 (10/05 결정 B)
   - categories: 맞는 시나리오가 없을 때 쓰는 분류 단위 기준 (같은 분류 시나리오 기준을 합친 것)
   - categories.분류.common: 공통 기준 (데이터셋: 초기 비용 + 사용 기간[주거·소비] / 소요 시간[여가·자기계발·금융생활])
   - categories.분류.main: 카드로 보이는 기준 (데이터셋 primary) · default: true = 데이터셋에서 기본 선택
   - categories.분류.more: "이런 기준도 고려해보세요" (데이터셋 additional)
   - better: low = 낮을수록 좋음 / high = 높을수록 좋음
   - 기타(etc)는 데이터셋에 시나리오가 없어 공통 기준 + Claude 임시안 */
Pickwise.data.criteria = ${JSON.stringify({ scenarios, categories }, null, 1)};
`);
fs.writeFileSync(path.join(outDir, 'keywords-dataset.js'),
`/* 데이터셋 기준의 점수 단어 (담당: 조원5)
   ${stamp}
   - 단어는 기준의 단위(원·시간·kg·가능 여부 등)와 좋은 방향(낮을수록/높을수록)으로 자동 생성
   - 사용 방법은 data/keywords.js 설명과 같음. 같은 id가 있으면 이 파일이 우선 */
Pickwise.data.keywordsDataset = ${JSON.stringify(keywords, null, 1)};
`);
console.log('samples', samples.length, '| categories', Object.keys(categories).join(','), '| keyword sets', Object.keys(keywords).length);
Object.keys(categories).forEach(k => {
  const c = categories[k];
  console.log(' ', k.padEnd(8), 'common', c.common.map(x => x.name).join('·'), '| main', c.main.length, '(default ' + c.main.filter(x => x.default).length + ')', '| more', c.more.length, '| next', (nextByCat[k] || []).length);
});
