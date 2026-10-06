/* 분류별 일반 기준 (담당: 조원3) — 10/06 추가
   - 직접 입력한 주제에 맞는 데이터셋 시나리오가 없을 때 쓰는 기준 (예: 이직·토익 → 자기계발, 냉장고·요금제 → 소비)
     예전에는 같은 분류 시나리오 기준을 모두 합쳐서 보여줘서, 이직에 "1시간 소모 열량"·냉장고에 "총 재생시간"이 추천됐음
   - 공통 기준(초기 비용 + 사용 기간/소요 시간)은 데이터셋(data/criteria.js) 그대로 쓰고, 이 파일은 분류별 카드(main)와 추가 제안(more)만 정한다
   - 데이터셋 분류 기준은 화면 2에서 "이런 기준도 고려해보세요" 뒤쪽에 붙는다
   - 점수 단어는 data/keywords.js 의 같은 id를 쓴다 (10/05 Claude 임시안 기준을 git 기록에서 되살림)
   - 이 파일은 변환 도구가 만들지 않는다 → 직접 고쳐도 된다. 기타(etc)는 data/criteria.js 의 기준을 그대로 쓴다 */
Pickwise.data.criteriaGeneral = {
  "housing": {
    "main": [
      { "id": "commute",     "name": "통근 시간",       "icon": "bus",    "default": true,  "question": "회사까지 편도 몇 분 걸리나요? 환승은 몇 번인가요?", "search": "{option} 출퇴근" },
      { "id": "safety",      "name": "동네 치안",       "icon": "shield", "default": true,  "question": "밤길이 밝고 안전한가요?", "search": "{option} 치안" },
      { "id": "space",       "name": "방 크기·구조",    "icon": "home",   "default": true,  "question": "평수, 방 구조, 수납공간은 충분한가요?", "search": "{option} 구조" },
      { "id": "convenience", "name": "생활 편의시설",   "icon": "store",  "default": false, "question": "마트, 병원, 편의점이 가까운가요?", "search": "{option} 편의시설" },
      { "id": "condition",   "name": "건물 상태·채광",  "icon": "sun",    "default": false, "question": "곰팡이, 누수, 햇빛 드는 정도는 어떤가요?", "search": "{option} 채광" }
    ],
    "more": [
      { "id": "contract", "name": "계약 안전성",     "icon": "doc",     "question": "등기부등본상 대출이나 권리 관계에 문제가 없나요?", "search": "전세 계약 주의사항" },
      { "id": "upkeep",   "name": "관리비",          "icon": "receipt", "question": "관리비에 무엇이 포함되고 얼마인가요?", "search": "{option} 관리비" },
      { "id": "noise",    "name": "소음",            "icon": "volume",  "question": "도로, 이웃, 공사 소음이 있나요?", "search": "{option} 소음" },
      { "id": "transit",  "name": "대중교통 접근성", "icon": "train",   "question": "지하철역이나 버스 정류장까지 몇 분인가요?", "search": "{option} 역세권" }
    ]
  },

  "shopping": {
    "main": [
      { "id": "quality",    "name": "성능·품질", "icon": "star",    "default": true,  "question": "내가 주로 쓸 기능의 성능은 어떤가요?", "search": "{option} 성능 비교" },
      { "id": "durability", "name": "내구성",    "icon": "shield",  "default": true,  "question": "고장이나 파손 사례가 많지 않나요?", "search": "{option} 고장 내구성" },
      { "id": "design",     "name": "디자인",    "icon": "palette", "default": true,  "question": "색상, 크기, 모양이 마음에 드나요?", "search": "{option} 실물 디자인" },
      { "id": "service",    "name": "A/S·보증",  "icon": "tool",    "default": false, "question": "보증 기간과 서비스센터 접근성은 어떤가요?", "search": "{option} AS 보증" },
      { "id": "reviews",    "name": "사용 후기", "icon": "chat",    "default": false, "question": "실사용자들의 장단점 후기는 어떤가요?", "search": "{option} 실사용 후기" }
    ],
    "more": [
      { "id": "running",  "name": "유지비",           "icon": "receipt", "question": "소모품, 전기료, 보험료 같은 추가 비용이 있나요?", "search": "{option} 유지비" },
      { "id": "resale",   "name": "중고 가격",        "icon": "refresh", "question": "나중에 팔 때 값을 잘 받을 수 있나요?", "search": "{option} 중고 시세" },
      { "id": "compat",   "name": "기존 기기와 호환", "icon": "link",    "question": "지금 쓰는 기기, 액세서리와 잘 맞나요?", "search": "{option} 호환" },
      { "id": "portable", "name": "크기·무게",        "icon": "box",     "question": "들고 다니거나 둘 공간에 맞나요?", "search": "{option} 무게 크기" }
    ]
  },

  "leisure": {
    "main": [
      { "id": "fun",       "name": "재미·흥미",       "icon": "spark",    "default": true,  "question": "하면서 즐거울 것 같나요? 꼭 해 보고 싶은 게 있나요?", "search": "{option} 후기" },
      { "id": "transport", "name": "이동 편의성",     "icon": "bus",      "default": true,  "question": "오가는 길이 편한가요? 이동 시간은 얼마나 걸리나요?", "search": "{option} 가는 법" },
      { "id": "rest",      "name": "휴식·힐링",       "icon": "beach",    "default": true,  "question": "푹 쉬면서 재충전할 수 있나요?", "search": "{option} 힐링" },
      { "id": "weather",   "name": "날씨",            "icon": "sun",      "default": false, "question": "가려는 때의 날씨는 어떤가요?", "search": "{option} 날씨" },
      { "id": "sights",    "name": "볼거리·즐길거리", "icon": "camera",   "default": false, "question": "꼭 보고 싶은 곳이나 즐길 거리가 있나요?", "search": "{option} 가볼만한 곳" },
      { "id": "food",      "name": "음식",            "icon": "utensils", "default": false, "question": "먹고 싶은 음식이 있나요? 입에 맞을까요?", "search": "{option} 맛집" }
    ],
    "more": [
      { "id": "safety", "name": "안전",          "icon": "shield", "question": "다치거나 위험한 일은 없을까요?", "search": "{option} 주의사항" },
      { "id": "crowd",  "name": "혼잡도",        "icon": "users",  "question": "사람이 많이 붐비지는 않나요?", "search": "{option} 붐비는 시간" },
      { "id": "people", "name": "함께하는 사람", "icon": "users",  "question": "같이 할 사람이 있나요? 혼자서도 괜찮나요?", "search": "{option} 혼자" },
      { "id": "health", "name": "건강",          "icon": "heart",  "question": "몸과 마음 건강에 도움이 되나요?", "search": "{option} 효과" }
    ]
  },

  "selfdev": {
    "main": [
      { "id": "careervalue", "name": "커리어 도움",      "icon": "chart", "default": true,  "question": "지금 일이나 다음 이직에 실제로 도움이 되나요?", "search": "{option} 취업 이직 도움" },
      { "id": "effort",      "name": "난이도·부담",      "icon": "tool",  "default": true,  "question": "퇴근 후에도 꾸준히 할 수 있는 난이도인가요?", "search": "{option} 난이도" },
      { "id": "outcome",     "name": "눈에 보이는 성과", "icon": "badge", "default": true,  "question": "점수, 합격, 포트폴리오처럼 결과가 남나요?", "search": "{option} 합격률" },
      { "id": "fun",         "name": "재미·흥미",        "icon": "spark", "default": false, "question": "관심 있는 분야라 계속할 수 있을까요?", "search": "{option} 후기" },
      { "id": "learning",    "name": "배울 점",          "icon": "book",  "default": false, "question": "새로 배우거나 얻는 것이 있나요?", "search": "{option} 커리큘럼" }
    ],
    "more": [
      { "id": "schedule",   "name": "일정 유연성",             "icon": "calendar", "question": "야근이 있어도 일정을 맞출 수 있나요?", "search": "{option} 시간표" },
      { "id": "people",     "name": "함께하는 사람",           "icon": "users",    "question": "같이 공부할 사람이나 스터디가 있나요?", "search": "{option} 스터디" },
      { "id": "reversible", "name": "중간에 그만둘 수 있는지", "icon": "refresh",  "question": "맞지 않으면 환불하거나 그만둘 수 있나요?", "search": "{option} 환불 규정" },
      { "id": "health",     "name": "건강",                    "icon": "heart",    "question": "몸과 마음 건강에 도움이 되나요?", "search": "{option} 효과" }
    ]
  },

  "finance": {
    "main": [
      { "id": "return",    "name": "수익·혜택",           "icon": "chart",  "default": true,  "question": "금리, 수익률, 할인·적립 혜택은 어느 정도인가요?", "search": "{option} 금리 혜택" },
      { "id": "risk",      "name": "위험·안정성",         "icon": "shield", "default": true,  "question": "원금을 잃을 수 있나요? 예금자 보호가 되나요?", "search": "{option} 원금 보장" },
      { "id": "liquidity", "name": "필요할 때 꺼내 쓰기", "icon": "wallet", "default": true,  "question": "중간에 돈이 필요하면 깨거나 뺄 수 있나요? 손해는요?", "search": "{option} 중도해지" },
      { "id": "tax",       "name": "세금·가입 조건",      "icon": "doc",    "default": false, "question": "비과세·소득공제 혜택이나 가입 조건(나이·소득)이 있나요?", "search": "{option} 가입 조건 소득공제" }
    ],
    "more": [
      { "id": "fee",      "name": "수수료·연회비", "icon": "receipt", "question": "수수료나 연회비가 있나요?", "search": "{option} 수수료" },
      { "id": "longterm", "name": "장기적 영향",   "icon": "chart",   "question": "몇 년 뒤의 나에게 어떤 도움이 되나요?", "search": "{option} 장기" },
      { "id": "effort",   "name": "관리 수고",     "icon": "tool",    "question": "신경 쓰고 관리할 일이 많나요?", "search": "{option} 관리" }
    ]
  }
};
