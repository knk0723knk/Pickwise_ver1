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

    var anyUnknown = r.options.some(function (o) { return o.unknown.length > 0; });

    /* ---------- 점수 계산 근거 (10/07 크로스 피드백: "점수가 어떻게 매겨지는지 설명이 더 있으면") ---------- */
    var calcHtml = (function () {
      var hasFacts = state.criteria.some(function (c) {
        return state.options.some(function (o) { var f = state.facts && state.facts[o] && state.facts[o][c.id]; return f && f.text && !f.edited; });
      });
      // 실제 수치가 있는 기준 하나로 예를 든다 (가장 높은 점수 / 가장 낮은 점수)
      var exLine = '';
      if (hasFacts) {
        state.criteria.some(function (c) {
          var rows = state.options.map(function (o) {
            var f = state.facts && state.facts[o] && state.facts[o][c.id];
            var v = state.ratings[o] && state.ratings[o][c.id];
            return f && f.text && !f.edited && typeof v === 'number' ? { o: o, text: f.text, v: v } : null;
          }).filter(Boolean);
          if (rows.length < 2) return false;
          rows.sort(function (a, b) { return b.v - a.v; });
          var hi = rows[0], lo = rows[rows.length - 1];
          if (hi.v === lo.v) return false;
          exLine = '예) ' + c.name + ': ' + hi.o + ' ' + hi.text + ' → ' + Math.round(hi.v) + '점, ' + lo.o + ' ' + lo.text + ' → ' + Math.round(lo.v) + '점';
          return true;
        });
      }
      var step1 = hasFacts
        ? '<p><b>① 기준 점수 (0~100)</b> 선택지끼리 실제 수치를 비교해서, 가장 유리한 쪽이 100점, 가장 불리한 쪽이 0점, 그 사이는 차이만큼 비율로 정해요.' +
            (exLine ? '<br><span class="s5-calc-ex">' + esc(exLine) + '</span>' : '') +
            (state.options.length === 2 ? '<br>선택지가 2개면 한쪽은 100점, 다른 쪽은 0점이 돼요. 그래서 실제 차이가 작아도 점수 차이는 크게 보일 수 있어요. 막대 아래 실제 수치를 함께 봐 주세요.' : '') + '</p>'
        : '<p><b>① 기준 점수 (0~100)</b> 설명글에서 찾은 표현이나 직접 고른 별로 정해요. 별 1개 0점 · 2개 25점 · 3개 50점(보통) · 4개 75점 · 5개 100점이고, 모름은 50점으로 계산해요.</p>';
      var step2 = '<p><b>② 비중</b> 기준마다 정한 중요도를 모두 더한 값 중에서 그 기준이 차지하는 몫이에요.</p>';
      var w = r.ranking[0];
      var parts = state.criteria.map(function (c) {
        return c.name + ' ' + Math.round(w.per[c.id].used) + '점×' + r.shares[c.id] + '%';
      });
      var step3 = '<p><b>③ 종합 점수</b> 기준 점수 × 비중을 모두 더해요.<br><span class="s5-calc-ex">' +
        esc(w.name + ': ' + parts.join(' + ') + ' = ' + w.score + '점') + '</span></p>';
      return '<details class="s5-box s5-calc"><summary class="s5-box-title">' + icon('chart', 16) + '점수는 이렇게 계산했어요</summary>' +
        step1 + step2 + step3 + '</details>';
    })();

    /* ---------- 결과 복사·공유용 글 (10/07 크로스 피드백: 친구·가족과 함께 결정할 때) ---------- */
    function shareText() {
      var lines = ['[Pickwise] ' + state.topic];
      lines.push(tie ? '결과: 점수가 같아요' : '추천: ' + winner.name + ' (' + winner.score + '점)');
      lines.push('점수: ' + r.ranking.map(function (o) { return o.name + ' ' + o.score + '점'; }).join(' · '));
      lines.push((tie ? '요약: ' : '핵심 이유: ') + t.summary);
      lines.push('');
      lines.push('기준별 점수 (비중)');
      state.criteria.forEach(function (c) {
        lines.push('- ' + c.name + ' (' + r.shares[c.id] + '%): ' + r.options.map(function (o) {
          var p = o.per[c.id];
          return o.name + ' ' + (p.rating === null ? '모름' : Math.round(p.rating));
        }).join(' · '));
      });
      lines.push('');
      lines.push('나도 비교해 보기: https://pickwisever1.vercel.app');
      return lines.join('\n');
    }
    var canShare = !!navigator.share && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;   // 휴대폰에서만 "공유하기"

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
      // 선택지 3개: 2+1로 놓이면 빈칸이 생겨서, 휴대폰은 1위 카드를 맨 위 한 줄로·PC는 3개를 한 줄로 (screen5.css .three)
      '<div class="s5-scores' + (state.options.length === 3 ? ' three' + (tie ? ' tie' : '') : '') + '" style="--n:' + Math.min(state.options.length, 2) + '">' + cards + '</div>' +
      '<section class="s5-summary">' + icon('bulb', 18) + '<div><div class="s5-summary-title">' +
        (tie ? '결과 요약' : esc(Pickwise.josa(winner.name, '이가')) + ' 더 나은 핵심 이유') + '</div><p>' + esc(t.summary) + '</p></div></section>' +

      // 결과 공유 상자 (10/07: 더 눈에 띄게. 휴대폰은 기본 공유 창 → 카카오톡·인스타그램 DM 등 앱 선택)
      '<section class="s5-sharebox">' +
        '<div class="s5-sharebox-title">' + icon('users', 18) + '친구·가족과 함께 결정해 보세요</div>' +
        '<p>점수·핵심 이유·기준별 비교를 짧은 글로 정리해 드려요.</p>' +
        '<div class="s5-share-btns">' +
          (canShare
            ? '<button type="button" class="s5-share-main" data-s5="share">' + icon('link', 16) + '결과 공유하기</button>' +
              '<button type="button" class="s5-share-sub" data-s5="copy">' + icon('doc', 14) + '복사만 하기</button>'
            : '<button type="button" class="s5-share-main" data-s5="copy">' + icon('doc', 16) + '결과 복사하기</button>') +
        '</div>' +
        (canShare ? '<p class="s5-share-note">공유 창에서 카카오톡·인스타그램 DM 등을 고르세요. 글이 빠지면 대화창에 붙여넣기 하면 돼요(미리 복사해 둬요).</p>'
                  : '<p class="s5-share-note">복사한 글을 카카오톡이나 메모에 붙여넣으면 돼요.</p>') +
      '</section>' +
      '<textarea class="s5-share-text" data-s5="share-text" readonly hidden aria-label="복사할 결과"></textarea>' +

      '<section class="s5-box"><div class="s5-box-title">' + icon('chart', 16) + '항목별 비교</div>' +
        // 그래프 읽는 법은 그래프보다 먼저 (제목 바로 아래)
        '<p class="hint s5-howto">기준별 점수(100점 만점)예요. 비중이 클수록 종합 점수에 크게 반영돼요.</p>' +
        '<div class="s5-legend">' + legend + (anyUnknown ? '<span><i class="s5-key-unknown"></i>모름 (50점으로 계산)</span>' : '') + '</div>' +
        rows + '</section>' +
      calcHtml +

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

    /* ---------- 결과 복사·공유 ---------- */
    function showManualCopy(text) {
      // 새 복사 방법이 막힌 환경(일부 브라우저·앱 안 브라우저·파일로 연 경우): 예전 복사 방법을 한 번 더 시도하고,
      // 그래도 안 되면 글을 보여주고 직접 복사하게
      var ta = q('share-text');
      ta.value = text; ta.hidden = false; ta.focus(); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      if (ok) {
        ta.hidden = true;
        Pickwise.toast('결과를 복사했어요. 카톡이나 메모에 붙여넣어 보세요.');
      } else {
        Pickwise.toast('아래 글을 길게 눌러(또는 Ctrl+C) 복사해 주세요.');
      }
    }
    q('copy').addEventListener('click', function () {
      var text = shareText();
      var done = function () { Pickwise.toast('결과를 복사했어요. 카톡이나 메모에 붙여넣어 보세요.'); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { showManualCopy(text); });
      } else {
        showManualCopy(text);
      }
    });
    /* 공유하기: ① 결과 글을 먼저 몰래 복사해 두고 (인스타 DM 등은 글을 빼고 링크만 받기도 해서)
                 ② 휴대폰 기본 공유 창을 띄운다 → 사용자가 카카오톡·인스타그램 DM·문자 등을 고름 */
    function silentCopy(text) {
      try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).catch(function () {}); return; } } catch (e) {}
      try {
        var tmp = document.createElement('textarea');
        tmp.value = text; tmp.setAttribute('readonly', ''); tmp.style.position = 'fixed'; tmp.style.left = '-9999px';
        document.body.appendChild(tmp); tmp.select(); document.execCommand('copy'); document.body.removeChild(tmp);
      } catch (e) {}
    }
    if (q('share')) q('share').addEventListener('click', function () {
      var text = shareText().replace(/\n+나도 비교해 보기: \S+$/, '');   // 주소는 따로 넘김(앱이 링크 미리보기로 보여줌)
      silentCopy(text + '\n\n나도 비교해 보기: https://pickwisever1.vercel.app');
      navigator.share({ title: 'Pickwise 결과 · ' + state.topic, text: text, url: 'https://pickwisever1.vercel.app' })
        .catch(function (err) {
          if (err && err.name === 'AbortError') return;   // 사용자가 공유 창을 닫은 경우
          Pickwise.toast('공유 창을 열 수 없어서 결과를 복사해 뒀어요. 대화창에 붙여넣어 주세요.');
        });
    });

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
