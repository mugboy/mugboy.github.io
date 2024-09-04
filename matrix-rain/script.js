const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight + 500;

const chars = "`1234567890-=~!@#$%^&*()_+qwertyuiop[]\QWERTYUIOP{}|asdfghjkl;'ASDFGHJKL:zxcvbnm,./ZXCVBNM<>?"
var letterYPositions = [];

var charColumn = Math.floor(ctx.canvas.width / 30);

for (var i = 0; i < charColumn; i++) {
  letterYPositions.push(Math.floor(Math.random() * ctx.canvas.height));
}

ctx.font = "30px Arial";

function drawFrame() {
  // clear canvas
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "#0F0";

  for (var i = 0; i < charColumn; i++) {
    var letter = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(letter, 30 * i, letterYPositions[i]);
    letterYPositions[i] += 30;
    if (letterYPositions[i] > ctx.canvas.height) {
      letterYPositions[i] = 0;
    }
  }
}

setInterval(drawFrame, 50);
