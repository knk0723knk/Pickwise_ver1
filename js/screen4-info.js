/* ============================================================
   화면 4 · 정보 입력 (담당: 조원5)
   - 선택지별로 알고 있는 내용 입력 → 키워드(data/keywords.js)로 기준별 별점(1~5) 자동 제안
   - 별점은 사용자가 직접 고칠 수 있고, "모름"도 고를 수 있다
   - 정보가 없는 기준에는 "알아볼 질문" + "검색해보기" 링크
   - 자료 첨부: 파일 이름만 기록 (내용은 읽지도, 보내지도 않음)
   - 결과: state.info, state.ratings, state.manual, state.attachments
   ============================================================ */
(function () {
  var LETTERS = ['A', 'B', 'C', 'D'];
  var MAX_FILES = 5;
  var current = 0;          // 지금 보고 있는 선택지 탭
  var timer = null;

  /* ---------- 키워드로 별점 제안 ---------- */
  function clauses(text) {
    // 문장 조각으로 나누기: 쉼표·마침표·줄바꿈·"지만"·"는데"·"~고 "
    return String(text || '')
      .replace(/([가-힣])고\s/g, function (m, ch) { return ch === '최' ? m : ch + '|'; })
      .split(/[|,.!?\n;]|지만|는데|그러나|하지만/)
      .map(function (s) { return ' ' + s.trim() + ' '; })
      .filter(function (s) { return s.trim(); });
  }
  function find(text, list) {
    for (var i = 0; i < (list || []).length; i++) if (text.indexOf(list[i]) > -1) return list[i];
    return null;
  }

  /* 한 기준에 대한 제안: { score: 1~5 또는 null, word: 근거 단어 } */
  function suggest(text, criterion) {
    var K = Pickwise.data.keywords;
    var k = K.criteria[criterion.id] || { aliases: [criterion.name], pos: [], neg: [] };
    if (criterion.custom) k = { aliases: [criterion.name].concat(criterion.name.split(/\s+/)), pos: [], neg: [] };
    var delta = 0, words = [];
    clauses(text).forEach(function (p) {
      var s = 0, word = find(p, k.neg);
      if (word) s = -1;
      else if ((word = find(p, k.pos))) s = 1;
      else if (find(p, k.aliases)) {
        if ((word = find(p, K.generic.neg))) s = -1;
        else if ((word = find(p, K.generic.pos))) s = 1;
      }
      if (!s) return;
      var rest = p.split(word).join(' ');           // 찾은 단어 자체의 "없" 등은 부정어로 보지 않음
      if (find(rest, K.negation)) s = -s;
      if (find(rest, K.strong)) s *= 2;
      delta += s;
      words.push(word.trim());
    });
    if (!words.length) return { score: null, word: '' };
    return { score: Math.max(1, Math.min(5, 3 + delta)), word: words[0] };
  }

  /* 기준 정보(질문·검색어) 찾기 */
  function meta(c) {
    var all = Pickwise.data.criteria, found = null;
    Object.keys(all).some(function (cat) {
      found = all[cat].main.concat(all[cat].more).filter(function (x) { return x.id === c.id; })[0];
      return !!found;
    });
    return found || { question: c.name + '에 대해 알고 있는 점이 있나요?', search: '{option} ' + c.name };
  }

  /* 직접 고르지 않은 기준은 설명글에서 다시 제안 */
  function autoRate(state, opt) {
    state.ratings[opt] = state.ratings[opt] || {};
    state.manual[opt] = state.manual[opt] || {};
    var text = state.info[opt] || '';
    var hits = {};
    state.criteria.forEach(function (c) {
      var r = suggest(text, c);
      hits[c.id] = r.word;
      if (!state.manual[opt][c.id]) state.ratings[opt][c.id] = r.score;
    });
    return hits;
  }

  function knownCount(state, opt) {
    var r = state.ratings[opt] || {};
    return state.criteria.filter(function (c) { return typeof r[c.id] === 'number'; }).length;
  }

  function fmtSize(n) {
    if (n >= 1048576) return (n / 1048576).toFixed(1) + 'MB';
    return Math.max(1, Math.round(n / 1024)) + 'KB';
  }

  /* ---------- 화면 ---------- */
  function render(el, state) {
    var esc = Pickwise.esc, icon = Pickwise.icon;
    state.info = state.info || {};
    state.ratings = state.ratings || {};
    state.manual = state.manual || {};
    state.attachments = state.attachments || [];
    if (current >= state.options.length) current = 0;
    var hits = {};
    state.options.forEach(function (o) { hits[o] = autoRate(state, o); });

    el.innerHTML =
      '<div class="s4-head">' +
        '<h2>선택지에 대해 알고 있는 내용을 입력해 주세요</h2>' +
        '<p>적은 내용에서 기준별 점수를 자동으로 골라 드려요. 정보가 많을수록 더 정확하게 비교할 수 있어요.</p>' +
      '</div>' +
      '<div class="s4-tabs" role="tablist" data-s4="tabs"></div>' +
      '<section class="s4-panel" data-s4="panel"></section>';

    var q = function (n) { return el.querySelector('[data-s4="' + n + '"]'); };

    function drawTabs() {
      var s = Pickwise.state;
      q('tabs').innerHTML = s.options.map(function (o, i) {
        var n = knownCount(s, o);
        return '<button type="button" role="tab" class="s4-tab' + (i === current ? ' on' : '') + '" aria-selected="' + (i === current) + '" data-tab="' + i + '">' +
          '<span class="s4-tab-letter">' + LETTERS[i] + '</span><span class="s4-tab-name">' + esc(o) + '</span>' +
          '<small>' + n + '/' + s.criteria.length + '</small></button>';
      }).join('');
    }

    function drawPanel() {
      var s = Pickwise.state, opt = s.options[current];
      q('panel').innerHTML =
        '<div class="block">' +
          '<div class="block-head"><span class="num">1</span><label for="s4-text">' + esc(opt) + '에 대해 알고 있는 내용</label></div>' +
          '<div class="field s4-text"><textarea id="s4-text" rows="4" maxlength="600" placeholder="예: 날씨가 좋고 경치가 예쁘지만 물가가 비싼 편이에요.">' + esc(s.info[opt] || '') + '</textarea></div>' +
          '<p class="hint">"비싸다", "가깝다"처럼 좋고 나쁨을 적으면 별점을 골라 드려요 <span class="rule-note">(규칙 기반)</span></p>' +
        '</div>' +
        '<div class="block">' +
          '<div class="block-head"><span class="num">2</span><span class="label">기준별 점수</span><span class="s4-legend">1 아쉬움 · 3 보통 · 5 아주 좋음</span></div>' +
          '<div class="s4-rates" data-s4="rates"></div>' +
        '</div>' +
        '<div class="block">' +
          '<div class="block-head"><span class="num">3</span><span class="label">자료 첨부 <small class="s4-opt-tag">선택</small></span></div>' +
          '<label class="s4-drop">' + icon('plus', 16) + '<span>파일 추가</span><small>PDF · 이미지 · 문서</small>' +
            '<input type="file" multiple data-s4="file" accept=".pdf,.doc,.docx,.hwp,.hwpx,.txt,.ppt,.pptx,.xls,.xlsx,image/*"></label>' +
          '<ul class="s4-files" data-s4="files"></ul>' +
          '<p class="hint">첨부한 파일은 <strong>이름만</strong> 결과 화면에 참고 자료로 표시돼요. 내용은 점수에 반영되지 않고, 파일은 이 기기 밖으로 보내지 않아요.</p>' +
        '</div>';

      var ta = el.querySelector('#s4-text');
      ta.addEventListener('input', function () {
        Pickwise.state.info[opt] = ta.value;
        Pickwise.setMessage('');
        clearTimeout(timer);
        timer = setTimeout(function () { hits[opt] = autoRate(Pickwise.state, opt); drawRates(); drawTabs(); }, 250);
      });
      q('file').addEventListener('change', function (e) { addFiles(opt, e.target.files); e.target.value = ''; });
      drawRates();
      drawFiles();
    }

    function drawRates() {
      var s = Pickwise.state, opt = s.options[current];
      var r = s.ratings[opt], m = s.manual[opt];
      q('rates').innerHTML = s.criteria.map(function (c) {
        var v = r[c.id], known = typeof v === 'number';
        var tag;
        if (m[c.id]) tag = known ? '<span class="s4-src manual">직접 고름</span>' : '<span class="s4-src unknown">모름</span>';
        else tag = known ? '<span class="s4-src auto">자동 · "' + esc(hits[opt][c.id]) + '"</span>' : '<span class="s4-src unknown">정보 없음</span>';
        var stars = '';
        for (var i = 1; i <= 5; i++) {
          stars += '<button type="button" class="s4-star' + (known && i <= v ? ' on' : '') + '" data-star="' + i + '" data-c="' + esc(c.id) + '" ' +
            'role="radio" aria-checked="' + (known && i === v) + '" aria-label="' + esc(c.name) + ' ' + i + '점">★</button>';
        }
        var ask = '';
        if (!known) {
          var mt = meta(c);
          var term = (mt.search || '{option} ' + c.name).replace('{option}', opt);
          ask = '<div class="s4-ask">' + icon('bulb', 14) + '<span>' + esc(mt.question) + '</span>' +
            '<a href="https://www.google.com/search?q=' + encodeURIComponent(term) + '" target="_blank" rel="noopener noreferrer">' +
            icon('link', 13) + '검색해보기</a></div>';
        }
        return '<div class="s4-rate' + (known ? '' : ' unknown') + '">' +
          '<div class="s4-rate-top"><span class="s4-icon">' + icon(c.icon, 16) + '</span><span class="s4-name">' + esc(c.name) + '</span>' + tag + '</div>' +
          '<div class="s4-stars" role="radiogroup" aria-label="' + esc(c.name) + ' 점수">' + stars +
            '<button type="button" class="s4-unknown' + (known ? '' : ' on') + '" data-unknown="' + esc(c.id) + '" aria-pressed="' + !known + '">모름</button>' +
            (known ? '<span class="s4-num">' + v + '점</span>' : '') +
          '</div>' + ask +
        '</div>';
      }).join('');
    }

    function drawFiles() {
      var s = Pickwise.state, opt = s.options[current];
      var list = s.attachments.filter(function (a) { return a.option === opt; });
      q('files').innerHTML = list.map(function (a) {
        var idx = s.attachments.indexOf(a);
        return '<li>' + icon('doc', 15) + '<span class="s4-file-name">' + esc(a.name) + '</span><small>' + fmtSize(a.size) + '</small>' +
          '<button type="button" data-rm="' + idx + '" aria-label="' + esc(a.name) + ' 첨부 빼기">' + icon('x', 11) + '</button></li>';
      }).join('');
    }

    function addFiles(opt, files) {
      var s = Pickwise.state;
      var have = s.attachments.filter(function (a) { return a.option === opt; }).length;
      var added = 0;
      Array.prototype.forEach.call(files || [], function (f) {
        if (have + added >= MAX_FILES) return;
        s.attachments.push({ option: opt, name: f.name, size: f.size, type: f.type || '' });
        added++;
      });
      if ((files || []).length > added) Pickwise.toast('선택지마다 파일은 ' + MAX_FILES + '개까지 첨부할 수 있어요.');
      drawFiles();
    }

    /* 탭 전환 */
    q('tabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-tab]');
      if (!b) return;
      current = +b.getAttribute('data-tab');
      drawTabs(); drawPanel();
    });

    /* 별점·모름·첨부 삭제 (패널 안 클릭을 한 곳에서 처리) */
    q('panel').addEventListener('click', function (e) {
      var s = Pickwise.state, opt = s.options[current];
      var star = e.target.closest('[data-star]');
      var unk = e.target.closest('[data-unknown]');
      var rm = e.target.closest('[data-rm]');
      if (star) {
        s.ratings[opt][star.getAttribute('data-c')] = +star.getAttribute('data-star');
        s.manual[opt][star.getAttribute('data-c')] = true;
      } else if (unk) {
        s.ratings[opt][unk.getAttribute('data-unknown')] = null;
        s.manual[opt][unk.getAttribute('data-unknown')] = true;
      } else if (rm) {
        s.attachments.splice(+rm.getAttribute('data-rm'), 1);
        drawFiles();
        return;
      } else return;
      Pickwise.setMessage('');
      drawRates(); drawTabs();
    });

    drawTabs();
    drawPanel();
  }

  function validate(state) {
    var any = state.options.some(function (o) { return knownCount(state, o) > 0; });
    if (!any) return '비교하려면 설명을 적거나 별점을 하나 이상 골라 주세요.';
    return '';
  }

  Pickwise.registerScreen(4, { render: render, validate: validate });
  Pickwise.suggestRating = suggest;   // 점검·다른 화면에서 쓸 수 있게 공개
})();
