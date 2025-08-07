const mapping = {
  1: "ウ",
  2: "ホ",
  4: "ゴ",
  8: "リ",
  16: "ラ",
  32: "ッ",
  64: "🦍"
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

// ゴリラ語から逆変換用に mappingの逆を作る
const reverseMapping = {};
for (const [key, val] of Object.entries(mapping)) {
  reverseMapping[val] = Number(key);
}

// ひらがな→ゴリラ語変換
function numberToCode(n) {
  let result = "";
  for (let i = 6; i >= 0; i--) {
    let val = 2 ** i;
    if (n >= val) {
      result += mapping[val];
      n -= val;
    }
  }
  return result;
}

function convert() {
  const input = document.getElementById("input").value.trim();
  if (!input) {
    document.getElementById("output").textContent = "ひらがなを入力してください";
    return;
  }
  const words = input.split(" ");
  const results = words.map(word => {
    let chars = [...word];
    let codes = chars.map(char => {
      const index = hiraList.indexOf(char);
      if (index === -1) return "[?]";
      return numberToCode(index + 1);
    });
    return codes.join("");
  });
  document.getElementById("output").textContent = results.join("");
}

// ゴリラ語→ひらがな変換

// まずは入力文字列をゴリラ語文字で分割する関数
function splitGorillaString(str) {
  // ウホゴリラッ🦍の文字で一文字ずつ分割
  const gorillaChars = Object.values(mapping);
  let arr = [];
  let i = 0;
  while (i < str.length) {
    // 絵文字はサロゲートペアなので2文字になることがある
    // ここでは絵文字🦍だけ2文字として扱う
    if (str[i] === "�" || str[i] === "\uD83E") { 
      // 念のため絵文字の先頭文字判定して2文字取得
      arr.push(str.substr(i, 2));
      i += 2;
    } else {
      arr.push(str[i]);
      i += 1;
    }
  }
  return arr.filter(c => gorillaChars.includes(c));
}

function codeToNumber(codeStr) {
  let total = 0;
  for (let c of codeStr) {
    total += reverseMapping[c] || 0;
  }
  return total;
}

function convertBack() {
  const input = document.getElementById("inputBack").value.trim();
  if (!input) {
    document.getElementById("output").textContent = "ゴリラ語を入力してください";
    return;
  }
  // まずゴリラ語文字ごとに分割
  const chars = splitGorillaString(input);
  let hiraChars = [];

  // 1文字のゴリラ語は最大7文字まで（ウホゴリラッ🦍の組み合わせ）
  // なので、分割した文字列を7文字ずつ区切って番号に戻す
  // ただし、ウホゴリラッ🦍が並んでいるだけなので、ここは
  // 入力から文字をグループ化する必要があるが、
  // ここでは入力は正しくウホゴリラッ🦍で表現されていると仮定し
  // ひとつずつ数値を求めて連結するロジックで簡略化。

  // つまり、ウホゴリラッ🦍の組み合わせを1文字ずつ復元したいので
  // 入力を「ウホゴリラッ🦍」の文字単位で分割し、その文字をグループ化して番号計算する

  // 実装：7文字までが一文字なので、最大7文字で番号計算しながら区切る

  let i = 0;
  while (i < chars.length) {
    // 7文字分の組み合わせを試す
    let maxLen = Math.min(7, chars.length - i);
    let found = false;
    for (let len = maxLen; len >= 1; len--) {
      const slice = chars.slice(i, i + len);
      const num = codeToNumber(slice);
      if (num > 0 && num <= hiraList.length) {
        // 成功
        hiraChars.push(hiraList[num -1]);
        i += len;
        found = true;
        break;
      }
    }
    if (!found) {
      // 不明な文字は？に
      hiraChars.push("?");
      i++;
    }
  }

  document.getElementById("output").textContent = hiraChars.join("");
}
