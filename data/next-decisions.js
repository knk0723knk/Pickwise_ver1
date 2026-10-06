/* 다음 결정 추천 목록 (담당: 조원8) — ⚠ 10/05 Claude 임시안, 데이터팀 검토 예정
   - {winner} = 이번 결정의 1위 선택지 이름으로 바뀐다 (조사 표기는 templates.js 설명과 같음)
   - related: 이번 결정에서 이 기준들의 중요도가 높았으면 목록 위쪽에 보여준다
     (10/06: 데이터셋 기준 이름에 맞춰 cost → initial_cost, time → time_required 로 바꿈. 예전 이름이라 순서가 안 바뀌던 문제)
   - 누르면 topic·options가 채워진 채로 새 결정이 시작된다 */
Pickwise.data.nextDecisions = {
  "housing": [
    { "title": "전세 vs 월세",       "topic": "{winner}, 전세로 할까 월세로 할까?",            "options": ["전세", "월세"],             "icon": "wallet", "related": ["initial_cost", "contract"] },
    { "title": "계약 기간",          "topic": "{winner} 계약, 몇 년으로 할까?",                "options": ["1년", "2년"],               "icon": "doc",    "related": ["initial_cost", "contract"] },
    { "title": "이사 방법",          "topic": "{winner:으로로} 이사할 때 어떤 방법이 좋을까?",  "options": ["포장이사", "반포장이사"],   "icon": "truck",  "related": ["initial_cost", "time_required"] },
    { "title": "가구·가전 마련",     "topic": "{winner}에 들일 가구, 새로 살까 중고로 살까?",   "options": ["새 제품", "중고"],          "icon": "box",    "related": ["initial_cost", "space"] }
  ],
  "shopping": [
    { "title": "구매 시기",          "topic": "{winner}, 지금 살까 할인 시즌까지 기다릴까?",    "options": ["지금 구매", "할인 때 구매"], "icon": "calendar", "related": ["initial_cost", "time_required"] },
    { "title": "구매처 비교",        "topic": "{winner}, 어디서 사는 게 좋을까?",               "options": ["온라인", "오프라인 매장"],  "icon": "store",    "related": ["initial_cost", "service"] },
    { "title": "보증 연장",          "topic": "{winner} 살 때 보증 연장(보험)을 들까?",         "options": ["가입", "미가입"],           "icon": "shield",   "related": ["service", "durability"] },
    { "title": "결제 방법",          "topic": "{winner}, 일시불로 살까 할부로 살까?",           "options": ["일시불", "무이자 할부"],    "icon": "wallet",   "related": ["initial_cost"] }
  ],
  "leisure": [
    { "title": "같이 갈까 혼자 갈까","topic": "{winner}, 혼자 할까 누군가와 함께 할까?",        "options": ["혼자", "함께"],             "icon": "users",    "related": ["people", "fun"] },
    { "title": "시기 정하기",        "topic": "{winner}, 언제 하는 게 좋을까?",                 "options": ["이번 달", "다음 달"],        "icon": "calendar", "related": ["weather", "crowd", "time_required"] },
    { "title": "예산 정하기",        "topic": "{winner}에 쓸 예산을 어느 정도로 할까?",         "options": ["알뜰하게", "넉넉하게"],      "icon": "wallet",   "related": ["initial_cost", "satisfaction"] },
    { "title": "패키지 vs 자유롭게", "topic": "{winner}, 패키지로 할까 자유롭게 할까?",         "options": ["패키지", "자유롭게"],        "icon": "suitcase", "related": ["transport", "effort", "safety"] }
  ],
  "selfdev": [
    { "title": "배우는 방법",        "topic": "{winner}, 혼자 할까 강습·학원을 다닐까?",        "options": ["혼자", "강습·학원"],             "icon": "book",     "related": ["initial_cost", "schedule", "effort"] },
    { "title": "시작 시기",          "topic": "{winner}, 언제 시작할까?",                       "options": ["이번 달", "다음 분기"],      "icon": "calendar", "related": ["time_required", "schedule"] },
    { "title": "목표 정하기",        "topic": "{winner}, 목표를 어디까지 잡을까?",              "options": ["기본 수준", "높은 수준"],    "icon": "target",   "related": ["outcome", "careervalue"] },
    { "title": "회사 지원 활용",     "topic": "{winner}, 회사 교육 지원을 받을까 내 돈으로 할까?", "options": ["회사 지원", "개인 부담"], "icon": "gift",     "related": ["initial_cost", "careervalue"] }
  ],
  "finance": [
    { "title": "금액 정하기",        "topic": "{winner}에 매달 얼마를 넣을까?",                 "options": ["월 30만 원", "월 50만 원"],  "icon": "wallet",   "related": ["return", "liquidity"] },
    { "title": "상품 비교",          "topic": "{winner}, 어느 은행 상품으로 할까?",             "options": ["주거래 은행", "금리 높은 은행"], "icon": "chart", "related": ["return", "fee"] },
    { "title": "비상금 따로 두기",   "topic": "{winner:과와} 별도로 비상금 통장을 만들까?",        "options": ["만든다", "안 만든다"],       "icon": "shield",   "related": ["liquidity", "risk"] },
    { "title": "카드 고르기",        "topic": "첫 월급 카드, 신용카드 vs 체크카드?",            "options": ["신용카드", "체크카드"],      "icon": "wallet",   "related": ["return", "fee"] }
  ],
  "etc": [
    { "title": "실행 시기",          "topic": "{winner}, 언제 시작할까?",                       "options": ["이번 주", "다음 달"],        "icon": "calendar", "related": ["time_required", "effort"] },
    { "title": "혼자 vs 함께",       "topic": "{winner}, 혼자 할까 누군가와 함께 할까?",        "options": ["혼자", "함께"],             "icon": "users",    "related": ["people", "fun"] },
    { "title": "예산 정하기",        "topic": "{winner}에 쓸 예산을 어느 정도로 할까?",         "options": ["최소한으로", "넉넉하게"],    "icon": "wallet",   "related": ["initial_cost", "satisfaction"] }
  ]
};
