// 데이터팀 JSON → data/samples.js 변환 도구 (앱이 아니라 개발용. Node.js만 있으면 됨, 설치할 패키지 없음)
// 사용: node tools/convert-samples.js docs/원본데이터/PICKWISE_dataset_v2.4.json data/samples.js
const fs = require('fs');
const [src, out] = process.argv.slice(2);
const d = JSON.parse(fs.readFileSync(src, 'utf8'));

const CAT = { housing: 'housing', consumer: 'shopping', leisure: 'leisure', finance: 'finance', self_development: 'selfdev' };
const catOf = {};
d.categories.forEach(c => c.decision_ids.forEach(id => { catOf[id] = CAT[c.id] || 'etc'; }));

// criterion id -> icon name in js/icons.js
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

const samples = d.decisions.map(x => {
  const optName = {}; x.options.forEach(o => { optName[o.id] = o.label; });
  const criteria = x.criteria
    .slice().sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
    .map(c => ({
      id: c.id, name: c.label, icon: iconOf(c.id), unit: c.unit || '',
      better: c.direction === 'lower_better' ? 'low' : 'high',
      group: c.scope === 'common' ? 'common' : (c.display_group === 'additional' ? 'more' : 'main'),
      selected: !!c.selected, importance: c.importance || 0,
      help: c.help_text || ''
    }));
  const values = {}, info = {};
  x.options.forEach(o => {
    const name = o.label; values[name] = {}; info[name] = o.known_information || '';
    criteria.forEach(c => {
      const e = (o.evaluations || {})[c.id] || {};
      values[name][c.id] = {
        score: typeof e.score === 'number' ? r4(e.score) : null,
        text: (o.facts_display || {})[c.id] || '',
        estimated: !!e.requires_verification
      };
    });
  });
  const a = x.analysis || {};
  const ctx = x.context || {};
  const notes = ['eligibility', 'assumptions', 'cost_calculation_assumptions', 'price_basis', 'battery_basis', 'limitations', 'criteria_limitations', 'reference_period']
    .filter(k => ctx[k]).map(k => ctx[k]);
  return {
    id: x.id, title: x.title, topic: x.title, category: catOf[x.id] || 'etc',
    options: x.options.map(o => o.label),
    criteria, values, info,
    analysis: {
      ranking: (a.ranking || []).map(r => ({ name: r.label, score: r.display_score })),
      summary: a.summary || '', explanation: a.explanation || '',
      sensitivity: (a.sensitivity || []).map(s => s.text),
      whatIf: (a.what_if || []).map(w => ({
        label: w.label, criterion: w.criterion_id, multiplier: w.multiplier,
        winner: (w.ranking && w.ranking[0] && w.ranking[0].label) || '',
        scores: (w.ranking || []).map(r => ({ name: r.label, score: r.display_score }))
      }))
    },
    overlap: (x.criteria_overlap_warnings || []).map(o => ({ ids: o.criterion_ids, message: o.message })),
    next: (x.next_decision_suggestions || []).map(n => n.title),
    notes,
    sources: (x.data_sources || []).map(s => ({ label: s.label, url: s.url || '', asOf: s.as_of || '', note: s.note || '' }))
  };
});

const header = `/* 체험용 완성 시나리오 (담당: 데이터팀 · 정리: 조원2)
   - 원본: 데이터팀 PICKWISE_dataset v${d.schema_version} (기준일 ${d.developer_notes.value_confidence && d.developer_notes.value_confidence.reference_date || ''})
   - 이 파일은 원본 JSON을 앱 형식으로 자동 변환한 것이다. 내용을 고칠 때는 원본을 고친 뒤 다시 변환하는 것을 권장.
   - 기준 점수(values[].score)와 중요도(importance)는 0~100. 점수는 선택지끼리 수치를 비교해 최고 100 · 최저 0 (같으면 50)
   - estimated: true = 시연용 추정값(확인 필요) → 화면에 "추정" 표시
   - analysis: 기본 기준·중요도 그대로일 때 보여줄 데이터팀 작성 문장 */
`;
fs.writeFileSync(out, header + 'Pickwise.data.samples = ' + JSON.stringify(samples, null, 1) + ';\n');
console.log('wrote', out, samples.length, 'samples');
