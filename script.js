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
  const code = char.charCodeAt(0);
  const blocks = [];
  let remaining = code;

  // 7bitずつ下位から上位に分割
  while (remaining > 0) {
    blocks.push(remaining & 0x7f); // 7bitマスク
    remaining >>= 7;
  }
  if (blocks.length === 0) blocks.push(0);

  // 各ブロックをゴリラ語(ウホゴリラッ🦍)に変換
  const encodedBlocks = blocks.map((block) => {
    let res = "";
    for (const bit of [64, 32, 16, 8, 4, 2, 1]) {
      if (block & bit) {
        res += gorillaMap[bit];
      }
    }
    return res;
  });

  // 「下位→上位」の順にカンマ区切りで返す
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
  // 下位→上位なので上位は左シフト
  for (let i = blocks.length - 1; i >= 0; i--) {
    code <<= 7;
    code += decodeGorillaBlock(blocks[i]);
  }
  return String.fromCharCode(code);
}

// 入力された日本語をゴリラ語に変換（連結はカンマで区切る）
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

// ゴリラ語（カンマ区切りの塊がスペース区切りで複数）を日本語に戻す
function convertBack() {
  const input = document.getElementById("input").value.trim();
  const parts = input.split(/\s+/);
  const output = [];

  for (const part of parts) {
    if (!part) continue;
    // 空白はそのまま
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
