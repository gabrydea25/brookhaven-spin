const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

const prizes = [
  { name: "500 Cash RP", chance: 25 },
  { name: "1000 Cash RP", chance: 20 },
  { name: "XP Boost x2", chance: 15 },
  { name: "Casa 24h", chance: 15 },
  { name: "Veicolo Premium", chance: 10 },
  { name: "Oggetto Raro", chance: 7 },
  { name: "Ruolo Discord", chance: 5 },
  { name: "JACKPOT 🎉", chance: 3 }
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
  const randomIndex = Math.floor(Math.random() * 8);
  const degrees = 3600 + (randomIndex * 45);

  wheel.style.transform = `rotate(${degrees}deg)`;

  setTimeout(() => {
   result.textContent = "Hai vinto: " + prize;

if (prize === "JACKPOT 🎉") {
  document.body.style.background = "gold";
  result.style.fontSize = "30px";
  result.style.fontWeight = "bold";
  result.textContent = "👑 JACKPOT LEGGENDARIO 👑";
}
    saveSpinDate();
    isSpinning = false;
  }, 4000);
});
