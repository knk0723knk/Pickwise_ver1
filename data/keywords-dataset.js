/* 데이터셋 기준의 점수 단어 (담당: 조원5)
   원본: 데이터팀 PICKWISE_dataset v2.4.0 (기준일 2026-10-05) · tools/convert-samples.js 로 자동 생성 — 직접 고치지 말고 원본 수정 후 다시 변환
   - 단어는 기준의 단위(원·시간·kg·가능 여부 등)와 좋은 방향(낮을수록/높을수록)으로 자동 생성
   - 사용 방법은 data/keywords.js 설명과 같음. 같은 id가 있으면 이 파일이 우선 */
Pickwise.data.keywordsDataset = {
 "initial_cost": {
  "aliases": [
   "초기 비용",
   "초기",
   "비용",
   "가격",
   "값",
   "돈",
   "보증금",
   "수강료",
   "회비",
   "경비",
   "물가",
   "예산",
   "처음",
   "숙소비",
   "항공권",
   "입장료",
   "티켓",
   "요금",
   "월세",
   "전세"
  ],
  "pos": [
   "저렴",
   "싸게",
   "가성비",
   "합리적",
   "할인",
   "적게 들",
   "부담이 적",
   "무료",
   "적어",
   "적고",
   "싼 편"
  ],
  "neg": [
   "비싸",
   "비싼",
   "부담",
   "많이 들",
   "고가"
  ],
  "needsAlias": true
 },
 "usable_duration": {
  "aliases": [
   "사용 기간",
   "기간",
   "배터리",
   "수명",
   "오래",
   "계약"
  ],
  "pos": [
   "오래",
   "넉넉",
   "길"
  ],
  "neg": [
   "짧",
   "금방 닳",
   "부족"
  ],
  "needsAlias": true
 },
 "time_required": {
  "aliases": [
   "소요 시간",
   "소요",
   "시간",
   "걸리",
   "이동",
   "기간",
   "묶이"
  ],
  "pos": [
   "짧",
   "금방",
   "빨리",
   "가깝",
   "바로"
  ],
  "neg": [
   "오래 걸",
   "시간이 많이",
   "멀",
   "오래",
   "길어",
   "길고",
   "긴 편",
   "많아",
   "많고"
  ],
  "needsAlias": true
 },
 "support_cap": {
  "aliases": [
   "지원한도"
  ],
  "pos": [
   "많이 주",
   "넉넉",
   "높",
   "많"
  ],
  "neg": [
   "적게 주",
   "부족",
   "낮",
   "적"
  ],
  "needsAlias": true
 },
 "maximum_tenure": {
  "aliases": [
   "거주기간"
  ],
  "pos": [
   "오래",
   "넉넉",
   "길"
  ],
  "neg": [
   "짧",
   "금방 닳",
   "부족"
  ],
  "needsAlias": true
 },
 "scenario_monthly_rent": {
  "aliases": [
   "월 임대료",
   "임대료"
  ],
  "pos": [
   "저렴",
   "싸게",
   "가성비",
   "합리적",
   "할인",
   "적게 들",
   "부담이 적",
   "무료",
   "적어",
   "적고",
   "싼 편"
  ],
  "neg": [
   "비싸",
   "비싼",
   "부담",
   "많이 들",
   "고가"
  ],
  "needsAlias": true
 },
 "deposit_ratio": {
  "aliases": [
   "보증금 비율",
   "비율"
  ],
  "pos": [
   "낮",
   "저렴"
  ],
  "neg": [
   "높",
   "비싸"
  ],
  "needsAlias": true
 },
 "maximum_renewals": {
  "aliases": [
   "재계약"
  ],
  "pos": [
   "많",
   "넉넉",
   "높",
   "빠르",
   "선명"
  ],
  "neg": [
   "적",
   "부족",
   "낮",
   "느리"
  ],
  "needsAlias": true
 },
 "renewal_months": {
  "aliases": [
   "연장기간"
  ],
  "pos": [
   "오래",
   "넉넉",
   "길"
  ],
  "neg": [
   "짧",
   "금방 닳",
   "부족"
  ],
  "needsAlias": true
 },
 "published_min_rate": {
  "aliases": [
   "최저금리"
  ],
  "pos": [
   "낮",
   "저렴"
  ],
  "neg": [
   "높",
   "비싸"
  ],
  "needsAlias": true
 },
 "published_max_rate": {
  "aliases": [
   "최고금리"
  ],
  "pos": [
   "낮",
   "저렴"
  ],
  "neg": [
   "높",
   "비싸"
  ],
  "needsAlias": true
 },
 "net_funded_principal": {
  "aliases": [
   "지원원금"
  ],
  "pos": [
   "많이 주",
   "넉넉",
   "높",
   "많"
  ],
  "neg": [
   "적게 주",
   "부족",
   "낮",
   "적"
  ],
  "needsAlias": true
 },
 "scenario_first_term_rent": {
  "aliases": [
   "총 임대료",
   "임대료"
  ],
  "pos": [
   "저렴",
   "싸게",
   "가성비",
   "합리적",
   "할인",
   "적게 들",
   "부담이 적",
   "무료",
   "적어",
   "적고",
   "싼 편"
  ],
  "neg": [
   "비싸",
   "비싼",
   "부담",
   "많이 들",
   "고가"
  ],
  "needsAlias": true
 },
 "per_person_support_cap": {
  "aliases": [
   "개인 지원한도",
   "지원한도"
  ],
  "pos": [
   "많이 주",
   "넉넉",
   "높",
   "많"
  ],
  "neg": [
   "적게 주",
   "부족",
   "낮",
   "적"
  ],
  "needsAlias": true
 },
 "co_resident_count": {
  "aliases": [
   "동거인 수",
   "동거인",
   "같이 사는",
   "룸메이트"
  ],
  "pos": [
   "적",
   "간단",
   "필요 없",
   "없어",
   "없고",
   "혼자"
  ],
  "neg": [
   "많",
   "번거롭",
   "복잡"
  ],
  "needsAlias": true
 },
 "household_support_cap": {
  "aliases": [
   "전체 지원한도",
   "지원한도"
  ],
  "pos": [
   "많이 주",
   "넉넉",
   "높",
   "많"
  ],
  "neg": [
   "적게 주",
   "부족",
   "낮",
   "적"
  ],
  "needsAlias": true
 },
 "household_base_deposit": {
  "aliases": [
   "전체 보증금"
  ],
  "pos": [
   "저렴",
   "싸게",
   "가성비",
   "합리적",
   "할인",
   "적게 들",
   "부담이 적",
   "무료",
   "적어",
   "적고",
   "싼 편"
  ],
  "neg": [
   "비싸",
   "비싼",
   "부담",
   "많이 들",
   "고가"
  ],
  "needsAlias": true
 },
 "per_person_net_principal": {
  "aliases": [
   "개인 지원원금",
   "지원원금"
  ],
  "pos": [
   "많이 주",
   "넉넉",
   "높",
   "많"
  ],
  "neg": [
   "적게 주",
   "부족",
   "낮",
   "적"
  ],
  "needsAlias": true
 },
 "weight": {
  "aliases": [
   "무게"
  ],
  "pos": [
   "가볍",
   "가벼"
  ],
  "neg": [
   "무겁",
   "무거"
  ],
  "needsAlias": true
 },
 "screen_diagonal": {
  "aliases": [
   "화면 크기",
   "화면",
   "크기",
   "디스플레이",
   "인치"
  ],
  "pos": [
   "크",
   "넓",
   "시원"
  ],
  "neg": [
   "작",
   "좁"
  ],
  "needsAlias": true
 },
 "storage_capacity": {
  "aliases": [
   "저장공간"
  ],
  "pos": [
   "많",
   "넉넉",
   "높",
   "빠르",
   "선명"
  ],
  "neg": [
   "적",
   "부족",
   "낮",
   "느리"
  ],
  "needsAlias": true
 },
 "memory_capacity": {
  "aliases": [
   "메모리"
  ],
  "pos": [
   "많",
   "넉넉",
   "높",
   "빠르",
   "선명"
  ],
  "neg": [
   "적",
   "부족",
   "낮",
   "느리"
  ],
  "needsAlias": true
 },
 "thunderbolt_port_count": {
  "aliases": [
   "연결 포트",
   "연결",
   "포트"
  ],
  "pos": [
   "많",
   "넉넉",
   "높",
   "빠르",
   "선명"
  ],
  "neg": [
   "적",
   "부족",
   "낮",
   "느리"
  ],
  "needsAlias": true
 },
 "battery_capacity": {
  "aliases": [
   "배터리 용량",
   "배터리",
   "용량"
  ],
  "pos": [
   "많",
   "넉넉",
   "높",
   "빠르",
   "선명"
  ],
  "neg": [
   "적",
   "부족",
   "낮",
   "느리"
  ],
  "needsAlias": true
 },
 "gpu_core_count": {
  "aliases": [
   "그래픽 코어",
   "그래픽",
   "코어"
  ],
  "pos": [
   "많",
   "넉넉",
   "높",
   "빠르",
   "선명"
  ],
  "neg": [
   "적",
   "부족",
   "낮",
   "느리"
  ],
  "needsAlias": true
 },
 "cpu_core_count": {
  "aliases": [
   "CPU 코어",
   "CPU",
   "코어"
  ],
  "pos": [
   "많",
   "넉넉",
   "높",
   "빠르",
   "선명"
  ],
  "neg": [
   "적",
   "부족",
   "낮",
   "느리"
  ],
  "needsAlias": true
 },
 "display_pixel_count": {
  "aliases": [
   "해상도"
  ],
  "pos": [
   "많",
   "넉넉",
   "높",
   "빠르",
   "선명"
  ],
  "neg": [
   "적",
   "부족",
   "낮",
   "느리"
  ],
  "needsAlias": true
 },
 "wireless_web_duration": {
  "aliases": [
   "웹 사용시간",
   "사용시간"
  ],
  "pos": [
   "오래",
   "넉넉",
   "길"
  ],
  "neg": [
   "짧",
   "금방 닳",
   "부족"
  ],
  "needsAlias": true
 },
 "anc_supported": {
  "aliases": [
   "노이즈 캔슬링",
   "노이즈",
   "캔슬링",
   "노캔",
   "소음 차단"
  ],
  "pos": [
   "가능",
   "할 수 있",
   "돼",
   "되요",
   "지원",
   "있어"
  ],
  "neg": [
   "불가",
   "안 돼",
   "못 해",
   "미지원"
  ],
  "needsAlias": true
 },
 "transparency_supported": {
  "aliases": [
   "주변음 듣기",
   "주변음",
   "듣기"
  ],
  "pos": [
   "가능",
   "할 수 있",
   "돼",
   "되요",
   "지원",
   "있어"
  ],
  "neg": [
   "불가",
   "안 돼",
   "못 해",
   "미지원"
  ],
  "needsAlias": true
 },
 "wireless_charging_supported": {
  "aliases": [
   "무선충전"
  ],
  "pos": [
   "가능",
   "할 수 있",
   "돼",
   "되요",
   "지원",
   "있어"
  ],
  "neg": [
   "불가",
   "안 돼",
   "못 해",
   "미지원"
  ],
  "needsAlias": true
 },
 "case_playback_duration": {
  "aliases": [
   "총 재생시간",
   "재생시간"
  ],
  "pos": [
   "오래",
   "넉넉",
   "길"
  ],
  "neg": [
   "짧",
   "금방 닳",
   "부족"
  ],
  "needsAlias": true
 },
 "case_weight": {
  "aliases": [
   "케이스 무게",
   "케이스"
  ],
  "pos": [
   "가볍",
   "가벼"
  ],
  "neg": [
   "무겁",
   "무거"
  ],
  "needsAlias": true
 },
 "total_carry_weight": {
  "aliases": [
   "전체 무게"
  ],
  "pos": [
   "가볍",
   "가벼"
  ],
  "neg": [
   "무겁",
   "무거"
  ],
  "needsAlias": true
 },
 "anc_off_duration": {
  "aliases": [
   "일반 재생시간",
   "재생시간"
  ],
  "pos": [
   "오래",
   "넉넉",
   "길"
  ],
  "neg": [
   "짧",
   "금방 닳",
   "부족"
  ],
  "needsAlias": true
 },
 "anc_off_case_duration": {
  "aliases": [
   "일반 총시간",
   "총시간"
  ],
  "pos": [
   "오래",
   "넉넉",
   "길"
  ],
  "neg": [
   "짧",
   "금방 닳",
   "부족"
  ],
  "needsAlias": true
 },
 "case_envelope_volume": {
  "aliases": [
   "케이스 크기",
   "케이스",
   "크기"
  ],
  "pos": [
   "작",
   "콤팩트",
   "휴대가 편"
  ],
  "neg": [
   "크",
   "부피가"
  ],
  "needsAlias": true
 },
 "transport_cost": {
  "aliases": [
   "왕복 교통비",
   "왕복",
   "교통비"
  ],
  "pos": [
   "저렴",
   "싸게",
   "가성비",
   "합리적",
   "할인",
   "적게 들",
   "부담이 적",
   "무료",
   "적어",
   "적고",
   "싼 편"
  ],
  "neg": [
   "비싸",
   "비싼",
   "부담",
   "많이 들",
   "고가"
  ],
  "needsAlias": true
 },
 "lodging_cost": {
  "aliases": [
   "숙박비"
  ],
  "pos": [
   "저렴",
   "싸게",
   "가성비",
   "합리적",
   "할인",
   "적게 들",
   "부담이 적",
   "무료",
   "적어",
   "적고",
   "싼 편"
  ],
  "neg": [
   "비싸",
   "비싼",
   "부담",
   "많이 들",
   "고가"
  ],
  "needsAlias": true
 },
 "meal_price": {
  "aliases": [
   "대표 음식 1인분",
   "음식",
   "1인분"
  ],
  "pos": [
   "저렴",
   "싸게",
   "가성비",
   "합리적",
   "할인",
   "적게 들",
   "부담이 적",
   "무료",
   "적어",
   "적고",
   "싼 편"
  ],
  "neg": [
   "비싸",
   "비싼",
   "부담",
   "많이 들",
   "고가"
  ],
  "needsAlias": true
 },
 "local_transport_cost": {
  "aliases": [
   "현지 이동비",
   "현지",
   "이동비"
  ],
  "pos": [
   "저렴",
   "싸게",
   "가성비",
   "합리적",
   "할인",
   "적게 들",
   "부담이 적",
   "무료",
   "적어",
   "적고",
   "싼 편"
  ],
  "neg": [
   "비싸",
   "비싼",
   "부담",
   "많이 들",
   "고가"
  ],
  "needsAlias": true
 },
 "transit_only": {
  "aliases": [
   "대중교통 이동",
   "대중교통",
   "이동"
  ],
  "pos": [
   "가능",
   "할 수 있",
   "돼",
   "되요",
   "지원",
   "있어"
  ],
  "neg": [
   "불가",
   "안 돼",
   "못 해",
   "미지원"
  ],
  "needsAlias": true
 },
 "oct_temperature": {
  "aliases": [
   "10월 평균 기온",
   "10월",
   "평균",
   "기온"
  ],
  "pos": [
   "많",
   "넉넉",
   "높",
   "빠르",
   "선명"
  ],
  "neg": [
   "적",
   "부족",
   "낮",
   "느리"
  ],
  "needsAlias": true
 },
 "weather_free": {
  "aliases": [
   "날씨와 무관",
   "날씨",
   "실내",
   "비 와도",
   "우천"
  ],
  "pos": [
   "가능",
   "할 수 있",
   "돼",
   "되요",
   "지원",
   "있어"
  ],
  "neg": [
   "불가",
   "안 돼",
   "못 해",
   "미지원"
  ],
  "needsAlias": true
 },
 "conversation": {
  "aliases": [
   "대화 가능",
   "대화",
   "얘기",
   "이야기"
  ],
  "pos": [
   "가능",
   "할 수 있",
   "돼",
   "되요",
   "지원",
   "있어"
  ],
  "neg": [
   "불가",
   "안 돼",
   "못 해",
   "미지원"
  ],
  "needsAlias": true
 },
 "reservation_needed": {
  "aliases": [
   "사전 예매",
   "사전",
   "예매"
  ],
  "pos": [
   "필요 없",
   "바로",
   "안 해도"
  ],
  "neg": [
   "필요",
   "해야",
   "예매"
  ],
  "needsAlias": true
 },
 "outdoor_time": {
  "aliases": [
   "야외 활동 시간",
   "야외",
   "활동"
  ],
  "pos": [
   "오래",
   "넉넉",
   "길"
  ],
  "neg": [
   "짧",
   "금방 닳",
   "부족"
  ],
  "needsAlias": true
 },
 "prep_items": {
  "aliases": [
   "챙길 준비물",
   "챙길",
   "준비물"
  ],
  "pos": [
   "적",
   "간단",
   "필요 없",
   "없어",
   "없고",
   "혼자"
  ],
  "neg": [
   "많",
   "번거롭",
   "복잡"
  ],
  "needsAlias": true
 },
 "interest_rate": {
  "aliases": [
   "표시 금리",
   "금리",
   "이자율"
  ],
  "pos": [
   "높",
   "많이 주",
   "좋"
  ],
  "neg": [
   "낮",
   "적"
  ],
  "needsAlias": true
 },
 "total_interest": {
  "aliases": [
   "만기 이자",
   "만기",
   "이자"
  ],
  "pos": [
   "많이 주",
   "넉넉",
   "높",
   "많"
  ],
  "neg": [
   "적게 주",
   "부족",
   "낮",
   "적"
  ],
  "needsAlias": true
 },
 "auto_saving": {
  "aliases": [
   "매달 자동 납입",
   "매달",
   "자동",
   "납입",
   "자동 납입",
   "자동이체"
  ],
  "pos": [
   "가능",
   "할 수 있",
   "돼",
   "되요",
   "지원",
   "있어"
  ],
  "neg": [
   "불가",
   "안 돼",
   "못 해",
   "미지원"
  ],
  "needsAlias": true
 },
 "early_withdrawal_rate": {
  "aliases": [
   "중도해지 금리",
   "중도해지",
   "해지"
  ],
  "pos": [
   "높",
   "많이 주",
   "좋"
  ],
  "neg": [
   "낮",
   "적"
  ],
  "needsAlias": true
 },
 "after_tax_interest": {
  "aliases": [
   "만기 이자",
   "만기"
  ],
  "pos": [
   "많이 주",
   "넉넉",
   "높",
   "많"
  ],
  "neg": [
   "적게 주",
   "부족",
   "낮",
   "적"
  ],
  "needsAlias": true
 },
 "return_on_principal": {
  "aliases": [
   "납입금 대비 이자율",
   "납입금",
   "대비",
   "이자율"
  ],
  "pos": [
   "높",
   "많이 주",
   "좋"
  ],
  "neg": [
   "낮",
   "적"
  ],
  "needsAlias": true
 },
 "min_deposit": {
  "aliases": [
   "최소 가입 금액",
   "최소",
   "가입",
   "금액"
  ],
  "pos": [
   "저렴",
   "싸게",
   "가성비",
   "합리적",
   "할인",
   "적게 들",
   "부담이 적",
   "무료",
   "적어",
   "적고",
   "싼 편"
  ],
  "neg": [
   "비싸",
   "비싼",
   "부담",
   "많이 들",
   "고가"
  ],
  "needsAlias": true
 },
 "protection_limit": {
  "aliases": [
   "예금자보호 한도",
   "예금자보호"
  ],
  "pos": [
   "많이 주",
   "넉넉",
   "높",
   "많"
  ],
  "neg": [
   "적게 주",
   "부족",
   "낮",
   "적"
  ],
  "needsAlias": true
 },
 "calorie_per_hour": {
  "aliases": [
   "1시간 소모 열량",
   "1시간",
   "소모",
   "열량",
   "칼로리",
   "운동량"
  ],
  "pos": [
   "많",
   "넉넉",
   "높",
   "빠르",
   "선명"
  ],
  "neg": [
   "적",
   "부족",
   "낮",
   "느리"
  ],
  "needsAlias": true
 },
 "group_size": {
  "aliases": [
   "함께 운동하는 사람",
   "함께",
   "운동하는",
   "사람",
   "같이",
   "그룹",
   "인원"
  ],
  "pos": [
   "많",
   "넉넉",
   "높",
   "빠르",
   "선명"
  ],
  "neg": [
   "적",
   "부족",
   "낮",
   "느리"
  ],
  "needsAlias": true
 },
 "one_to_one": {
  "aliases": [
   "1:1 코칭",
   "1:1",
   "코칭"
  ],
  "pos": [
   "가능",
   "할 수 있",
   "돼",
   "되요",
   "지원",
   "있어"
  ],
  "neg": [
   "불가",
   "안 돼",
   "못 해",
   "미지원"
  ],
  "needsAlias": true
 },
 "monthly_cost": {
  "aliases": [
   "월 비용"
  ],
  "pos": [
   "저렴",
   "싸게",
   "가성비",
   "합리적",
   "할인",
   "적게 들",
   "부담이 적",
   "무료",
   "적어",
   "적고",
   "싼 편"
  ],
  "neg": [
   "비싸",
   "비싼",
   "부담",
   "많이 들",
   "고가"
  ],
  "needsAlias": true
 },
 "equipment_cost": {
  "aliases": [
   "장비 구입비",
   "장비",
   "구입비"
  ],
  "pos": [
   "저렴",
   "싸게",
   "가성비",
   "합리적",
   "할인",
   "적게 들",
   "부담이 적",
   "무료",
   "적어",
   "적고",
   "싼 편"
  ],
  "neg": [
   "비싸",
   "비싼",
   "부담",
   "많이 들",
   "고가"
  ],
  "needsAlias": true
 },
 "session_minutes": {
  "aliases": [
   "1회 수업 시간",
   "1회",
   "수업"
  ],
  "pos": [
   "오래",
   "넉넉",
   "길"
  ],
  "neg": [
   "짧",
   "금방 닳",
   "부족"
  ],
  "needsAlias": true
 },
 "sessions_per_month": {
  "aliases": [
   "월 수업 횟수",
   "수업",
   "횟수"
  ],
  "pos": [
   "많",
   "넉넉",
   "높",
   "빠르",
   "선명"
  ],
  "neg": [
   "적",
   "부족",
   "낮",
   "느리"
  ],
  "needsAlias": true
 },
 "scenario_monthly_personal_rent": {
  "aliases": [
   "월 임대료",
   "임대료"
  ],
  "pos": [
   "저렴",
   "싸게",
   "가성비",
   "합리적",
   "할인",
   "적게 들",
   "부담이 적",
   "무료",
   "적어",
   "적고",
   "싼 편"
  ],
  "neg": [
   "비싸",
   "비싼",
   "부담",
   "많이 들",
   "고가"
  ],
  "needsAlias": true
 },
 "personal_deposit_ratio": {
  "aliases": [
   "보증금 비율",
   "비율"
  ],
  "pos": [
   "낮",
   "저렴"
  ],
  "neg": [
   "높",
   "비싸"
  ],
  "needsAlias": true
 },
 "scenario_first_term_personal_rent": {
  "aliases": [
   "총 임대료",
   "임대료"
  ],
  "pos": [
   "저렴",
   "싸게",
   "가성비",
   "합리적",
   "할인",
   "적게 들",
   "부담이 적",
   "무료",
   "적어",
   "적고",
   "싼 편"
  ],
  "neg": [
   "비싸",
   "비싼",
   "부담",
   "많이 들",
   "고가"
  ],
  "needsAlias": true
 },
 "earbud_weight": {
  "aliases": [
   "무게"
  ],
  "pos": [
   "가볍",
   "가벼"
  ],
  "neg": [
   "무겁",
   "무거"
  ],
  "needsAlias": true
 }
};
