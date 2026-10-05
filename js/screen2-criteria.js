/* ============================================================
   화면 2 · 기준 선택 (담당: 조원3)
   - 공통 기준(비용·시간 등) + 분류(state.category)별 고유 기준 카드 (data/criteria.js)
   - "이런 기준도 고려해보세요" → 눌러서 추가
   - 기준 직접 추가
   - 결과: state.criteria = [{ id, name, icon, custom }]
   ============================================================ */
(function () {
  var MIN = 2, MAX = 8;
  var customSeq = 0;

  /* { common, main, more } — main 은 화면 카드 순서대로: 공통 기준 다음 분류별 기준 */
  function catData(state) {
    var all = Pickwise.data.criteria;
    var cat = all.categories[state.category] || all.categories.etc;
    return { common: all.common, own: cat.main, main: all.common.concat(cat.main), more: cat.more };
  }
  function catName(state) {
    var c = Pickwise.data.topics.categories.filter(function (x) { return x.id === state.category; })[0];
    return c ? c.name : '기타';
  }
  function pick(c) { return { id: c.id, name: c.name, icon: c.icon, custom: !!c.custom }; }

  /* 처음 들어왔거나 주제(분류)가 바뀌었으면 추천 기본값으로 채운다
     state.criteriaFor = 지금 기준 목록을 어떤 분류로 골랐는지 (새 결정·예시를 불러오면 함께 바뀜) */
  function ensureSelection(state) {
    var defaults = function () { return catData(state).main.filter(function (c) { return c.default; }).map(pick); };
    if (!state.criteria.length) {
      state.criteria = defaults();
      state.criteriaFor = state.category;
      return false;
    }
    if (!state.criteriaFor) { state.criteriaFor = state.category; return false; }
    if (state.criteriaFor !== state.category) {
      state.criteria = defaults();
      state.criteriaFor = state.category;
      return true;
    }
    return false;
  }

  function render(el, state) {
    var esc = Pickwise.esc, icon = Pickwise.icon;
    var reset = ensureSelection(state);
    var data = catData(state);

    el.innerHTML =
      '<div class="s2-head">' +
        '<h2>어떤 기준으로 비교할까요?</h2>' +
        '<p><span class="chip">' + esc(catName(state)) + '</span> 고민에 자주 쓰는 기준을 골라 두었어요. 더 고르거나 직접 추가해 보세요.</p>' +
      '</div>' +
      '<div class="s2-count" data-s2="count" aria-live="polite"></div>' +
      '<div class="s2-cards" data-s2="cards">' +
      '<div class="s2-group">' +
        '<div class="s2-group-title">모든 고민에 쓰는 기준</div>' +
        '<div class="s2-grid" data-s2="grid-common" role="group" aria-label="공통 기준"></div>' +
      '</div>' +
      '<div class="s2-group">' +
        '<div class="s2-group-title">' + esc(catName(state)) + ' 고민에 특히 중요한 기준</div>' +
        '<div class="s2-grid" data-s2="grid" role="group" aria-label="' + esc(catName(state)) + ' 기준"></div>' +
      '</div>' +
      '</div>' +
      '<section class="s2-more">' +
        '<div class="s2-more-title">' + icon('bulb', 18) + '이런 기준도 고려해보세요</div>' +
        '<p class="hint">' + esc(catName(state)) + ' 고민에서 놓치기 쉬운 기준이에요.</p>' +
        '<div class="s2-more-list" data-s2="more"></div>' +
      '</section>' +
      '<section class="block">' +
        '<div class="block-head"><span class="num">+</span><label for="s2-custom">기준 직접 추가</label></div>' +
        '<div class="s2-add">' +
          '<div class="field">' + icon('custom', 18) +
            '<input id="s2-custom" type="text" maxlength="15" autocomplete="off" placeholder="예: 친구 추천, 사진 찍기 좋은 곳"></div>' +
          '<button class="pill-btn s2-add-btn" type="button" data-s2="add">추가</button>' +
        '</div>' +
      '</section>' +
      '<p class="rule-note">추천 기준은 고민 분류에 맞춰 미리 준비한 목록이에요 (규칙 기반).</p>';

    var q = function (n) { return el.querySelector('[data-s2="' + n + '"]'); };
    var input = el.querySelector('#s2-custom');

    function selectedIds() { return Pickwise.state.criteria.map(function (c) { return c.id; }); }

    function card(c, ids) {
      var on = ids.indexOf(c.id) > -1;
      return '<button type="button" class="s2-card' + (on ? ' on' : '') + '" data-id="' + esc(c.id) + '" aria-pressed="' + on + '">' +
        '<span class="s2-icon">' + icon(c.icon, 20) + '</span>' +
        '<span class="s2-name">' + esc(c.name) + (c.custom ? ' <small>직접</small>' : '') + '</span>' +
        '<span class="s2-check">' + icon('check', 13) + '</span>' +
      '</button>';
    }

    function draw() {
      var s = Pickwise.state;
      var ids = selectedIds();
      // 공통 기준 카드 / 분류별 기준 카드 + (추가로 고른 기준·직접 추가한 기준)
      var mainIds = data.main.map(function (c) { return c.id; });
      var own = data.own.concat(s.criteria.filter(function (c) { return mainIds.indexOf(c.id) < 0; }));
      q('grid-common').innerHTML = data.common.map(function (c) { return card(c, ids); }).join('');
      q('grid').innerHTML = own.map(function (c) { return card(c, ids); }).join('');

      var more = data.more.filter(function (c) { return ids.indexOf(c.id) < 0; });
      q('more').innerHTML = more.length
        ? more.map(function (c) {
            return '<button type="button" class="pill-btn s2-more-btn" data-more="' + esc(c.id) + '">' + icon('plus', 13) + esc(c.name) + '</button>';
          }).join('')
        : '<span class="hint">모두 추가했어요.</span>';

      var n = ids.length;
      q('count').innerHTML = '<strong>' + n + '개</strong> 선택 · ' + MIN + '~' + MAX + '개까지 고를 수 있어요';
      q('count').classList.toggle('warn', n < MIN || n > MAX);
    }

    function toggle(id) {
      var s = Pickwise.state;
      var i = selectedIds().indexOf(id);
      if (i > -1) {
        s.criteria.splice(i, 1);
      } else {
        if (s.criteria.length >= MAX) { Pickwise.setMessage('기준은 최대 ' + MAX + '개까지 고를 수 있어요.'); return; }
        var c = data.main.concat(data.more).filter(function (x) { return x.id === id; })[0];
        if (c) s.criteria.push(pick(c));
      }
      Pickwise.setMessage('');
      draw();
    }

    q('cards').addEventListener('click', function (e) {
      var b = e.target.closest('[data-id]');
      if (!b) return;
      var id = b.getAttribute('data-id');
      var isCustom = Pickwise.state.criteria.some(function (c) { return c.id === id && c.custom; });
      if (isCustom) {
        // 직접 추가한 기준은 선택 해제 = 삭제
        Pickwise.state.criteria = Pickwise.state.criteria.filter(function (c) { return c.id !== id; });
        draw();
        return;
      }
      toggle(id);
    });

    q('more').addEventListener('click', function (e) {
      var b = e.target.closest('[data-more]');
      if (b) toggle(b.getAttribute('data-more'));
    });

    function addCustom() {
      var s = Pickwise.state;
      var name = input.value.trim();
      if (!name) { input.focus(); return; }
      var all = data.main.concat(data.more).concat(s.criteria);
      // 띄어쓰기·가운뎃점 차이는 같은 이름으로 본다 (예: "연봉 처우" = "연봉·처우")
      var key = function (t) { return t.replace(/[\s·.,/]/g, ''); };
      var same = all.filter(function (c) { return key(c.name) === key(name); })[0];
      if (same) {
        if (selectedIds().indexOf(same.id) < 0) toggle(same.id);
        Pickwise.toast('"' + same.name + '" 기준이 이미 있어서 그걸 선택해 두었어요.');
        input.value = '';
        return;
      }
      if (s.criteria.length >= MAX) { Pickwise.setMessage('기준은 최대 ' + MAX + '개까지 고를 수 있어요.'); return; }
      customSeq += 1;
      s.criteria.push({ id: 'custom-' + Date.now().toString(36) + customSeq, name: name, icon: 'custom', custom: true });
      input.value = '';
      Pickwise.setMessage('');
      draw();
    }
    q('add').addEventListener('click', addCustom);
    input.addEventListener('keydown', function (e) {
      // Enter = 기준 추가 (다음 화면으로 넘어가지 않게 막음)
      if (e.key !== 'Enter' || e.isComposing || e.keyCode === 229) return;
      e.preventDefault(); e.stopPropagation();
      addCustom();
    });

    draw();
    if (reset) Pickwise.toast('주제가 바뀌어서 추천 기준을 새로 골랐어요.');
  }

  function validate(state) {
    var n = state.criteria.length;
    if (n < MIN) return '비교하려면 기준을 ' + MIN + '개 이상 골라 주세요.';
    if (n > MAX) return '기준은 ' + MAX + '개까지만 고를 수 있어요.';
    return '';
  }

  Pickwise.registerScreen(2, { render: render, validate: validate });
})();
