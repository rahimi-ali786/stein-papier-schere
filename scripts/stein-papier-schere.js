let punktestand = JSON.parse(localStorage.getItem('punktestand')) || {
  siege: 0,
  niederlagen: 0,
  unentschieden: 0
};

aktualisierePunktestand();

let autoSpielenAktiv = false;
let intervallId;

function autoSpielen() {
  if (!autoSpielenAktiv) {
    intervallId = setInterval(() => {
      const spielerZug = computerZugWaehlen();
      spielStarten(spielerZug);
    }, 1000);
    autoSpielenAktiv = true;
  } else {
    clearInterval(intervallId);
    autoSpielenAktiv = false;
  }
}

document.querySelector('.js-stein-knopf')
  .addEventListener('click', () => {
    spielStarten('stein');
  });

document.querySelector('.js-papier-knopf')
  .addEventListener('click', () => {
    spielStarten('papier');
  });

document.querySelector('.js-schere-knopf')
  .addEventListener('click', () => {
    spielStarten('schere');
  });

document.body.addEventListener('keydown', (ereignis) => {
  if (ereignis.key === 's') {
    spielStarten('stein');
  } else if (ereignis.key === 'p') {
    spielStarten('papier');
  } else if (ereignis.key === 'c') {
    spielStarten('schere');
  }
});

function spielStarten(spielerZug) {
  const computerZug = computerZugWaehlen();

  let ergebnis = '';

  if (spielerZug === 'schere') {
    if (computerZug === 'stein') {
      ergebnis = 'Du verlierst.';
    } else if (computerZug === 'papier') {
      ergebnis = 'Du gewinnst.';
    } else if (computerZug === 'schere') {
      ergebnis = 'Unentschieden.';
    }
  } else if (spielerZug === 'papier') {
    if (computerZug === 'stein') {
      ergebnis = 'Du gewinnst.';
    } else if (computerZug === 'papier') {
      ergebnis = 'Unentschieden.';
    } else if (computerZug === 'schere') {
      ergebnis = 'Du verlierst.';
    }
  } else if (spielerZug === 'stein') {
    if (computerZug === 'stein') {
      ergebnis = 'Unentschieden.';
    } else if (computerZug === 'papier') {
      ergebnis = 'Du verlierst.';
    } else if (computerZug === 'schere') {
      ergebnis = 'Du gewinnst.';
    }
  }

  if (ergebnis === 'Du gewinnst.') {
    punktestand.siege += 1;
  } else if (ergebnis === 'Du verlierst.') {
    punktestand.niederlagen += 1;
  } else if (ergebnis === 'Unentschieden.') {
    punktestand.unentschieden += 1;
  }

  localStorage.setItem('punktestand', JSON.stringify(punktestand));

  aktualisierePunktestand();

  document.querySelector('.js-ergebnis').innerHTML = ergebnis;

  document.querySelector('.js-zuege').innerHTML = `Du
  <img src="images/${spielerZug}-emoji.png" class="zug-icon">
  <img src="images/${computerZug}-emoji.png" class="zug-icon">
  Computer`;
}

function aktualisierePunktestand() {
  document.querySelector('.js-punktestand')
    .innerHTML = `Siege: ${punktestand.siege}, Niederlagen: ${punktestand.niederlagen}, Unentschieden: ${punktestand.unentschieden}`;
}

function computerZugWaehlen() {
  const zufallszahl = Math.random();

  let computerZug = '';

  if (zufallszahl >= 0 && zufallszahl < 1 / 3) {
    computerZug = 'stein';
  } else if (zufallszahl >= 1 / 3 && zufallszahl < 2 / 3) {
    computerZug = 'papier';
  } else if (zufallszahl >= 2 / 3 && zufallszahl < 1) {
    computerZug = 'schere';
  }

  return computerZug;
}