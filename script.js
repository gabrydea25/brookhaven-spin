const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

const prizes = [
  "500 Cash RP",
  "1000 Cash RP",
  "XP Boost x2",
  "Casa 24h",
  "Veicolo Premium",
  "Oggetto Raro",
  "Ruolo Discord",
  "JACKPOT 🎉"
];

let isSpinning = false;

spinBtn.addEventListener("click", () => {
  if (isSpinning) return;

  isSpinning = true;

  const randomIndex = Math.floor(Math.random() * prizes.length);
  const degrees = 3600 + (randomIndex * 45);

  wheel.style.transform = `rotate(${degrees}deg)`;

  setTimeout(() => {
    result.textContent = "Hai vinto
