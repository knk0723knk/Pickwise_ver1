/* ============================================================
   화면 3 · 중요도 설정 (담당: 조원4)
   - 기준마다 0~100 슬라이더 (서로 영향을 주지 않음, 데이터팀 데이터셋과 같은 범위)
   - 옆의 (%)는 전체 중 비중: 내 점수 ÷ 모든 점수 합 → 자동 계산해서 보여주기만 함
   - 기준 삭제(최소 2개), "기준 추가하기" → 2번 화면으로
   - 결과: state.weights = { 기준id: 0~100 }  (점수 계산 때 비중으로 바꿔 씀)
   ============================================================ */
(function () {
  var MIN_CRITERIA = 2;
  var MAX = 100, STEP = 5, DEFAULT = 50;

  /* 화면 표시용 비중(%) — 계산은 점수 엔진(scoring.js)과 같은 방식을 쓴다 */
  function shares(state) { return Pickwise.scoring.shares(state.criteria, state.weights); }

  /* 새로 추가된 기준은 50, 빠진 기준은 지운다 */
  function sync(state) {
    var w = {};
    state.criteria.forEach(function (c) {
      var v = state.weights && state.weights[c.id];
      w[c.id] = typeof v === 'number' && v >= 0 && v <= MAX ? v : DEFAULT;
    });
    state.weights = w;
  }

  function render(el, state) {
    var esc = Pickwise.esc, icon = Pickwise.icon;
    sync(state);

    el.innerHTML =
      '<div class="s3-head">' +
        '<h2>무엇이 더 중요한가요?</h2>' +
        '<p>기준마다 얼마나 중요한지 <strong>0~100</strong>으로 정해 주세요. 괄호 안의 비중(%)은 다른 기준과 비교해 자동으로 계산돼요.</p>' +
      '</div>' +
      '<div class="s3-list" data-s3="list"></div>' +
      '<p class="s3-top" data-s3="top" aria-live="polite"></p>' +
      '<div class="s3-actions">' +
        '<button type="button" class="pill-btn" data-s3="equal">' + icon('refresh', 14) + '모두 같게(50)</button>' +
        '<button type="button" class="pill-btn" data-s3="add">' + icon('plus', 14) + '기준 추가하기</button>' +
      '</div>';

    var q = function (n) { return el.querySelector('[data-s3="' + n + '"]'); };

    function drawList() {
      var s = Pickwise.state;
      var canDelete = s.criteria.length > MIN_CRITERIA;
      q('list').innerHTML = s.criteria.map(function (c) {
        var id = esc(c.id), w = s.weights[c.id];
        return '<div class="s3-row">' +
          '<span class="s3-icon">' + icon(c.icon, 18) + '</span>' +
          '<label class="s3-name" for="s3-w-' + id + '">' + esc(c.name) + '</label>' +
          '<input class="s3-range" id="s3-w-' + id + '" type="range" min="0" max="' + MAX + '" step="' + STEP + '" value="' + w + '" data-w="' + id + '">' +
          '<span class="s3-val"><output data-val="' + id + '"></output><small data-share="' + id + '"></small></span>' +
          '<button type="button" class="s3-del" data-del="' + id + '" aria-label="' + esc(c.name) + ' 기준 빼기"' + (canDelete ? '' : ' disabled') + '>' + icon('x', 12) + '</button>' +
        '</div>';
      }).join('');
      refresh();
    }

    /* 슬라이더를 끄는 중에는 다시 그리지 않고 숫자만 바꾼다 (끌기가 끊기지 않게) */
    function refresh() {
      var s = Pickwise.state, sh = shares(s);
      s.criteria.forEach(function (c) {
        var w = s.weights[c.id];
        var r = el.querySelector('[data-w="' + c.id + '"]');
        if (r) {
          r.value = w;
          r.style.setProperty('--p', (w * 100 / MAX) + '%');
          r.setAttribute('aria-valuetext', '중요도 ' + w + ', 비중 ' + sh[c.id] + '%');
        }
        var v = el.querySelector('[data-val="' + c.id + '"]');
        if (v) v.textContent = w;
        var p = el.querySelector('[data-share="' + c.id + '"]');
        if (p) p.textContent = '(' + sh[c.id] + '%)';
      });
      drawTop(sh);
    }

    /* 이름 목록을 문장으로: ["예산"] → "예산을", ["예산","비행시간"] → "예산과 비행시간을", 3개 이상 → "예산, 날씨, 음식을" */
    function joinNames(names) {
      if (names.length === 1) return Pickwise.josa(names[0], '을를');
      if (names.length === 2) return Pickwise.josa(names[0], '과와') + ' ' + Pickwise.josa(names[1], '을를');
      return names.slice(0, -1).join(', ') + ', ' + Pickwise.josa(names[names.length - 1], '을를');
    }

    function drawTop(sh) {
      var s = Pickwise.state;
      var vals = s.criteria.map(function (c) { return s.weights[c.id]; });
      var max = Math.max.apply(null, vals);
      var tops = s.criteria.filter(function (c) { return s.weights[c.id] === max; });   // 점수가 같은 1위는 모두
      var el2 = q('top');
      el2.classList.remove('warn');
      if (max === 0) {
        el2.classList.add('warn');
        el2.textContent = '모든 기준의 중요도가 0이에요. 중요한 기준을 0보다 높게 올려 주세요.';
      } else if (tops.length === s.criteria.length) {
        el2.innerHTML = '지금은 모든 기준을 <strong>똑같이</strong> 중요하게 보고 있어요. 차이를 두면 결과가 더 선명해져요.';
      } else {
        var names = tops.map(function (c) { return c.name; });
        var pct = tops.length === 1 ? '비중 ' + sh[tops[0].id] + '%' : '각각 중요도 ' + max;
        el2.innerHTML = '지금은 <strong>' + esc(joinNames(names)) + '</strong> 가장 중요하게 보고 있어요 (' + pct + ').';
      }
    }

    q('list').addEventListener('input', function (e) {
      var id = e.target.getAttribute('data-w');
      if (!id) return;
      Pickwise.state.weights[id] = +e.target.value;
      Pickwise.setMessage('');
      refresh();
    });

    q('list').addEventListener('click', function (e) {
      var b = e.target.closest('[data-del]');
      var s = Pickwise.state;
      if (!b || s.criteria.length <= MIN_CRITERIA) return;
      var id = b.getAttribute('data-del');
      s.criteria = s.criteria.filter(function (c) { return c.id !== id; });
      delete s.weights[id];
      drawList();
    });

    q('equal').addEventListener('click', function () {
      var s = Pickwise.state;
      s.criteria.forEach(function (c) { s.weights[c.id] = DEFAULT; });
      Pickwise.setMessage('');
      refresh();
    });

    q('add').addEventListener('click', function () { Pickwise.back(); });

    drawList();
  }

  function validate(state) {
    var anyOn = state.criteria.some(function (c) { return state.weights[c.id] > 0; });
    if (!anyOn) return '모든 기준의 중요도가 0이에요. 중요한 기준을 0보다 높게 올려 주세요.';
    return '';
  }

  Pickwise.registerScreen(3, { render: render, validate: validate });
})();
