const mapping = {
  "ウ": 1,
  "ホ": 2,
  "ゴ": 4,
  "リ": 8,
  "ラ": 16,
  "ッ": 32,
  "🦍": 64
};

const hiraList = [
  "あ","い","う","え","お",
  "か","き","く","け","こ",
  "さ","し","す","せ","そ",
  "た","ち","つ","て","と",
  "な","に","ぬ","ね","の",
  "は","ひ","ふ","へ","ほ",
  "ま","み","む","め","も",
  "や","ゆ","よ",
  "ら","り","る","れ","ろ",
  "わ","を","ん",
  "が","ぎ","ぐ","げ","ご",
  "ざ","じ","ず","ぜ","ぞ",
  "だ","ぢ","づ","で","ど",
  "ば","び","ぶ","べ","ぼ",
  "ぱ","ぴ","ぷ","ぺ","ぽ",
  "ゃ","ゅ","ょ",
  "ぁ","ぃ","ぅ","ぇ","ぉ",
  "ゎ"
];

// カタカナ → ひらがな変換
function kataToHira(str) {
  return str.replace(/[\u30A1-\u30F6]/g, ch =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
}

// 数値→ゴリラ記号
function numberToCode(n) {
  let result = "";
  const values = [64, 32, 16, 8, 4, 2, 1];
  const symbols = ["🦍", "ッ", "ラ", "リ", "ゴ", "ホ", "ウ"];
  for (let i = 0; i < values.length; i++) {
    if (n >= values[i]) {
      result += symbols[i];
      n -= values[i];
    }
  }
  return result;
}

// ゴリラ記号→数値
function codeToNumber(code) {
  let sum = 0;
  for (let char of code) {
    if (mapping[char]) {
      sum += mapping[char];
    } else {
      return -1; // 不正な文字
    }
  }
  return sum;
}

// ひらがな or カタカナ → ゴリラ語（カンマ区切り）
function convertToGorilla() {
  let input = document.getElementById("input").value.trim();
  if (!input) {
    document.getElementById("output").textContent = "ひらがな or カタカナを入力してください";
    return;
  }
  
  input = kataToHira(input); // カタカナをひらがなに変換
  const chars = [...input];
  const codes = chars.map(char => {
    const index = hiraList.indexOf(char);
    if (index === -1) return "[?]";
    return numberToCode(index + 1);
  });
  document.getElementById("output").textContent = codes.join(",");
}

// ゴリラ語 → ひらがな（カンマ区切り）
function convertBack() {
  const input = document.getElementById("input").value.trim();
  if (!input) {
    document.getElementById("output").textContent = "ゴリラ語を入力してください";
    return;
  }
  const parts = input.split(",");
  const decoded = parts.map(code => {
    const value = codeToNumber(code);
    if (value >= 1 && value <= hiraList.length) {
      return hiraList[value - 1];
    } else {
      return "[?]";
    }
  });
  document.getElementById("output").textContent = decoded.join("");
}
