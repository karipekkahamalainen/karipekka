const tulokset = document.getElementById("tulokset");
const laskuri = document.getElementById("laskuri");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

let intervalId = null;
let kierrokset = 0;

function arvoNumerot() {
  const numerot = new Set();
  console.log("Nappia painettu");
  while (numerot.size < 7) {
    numerot.add(Math.floor(Math.random() * 39) + 1);
  }
  return Array.from(numerot).sort((a,b) => a - b);
}

function numerotOvatSamat(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for(let i=0; i<arr1.length; i++) {
    if(arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function paivitaNäyttö(arvot, kierros) {
  tulokset.textContent = "Arvottu rivi: " + arvot.join(" - ");
  laskuri.textContent = "Kierroksia: " + kierros;
}

function aloitaGenerointi() {
    console.log("Nappia painettu generointiin");
  const userInput = document.getElementById("userNumbers").value;
  const userNums = userInput.split(",").map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n >=1 && n <=39);

  if (userNums.length !== 7) {
    alert("Syötä täsmälleen 7 numeroa, arvot väliltä 1–39!");
    return;
  }

  kierrokset = 0;
  startBtn.disabled = true;
  stopBtn.disabled = false;

  intervalId = setInterval(() => {
    kierrokset++;
    const arvot = arvoNumerot();
    paivitaNäyttö(arvot, kierrokset);

    if (numerotOvatSamat(arvot, userNums)) {
      clearInterval(intervalId);
      alert(`Lotto osui oikein ${kierrokset}. arvonnalla! 🎉`);
      startBtn.disabled = false;
      stopBtn.disabled = true;
    }
  }, 20); // pyörii 100ms välein eli 10 kertaa sekunnissa
}

function pysaytaGenerointi() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    alert("Generointi pysäytetty.");
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
}
function laskeOsumat(arr1, arr2) {
  let osumat = 0;
  const setUser = new Set(arr2);
  for (const num of arr1) {
    if (setUser.has(num)) {
      osumat++;
    }
  }
  return osumat;
}

function paivitaNäyttö(arvot, kierros, osumat) {
  tulokset.textContent = "Arvottu rivi: " + arvot.join(" - ");
  laskuri.textContent = `Kierroksia: ${kierros} | Osumia: ${osumat} / 7`;
}

function aloitaGenerointi() {
  const userInput = document.getElementById("userNumbers").value;
  const userNums = userInput.split(",").map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n >=1 && n <=39);

  if (userNums.length !== 7) {
    alert("Syötä täsmälleen 7 numeroa, arvot väliltä 1–39!");
    return;
  }

  kierrokset = 0;
  startBtn.disabled = true;
  stopBtn.disabled = false;

  intervalId = setInterval(() => {
    kierrokset++;
    const arvot = arvoNumerot();
    const osumat = laskeOsumat(arvot, userNums);
    paivitaNäyttö(arvot, kierrokset, osumat);

    if (osumat === 7) {
      clearInterval(intervalId);
      alert(`Lotto osui oikein ${kierrokset}. arvonnalla! 🎉`);
      startBtn.disabled = false;
      stopBtn.disabled = true;
    }
  }, 20); // pyörii 100ms välein
}

startBtn.addEventListener("click", aloitaGenerointi);
stopBtn.addEventListener("click", pysaytaGenerointi);