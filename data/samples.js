/* 체험용 완성 시나리오 (담당: 데이터팀 · 정리: 조원2)
   원본: 데이터팀 PICKWISE_dataset v2.4.0 (기준일 2026-10-05) · tools/convert-samples.js 로 자동 생성 — 직접 고치지 말고 원본 수정 후 다시 변환
   - 기준 점수(values[].score)와 중요도(importance)는 0~100. 점수는 선택지끼리 수치를 비교해 최고 100 · 최저 0 (같으면 50)
   - estimated: true = 시연용 추정값(확인 필요) → 화면에 "추정" 표시
   - analysis: 기본 기준·중요도 그대로일 때 보여줄 데이터팀 작성 문장 */
Pickwise.data.samples = [
 {
  "id": "housing_region",
  "title": "청년전세임대 지역 비교",
  "topic": "청년전세임대 지역 비교",
  "category": "housing",
  "options": [
   "수도권",
   "광역시",
   "기타 도 지역"
  ],
  "criteria": [
   {
    "id": "initial_cost",
    "name": "보증금",
    "icon": "wallet",
    "unit": "원",
    "better": "low",
    "group": "common",
    "selected": true,
    "importance": 100,
    "help": "기본 임대보증금 (원)"
   },
   {
    "id": "usable_duration",
    "name": "계약기간",
    "icon": "clock",
    "unit": "개월",
    "better": "high",
    "group": "common",
    "selected": true,
    "importance": 100,
    "help": "최초 계약기간 (개월)"
   },
   {
    "id": "support_cap",
    "name": "지원한도",
    "icon": "wallet",
    "unit": "원",
    "better": "high",
    "group": "main",
    "selected": true,
    "importance": 100,
    "help": "전세금 지원한도 (원)"
   },
   {
    "id": "maximum_tenure",
    "name": "거주기간",
    "icon": "clock",
    "unit": "개월",
    "better": "high",
    "group": "main",
    "selected": true,
    "importance": 100,
    "help": "최대 거주기간 (개월)"
   },
   {
    "id": "scenario_monthly_rent",
    "name": "월 임대료",
    "icon": "wallet",
    "unit": "원/월",
    "better": "low",
    "group": "main",
    "selected": false,
    "importance": 0,
    "help": "지원한도 전액 사용·연 2.2%·금리우대 적용 전으로 계산한 월 임대료예요. 관리비·공과금은 제외하며 실제 청구액이 아니에요."
   },
   {
    "id": "deposit_ratio",
    "name": "보증금 비율",
    "icon": "wallet",
    "unit": "%",
    "better": "low",
    "group": "main",
    "selected": false,
    "importance": 0,
    "help": "지원한도 대비 기본 보증금 비율 (%) — initial_cost / support_cap * 100"
   },
   {
    "id": "maximum_renewals",
    "name": "재계약",
    "icon": "clock",
    "unit": "회",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "혼인 추가연장 제외 최대 재계약 횟수 (회)"
   },
   {
    "id": "renewal_months",
    "name": "연장기간",
    "icon": "clock",
    "unit": "개월",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "최초 계약 이후 최대 연장기간 (개월) — maximum_tenure - usable_duration"
   },
   {
    "id": "published_min_rate",
    "name": "최저금리",
    "icon": "chart",
    "unit": "%/년",
    "better": "low",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "공시 기본금리 범위의 하단이에요. 본인에게 적용되는 확정금리나 우대 후 최저금리가 아니에요."
   },
   {
    "id": "published_max_rate",
    "name": "최고금리",
    "icon": "chart",
    "unit": "%/년",
    "better": "low",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "공시 기본금리 범위의 상단이에요. 본인에게 적용되는 확정금리는 아니에요."
   },
   {
    "id": "net_funded_principal",
    "name": "지원원금",
    "icon": "wallet",
    "unit": "원",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "지원한도에서 기본 보증금을 뺀 계산값이에요. 실제 지원 확정액이 아니에요."
   },
   {
    "id": "scenario_first_term_rent",
    "name": "총 임대료",
    "icon": "wallet",
    "unit": "원",
    "better": "low",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "위 월 임대료 시나리오에 최초 계약기간을 곱한 임대료 합계예요. 보증금·관리비·공과금은 제외해요."
   }
  ],
  "values": {
   "수도권": {
    "initial_cost": {
     "score": 50,
     "text": "100만원",
     "estimated": false
    },
    "usable_duration": {
     "score": 50,
     "text": "24개월",
     "estimated": false
    },
    "support_cap": {
     "score": 100,
     "text": "1억 2,000만원",
     "estimated": false
    },
    "maximum_tenure": {
     "score": 50,
     "text": "120개월",
     "estimated": false
    },
    "scenario_monthly_rent": {
     "score": 0,
     "text": "21.8만원/월",
     "estimated": false
    },
    "deposit_ratio": {
     "score": 100,
     "text": "0.83%",
     "estimated": false
    },
    "maximum_renewals": {
     "score": 50,
     "text": "4회",
     "estimated": false
    },
    "renewal_months": {
     "score": 50,
     "text": "96개월",
     "estimated": false
    },
    "published_min_rate": {
     "score": 50,
     "text": "1.2%/년",
     "estimated": false
    },
    "published_max_rate": {
     "score": 50,
     "text": "2.2%/년",
     "estimated": false
    },
    "net_funded_principal": {
     "score": 100,
     "text": "1억 1,900만원",
     "estimated": false
    },
    "scenario_first_term_rent": {
     "score": 0,
     "text": "524만원",
     "estimated": false
    }
   },
   "광역시": {
    "initial_cost": {
     "score": 50,
     "text": "100만원",
     "estimated": false
    },
    "usable_duration": {
     "score": 50,
     "text": "24개월",
     "estimated": false
    },
    "support_cap": {
     "score": 28.5714,
     "text": "9,500만원",
     "estimated": false
    },
    "maximum_tenure": {
     "score": 50,
     "text": "120개월",
     "estimated": false
    },
    "scenario_monthly_rent": {
     "score": 71.4286,
     "text": "17.2만원/월",
     "estimated": false
    },
    "deposit_ratio": {
     "score": 36.1014,
     "text": "1.05%",
     "estimated": false
    },
    "maximum_renewals": {
     "score": 50,
     "text": "4회",
     "estimated": false
    },
    "renewal_months": {
     "score": 50,
     "text": "96개월",
     "estimated": false
    },
    "published_min_rate": {
     "score": 50,
     "text": "1.2%/년",
     "estimated": false
    },
    "published_max_rate": {
     "score": 50,
     "text": "2.2%/년",
     "estimated": false
    },
    "net_funded_principal": {
     "score": 28.5714,
     "text": "9,400만원",
     "estimated": false
    },
    "scenario_first_term_rent": {
     "score": 71.4286,
     "text": "414만원",
     "estimated": false
    }
   },
   "기타 도 지역": {
    "initial_cost": {
     "score": 50,
     "text": "100만원",
     "estimated": false
    },
    "usable_duration": {
     "score": 50,
     "text": "24개월",
     "estimated": false
    },
    "support_cap": {
     "score": 0,
     "text": "8,500만원",
     "estimated": false
    },
    "maximum_tenure": {
     "score": 50,
     "text": "120개월",
     "estimated": false
    },
    "scenario_monthly_rent": {
     "score": 100,
     "text": "15.4만원/월",
     "estimated": false
    },
    "deposit_ratio": {
     "score": 0,
     "text": "1.18%",
     "estimated": false
    },
    "maximum_renewals": {
     "score": 50,
     "text": "4회",
     "estimated": false
    },
    "renewal_months": {
     "score": 50,
     "text": "96개월",
     "estimated": false
    },
    "published_min_rate": {
     "score": 50,
     "text": "1.2%/년",
     "estimated": false
    },
    "published_max_rate": {
     "score": 50,
     "text": "2.2%/년",
     "estimated": false
    },
    "net_funded_principal": {
     "score": 0,
     "text": "8,400만원",
     "estimated": false
    },
    "scenario_first_term_rent": {
     "score": 100,
     "text": "370만원",
     "estimated": false
    }
   }
  },
  "info": {
   "수도권": "보증금: 100만원, 계약기간: 24개월, 지원한도: 1억 2,000만원, 거주기간: 120개월, 월 임대료: 21.8만원/월, 보증금 비율: 0.83%, 재계약: 4회, 연장기간: 96개월, 최저금리: 1.2%/년, 최고금리: 2.2%/년, 지원원금: 1억 1,900만원, 총 임대료: 524만원",
   "광역시": "보증금: 100만원, 계약기간: 24개월, 지원한도: 9,500만원, 거주기간: 120개월, 월 임대료: 17.2만원/월, 보증금 비율: 1.05%, 재계약: 4회, 연장기간: 96개월, 최저금리: 1.2%/년, 최고금리: 2.2%/년, 지원원금: 9,400만원, 총 임대료: 414만원",
   "기타 도 지역": "보증금: 100만원, 계약기간: 24개월, 지원한도: 8,500만원, 거주기간: 120개월, 월 임대료: 15.4만원/월, 보증금 비율: 1.18%, 재계약: 4회, 연장기간: 96개월, 최저금리: 1.2%/년, 최고금리: 2.2%/년, 지원원금: 8,400만원, 총 임대료: 370만원"
  },
  "analysis": {
   "ranking": [
    {
     "name": "수도권",
     "score": 63
    },
    {
     "name": "광역시",
     "score": 45
    },
    {
     "name": "기타 도 지역",
     "score": 38
    }
   ],
   "summary": "현재 선택한 객관 기준과 기본 중요도에서는 수도권의 총점이 가장 높아요.",
   "explanation": "수도권이 총점 63점으로 가장 높아요. 가장 큰 차이는 '지원한도'예요(수도권 1억 2,000만원, 광역시 9,500만원). 3개 기준은 선택지끼리 값이 같아 순위에 영향을 주지 않아요. 지금 선택한 기준에서는 수도권이 모든 기준에서 같거나 앞서서 중요도를 바꿔도 1위가 바뀌지 않아요.",
   "sensitivity": [],
   "whatIf": [
    {
     "label": "'보증금'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "initial_cost",
     "multiplier": 2,
     "winner": "수도권",
     "scores": [
      {
       "name": "수도권",
       "score": 60
      },
      {
       "name": "광역시",
       "score": 46
      },
      {
       "name": "기타 도 지역",
       "score": 40
      }
     ]
    },
    {
     "label": "'계약기간'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "usable_duration",
     "multiplier": 2,
     "winner": "수도권",
     "scores": [
      {
       "name": "수도권",
       "score": 60
      },
      {
       "name": "광역시",
       "score": 46
      },
      {
       "name": "기타 도 지역",
       "score": 40
      }
     ]
    },
    {
     "label": "'지원한도'를 지금보다 두 배 중요하게 본다면?",
     "criterion": "support_cap",
     "multiplier": 2,
     "winner": "수도권",
     "scores": [
      {
       "name": "수도권",
       "score": 70
      },
      {
       "name": "광역시",
       "score": 41
      },
      {
       "name": "기타 도 지역",
       "score": 30
      }
     ]
    },
    {
     "label": "'거주기간'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "maximum_tenure",
     "multiplier": 2,
     "winner": "수도권",
     "scores": [
      {
       "name": "수도권",
       "score": 60
      },
      {
       "name": "광역시",
       "score": 46
      },
      {
       "name": "기타 도 지역",
       "score": 40
      }
     ]
    }
   ]
  },
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
  ],
  "notes": [
   "2026년 청년전세임대 1순위 자격을 충족한 단독거주자를 전제로 해요. 지원순위는 선택지가 아니에요.",
   "지원한도 전액 사용, 기본 보증금 차감, 공시 기본금리 상단 연 2.2% 적용, 금리우대 미적용, 관리비·공과금·초과보증금 제외. 공동거주는 전원 1순위·기본보증금 각 100만원·균등 분담 가정. 계산값은 실제 임대료 또는 지원 확정액이 아니에요.",
   "지원한도는 실제 집값·지원 확정액이 아니에요. 최대 거주기간은 재계약 요건 충족 시이며 입주 후 혼인에 따른 추가 연장은 제외해요. 임대보증금 외의 이사비·관리비·초과보증금은 포함하지 않아요.",
   "동일 제도의 지역·거주방식을 비교하므로 일부 계약·금리 조건이 동일해요. 비용 및 기간의 파생 기준을 함께 가중하면 같은 요소를 중복 반영할 수 있어요.",
   "2026년 2월 지원한도 및 2026년 1순위 모집 기준"
  ],
  "sources": []
 },
 {
  "id": "housing_sharing",
  "title": "청년전세임대 거주방식 비교",
  "topic": "청년전세임대 거주방식 비교",
  "category": "housing",
  "options": [
   "단독거주",
   "2인 공동거주",
   "3인 공동거주"
  ],
  "criteria": [
   {
    "id": "initial_cost",
    "name": "보증금",
    "icon": "wallet",
    "unit": "원",
    "better": "low",
    "group": "common",
    "selected": true,
    "importance": 100,
    "help": "1순위 입주자 1인의 기본 임대보증금이에요."
   },
   {
    "id": "usable_duration",
    "name": "계약기간",
    "icon": "clock",
    "unit": "개월",
    "better": "high",
    "group": "common",
    "selected": true,
    "importance": 100,
    "help": "최초 계약기간 (개월)"
   },
   {
    "id": "per_person_support_cap",
    "name": "개인 지원한도",
    "icon": "wallet",
    "unit": "원",
    "better": "high",
    "group": "main",
    "selected": true,
    "importance": 100,
    "help": "주택 전체 지원한도를 인원수로 나눈 비교용 환산액이에요. 개인에게 지급되는 금액이 아니에요."
   },
   {
    "id": "co_resident_count",
    "name": "동거인 수",
    "icon": "users",
    "unit": "명",
    "better": "low",
    "group": "main",
    "selected": true,
    "importance": 100,
    "help": "함께 사는 사람 수 (명) — resident_count - 1"
   },
   {
    "id": "household_support_cap",
    "name": "전체 지원한도",
    "icon": "wallet",
    "unit": "원",
    "better": "high",
    "group": "main",
    "selected": false,
    "importance": 0,
    "help": "주택 전체 지원한도 (원)"
   },
   {
    "id": "scenario_monthly_personal_rent",
    "name": "월 임대료",
    "icon": "wallet",
    "unit": "원/월",
    "better": "low",
    "group": "main",
    "selected": false,
    "importance": 0,
    "help": "한도 전액 사용·전원 1순위·보증금 각 100만원·연 2.2%·우대 전·균등 분담을 가정한 1인 월 임대료예요. 실제 청구액이 아니에요."
   },
   {
    "id": "maximum_tenure",
    "name": "거주기간",
    "icon": "clock",
    "unit": "개월",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "최대 거주기간 (개월)"
   },
   {
    "id": "maximum_renewals",
    "name": "재계약",
    "icon": "clock",
    "unit": "회",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "혼인 추가연장 제외 최대 재계약 횟수 (회)"
   },
   {
    "id": "household_base_deposit",
    "name": "전체 보증금",
    "icon": "wallet",
    "unit": "원",
    "better": "low",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "전체 인원 기본 보증금 합계 (원) — initial_cost * resident_count"
   },
   {
    "id": "per_person_net_principal",
    "name": "개인 지원원금",
    "icon": "wallet",
    "unit": "원",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "전체 지원한도에서 전원 기본 보증금을 뺀 뒤 인원수로 나눈 계산값이에요."
   },
   {
    "id": "personal_deposit_ratio",
    "name": "보증금 비율",
    "icon": "wallet",
    "unit": "%",
    "better": "low",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "1인당 지원한도 대비 기본 보증금 비율 (%) — initial_cost / per_person_support_cap * 100"
   },
   {
    "id": "scenario_first_term_personal_rent",
    "name": "총 임대료",
    "icon": "wallet",
    "unit": "원",
    "better": "low",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "위 월 임대료 환산액에 최초 계약기간을 곱한 1인 임대료 합계예요. 관리비·공과금은 제외해요."
   }
  ],
  "values": {
   "단독거주": {
    "initial_cost": {
     "score": 50,
     "text": "100만원",
     "estimated": false
    },
    "usable_duration": {
     "score": 50,
     "text": "24개월",
     "estimated": false
    },
    "per_person_support_cap": {
     "score": 100,
     "text": "1억 2,000만원",
     "estimated": false
    },
    "co_resident_count": {
     "score": 100,
     "text": "0명",
     "estimated": false
    },
    "household_support_cap": {
     "score": 0,
     "text": "1억 2,000만원",
     "estimated": false
    },
    "scenario_monthly_personal_rent": {
     "score": 0,
     "text": "21.8만원/월",
     "estimated": false
    },
    "maximum_tenure": {
     "score": 50,
     "text": "120개월",
     "estimated": false
    },
    "maximum_renewals": {
     "score": 50,
     "text": "4회",
     "estimated": false
    },
    "household_base_deposit": {
     "score": 100,
     "text": "100만원",
     "estimated": false
    },
    "per_person_net_principal": {
     "score": 100,
     "text": "1억 1,900만원",
     "estimated": false
    },
    "personal_deposit_ratio": {
     "score": 100,
     "text": "0.83%",
     "estimated": false
    },
    "scenario_first_term_personal_rent": {
     "score": 0,
     "text": "524만원",
     "estimated": false
    }
   },
   "2인 공동거주": {
    "initial_cost": {
     "score": 50,
     "text": "100만원",
     "estimated": false
    },
    "usable_duration": {
     "score": 50,
     "text": "24개월",
     "estimated": false
    },
    "per_person_support_cap": {
     "score": 15.625,
     "text": "7,500만원",
     "estimated": false
    },
    "co_resident_count": {
     "score": 50,
     "text": "1명",
     "estimated": false
    },
    "household_support_cap": {
     "score": 37.5,
     "text": "1억 5,000만원",
     "estimated": false
    },
    "scenario_monthly_personal_rent": {
     "score": 84.375,
     "text": "13.6만원/월",
     "estimated": false
    },
    "maximum_tenure": {
     "score": 50,
     "text": "120개월",
     "estimated": false
    },
    "maximum_renewals": {
     "score": 50,
     "text": "4회",
     "estimated": false
    },
    "household_base_deposit": {
     "score": 50,
     "text": "200만원",
     "estimated": false
    },
    "per_person_net_principal": {
     "score": 15.625,
     "text": "7,400만원",
     "estimated": false
    },
    "personal_deposit_ratio": {
     "score": 25.0037,
     "text": "1.33%",
     "estimated": false
    },
    "scenario_first_term_personal_rent": {
     "score": 84.375,
     "text": "326만원",
     "estimated": false
    }
   },
   "3인 공동거주": {
    "initial_cost": {
     "score": 50,
     "text": "100만원",
     "estimated": false
    },
    "usable_duration": {
     "score": 50,
     "text": "24개월",
     "estimated": false
    },
    "per_person_support_cap": {
     "score": 0,
     "text": "6,667만원",
     "estimated": false
    },
    "co_resident_count": {
     "score": 0,
     "text": "2명",
     "estimated": false
    },
    "household_support_cap": {
     "score": 100,
     "text": "2억원",
     "estimated": false
    },
    "scenario_monthly_personal_rent": {
     "score": 100,
     "text": "12만원/월",
     "estimated": false
    },
    "maximum_tenure": {
     "score": 50,
     "text": "120개월",
     "estimated": false
    },
    "maximum_renewals": {
     "score": 50,
     "text": "4회",
     "estimated": false
    },
    "household_base_deposit": {
     "score": 0,
     "text": "300만원",
     "estimated": false
    },
    "per_person_net_principal": {
     "score": 0,
     "text": "6,567만원",
     "estimated": false
    },
    "personal_deposit_ratio": {
     "score": 0,
     "text": "1.5%",
     "estimated": false
    },
    "scenario_first_term_personal_rent": {
     "score": 100,
     "text": "289만원",
     "estimated": false
    }
   }
  },
  "info": {
   "단독거주": "보증금: 100만원, 계약기간: 24개월, 개인 지원한도: 1억 2,000만원, 동거인 수: 0명, 전체 지원한도: 1억 2,000만원, 월 임대료: 21.8만원/월, 거주기간: 120개월, 재계약: 4회, 전체 보증금: 100만원, 개인 지원원금: 1억 1,900만원, 보증금 비율: 0.83%, 총 임대료: 524만원",
   "2인 공동거주": "보증금: 100만원, 계약기간: 24개월, 개인 지원한도: 7,500만원, 동거인 수: 1명, 전체 지원한도: 1억 5,000만원, 월 임대료: 13.6만원/월, 거주기간: 120개월, 재계약: 4회, 전체 보증금: 200만원, 개인 지원원금: 7,400만원, 보증금 비율: 1.33%, 총 임대료: 326만원",
   "3인 공동거주": "보증금: 100만원, 계약기간: 24개월, 개인 지원한도: 6,667만원, 동거인 수: 2명, 전체 지원한도: 2억원, 월 임대료: 12만원/월, 거주기간: 120개월, 재계약: 4회, 전체 보증금: 300만원, 개인 지원원금: 6,567만원, 보증금 비율: 1.5%, 총 임대료: 289만원"
  },
  "analysis": {
   "ranking": [
    {
     "name": "단독거주",
     "score": 75
    },
    {
     "name": "2인 공동거주",
     "score": 41
    },
    {
     "name": "3인 공동거주",
     "score": 25
    }
   ],
   "summary": "현재 선택한 객관 기준과 기본 중요도에서는 단독거주의 총점이 가장 높아요.",
   "explanation": "단독거주가 총점 75점으로 가장 높아요. 가장 큰 차이는 '개인 지원한도'예요(단독거주 1억 2,000만원, 2인 공동거주 7,500만원). 2개 기준은 선택지끼리 값이 같아 순위에 영향을 주지 않아요. 지금 선택한 기준에서는 단독거주가 모든 기준에서 같거나 앞서서 중요도를 바꿔도 1위가 바뀌지 않아요. 계산값은 비교를 위한 환산값이며 실제 금액이 아니에요.",
   "sensitivity": [],
   "whatIf": [
    {
     "label": "'보증금'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "initial_cost",
     "multiplier": 2,
     "winner": "단독거주",
     "scores": [
      {
       "name": "단독거주",
       "score": 70
      },
      {
       "name": "2인 공동거주",
       "score": 43
      },
      {
       "name": "3인 공동거주",
       "score": 30
      }
     ]
    },
    {
     "label": "'계약기간'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "usable_duration",
     "multiplier": 2,
     "winner": "단독거주",
     "scores": [
      {
       "name": "단독거주",
       "score": 70
      },
      {
       "name": "2인 공동거주",
       "score": 43
      },
      {
       "name": "3인 공동거주",
       "score": 30
      }
     ]
    },
    {
     "label": "'개인 지원한도'를 지금보다 두 배 중요하게 본다면?",
     "criterion": "per_person_support_cap",
     "multiplier": 2,
     "winner": "단독거주",
     "scores": [
      {
       "name": "단독거주",
       "score": 80
      },
      {
       "name": "2인 공동거주",
       "score": 36
      },
      {
       "name": "3인 공동거주",
       "score": 20
      }
     ]
    },
    {
     "label": "'동거인 수'를 지금보다 두 배 중요하게 본다면?",
     "criterion": "co_resident_count",
     "multiplier": 2,
     "winner": "단독거주",
     "scores": [
      {
       "name": "단독거주",
       "score": 80
      },
      {
       "name": "2인 공동거주",
       "score": 43
      },
      {
       "name": "3인 공동거주",
       "score": 20
      }
     ]
    }
   ]
  },
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
  ],
  "notes": [
   "수도권에서 입주자격을 충족하는 1순위 청년들이 함께 신청하는 경우를 전제로 해요.",
   "지원한도 전액 사용, 기본 보증금 차감, 공시 기본금리 상단 연 2.2% 적용, 금리우대 미적용, 관리비·공과금·초과보증금 제외. 공동거주는 전원 1순위·기본보증금 각 100만원·균등 분담 가정. 계산값은 실제 임대료 또는 지원 확정액이 아니에요.",
   "1인당 지원한도 환산액은 비교를 위한 균등 나눗셈이며 개인에게 지급되는 금액이 아니에요. 실제 비용 분담·집 면적·사생활 만족도는 확정하지 않아요.",
   "동일 제도의 지역·거주방식을 비교하므로 일부 계약·금리 조건이 동일해요. 비용 및 기간의 파생 기준을 함께 가중하면 같은 요소를 중복 반영할 수 있어요.",
   "2026년 2월 지원한도 기준"
  ],
  "sources": []
 },
 {
  "id": "laptop_purchase",
  "title": "맥북 구매",
  "topic": "맥북 구매",
  "category": "shopping",
  "options": [
   "맥북 에어 13 M4",
   "맥북 에어 15 M4",
   "맥북 프로 14 M4"
  ],
  "criteria": [
   {
    "id": "initial_cost",
    "name": "가격",
    "icon": "wallet",
    "unit": "원",
    "better": "low",
    "group": "common",
    "selected": true,
    "importance": 100,
    "help": "한국 기본형 공식 출시가격이에요. 현재 판매가격이 아니에요."
   },
   {
    "id": "usable_duration",
    "name": "배터리",
    "icon": "clock",
    "unit": "시간",
    "better": "high",
    "group": "common",
    "selected": true,
    "importance": 100,
    "help": "제조사 시험 기준 최대 동영상 스트리밍 시간이에요. 실제 사용시간은 달라질 수 있어요."
   },
   {
    "id": "weight",
    "name": "무게",
    "icon": "box",
    "unit": "kg",
    "better": "low",
    "group": "main",
    "selected": true,
    "importance": 100,
    "help": "본체 무게 (kg)"
   },
   {
    "id": "screen_diagonal",
    "name": "화면 크기",
    "icon": "camera",
    "unit": "cm",
    "better": "high",
    "group": "main",
    "selected": true,
    "importance": 100,
    "help": "화면 대각선 (cm)"
   },
   {
    "id": "storage_capacity",
    "name": "저장공간",
    "icon": "wallet",
    "unit": "GB",
    "better": "high",
    "group": "main",
    "selected": false,
    "importance": 0,
    "help": "기본형 저장공간 (GB)"
   },
   {
    "id": "memory_capacity",
    "name": "메모리",
    "icon": "wallet",
    "unit": "GB",
    "better": "high",
    "group": "main",
    "selected": false,
    "importance": 0,
    "help": "기본형 메모리 용량 (GB)"
   },
   {
    "id": "thunderbolt_port_count",
    "name": "연결 포트",
    "icon": "star",
    "unit": "개",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "썬더볼트 4 USB-C 포트 개수예요. 모든 종류의 연결 포트를 합산한 값은 아니에요."
   },
   {
    "id": "battery_capacity",
    "name": "배터리 용량",
    "icon": "wallet",
    "unit": "Wh",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "배터리 용량 (Wh)"
   },
   {
    "id": "gpu_core_count",
    "name": "그래픽 코어",
    "icon": "star",
    "unit": "개",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "기본형 GPU 코어 수예요. 실제 그래픽 성능 점수를 뜻하지 않아요."
   },
   {
    "id": "cpu_core_count",
    "name": "CPU 코어",
    "icon": "star",
    "unit": "개",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "CPU 코어 수예요. 실제 작업 성능 점수를 뜻하지 않아요."
   },
   {
    "id": "display_pixel_count",
    "name": "해상도",
    "icon": "camera",
    "unit": "픽셀",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "화면 가로 픽셀 수와 세로 픽셀 수의 곱이에요. 화면 품질 전체를 평가하는 값은 아니에요."
   },
   {
    "id": "wireless_web_duration",
    "name": "웹 사용시간",
    "icon": "clock",
    "unit": "시간",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "제조사 시험 기준 최대 무선 인터넷 사용시간이에요."
   }
  ],
  "values": {
   "맥북 에어 13 M4": {
    "initial_cost": {
     "score": 100,
     "text": "159만원",
     "estimated": false
    },
    "usable_duration": {
     "score": 0,
     "text": "18시간",
     "estimated": false
    },
    "weight": {
     "score": 100,
     "text": "1.24kg",
     "estimated": false
    },
    "screen_diagonal": {
     "score": 0,
     "text": "34.5cm",
     "estimated": false
    },
    "storage_capacity": {
     "score": 0,
     "text": "256GB",
     "estimated": false
    },
    "memory_capacity": {
     "score": 50,
     "text": "16GB",
     "estimated": false
    },
    "thunderbolt_port_count": {
     "score": 0,
     "text": "2개",
     "estimated": false
    },
    "battery_capacity": {
     "score": 0,
     "text": "53.8Wh",
     "estimated": false
    },
    "gpu_core_count": {
     "score": 0,
     "text": "8개",
     "estimated": false
    },
    "cpu_core_count": {
     "score": 50,
     "text": "10개",
     "estimated": false
    },
    "display_pixel_count": {
     "score": 0,
     "text": "4,259,840픽셀",
     "estimated": false
    },
    "wireless_web_duration": {
     "score": 0,
     "text": "15시간",
     "estimated": false
    }
   },
   "맥북 에어 15 M4": {
    "initial_cost": {
     "score": 62.5,
     "text": "189만원",
     "estimated": false
    },
    "usable_duration": {
     "score": 0,
     "text": "18시간",
     "estimated": false
    },
    "weight": {
     "score": 12.9032,
     "text": "1.51kg",
     "estimated": false
    },
    "screen_diagonal": {
     "score": 100,
     "text": "38.9cm",
     "estimated": false
    },
    "storage_capacity": {
     "score": 0,
     "text": "256GB",
     "estimated": false
    },
    "memory_capacity": {
     "score": 50,
     "text": "16GB",
     "estimated": false
    },
    "thunderbolt_port_count": {
     "score": 0,
     "text": "2개",
     "estimated": false
    },
    "battery_capacity": {
     "score": 68.2796,
     "text": "66.5Wh",
     "estimated": false
    },
    "gpu_core_count": {
     "score": 100,
     "text": "10개",
     "estimated": false
    },
    "cpu_core_count": {
     "score": 50,
     "text": "10개",
     "estimated": false
    },
    "display_pixel_count": {
     "score": 66.0086,
     "text": "5,368,320픽셀",
     "estimated": false
    },
    "wireless_web_duration": {
     "score": 0,
     "text": "15시간",
     "estimated": false
    }
   },
   "맥북 프로 14 M4": {
    "initial_cost": {
     "score": 0,
     "text": "239만원",
     "estimated": false
    },
    "usable_duration": {
     "score": 100,
     "text": "24시간",
     "estimated": false
    },
    "weight": {
     "score": 0,
     "text": "1.55kg",
     "estimated": false
    },
    "screen_diagonal": {
     "score": 31.8182,
     "text": "35.9cm",
     "estimated": false
    },
    "storage_capacity": {
     "score": 100,
     "text": "512GB",
     "estimated": false
    },
    "memory_capacity": {
     "score": 50,
     "text": "16GB",
     "estimated": false
    },
    "thunderbolt_port_count": {
     "score": 100,
     "text": "3개",
     "estimated": false
    },
    "battery_capacity": {
     "score": 100,
     "text": "72.4Wh",
     "estimated": false
    },
    "gpu_core_count": {
     "score": 100,
     "text": "10개",
     "estimated": false
    },
    "cpu_core_count": {
     "score": 50,
     "text": "10개",
     "estimated": false
    },
    "display_pixel_count": {
     "score": 100,
     "text": "5,939,136픽셀",
     "estimated": false
    },
    "wireless_web_duration": {
     "score": 100,
     "text": "16시간",
     "estimated": false
    }
   }
  },
  "info": {
   "맥북 에어 13 M4": "가격: 159만원, 배터리: 18시간, 무게: 1.24kg, 화면 크기: 34.5cm, 저장공간: 256GB, 메모리: 16GB, 연결 포트: 2개, 배터리 용량: 53.8Wh, 그래픽 코어: 8개, CPU 코어: 10개, 해상도: 4,259,840픽셀, 웹 사용시간: 15시간",
   "맥북 에어 15 M4": "가격: 189만원, 배터리: 18시간, 무게: 1.51kg, 화면 크기: 38.9cm, 저장공간: 256GB, 메모리: 16GB, 연결 포트: 2개, 배터리 용량: 66.5Wh, 그래픽 코어: 10개, CPU 코어: 10개, 해상도: 5,368,320픽셀, 웹 사용시간: 15시간",
   "맥북 프로 14 M4": "가격: 239만원, 배터리: 24시간, 무게: 1.55kg, 화면 크기: 35.9cm, 저장공간: 512GB, 메모리: 16GB, 연결 포트: 3개, 배터리 용량: 72.4Wh, 그래픽 코어: 10개, CPU 코어: 10개, 해상도: 5,939,136픽셀, 웹 사용시간: 16시간"
  },
  "analysis": {
   "ranking": [
    {
     "name": "맥북 에어 13 M4",
     "score": 50
    },
    {
     "name": "맥북 에어 15 M4",
     "score": 44
    },
    {
     "name": "맥북 프로 14 M4",
     "score": 33
    }
   ],
   "summary": "현재 선택한 객관 기준과 기본 중요도에서는 맥북 에어 13 M4의 총점이 가장 높아요.",
   "explanation": "맥북 에어 13 M4가 총점 50점으로 가장 높아요. 가장 큰 차이는 '무게'예요(맥북 에어 13 M4 1.24kg, 맥북 에어 15 M4 1.51kg). 반대로 '화면 크기'는 맥북 에어 15 M4가 더 유리해요. 추가 기준을 선택하거나 중요도를 바꾸면 순위가 달라질 수 있어요.",
   "sensitivity": [
    "'가격' 비중을 25%에서 10.3%로 낮추면 두 선택지가 공동 1위가 돼요.",
    "'배터리' 비중을 25%에서 35.9%로 높이면 두 선택지가 공동 1위가 돼요.",
    "'무게' 비중을 25%에서 19.3%로 낮추면 두 선택지가 공동 1위가 돼요.",
    "'화면 크기' 비중을 25%에서 29.3%로 높이면 두 선택지가 공동 1위가 돼요."
   ],
   "whatIf": [
    {
     "label": "'가격'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "initial_cost",
     "multiplier": 2,
     "winner": "맥북 에어 13 M4",
     "scores": [
      {
       "name": "맥북 에어 13 M4",
       "score": 60
      },
      {
       "name": "맥북 에어 15 M4",
       "score": 48
      },
      {
       "name": "맥북 프로 14 M4",
       "score": 26
      }
     ]
    },
    {
     "label": "'배터리'를 지금보다 두 배 중요하게 본다면?",
     "criterion": "usable_duration",
     "multiplier": 2,
     "winner": "맥북 프로 14 M4",
     "scores": [
      {
       "name": "맥북 프로 14 M4",
       "score": 46
      },
      {
       "name": "맥북 에어 13 M4",
       "score": 40
      },
      {
       "name": "맥북 에어 15 M4",
       "score": 35
      }
     ]
    },
    {
     "label": "'무게'를 지금보다 두 배 중요하게 본다면?",
     "criterion": "weight",
     "multiplier": 2,
     "winner": "맥북 에어 13 M4",
     "scores": [
      {
       "name": "맥북 에어 13 M4",
       "score": 60
      },
      {
       "name": "맥북 에어 15 M4",
       "score": 38
      },
      {
       "name": "맥북 프로 14 M4",
       "score": 26
      }
     ]
    },
    {
     "label": "'화면 크기'를 지금보다 두 배 중요하게 본다면?",
     "criterion": "screen_diagonal",
     "multiplier": 2,
     "winner": "맥북 에어 15 M4",
     "scores": [
      {
       "name": "맥북 에어 15 M4",
       "score": 55
      },
      {
       "name": "맥북 에어 13 M4",
       "score": 40
      },
      {
       "name": "맥북 프로 14 M4",
       "score": 33
      }
     ]
    }
   ]
  },
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
  ],
  "notes": [
   "한국 공식 출시가격이에요. 2026년 현재 판매가격이 아니에요. 에어는 16GB·256GB, 프로는 16GB·512GB 기본형을 비교해요.",
   "제조사의 동영상 스트리밍 최대 시간이에요. 실제 사용시간을 보장하지 않아요.",
   "에어 2025년 출시, 프로 2024년 출시"
  ],
  "sources": []
 },
 {
  "id": "earbuds_purchase",
  "title": "무선 이어폰 구매",
  "topic": "무선 이어폰 구매",
  "category": "shopping",
  "options": [
   "에어팟 4 ANC",
   "갤럭시 버즈4",
   "갤럭시 버즈4 프로"
  ],
  "criteria": [
   {
    "id": "initial_cost",
    "name": "가격",
    "icon": "wallet",
    "unit": "원",
    "better": "low",
    "group": "common",
    "selected": true,
    "importance": 100,
    "help": "한국 공식 출시가격이에요. 현재 할인가격이 아니에요."
   },
   {
    "id": "usable_duration",
    "name": "배터리",
    "icon": "clock",
    "unit": "시간",
    "better": "high",
    "group": "common",
    "selected": true,
    "importance": 100,
    "help": "ANC를 켠 상태에서 한 번 충전으로 최대 연속 재생 가능한 시간이에요."
   },
   {
    "id": "earbud_weight",
    "name": "무게",
    "icon": "box",
    "unit": "g",
    "better": "low",
    "group": "main",
    "selected": true,
    "importance": 100,
    "help": "이어버드 한쪽의 무게예요. 착용감을 직접 평가한 값은 아니에요."
   },
   {
    "id": "anc_supported",
    "name": "노이즈 캔슬링",
    "icon": "star",
    "unit": "지원 여부",
    "better": "high",
    "group": "main",
    "selected": false,
    "importance": 0,
    "help": "ANC 기능 지원 여부예요. 소음 차단 성능이나 만족도 점수가 아니에요."
   },
   {
    "id": "transparency_supported",
    "name": "주변음 듣기",
    "icon": "star",
    "unit": "지원 여부",
    "better": "high",
    "group": "main",
    "selected": false,
    "importance": 0,
    "help": "이어버드를 착용한 상태에서 주변 소리를 듣는 기능의 지원 여부예요."
   },
   {
    "id": "wireless_charging_supported",
    "name": "무선충전",
    "icon": "star",
    "unit": "지원 여부",
    "better": "high",
    "group": "main",
    "selected": false,
    "importance": 0,
    "help": "충전 케이스의 무선충전 지원 여부예요."
   },
   {
    "id": "case_playback_duration",
    "name": "총 재생시간",
    "icon": "clock",
    "unit": "시간",
    "better": "high",
    "group": "more",
    "selected": true,
    "importance": 100,
    "help": "ANC를 켠 상태에서 케이스 충전까지 포함한 최대 총 음악 재생시간이에요."
   },
   {
    "id": "case_weight",
    "name": "케이스 무게",
    "icon": "box",
    "unit": "g",
    "better": "low",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "충전 케이스 무게 (g)"
   },
   {
    "id": "total_carry_weight",
    "name": "전체 무게",
    "icon": "box",
    "unit": "g",
    "better": "low",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "이어버드 2개와 케이스 총무게 (g) — earbud_weight * 2 + case_weight"
   },
   {
    "id": "anc_off_duration",
    "name": "일반 재생시간",
    "icon": "clock",
    "unit": "시간",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "ANC를 끈 상태에서 한 번 충전으로 최대 연속 재생 가능한 시간이에요."
   },
   {
    "id": "anc_off_case_duration",
    "name": "일반 총시간",
    "icon": "clock",
    "unit": "시간",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "ANC를 끈 상태에서 케이스 충전까지 포함한 최대 총 음악 재생시간이에요."
   },
   {
    "id": "case_envelope_volume",
    "name": "케이스 크기",
    "icon": "box",
    "unit": "cm³",
    "better": "low",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "외형 가로·세로·깊이를 곱한 직육면체 환산부피예요. 실제 곡면 케이스의 체적은 아니에요."
   }
  ],
  "values": {
   "에어팟 4 ANC": {
    "initial_cost": {
     "score": 90,
     "text": "26.9만원",
     "estimated": false
    },
    "usable_duration": {
     "score": 0,
     "text": "4시간",
     "estimated": false
    },
    "earbud_weight": {
     "score": 100,
     "text": "4.3g",
     "estimated": false
    },
    "anc_supported": {
     "score": 50,
     "text": "지원",
     "estimated": false
    },
    "transparency_supported": {
     "score": 50,
     "text": "지원",
     "estimated": false
    },
    "wireless_charging_supported": {
     "score": 50,
     "text": "지원",
     "estimated": false
    },
    "case_playback_duration": {
     "score": 0,
     "text": "20시간",
     "estimated": false
    },
    "case_weight": {
     "score": 100,
     "text": "34.7g",
     "estimated": false
    },
    "total_carry_weight": {
     "score": 100,
     "text": "43.3g",
     "estimated": false
    },
    "anc_off_duration": {
     "score": 0,
     "text": "5시간",
     "estimated": false
    },
    "anc_off_case_duration": {
     "score": 50,
     "text": "30시간",
     "estimated": false
    },
    "case_envelope_volume": {
     "score": 100,
     "text": "49.1cm³",
     "estimated": false
    }
   },
   "갤럭시 버즈4": {
    "initial_cost": {
     "score": 100,
     "text": "25.9만원",
     "estimated": false
    },
    "usable_duration": {
     "score": 50,
     "text": "5시간",
     "estimated": false
    },
    "earbud_weight": {
     "score": 62.5,
     "text": "4.6g",
     "estimated": false
    },
    "anc_supported": {
     "score": 50,
     "text": "지원",
     "estimated": false
    },
    "transparency_supported": {
     "score": 50,
     "text": "지원",
     "estimated": false
    },
    "wireless_charging_supported": {
     "score": 50,
     "text": "지원",
     "estimated": false
    },
    "case_playback_duration": {
     "score": 66.6667,
     "text": "24시간",
     "estimated": false
    },
    "case_weight": {
     "score": 0,
     "text": "45.1g",
     "estimated": false
    },
    "total_carry_weight": {
     "score": 1.7857,
     "text": "54.3g",
     "estimated": false
    },
    "anc_off_duration": {
     "score": 50,
     "text": "6시간",
     "estimated": false
    },
    "anc_off_case_duration": {
     "score": 50,
     "text": "30시간",
     "estimated": false
    },
    "case_envelope_volume": {
     "score": 0,
     "text": "73.6cm³",
     "estimated": false
    }
   },
   "갤럭시 버즈4 프로": {
    "initial_cost": {
     "score": 0,
     "text": "35.9만원",
     "estimated": false
    },
    "usable_duration": {
     "score": 100,
     "text": "6시간",
     "estimated": false
    },
    "earbud_weight": {
     "score": 0,
     "text": "5.1g",
     "estimated": false
    },
    "anc_supported": {
     "score": 50,
     "text": "지원",
     "estimated": false
    },
    "transparency_supported": {
     "score": 50,
     "text": "지원",
     "estimated": false
    },
    "wireless_charging_supported": {
     "score": 50,
     "text": "지원",
     "estimated": false
    },
    "case_playback_duration": {
     "score": 100,
     "text": "26시간",
     "estimated": false
    },
    "case_weight": {
     "score": 7.6923,
     "text": "44.3g",
     "estimated": false
    },
    "total_carry_weight": {
     "score": 0,
     "text": "54.5g",
     "estimated": false
    },
    "anc_off_duration": {
     "score": 100,
     "text": "7시간",
     "estimated": false
    },
    "anc_off_case_duration": {
     "score": 50,
     "text": "30시간",
     "estimated": false
    },
    "case_envelope_volume": {
     "score": 0,
     "text": "73.6cm³",
     "estimated": false
    }
   }
  },
  "info": {
   "에어팟 4 ANC": "가격: 26.9만원, 배터리: 4시간, 무게: 4.3g, 노이즈 캔슬링: 지원, 주변음 듣기: 지원, 무선충전: 지원, 총 재생시간: 20시간, 케이스 무게: 34.7g, 전체 무게: 43.3g, 일반 재생시간: 5시간, 일반 총시간: 30시간, 케이스 크기: 49.1cm³",
   "갤럭시 버즈4": "가격: 25.9만원, 배터리: 5시간, 무게: 4.6g, 노이즈 캔슬링: 지원, 주변음 듣기: 지원, 무선충전: 지원, 총 재생시간: 24시간, 케이스 무게: 45.1g, 전체 무게: 54.3g, 일반 재생시간: 6시간, 일반 총시간: 30시간, 케이스 크기: 73.6cm³",
   "갤럭시 버즈4 프로": "가격: 35.9만원, 배터리: 6시간, 무게: 5.1g, 노이즈 캔슬링: 지원, 주변음 듣기: 지원, 무선충전: 지원, 총 재생시간: 26시간, 케이스 무게: 44.3g, 전체 무게: 54.5g, 일반 재생시간: 7시간, 일반 총시간: 30시간, 케이스 크기: 73.6cm³"
  },
  "analysis": {
   "ranking": [
    {
     "name": "갤럭시 버즈4",
     "score": 70
    },
    {
     "name": "갤럭시 버즈4 프로",
     "score": 50
    },
    {
     "name": "에어팟 4 ANC",
     "score": 48
    }
   ],
   "summary": "현재 선택한 객관 기준과 기본 중요도에서는 갤럭시 버즈4의 총점이 가장 높아요.",
   "explanation": "갤럭시 버즈4가 총점 70점으로 가장 높아요. 가장 큰 차이는 '가격'이에요(갤럭시 버즈4 25.9만원, 갤럭시 버즈4 프로 35.9만원). 반대로 '배터리'는 갤럭시 버즈4 프로가 더 유리해요. 추가 기준을 선택하거나 중요도를 바꾸면 순위가 달라질 수 있어요.",
   "sensitivity": [
    "'가격' 비중을 25%에서 6.5%로 낮추면 두 선택지가 공동 1위가 돼요.",
    "'배터리' 비중을 25%에서 46.3%로 높이면 두 선택지가 공동 1위가 돼요.",
    "'무게' 비중을 25%에서 53%로 높이면 두 선택지가 공동 1위가 돼요.",
    "'총 재생시간' 비중을 25%에서 52.9%로 높이면 두 선택지가 공동 1위가 돼요."
   ],
   "whatIf": [
    {
     "label": "'가격'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "initial_cost",
     "multiplier": 2,
     "winner": "갤럭시 버즈4",
     "scores": [
      {
       "name": "갤럭시 버즈4",
       "score": 76
      },
      {
       "name": "에어팟 4 ANC",
       "score": 56
      },
      {
       "name": "갤럭시 버즈4 프로",
       "score": 40
      }
     ]
    },
    {
     "label": "'배터리'를 지금보다 두 배 중요하게 본다면?",
     "criterion": "usable_duration",
     "multiplier": 2,
     "winner": "갤럭시 버즈4",
     "scores": [
      {
       "name": "갤럭시 버즈4",
       "score": 66
      },
      {
       "name": "갤럭시 버즈4 프로",
       "score": 60
      },
      {
       "name": "에어팟 4 ANC",
       "score": 38
      }
     ]
    },
    {
     "label": "'무게'를 지금보다 두 배 중요하게 본다면?",
     "criterion": "earbud_weight",
     "multiplier": 2,
     "winner": "갤럭시 버즈4",
     "scores": [
      {
       "name": "갤럭시 버즈4",
       "score": 68
      },
      {
       "name": "에어팟 4 ANC",
       "score": 58
      },
      {
       "name": "갤럭시 버즈4 프로",
       "score": 40
      }
     ]
    },
    {
     "label": "'총 재생시간'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "case_playback_duration",
     "multiplier": 2,
     "winner": "갤럭시 버즈4",
     "scores": [
      {
       "name": "갤럭시 버즈4",
       "score": 69
      },
      {
       "name": "갤럭시 버즈4 프로",
       "score": 60
      },
      {
       "name": "에어팟 4 ANC",
       "score": 38
      }
     ]
    }
   ]
  },
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
  ],
  "notes": [
   "한국 공식 출시가격이에요. 할인·배송비는 제외해요.",
   "모두 ANC를 켠 상태의 제조사 최대 음악 재생시간이에요. 제조사별 시험 조건이 달라 실사용 성능 순위를 보장하지 않아요.",
   "에어팟 2024년 출시, 버즈 2026년 출시"
  ],
  "sources": []
 },
 {
  "id": "travel_domestic",
  "title": "국내 여행지 선택",
  "topic": "국내 여행지 선택",
  "category": "leisure",
  "options": [
   "전주",
   "부산",
   "제주도"
  ],
  "criteria": [
   {
    "id": "initial_cost",
    "name": "총 여행 비용",
    "icon": "wallet",
    "unit": "원",
    "better": "low",
    "group": "common",
    "selected": true,
    "importance": 100,
    "help": "서울 출발 1인 2박 3일 기준 교통비, 숙박비, 식비 6끼, 현지 이동비를 더한 값이에요. 관광 입장료와 쇼핑은 빼요."
   },
   {
    "id": "time_required",
    "name": "이동 시간",
    "icon": "clock",
    "unit": "시간",
    "better": "low",
    "group": "common",
    "selected": true,
    "importance": 100,
    "help": "서울에서 왕복하는 데 걸리는 시간이에요. 역이나 공항에서 기다리는 시간을 포함해요."
   },
   {
    "id": "transport_cost",
    "name": "왕복 교통비",
    "icon": "wallet",
    "unit": "원",
    "better": "low",
    "group": "main",
    "selected": false,
    "importance": 0,
    "help": "전주와 부산은 KTX 일반실 왕복, 제주는 김포 출발 항공 왕복 평균이에요."
   },
   {
    "id": "lodging_cost",
    "name": "숙박비(2박)",
    "icon": "wallet",
    "unit": "원",
    "better": "low",
    "group": "main",
    "selected": false,
    "importance": 0,
    "help": "1인 기준 중급 숙소 2박 합계예요. 숙소 종류와 날짜에 따라 달라요."
   },
   {
    "id": "meal_price",
    "name": "대표 음식 1인분",
    "icon": "wallet",
    "unit": "원",
    "better": "low",
    "group": "main",
    "selected": true,
    "importance": 100,
    "help": "전주 비빔밥, 부산 돼지국밥, 제주 고기국수 가격이에요. 식당에 따라 달라요."
   },
   {
    "id": "local_transport_cost",
    "name": "현지 이동비",
    "icon": "wallet",
    "unit": "원",
    "better": "low",
    "group": "main",
    "selected": false,
    "importance": 0,
    "help": "전주와 부산은 대중교통과 택시, 제주는 렌터카 2일 비용으로 잡았어요."
   },
   {
    "id": "transit_only",
    "name": "대중교통 이동",
    "icon": "bus",
    "unit": "가능 여부",
    "better": "high",
    "group": "more",
    "selected": true,
    "importance": 100,
    "help": "렌터카 없이 대중교통만으로 주요 관광지를 다닐 수 있는지 봐요. 제주는 렌터카를 권하는 경우가 많아요."
   },
   {
    "id": "oct_temperature",
    "name": "10월 평균 기온",
    "icon": "sun",
    "unit": "℃",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "기온이 높을수록 10월 야외 일정에 유리하다고 단순하게 본 기준이에요. 취향에 따라 달라요."
   }
  ],
  "values": {
   "전주": {
    "initial_cost": {
     "score": 100,
     "text": "28.9만원",
     "estimated": false
    },
    "time_required": {
     "score": 100,
     "text": "3.9시간",
     "estimated": false
    },
    "transport_cost": {
     "score": 100,
     "text": "6.4만원",
     "estimated": true
    },
    "lodging_cost": {
     "score": 100,
     "text": "13만원",
     "estimated": true
    },
    "meal_price": {
     "score": 0,
     "text": "1.3만원",
     "estimated": true
    },
    "local_transport_cost": {
     "score": 100,
     "text": "2만원",
     "estimated": true
    },
    "transit_only": {
     "score": 100,
     "text": "가능",
     "estimated": true
    },
    "oct_temperature": {
     "score": 0,
     "text": "15℃",
     "estimated": true
    }
   },
   "부산": {
    "initial_cost": {
     "score": 59.878,
     "text": "35.5만원",
     "estimated": false
    },
    "time_required": {
     "score": 0,
     "text": "5.6시간",
     "estimated": false
    },
    "transport_cost": {
     "score": 0,
     "text": "10.9만원",
     "estimated": false
    },
    "lodging_cost": {
     "score": 25,
     "text": "16만원",
     "estimated": true
    },
    "meal_price": {
     "score": 75,
     "text": "1.1만원",
     "estimated": true
    },
    "local_transport_cost": {
     "score": 100,
     "text": "2만원",
     "estimated": true
    },
    "transit_only": {
     "score": 100,
     "text": "가능",
     "estimated": true
    },
    "oct_temperature": {
     "score": 100,
     "text": "18℃",
     "estimated": true
    }
   },
   "제주도": {
    "initial_cost": {
     "score": 0,
     "text": "45.3만원",
     "estimated": false
    },
    "time_required": {
     "score": 5.8824,
     "text": "5.5시간",
     "estimated": false
    },
    "transport_cost": {
     "score": 19.6429,
     "text": "10만원",
     "estimated": true
    },
    "lodging_cost": {
     "score": 0,
     "text": "17만원",
     "estimated": true
    },
    "meal_price": {
     "score": 100,
     "text": "1.1만원",
     "estimated": true
    },
    "local_transport_cost": {
     "score": 0,
     "text": "12만원",
     "estimated": true
    },
    "transit_only": {
     "score": 0,
     "text": "불가능",
     "estimated": true
    },
    "oct_temperature": {
     "score": 100,
     "text": "18℃",
     "estimated": true
    }
   }
  },
  "info": {
   "전주": "총 여행 비용: 28.9만원, 이동 시간: 3.9시간, 왕복 교통비: 6.4만원, 숙박비(2박): 13만원, 대표 음식 1인분: 1.3만원, 현지 이동비: 2만원, 대중교통 이동: 가능, 10월 평균 기온: 15℃",
   "부산": "총 여행 비용: 35.5만원, 이동 시간: 5.6시간, 왕복 교통비: 10.9만원, 숙박비(2박): 16만원, 대표 음식 1인분: 1.1만원, 현지 이동비: 2만원, 대중교통 이동: 가능, 10월 평균 기온: 18℃",
   "제주도": "총 여행 비용: 45.3만원, 이동 시간: 5.5시간, 왕복 교통비: 10만원, 숙박비(2박): 17만원, 대표 음식 1인분: 1.1만원, 현지 이동비: 12만원, 대중교통 이동: 불가능, 10월 평균 기온: 18℃"
  },
  "analysis": {
   "ranking": [
    {
     "name": "전주",
     "score": 75
    },
    {
     "name": "부산",
     "score": 59
    },
    {
     "name": "제주도",
     "score": 26
    }
   ],
   "summary": "현재 선택한 객관 기준과 기본 중요도에서는 전주가 총점이 가장 높아요.",
   "explanation": "전주가 총점 75점으로 가장 높아요. 가장 큰 차이는 '이동 시간'이에요(전주 3.9시간, 부산 5.6시간). 반대로 '대표 음식 1인분'은 부산이 더 유리해요. 추가 기준을 선택하거나 중요도를 바꾸면 순위가 달라질 수 있어요. 계산값은 비교를 위한 환산값이며 실제 금액이 아니에요.",
   "sensitivity": [
    "'이동 시간' 비중을 25%에서 10.4%로 낮추면 두 선택지가 공동 1위가 돼요.",
    "'대표 음식 1인분' 비중을 25%에서 38.4%로 높이면 두 선택지가 공동 1위가 돼요."
   ],
   "whatIf": [
    {
     "label": "'총 여행 비용'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "initial_cost",
     "multiplier": 2,
     "winner": "전주",
     "scores": [
      {
       "name": "전주",
       "score": 80
      },
      {
       "name": "부산",
       "score": 59
      },
      {
       "name": "제주도",
       "score": 21
      }
     ]
    },
    {
     "label": "'이동 시간'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "time_required",
     "multiplier": 2,
     "winner": "전주",
     "scores": [
      {
       "name": "전주",
       "score": 80
      },
      {
       "name": "부산",
       "score": 47
      },
      {
       "name": "제주도",
       "score": 22
      }
     ]
    },
    {
     "label": "'대표 음식 1인분'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "meal_price",
     "multiplier": 2,
     "winner": "부산",
     "scores": [
      {
       "name": "부산",
       "score": 62
      },
      {
       "name": "전주",
       "score": 60
      },
      {
       "name": "제주도",
       "score": 41
      }
     ]
    },
    {
     "label": "'대중교통 이동'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "transit_only",
     "multiplier": 2,
     "winner": "전주",
     "scores": [
      {
       "name": "전주",
       "score": 80
      },
      {
       "name": "부산",
       "score": 67
      },
      {
       "name": "제주도",
       "score": 21
      }
     ]
    }
   ]
  },
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
  ],
  "notes": [
   "서울 출발 1인 2박 3일, 식사 6끼를 기준으로 해요. 전주와 부산은 KTX, 제주는 김포 출발 항공편을 써요. 비용은 비교용 시나리오이고 실제 예약 금액이 아니에요.",
   "부산 KTX 요금(5만 4,400원)만 공개 자료로 확인했어요. 나머지 금액과 기온은 시연용 추정값이에요. 입장료, 쇼핑, 성수기 가격 변동은 반영하지 않았어요.",
   "2026년 10월 기준, KTX 요금은 2026년 9월 1일 인하 반영"
  ],
  "sources": [
   {
    "label": "한국경제, KTX·SRT 통합과 요금 인하 보도",
    "url": "https://www.hankyung.com/article/2026083145861",
    "asOf": "2026-09-01",
    "note": "서울-부산 일반실 5만 9,800원에서 5만 4,400원"
   },
   {
    "label": "Trip.com 코레일 소요시간 정보",
    "url": "https://us.trip.com/trains/korail/route/seoul-to-busan/",
    "asOf": "2026-10",
    "note": "서울-부산 약 2시간 18분, 서울-전주 약 1시간 26분(비공식)"
   },
   {
    "label": "제주항공 국내선 운임 안내",
    "url": "https://www.jejuair.net/ko/prepare/fare/domesticBenefit.do",
    "asOf": "2026-10",
    "note": "김포-제주 정가와 카약 실거래 평균을 참고해 왕복 10만원으로 잡음"
   },
   {
    "label": "나머지 값",
    "url": "",
    "asOf": "2026-10-05",
    "note": "근거 범위를 참고한 시연용 추정값이에요."
   }
  ]
 },
 {
  "id": "savings_choice",
  "title": "예금·적금 선택",
  "topic": "예금·적금 선택",
  "category": "finance",
  "options": [
   "정기예금",
   "정기적금"
  ],
  "criteria": [
   {
    "id": "initial_cost",
    "name": "처음 필요한 돈",
    "icon": "wallet",
    "unit": "원",
    "better": "low",
    "group": "common",
    "selected": true,
    "importance": 100,
    "help": "가입할 때 한 번에 준비해야 하는 금액이에요. 예금은 600만원 일시 예치, 적금은 첫 달 납입액이에요."
   },
   {
    "id": "time_required",
    "name": "돈이 묶이는 기간",
    "icon": "clock",
    "unit": "개월",
    "better": "low",
    "group": "common",
    "selected": true,
    "importance": 100,
    "help": "낸 돈이 평균 몇 개월 동안 묶이는지 계산한 값이에요. 적금은 매달 넣어서 평균이 짧아요."
   },
   {
    "id": "interest_rate",
    "name": "표시 금리",
    "icon": "chart",
    "unit": "%/년",
    "better": "high",
    "group": "main",
    "selected": false,
    "importance": 0,
    "help": "12개월 기본금리를 단순화한 값이에요. 은행과 우대조건에 따라 달라요."
   },
   {
    "id": "total_interest",
    "name": "만기 이자(세전)",
    "icon": "wallet",
    "unit": "원",
    "better": "high",
    "group": "main",
    "selected": true,
    "importance": 100,
    "help": "총 600만원을 낼 때 12개월 뒤 받는 세전 이자예요. 적금은 월 50만원 단리 계산이에요."
   },
   {
    "id": "auto_saving",
    "name": "매달 자동 납입",
    "icon": "refresh",
    "unit": "가능 여부",
    "better": "high",
    "group": "main",
    "selected": true,
    "importance": 100,
    "help": "매달 자동이체로 저축 습관을 만들 수 있는 구조인지 봐요."
   },
   {
    "id": "early_withdrawal_rate",
    "name": "중도해지 금리",
    "icon": "chart",
    "unit": "%/년",
    "better": "high",
    "group": "main",
    "selected": true,
    "importance": 100,
    "help": "만기 전에 해지하면 적용되는 금리예요. 상품마다 달라서 일반적인 수준으로 잡았어요."
   },
   {
    "id": "after_tax_interest",
    "name": "만기 이자(세후)",
    "icon": "wallet",
    "unit": "원",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "세전 이자에서 이자소득세 15.4%를 뺀 금액이에요."
   },
   {
    "id": "return_on_principal",
    "name": "납입금 대비 이자율",
    "icon": "wallet",
    "unit": "%",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "총 납입 원금 대비 세전 이자 비율이에요. 적금은 돈이 늦게 들어가서 표시 금리보다 낮아요."
   },
   {
    "id": "min_deposit",
    "name": "최소 가입 금액",
    "icon": "wallet",
    "unit": "원",
    "better": "low",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "가입에 필요한 최소 금액이에요. 은행마다 달라서 일반적인 수준으로 잡았어요."
   },
   {
    "id": "protection_limit",
    "name": "예금자보호 한도",
    "icon": "shield",
    "unit": "원",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "한 금융기관당 1인 보호 한도예요. 예금과 적금이 같아요."
   }
  ],
  "values": {
   "정기예금": {
    "initial_cost": {
     "score": 0,
     "text": "600만원",
     "estimated": false
    },
    "time_required": {
     "score": 0,
     "text": "12개월",
     "estimated": false
    },
    "interest_rate": {
     "score": 0,
     "text": "2.9%/년",
     "estimated": true
    },
    "total_interest": {
     "score": 100,
     "text": "17.4만원",
     "estimated": false
    },
    "auto_saving": {
     "score": 0,
     "text": "불가능",
     "estimated": false
    },
    "early_withdrawal_rate": {
     "score": 100,
     "text": "1.5%/년",
     "estimated": true
    },
    "after_tax_interest": {
     "score": 100,
     "text": "14.7만원",
     "estimated": false
    },
    "return_on_principal": {
     "score": 100,
     "text": "2.9%",
     "estimated": false
    },
    "min_deposit": {
     "score": 0,
     "text": "100만원",
     "estimated": true
    },
    "protection_limit": {
     "score": 50,
     "text": "1억원",
     "estimated": false
    }
   },
   "정기적금": {
    "initial_cost": {
     "score": 100,
     "text": "50만원",
     "estimated": false
    },
    "time_required": {
     "score": 100,
     "text": "6.5개월",
     "estimated": false
    },
    "interest_rate": {
     "score": 100,
     "text": "3.4%/년",
     "estimated": true
    },
    "total_interest": {
     "score": 0,
     "text": "11.1만원",
     "estimated": false
    },
    "auto_saving": {
     "score": 100,
     "text": "가능",
     "estimated": false
    },
    "early_withdrawal_rate": {
     "score": 0,
     "text": "0.8%/년",
     "estimated": true
    },
    "after_tax_interest": {
     "score": 0,
     "text": "9.3만원",
     "estimated": false
    },
    "return_on_principal": {
     "score": 0,
     "text": "1.84%",
     "estimated": false
    },
    "min_deposit": {
     "score": 100,
     "text": "1만원",
     "estimated": true
    },
    "protection_limit": {
     "score": 50,
     "text": "1억원",
     "estimated": false
    }
   }
  },
  "info": {
   "정기예금": "처음 필요한 돈: 600만원, 돈이 묶이는 기간: 12개월, 표시 금리: 2.9%/년, 만기 이자(세전): 17.4만원, 매달 자동 납입: 불가능, 중도해지 금리: 1.5%/년, 만기 이자(세후): 14.7만원, 납입금 대비 이자율: 2.9%, 최소 가입 금액: 100만원, 예금자보호 한도: 1억원",
   "정기적금": "처음 필요한 돈: 50만원, 돈이 묶이는 기간: 6.5개월, 표시 금리: 3.4%/년, 만기 이자(세전): 11.1만원, 매달 자동 납입: 가능, 중도해지 금리: 0.8%/년, 만기 이자(세후): 9.3만원, 납입금 대비 이자율: 1.84%, 최소 가입 금액: 1만원, 예금자보호 한도: 1억원"
  },
  "analysis": {
   "ranking": [
    {
     "name": "정기적금",
     "score": 60
    },
    {
     "name": "정기예금",
     "score": 40
    }
   ],
   "summary": "현재 선택한 객관 기준과 기본 중요도에서는 정기적금이 총점이 가장 높아요.",
   "explanation": "정기적금이 총점 60점으로 가장 높아요. 가장 큰 차이는 '처음 필요한 돈'이에요(정기적금 50만원, 정기예금 600만원). 반대로 '만기 이자(세전)'은 정기예금이 더 유리해요. 추가 기준을 선택하거나 중요도를 바꾸면 순위가 달라질 수 있어요. 계산값은 비교를 위한 환산값이며 실제 금액이 아니에요.",
   "sensitivity": [
    "'만기 이자(세전)' 비중을 20%에서 33.3%로 높이면 두 선택지가 공동 1위가 돼요.",
    "'중도해지 금리' 비중을 20%에서 33.3%로 높이면 두 선택지가 공동 1위가 돼요."
   ],
   "whatIf": [
    {
     "label": "'처음 필요한 돈'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "initial_cost",
     "multiplier": 2,
     "winner": "정기적금",
     "scores": [
      {
       "name": "정기적금",
       "score": 67
      },
      {
       "name": "정기예금",
       "score": 33
      }
     ]
    },
    {
     "label": "'돈이 묶이는 기간'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "time_required",
     "multiplier": 2,
     "winner": "정기적금",
     "scores": [
      {
       "name": "정기적금",
       "score": 67
      },
      {
       "name": "정기예금",
       "score": 33
      }
     ]
    },
    {
     "label": "'만기 이자(세전)'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "total_interest",
     "multiplier": 2,
     "winner": "정기예금",
     "scores": [
      {
       "name": "정기예금",
       "score": 50
      },
      {
       "name": "정기적금",
       "score": 50
      }
     ]
    },
    {
     "label": "'매달 자동 납입'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "auto_saving",
     "multiplier": 2,
     "winner": "정기적금",
     "scores": [
      {
       "name": "정기적금",
       "score": 67
      },
      {
       "name": "정기예금",
       "score": 33
      }
     ]
    },
    {
     "label": "'중도해지 금리'를 지금보다 두 배 중요하게 본다면?",
     "criterion": "early_withdrawal_rate",
     "multiplier": 2,
     "winner": "정기예금",
     "scores": [
      {
       "name": "정기예금",
       "score": 50
      },
      {
       "name": "정기적금",
       "score": 50
      }
     ]
    }
   ]
  },
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
  ],
  "notes": [
   "같은 600만원을 1년 동안 모으는 경우를 비교해요. 예금은 600만원을 한 번에 넣고, 적금은 매달 50만원씩 12개월 동안 넣어요. 금리는 예금 연 2.9%, 적금 연 3.4%로 단순화했어요. 이자는 단리로 계산하고 우대금리는 반영하지 않았어요.",
   "실제 금리와 최소 가입 금액은 은행과 날짜에 따라 달라요. 이 값들은 시연용 추정값이에요. 이자소득세 15.4%와 예금자보호 한도 1억원은 공개 자료로 확인했어요. 청년 대상 우대 상품은 포함하지 않았어요.",
   "2026년 9~10월 기준"
  ],
  "sources": [
   {
    "label": "한국은행, 예금은행 신규취급액 기준 금리",
    "url": "https://www.bok.or.kr/portal/bbs/B0000501/view.do?nttId=10097714&menuNo=200690",
    "asOf": "2026-03",
    "note": "저축성수신 평균 2.82%를 참고해 예금 2.9%, 적금 3.4%로 단순화"
   },
   {
    "label": "예금 금리와 이자소득세 정리",
    "url": "https://etfshopping.com/deposit-rates",
    "asOf": "2026-09",
    "note": "이자소득세 15.4%, 예금자보호 한도 1억원"
   },
   {
    "label": "나머지 값",
    "url": "",
    "asOf": "2026-10-05",
    "note": "중도해지 금리와 최소 가입 금액은 근거 범위를 참고한 시연용 추정값이에요."
   }
  ]
 },
 {
  "id": "exercise_choice",
  "title": "운동 종류 선택",
  "topic": "운동 종류 선택",
  "category": "selfdev",
  "options": [
   "테니스(그룹 레슨)",
   "헬스(PT)"
  ],
  "criteria": [
   {
    "id": "initial_cost",
    "name": "첫 달 비용",
    "icon": "wallet",
    "unit": "원",
    "better": "low",
    "group": "common",
    "selected": true,
    "importance": 100,
    "help": "첫 달 수업료와 회원권, 장비 구입비를 더한 값이에요. 서울 기준 시연용 시나리오예요."
   },
   {
    "id": "time_required",
    "name": "주당 소요 시간",
    "icon": "clock",
    "unit": "시간",
    "better": "low",
    "group": "common",
    "selected": true,
    "importance": 100,
    "help": "주 2회 기준으로 수업, 이동, 준비 시간을 모두 더한 값이에요."
   },
   {
    "id": "calorie_per_hour",
    "name": "1시간 소모 열량",
    "icon": "heart",
    "unit": "kcal",
    "better": "high",
    "group": "main",
    "selected": true,
    "importance": 100,
    "help": "체중 70kg 기준으로 신체활동 강도(MET)에 70을 곱해 계산했어요. 테니스는 복식 6.0, 웨이트는 일반 3.5를 썼어요."
   },
   {
    "id": "group_size",
    "name": "함께 운동하는 사람",
    "icon": "users",
    "unit": "명",
    "better": "high",
    "group": "main",
    "selected": true,
    "importance": 100,
    "help": "본인을 포함해 같이 운동하는 인원이에요. 사람이 많을수록 꾸준히 하기 쉽다고 단순하게 본 기준이에요."
   },
   {
    "id": "one_to_one",
    "name": "1:1 코칭",
    "icon": "users",
    "unit": "가능 여부",
    "better": "high",
    "group": "main",
    "selected": false,
    "importance": 0,
    "help": "수업 중에 한 명의 코치가 나만 봐 주는지 여부예요. 테니스는 그룹 레슨 기준이에요."
   },
   {
    "id": "weather_free",
    "name": "날씨와 무관",
    "icon": "sun",
    "unit": "가능 여부",
    "better": "high",
    "group": "main",
    "selected": true,
    "importance": 100,
    "help": "비나 더위, 추위와 상관없이 운동할 수 있는지 봐요. 테니스는 실외 코트 기준이에요."
   },
   {
    "id": "monthly_cost",
    "name": "월 비용",
    "icon": "wallet",
    "unit": "원/월",
    "better": "low",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "주 2회(월 8회) 기준 월 비용이에요. 테니스는 그룹 레슨, 헬스는 PT 8회와 회원권을 더했어요."
   },
   {
    "id": "equipment_cost",
    "name": "장비 구입비",
    "icon": "wallet",
    "unit": "원",
    "better": "low",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "시작할 때 한 번 드는 장비 비용이에요. 테니스는 라켓과 신발, 헬스는 신발과 운동복이에요."
   },
   {
    "id": "session_minutes",
    "name": "1회 수업 시간",
    "icon": "clock",
    "unit": "분",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "수업 한 번의 길이예요. 업체마다 달라요."
   },
   {
    "id": "sessions_per_month",
    "name": "월 수업 횟수",
    "icon": "clock",
    "unit": "회",
    "better": "high",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "주 2회로 맞춘 월 수업 횟수예요. 두 선택지가 같아요."
   }
  ],
  "values": {
   "테니스(그룹 레슨)": {
    "initial_cost": {
     "score": 100,
     "text": "48만원",
     "estimated": false
    },
    "time_required": {
     "score": 0,
     "text": "5시간",
     "estimated": false
    },
    "calorie_per_hour": {
     "score": 100,
     "text": "420kcal",
     "estimated": false
    },
    "group_size": {
     "score": 100,
     "text": "4명",
     "estimated": true
    },
    "one_to_one": {
     "score": 0,
     "text": "불가능",
     "estimated": false
    },
    "weather_free": {
     "score": 0,
     "text": "불가능",
     "estimated": false
    },
    "monthly_cost": {
     "score": 100,
     "text": "25만원/월",
     "estimated": true
    },
    "equipment_cost": {
     "score": 0,
     "text": "23만원",
     "estimated": true
    },
    "session_minutes": {
     "score": 100,
     "text": "60분",
     "estimated": true
    },
    "sessions_per_month": {
     "score": 50,
     "text": "8회",
     "estimated": false
    }
   },
   "헬스(PT)": {
    "initial_cost": {
     "score": 0,
     "text": "69만원",
     "estimated": false
    },
    "time_required": {
     "score": 100,
     "text": "4시간",
     "estimated": false
    },
    "calorie_per_hour": {
     "score": 0,
     "text": "245kcal",
     "estimated": false
    },
    "group_size": {
     "score": 0,
     "text": "2명",
     "estimated": true
    },
    "one_to_one": {
     "score": 100,
     "text": "가능",
     "estimated": false
    },
    "weather_free": {
     "score": 100,
     "text": "가능",
     "estimated": false
    },
    "monthly_cost": {
     "score": 0,
     "text": "64만원/월",
     "estimated": true
    },
    "equipment_cost": {
     "score": 100,
     "text": "5만원",
     "estimated": true
    },
    "session_minutes": {
     "score": 0,
     "text": "50분",
     "estimated": true
    },
    "sessions_per_month": {
     "score": 50,
     "text": "8회",
     "estimated": false
    }
   }
  },
  "info": {
   "테니스(그룹 레슨)": "첫 달 비용: 48만원, 주당 소요 시간: 5시간, 1시간 소모 열량: 420kcal, 함께 운동하는 사람: 4명, 1:1 코칭: 불가능, 날씨와 무관: 불가능, 월 비용: 25만원/월, 장비 구입비: 23만원, 1회 수업 시간: 60분, 월 수업 횟수: 8회",
   "헬스(PT)": "첫 달 비용: 69만원, 주당 소요 시간: 4시간, 1시간 소모 열량: 245kcal, 함께 운동하는 사람: 2명, 1:1 코칭: 가능, 날씨와 무관: 가능, 월 비용: 64만원/월, 장비 구입비: 5만원, 1회 수업 시간: 50분, 월 수업 횟수: 8회"
  },
  "analysis": {
   "ranking": [
    {
     "name": "테니스(그룹 레슨)",
     "score": 60
    },
    {
     "name": "헬스(PT)",
     "score": 40
    }
   ],
   "summary": "현재 선택한 객관 기준과 기본 중요도에서는 테니스(그룹 레슨)이 총점이 가장 높아요.",
   "explanation": "테니스(그룹 레슨)이 총점 60점으로 가장 높아요. 가장 큰 차이는 '첫 달 비용'이에요(테니스(그룹 레슨) 48만원, 헬스(PT) 69만원). 반대로 '주당 소요 시간'은 헬스(PT)가 더 유리해요. 추가 기준을 선택하거나 중요도를 바꾸면 순위가 달라질 수 있어요. 계산값은 비교를 위한 환산값이며 실제 금액이 아니에요.",
   "sensitivity": [
    "'주당 소요 시간' 비중을 20%에서 33.3%로 높이면 두 선택지가 공동 1위가 돼요.",
    "'날씨와 무관' 비중을 20%에서 33.3%로 높이면 두 선택지가 공동 1위가 돼요."
   ],
   "whatIf": [
    {
     "label": "'첫 달 비용'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "initial_cost",
     "multiplier": 2,
     "winner": "테니스(그룹 레슨)",
     "scores": [
      {
       "name": "테니스(그룹 레슨)",
       "score": 67
      },
      {
       "name": "헬스(PT)",
       "score": 33
      }
     ]
    },
    {
     "label": "'주당 소요 시간'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "time_required",
     "multiplier": 2,
     "winner": "테니스(그룹 레슨)",
     "scores": [
      {
       "name": "테니스(그룹 레슨)",
       "score": 50
      },
      {
       "name": "헬스(PT)",
       "score": 50
      }
     ]
    },
    {
     "label": "'1시간 소모 열량'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "calorie_per_hour",
     "multiplier": 2,
     "winner": "테니스(그룹 레슨)",
     "scores": [
      {
       "name": "테니스(그룹 레슨)",
       "score": 67
      },
      {
       "name": "헬스(PT)",
       "score": 33
      }
     ]
    },
    {
     "label": "'함께 운동하는 사람'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "group_size",
     "multiplier": 2,
     "winner": "테니스(그룹 레슨)",
     "scores": [
      {
       "name": "테니스(그룹 레슨)",
       "score": 67
      },
      {
       "name": "헬스(PT)",
       "score": 33
      }
     ]
    },
    {
     "label": "'날씨와 무관'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "weather_free",
     "multiplier": 2,
     "winner": "테니스(그룹 레슨)",
     "scores": [
      {
       "name": "테니스(그룹 레슨)",
       "score": 50
      },
      {
       "name": "헬스(PT)",
       "score": 50
      }
     ]
    }
   ]
  },
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
  ],
  "notes": [
   "서울에 살고 주 2회, 월 8회 운동하는 경우를 기준으로 해요. 테니스는 그룹 레슨, 헬스는 PT 8회와 월 회원권을 더했어요. 열량은 체중 70kg 기준이에요.",
   "가격과 시간은 업체마다 달라요. 레슨비, PT 가격, 장비 비용은 시연용 추정값이에요. MET 값은 2011 신체활동 편람 값이고 실제 소모량은 사람마다 달라요.",
   "2026년 10월 기준"
  ],
  "sources": [
   {
    "label": "신체활동 편람(Compendium of Physical Activities) 2011 MET 값",
    "url": "https://www.fitcalcs.app/charts/met-values-chart",
    "asOf": "2011",
    "note": "테니스 복식 6.0, 웨이트 일반 3.5"
   },
   {
    "label": "PT 가격 커뮤니티 정리",
    "url": "https://geniet.co.kr/community/workout_info/120557704",
    "asOf": "2025~2026",
    "note": "서울 PT 1회 7만~8만원 수준, 신뢰도 낮음"
   },
   {
    "label": "나머지 값",
    "url": "",
    "asOf": "2026-10-05",
    "note": "테니스 레슨비, 회원권, 장비 비용은 근거 범위를 참고한 시연용 추정값이에요."
   }
  ]
 },
 {
  "id": "weekend_activity",
  "title": "주말 활동 선택",
  "topic": "주말 활동 선택",
  "category": "leisure",
  "options": [
   "영화",
   "한강 피크닉"
  ],
  "criteria": [
   {
    "id": "initial_cost",
    "name": "1인 비용",
    "icon": "wallet",
    "unit": "원",
    "better": "low",
    "group": "common",
    "selected": true,
    "importance": 100,
    "help": "영화는 주말 관람료와 팝콘·음료 콤보, 피크닉은 간식과 음료 비용이에요. 혼자 쓰는 금액으로 잡았어요."
   },
   {
    "id": "time_required",
    "name": "소요 시간",
    "icon": "clock",
    "unit": "시간",
    "better": "low",
    "group": "common",
    "selected": true,
    "importance": 100,
    "help": "이동 시간을 포함해 하루 중 쓰는 시간이에요."
   },
   {
    "id": "weather_free",
    "name": "날씨와 무관",
    "icon": "sun",
    "unit": "가능 여부",
    "better": "high",
    "group": "main",
    "selected": true,
    "importance": 100,
    "help": "비나 더위, 추위와 상관없이 즐길 수 있는지 봐요."
   },
   {
    "id": "conversation",
    "name": "대화 가능",
    "icon": "users",
    "unit": "가능 여부",
    "better": "high",
    "group": "main",
    "selected": true,
    "importance": 100,
    "help": "활동하는 동안 함께한 사람과 자유롭게 이야기할 수 있는지 봐요."
   },
   {
    "id": "reservation_needed",
    "name": "사전 예매",
    "icon": "doc",
    "unit": "필요 여부",
    "better": "low",
    "group": "main",
    "selected": false,
    "importance": 0,
    "help": "주말 인기 시간대에 미리 예매해야 하는지 봐요. 필요하지 않을수록 편하다고 단순하게 봤어요."
   },
   {
    "id": "outdoor_time",
    "name": "야외 활동 시간",
    "icon": "clock",
    "unit": "시간",
    "better": "high",
    "group": "main",
    "selected": true,
    "importance": 100,
    "help": "이동 시간을 포함해 바깥에서 보내는 시간이에요. 많을수록 좋다고 단순하게 본 기준이에요."
   },
   {
    "id": "prep_items",
    "name": "챙길 준비물",
    "icon": "doc",
    "unit": "개",
    "better": "low",
    "group": "more",
    "selected": false,
    "importance": 0,
    "help": "미리 챙겨 가야 하는 물건 수예요. 피크닉은 돗자리, 간식, 음료, 쓰레기봉투예요."
   }
  ],
  "values": {
   "영화": {
    "initial_cost": {
     "score": 0,
     "text": "2.6만원",
     "estimated": false
    },
    "time_required": {
     "score": 100,
     "text": "3시간",
     "estimated": false
    },
    "weather_free": {
     "score": 100,
     "text": "가능",
     "estimated": false
    },
    "conversation": {
     "score": 0,
     "text": "불가능",
     "estimated": false
    },
    "reservation_needed": {
     "score": 0,
     "text": "필요",
     "estimated": true
    },
    "outdoor_time": {
     "score": 0,
     "text": "0.5시간",
     "estimated": true
    },
    "prep_items": {
     "score": 100,
     "text": "0개",
     "estimated": true
    }
   },
   "한강 피크닉": {
    "initial_cost": {
     "score": 100,
     "text": "1.8만원",
     "estimated": false
    },
    "time_required": {
     "score": 0,
     "text": "4시간",
     "estimated": false
    },
    "weather_free": {
     "score": 0,
     "text": "불가능",
     "estimated": false
    },
    "conversation": {
     "score": 100,
     "text": "가능",
     "estimated": false
    },
    "reservation_needed": {
     "score": 100,
     "text": "불필요",
     "estimated": true
    },
    "outdoor_time": {
     "score": 100,
     "text": "3시간",
     "estimated": true
    },
    "prep_items": {
     "score": 0,
     "text": "4개",
     "estimated": true
    }
   }
  },
  "info": {
   "영화": "1인 비용: 2.6만원, 소요 시간: 3시간, 날씨와 무관: 가능, 대화 가능: 불가능, 사전 예매: 필요, 야외 활동 시간: 0.5시간, 챙길 준비물: 0개",
   "한강 피크닉": "1인 비용: 1.8만원, 소요 시간: 4시간, 날씨와 무관: 불가능, 대화 가능: 가능, 사전 예매: 불필요, 야외 활동 시간: 3시간, 챙길 준비물: 4개"
  },
  "analysis": {
   "ranking": [
    {
     "name": "한강 피크닉",
     "score": 60
    },
    {
     "name": "영화",
     "score": 40
    }
   ],
   "summary": "현재 선택한 객관 기준과 기본 중요도에서는 한강 피크닉이 총점이 가장 높아요.",
   "explanation": "한강 피크닉이 총점 60점으로 가장 높아요. 가장 큰 차이는 '1인 비용'이에요(한강 피크닉 1.8만원, 영화 2.6만원). 반대로 '소요 시간'은 영화가 더 유리해요. 추가 기준을 선택하거나 중요도를 바꾸면 순위가 달라질 수 있어요. 계산값은 비교를 위한 환산값이며 실제 금액이 아니에요.",
   "sensitivity": [
    "'소요 시간' 비중을 20%에서 33.3%로 높이면 두 선택지가 공동 1위가 돼요.",
    "'날씨와 무관' 비중을 20%에서 33.3%로 높이면 두 선택지가 공동 1위가 돼요."
   ],
   "whatIf": [
    {
     "label": "'1인 비용'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "initial_cost",
     "multiplier": 2,
     "winner": "한강 피크닉",
     "scores": [
      {
       "name": "한강 피크닉",
       "score": 67
      },
      {
       "name": "영화",
       "score": 33
      }
     ]
    },
    {
     "label": "'소요 시간'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "time_required",
     "multiplier": 2,
     "winner": "영화",
     "scores": [
      {
       "name": "영화",
       "score": 50
      },
      {
       "name": "한강 피크닉",
       "score": 50
      }
     ]
    },
    {
     "label": "'날씨와 무관'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "weather_free",
     "multiplier": 2,
     "winner": "영화",
     "scores": [
      {
       "name": "영화",
       "score": 50
      },
      {
       "name": "한강 피크닉",
       "score": 50
      }
     ]
    },
    {
     "label": "'대화 가능'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "conversation",
     "multiplier": 2,
     "winner": "한강 피크닉",
     "scores": [
      {
       "name": "한강 피크닉",
       "score": 67
      },
      {
       "name": "영화",
       "score": 33
      }
     ]
    },
    {
     "label": "'야외 활동 시간'을 지금보다 두 배 중요하게 본다면?",
     "criterion": "outdoor_time",
     "multiplier": 2,
     "winner": "한강 피크닉",
     "scores": [
      {
       "name": "한강 피크닉",
       "score": 67
      },
      {
       "name": "영화",
       "score": 33
      }
     ]
    }
   ]
  },
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
  ],
  "notes": [
   "서울에 살고 주말 하루를 보내는 경우를 기준으로 해요. 영화는 주말 일반 2D 관람료 1만 5,000원과 팝콘·음료 콤보를 더했어요. 피크닉은 돗자리 이용과 간식·음료 구입을 가정해요.",
   "영화 요금은 2022년 인상 이후 값을 쓰고 2026년 개정 여부는 확인하지 못했어요. 콤보 가격과 피크닉 지출은 시연용 추정값이에요. 한강 그늘막(텐트)은 지정 구역에서만 쓸 수 있어요.",
   "2026년 10월 기준"
  ],
  "sources": [
   {
    "label": "이데일리, 영화관 관람료 인상 보도",
    "url": "https://edaily.co.kr/News/Read?mediaCodeNo=258&newsId=01364486632364016",
    "asOf": "2022-07",
    "note": "메가박스 주말 일반 2D 1만 5,000원"
   },
   {
    "label": "한강공원 그늘막(텐트) 운영 공지",
    "url": "https://hangang.seoul.go.kr/www/bbsPost/17/632/detail.do?mid=604",
    "asOf": "2026-03~11",
    "note": "지정 구역에서만 가능, 돗자리는 상시 가능"
   },
   {
    "label": "나머지 값",
    "url": "",
    "asOf": "2026-10-05",
    "note": "콤보 가격, 피크닉 지출, 준비물 수는 시연용 추정값이에요."
   }
  ]
 }
];
Pickwise.data.datasetNext = {
 "housing": [
  "거주방식 선택",
  "이사 방식 선택",
  "가구 구매 방식 선택",
  "공동생활 규칙 정하기"
 ],
 "shopping": [
  "노트북 가방 선택",
  "외장 모니터 선택",
  "보증 연장 선택",
  "이어폰 케이스 선택",
  "충전기 선택"
 ],
 "leisure": [
  "숙소 종류 선택",
  "교통수단 선택",
  "여행 일정 정하기",
  "볼 영화 선택",
  "피크닉 장소 선택",
  "함께할 사람 정하기"
 ],
 "finance": [
  "가입할 은행 선택",
  "월 납입 금액 정하기",
  "청년 우대 상품 알아보기"
 ],
 "selfdev": [
  "운동 시간대 정하기",
  "운동 장소 선택",
  "운동 장비 구매"
 ]
};
