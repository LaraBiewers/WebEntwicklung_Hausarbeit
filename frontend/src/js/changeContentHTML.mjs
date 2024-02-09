const hauptseiteInfo = 'Auf dieser Seite finden Sie eine lexikographisch aufsteigende Liste aller uns bekannten Namen. <br> Mit den oben zu sehenden Schaltflächen können Sie diese Liste entsprechend filtern oder Ihre persönliche Merkliste aufrufen!';
const merklisteInfo = 'Auf dieser Seite finden Sie Ihre persönliche Merkliste. <br> Mit den Schaltflächen oben können Sie diese Liste entsprechend filtern oder auf unsere Hauptdatenbank zugreifen, die alle uns bekannten Vornamen enthält!';

document.getElementById('Filter').addEventListener('click', toggleFilter);
document.getElementById('Merkliste').addEventListener('click', changeToFavorites);
document.getElementById('Namensliste').addEventListener('click', changeToDefault);

window.addEventListener('load', (event) => {
  // Informationen für die vollständige Namensliste
  document.getElementById('Seiteninformation').innerHTML = hauptseiteInfo;

  // Filter ausblenden
  document.getElementById('Filterfunktion').style.display = 'none';

  // Button für vollständige Namensliste ausblenden
  document.getElementById('Namensliste').style.display = 'none';

  // MongoDB-Collection favorite-table ausblenden
  document.getElementById('favorite-table').style.display = 'none';
});

function toggleFilter () {
  if (document.getElementById('Filterfunktion').style.display === 'none') {
    document.getElementById('Filterfunktion').style.display = '';
  } else {
    document.getElementById('Filterfunktion').style.display = 'none';
  }
}

function changeToFavorites () {
  document.getElementById('Seiteninformation').innerHTML = merklisteInfo;

  // Filter ausblenden
  document.getElementById('Filterfunktion').style.display = 'none';

  // Buttons: Merkliste ausblenden + Namensliste einblenden
  document.getElementById('Merkliste').style.display = 'none';
  document.getElementById('Namensliste').style.display = '';

  // MongoDB-Collections: names-table ausblenden + favorite-table einblenden
  document.getElementById('names-table').style.display = 'none';
  document.getElementById('favorite-table').style.display = '';
}

function changeToDefault () {
  document.getElementById('Seiteninformation').innerHTML = hauptseiteInfo;

  // Filter ausblenden
  document.getElementById('Filterfunktion').style.display = 'none';

  // Buttons: Merkliste einblenden + Namensliste ausblenden
  document.getElementById('Merkliste').style.display = '';
  document.getElementById('Namensliste').style.display = 'none';

  // MongoDB-Collections: names-table einblenden + favorite-table ausblenden
  document.getElementById('names-table').style.display = '';
  document.getElementById('favorite-table').style.display = 'none';
}
