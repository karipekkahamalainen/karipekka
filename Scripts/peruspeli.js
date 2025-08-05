function arvoNumerot() {
  const numerot = new Set();

  while (numerot.size < 7) {
    const numero = Math.floor(Math.random() * 39) + 1;
    numerot.add(numero);
  }

  const tulos = Array.from(numerot).sort((a, b) => a - b).join(' - ');
  document.getElementById("tulokset").textContent = tulos;
}