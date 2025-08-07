{\rtf1\ansi\ansicpg932\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const mapping = \{\
  1: "\uc0\u12454 ", 2: "\u12507 ", 4: "\u12468 ", 8: "\u12522 ", 16: "\u12521 ", 32: "\u12483 ", 64: "\u55358 \u56717 "\
\};\
\
const hiraList = [\
  "\uc0\u12354 ","\u12356 ","\u12358 ","\u12360 ","\u12362 ","\u12363 ","\u12365 ","\u12367 ","\u12369 ","\u12371 ",\
  "\uc0\u12373 ","\u12375 ","\u12377 ","\u12379 ","\u12381 ","\u12383 ","\u12385 ","\u12388 ","\u12390 ","\u12392 ",\
  "\uc0\u12394 ","\u12395 ","\u12396 ","\u12397 ","\u12398 ","\u12399 ","\u12402 ","\u12405 ","\u12408 ","\u12411 ",\
  "\uc0\u12414 ","\u12415 ","\u12416 ","\u12417 ","\u12418 ","\u12420 ","\u12422 ","\u12424 ","\u12425 ","\u12426 ","\u12427 ","\u12428 ","\u12429 ",\
  "\uc0\u12431 ","\u12434 ","\u12435 ",\
  "\uc0\u12364 ","\u12366 ","\u12368 ","\u12370 ","\u12372 ",\
  "\uc0\u12374 ","\u12376 ","\u12378 ","\u12380 ","\u12382 ",\
  "\uc0\u12384 ","\u12386 ","\u12389 ","\u12391 ","\u12393 ",\
  "\uc0\u12400 ","\u12403 ","\u12406 ","\u12409 ","\u12412 ",\
  "\uc0\u12401 ","\u12404 ","\u12407 ","\u12410 ","\u12413 ",\
  "\uc0\u12419 ","\u12421 ","\u12423 "\
];\
\
function numberToCode(n) \{\
  let result = "";\
  for (let i = 6; i >= 0; i--) \{\
    let val = 2 ** i;\
    if (n >= val) \{\
      result += mapping[val];\
      n -= val;\
    \}\
  \}\
  return result;\
\}\
\
function convert() \{\
  const input = document.getElementById("input").value.trim();\
  const words = input.split(" ");\
  const result = words.map(word => \{\
    let chars = [...word];\
    let codes = chars.map(char => \{\
      const index = hiraList.indexOf(char);\
      if (index === -1) return `[?]`;\
      return numberToCode(index + 1);\
    \});\
    return codes.join("");\
  \});\
  document.getElementById("output").innerText = result.join(" ");\
\}\
}