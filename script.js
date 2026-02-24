const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");

const segments = [
  "Decidi un evento",
  "Decidere il tema di una giornata",
  "Pubblicizzare il tuo canale TikTok",
  "Niente"
];

let rotation = 0;
let spinning = false;

/* ------------------ RESPONSIVE CANVAS ------------------ */
function resizeCanvas() {
  const size = Math.min(window.innerWidth * 0.9, 400);
  canvas.width = size;
  canvas.height = size;
  drawWheel();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* ------------------ DRAW WHEEL ------------------ */
function drawWheel() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2;
  const arc = (2 * Math.PI) / segments.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < segments.length; i++) {
    const angle = rotation + i * arc;

    // Colori alternati neon
    ctx.fillStyle = i % 2 === 0 ? "#ff00c8" : "#7a00ff";

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, angle, angle + arc);
    ctx.closePath();
    ctx.fill();

    // Testo
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "white";
    ctx.font = `${radius * 0.08}px Orbitron`;
    ctx.fillText(segments[i], radius - 10, 5);
    ctx.restore();
  }
}

/* ------------------ SOUND EFFECTS ------------------ */
const tickSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
const winSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2762/2762-preview.mp3");

/* ------------------ SPIN FUNCTION ------------------ */
spinBtn.addEventListener("click", () => {
  if (spinning) return;
  spinning = true;

  const spinAngle = Math.random() * 2000 + 3000;
  const duration = 4000;
  const start = performance.now();

  function animate(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);

    rotation += (spinAngle * easeOut) * 0.002;

    drawWheel();

    if (progress < 1) {
      tickSound.currentTime = 0;
      tickSound.play();
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      winSound.play();
      showResult();
    }
  }

  requestAnimationFrame(animate);
});

/* ------------------ RESULT ------------------ */
function showResult() {
  const arc = (2 * Math.PI) / segments.length;
  const index = Math.floor(
    segments.length - (rotation % (2 * Math.PI)) / arc
  ) % segments.length;

  setTimeout(() => {
    alert("Risultato: " + segments[index]);
  }, 300);
}
