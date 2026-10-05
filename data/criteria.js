/* 분류별 비교 기준 — 직접 입력에도 쓰는 데이터셋 기준 (담당: 데이터팀 · 정리: 조원3)
   원본: 데이터팀 PICKWISE_dataset v2.4.0 (기준일 2026-10-05) · tools/convert-samples.js 로 자동 생성 — 직접 고치지 말고 원본 수정 후 다시 변환
   - scenarios.시나리오: 직접 입력한 주제가 hints 단어와 가장 많이 맞는 시나리오의 기준을 그대로 쓴다 (10/05 결정 B)
   - categories: 맞는 시나리오가 없을 때 쓰는 분류 단위 기준 (같은 분류 시나리오 기준을 합친 것)
   - categories.분류.common: 공통 기준 (데이터셋: 초기 비용 + 사용 기간[주거·소비] / 소요 시간[여가·자기계발·금융생활])
   - categories.분류.main: 카드로 보이는 기준 (데이터셋 primary) · default: true = 데이터셋에서 기본 선택
   - categories.분류.more: "이런 기준도 고려해보세요" (데이터셋 additional)
   - better: low = 낮을수록 좋음 / high = 높을수록 좋음
   - 기타(etc)는 데이터셋에 시나리오가 없어 공통 기준 + Claude 임시안 */
