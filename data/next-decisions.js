/* 다음 결정 추천 목록 (담당: 조원8) — Claude 초안, 담당자 검토 필요
   - {winner} = 이번 결정의 1위 선택지 이름으로 바뀐다 (조사 표기는 templates.js 설명과 같음)
   - related: 이번 결정에서 이 기준들의 중요도가 높았으면 목록 위쪽에 보여준다
   - 누르면 topic·options가 채워진 채로 새 결정이 시작된다 */
Pickwise.data.nextDecisions = {
  "travel": [
    { "title": "패키지 vs 자유여행",      "topic": "{winner} 여행, 패키지로 갈까 자유여행으로 갈까?", "options": ["패키지", "자유여행"],         "icon": "suitcase", "related": ["budget", "transport", "safety", "language"] },
    { "title": "숙소 위치 비교",          "topic": "{winner}에서 숙소를 어디에 잡을까?",            "options": ["시내 중심", "외곽 리조트"],    "icon": "bed",      "related": ["transport", "rest", "budget"] },
    { "title": "여행 시기 비교",          "topic": "{winner:은는} 언제 가는 게 좋을까?",              "options": ["성수기", "비수기"],            "icon": "calendar", "related": ["weather", "crowd", "budget"] },
    { "title": "항공권 직항 vs 경유",     "topic": "{winner} 가는 항공권, 직항과 경유 중 뭘 살까?", "options": ["직항", "경유"],                "icon": "plane",    "related": ["flight", "budget"] },
    { "title": "여행 일정 길이",          "topic": "{winner} 여행, 며칠 일정이 좋을까?",            "options": ["4박 5일", "6박 7일"],          "icon": "clock",    "related": ["budget", "sights", "rest"] }
  ],
  "career": [
    { "title": "연봉 협상 vs 바로 수락",  "topic": "{winner} 오퍼, 연봉 협상을 해볼까 바로 수락할까?", "options": ["협상하기", "바로 수락"],   "icon": "wallet",   "related": ["salary", "benefits"] },
    { "title": "입사 시기",               "topic": "{winner} 입사, 언제 시작할까?",                 "options": ["바로 입사", "한 달 쉬고 입사"], "icon": "calendar", "related": ["worklife", "health"] },
    { "title": "이사 여부",               "topic": "{winner} 다니려면 이사를 할까?",                "options": ["이사하기", "지금 집에서 통근"], "icon": "home",     "related": ["commute", "cost"] },
    { "title": "자기계발 방향",           "topic": "{winner}에서 성장하려면 무엇을 먼저 준비할까?",  "options": ["자격증", "외국어"],           "icon": "book",     "related": ["growth", "careervalue"] }
  ],
  "housing": [
    { "title": "전세 vs 월세",            "topic": "{winner}, 전세로 할까 월세로 할까?",           "options": ["전세", "월세"],                "icon": "wallet",   "related": ["cost", "contract"] },
    { "title": "계약 기간",               "topic": "{winner} 계약, 몇 년으로 할까?",               "options": ["1년", "2년"],                  "icon": "doc",      "related": ["cost", "contract"] },
    { "title": "이사 업체 비교",          "topic": "{winner:으로로} 이사할 때 어떤 방법이 좋을까?",      "options": ["포장이사", "반포장이사"],      "icon": "truck",    "related": ["cost", "effort"] },
    { "title": "가구·가전 구매",          "topic": "{winner}에 들일 가구, 새로 살까 중고로 살까?",  "options": ["새 제품", "중고"],             "icon": "box",      "related": ["space", "cost"] }
  ],
  "shopping": [
    { "title": "구매 시기",               "topic": "{winner}, 지금 살까 할인 시즌까지 기다릴까?",   "options": ["지금 구매", "할인 때 구매"],  "icon": "calendar", "related": ["price"] },
    { "title": "구매처 비교",             "topic": "{winner}, 어디서 사는 게 좋을까?",              "options": ["온라인", "오프라인 매장"],    "icon": "store",    "related": ["price", "delivery", "service"] },
    { "title": "보험·보증 연장",          "topic": "{winner} 살 때 보증 연장(보험)을 들까?",        "options": ["가입", "미가입"],             "icon": "shield",   "related": ["service", "durability"] },
    { "title": "액세서리 선택",           "topic": "{winner:과와} 같이 살 액세서리, 정품 vs 호환품?",  "options": ["정품", "호환품"],             "icon": "link",     "related": ["compat", "price"] }
  ],
  "etc": [
    { "title": "실행 시기",               "topic": "{winner}, 언제 시작할까?",                      "options": ["이번 주", "다음 달"],          "icon": "calendar", "related": ["time", "effort"] },
    { "title": "혼자 vs 함께",            "topic": "{winner}, 혼자 할까 누군가와 함께 할까?",       "options": ["혼자", "함께"],                "icon": "users",    "related": ["people", "fun"] },
    { "title": "예산 정하기",             "topic": "{winner}에 쓸 예산을 어느 정도로 할까?",        "options": ["최소한으로", "넉넉하게"],      "icon": "wallet",   "related": ["cost", "satisfaction"] }
  ]
};
