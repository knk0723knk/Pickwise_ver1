/* ============================================================
   Pickwise 공통 뼈대 (담당: 조원1)
   - 화면 전환, 뒤로가기(앱 버튼 + 휴대폰 뒤로가기), 진행 표시, 공통 상태
   - 각 화면 파일은 아래처럼 자기 화면을 등록한다:

     Pickwise.registerScreen(2, {
       render: function (el, state) { ... el 안에 화면을 그린다 ... },
       validate: function (state) { return '';  // 문제가 있으면 안내 문장을 돌려준다 }
     });

   - 화면 간 데이터는 Pickwise.state 하나로만 주고받는다.
   - 고정 데이터는 data/*.js 가 Pickwise.data.이름 = {...} 으로 넣는다.
   ============================================================ */
window.Pickwise = (function () {
  var TOTAL = 6;
  var TITLES = ['결정 입력', '기준 선택', '중요도 설정', '정보 입력', '분석 결과', '다음 결정'];
  var OWNERS = ['조원2', '조원3', '조원4', '조원5', '조원6·7', '조원8']; // 아직 안 만든 화면 안내용

  var screens = {};
  var current = 0;      // 지금 보이는 화면 번호
  var maxReached = 1;   // 지금까지 도달한 가장 먼 화면 (그 이상으로는 주소로 건너뛸 수 없음)
  var els = {};
  var toastTimer;

  function emptyState() {
    return {
      topic: '',
      category: '',
      options: ['', ''],   // 2~4개
      criteria: [],        // [{ id, name, icon, custom }]
      weights: {},         // { 기준id: 중요도% } 합계 100
      info: {},            // { 선택지이름: 설명 }
      ratings: {},         // { 선택지이름: { 기준id: 1~5 } }
      attachments: []      // [{ option, name, size, type }] 파일 이름만
    };
  }

  var P = {
    data: {},
    state: emptyState(),
    registerScreen: function (no, screen) { screens[no] = screen; },
    next: next,
    back: back,
    restart: restart,
    toast: toast,
    setMessage: setMessage,
    current: function () { return current; }
  };

  /* ---------- 화면 그리기 ---------- */
  function show(no) {
    current = no;
    var screen = screens[no];

    els.stepNo.textContent = no;
    els.title.textContent = (screen && screen.title) || TITLES[no - 1];
    els.back.disabled = no === 1;
    els.progressLabel.textContent = no + ' / ' + TOTAL + ' 단계';
    var bars = els.progress.children;
    for (var i = 0; i < bars.length; i++) bars[i].className = i < no ? 'on' : '';
    els.nextLabel.textContent = (screen && screen.nextLabel) || (no === TOTAL ? '새 결정 시작하기' : '다음');
    setMessage('');

    els.body.innerHTML = '';
    if (screen && screen.render) {
      try { screen.render(els.body, P.state); }
      catch (err) {
        console.error('[Pickwise] ' + no + '번 화면 오류:', err);
        els.body.innerHTML = todoHtml(no, '이 화면을 그리다 오류가 났어요. 콘솔(F12)을 확인해 주세요.');
      }
    } else {
      els.body.innerHTML = todoHtml(no, '이 화면은 ' + OWNERS[no - 1] + '이 만들 예정이에요.');
    }
    window.scrollTo(0, 0);
  }

  function todoHtml(no, text) {
    return '<div class="todo"><strong>' + no + '. ' + TITLES[no - 1] + '</strong><p>' + text + '</p></div>';
  }

  /* ---------- 이동 ---------- */
  // 주소 끝의 #step-3 같은 표시로 이동한다. 그래야 휴대폰 뒤로가기도 이전 단계로 간다.
  function next() {
    var screen = screens[current];
    if (screen && screen.validate) {
      var problem = screen.validate(P.state);
      if (problem) { setMessage(problem); return; }
    }
    if (current === TOTAL) { restart(); return; }
    maxReached = Math.max(maxReached, current + 1);
    location.hash = 'step-' + (current + 1);
  }

  function back() {
    if (current > 1) history.back();
  }

  function restart() {
    P.state = emptyState();
    maxReached = 1;
    location.hash = 'step-1';
    if (current === 1) show(1);
  }

  function onHashChange() {
    var m = /^#step-(\d)$/.exec(location.hash);
    var no = m ? +m[1] : 1;
    if (no < 1 || no > TOTAL || no > maxReached) {
      // 아직 안 지나온 단계로 건너뛰려 하면 지금 화면으로 되돌린다
      location.replace('#step-' + (current || 1));
      return;
    }
    if (no !== current) show(no);
  }

  /* ---------- 안내 문구 ---------- */
  function setMessage(text) { els.msg.textContent = text || ''; }

  function toast(text) {
    els.toast.textContent = text;
    els.toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { els.toast.hidden = true; }, 2800);
  }

  /* ---------- 시작 ---------- */
  function start() {
    ['stepNo', 'title', 'back', 'progress', 'progressLabel', 'body', 'msg', 'next', 'nextLabel', 'toast'].forEach(function (k) {
      els[k] = document.querySelector('[data-pw="' + k + '"]');
    });
    els.back.addEventListener('click', back);
    els.next.addEventListener('click', next);

    // 입력칸에서 Enter = 다음 (한글 입력 중의 Enter는 무시)
    els.body.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' || e.isComposing || e.keyCode === 229) return;
      if (e.target.tagName === 'INPUT' && e.target.type === 'text') { e.preventDefault(); next(); }
    });

    window.addEventListener('hashchange', onHashChange);
    // 새로고침하면 입력 내용이 없으므로 항상 1단계부터
    if (location.hash !== '#step-1') location.replace('#step-1');
    show(1);
  }

  document.addEventListener('DOMContentLoaded', start);
  return P;
})();
