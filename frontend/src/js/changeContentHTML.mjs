document.getElementById('Filter').addEventListener('click', toggleFilter);
document.getElementById('Merkliste').addEventListener('click', changeToFavorites);
document.getElementById('Namensliste').addEventListener('click', changeToDefault);

// Bei Start der Anwendung
window.addEventListener('load', (event) => {
  document.getElementById('head').style.backgroundColor = '#5db738a6';
  document.getElementById('footer').style.backgroundColor = '#5db738a6';
  // Filter onStart ausblenden
  document.getElementById('Filterfunktion').style.display = '';
  // Prio-Filter ausblenden
  document.getElementById('prioDiv').style.display = 'none';

  // Button für vollständige Namensliste ausblenden
  document.getElementById('Namensliste').style.display = 'none';

  // MongoDB-Collection watchlist-table ausblenden
  document.getElementById('watchlist-table').style.display = 'none';
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
  document.getElementById('head').style.backgroundColor = '#bf7b3f5b';
  document.getElementById('footer').style.backgroundColor = '#bf7b3f5b';

  document.getElementById('Filterfunktion').style.display = '';
  // Alle Filter ausblenden, außer Geschlecht
  document.getElementById('prefixDiv').style.display = 'none';
  document.getElementById('notPrefixDiv').style.display = 'none';
  document.getElementById('suffixDiv').style.display = 'none';
  document.getElementById('notSuffixDiv').style.display = 'none';
  document.getElementById('syllablesDiv').style.display = 'none';
  // Prio-Filter einblenden
  document.getElementById('prioDiv').style.display = '';

  // Buttons: Merkliste ausblenden + Namensliste einblenden
  document.getElementById('Merkliste').style.display = 'none';
  document.getElementById('Namensliste').style.display = '';

  // MongoDB-Collections: names-table ausblenden + watchlist-table einblenden
  document.getElementById('names-table').style.display = 'none';
  document.getElementById('watchlist-table').style.display = '';
}

// Bei Wechsel zu vollständige Namensliste
function changeToDefault () {
  document.getElementById('head').style.backgroundColor = '#5db738a6';
  document.getElementById('footer').style.backgroundColor = '#5db738a6';

  document.getElementById('Filterfunktion').style.display = '';
  // Alle Filter einblenden
  document.getElementById('prefixDiv').style.display = '';
  document.getElementById('notPrefixDiv').style.display = '';
  document.getElementById('suffixDiv').style.display = '';
  document.getElementById('notSuffixDiv').style.display = '';
  document.getElementById('syllablesDiv').style.display = '';
  // Prio-Filter ausblenden
  document.getElementById('prioDiv').style.display = 'none';

  // Buttons: Merkliste einblenden + Namensliste ausblenden
  document.getElementById('Merkliste').style.display = '';
  document.getElementById('Namensliste').style.display = 'none';

  // MongoDB-Collections: names-table einblenden + watchlist-table ausblenden
  document.getElementById('names-table').style.display = '';
  document.getElementById('watchlist-table').style.display = 'none';
}
