const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");
const bgMusic = document.getElementById("bgMusic");
const tickSound = document.getElementById("tickSound");

const segments = [
  { text: "Decidi un evento", size: 0.5 },
  { text: "Tema giornata", size: 1 },
  { text: "Pubblicizza TikTok", size: 1.5 },
  { text: "Niente", size: 3 }
];

let totalSize = segments.reduce((sum, s) => sum + s.size, 0);
let rotation = 0;
let spinning = false;

/* RESPONSIVE */
function resizeCanvas() {
  const size = Math.min(window.innerWidth * 0.9, 420);
  canvas.width = size;
  canvas.height = size;
  drawWheel();
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* DISEGNO */
function drawWheel() {
  const center = canvas.width / 2;
  const radius = center;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let startAngle = rotation;

  segments.forEach((seg, i) => {
    const arc = (seg.size / totalSize) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.fillStyle = i % 2 === 0 ? "#ff00c8" : "#7a00ff";
    ctx.arc(center, center, radius, startAngle, startAngle + arc);
    ctx.closePath();
    ctx.fill();

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(startAngle + arc / 2);
    ctx.fillStyle = "white";
    ctx.font = `${radius * 0.08}px Orbitron`;
    ctx.textAlign = "right";
    ctx.fillText(seg.text, radius - 10, 5);
    ctx.restore();

    startAngle += arc;
  });
}

/* 1 SPIN AL GIORNO */
function canSpinToday() {
  const lastSpin = localStorage.getItem("lastSpin");
  const today = new Date().toDateString();
  return lastSpin !== today;
}

spinBtn.addEventListener("click", () => {
  if (!canSpinToday()) {
    alert("Hai già usato la ruota oggi!");
    return;
  }

  if (spinning) return;
  spinning = true;

  bgMusic.volume = 0.3;
  bgMusic.play();

  const spinAngle = Math.random() * 2000 + 3000;
  const duration = 4000;
  const start = performance.now();

  function animate(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    rotation += spinAngle * 0.0005 * ease;
    drawWheel();

    if (progress < 1) {
      tickSound.currentTime = 0;
      tickSound.play();
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      localStorage.setItem("lastSpin", new Date().toDateString());
      showResult();
    }
  }

  requestAnimationFrame(animate);
});

function showResult() {
  let angle = (rotation % (2 * Math.PI));
  let cumulative = 0;

  for (let seg of segments) {
    let arc = (seg.size / totalSize) * 2 * Math.PI;
    if (angle >= cumulative && angle < cumulative + arc) {
      alert("Risultato: " + seg.text);
      break;
    }
    cumulative += arc;
  }
}
