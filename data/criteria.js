/* 분류별 추천 기준 (담당: 조원3) — Claude 초안, 담당자 검토 필요
   - main: 2번 화면에 카드로 보이는 추천 기준 (default: true 는 처음부터 체크됨)
   - more: "이런 기준도 고려해보세요"에 보이는 추가 기준
   - icon: 아이콘 이름 (2번 화면 파일이 이 이름에 맞는 그림을 그림)
   - question: 4번 화면에서 "이걸 알아보세요"로 보여줄 질문
   - search: "검색해보기" 버튼에 쓸 검색어 틀 ({option} = 선택지 이름)
   - 같은 뜻의 기준은 분류가 달라도 같은 id를 쓴다 (예: safety). 점수 단어(keywords.js)를 함께 쓰기 위해서. */
Pickwise.data.criteria = {
  "travel": {
    "main": [
      { "id": "budget",    "name": "예산",        "icon": "wallet",   "default": true,  "question": "왕복 항공권과 1박 숙소비는 대략 얼마인가요?", "search": "{option} 여행 경비" },
      { "id": "weather",   "name": "날씨",        "icon": "sun",      "default": true,  "question": "가려는 달의 평균 기온과 비 오는 날은 어떤가요?", "search": "{option} 월별 날씨" },
      { "id": "sights",    "name": "관광·볼거리", "icon": "camera",   "default": true,  "question": "꼭 보고 싶은 명소나 체험이 몇 개나 있나요?", "search": "{option} 가볼만한 곳" },
      { "id": "food",      "name": "음식",        "icon": "utensils", "default": true,  "question": "현지 음식이 입에 맞을까요? 먹고 싶은 메뉴가 있나요?", "search": "{option} 현지 음식 추천" },
      { "id": "safety",    "name": "치안",        "icon": "shield",   "default": false, "question": "여행 경보 단계나 주의할 지역이 있나요?", "search": "{option} 여행 치안" },
      { "id": "transport", "name": "이동 편의성", "icon": "bus",      "default": true,  "question": "공항에서 숙소, 명소 사이 이동이 편한가요?", "search": "{option} 여행 교통" },
      { "id": "flight",    "name": "비행시간",    "icon": "plane",    "default": false, "question": "직항이 있나요? 비행시간은 몇 시간인가요?", "search": "{option} 직항 비행시간" },
      { "id": "rest",      "name": "휴양",        "icon": "beach",    "default": false, "question": "쉬면서 보낼 해변이나 리조트가 있나요?", "search": "{option} 휴양 리조트" }
    ],
    "more": [
      { "id": "crowd",    "name": "성수기 혼잡도", "icon": "users",    "question": "가려는 시기가 성수기인가요? 관광지가 붐비나요?", "search": "{option} 성수기 비수기" },
      { "id": "visa",     "name": "입국 절차",     "icon": "passport", "question": "비자나 사전 입국 신청이 필요한가요?", "search": "{option} 입국 비자" },
      { "id": "language", "name": "언어 소통",     "icon": "chat",     "question": "영어나 한국어로 소통이 잘 되나요?", "search": "{option} 여행 영어 소통" },
      { "id": "activity", "name": "액티비티",      "icon": "activity", "question": "하고 싶은 체험(투어, 수상 스포츠 등)이 있나요?", "search": "{option} 액티비티" }
    ]
  },

  "career": {
    "main": [
      { "id": "salary",     "name": "연봉·처우",     "icon": "wallet",   "default": true,  "question": "기본급, 성과급, 인상률은 어느 정도인가요?", "search": "{option} 연봉" },
      { "id": "growth",     "name": "성장 가능성",   "icon": "chart",    "default": true,  "question": "배울 수 있는 일과 승진 기회가 있나요?", "search": "{option} 성장 경력" },
      { "id": "worklife",   "name": "워라밸",        "icon": "clock",    "default": true,  "question": "평균 퇴근 시간과 야근 빈도는 어떤가요?", "search": "{option} 워라밸 후기" },
      { "id": "culture",    "name": "조직 문화",     "icon": "users",    "default": true,  "question": "분위기, 소통 방식, 의사결정 방식은 어떤가요?", "search": "{option} 조직문화 후기" },
      { "id": "stability",  "name": "회사 안정성",   "icon": "shield",   "default": true,  "question": "실적과 재무 상태가 안정적인가요?", "search": "{option} 실적 전망" },
      { "id": "commute",    "name": "출퇴근 거리",   "icon": "bus",      "default": false, "question": "집에서 회사까지 편도 몇 분 걸리나요?", "search": "{option} 위치" },
      { "id": "role",       "name": "직무 적합성",   "icon": "target",   "default": false, "question": "하고 싶은 일, 잘하는 일과 맞나요?", "search": "{option} 직무 소개" },
      { "id": "reputation", "name": "회사 평판",     "icon": "star",     "default": false, "question": "업계에서 회사 이름값과 평판은 어떤가요?", "search": "{option} 평판" }
    ],
    "more": [
      { "id": "benefits",    "name": "복지",           "icon": "gift",   "question": "식대, 휴가, 교육 지원 같은 복지가 있나요?", "search": "{option} 복지" },
      { "id": "team",        "name": "함께 일할 사람", "icon": "users",  "question": "팀장과 팀원들은 어떤 사람들인가요?", "search": "{option} 팀 분위기" },
      { "id": "careervalue", "name": "다음 이직 시 경력 가치", "icon": "chart", "question": "이 경력이 다음 이직에서 인정받을까요?", "search": "{option} 경력 인정" },
      { "id": "flexible",    "name": "재택·유연근무",  "icon": "home",   "question": "재택근무나 시차 출퇴근이 가능한가요?", "search": "{option} 재택근무" }
    ]
  },

  "housing": {
    "main": [
      { "id": "cost",        "name": "주거 비용",     "icon": "wallet",   "default": true,  "question": "보증금, 월세, 관리비를 합치면 한 달에 얼마인가요?", "search": "{option} 시세" },
      { "id": "commute",     "name": "통근 시간",     "icon": "bus",      "default": true,  "question": "회사나 학교까지 편도 몇 분 걸리나요?", "search": "{option} 교통" },
      { "id": "space",       "name": "방 크기·구조",  "icon": "home",     "default": true,  "question": "평수, 방 개수, 수납공간은 충분한가요?", "search": "{option} 구조" },
      { "id": "safety",      "name": "동네 치안",     "icon": "shield",   "default": true,  "question": "밤길이 밝고 안전한가요?", "search": "{option} 동네 치안" },
      { "id": "convenience", "name": "생활 편의시설", "icon": "store",    "default": true,  "question": "마트, 병원, 편의점이 가까운가요?", "search": "{option} 편의시설" },
      { "id": "condition",   "name": "건물 상태·채광","icon": "sun",      "default": false, "question": "곰팡이, 누수, 햇빛 드는 정도는 어떤가요?", "search": "{option} 채광" },
      { "id": "noise",       "name": "소음",          "icon": "volume",   "default": false, "question": "도로, 이웃, 공사 소음이 있나요?", "search": "{option} 소음" },
      { "id": "transit",     "name": "대중교통 접근성","icon": "train",   "default": false, "question": "지하철역이나 버스 정류장까지 몇 분인가요?", "search": "{option} 역세권" }
    ],
    "more": [
      { "id": "contract", "name": "계약 안전성",    "icon": "doc",    "question": "등기부등본상 대출이나 권리 관계에 문제가 없나요?", "search": "전세 계약 주의사항" },
      { "id": "parking",  "name": "주차",           "icon": "car",    "question": "주차 공간이 있나요? 비용은요?", "search": "{option} 주차" },
      { "id": "pet",      "name": "반려동물 가능",  "icon": "paw",    "question": "반려동물을 키울 수 있나요?", "search": "{option} 반려동물" },
      { "id": "upkeep",   "name": "관리비",         "icon": "receipt","question": "관리비에 무엇이 포함되고 얼마인가요?", "search": "{option} 관리비" }
    ]
  },

  "shopping": {
    "main": [
      { "id": "price",      "name": "가격",          "icon": "wallet",  "default": true,  "question": "정가와 할인가, 카드 혜택가는 얼마인가요?", "search": "{option} 최저가" },
      { "id": "quality",    "name": "성능·품질",     "icon": "star",    "default": true,  "question": "내가 주로 쓸 기능의 성능은 어떤가요?", "search": "{option} 성능 비교" },
      { "id": "design",     "name": "디자인",        "icon": "palette", "default": true,  "question": "색상, 크기, 모양이 마음에 드나요?", "search": "{option} 실물 디자인" },
      { "id": "durability", "name": "내구성",        "icon": "shield",  "default": true,  "question": "고장이나 파손 사례가 많지 않나요?", "search": "{option} 고장 내구성" },
      { "id": "service",    "name": "A/S·보증",      "icon": "tool",    "default": true,  "question": "보증 기간과 서비스센터 접근성은 어떤가요?", "search": "{option} AS 보증" },
      { "id": "reviews",    "name": "사용 후기",     "icon": "chat",    "default": false, "question": "실사용자들의 장단점 후기는 어떤가요?", "search": "{option} 실사용 후기" },
      { "id": "brand",      "name": "브랜드 신뢰도", "icon": "badge",   "default": false, "question": "믿을 만한 브랜드인가요?", "search": "{option} 브랜드 평판" },
      { "id": "running",    "name": "유지비",        "icon": "receipt", "default": false, "question": "소모품, 전기료, 보험료 같은 추가 비용이 있나요?", "search": "{option} 유지비" }
    ],
    "more": [
      { "id": "resale",   "name": "중고 가격",       "icon": "refresh", "question": "나중에 팔 때 값을 잘 받을 수 있나요?", "search": "{option} 중고 시세" },
      { "id": "compat",   "name": "기존 기기와 호환","icon": "link",    "question": "지금 쓰는 기기, 액세서리와 잘 맞나요?", "search": "{option} 호환" },
      { "id": "portable", "name": "크기·무게",       "icon": "box",     "question": "들고 다니거나 둘 공간에 맞나요?", "search": "{option} 무게 크기" },
      { "id": "delivery", "name": "배송·구매 편의",  "icon": "truck",   "question": "바로 받을 수 있나요? 교환·반품이 쉬운가요?", "search": "{option} 배송" }
    ]
  },

  "etc": {
    "main": [
      { "id": "cost",         "name": "비용",            "icon": "wallet", "default": true,  "question": "각 선택지에 드는 돈은 얼마인가요?", "search": "{option} 비용" },
      { "id": "time",         "name": "시간",            "icon": "clock",  "default": true,  "question": "각 선택지에 시간이 얼마나 드나요?", "search": "{option} 소요 시간" },
      { "id": "satisfaction", "name": "만족도",          "icon": "smile",  "default": true,  "question": "고른 뒤 내가 얼마나 만족할 것 같나요?", "search": "{option} 후기" },
      { "id": "risk",         "name": "위험·불확실성",   "icon": "alert",  "default": true,  "question": "잘못될 수 있는 점은 무엇인가요?", "search": "{option} 단점" },
      { "id": "longterm",     "name": "장기적 영향",     "icon": "chart",  "default": true,  "question": "1년 뒤의 나에게 어떤 영향을 줄까요?", "search": "{option} 장점 단점" },
      { "id": "effort",       "name": "노력·수고",       "icon": "tool",   "default": false, "question": "준비하거나 신경 쓸 일이 많나요?", "search": "{option} 준비" },
      { "id": "people",       "name": "주변 사람 영향",  "icon": "users",  "default": false, "question": "가족, 친구, 동료에게 어떤 영향이 있나요?", "search": "{option} 경험담" },
      { "id": "fun",          "name": "재미·흥미",       "icon": "spark",  "default": false, "question": "하면서 즐거울 것 같나요?", "search": "{option} 재미" }
    ],
    "more": [
      { "id": "reversible", "name": "되돌릴 수 있는지", "icon": "refresh", "question": "마음이 바뀌면 되돌릴 수 있나요?", "search": "{option} 취소 환불" },
      { "id": "learning",   "name": "배울 점",          "icon": "book",    "question": "새로 배우거나 얻는 경험이 있나요?", "search": "{option} 경험" },
      { "id": "health",     "name": "건강",             "icon": "heart",   "question": "몸과 마음 건강에 어떤 영향이 있나요?", "search": "{option} 건강" }
    ]
  }
};
