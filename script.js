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
  document.getElementById("output").textContent = results.join(" ");
}
