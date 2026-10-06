/* ============================================================
   화면 6 · 다음 결정 (담당: 조원8)
   - 이번 결정과 이어지는 다음 고민 추천 (data/next-decisions.js)
     · 이번에 중요도가 높았던 기준과 관련된 항목을 위로
     · 누르면 주제·선택지가 채워진 채로 새 결정 시작
   - 새로운 고민 직접 입력 → "새 결정 시작하기"
   - 내 결정 기록 (이 기기에만 저장, js/storage.js)
   ============================================================ */
(function () {
  var SHOW_HISTORY = 5;

  function suggestions(state) {
    var all = Pickwise.data.nextDecisions;
    var list = (all[state.category] || all.etc).slice();
    var r = Pickwise.scoring.compute(state);
    var winner = r.ranking[0].name;
    // 관련 기준의 비중 합이 큰 순서로
    var rel = function (item) {
      return (item.related || []).reduce(function (a, id) { return a + (r.shares[id] || 0); }, 0);
    };
    list.sort(function (a, b) { return rel(b) - rel(a); });
    var items = list.map(function (item) {
      var vars = { winner: winner };
      return {
        title: item.title,
        topic: Pickwise.explain.fill(item.topic, vars),
        options: item.options.slice(),
        icon: item.icon,
        hot: rel(item) > 0
      };
    });
    // 데이터셋의 다음 결정(예시라면 그 예시의 것, 직접 입력이면 맞는 시나리오의 것)을 맨 위에. 제목만 있으므로 선택지는 직접 입력
    // 맞는 시나리오가 없으면 데이터셋 다음 결정을 쓰지 않는다 (10/06: 이직에 "운동 장비 구매", 냉장고에 "노트북 가방 선택"이 나오던 문제)
    var p = Pickwise.explain.presetOf(state);
    var sc = !p && Pickwise.matchScenario ? Pickwise.matchScenario(state) : '';
    var titles = p ? p.sample.next : (sc ? Pickwise.data.criteria.scenarios[sc].next : []);
    // 선택지 이름의 단어 (예: "한강 피크닉" → 한강·피크닉)
    var words = function (name) { return String(name).split(/[\s()·,]+/).filter(function (w) { return w.length >= 2; }); };
    var winWords = words(winner);
    var loseWords = [];
    state.options.forEach(function (o) { if (o !== winner) loseWords = loseWords.concat(words(o)); });
    titles = titles.filter(function (t) {   // 1위가 아닌 선택지용 다음 결정은 뺀다 (예: 한강 피크닉이 1위인데 "볼 영화 선택")
      return !loseWords.some(function (w) { return t.indexOf(w) > -1 && winWords.indexOf(w) < 0; });
    });
    if (titles.length) {
      var own = titles.map(function (t) {
        // "한강 피크닉" + "피크닉 장소 선택" → "한강 피크닉 장소 선택" (같은 단어 두 번 쓰지 않게)
        var shared = winWords.filter(function (w) { return t.indexOf(w) === 0; })[0];
        return { title: t, topic: winner + ' ' + (shared ? t.slice(shared.length).trim() : t), options: ['', ''], icon: 'spark', hot: true };
      });
      items = own.concat(items).slice(0, 6);
    }
    return items;
  }

  function render(el, state) {
    var esc = Pickwise.esc, icon = Pickwise.icon;
    var items = suggestions(state);
    var rk = Pickwise.scoring.compute(state).ranking;
    var winner = rk[0].name;
    var tie = rk.length > 1 && Math.abs(rk[0].total - rk[1].total) < 0.5;

    el.innerHTML =
      '<div class="s6-head"><h2>이 결정 다음에도 고려할 것이 있나요?</h2>' +
        (tie ? '<p>이 고민과 이어서 생각해 볼 만한 결정들이에요.</p>'
             : '<p><strong>' + esc(Pickwise.josa(winner, '을를')) + '</strong> 고른 다음 이어서 고민하게 되는 것들이에요.</p>') + '</div>' +
      '<section class="block">' +
        '<div class="block-head"><span class="num">' + icon('spark', 12) + '</span><span class="label">추천 다음 결정</span></div>' +
        '<div class="s6-list" data-s6="list">' +
          items.map(function (it, i) {
            return '<button type="button" class="s6-item" data-i="' + i + '">' +
              '<span class="s6-icon">' + icon(it.icon, 18) + '</span>' +
              '<span class="s6-text"><strong>' + esc(it.title) + '</strong><small>' + esc(it.topic) + '</small></span>' +
              '<span class="s6-go" aria-hidden="true">›</span></button>';
          }).join('') +
        '</div>' +
        '<p class="rule-note">고민 분류와 이번에 중요하게 본 기준으로 고른 추천이에요 (규칙 기반).</p>' +
      '</section>' +
      '<section class="block">' +
        '<div class="block-head"><span class="num">+</span><label for="s6-new">새로운 고민 직접 입력</label></div>' +
        '<div class="field">' + icon('doc', 18) +
          '<input id="s6-new" type="text" maxlength="60" autocomplete="off" placeholder="예: 이사하면 인터넷은 어디로 할까?"></div>' +
      '</section>' +
      '<section class="block s6-history">' +
        '<div class="block-head"><span class="num">' + icon('clock', 12) + '</span><span class="label">내 결정 기록</span><small class="s6-local">이 기기에만 저장돼요</small></div>' +
        '<ul class="s6-records" data-s6="records"></ul>' +
      '</section>';

    var q = function (n) { return el.querySelector('[data-s6="' + n + '"]'); };

    q('list').addEventListener('click', function (e) {
      var b = e.target.closest('[data-i]');
      if (!b) return;
      var it = items[+b.getAttribute('data-i')];
      // categoryHint: 새 주제 문장에 분류 단어가 없어도 이전 결정과 같은 분류로 이어지게
      Pickwise.restart({ topic: it.topic, options: it.options, parentTopic: state.topic, categoryHint: state.category });
      Pickwise.toast('다음 결정을 채워 두었어요. 선택지를 고치고 시작해 보세요.');
    });

    function drawRecords() {
      var all = Pickwise.storage.list(), recs = all.slice(0, SHOW_HISTORY);
      var more = all.length > SHOW_HISTORY ? '<li class="empty">최근 ' + SHOW_HISTORY + '개만 보여요 (전체 ' + all.length + '개)</li>' : '';   // 10/06: 기록이 더 있다는 걸 알 수 있게
      q('records').innerHTML = recs.length
        ? recs.map(function (rec) {
            var mine = rec.id === Pickwise.state.decisionId;
            return '<li class="' + (mine ? 'now' : '') + '">' +
              '<div class="s6-rec-main"><strong>' + esc(rec.topic) + '</strong>' +
                '<small>' + esc(rec.date) + ' · 추천: ' + esc(rec.winner) +
                (rec.parentTopic ? ' · 이전 고민: ' + esc(rec.parentTopic) : '') + (mine ? ' · 방금 한 결정' : '') + '</small></div>' +
              '<button type="button" data-rm="' + esc(rec.id) + '" aria-label="' + esc(rec.topic) + ' 기록 지우기">' + icon('x', 11) + '</button></li>';
          }).join('') + more
        : '<li class="empty">아직 저장된 결정이 없어요.</li>';
    }
    q('records').addEventListener('click', function (e) {
      var b = e.target.closest('[data-rm]');
      if (!b) return;
      Pickwise.storage.remove(b.getAttribute('data-rm'));
      drawRecords();
    });
    drawRecords();
  }

  /* 다음 버튼 = "새 결정 시작하기": 직접 입력한 고민이 있으면 그 주제로 시작 */
  function onNext(state) {
    var input = document.getElementById('s6-new');
    var topic = input ? input.value.trim() : '';
    Pickwise.restart(topic ? { topic: topic, parentTopic: state.topic } : null);
  }

  Pickwise.registerScreen(6, { render: render, onNext: onNext, nextLabel: '새 결정 시작하기' });
})();
