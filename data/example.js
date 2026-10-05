/* "예시로 체험하기" 데이터 (담당: 조원2)
   - 화면 1의 예시 버튼을 누르면 이 내용이 Pickwise.state 에 채워진다.
   - 기준 id·icon은 data/criteria.js (공통 기준 + 여가 분류)와 같아야 한다.
   - 설명 문장은 일반적으로 알려진 내용만 적는다. */
Pickwise.data.example = {
  "topic": "그리스 vs 이집트, 이번 여름휴가 어디로 갈까?",
  "category": "leisure",
  "criteriaFor": "leisure",
  "options": ["그리스", "이집트"],
  "criteria": [
    { "id": "cost",      "name": "비용",        "icon": "wallet",   "custom": false },
    { "id": "weather",   "name": "날씨",        "icon": "sun",      "custom": false },
    { "id": "sights",    "name": "볼거리·즐길거리", "icon": "camera",   "custom": false },
    { "id": "food",      "name": "음식",        "icon": "utensils", "custom": false },
    { "id": "transport", "name": "이동 편의성", "icon": "bus",      "custom": false }
  ],
  "weights": { "cost": 10, "weather": 8, "sights": 7, "food": 5, "transport": 3 },
  "info": {
    "그리스": "산토리니와 아테네 유적이 유명하고, 여름 날씨가 맑고 좋다. 다만 성수기라 물가와 숙소비가 비싼 편이다. 해산물과 지중해 음식이 맛있다.",
    "이집트": "피라미드와 고대 유적 등 볼거리가 풍부하고 물가가 저렴한 편이다. 여름에는 매우 덥고, 도시 간 이동 시간이 긴 편이다."
  },
  "ratings": {},
  "manual": {},
  "attachments": []
};
