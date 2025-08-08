const gorillaToBit = {
  "ウ": 1,
  "ホ": 2,
  "ゴ": 4,
  "リ": 8,
  "ラ": 16,
  "ッ": 32,
  "🦍": 64
};

const numToChar = {
  1: "ぁ", 2: "あ", 3: "ぃ", 4: "い", 5: "ぅ", 6: "う", 7: "ぇ", 8: "え", 9: "ぉ", 10: "お",
  11: "か", 12: "き", 13: "く", 14: "け", 15: "こ",
  16: "さ", 17: "し", 18: "す", 19: "せ", 20: "そ",
  21: "た", 22: "ち", 23: "つ", 24: "て", 25: "と",
  26: "な", 27: "に", 28: "ぬ", 29: "ね", 30: "の",
  31: "は", 32: "ひ", 33: "ふ", 34: "へ", 35: "ほ",
  36: "ま", 37: "み", 38: "む", 39: "め", 40: "も",
  41: "ゃ", 42: "や", 43: "ゅ", 44: "ゆ", 45: "ょ", 46: "よ",
  47: "ら", 48: "り", 49: "る", 50: "れ", 51: "ろ",
  52: "わ", 53: "を", 54: "ん", 55: "っ", 56: "ー",
  57: "が", 58: "ぎ", 59: "ぐ", 60: "げ", 61: "ご",
  62: "ざ", 63: "じ", 64: "ず", 65: "ぜ", 66: "ぞ",
  67: "だ", 68: "ぢ", 69: "づ", 70: "で", 71: "ど"
};

const charToNum = {};
for (const key in numToChar) {
  charToNum[numToChar[key]] = parseInt(key);
}

function decimalToGorilla(num) {
  const bits = [64, 32, 16, 8, 4, 2, 1];
  let result = "";
  for (const bit of bits) {
    if (num >= bit) {
      result += Object.keys(gorillaToBit).find(k => gorillaToBit[k] === bit);
      num -= bit;
    }
  }
  return result;
}

function gorillaToDecimal(goriStr) {
  let sum = 0;
  for (const char of goriStr) {
    if (gorillaToBit[char]) {
      sum += gorillaToBit[char];
    }
  }
  return sum;
}

function convert() {
  const input = document.getElementById("input").value.trim();
  let output = [];

  for (const char of input) {
    const num = charToNum[char];
    if (!num) {
      output.push("[?]");
    } else {
      output.push(decimalToGorilla(num));
    }
  }

  document.getElementById("output").innerText = output.join(",");
}

function convertBack() {
  const input = document.getElementById("input").value.trim();
  const parts = input.split(",");
  let result = "";

  for (const part of parts) {
    const dec = gorillaToDecimal(part);
    if (numToChar[dec]) {
      result += numToChar[dec];
    } else {
      result += "[?]";
    }
  }

  document.getElementById("output").innerText = result;
}
