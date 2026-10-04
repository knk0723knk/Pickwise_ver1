/* ============================================================
   화면 1 · 결정 입력 (담당: 조원2)
   - 결정 주제 입력 → 주제 분류(data/topics.js)
   - 선택지 2~4개 입력·추가·삭제
   - "예시로 체험하기" → data/example.js 내용으로 채움
   ============================================================ */
(function () {
  var LETTERS = ['A', 'B', 'C', 'D'];
  var MIN = 2, MAX = 4;
  var PLACEHOLDERS = ['예: 그리스', '예: 이집트', '예: 스페인', '예: 베트남'];

  var ICON_BULB = '<svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M24 4v4M8 10l3 3M40 10l-3 3M4 24h4M40 24h4"/>' +
    '<path d="M17 30c-2.5-2-4-5-4-8.5a11 11 0 0 1 22 0c0 3.5-1.5 6.5-4 8.5-1.2 1-2 2.3-2 3.8V35H19v-1.2c0-1.5-.8-2.8-2-3.8z"/>' +
    '<path d="M19 39h10M21 43h6"/><path d="M21 26l3-4 3 4"/></svg>';
  var ICON_PLAY = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  var ICON_DOC = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>';
  var ICON_PLUS = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  var ICON_X = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  /* 주제 문장 → 분류 { id, name } : 단어가 가장 많이 맞는 분류 */
  function classify(text) {
    var t = (text || '').toLowerCase();
    var data = Pickwise.data.topics;
    var best = null, bestCount = 0;
    data.categories.forEach(function (c) {
      var count = c.words.filter(function (w) { return t.indexOf(w.toLowerCase()) > -1; }).length;
      if (count > bestCount) { best = c; bestCount = count; }
    });
    if (!best) best = data.categories.filter(function (c) { return c.id === data.fallback; })[0];
    return { id: best.id, name: best.name, matched: bestCount > 0 };
  }

  function render(el, state) {
    el.innerHTML =
      '<div class="s1-intro">' + ICON_BULB +
        '<h2>어떤 결정이 고민되세요?</h2>' +
        '<p>비교하고 싶은 주제와 선택지를 입력하면<br>내 기준에 맞는 선택을 함께 정리해 드려요.</p>' +
        '<button class="s1-demo" type="button" data-s1="demo">' + ICON_PLAY + '예시로 체험하기 <span class="s1-demo-sub">그리스 vs 이집트</span></button>' +
      '</div>' +
      '<section class="block">' +
        '<div class="block-head"><span class="num">1</span><label for="s1-topic">결정 주제 입력</label></div>' +
        '<div class="field" data-s1="topic-field">' + ICON_DOC +
          '<input id="s1-topic" type="text" maxlength="60" autocomplete="off" placeholder="예: 그리스 vs 이집트 어디로 여행갈지" value="' + esc(state.topic) + '">' +
        '</div>' +
        '<div class="s1-detect" data-s1="detect" aria-live="polite"></div>' +
      '</section>' +
      '<section class="block">' +
        '<div class="block-head"><span class="num">2</span><span class="label" id="s1-opt-label">선택지 입력</span>' +
          '<button class="pill-btn" type="button" data-s1="add">' + ICON_PLUS + '선택지 추가</button></div>' +
        '<div class="s1-options" data-s1="options" role="group" aria-labelledby="s1-opt-label"></div>' +
        '<p class="hint" data-s1="opt-hint"></p>' +
      '</section>';

    var q = function (name) { return el.querySelector('[data-s1="' + name + '"]'); };
    var topicInput = el.querySelector('#s1-topic');

    function renderOptions() {
      var opts = Pickwise.state.options;
      q('options').innerHTML = opts.map(function (v, i) {
        return '<div class="s1-opt">' +
          '<span class="s1-letter" aria-hidden="true">' + LETTERS[i] + '</span>' +
          '<div class="field" data-s1-field="' + i + '"><input id="s1-opt-' + i + '" data-i="' + i + '" type="text" maxlength="20" autocomplete="off" ' +
            'aria-label="선택지 ' + LETTERS[i] + '" placeholder="' + PLACEHOLDERS[i] + '" value="' + esc(v) + '"></div>' +
          '<button type="button" class="s1-del" data-del="' + i + '" aria-label="선택지 ' + LETTERS[i] + ' 지우기"' + (opts.length <= MIN ? ' disabled' : '') + '>' + ICON_X + '</button>' +
        '</div>';
      }).join('');
      q('add').disabled = opts.length >= MAX;
      q('opt-hint').textContent = opts.length >= MAX ? '선택지는 최대 4개까지예요.' : '선택지는 2개부터 4개까지 넣을 수 있어요.';
    }

    function renderDetect() {
      var s = Pickwise.state;
      if (!s.topic.trim()) {
        s.category = '';
        q('detect').textContent = '주제를 입력하면 어떤 종류의 고민인지 알려드려요.';
        return;
      }
      var c = classify(s.topic);
      s.category = c.id;
      q('detect').innerHTML = '분류 <span class="chip">' + esc(c.name) + '</span>' +
        '<span class="rule-note">' + (c.matched ? '· 입력한 단어로 자동 분류했어요 (규칙 기반)' : '· 일반 기준을 추천해 드릴게요') + '</span>';
    }

    function clearErrors() {
      el.querySelectorAll('.field.error').forEach(function (f) { f.classList.remove('error'); });
      Pickwise.setMessage('');
    }

    topicInput.addEventListener('input', function () {
      Pickwise.state.topic = topicInput.value;
      clearErrors();
      renderDetect();
    });

    q('options').addEventListener('input', function (e) {
      var i = e.target.getAttribute('data-i');
      if (i === null) return;
      Pickwise.state.options[+i] = e.target.value;
      clearErrors();
    });

    q('options').addEventListener('click', function (e) {
      var b = e.target.closest('[data-del]');
      var opts = Pickwise.state.options;
      if (!b || opts.length <= MIN) return;
      opts.splice(+b.getAttribute('data-del'), 1);
      clearErrors();
      renderOptions();
    });

    q('add').addEventListener('click', function () {
      var opts = Pickwise.state.options;
      if (opts.length >= MAX) return;
      opts.push('');
      renderOptions();
      el.querySelector('#s1-opt-' + (opts.length - 1)).focus();
    });

    q('demo').addEventListener('click', function () {
      // 예시 데이터를 복사해서 상태에 채운다 (원본 예시는 그대로 둠)
      var ex = JSON.parse(JSON.stringify(Pickwise.data.example));
      Object.keys(ex).forEach(function (k) { Pickwise.state[k] = ex[k]; });
      topicInput.value = Pickwise.state.topic;
      clearErrors();
      renderOptions();
      renderDetect();
      Pickwise.toast('예시를 채웠어요. 다음 화면들도 예시 내용으로 이어져요.');
    });

    renderOptions();
    renderDetect();
  }

  function validate(state) {
    var el = document;
    if (!state.topic.trim()) {
      el.querySelector('[data-s1="topic-field"]').classList.add('error');
      return '결정 주제를 입력해 주세요.';
    }
    var seen = {};
    for (var i = 0; i < state.options.length; i++) {
      var v = state.options[i].trim();
      var field = el.querySelector('[data-s1-field="' + i + '"]');
      if (!v) { field.classList.add('error'); return '선택지 ' + LETTERS[i] + '를 입력하거나 지워 주세요.'; }
      if (seen[v]) { field.classList.add('error'); return '선택지 ' + LETTERS[i] + '가 다른 선택지와 같아요.'; }
      seen[v] = true;
    }
    // 앞뒤 공백 정리
    state.options = state.options.map(function (v) { return v.trim(); });
    state.topic = state.topic.trim();
    return '';
  }

  Pickwise.registerScreen(1, { render: render, validate: validate });
})();
