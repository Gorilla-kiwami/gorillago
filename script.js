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
  "ゃ","ゅ","ょ"
];

// ゴリラ記号 → 数値（ビット和）
function codeToNumber(code) {
  let sum = 0;
  for (let char of code) {
    if (mapping[char]) {
      sum += mapping[char];
    }
  }
  return sum;
}

// 数値 → ゴリラ記号（逆変換用）
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

// 入力からゴリラ文字を見つけて変換
function convert() {
  const input = document.getElementById("input").value.trim();

  // スペースで分割（1音ずつ）
  const tokens = input.split(" ");
  const output = tokens.map(token => {
    const value = codeToNumber(token);
    if (value >= 1 && value <= hiraList.length) {
      return hiraList[value - 1];
    } else {
      return "[?]";
    }
  });

  document.getElementById("output").textContent = output.join("");
}
