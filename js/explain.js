/* ============================================================
   AI 설명 · 한 줄 요약 · 확신도 (담당: 조원7)
   - 규칙 기반: 점수 결과 + data/templates.js 문장 틀 → 문장
   - 사용:
       var r = Pickwise.scoring.compute(state);
       var t = Pickwise.explain.build(state, r);
       t.summary      // "A가 B보다 나은 핵심 이유" 한 줄
       t.explain      // AI 설명 문장 배열 (2~3개)
       t.biggest      // 차이가 큰 기준 [{ id, name, lead: 선택지이름, diff }]
       t.confidence   // { level: 'high'|'mid'|'low', label, text, focus: 기준, estimated }
       t.preset       // 데이터팀 예시를 그대로 진행했으면 { sample } (데이터팀 작성 문장을 썼다는 뜻), 아니면 null
   - 데이터팀 예시(data/samples.js)를 기준·중요도·점수 그대로 진행하면 데이터팀이 미리 쓴 문장을 보여주고,
     하나라도 바꾸면 규칙 기반 문장으로 바뀐다 (실시간 AI 호출 없음)
   ============================================================ */
(function () {
  /* 문장 틀 채우기: {winner} → 값, {winner:은는} → 값 + 받침에 맞는 조사 */
  function fill(tpl, vars) {
    return tpl.replace(/\{(\w+)(?::(은는|이가|을를|과와|으로로))?\}/g, function (m, key, pair) {
      var v = vars[key];
      if (v === undefined || v === null) return m;
      return pair ? Pickwise.josa(String(v), pair) : String(v);
    });
  }

  /* 같은 결정이면 항상 같은 문장이 나오도록 문장 틀 하나를 고른다 */
  function pick(list, seed) {
    if (!list || !list.length) return '';
    var h = 0;
    for (var i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    return list[h % list.length];
  }

  /* 데이터팀 예시를 그대로 진행 중인지 */
  function presetOf(state) {
    if (!state.preset) return null;
    var sm = (Pickwise.data.samples || []).filter(function (x) { return x.id === state.preset.id; })[0];
    if (!sm) return null;
    return { sample: sm, unchanged: Pickwise.scoring.signature(state) === state.preset.sig };
  }

  function build(state, result) {
    var T = Pickwise.data.templates;
    var win = result.ranking[0], lose = result.ranking[1];
    var seed = state.topic + '|' + win.name;
    var names = {};
    state.criteria.forEach(function (c) { names[c.id] = c.name; });

    // 기준별로 1위가 2위보다 얼마나 앞섰는지 (종합 점수 기여도 차이)
    var diffs = state.criteria.map(function (c) {
      return { id: c.id, name: c.name, diff: win.per[c.id].contrib - lose.per[c.id].contrib,
               ratingDiff: win.per[c.id].used - lose.per[c.id].used };
    });
    var ahead = diffs.filter(function (d) { return d.diff > 0.05; }).sort(function (a, b) { return b.diff - a.diff; });
    var behind = diffs.filter(function (d) { return d.diff < -0.05; }).sort(function (a, b) { return a.diff - b.diff; });
    var gapRaw = win.total - lose.total;
    var gap = win.score - lose.score;   // 화면에 보이는 점수끼리의 차이 (따로 반올림하면 "60점, 57점으로 2점 앞서요"처럼 어긋남)

    // 1위와 점수가 같은 선택지 모두 (선택지가 3~4개여도 빠짐없이)
    var tiedNames = result.ranking.filter(function (o) { return Math.abs(o.total - win.total) < 0.5; }).map(function (o) { return o.name; });
    var tiedText = tiedNames.length <= 2
      ? Pickwise.josa(tiedNames[0], '과와') + ' ' + (tiedNames[1] || '')
      : tiedNames.slice(0, -1).join(', ') + ', ' + tiedNames[tiedNames.length - 1];

    var vars = {
      tied: tiedText, same: tiedNames.length >= 3 ? '모두 같아요' : '같아요',
      winner: win.name, loser: lose.name, score1: win.score, score2: lose.score, gap: gap,
      c1: ahead[0] ? ahead[0].name : '', c2: ahead[1] ? ahead[1].name : '',
      w: (ahead[0] ? result.shares[ahead[0].id] : 0) + (ahead[1] ? result.shares[ahead[1].id] : 0),
      lc: behind[0] ? behind[0].name : ''
    };

    // 한 줄 요약
    var summary;
    if (gapRaw < 0.5) summary = pick(T.summary.tie, seed);
    else if (gap < 1 && T.summary.closeZero) summary = pick(T.summary.closeZero, seed);   // 반올림하면 같은 점수
    else if (gap < 5) summary = pick(T.summary.close, seed);
    else if (ahead.length >= 2) summary = pick(T.summary.two, seed);
    else summary = pick(T.summary.one, seed);

    // AI 설명 (2~3문장)
    var explain = [];
    if (gapRaw >= 0.5) {
      explain.push(gap < 1 ? T.explain.lead[T.explain.lead.length - 1] : pick(T.explain.lead, seed));   // "0점 앞서요" 대신 점수만
      if (ahead.length) explain.push(pick(T.explain.reason, seed));
      explain.push(behind.length ? pick(T.explain.counter, seed) : pick(T.explain.nocounter, seed));
    } else {
      // 동점: 요약과 같은 문장을 반복하지 않고, 어디서 서로 앞섰는지를 말한다
      if (ahead.length && behind.length && T.explain.tieDetail) explain.push(pick(T.explain.tieDetail, seed));
      else if (T.explain.tieSame) explain.push(pick(T.explain.tieSame, seed));
      else explain.push(pick(T.summary.tie, seed));
    }

    // 차이가 큰 기준 (별점 차이 기준, 최대 3개)
    var biggest = diffs.filter(function (d) { return d.ratingDiff !== 0; })
      .sort(function (a, b) { return Math.abs(b.diff) - Math.abs(a.diff); })
      .slice(0, 3)
      .map(function (d) { return { id: d.id, name: d.name, lead: d.diff > 0 ? win.name : lose.name, diff: Math.abs(d.ratingDiff) }; });

    var out = {
      summary: fill(summary, vars),
      explain: explain.map(function (s) { return fill(s, vars); }),
      biggest: biggest,
      confidence: confidence(state, result, win, lose, seed),
      ruleNote: T.ruleNote,
      preset: null,
      fill: fill
    };
    var p = presetOf(state);
    if (p && p.unchanged) {
      // "핵심 이유"는 규칙 문장을 쓴다 (10/06): 데이터팀 요약("현재 선택한 객관 기준과 기본 중요도에서는 …총점이 가장 높아요")은
      // 이유가 아니라 결과만 말하고, 같은 내용이 아래 설명 첫 문장에도 있음. 데이터팀 설명(수치 포함)은 AI 설명 상자에 그대로 쓴다
      if (p.sample.analysis.explanation) out.explain = [p.sample.analysis.explanation];
      out.ruleNote = T.presetNote || out.ruleNote;
      out.preset = { sample: p.sample };
    }
    return out;
  }

  /* 확신도: 1·2위 중 "모름(정보 없음)" 기준의 비중 합으로 판단 */
  function confidence(state, result, win, lose, seed) {
    var T = Pickwise.data.templates.confidence;
    var unknown = state.criteria.filter(function (c) {
      return win.per[c.id].rating === null || lose.per[c.id].rating === null;
    });
    var share = unknown.reduce(function (a, c) { return a + (result.shares[c.id] || 0); }, 0);
    var focus = unknown.slice().sort(function (a, b) { return result.shares[b.id] - result.shares[a.id]; })[0] || null;
    var level = share < 15 ? 'high' : share < 40 ? 'mid' : 'low';
    var label = { high: '높음', mid: '보통', low: '낮음' }[level];
    var text = fill(pick(T[level], seed), { crit: focus ? focus.name : '' });
    // 시연용 추정값이 섞여 있으면 함께 알린다
    var facts = state.facts || {};
    var estimated = state.criteria.filter(function (c) {
      return [win.name, lose.name].some(function (o) { var f = facts[o] && facts[o][c.id]; return f && f.estimated && !f.edited; });
    });
    if (estimated.length && T.estimated) {
      var estText = fill(T.estimated[0], { crit: estimated.map(function (c) { return c.name; }).join('·') });
      if (level === 'high') { level = 'mid'; label = '보통'; text = (T.filled ? T.filled[0] + ' ' : '') + estText; }
      else text += ' ' + estText;
    }
    return { level: level, label: label, text: text, focus: focus, unknownShare: share, estimated: estimated };
  }

  Pickwise.explain = { build: build, fill: fill, presetOf: presetOf };
})();