Pickwise.data.criteria = {
 "scenarios": {
  "housing_region": {
   "title": "청년전세임대 지역 비교",
   "category": "housing",
   "hints": [
    "청년전세임대",
    "전세임대",
    "지역",
    "수도권",
    "광역시",
    "서울",
    "경기",
    "지방",
    "이사",
    "자취",
    "원룸",
    "오피스텔",
    "투룸",
    "전세",
    "월세",
    "집"
   ],
   "common": [
    {
     "id": "initial_cost",
     "name": "보증금",
     "icon": "wallet",
     "default": true,
     "better": "low",
     "question": "보증금은 얼마인가요?",
     "search": "{option} 보증금"
    },
    {
     "id": "usable_duration",
     "name": "계약기간",
     "icon": "clock",
     "default": true,
     "better": "high",
     "question": "계약기간은 어느 정도인가요?",
     "search": "{option} 계약기간"
    }
   ],
   "main": [
    {
     "id": "support_cap",
     "name": "지원한도",
     "icon": "wallet",
     "default": true,
     "better": "high",
     "question": "지원한도는 얼마인가요?",
     "search": "{option} 지원한도"
    },
    {
     "id": "maximum_tenure",
     "name": "거주기간",
     "icon": "clock",
     "default": true,
     "better": "high",
     "question": "거주기간은 어느 정도인가요?",
     "search": "{option} 거주기간"
    },
    {
     "id": "scenario_monthly_rent",
     "name": "월 임대료",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "월 임대료는 얼마인가요?",
     "search": "{option} 월 임대료"
    },
    {
     "id": "deposit_ratio",
     "name": "보증금 비율",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "보증금 비율은 어느 정도인가요?",
     "search": "{option} 보증금 비율"
    }
   ],
   "more": [
    {
     "id": "maximum_renewals",
     "name": "재계약",
     "icon": "clock",
     "default": false,
     "better": "high",
     "question": "재계약은 어느 정도인가요?",
     "search": "{option} 재계약"
    },
    {
     "id": "renewal_months",
     "name": "연장기간",
     "icon": "clock",
     "default": false,
     "better": "high",
     "question": "연장기간은 어느 정도인가요?",
     "search": "{option} 연장기간"
    },
    {
     "id": "published_min_rate",
     "name": "최저금리",
     "icon": "chart",
     "default": false,
     "better": "low",
     "question": "최저금리는 어느 정도인가요?",
     "search": "{option} 최저금리"
    },
    {
     "id": "published_max_rate",
     "name": "최고금리",
     "icon": "chart",
     "default": false,
     "better": "low",
     "question": "최고금리는 어느 정도인가요?",
     "search": "{option} 최고금리"
    },
    {
     "id": "net_funded_principal",
     "name": "지원원금",
     "icon": "wallet",
     "default": false,
     "better": "high",
     "question": "지원원금은 얼마인가요?",
     "search": "{option} 지원원금"
    },
    {
     "id": "scenario_first_term_rent",
     "name": "총 임대료",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "총 임대료는 얼마인가요?",
     "search": "{option} 총 임대료"
    }
   ],
   "overlap": [
    {
     "ids": [
      "scenario_monthly_rent",
      "scenario_first_term_rent"
     ],
     "message": "월 임대료와 계약기간 임대료 합계는 같은 비용을 다른 기간으로 표현하므로 필요에 따라 하나만 선택해 주세요."
    },
    {
     "ids": [
      "usable_duration",
      "maximum_tenure",
      "maximum_renewals",
      "renewal_months"
     ],
     "message": "관련 원자료와 파생값의 중복 가중에 유의해 주세요."
    }
   ],
   "next": [
    "거주방식 선택",
    "이사 방식 선택",
    "가구 구매 방식 선택"
   ]
  },
  "housing_sharing": {
   "title": "청년전세임대 거주방식 비교",
   "category": "housing",
   "hints": [
    "공동거주",
    "셰어",
    "셰어하우스",
    "룸메이트",
    "동거",
    "같이 살",
    "혼자 살",
    "단독",
    "2인",
    "3인",
    "친구랑"
   ],
   "common": [
    {
     "id": "initial_cost",
     "name": "보증금",
     "icon": "wallet",
     "default": true,
     "better": "low",
     "question": "보증금은 얼마인가요?",
     "search": "{option} 보증금"
    },
    {
     "id": "usable_duration",
     "name": "계약기간",
     "icon": "clock",
     "default": true,
     "better": "high",
     "question": "계약기간은 어느 정도인가요?",
     "search": "{option} 계약기간"
    }
   ],
   "main": [
    {
     "id": "per_person_support_cap",
     "name": "개인 지원한도",
     "icon": "wallet",
     "default": true,
     "better": "high",
     "question": "개인 지원한도는 얼마인가요?",
     "search": "{option} 개인 지원한도"
    },
    {
     "id": "co_resident_count",
     "name": "동거인 수",
     "icon": "users",
     "default": true,
     "better": "low",
     "question": "동거인 수는 어느 정도인가요?",
     "search": "{option} 동거인 수"
    },
    {
     "id": "household_support_cap",
     "name": "전체 지원한도",
     "icon": "wallet",
     "default": false,
     "better": "high",
     "question": "전체 지원한도는 얼마인가요?",
     "search": "{option} 전체 지원한도"
    },
    {
     "id": "scenario_monthly_personal_rent",
     "name": "월 임대료",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "월 임대료는 얼마인가요?",
     "search": "{option} 월 임대료"
    }
   ],
   "more": [
    {
     "id": "maximum_tenure",
     "name": "거주기간",
     "icon": "clock",
     "default": false,
     "better": "high",
     "question": "거주기간은 어느 정도인가요?",
     "search": "{option} 거주기간"
    },
    {
     "id": "maximum_renewals",
     "name": "재계약",
     "icon": "clock",
     "default": false,
     "better": "high",
     "question": "재계약은 어느 정도인가요?",
     "search": "{option} 재계약"
    },
    {
     "id": "household_base_deposit",
     "name": "전체 보증금",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "전체 보증금은 얼마인가요?",
     "search": "{option} 전체 보증금"
    },
    {
     "id": "per_person_net_principal",
     "name": "개인 지원원금",
     "icon": "wallet",
     "default": false,
     "better": "high",
     "question": "개인 지원원금은 얼마인가요?",
     "search": "{option} 개인 지원원금"
    },
    {
     "id": "personal_deposit_ratio",
     "name": "보증금 비율",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "보증금 비율은 어느 정도인가요?",
     "search": "{option} 보증금 비율"
    },
    {
     "id": "scenario_first_term_personal_rent",
     "name": "총 임대료",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "총 임대료는 얼마인가요?",
     "search": "{option} 총 임대료"
    }
   ],
   "overlap": [
    {
     "ids": [
      "scenario_monthly_personal_rent",
      "scenario_first_term_personal_rent"
     ],
     "message": "월 임대료와 계약기간 임대료 합계는 같은 비용을 다른 기간으로 표현하므로 필요에 따라 하나만 선택해 주세요."
    },
    {
     "ids": [
      "household_support_cap",
      "per_person_support_cap",
      "per_person_net_principal"
     ],
     "message": "관련 원자료와 파생값의 중복 가중에 유의해 주세요."
    }
   ],
   "next": [
    "공동생활 규칙 정하기",
    "가구 구매 방식 선택",
    "이사 방식 선택"
   ]
  },
  "laptop_purchase": {
   "title": "맥북 구매",
   "category": "shopping",
   "hints": [
    "노트북",
    "맥북",
    "그램",
    "갤럭시북",
    "랩탑",
    "컴퓨터",
    "맥",
    "아이패드",
    "태블릿"
   ],
   "common": [
    {
     "id": "initial_cost",
     "name": "가격",
     "icon": "wallet",
     "default": true,
     "better": "low",
     "question": "가격은 얼마인가요?",
     "search": "{option} 가격"
    },
    {
     "id": "usable_duration",
     "name": "배터리",
     "icon": "clock",
     "default": true,
     "better": "high",
     "question": "배터리는 어느 정도인가요?",
     "search": "{option} 배터리"
    }
   ],
   "main": [
    {
     "id": "weight",
     "name": "무게",
     "icon": "box",
     "default": true,
     "better": "low",
     "question": "무게는 어느 정도인가요?",
     "search": "{option} 무게"
    },
    {
     "id": "screen_diagonal",
     "name": "화면 크기",
     "icon": "camera",
     "default": true,
     "better": "high",
     "question": "화면 크기는 어느 정도인가요?",
     "search": "{option} 화면 크기"
    },
    {
     "id": "storage_capacity",
     "name": "저장공간",
     "icon": "wallet",
     "default": false,
     "better": "high",
     "question": "저장공간은 어느 정도인가요?",
     "search": "{option} 저장공간"
    },
    {
     "id": "memory_capacity",
     "name": "메모리",
     "icon": "wallet",
     "default": false,
     "better": "high",
     "question": "메모리는 어느 정도인가요?",
     "search": "{option} 메모리"
    }
   ],
   "more": [
    {
     "id": "thunderbolt_port_count",
     "name": "연결 포트",
     "icon": "star",
     "default": false,
     "better": "high",
     "question": "연결 포트는 어느 정도인가요?",
     "search": "{option} 연결 포트"
    },
    {
     "id": "battery_capacity",
     "name": "배터리 용량",
     "icon": "wallet",
     "default": false,
     "better": "high",
     "question": "배터리 용량은 어느 정도인가요?",
     "search": "{option} 배터리 용량"
    },
    {
     "id": "gpu_core_count",
     "name": "그래픽 코어",
     "icon": "star",
     "default": false,
     "better": "high",
     "question": "그래픽 코어는 어느 정도인가요?",
     "search": "{option} 그래픽 코어"
    },
    {
     "id": "cpu_core_count",
     "name": "CPU 코어",
     "icon": "star",
     "default": false,
     "better": "high",
     "question": "CPU 코어는 어느 정도인가요?",
     "search": "{option} CPU 코어"
    },
    {
     "id": "display_pixel_count",
     "name": "해상도",
     "icon": "camera",
     "default": false,
     "better": "high",
     "question": "해상도는 어느 정도인가요?",
     "search": "{option} 해상도"
    },
    {
     "id": "wireless_web_duration",
     "name": "웹 사용시간",
     "icon": "clock",
     "default": false,
     "better": "high",
     "question": "웹 사용시간은 어느 정도인가요?",
     "search": "{option} 웹 사용시간"
    }
   ],
   "overlap": [
    {
     "ids": [
      "usable_duration",
      "wireless_web_duration",
      "battery_capacity"
     ],
     "message": "재생시간·웹 사용시간·배터리 용량은 관련성이 있지만 시험 조건과 의미가 달라요. 중복 가중에 유의해 주세요."
    }
   ],
   "next": [
    "노트북 가방 선택",
    "외장 모니터 선택",
    "보증 연장 선택"
   ]
  },
  "earbuds_purchase": {
   "title": "무선 이어폰 구매",
   "category": "shopping",
   "hints": [
    "이어폰",
    "버즈",
    "에어팟",
    "헤드폰",
    "헤드셋",
    "블루투스",
    "무선 이어폰"
   ],
   "common": [
    {
     "id": "initial_cost",
     "name": "가격",
     "icon": "wallet",
     "default": true,
     "better": "low",
     "question": "가격은 얼마인가요?",
     "search": "{option} 가격"
    },
    {
     "id": "usable_duration",
     "name": "배터리",
     "icon": "clock",
     "default": true,
     "better": "high",
     "question": "배터리는 어느 정도인가요?",
     "search": "{option} 배터리"
    }
   ],
   "main": [
    {
     "id": "earbud_weight",
     "name": "무게",
     "icon": "box",
     "default": true,
     "better": "low",
     "question": "무게는 어느 정도인가요?",
     "search": "{option} 무게"
    },
    {
     "id": "anc_supported",
     "name": "노이즈 캔슬링",
     "icon": "star",
     "default": false,
     "better": "high",
     "question": "노이즈 캔슬링이 되나요?",
     "search": "{option} 노이즈 캔슬링"
    },
    {
     "id": "transparency_supported",
     "name": "주변음 듣기",
     "icon": "star",
     "default": false,
     "better": "high",
     "question": "주변음 듣기가 되나요?",
     "search": "{option} 주변음 듣기"
    },
    {
     "id": "wireless_charging_supported",
     "name": "무선충전",
     "icon": "star",
     "default": false,
     "better": "high",
     "question": "무선충전이 되나요?",
     "search": "{option} 무선충전"
    },
    {
     "id": "case_playback_duration",
     "name": "총 재생시간",
     "icon": "clock",
     "default": true,
     "better": "high",
     "question": "총 재생시간은 어느 정도인가요?",
     "search": "{option} 총 재생시간"
    }
   ],
   "more": [
    {
     "id": "case_weight",
     "name": "케이스 무게",
     "icon": "box",
     "default": false,
     "better": "low",
     "question": "케이스 무게는 어느 정도인가요?",
     "search": "{option} 케이스 무게"
    },
    {
     "id": "total_carry_weight",
     "name": "전체 무게",
     "icon": "box",
     "default": false,
     "better": "low",
     "question": "전체 무게는 어느 정도인가요?",
     "search": "{option} 전체 무게"
    },
    {
     "id": "anc_off_duration",
     "name": "일반 재생시간",
     "icon": "clock",
     "default": false,
     "better": "high",
     "question": "일반 재생시간은 어느 정도인가요?",
     "search": "{option} 일반 재생시간"
    },
    {
     "id": "anc_off_case_duration",
     "name": "일반 총시간",
     "icon": "clock",
     "default": false,
     "better": "high",
     "question": "일반 총시간은 어느 정도인가요?",
     "search": "{option} 일반 총시간"
    },
    {
     "id": "case_envelope_volume",
     "name": "케이스 크기",
     "icon": "box",
     "default": false,
     "better": "low",
     "question": "케이스 크기는 어느 정도인가요?",
     "search": "{option} 케이스 크기"
    }
   ],
   "overlap": [
    {
     "ids": [
      "earbud_weight",
      "case_weight",
      "total_carry_weight"
     ],
     "message": "전체 무게와 구성요소 무게를 동시에 가중하면 무게를 중복 반영해요."
    }
   ],
   "next": [
    "이어폰 케이스 선택",
    "보증 연장 선택",
    "충전기 선택"
   ]
  },
  "travel_domestic": {
   "title": "국내 여행지 선택",
   "category": "leisure",
   "hints": [
    "여행",
    "여행지",
    "국내",
    "휴가",
    "제주",
    "부산",
    "전주",
    "강릉",
    "경주",
    "여수",
    "속초",
    "숙소",
    "해외"
   ],
   "common": [
    {
     "id": "initial_cost",
     "name": "총 여행 비용",
     "icon": "wallet",
     "default": true,
     "better": "low",
     "question": "총 여행 비용은 얼마인가요?",
     "search": "{option} 총 여행 비용"
    },
    {
     "id": "time_required",
     "name": "이동 시간",
     "icon": "clock",
     "default": true,
     "better": "low",
     "question": "이동 시간은 어느 정도인가요?",
     "search": "{option} 이동 시간"
    }
   ],
   "main": [
    {
     "id": "transport_cost",
     "name": "왕복 교통비",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "왕복 교통비는 얼마인가요?",
     "search": "{option} 왕복 교통비"
    },
    {
     "id": "lodging_cost",
     "name": "숙박비(2박)",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "숙박비(2박)은 얼마인가요?",
     "search": "{option} 숙박비"
    },
    {
     "id": "meal_price",
     "name": "대표 음식 1인분",
     "icon": "wallet",
     "default": true,
     "better": "low",
     "question": "대표 음식 1인분은 얼마인가요?",
     "search": "{option} 대표 음식 1인분"
    },
    {
     "id": "local_transport_cost",
     "name": "현지 이동비",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "현지 이동비는 얼마인가요?",
     "search": "{option} 현지 이동비"
    },
    {
     "id": "transit_only",
     "name": "대중교통 이동",
     "icon": "bus",
     "default": true,
     "better": "high",
     "question": "대중교통 이동이 되나요?",
     "search": "{option} 대중교통 이동"
    }
   ],
   "more": [
    {
     "id": "oct_temperature",
     "name": "10월 평균 기온",
     "icon": "sun",
     "default": false,
     "better": "high",
     "question": "10월 평균 기온은 어느 정도인가요?",
     "search": "{option} 10월 평균 기온"
    }
   ],
   "overlap": [
    {
     "ids": [
      "initial_cost",
      "transport_cost",
      "lodging_cost",
      "meal_price",
      "local_transport_cost"
     ],
     "message": "총 여행 비용에는 교통비, 숙박비, 식비, 현지 이동비가 이미 들어 있어요. 함께 고르면 비용이 중복해서 반영돼요."
    }
   ],
   "next": [
    "숙소 종류 선택",
    "교통수단 선택",
    "여행 일정 정하기"
   ]
  },
  "savings_choice": {
   "title": "예금·적금 선택",
   "category": "finance",
   "hints": [
    "적금",
    "예금",
    "저축",
    "통장",
    "파킹",
    "이자",
    "금리",
    "청약"
   ],
   "common": [
    {
     "id": "initial_cost",
     "name": "처음 필요한 돈",
     "icon": "wallet",
     "default": true,
     "better": "low",
     "question": "처음 필요한 돈은 얼마인가요?",
     "search": "{option} 처음 필요한 돈"
    },
    {
     "id": "time_required",
     "name": "돈이 묶이는 기간",
     "icon": "clock",
     "default": true,
     "better": "low",
     "question": "돈이 묶이는 기간은 어느 정도인가요?",
     "search": "{option} 돈이 묶이는 기간"
    }
   ],
   "main": [
    {
     "id": "interest_rate",
     "name": "표시 금리",
     "icon": "chart",
     "default": false,
     "better": "high",
     "question": "표시 금리는 어느 정도인가요?",
     "search": "{option} 표시 금리"
    },
    {
     "id": "total_interest",
     "name": "만기 이자(세전)",
     "icon": "wallet",
     "default": true,
     "better": "high",
     "question": "만기 이자(세전)은 얼마인가요?",
     "search": "{option} 만기 이자"
    },
    {
     "id": "auto_saving",
     "name": "매달 자동 납입",
     "icon": "refresh",
     "default": true,
     "better": "high",
     "question": "매달 자동 납입이 되나요?",
     "search": "{option} 매달 자동 납입"
    },
    {
     "id": "early_withdrawal_rate",
     "name": "중도해지 금리",
     "icon": "chart",
     "default": true,
     "better": "high",
     "question": "중도해지 금리는 어느 정도인가요?",
     "search": "{option} 중도해지 금리"
    }
   ],
   "more": [
    {
     "id": "after_tax_interest",
     "name": "만기 이자(세후)",
     "icon": "wallet",
     "default": false,
     "better": "high",
     "question": "만기 이자(세후)는 얼마인가요?",
     "search": "{option} 만기 이자"
    },
    {
     "id": "return_on_principal",
     "name": "납입금 대비 이자율",
     "icon": "wallet",
     "default": false,
     "better": "high",
     "question": "납입금 대비 이자율은 어느 정도인가요?",
     "search": "{option} 납입금 대비 이자율"
    },
    {
     "id": "min_deposit",
     "name": "최소 가입 금액",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "최소 가입 금액은 얼마인가요?",
     "search": "{option} 최소 가입 금액"
    },
    {
     "id": "protection_limit",
     "name": "예금자보호 한도",
     "icon": "shield",
     "default": false,
     "better": "high",
     "question": "예금자보호 한도는 얼마인가요?",
     "search": "{option} 예금자보호 한도"
    }
   ],
   "overlap": [
    {
     "ids": [
      "total_interest",
      "after_tax_interest",
      "return_on_principal"
     ],
     "message": "세전 이자, 세후 이자, 납입금 대비 이자율은 같은 이자에서 나온 값이에요. 함께 고르면 이자가 중복해서 반영돼요."
    },
    {
     "ids": [
      "initial_cost",
      "time_required"
     ],
     "message": "처음 필요한 돈과 돈이 묶이는 기간은 목돈 없이 시작할 수 있는지와 함께 움직여요. 둘 다 고르면 같은 방향으로 크게 반영돼요."
    }
   ],
   "next": [
    "가입할 은행 선택",
    "월 납입 금액 정하기",
    "청년 우대 상품 알아보기"
   ]
  },
  "exercise_choice": {
   "title": "운동 종류 선택",
   "category": "selfdev",
   "hints": [
    "운동",
    "헬스",
    "pt",
    "필라테스",
    "테니스",
    "요가",
    "수영",
    "러닝",
    "클라이밍",
    "골프",
    "크로스핏",
    "복싱"
   ],
   "common": [
    {
     "id": "initial_cost",
     "name": "첫 달 비용",
     "icon": "wallet",
     "default": true,
     "better": "low",
     "question": "첫 달 비용은 얼마인가요?",
     "search": "{option} 첫 달 비용"
    },
    {
     "id": "time_required",
     "name": "주당 소요 시간",
     "icon": "clock",
     "default": true,
     "better": "low",
     "question": "주당 소요 시간은 어느 정도인가요?",
     "search": "{option} 주당 소요 시간"
    }
   ],
   "main": [
    {
     "id": "calorie_per_hour",
     "name": "1시간 소모 열량",
     "icon": "heart",
     "default": true,
     "better": "high",
     "question": "1시간 소모 열량은 어느 정도인가요?",
     "search": "{option} 1시간 소모 열량"
    },
    {
     "id": "group_size",
     "name": "함께 운동하는 사람",
     "icon": "users",
     "default": true,
     "better": "high",
     "question": "함께 운동하는 사람은 어느 정도인가요?",
     "search": "{option} 함께 운동하는 사람"
    },
    {
     "id": "one_to_one",
     "name": "1:1 코칭",
     "icon": "users",
     "default": false,
     "better": "high",
     "question": "1:1 코칭이 되나요?",
     "search": "{option} 1:1 코칭"
    },
    {
     "id": "weather_free",
     "name": "날씨와 무관",
     "icon": "sun",
     "default": true,
     "better": "high",
     "question": "날씨와 무관이 되나요?",
     "search": "{option} 날씨와 무관"
    }
   ],
   "more": [
    {
     "id": "monthly_cost",
     "name": "월 비용",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "월 비용은 얼마인가요?",
     "search": "{option} 월 비용"
    },
    {
     "id": "equipment_cost",
     "name": "장비 구입비",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "장비 구입비는 얼마인가요?",
     "search": "{option} 장비 구입비"
    },
    {
     "id": "session_minutes",
     "name": "1회 수업 시간",
     "icon": "clock",
     "default": false,
     "better": "high",
     "question": "1회 수업 시간은 어느 정도인가요?",
     "search": "{option} 1회 수업 시간"
    },
    {
     "id": "sessions_per_month",
     "name": "월 수업 횟수",
     "icon": "clock",
     "default": false,
     "better": "high",
     "question": "월 수업 횟수는 어느 정도인가요?",
     "search": "{option} 월 수업 횟수"
    }
   ],
   "overlap": [
    {
     "ids": [
      "initial_cost",
      "monthly_cost",
      "equipment_cost"
     ],
     "message": "첫 달 비용에는 월 비용과 장비 구입비가 이미 들어 있어요. 함께 고르면 비용이 중복해서 반영돼요."
    }
   ],
   "next": [
    "운동 시간대 정하기",
    "운동 장소 선택",
    "운동 장비 구매"
   ]
  },
  "weekend_activity": {
   "title": "주말 활동 선택",
   "category": "leisure",
   "hints": [
    "주말",
    "영화",
    "피크닉",
    "한강",
    "데이트",
    "전시",
    "전시회",
    "공연",
    "산책",
    "등산",
    "놀이공원",
    "카페",
    "뭐 하지",
    "뭐 할까"
   ],
   "common": [
    {
     "id": "initial_cost",
     "name": "1인 비용",
     "icon": "wallet",
     "default": true,
     "better": "low",
     "question": "1인 비용은 얼마인가요?",
     "search": "{option} 1인 비용"
    },
    {
     "id": "time_required",
     "name": "소요 시간",
     "icon": "clock",
     "default": true,
     "better": "low",
     "question": "소요 시간은 어느 정도인가요?",
     "search": "{option} 소요 시간"
    }
   ],
   "main": [
    {
     "id": "weather_free",
     "name": "날씨와 무관",
     "icon": "sun",
     "default": true,
     "better": "high",
     "question": "날씨와 무관이 되나요?",
     "search": "{option} 날씨와 무관"
    },
    {
     "id": "conversation",
     "name": "대화 가능",
     "icon": "users",
     "default": true,
     "better": "high",
     "question": "대화 가능이 되나요?",
     "search": "{option} 대화 가능"
    },
    {
     "id": "reservation_needed",
     "name": "사전 예매",
     "icon": "doc",
     "default": false,
     "better": "low",
     "question": "사전 예매가 되나요?",
     "search": "{option} 사전 예매"
    },
    {
     "id": "outdoor_time",
     "name": "야외 활동 시간",
     "icon": "clock",
     "default": true,
     "better": "high",
     "question": "야외 활동 시간은 어느 정도인가요?",
     "search": "{option} 야외 활동 시간"
    }
   ],
   "more": [
    {
     "id": "prep_items",
     "name": "챙길 준비물",
     "icon": "doc",
     "default": false,
     "better": "low",
     "question": "챙길 준비물은 어느 정도인가요?",
     "search": "{option} 챙길 준비물"
    }
   ],
   "overlap": [
    {
     "ids": [
      "weather_free",
      "outdoor_time"
     ],
     "message": "날씨와 무관한지와 야외 활동 시간은 서로 반대로 움직여요. 함께 고르면 한쪽이 다른 쪽을 상쇄해요."
    }
   ],
   "next": [
    "볼 영화 선택",
    "피크닉 장소 선택",
    "함께할 사람 정하기"
   ]
  }
 },
 "categories": {
  "housing": {
   "common": [
    {
     "id": "initial_cost",
     "name": "초기 비용",
     "icon": "wallet",
     "default": true,
     "better": "low",
     "question": "처음에 드는 돈은 얼마인가요? (보증금·가격·첫 달 비용 등)",
     "search": "{option} 초기 비용"
    },
    {
     "id": "usable_duration",
     "name": "사용 기간",
     "icon": "clock",
     "default": true,
     "better": "high",
     "question": "얼마나 오래 쓸 수 있나요? (계약기간·배터리 등)",
     "search": "{option} 사용 기간"
    }
   ],
   "main": [
    {
     "id": "support_cap",
     "name": "지원한도",
     "icon": "wallet",
     "default": true,
     "better": "high",
     "question": "지원한도는 얼마인가요?",
     "search": "{option} 지원한도",
     "help": "전세금 지원한도 (원)"
    },
    {
     "id": "maximum_tenure",
     "name": "거주기간",
     "icon": "clock",
     "default": true,
     "better": "high",
     "question": "거주기간은 어느 정도인가요?",
     "search": "{option} 거주기간",
     "help": "최대 거주기간 (개월)"
    },
    {
     "id": "scenario_monthly_rent",
     "name": "월 임대료",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "월 임대료는 얼마인가요?",
     "search": "{option} 월 임대료",
     "help": "지원한도 전액 사용·연 2.2%·금리우대 적용 전으로 계산한 월 임대료예요. 관리비·공과금은 제외하며 실제 청구액이 아니에요."
    },
    {
     "id": "deposit_ratio",
     "name": "보증금 비율",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "보증금 비율은 어느 정도인가요?",
     "search": "{option} 보증금 비율",
     "help": "지원한도 대비 기본 보증금 비율 (%) — initial_cost / support_cap * 100"
    },
    {
     "id": "per_person_support_cap",
     "name": "개인 지원한도",
     "icon": "wallet",
     "default": true,
     "better": "high",
     "question": "개인 지원한도는 얼마인가요?",
     "search": "{option} 개인 지원한도",
     "help": "주택 전체 지원한도를 인원수로 나눈 비교용 환산액이에요. 개인에게 지급되는 금액이 아니에요."
    },
    {
     "id": "co_resident_count",
     "name": "동거인 수",
     "icon": "users",
     "default": true,
     "better": "low",
     "question": "동거인 수는 어느 정도인가요?",
     "search": "{option} 동거인 수",
     "help": "함께 사는 사람 수 (명) — resident_count - 1"
    },
    {
     "id": "household_support_cap",
     "name": "전체 지원한도",
     "icon": "wallet",
     "default": false,
     "better": "high",
     "question": "전체 지원한도는 얼마인가요?",
     "search": "{option} 전체 지원한도",
     "help": "주택 전체 지원한도 (원)"
    }
   ],
   "more": [
    {
     "id": "maximum_renewals",
     "name": "재계약",
     "icon": "clock",
     "default": false,
     "better": "high",
     "question": "재계약은 어느 정도인가요?",
     "search": "{option} 재계약",
     "help": "혼인 추가연장 제외 최대 재계약 횟수 (회)"
    },
    {
     "id": "renewal_months",
     "name": "연장기간",
     "icon": "clock",
     "default": false,
     "better": "high",
     "question": "연장기간은 어느 정도인가요?",
     "search": "{option} 연장기간",
     "help": "최초 계약 이후 최대 연장기간 (개월) — maximum_tenure - usable_duration"
    },
    {
     "id": "published_min_rate",
     "name": "최저금리",
     "icon": "chart",
     "default": false,
     "better": "low",
     "question": "최저금리는 어느 정도인가요?",
     "search": "{option} 최저금리",
     "help": "공시 기본금리 범위의 하단이에요. 본인에게 적용되는 확정금리나 우대 후 최저금리가 아니에요."
    },
    {
     "id": "published_max_rate",
     "name": "최고금리",
     "icon": "chart",
     "default": false,
     "better": "low",
     "question": "최고금리는 어느 정도인가요?",
     "search": "{option} 최고금리",
     "help": "공시 기본금리 범위의 상단이에요. 본인에게 적용되는 확정금리는 아니에요."
    },
    {
     "id": "net_funded_principal",
     "name": "지원원금",
     "icon": "wallet",
     "default": false,
     "better": "high",
     "question": "지원원금은 얼마인가요?",
     "search": "{option} 지원원금",
     "help": "지원한도에서 기본 보증금을 뺀 계산값이에요. 실제 지원 확정액이 아니에요."
    },
    {
     "id": "scenario_first_term_rent",
     "name": "총 임대료",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "총 임대료는 얼마인가요?",
     "search": "{option} 총 임대료",
     "help": "위 월 임대료 시나리오에 최초 계약기간을 곱한 임대료 합계예요. 보증금·관리비·공과금은 제외해요."
    },
    {
     "id": "household_base_deposit",
     "name": "전체 보증금",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "전체 보증금은 얼마인가요?",
     "search": "{option} 전체 보증금",
     "help": "전체 인원 기본 보증금 합계 (원) — initial_cost * resident_count"
    },
    {
     "id": "per_person_net_principal",
     "name": "개인 지원원금",
     "icon": "wallet",
     "default": false,
     "better": "high",
     "question": "개인 지원원금은 얼마인가요?",
     "search": "{option} 개인 지원원금",
     "help": "전체 지원한도에서 전원 기본 보증금을 뺀 뒤 인원수로 나눈 계산값이에요."
    }
   ],
   "overlap": [
    {
     "ids": [
      "scenario_monthly_rent",
      "scenario_first_term_rent"
     ],
     "message": "월 임대료와 계약기간 임대료 합계는 같은 비용을 다른 기간으로 표현하므로 필요에 따라 하나만 선택해 주세요."
    },
    {
     "ids": [
      "usable_duration",
      "maximum_tenure",
      "maximum_renewals",
      "renewal_months"
     ],
     "message": "관련 원자료와 파생값의 중복 가중에 유의해 주세요."
    },
    {
     "ids": [
      "scenario_monthly_personal_rent",
      "scenario_first_term_personal_rent"
     ],
     "message": "월 임대료와 계약기간 임대료 합계는 같은 비용을 다른 기간으로 표현하므로 필요에 따라 하나만 선택해 주세요."
    },
    {
     "ids": [
      "household_support_cap",
      "per_person_support_cap",
      "per_person_net_principal"
     ],
     "message": "관련 원자료와 파생값의 중복 가중에 유의해 주세요."
    }
   ]
  },
  "shopping": {
   "common": [
    {
     "id": "initial_cost",
     "name": "초기 비용",
     "icon": "wallet",
     "default": true,
     "better": "low",
     "question": "처음에 드는 돈은 얼마인가요? (보증금·가격·첫 달 비용 등)",
     "search": "{option} 초기 비용"
    },
    {
     "id": "usable_duration",
     "name": "사용 기간",
     "icon": "clock",
     "default": true,
     "better": "high",
     "question": "얼마나 오래 쓸 수 있나요? (계약기간·배터리 등)",
     "search": "{option} 사용 기간"
    }
   ],
   "main": [
    {
     "id": "weight",
     "name": "무게",
     "icon": "box",
     "default": true,
     "better": "low",
     "question": "무게는 어느 정도인가요?",
     "search": "{option} 무게",
     "help": "본체 무게 (kg)"
    },
    {
     "id": "screen_diagonal",
     "name": "화면 크기",
     "icon": "camera",
     "default": true,
     "better": "high",
     "question": "화면 크기는 어느 정도인가요?",
     "search": "{option} 화면 크기",
     "help": "화면 대각선 (cm)"
    },
    {
     "id": "storage_capacity",
     "name": "저장공간",
     "icon": "wallet",
     "default": false,
     "better": "high",
     "question": "저장공간은 어느 정도인가요?",
     "search": "{option} 저장공간",
     "help": "기본형 저장공간 (GB)"
    },
    {
     "id": "memory_capacity",
     "name": "메모리",
     "icon": "wallet",
     "default": false,
     "better": "high",
     "question": "메모리는 어느 정도인가요?",
     "search": "{option} 메모리",
     "help": "기본형 메모리 용량 (GB)"
    },
    {
     "id": "anc_supported",
     "name": "노이즈 캔슬링",
     "icon": "star",
     "default": false,
     "better": "high",
     "question": "노이즈 캔슬링이 되나요?",
     "search": "{option} 노이즈 캔슬링",
     "help": "ANC 기능 지원 여부예요. 소음 차단 성능이나 만족도 점수가 아니에요."
    },
    {
     "id": "transparency_supported",
     "name": "주변음 듣기",
     "icon": "star",
     "default": false,
     "better": "high",
     "question": "주변음 듣기가 되나요?",
     "search": "{option} 주변음 듣기",
     "help": "이어버드를 착용한 상태에서 주변 소리를 듣는 기능의 지원 여부예요."
    },
    {
     "id": "wireless_charging_supported",
     "name": "무선충전",
     "icon": "star",
     "default": false,
     "better": "high",
     "question": "무선충전이 되나요?",
     "search": "{option} 무선충전",
     "help": "충전 케이스의 무선충전 지원 여부예요."
    },
    {
     "id": "case_playback_duration",
     "name": "총 재생시간",
     "icon": "clock",
     "default": true,
     "better": "high",
     "question": "총 재생시간은 어느 정도인가요?",
     "search": "{option} 총 재생시간",
     "help": "ANC를 켠 상태에서 케이스 충전까지 포함한 최대 총 음악 재생시간이에요."
    }
   ],
   "more": [
    {
     "id": "thunderbolt_port_count",
     "name": "연결 포트",
     "icon": "star",
     "default": false,
     "better": "high",
     "question": "연결 포트는 어느 정도인가요?",
     "search": "{option} 연결 포트",
     "help": "썬더볼트 4 USB-C 포트 개수예요. 모든 종류의 연결 포트를 합산한 값은 아니에요."
    },
    {
     "id": "battery_capacity",
     "name": "배터리 용량",
     "icon": "wallet",
     "default": false,
     "better": "high",
     "question": "배터리 용량은 어느 정도인가요?",
     "search": "{option} 배터리 용량",
     "help": "배터리 용량 (Wh)"
    },
    {
     "id": "gpu_core_count",
     "name": "그래픽 코어",
     "icon": "star",
     "default": false,
     "better": "high",
     "question": "그래픽 코어는 어느 정도인가요?",
     "search": "{option} 그래픽 코어",
     "help": "기본형 GPU 코어 수예요. 실제 그래픽 성능 점수를 뜻하지 않아요."
    },
    {
     "id": "cpu_core_count",
     "name": "CPU 코어",
     "icon": "star",
     "default": false,
     "better": "high",
     "question": "CPU 코어는 어느 정도인가요?",
     "search": "{option} CPU 코어",
     "help": "CPU 코어 수예요. 실제 작업 성능 점수를 뜻하지 않아요."
    },
    {
     "id": "display_pixel_count",
     "name": "해상도",
     "icon": "camera",
     "default": false,
     "better": "high",
     "question": "해상도는 어느 정도인가요?",
     "search": "{option} 해상도",
     "help": "화면 가로 픽셀 수와 세로 픽셀 수의 곱이에요. 화면 품질 전체를 평가하는 값은 아니에요."
    },
    {
     "id": "wireless_web_duration",
     "name": "웹 사용시간",
     "icon": "clock",
     "default": false,
     "better": "high",
     "question": "웹 사용시간은 어느 정도인가요?",
     "search": "{option} 웹 사용시간",
     "help": "제조사 시험 기준 최대 무선 인터넷 사용시간이에요."
    },
    {
     "id": "case_weight",
     "name": "케이스 무게",
     "icon": "box",
     "default": false,
     "better": "low",
     "question": "케이스 무게는 어느 정도인가요?",
     "search": "{option} 케이스 무게",
     "help": "충전 케이스 무게 (g)"
    },
    {
     "id": "total_carry_weight",
     "name": "전체 무게",
     "icon": "box",
     "default": false,
     "better": "low",
     "question": "전체 무게는 어느 정도인가요?",
     "search": "{option} 전체 무게",
     "help": "이어버드 2개와 케이스 총무게 (g) — earbud_weight * 2 + case_weight"
    },
    {
     "id": "anc_off_duration",
     "name": "일반 재생시간",
     "icon": "clock",
     "default": false,
     "better": "high",
     "question": "일반 재생시간은 어느 정도인가요?",
     "search": "{option} 일반 재생시간",
     "help": "ANC를 끈 상태에서 한 번 충전으로 최대 연속 재생 가능한 시간이에요."
    },
    {
     "id": "anc_off_case_duration",
     "name": "일반 총시간",
     "icon": "clock",
     "default": false,
     "better": "high",
     "question": "일반 총시간은 어느 정도인가요?",
     "search": "{option} 일반 총시간",
     "help": "ANC를 끈 상태에서 케이스 충전까지 포함한 최대 총 음악 재생시간이에요."
    },
    {
     "id": "case_envelope_volume",
     "name": "케이스 크기",
     "icon": "box",
     "default": false,
     "better": "low",
     "question": "케이스 크기는 어느 정도인가요?",
     "search": "{option} 케이스 크기",
     "help": "외형 가로·세로·깊이를 곱한 직육면체 환산부피예요. 실제 곡면 케이스의 체적은 아니에요."
    }
   ],
   "overlap": [
    {
     "ids": [
      "usable_duration",
      "wireless_web_duration",
      "battery_capacity"
     ],
     "message": "재생시간·웹 사용시간·배터리 용량은 관련성이 있지만 시험 조건과 의미가 달라요. 중복 가중에 유의해 주세요."
    },
    {
     "ids": [
      "earbud_weight",
      "case_weight",
      "total_carry_weight"
     ],
     "message": "전체 무게와 구성요소 무게를 동시에 가중하면 무게를 중복 반영해요."
    }
   ]
  },
  "leisure": {
   "common": [
    {
     "id": "initial_cost",
     "name": "초기 비용",
     "icon": "wallet",
     "default": true,
     "better": "low",
     "question": "처음에 드는 돈은 얼마인가요? (보증금·가격·첫 달 비용 등)",
     "search": "{option} 초기 비용"
    },
    {
     "id": "time_required",
     "name": "소요 시간",
     "icon": "clock",
     "default": true,
     "better": "low",
     "question": "시간이 얼마나 걸리나요? (이동 시간·주당 시간·돈이 묶이는 기간 등)",
     "search": "{option} 소요 시간"
    }
   ],
   "main": [
    {
     "id": "transport_cost",
     "name": "왕복 교통비",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "왕복 교통비는 얼마인가요?",
     "search": "{option} 왕복 교통비",
     "help": "전주와 부산은 KTX 일반실 왕복, 제주는 김포 출발 항공 왕복 평균이에요."
    },
    {
     "id": "lodging_cost",
     "name": "숙박비(2박)",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "숙박비(2박)은 얼마인가요?",
     "search": "{option} 숙박비",
     "help": "1인 기준 중급 숙소 2박 합계예요. 숙소 종류와 날짜에 따라 달라요."
    },
    {
     "id": "meal_price",
     "name": "대표 음식 1인분",
     "icon": "wallet",
     "default": true,
     "better": "low",
     "question": "대표 음식 1인분은 얼마인가요?",
     "search": "{option} 대표 음식 1인분",
     "help": "전주 비빔밥, 부산 돼지국밥, 제주 고기국수 가격이에요. 식당에 따라 달라요."
    },
    {
     "id": "local_transport_cost",
     "name": "현지 이동비",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "현지 이동비는 얼마인가요?",
     "search": "{option} 현지 이동비",
     "help": "전주와 부산은 대중교통과 택시, 제주는 렌터카 2일 비용으로 잡았어요."
    },
    {
     "id": "weather_free",
     "name": "날씨와 무관",
     "icon": "sun",
     "default": true,
     "better": "high",
     "question": "날씨와 무관이 되나요?",
     "search": "{option} 날씨와 무관",
     "help": "비나 더위, 추위와 상관없이 즐길 수 있는지 봐요."
    },
    {
     "id": "conversation",
     "name": "대화 가능",
     "icon": "users",
     "default": true,
     "better": "high",
     "question": "대화 가능이 되나요?",
     "search": "{option} 대화 가능",
     "help": "활동하는 동안 함께한 사람과 자유롭게 이야기할 수 있는지 봐요."
    },
    {
     "id": "reservation_needed",
     "name": "사전 예매",
     "icon": "doc",
     "default": false,
     "better": "low",
     "question": "사전 예매가 되나요?",
     "search": "{option} 사전 예매",
     "help": "주말 인기 시간대에 미리 예매해야 하는지 봐요. 필요하지 않을수록 편하다고 단순하게 봤어요."
    },
    {
     "id": "outdoor_time",
     "name": "야외 활동 시간",
     "icon": "clock",
     "default": true,
     "better": "high",
     "question": "야외 활동 시간은 어느 정도인가요?",
     "search": "{option} 야외 활동 시간",
     "help": "이동 시간을 포함해 바깥에서 보내는 시간이에요. 많을수록 좋다고 단순하게 본 기준이에요."
    },
    {
     "id": "transit_only",
     "name": "대중교통 이동",
     "icon": "bus",
     "default": true,
     "better": "high",
     "question": "대중교통 이동이 되나요?",
     "search": "{option} 대중교통 이동",
     "help": "렌터카 없이 대중교통만으로 주요 관광지를 다닐 수 있는지 봐요. 제주는 렌터카를 권하는 경우가 많아요."
    }
   ],
   "more": [
    {
     "id": "oct_temperature",
     "name": "10월 평균 기온",
     "icon": "sun",
     "default": false,
     "better": "high",
     "question": "10월 평균 기온은 어느 정도인가요?",
     "search": "{option} 10월 평균 기온",
     "help": "기온이 높을수록 10월 야외 일정에 유리하다고 단순하게 본 기준이에요. 취향에 따라 달라요."
    },
    {
     "id": "prep_items",
     "name": "챙길 준비물",
     "icon": "doc",
     "default": false,
     "better": "low",
     "question": "챙길 준비물은 어느 정도인가요?",
     "search": "{option} 챙길 준비물",
     "help": "미리 챙겨 가야 하는 물건 수예요. 피크닉은 돗자리, 간식, 음료, 쓰레기봉투예요."
    }
   ],
   "overlap": [
    {
     "ids": [
      "initial_cost",
      "transport_cost",
      "lodging_cost",
      "meal_price",
      "local_transport_cost"
     ],
     "message": "총 여행 비용에는 교통비, 숙박비, 식비, 현지 이동비가 이미 들어 있어요. 함께 고르면 비용이 중복해서 반영돼요."
    },
    {
     "ids": [
      "weather_free",
      "outdoor_time"
     ],
     "message": "날씨와 무관한지와 야외 활동 시간은 서로 반대로 움직여요. 함께 고르면 한쪽이 다른 쪽을 상쇄해요."
    }
   ]
  },
  "finance": {
   "common": [
    {
     "id": "initial_cost",
     "name": "초기 비용",
     "icon": "wallet",
     "default": true,
     "better": "low",
     "question": "처음에 드는 돈은 얼마인가요? (보증금·가격·첫 달 비용 등)",
     "search": "{option} 초기 비용"
    },
    {
     "id": "time_required",
     "name": "소요 시간",
     "icon": "clock",
     "default": true,
     "better": "low",
     "question": "시간이 얼마나 걸리나요? (이동 시간·주당 시간·돈이 묶이는 기간 등)",
     "search": "{option} 소요 시간"
    }
   ],
   "main": [
    {
     "id": "interest_rate",
     "name": "표시 금리",
     "icon": "chart",
     "default": false,
     "better": "high",
     "question": "표시 금리는 어느 정도인가요?",
     "search": "{option} 표시 금리",
     "help": "12개월 기본금리를 단순화한 값이에요. 은행과 우대조건에 따라 달라요."
    },
    {
     "id": "total_interest",
     "name": "만기 이자(세전)",
     "icon": "wallet",
     "default": true,
     "better": "high",
     "question": "만기 이자(세전)은 얼마인가요?",
     "search": "{option} 만기 이자",
     "help": "총 600만원을 낼 때 12개월 뒤 받는 세전 이자예요. 적금은 월 50만원 단리 계산이에요."
    },
    {
     "id": "auto_saving",
     "name": "매달 자동 납입",
     "icon": "refresh",
     "default": true,
     "better": "high",
     "question": "매달 자동 납입이 되나요?",
     "search": "{option} 매달 자동 납입",
     "help": "매달 자동이체로 저축 습관을 만들 수 있는 구조인지 봐요."
    },
    {
     "id": "early_withdrawal_rate",
     "name": "중도해지 금리",
     "icon": "chart",
     "default": true,
     "better": "high",
     "question": "중도해지 금리는 어느 정도인가요?",
     "search": "{option} 중도해지 금리",
     "help": "만기 전에 해지하면 적용되는 금리예요. 상품마다 달라서 일반적인 수준으로 잡았어요."
    }
   ],
   "more": [
    {
     "id": "after_tax_interest",
     "name": "만기 이자(세후)",
     "icon": "wallet",
     "default": false,
     "better": "high",
     "question": "만기 이자(세후)는 얼마인가요?",
     "search": "{option} 만기 이자",
     "help": "세전 이자에서 이자소득세 15.4%를 뺀 금액이에요."
    },
    {
     "id": "return_on_principal",
     "name": "납입금 대비 이자율",
     "icon": "wallet",
     "default": false,
     "better": "high",
     "question": "납입금 대비 이자율은 어느 정도인가요?",
     "search": "{option} 납입금 대비 이자율",
     "help": "총 납입 원금 대비 세전 이자 비율이에요. 적금은 돈이 늦게 들어가서 표시 금리보다 낮아요."
    },
    {
     "id": "min_deposit",
     "name": "최소 가입 금액",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "최소 가입 금액은 얼마인가요?",
     "search": "{option} 최소 가입 금액",
     "help": "가입에 필요한 최소 금액이에요. 은행마다 달라서 일반적인 수준으로 잡았어요."
    },
    {
     "id": "protection_limit",
     "name": "예금자보호 한도",
     "icon": "shield",
     "default": false,
     "better": "high",
     "question": "예금자보호 한도는 얼마인가요?",
     "search": "{option} 예금자보호 한도",
     "help": "한 금융기관당 1인 보호 한도예요. 예금과 적금이 같아요."
    }
   ],
   "overlap": [
    {
     "ids": [
      "total_interest",
      "after_tax_interest",
      "return_on_principal"
     ],
     "message": "세전 이자, 세후 이자, 납입금 대비 이자율은 같은 이자에서 나온 값이에요. 함께 고르면 이자가 중복해서 반영돼요."
    },
    {
     "ids": [
      "initial_cost",
      "time_required"
     ],
     "message": "처음 필요한 돈과 돈이 묶이는 기간은 목돈 없이 시작할 수 있는지와 함께 움직여요. 둘 다 고르면 같은 방향으로 크게 반영돼요."
    }
   ]
  },
  "selfdev": {
   "common": [
    {
     "id": "initial_cost",
     "name": "초기 비용",
     "icon": "wallet",
     "default": true,
     "better": "low",
     "question": "처음에 드는 돈은 얼마인가요? (보증금·가격·첫 달 비용 등)",
     "search": "{option} 초기 비용"
    },
    {
     "id": "time_required",
     "name": "소요 시간",
     "icon": "clock",
     "default": true,
     "better": "low",
     "question": "시간이 얼마나 걸리나요? (이동 시간·주당 시간·돈이 묶이는 기간 등)",
     "search": "{option} 소요 시간"
    }
   ],
   "main": [
    {
     "id": "calorie_per_hour",
     "name": "1시간 소모 열량",
     "icon": "heart",
     "default": true,
     "better": "high",
     "question": "1시간 소모 열량은 어느 정도인가요?",
     "search": "{option} 1시간 소모 열량",
     "help": "체중 70kg 기준으로 신체활동 강도(MET)에 70을 곱해 계산했어요. 테니스는 복식 6.0, 웨이트는 일반 3.5를 썼어요."
    },
    {
     "id": "group_size",
     "name": "함께 운동하는 사람",
     "icon": "users",
     "default": true,
     "better": "high",
     "question": "함께 운동하는 사람은 어느 정도인가요?",
     "search": "{option} 함께 운동하는 사람",
     "help": "본인을 포함해 같이 운동하는 인원이에요. 사람이 많을수록 꾸준히 하기 쉽다고 단순하게 본 기준이에요."
    },
    {
     "id": "one_to_one",
     "name": "1:1 코칭",
     "icon": "users",
     "default": false,
     "better": "high",
     "question": "1:1 코칭이 되나요?",
     "search": "{option} 1:1 코칭",
     "help": "수업 중에 한 명의 코치가 나만 봐 주는지 여부예요. 테니스는 그룹 레슨 기준이에요."
    },
    {
     "id": "weather_free",
     "name": "날씨와 무관",
     "icon": "sun",
     "default": true,
     "better": "high",
     "question": "날씨와 무관이 되나요?",
     "search": "{option} 날씨와 무관",
     "help": "비나 더위, 추위와 상관없이 운동할 수 있는지 봐요. 테니스는 실외 코트 기준이에요."
    }
   ],
   "more": [
    {
     "id": "monthly_cost",
     "name": "월 비용",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "월 비용은 얼마인가요?",
     "search": "{option} 월 비용",
     "help": "주 2회(월 8회) 기준 월 비용이에요. 테니스는 그룹 레슨, 헬스는 PT 8회와 회원권을 더했어요."
    },
    {
     "id": "equipment_cost",
     "name": "장비 구입비",
     "icon": "wallet",
     "default": false,
     "better": "low",
     "question": "장비 구입비는 얼마인가요?",
     "search": "{option} 장비 구입비",
     "help": "시작할 때 한 번 드는 장비 비용이에요. 테니스는 라켓과 신발, 헬스는 신발과 운동복이에요."
    },
    {
     "id": "session_minutes",
     "name": "1회 수업 시간",
     "icon": "clock",
     "default": false,
     "better": "high",
     "question": "1회 수업 시간은 어느 정도인가요?",
     "search": "{option} 1회 수업 시간",
     "help": "수업 한 번의 길이예요. 업체마다 달라요."
    },
    {
     "id": "sessions_per_month",
     "name": "월 수업 횟수",
     "icon": "clock",
     "default": false,
     "better": "high",
     "question": "월 수업 횟수는 어느 정도인가요?",
     "search": "{option} 월 수업 횟수",
     "help": "주 2회로 맞춘 월 수업 횟수예요. 두 선택지가 같아요."
    }
   ],
   "overlap": [
    {
     "ids": [
      "initial_cost",
      "monthly_cost",
      "equipment_cost"
     ],
     "message": "첫 달 비용에는 월 비용과 장비 구입비가 이미 들어 있어요. 함께 고르면 비용이 중복해서 반영돼요."
    }
   ]
  },
  "etc": {
   "common": [
    {
     "id": "initial_cost",
     "name": "초기 비용",
     "icon": "wallet",
     "default": true,
     "better": "low",
     "question": "처음에 드는 돈은 얼마인가요? (보증금·가격·첫 달 비용 등)",
     "search": "{option} 초기 비용"
    },
    {
     "id": "time_required",
     "name": "소요 시간",
     "icon": "clock",
     "default": true,
     "better": "low",
     "question": "시간이 얼마나 걸리나요? (이동 시간·주당 시간·돈이 묶이는 기간 등)",
     "search": "{option} 소요 시간"
    }
   ],
   "main": [
    {
     "id": "risk",
     "name": "위험·불확실성",
     "icon": "alert",
     "default": true,
     "question": "잘못될 수 있는 점은 무엇인가요?",
     "search": "{option} 단점"
    },
    {
     "id": "longterm",
     "name": "장기적 영향",
     "icon": "chart",
     "default": true,
     "question": "1년 뒤의 나에게 어떤 영향을 줄까요?",
     "search": "{option} 장단점"
    },
    {
     "id": "satisfaction",
     "name": "만족도",
     "icon": "smile",
     "default": false,
     "question": "고른 뒤 얼마나 만족할 것 같나요?",
     "search": "{option} 후기"
    },
    {
     "id": "effort",
     "name": "노력·수고",
     "icon": "tool",
     "default": false,
     "question": "준비하거나 신경 쓸 일이 많나요?",
     "search": "{option} 준비"
    },
    {
     "id": "people",
     "name": "주변 사람 영향",
     "icon": "users",
     "default": false,
     "question": "가족, 친구, 동료에게 어떤 영향이 있나요?",
     "search": "{option} 경험담"
    }
   ],
   "more": [
    {
     "id": "fun",
     "name": "재미·흥미",
     "icon": "spark",
     "question": "하면서 즐거울 것 같나요?",
     "search": "{option} 재미"
    },
    {
     "id": "reversible",
     "name": "되돌릴 수 있는지",
     "icon": "refresh",
     "question": "마음이 바뀌면 되돌릴 수 있나요?",
     "search": "{option} 취소 환불"
    },
    {
     "id": "learning",
     "name": "배울 점",
     "icon": "book",
     "question": "새로 배우거나 얻는 경험이 있나요?",
     "search": "{option} 경험"
    },
    {
     "id": "health",
     "name": "건강",
     "icon": "heart",
     "question": "몸과 마음 건강에 어떤 영향이 있나요?",
     "search": "{option} 건강"
    }
   ],
   "overlap": []
  }
 }
};
