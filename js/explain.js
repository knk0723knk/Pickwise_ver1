/* ============================================================
   AI 설명 · 한 줄 요약 · 확신도 (담당: 조원7)
   - 규칙 기반: 점수 결과 + data/templates.js 문장 틀 → 문장
   - 사용:
       var r = Pickwise.scoring.compute(state);
       var t = Pickwise.explain.build(state, r);
       t.summary      // "A가 B보다 나은 핵심 이유" 한 줄
       t.explain      // AI 설명 문장 배열 (2~3개)
       t.biggest      // 차이가 큰 기준 [{ id, name, lead: 선택지이름, diff }]
       t.confidence   // { level: 'high'|'mid'|'low', label, text, focus: 기준 }
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
    var gap = Math.round(gapRaw);

    var vars = {
      winner: win.name, loser: lose.name, score1: win.score, score2: lose.score, gap: gap,
      c1: ahead[0] ? ahead[0].name : '', c2: ahead[1] ? ahead[1].name : '',
      w: (ahead[0] ? result.shares[ahead[0].id] : 0) + (ahead[1] ? result.shares[ahead[1].id] : 0),
      lc: behind[0] ? behind[0].name : ''
    };

    // 한 줄 요약
    var summary;
    if (gapRaw < 0.5) summary = pick(T.summary.tie, seed);
    else if (gap < 5) summary = pick(T.summary.close, seed);
    else if (ahead.length >= 2) summary = pick(T.summary.two, seed);
    else summary = pick(T.summary.one, seed);

    // AI 설명 (2~3문장)
    var explain = [];
    if (gapRaw >= 0.5) {
      explain.push(pick(T.explain.lead, seed));
      if (ahead.length) explain.push(pick(T.explain.reason, seed));
      explain.push(behind.length ? pick(T.explain.counter, seed) : pick(T.explain.nocounter, seed));
    } else {
      explain.push(pick(T.summary.tie, seed));
      if (behind.length || ahead.length) explain.push(pick(T.explain.counter, seed));
    }

    // 차이가 큰 기준 (별점 차이 기준, 최대 3개)
    var biggest = diffs.filter(function (d) { return d.ratingDiff !== 0; })
      .sort(function (a, b) { return Math.abs(b.diff) - Math.abs(a.diff); })
      .slice(0, 3)
      .map(function (d) { return { id: d.id, name: d.name, lead: d.diff > 0 ? win.name : lose.name, diff: Math.abs(d.ratingDiff) }; });

    return {
      summary: fill(summary, vars),
      explain: explain.map(function (s) { return fill(s, vars); }),
      biggest: biggest,
      confidence: confidence(state, result, win, lose, seed),
      ruleNote: T.ruleNote,
      fill: fill
    };
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
    return { level: level, label: label, text: text, focus: focus, unknownShare: share };
  }

  Pickwise.explain = { build: build, fill: fill };
})();
