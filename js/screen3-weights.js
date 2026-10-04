/* ============================================================
   화면 3 · 중요도 설정 (담당: 조원4)
   - 기준별 슬라이더, 합계는 항상 100%
   - 하나를 올리면 나머지가 원래 비율대로 줄어든다
   - 기준 삭제(최소 2개), "기준 추가하기" → 2번 화면으로
   - 결과: state.weights = { 기준id: 중요도% }
   ============================================================ */
(function () {
  var MIN_CRITERIA = 2;

  /* 숫자 목록을 정수로 반올림하되 합계가 정확히 total 이 되게 (가장 큰 나머지 방식) */
  function roundTo(values, total) {
    var floors = values.map(Math.floor);
    var left = total - floors.reduce(function (a, b) { return a + b; }, 0);
    var order = values.map(function (v, i) { return { i: i, r: v - Math.floor(v) }; })
      .sort(function (a, b) { return b.r - a.r; });
    for (var k = 0; k < left; k++) floors[order[k % order.length].i] += 1;
    return floors;
  }

  /* 기준 목록이 바뀌었을 때 중요도를 다시 100%로 맞춘다
     - 새 기준은 1/n 만큼, 기존 기준은 남은 몫을 원래 비율대로 */
  function normalize(state) {
    var ids = state.criteria.map(function (c) { return c.id; });
    var old = state.weights || {};
    var n = ids.length;
    if (!n) { state.weights = {}; return; }
    var newIds = ids.filter(function (id) { return typeof old[id] !== 'number'; });
    var keep = ids.filter(function (id) { return typeof old[id] === 'number'; });
    var share = 100 / n;
    var rest = 100 - share * newIds.length;
    var keepSum = keep.reduce(function (a, id) { return a + old[id]; }, 0);
    var raw = ids.map(function (id) {
      if (newIds.indexOf(id) > -1) return share;
      return keepSum > 0 ? old[id] * rest / keepSum : rest / keep.length;
    });
    var rounded = roundTo(raw, 100);
    state.weights = {};
    ids.forEach(function (id, i) { state.weights[id] = rounded[i]; });
  }

  /* id 하나를 value 로 바꾸고 나머지를 비율대로 조정 */
  function setWeight(state, id, value) {
    var ids = state.criteria.map(function (c) { return c.id; });
    var others = ids.filter(function (x) { return x !== id; });
    var remain = 100 - value;
    var otherSum = others.reduce(function (a, x) { return a + state.weights[x]; }, 0);
    var raw = others.map(function (x) {
      return otherSum > 0 ? state.weights[x] * remain / otherSum : remain / others.length;
    });
    var rounded = roundTo(raw, remain);
    state.weights[id] = value;
    others.forEach(function (x, i) { state.weights[x] = rounded[i]; });
  }

  function render(el, state) {
    var esc = Pickwise.esc, icon = Pickwise.icon;
    normalize(state);

    el.innerHTML =
      '<div class="s3-head">' +
        '<h2>무엇이 더 중요한가요?</h2>' +
        '<p>선택한 기준의 중요도를 조절해 주세요. 하나를 올리면 나머지가 자동으로 줄어서 <strong>합계는 항상 100%</strong>예요.</p>' +
      '</div>' +
      '<div class="s3-list" data-s3="list"></div>' +
      '<div class="s3-foot">' +
        '<p class="s3-top" data-s3="top" aria-live="polite"></p>' +
        '<span class="s3-total">합계 <strong>100%</strong></span>' +
      '</div>' +
      '<div class="s3-actions">' +
        '<button type="button" class="pill-btn" data-s3="equal">' + icon('refresh', 14) + '똑같이 나누기</button>' +
        '<button type="button" class="pill-btn" data-s3="add">' + icon('plus', 14) + '기준 추가하기</button>' +
      '</div>';

    var q = function (n) { return el.querySelector('[data-s3="' + n + '"]'); };

    function drawList() {
      var s = Pickwise.state;
      var canDelete = s.criteria.length > MIN_CRITERIA;
      q('list').innerHTML = s.criteria.map(function (c) {
        var w = s.weights[c.id];
        return '<div class="s3-row" data-row="' + esc(c.id) + '">' +
          '<span class="s3-icon">' + icon(c.icon, 18) + '</span>' +
          '<label class="s3-name" for="s3-w-' + esc(c.id) + '">' + esc(c.name) + '</label>' +
          '<input class="s3-range" id="s3-w-' + esc(c.id) + '" type="range" min="0" max="100" step="1" value="' + w + '" ' +
            'data-w="' + esc(c.id) + '" style="--p:' + w + '%" aria-valuetext="' + w + '%">' +
          '<output class="s3-val" data-val="' + esc(c.id) + '">' + w + '%</output>' +
          '<button type="button" class="s3-del" data-del="' + esc(c.id) + '" aria-label="' + esc(c.name) + ' 기준 빼기"' + (canDelete ? '' : ' disabled') + '>' + icon('x', 12) + '</button>' +
        '</div>';
      }).join('');
      drawTop();
    }

    /* 슬라이더를 움직이는 중에는 다시 그리지 않고 값만 바꾼다 (끌기가 끊기지 않게) */
    function refreshValues() {
      var s = Pickwise.state;
      s.criteria.forEach(function (c) {
        var w = s.weights[c.id];
        var r = el.querySelector('[data-w="' + c.id + '"]');
        var v = el.querySelector('[data-val="' + c.id + '"]');
        if (r) { r.value = w; r.style.setProperty('--p', w + '%'); r.setAttribute('aria-valuetext', w + '%'); }
        if (v) v.textContent = w + '%';
      });
      drawTop();
    }

    function drawTop() {
      var s = Pickwise.state;
      var top = s.criteria.slice().sort(function (a, b) { return s.weights[b.id] - s.weights[a.id]; })[0];
      var allSame = s.criteria.every(function (c) { return Math.abs(s.weights[c.id] - s.weights[top.id]) <= 1; });
      q('top').innerHTML = allSame
        ? '지금은 모든 기준을 <strong>비슷하게</strong> 중요하게 보고 있어요.'
        : '지금은 <strong>' + esc(Pickwise.josa(top.name, '을를')) + '</strong> 가장 중요하게 보고 있어요 (' + s.weights[top.id] + '%).';
    }

    q('list').addEventListener('input', function (e) {
      var id = e.target.getAttribute('data-w');
      if (!id) return;
      setWeight(Pickwise.state, id, +e.target.value);
      refreshValues();
    });

    q('list').addEventListener('click', function (e) {
      var b = e.target.closest('[data-del]');
      var s = Pickwise.state;
      if (!b || s.criteria.length <= MIN_CRITERIA) return;
      var id = b.getAttribute('data-del');
      s.criteria = s.criteria.filter(function (c) { return c.id !== id; });
      delete s.weights[id];
      normalize(s);
      drawList();
    });

    q('equal').addEventListener('click', function () {
      Pickwise.state.weights = {};
      normalize(Pickwise.state);
      refreshValues();
    });

    q('add').addEventListener('click', function () { Pickwise.back(); });

    drawList();
  }

  function validate(state) {
    var sum = state.criteria.reduce(function (a, c) { return a + (state.weights[c.id] || 0); }, 0);
    if (sum !== 100) return '중요도 합계가 100%가 아니에요. "똑같이 나누기"를 눌러 주세요.';
    var allZero = state.criteria.filter(function (c) { return state.weights[c.id] > 0; }).length === 0;
    if (allZero) return '중요한 기준을 하나 이상 골라 주세요.';
    return '';
  }

  Pickwise.registerScreen(3, { render: render, validate: validate });
})();
