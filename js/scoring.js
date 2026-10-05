/* ============================================================
   점수 계산 엔진 (담당: 조원6) — 데이터팀 데이터셋과 같은 방식 (10/05 결정)
   - 기준 점수: 0~100 (state.ratings) · 중요도: 0~100 (state.weights)
   - 총점 = Σ(기준 점수 × 중요도) ÷ Σ(중요도)        → 0~100점
   - 기준 점수가 null(모름·정보 없음)이면 50점(보통)으로 계산하고, "정보 부족"으로 따로 센다
   - 사용:
       var r = Pickwise.scoring.compute(Pickwise.state);
       r.ranking[0].name   // 1위 선택지
       r.shares.cost       // 그 기준의 비중(%) — 화면 표시용 정수, 합계 100
   ============================================================ */
(function () {
  var NEUTRAL = 50;

  /* 정수 목록을 합계가 정확히 total 이 되게 반올림 (가장 큰 나머지 방식) */
  function roundTo(values, total) {
    var floors = values.map(Math.floor);
    var left = total - floors.reduce(function (a, b) { return a + b; }, 0);
    var order = values.map(function (v, i) { return { i: i, r: v - Math.floor(v) }; })
      .sort(function (a, b) { return b.r - a.r; });
    for (var k = 0; k < left && order.length; k++) floors[order[k % order.length].i] += 1;
    return floors;
  }

  /* 비중: 계산용(소수, 합 1)과 표시용(정수 %, 합 100) */
  function shareFractions(criteria, weights) {
    var sum = criteria.reduce(function (a, c) { return a + (weights[c.id] || 0); }, 0);
    var out = {};
    criteria.forEach(function (c) { out[c.id] = sum ? (weights[c.id] || 0) / sum : 0; });
    return out;
  }
  function shares(criteria, weights) {
    var f = shareFractions(criteria, weights);
    var out0 = {};
    var anyOn = criteria.some(function (c) { return f[c.id] > 0; });
    if (!anyOn) { criteria.forEach(function (c) { out0[c.id] = 0; }); return out0; }
    var r = roundTo(criteria.map(function (c) { return f[c.id] * 100; }), 100);
    var out = {};
    criteria.forEach(function (c, i) { out[c.id] = r[i]; });
    return out;
  }

  function ratingOf(state, option, id) {
    var r = state.ratings && state.ratings[option] && state.ratings[option][id];
    return typeof r === 'number' ? r : null;
  }

  /* weightsOverride: 민감도 분석처럼 중요도를 바꿔 다시 계산할 때 사용 */
  function compute(state, weightsOverride) {
    var weights = weightsOverride || state.weights;
    var frac = shareFractions(state.criteria, weights);
    var options = state.options.map(function (name) {
      var per = {}, total = 0, unknown = [];
      state.criteria.forEach(function (c) {
        var r = ratingOf(state, name, c.id);
        if (r === null) unknown.push(c.id);
        var used = r === null ? NEUTRAL : r;
        var contrib = used * frac[c.id];
        per[c.id] = { rating: r, used: used, contrib: contrib };
        total += contrib;
      });
      return { name: name, total: total, score: Math.round(total), per: per, unknown: unknown };
    });
    var ranking = options.slice().sort(function (a, b) { return b.total - a.total; });
    return {
      options: options,
      ranking: ranking,
      shares: shares(state.criteria, weights),
      fractions: frac
    };
  }

  /* 예시 시나리오를 불러온 뒤 사용자가 기준·중요도·점수·선택지를 바꿨는지 확인하는 표시값 */
  function signature(state) {
    var ids = state.criteria.map(function (c) { return c.id; }).sort();
    return JSON.stringify({
      o: state.options,
      c: ids.map(function (id) { return [id, state.weights[id]]; }),
      r: state.options.map(function (o) { return ids.map(function (id) { return ratingOf(state, o, id); }); })
    });
  }

  Pickwise.scoring = { compute: compute, shares: shares, roundTo: roundTo, signature: signature, NEUTRAL: NEUTRAL };
})();
