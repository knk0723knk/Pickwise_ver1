/* "예시로 체험하기" 데이터 (담당: 조원2)
   - 화면 1의 예시 버튼을 누르면 이 내용이 Pickwise.state 에 채워진다.
   - 총 여행 비용·이동 시간은 데이터셋 "국내 여행지 선택"의 공통 기준(주제가 여행이라 이 시나리오와 연결됨), 날씨·볼거리·음식은 설명글 점수용 기준(data/keywords.js)
   - 설명 문장은 일반적으로 알려진 내용만 적는다.
   - 데이터팀 체험 시나리오(data/samples.js)와 달리, 이 예시는 "설명글을 쓰면 점수가 자동으로 나오는" 기능을 보여주는 용도다.
   - 중요도는 0~100 */
Pickwise.data.example = {
  "topic": "그리스 vs 이집트, 이번 여름휴가 어디로 갈까?",
  "category": "leisure",
  "criteriaFor": "",
  "options": ["그리스", "이집트"],
  "criteria": [
    { "id": "initial_cost", "name": "총 여행 비용", "icon": "wallet", "custom": false },
    { "id": "weather",   "name": "날씨",        "icon": "sun",      "custom": false },
    { "id": "sights",    "name": "볼거리·즐길거리", "icon": "camera",   "custom": false },
    { "id": "food",      "name": "음식",        "icon": "utensils", "custom": false },
    { "id": "time_required", "name": "이동 시간", "icon": "clock", "custom": false }
  ],
  "weights": { "initial_cost": 100, "weather": 80, "sights": 70, "food": 50, "time_required": 30 },
  "info": {
    "그리스": "산토리니와 아테네 유적이 유명하고, 여름 날씨가 맑고 좋다. 다만 성수기라 물가와 숙소비가 비싼 편이다. 해산물과 지중해 음식이 맛있다.",
    "이집트": "피라미드와 고대 유적 등 볼거리가 풍부하고 물가가 저렴한 편이다. 여름에는 매우 덥고, 도시 간 이동 시간이 긴 편이다."
  },
  "ratings": {},
  "manual": {},
  "attachments": [],
  "decisionId": "",
  "parentTopic": ""
};
