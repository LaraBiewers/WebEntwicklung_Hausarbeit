const hauptseiteInfo = 'Auf dieser Seite finden Sie eine lexikographisch aufsteigende Liste aller uns bekannten Namen. <br> Mit den oben zu sehenden Schaltflächen können Sie diese Liste entsprechend filtern oder Ihre persönliche Merkliste aufrufen!';
const merklisteInfo = 'Auf dieser Seite finden Sie Ihre persönliche Merkliste. <br> Mit den Schaltflächen oben können Sie diese Liste entsprechend filtern oder auf unsere Hauptdatenbank zugreifen, die alle uns bekannten Vornamen enthält!';

document.getElementById('Filter').addEventListener('click', toggleFilter);
document.getElementById('Merkliste').addEventListener('click', changeToFavorites);
document.getElementById('Namensliste').addEventListener('click', changeToDefault);

// Bei Start der Anwendung
window.addEventListener('load', (event) => {
  // Informationen für die vollständige Namensliste
  document.getElementById('Seiteninformation').innerHTML = hauptseiteInfo;

  // Filter onStart ausblenden
  document.getElementById('Filterfunktion').style.display = 'none';

  // Button für vollständige Namensliste ausblenden
  document.getElementById('Namensliste').style.display = 'none';

  // MongoDB-Collection favorite-table ausblenden
  document.getElementById('favorite-table').style.display = 'none';
});

// Filterfunktion ein- oder ausblenden
function toggleFilter () {
  if (document.getElementById('Filterfunktion').style.display === 'none') {
    document.getElementById('Filterfunktion').style.display = '';
  } else {
    document.getElementById('Filterfunktion').style.display = 'none';
  }
}

// Bei Wechsel zu Merkliste
function changeToFavorites () {
  // Informationen für die Merkliste
  document.getElementById('Seiteninformation').innerHTML = merklisteInfo;

  // Filter onStart ausblenden
  document.getElementById('Filterfunktion').style.display = 'none';
  // Alle Filter ausblenden, außer Geschlecht
  document.getElementById('prefixDiv').style.display = 'none';
  document.getElementById('notPrefixDiv').style.display = 'none';
  document.getElementById('suffixDiv').style.display = 'none';
  document.getElementById('notSuffixDiv').style.display = 'none';
  document.getElementById('syllablesDiv').style.display = 'none';

  // Buttons: Merkliste ausblenden + Namensliste einblenden
  document.getElementById('Merkliste').style.display = 'none';
  document.getElementById('Namensliste').style.display = '';

  // MongoDB-Collections: names-table ausblenden + favorite-table einblenden
  document.getElementById('names-table').style.display = 'none';
  document.getElementById('favorite-table').style.display = '';
}

// Bei Wechsel zu vollständige Namensliste
function changeToDefault () {
  // Informationen für die vollständige Namensliste
  document.getElementById('Seiteninformation').innerHTML = hauptseiteInfo;

  // Filter onStart ausblenden
  document.getElementById('Filterfunktion').style.display = 'none';
  // Alle Filter einblenden
  document.getElementById('prefixDiv').style.display = '';
  document.getElementById('notPrefixDiv').style.display = '';
  document.getElementById('suffixDiv').style.display = '';
  document.getElementById('notSuffixDiv').style.display = '';
  document.getElementById('syllablesDiv').style.display = '';

  // Buttons: Merkliste einblenden + Namensliste ausblenden
  document.getElementById('Merkliste').style.display = '';
  document.getElementById('Namensliste').style.display = 'none';

  // MongoDB-Collections: names-table einblenden + favorite-table ausblenden
  document.getElementById('names-table').style.display = '';
  document.getElementById('favorite-table').style.display = 'none';
}
