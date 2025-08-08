const gorillaMap = {
  1: "ウ",
  2: "ホ",
  4: "ゴ",
  8: "リ",
  16: "ラ",
  32: "ッ",
  64: "🦍"
};

const gorillaMapReverse = Object.fromEntries(
  Object.entries(gorillaMap).map(([k, v]) => [v, Number(k)])
);

// Unicodeのコードポイントを7bitごとに分割し、ビットごとにゴリラ文字に変換
function encodeCharToGorilla(char) {
  const code = char.codePointAt(0);
  const blocks = [];
  let remaining = code;

  while (remaining > 0) {
    blocks.push(remaining & 0x7f); // 7bitマスク
    remaining >>= 7;
  }
  if (blocks.length === 0) blocks.push(0);

  const encodedBlocks = blocks.map((block) => {
    let res = "";
    for (const bit of [64, 32, 16, 8, 4, 2, 1]) {
      if (block & bit) {
        res += gorillaMap[bit];
      }
    }
    return res;
  });

  return encodedBlocks.join(",");
}

// ゴリラ語の塊(例: ウホゴ)を数値に戻す
function decodeGorillaBlock(block) {
  let val = 0;
  for (const ch of block) {
    if (gorillaMapReverse[ch]) {
      val += gorillaMapReverse[ch];
    }
  }
  return val;
}

// ゴリラ語の文字列(カンマ区切り複数塊)をUnicodeコードポイントに復元
function decodeGorillaToChar(gorillaStr) {
  const blocks = gorillaStr.split(",");
  let code = 0;
  for (let i = blocks.length - 1; i >= 0; i--) {
    code <<= 7;
    code += decodeGorillaBlock(blocks[i]);
  }
  return String.fromCodePoint(code);
}

function convert() {
  const input = document.getElementById("input").value.trim();
  const output = [];

  for (const ch of input) {
    if (ch === " " || ch === "\n") {
      output.push(ch);
      continue;
    }
    output.push(encodeCharToGorilla(ch));
  }

  document.getElementById("output").innerText = output.join(" ");
}

function convertBack() {
  const input = document.getElementById("input").value.trim();
  const parts = input.split(/\s+/);
  const output = [];

  for (const part of parts) {
    if (!part) continue;
    if (/^[\s\r\n]+$/.test(part)) {
      output.push(part);
      continue;
    }
    try {
      output.push(decodeGorillaToChar(part));
    } catch {
      output.push("[?]");
    }
  }

  document.getElementById("output").innerText = output.join("");
}

// ---------- 背景ニコニコ風ゴリラ流し ----------

const bg = document.querySelector('.background');

function createRandomGorilla() {
  const g = document.createElement('div');
  g.className = 'gorilla';
  g.textContent = '🦍';

  const size = 20 + Math.random() * 40; // 20~60px
  g.style.fontSize = size + 'px';

  const startX = window.innerWidth + 100;
  const startY = Math.random() * window.innerHeight;

  g.style.left = startX + 'px';
  g.style.top = startY + 'px';

  g.style.opacity = (0.05 + Math.random() * 0.1).toFixed(2);

  // 0.02 ~ 0.1 px/ms
  const speedX = 0.02 + Math.random() * 0.08;
  const speedY = speedX;

  bg.appendChild(g);

  let last = performance.now();

  function animate(time) {
    const dt = time - last;
    last = time;

    let currentX = parseFloat(g.style.left);
    let currentY = parseFloat(g.style.top);

    currentX -= speedX * dt;
    currentY -= speedY * dt;

    g.style.left = currentX + 'px';
    g.style.top = currentY + 'px';

    if (currentX < -100 || currentY < -100) {
      g.remove();
      return;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  g.addEventListener('click', () => {
    g.textContent = '💥';
    setTimeout(() => g.remove(), 400);
  });
}

setInterval(createRandomGorilla, 50);
