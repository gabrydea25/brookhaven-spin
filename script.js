const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

const prizes = [
  { name: "Decidi un evento", chance: 10 },
  { name: "Decidere il tema di una giornata", chance: 20 },
  { name: "Pubblicizzare il tuo canale TikTok", chance: 30 },
  { name: "Niente", chance: 40 }
];

let isSpinning = false;

function canSpinToday() {
  const lastSpin = localStorage.getItem("lastSpinDate");
  const today = new Date().toDateString();
  return lastSpin !== today;
}

function saveSpinDate() {
  const today = new Date().toDateString();
  localStorage.setItem("lastSpinDate", today);
}

function getRandomPrize() {
  const random = Math.random() * 100;
  let cumulative = 0;

  for (let prize of prizes) {
    cumulative += prize.chance;
    if (random <= cumulative) {
      return prize.name;
    }
  }
}

spinBtn.addEventListener("click", () => {
  if (isSpinning) return;

  if (!canSpinToday()) {
    result.textContent = "Hai già fatto la spin oggi! Torna domani 😎";
    return;
  }

  isSpinning = true;

  const prize = getRandomPrize();
  const randomIndex = Math.floor(Math.random() * 4);
  const degrees = 3600 + (randomIndex * 90);

  wheel.style.transform = `rotate(${degrees}deg)`;

  setTimeout(() => {
    result.textContent = "Hai ottenuto: " + prize;
    saveSpinDate();
    isSpinning = false;
  }, 4000);
});
