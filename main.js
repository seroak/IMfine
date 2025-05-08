let data = [
  { id: 0, value: 75 },
  { id: 1, value: 20 },
  { id: 2, value: 80 },
  { id: 3, value: 100 },
  { id: 4, value: 70 },
  { id: 5, value: 50 },
];
const canvas = document.getElementById("dataChart");
const ctx = canvas.getContext("2d");

// 막대 그래프 차트 렌더링 함수
function renderCanvasChart() {
  const canvas = document.getElementById("dataChart");
  const ctx = canvas.getContext("2d");

  const barWidth = 50;
  const barGap = 30;
  const padding = 40;
  const maxHeight = 250;

  // 자동 너비 계산
  const totalBars = data.length;
  const requiredWidth = totalBars * (barWidth + barGap) + padding * 2;
  canvas.width = requiredWidth;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maxVal = Math.max(...data.map((d) => d.value), 1);

  data.forEach((d, i) => {
    const x = padding + i * (barWidth + barGap);
    const height = (d.value / maxVal) * maxHeight;
    const y = canvas.height - height - 30;

    // Bar
    ctx.fillStyle = "#4e79a7";
    ctx.fillRect(x, y, barWidth, height);

    // Value
    ctx.fillStyle = "#000";
    ctx.font = "14px sans-serif";
    ctx.fillText(d.value, x + 3 + barWidth / 4, y - 5);

    // Label (ID)
    ctx.fillText(d.id, x + 7 + barWidth / 4, canvas.height - 10);
  });
}
// 값편집 테이블 렌더링 함수
function renderTable() {
  const tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";
  data.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.id}</td>
      <td><input type="number" value="${item.value}" data-index="${index}" /></td>
      <td><button data-index="${index}" class="delete">삭제</button></td>
    `;
    tbody.appendChild(tr);
  });
}
function updateAll() {
  renderCanvasChart();
  renderTable();
}
updateAll();
