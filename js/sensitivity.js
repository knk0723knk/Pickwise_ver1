/* ============================================================
   민감도 분석 (담당: 조원7)
   - 기준 하나의 중요도(0~100, 5 단위)만 바꾸고 나머지는 그대로 둔 채 다시 계산해서,
     1위가 바뀌는 지점을 찾는다.
   - 사용:
       var s = Pickwise.sensitivity.analyze(state);
       s.flips   // [{ id, name, dir: 'up'|'down', to: 점수, from: 지금 점수, newWinner }] 가까운 순
       s.text    // 대표 문장 1개 ("날씨 중요도를 3점 이하로 내리면 이집트가 1위가 돼요.")
   ============================================================ */
(function () {
  var MAX = 100, STEP = 5;

  function winnerOf(state, weights) {
    var r = Pickwise.scoring.compute(state, weights);
    // 동점이면 바뀌지 않은 것으로 본다
    if (r.ranking.length > 1 && Math.abs(r.ranking[0].total - r.ranking[1].total) < 0.01) return null;
    return r.ranking[0].name;
  }

  function analyze(state) {
    var base = Pickwise.scoring.compute(state);
    var current = base.ranking[0].name;
    var flips = [];

    state.criteria.forEach(function (c) {
      var from = state.weights[c.id];
      var found = null;
      // 지금 점수에서 가까운 쪽부터 위·아래로 한 칸씩 바꿔 본다
      for (var step = STEP; step <= MAX && !found; step += STEP) {
        [from + step, from - step].forEach(function (v) {
          if (found || v < 0 || v > MAX) return;
          var w = {};
          Object.keys(state.weights).forEach(function (k) { w[k] = state.weights[k]; });
          w[c.id] = v;
          if (!Object.keys(w).some(function (k) { return w[k] > 0; })) return;
          var who = winnerOf(state, w);
          if (who && who !== current) found = { id: c.id, name: c.name, dir: v > from ? 'up' : 'down', to: v, from: from, newWinner: who };
        });
      }
      if (found) flips.push(found);
    });

    flips.sort(function (a, b) { return Math.abs(a.to - a.from) - Math.abs(b.to - b.from); });

    var T = Pickwise.data.templates.sensitivity;
    var fill = Pickwise.explain.fill;
    var seed = state.topic + '|' + current;
    var text;
    if (flips.length) {
      var f = flips[0];
      var list = f.dir === 'up' ? T.flip : (T.flipDown || T.flip);
      text = fill(list[seed.length % list.length], { crit: f.name, to: f.to, loser: f.newWinner, winner: current });
    } else if (base.ranking.length > 1 && Math.abs(base.ranking[0].total - base.ranking[1].total) < 0.5 && T.tieStable) {
      text = T.tieStable[0];   // 동점인데 "영화가 1위예요. 흔들리지 않는 결과예요"라고 하지 않게
    } else {
      text = fill(T.stable[0], { winner: current });
    }
    return { winner: current, flips: flips, text: text };
  }

  Pickwise.sensitivity = { analyze: analyze, winnerOf: winnerOf };
})();
