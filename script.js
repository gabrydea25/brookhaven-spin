const wheel = document.getElementById("wheel");
const btn = document.getElementById("spinBtn");
const result = document.getElementById("result");
const bgMusic = document.getElementById("bgMusic");
const tickSound = document.getElementById("tickSound");

const options = [
  "Decidi un evento",
  "Decidere il tema di una giornata",
  "Pubblicizzare il tuo canale TikTok",
  "Niente"
];

let spinning = false;
let tickInterval;

btn.onclick = function() {

  if (spinning) return;

  spinning = true;

  bgMusic.volume = 0.3;
  bgMusic.play();

  let randomIndex = Math.floor(Math.random() * options.length);
  let degrees = 360 * 5 + (randomIndex * 90);

  wheel.style.transform = "rotate(-" + degrees + "deg)";

  tickInterval = setInterval(() => {
    tickSound.currentTime = 0;
    tickSound.play();
  }, 150);

  setTimeout(() => {
    clearInterval(tickInterval);
    result.innerText = "Hai ottenuto: " + options[randomIndex];
    spinning = false;
  }, 4000);
};
