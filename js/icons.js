/* ============================================================
   공통 아이콘 (담당: 조원1)
   - data/criteria.js 의 "icon" 이름 → 선 아이콘 그림
   - 사용: Pickwise.icon('wallet', 20)  → <svg> 문자열
   - 없는 이름이면 기본 동그라미 아이콘
   ============================================================ */
(function () {
  var P = {
    wallet:   '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 14.5h2"/><path d="M6 6l9-3 1 3"/>',
    sun:      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    camera:   '<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/>',
    utensils: '<path d="M7 3v8M4.5 3v5a2.5 2.5 0 0 0 5 0V3M7 11v10M17 3c-2 1.5-3 4-3 7h3v11"/>',
    shield:   '<path d="M12 3l8 3v6c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    bus:      '<rect x="5" y="3" width="14" height="15" rx="2"/><path d="M5 11h14M8 18v3M16 18v3"/><circle cx="8.5" cy="14.5" r=".8"/><circle cx="15.5" cy="14.5" r=".8"/>',
    plane:    '<path d="M10.5 13.5L3 11l1.5-1.5 8 .5 4-4.5a2 2 0 0 1 3 3L15 12.5l.5 8L14 22l-2.5-7.5L8 18v3l-1.5 1-1-3.5L2 17.5 3 16h3z"/>',
    beach:    '<path d="M3 20c3-1.5 6-1.5 9 0s6 1.5 9 0"/><path d="M12 19V9"/><path d="M5 9a7 7 0 0 1 14 0c-2.5-1.5-4.5-1.5-7 0-2.5-1.5-4.5-1.5-7 0z"/>',
    users:    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
    passport: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M9 16h6"/>',
    chat:     '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    activity: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    chart:    '<path d="M4 20V4M4 20h16"/><path d="M7 15l4-4 3 3 5-6"/>',
    clock:    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    target:   '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
    star:     '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    gift:     '<rect x="3" y="8" width="18" height="4"/><path d="M5 12v9h14v-9M12 8v13"/><path d="M12 8c-1-3-5-4-5-1.5S10 8 12 8zM12 8c1-3 5-4 5-1.5S14 8 12 8z"/>',
    home:     '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    store:    '<path d="M4 9l1.5-5h13L20 9"/><path d="M4 9h16v2a3 3 0 0 1-5.3 2 3 3 0 0 1-5.4 0A3 3 0 0 1 4 11z"/><path d="M5 13v7h14v-7"/>',
    volume:   '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
    train:    '<rect x="6" y="3" width="12" height="14" rx="3"/><path d="M6 10h12M9 21l1.5-4M15 21l-1.5-4"/><circle cx="9.5" cy="13.5" r=".8"/><circle cx="14.5" cy="13.5" r=".8"/>',
    doc:      '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M8 13h8M8 17h5"/>',
    car:      '<path d="M5 16V11l2-5h10l2 5v5"/><path d="M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="13.5" r=".8"/><circle cx="16.5" cy="13.5" r=".8"/>',
    paw:      '<circle cx="7" cy="9" r="1.8"/><circle cx="11" cy="6" r="1.8"/><circle cx="15" cy="7" r="1.8"/><circle cx="18" cy="11" r="1.8"/><path d="M8 17c0-3 2-5 4.5-5S17 14 17 17c0 2-2 2.5-4.5 2S8 19.5 8 17z"/>',
    receipt:  '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    palette:  '<path d="M12 3a9 9 0 0 0 0 18c1.5 0 2-1 1.5-2s-.5-2.5 1-2.5H17a4 4 0 0 0 4-4C21 7 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>',
    tool:     '<path d="M14.5 5.5a4 4 0 0 0 5 5L12 18a2.1 2.1 0 0 1-3-3z"/><path d="M14.5 5.5L17 3l4 4-2.5 2.5"/><path d="M8 21l-5-5"/>',
    badge:    '<circle cx="12" cy="9" r="6"/><path d="M8.5 14l-1.5 7 5-2.5 5 2.5-1.5-7"/>',
    refresh:  '<path d="M20 11a8 8 0 0 0-14.5-4.5L4 8M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.5 4.5L20 16M20 20v-4h-4"/>',
    link:     '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4L11.5 6"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.5-1.4"/>',
    box:      '<path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5l9 4.5 9-4.5M12 12v9"/>',
    truck:    '<path d="M2 6h12v10H2zM14 9h4l3 3.5V16h-7"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    smile:    '<circle cx="12" cy="12" r="9"/><path d="M8 14.5a5 5 0 0 0 8 0"/><circle cx="9" cy="9.5" r=".8"/><circle cx="15" cy="9.5" r=".8"/>',
    alert:    '<path d="M12 3l9.5 17h-19z"/><path d="M12 10v4.5M12 17.5v.01"/>',
    spark:    '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    book:     '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20"/>',
    heart:    '<path d="M12 20s-8-4.6-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.4 12 20 12 20z"/>',
    suitcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 12h18"/>',
    bed:      '<path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    plus:     '<path d="M12 5v14M5 12h14"/>',
    custom:   '<path d="M4 20l4-1L19 8l-3-3L5 16z"/><path d="M14 7l3 3"/>',
    bulb:     '<path d="M9 18h6M10 21h4"/><path d="M8.5 15c-1.6-1.2-2.5-3-2.5-5a6 6 0 0 1 12 0c0 2-.9 3.8-2.5 5-.6.5-1 1.2-1 2H9.5c0-.8-.4-1.5-1-2z"/>',
    check:    '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    x:        '<path d="M6 6l12 12M18 6L6 18"/>',
    dot:      '<circle cx="12" cy="12" r="7"/>'
  };

  Pickwise.icon = function (name, size) {
    var s = size || 20;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || P.dot) + '</svg>';
  };

  /* 조사 붙이기: Pickwise.josa('스페인', '은는') → '스페인은', Pickwise.josa('그리스', '이가') → '그리스가'
     pair: '은는' · '이가' · '을를' · '과와' · '으로로' (받침 있을 때 / 없을 때) */
  Pickwise.josa = function (word, pair) {
    var w = String(word);
    var withB = pair === '으로로' ? '으로' : pair.charAt(0);
    var noB = pair === '으로로' ? '로' : pair.charAt(1);
    var last = w.replace(/[\s)\]"'.,!?]+$/, '').slice(-1);
    var code = last.charCodeAt(0) - 0xAC00;
    var b;
    if (code >= 0 && code <= 11171) b = code % 28;
    else if (/[0-9]/.test(last)) b = [16, 8, 0, 16, 0, 0, 1, 8, 8, 0][+last];   // 영 일 이 삼 사 오 육 칠 팔 구 (받침, ㄹ=8)
    else if (/[lLmMnNrR]/.test(last)) b = /[lLrR]/.test(last) ? 8 : 4;         // 영어 끝소리 l·m·n·r 은 받침 있음
    else if (/[a-zA-Z]/.test(last)) b = 0;
    else return w + withB + '(' + noB + ')';   // 판단하기 어려우면 "을(를)"처럼
    if (pair === '으로로') return w + (b === 0 || b === 8 ? noB : withB);  // ㄹ 받침은 "로"
    return w + (b === 0 ? noB : withB);
  };

  /* 화면 파일들이 같이 쓰는 작은 도구 */
  Pickwise.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
})();
