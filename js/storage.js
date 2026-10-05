/* ============================================================
   결정 기록 저장 (담당: 조원8)
   - 이 브라우저의 localStorage(브라우저 안의 작은 저장 공간)에만 저장한다. 서버로 보내지 않는다.
   - 저장하는 것: 날짜, 주제, 분류, 선택지, 1위, 점수, 기준 이름, 이전 결정(이어진 경우)
   - 저장하지 않는 것: 선택지 설명 글, 첨부 파일
   - 사생활 보호 모드 등에서 저장이 막혀도 앱은 그대로 동작한다.
   ============================================================ */
(function () {
  var KEY = 'pickwise.history.v1';
  var LIMIT = 30;

  function list() {
    try {
      var raw = window.localStorage.getItem(KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }

  function write(arr) {
    try { window.localStorage.setItem(KEY, JSON.stringify(arr.slice(0, LIMIT))); return true; }
    catch (e) { return false; }
  }

  /* 같은 id가 있으면 바꾸고, 없으면 맨 앞에 추가 */
  function save(record) {
    var arr = list().filter(function (r) { return r.id !== record.id; });
    arr.unshift(record);
    return write(arr);
  }

  function remove(id) {
    return write(list().filter(function (r) { return r.id !== id; }));
  }

  function newId() {
    return 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  Pickwise.storage = { list: list, save: save, remove: remove, newId: newId };
})();
