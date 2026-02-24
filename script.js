const wheel = document.getElementById("wheel");
const btn = document.getElementById("spinBtn");
const result = document.getElementById("result");

const options = [
  "Decidi un evento",
  "Decidere il tema di una giornata",
  "Pubblicizzare il tuo canale TikTok",
  "Niente"
];

btn.onclick = function() {

  let randomIndex = Math.floor(Math.random() * options.length);
  let degrees = 360 * 5 + (randomIndex * 90);

  wheel.style.transform = "rotate(-" + degrees + "deg)";

  setTimeout(() => {
    result.innerText = "Hai ottenuto: " + options[randomIndex];
  }, 4000);
};
