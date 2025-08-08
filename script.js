const charMap = {
  'ぁ': 1, 'あ': 2, 'ぃ': 3, 'い': 4, 'ぅ': 5, 'う': 6, 'ぇ': 7, 'え': 8, 'ぉ': 9, 'お': 10,
  'か': 11, 'が': 12, 'き': 13, 'ぎ': 14, 'く': 15, 'ぐ': 16, 'け': 17, 'げ': 18, 'こ': 19, 'ご': 20,
  'さ': 21, 'ざ': 22, 'し': 23, 'じ': 24, 'す': 25, 'ず': 26, 'せ': 27, 'ぜ': 28, 'そ': 29, 'ぞ': 30,
  'た': 31, 'だ': 32, 'ち': 33, 'ぢ': 34, 'っ': 35, 'つ': 36, 'づ': 37, 'て': 38, 'で': 39, 'と': 40, 'ど': 41,
  'な': 42, 'に': 43, 'ぬ': 44, 'ね': 45, 'の': 46,
  'は': 47, 'ば': 48, 'ぱ': 49, 'ひ': 50, 'び': 51, 'ぴ': 52, 'ふ': 53, 'ぶ': 54, 'ぷ': 55,
  'へ': 56, 'べ': 57, 'ぺ': 58, 'ほ': 59, 'ぼ': 60, 'ぽ': 61,
  'ま': 62, 'み': 63, 'む': 64, 'め': 65, 'も': 66,
  'や': 67, 'ゃ': 68, 'ゆ': 69, 'ゅ': 70, 'よ': 71, 'ょ': 72,
  'ら': 73, 'り': 74, 'る': 75, 'れ': 76, 'ろ': 77,
  'わ': 78, 'ゎ': 79, 'を': 80, 'ん': 81
};

const reverseMap = Object.fromEntries(Object.entries(charMap).map(([k, v]) => [v, k]));

const bitMap = {
  1: "ウ", 2: "ホ", 4: "ゴ", 8: "リ", 16: "ラ", 32: "ッ", 64: "🦍"
};

function toGorilla(n) {
  let result = '';
  const keys = Object.keys(bitMap).map(Number).sort((a, b) => b - a);
  for (let key of keys) {
    if (n >= key) {
      result += bitMap[key];
      n -= key;
    }
  }
  return result;
}

function fromGorilla(g) {
  let sum = 0;
  for (let i = 0; i < g.length; i++) {
    let char = g[i];
    for (let [k, v] of Object.entries(bitMap)) {
      if (v === char) sum += parseInt(k);
    }
  }
  return sum;
}

function convert() {
  const input = document.getElementById("input").value;
  const output = [];

  for (let char of input) {
    const num = charMap[char];
    if (!num) {
      output.push("[?]");
      continue;
    }
    output.push(toGorilla(num));
  }

  document.getElementById("output").innerText = output.join(",");
}

function convertBack() {
  const input = document.getElementById("input").value;
  const parts = input.split(",");
  const output = [];

  for (let part of parts) {
    const num = fromGorilla(part);
    output.push(reverseMap[num] || "[?]");
  }

  document.getElementById("output").innerText = output.join("");
}
