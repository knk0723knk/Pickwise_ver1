/* ============================================================
   화면 5 · 분석 결과 (담당: 조원6, 설명·민감도는 조원7 파일 사용)
   - 종합 점수 카드 (1위 표시)
   - "A가 B보다 나은 핵심 이유" 한 줄 요약
   - 항목별 비교 막대그래프 (선택지 색은 A·B·C·D 순서로 고정)
   - 가장 큰 차이, AI 설명(규칙 기반), 확신도, 민감도 분석, 참고 자료
   - 결과를 이 기기의 결정 기록에 저장
   ============================================================ */
(function () {
  var LETTERS = ['A', 'B', 'C', 'D'];

  function saveRecord(state, r, tie) {
    if (!state.decisionId) state.decisionId = Pickwise.storage.newId();
    Pickwise.storage.save({
      id: state.decisionId,
      date: new Date().toISOString().slice(0, 10),
      topic: state.topic,
      category: state.category,
      options: state.options.slice(),
      winner: tie ? '동점' : r.ranking[0].name,
      scores: r.options.map(function (o) { return { name: o.name, score: o.score }; }),
      criteria: state.criteria.map(function (c) { return c.name; }),
      parentTopic: state.parentTopic || ''
    });
  }

  function render(el, state) {
    var esc = Pickwise.esc, icon = Pickwise.icon;
    var r = Pickwise.scoring.compute(state);
    var t = Pickwise.explain.build(state, r);
    var sens = Pickwise.sensitivity.analyze(state);
    var winner = r.ranking[0];
    var tie = r.ranking.length > 1 && Math.abs(r.ranking[0].total - r.ranking[1].total) < 0.5;
    var color = function (name) { return 'var(--opt' + (state.options.indexOf(name) + 1) + ')'; };
    saveRecord(state, r, tie);

    /* ---------- 점수 카드 ---------- */
    var cards = r.options.map(function (o, i) {
      var isWin = o.name === winner.name && !tie;
      return '<div class="s5-score' + (isWin ? ' win' : '') + '">' +
        '<div class="s5-score-top"><span class="s5-dot" style="background:' + color(o.name) + '"></span>' +
          '<span class="s5-opt">' + LETTERS[i] + ' · ' + esc(o.name) + '</span></div>' +
        '<div class="s5-num"><span><strong>' + o.score + '</strong>점</span>' +
          (isWin ? '<span class="s5-badge">' + icon('star', 12) + '추천</span>' : '') + '</div>' +
      '</div>';
    }).join('');

    /* ---------- 항목별 막대그래프 (가로 막대, 별점 1~5) ---------- */
    var legend = state.options.map(function (o, i) {
      return '<span><i style="background:' + color(o) + '"></i>' + LETTERS[i] + ' ' + esc(o) + '</span>';
    }).join('');
    var rows = state.criteria.map(function (c) {
      var bars = r.options.map(function (o) {
        var p = o.per[c.id];
        var unknown = p.rating === null;
        var f = state.facts && state.facts[o.name] && state.facts[o.name][c.id];
        var fact = f && f.text ? f : null;
        var label = unknown ? '모름(50점으로 계산)' : (fact ? fact.text + ' · ' : '') + Math.round(p.rating) + '점';
        return '<div class="s5-bar-row" title="' + esc(o.name + ' · ' + c.name + ' ' + label) + '">' +
          '<span class="s5-bar-name">' + esc(o.name) + '</span>' +
          '<span class="s5-track"><span class="s5-bar' + (unknown ? ' unknown' : '') + '" style="width:' + p.used + '%;--c:' + color(o.name) + '"></span></span>' +
          '<span class="s5-bar-val">' + (unknown ? '모름' : Math.round(p.rating) + '점') + '</span>' +
          (fact ? '<span class="s5-fact">' + esc(fact.text) + (fact.estimated ? ' <em>추정</em>' : '') + (fact.edited ? ' <i>· 점수 직접 고침</i>' : '') + '</span>' : '') +
        '</div>';
      }).join('');
      return '<div class="s5-crit">' +
        '<div class="s5-crit-head"><span>' + icon(c.icon, 15) + esc(c.name) + '</span><small>비중 ' + r.shares[c.id] + '%</small></div>' +
        bars + '</div>';
    }).join('');

    /* ---------- 가장 큰 차이 ---------- */
    var biggest = t.biggest.length
      ? t.biggest.map(function (b) {
          return '<span class="s5-diff">' + esc(b.name) + ' <small>' + esc(b.lead) + ' +' + Math.round(b.diff) + '점</small></span>';
        }).join('')
      : '<span class="hint">두 선택지가 모든 기준에서 같은 점수예요.</span>';

    /* ---------- 확신도 ---------- */
    var cf = t.confidence;
    var focusLink = '';
    if (cf.focus && cf.level !== 'high') {
      focusLink = ' <button type="button" class="s5-link" data-s5="goto4">' + esc(cf.focus.name) + ' 정보 입력하러 가기 →</button>';
    }

    /* ---------- 참고 자료 ---------- */
    var files = (state.attachments || []).filter(function (a) { return state.options.indexOf(a.option) > -1; });
    var filesHtml = files.length
      ? '<section class="s5-box"><div class="s5-box-title">' + icon('doc', 16) + '참고 자료</div><ul class="s5-files">' +
          files.map(function (a) { return '<li><b>' + esc(a.option) + '</b> ' + esc(a.name) + '</li>'; }).join('') +
        '</ul><p class="hint">첨부 내용은 점수에 반영되지 않아요.</p></section>'
      : '';

    el.innerHTML =
      '<div class="s5-head"><h2>' + esc(state.topic) + '</h2><p>입력한 기준과 중요도로 ' + state.options.length + '개 선택지를 비교했어요.</p></div>' +
      '<div class="s5-scores" style="--n:' + Math.min(state.options.length, 2) + '">' + cards + '</div>' +
      '<section class="s5-summary">' + icon('bulb', 18) + '<div><div class="s5-summary-title">' +
        (tie ? '결과 요약' : esc(Pickwise.josa(winner.name, '이가')) + ' 더 나은 핵심 이유') + '</div><p>' + esc(t.summary) + '</p></div></section>' +

      '<section class="s5-box"><div class="s5-box-title">' + icon('chart', 16) + '항목별 비교</div>' +
        '<div class="s5-legend">' + legend + '</div>' + rows +
        '<p class="hint">막대는 기준별 점수(100점 만점)예요. 비중이 클수록 종합 점수에 크게 반영돼요.</p></section>' +

      '<section class="s5-box"><div class="s5-box-title">' + icon('target', 16) + '가장 큰 차이</div><div class="s5-diffs">' + biggest + '</div></section>' +

      '<section class="s5-box s5-ai"><div class="s5-box-title">' + icon('spark', 16) + 'AI 설명</div>' +
        t.explain.map(function (s) { return '<p>' + esc(s) + '</p>'; }).join('') +
        '<p class="rule-note">' + esc(t.ruleNote) + '</p></section>' +

      '<section class="s5-box"><div class="s5-box-title">' + icon('shield', 16) + '결과 확신도 <span class="s5-conf ' + cf.level + '">' + cf.label + '</span></div>' +
        '<p class="s5-text">' + esc(cf.text) + focusLink + '</p></section>' +

      '<section class="s5-box s5-sens"><div class="s5-box-title">' + icon('activity', 16) + '민감도 분석</div>' +
        '<p class="s5-text"><strong>' + esc(sens.text) + '</strong></p>' +
        '<button type="button" class="pill-btn" data-s5="sens-toggle" aria-expanded="false">' + icon('refresh', 14) + '중요도 바꿔 보기</button>' +
        '<div class="s5-sens-panel" data-s5="sens-panel" hidden></div></section>' +

      filesHtml;

    /* ---------- 데이터팀 예시: 이렇게 본다면? · 계산 전제 · 출처 ---------- */
    var pr = Pickwise.explain.presetOf(state);
    if (pr) {
      var sm = pr.sample, extra = '';
      if (pr.unchanged && sm.analysis.whatIf.length) {
        extra += '<section class="s5-box"><div class="s5-box-title">' + icon('refresh', 16) + '이렇게 본다면?</div><ul class="s5-whatif">' +
          sm.analysis.whatIf.map(function (w) {
            return '<li><span>' + esc(w.label) + '</span><b>1위 ' + esc(w.winner) + '</b><small>' +
              esc(w.scores.map(function (x) { return x.name + ' ' + x.score; }).join(' · ')) + '</small></li>';
          }).join('') + '</ul><p class="rule-note">미리 계산해 둔 결과예요.</p></section>';
      }
      if (sm.notes.length) {
        extra += '<details class="s5-box s5-notes"><summary class="s5-box-title">' + icon('doc', 16) + '계산 전제와 한계</summary>' +
          sm.notes.map(function (n) { return '<p>' + esc(n) + '</p>'; }).join('') + '</details>';
      }
      if (sm.sources.length) {
        extra += '<section class="s5-box"><div class="s5-box-title">' + icon('link', 16) + '자료 출처</div><ul class="s5-sources">' +
          sm.sources.map(function (src) {
            var name = src.url ? '<a href="' + esc(src.url) + '" target="_blank" rel="noopener noreferrer">' + esc(src.label) + '</a>' : esc(src.label);
            return '<li>' + name + (src.asOf ? ' <small>(' + esc(src.asOf) + ')</small>' : '') + (src.note ? '<br><small>' + esc(src.note) + '</small>' : '') + '</li>';
          }).join('') + '</ul></section>';
      }
      el.insertAdjacentHTML('beforeend', extra);
    }

    var q = function (n) { return el.querySelector('[data-s5="' + n + '"]'); };

    if (q('goto4')) q('goto4').addEventListener('click', function () { Pickwise.back(); });

    /* ---------- 민감도: 중요도를 바꿔 보는 슬라이더 (원래 설정은 바뀌지 않음) ---------- */
    var trial = {};
    function resetTrial() { Object.keys(state.weights).forEach(function (k) { trial[k] = state.weights[k]; }); }
    resetTrial();

    function drawSens() {
      var tr = Pickwise.scoring.compute(state, trial);
      var top = tr.ranking[0];
      var changed = top.name !== winner.name && Math.abs(tr.ranking[0].total - tr.ranking[1].total) >= 0.5;
      var res = tr.options.map(function (o) {
        return '<div class="s5-bar-row"><span class="s5-bar-name">' + esc(o.name) + '</span>' +
          '<span class="s5-track"><span class="s5-bar" style="width:' + o.total + '%;--c:' + color(o.name) + '"></span></span>' +
          '<span class="s5-bar-val">' + o.score + '점</span></div>';
      }).join('');
      q('sens-panel').querySelector('[data-s5="sens-result"]').innerHTML =
        '<p class="s5-sens-msg' + (changed ? ' changed' : '') + '">' +
          (changed ? '이렇게 바꾸면 <strong>' + esc(Pickwise.josa(top.name, '이가')) + '</strong> 1위가 돼요.'
                   : '이렇게 바꿔도 <strong>' + esc(Pickwise.josa(winner.name, '이가')) + '</strong> 1위예요.') + '</p>' + res;
    }

    function buildSensPanel() {
      var p = q('sens-panel');
      p.innerHTML = '<p class="hint">슬라이더를 움직여 보세요. 입력한 원래 중요도는 바뀌지 않아요.</p>' +
        state.criteria.map(function (c) {
          return '<div class="s5-sl"><label for="s5-w-' + esc(c.id) + '">' + esc(c.name) + '</label>' +
            '<input type="range" min="0" max="100" step="5" id="s5-w-' + esc(c.id) + '" data-tw="' + esc(c.id) + '" value="' + trial[c.id] + '">' +
            '<output data-tv="' + esc(c.id) + '">' + trial[c.id] + '</output></div>';
        }).join('') +
        '<div data-s5="sens-result"></div>' +
        '<button type="button" class="pill-btn" data-s5="sens-reset">' + icon('refresh', 14) + '원래대로</button>';
      p.addEventListener('input', function (e) {
        var id = e.target.getAttribute('data-tw');
        if (!id) return;
        trial[id] = +e.target.value;
        if (!Object.keys(trial).some(function (k) { return trial[k] > 0; })) { trial[id] = 5; e.target.value = 5; }
        p.querySelector('[data-tv="' + id + '"]').textContent = trial[id];
        drawSens();
      });
      q('sens-reset').addEventListener('click', function () {
        resetTrial();
        state.criteria.forEach(function (c) {
          p.querySelector('[data-tw="' + c.id + '"]').value = trial[c.id];
          p.querySelector('[data-tv="' + c.id + '"]').textContent = trial[c.id];
        });
        drawSens();
      });
      drawSens();
    }

    q('sens-toggle').addEventListener('click', function () {
      var p = q('sens-panel'), btn = q('sens-toggle');
      if (!p.innerHTML) buildSensPanel();
      p.hidden = !p.hidden;
      btn.setAttribute('aria-expanded', String(!p.hidden));
    });
  }

  Pickwise.registerScreen(5, { render: render, nextLabel: '다음 결정 보기' });
})();
