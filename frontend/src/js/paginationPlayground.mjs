// @NIKLAS
// Zum Ausprobieren ---> Gesamten Code dieses Dokumentes Kopieren und pagination überschreiben. Musst es ja nicht pushen.

const pageSize = 10;
let currentPage = 1;
let totalPages = 0;
// Flag to track if the watchlist is active
let isWatchlistActive = false;

document.addEventListener('DOMContentLoaded', (event) => {
  resetPageAndFetch();
});

function resetPageAndFetch () {
  currentPage = 1;
  fetchAndUpdate();
}

function fetchAndUpdate () {
  if (isWatchlistActive) {
    fetchNamesFromWatchlist(currentPage);
  } else {
    fetchNamesFromNames(currentPage);
  }
}

function toggleWatchlistAndReset () {
  isWatchlistActive = !isWatchlistActive; // Toggle the flag
  resetPageAndFetch(); // Reset the page and fetch the appropriate data
}

const nextButton = document.getElementById('next');
const prevButton = document.getElementById('previous');
const firstButton = document.getElementById('first');
const lastButton = document.getElementById('last');
const fullListButton = document.getElementById('Namensliste');
const watchListButton = document.getElementById('Merkliste');

nextButton.addEventListener('click', nextPage);
prevButton.addEventListener('click', previousPage);
firstButton.addEventListener('click', firstPage);
lastButton.addEventListener('click', lastPage);
fullListButton.addEventListener('click', toggleWatchlistAndReset);
watchListButton.addEventListener('click', toggleWatchlistAndReset);

function nextPage () {
  currentPage++;
  fetchAndUpdate();
}

function previousPage () {
  currentPage--;
  fetchAndUpdate();
}

function firstPage () {
  currentPage = 1;
  fetchAndUpdate();
}

function lastPage () {
  currentPage = totalPages;
  fetchAndUpdate();
}

function checkPageForButtonDisable () {
  if (currentPage > 1) {
    prevButton.disabled = false;
    firstButton.disabled = false;
  } else {
    prevButton.disabled = true;
    firstButton.disabled = true;
  }

  if (currentPage >= totalPages) {
    nextButton.disabled = true;
    lastButton.disabled = true;
  } else {
    nextButton.disabled = false;
    lastButton.disabled = false;
  }
}

/// //
//  Communication with Backend
/// //

// Buttonfunktion: Kopiere Element von names nach watchlist
async function addToWatchlist (id) {
  const response = await fetch('/addToWatchlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });

  const data = await response.json();
  console.log(data);
}

// Buttonfunktion: Priorisiere Element von watchlist
async function prioriseElement (id) {
  const response = await fetch('/priorisingWatchlistElements', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });

  const data = await response.json();
  console.log(data);
}

// Buttonfunktion: Lösche Element von watchlist
async function deleteFromWatchlist (id) {
  const response = await fetch('/deleteFromWatchlist', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });

  const data = await response.json();
  console.log(data);
}

/// //
//  Code for names-table
/// //

// Fill <ol>-Elements
async function fetchNamesFromNames (currentPage) {
  // If "complete name list" active, use all filters, otherwise only gender
  const sex = document.getElementById('sex').value;
  const prefix = document.getElementById('prefix').value;
  const notPrefix = document.getElementById('notPrefix').value;
  const suffix = document.getElementById('suffix').value;
  const notSuffix = document.getElementById('notSuffix').value;
  const syllables = document.getElementById('syllables').value;

  // Fetch the filtered data from names-Collection
  const skipValue = (currentPage - 1) * pageSize;
  const response = await fetch(`/names?skip=${skipValue}&limit=${pageSize}&sex=${sex}&prefix=${prefix}&notPrefix=${notPrefix}&suffix=${suffix}&notSuffix=${notSuffix}&syllables=${syllables}`);
  const names = await response.json();

  totalPages = Math.ceil(names.count / pageSize);
  // Update names table with filtered data
  updateNamesTable(names.namesData);
  checkPageForButtonDisable();
}

// Build up table structure
async function updateNamesTable (namesData) {
  const namesTable = document.getElementById('names-table');

  // Clear the table
  namesTable.innerHTML = '';

  // Hinzufügen von Überschriften für die Liste
  const headerElement = document.createElement('li');
  headerElement.className = 'headerContainer';

  const nameContainer = document.createElement('div');
  nameContainer.className = 'nameContainer';
  nameContainer.textContent = 'Vorname';

  const sexContainer = document.createElement('div');
  sexContainer.className = 'sexContainer';
  sexContainer.textContent = 'Geschlecht';

  const syllablesContainer = document.createElement('div');
  syllablesContainer.className = 'syllablesContainer';
  syllablesContainer.textContent = 'Silbenanzahl';

  // button to copy elements to watchlist
  const copyButtonContainer = document.createElement('div');
  copyButtonContainer.className = 'buttonContainer';
  copyButtonContainer.textContent = 'Zur Merkliste hinzufügen';

  namesTable.appendChild(headerElement);
  headerElement.appendChild(nameContainer);
  headerElement.appendChild(sexContainer);
  headerElement.appendChild(syllablesContainer);
  headerElement.appendChild(copyButtonContainer);

  namesData.forEach(element => {
    const dataContainer = document.createElement('li');
    dataContainer.className = 'dataContainer';
    dataContainer.id = element._id;

    const nameContainer = document.createElement('div');
    nameContainer.className = 'nameContainer';
    nameContainer.textContent = element.name;

    const sexContainer = document.createElement('div');
    sexContainer.className = 'sexContainer';
    sexContainer.textContent = element.geschlecht;

    const syllablesContainer = document.createElement('div');
    syllablesContainer.className = 'syllablesContainer';
    syllablesContainer.textContent = element.silben;

    // button to copy elements to watchlist
    const copyButtonContainer = document.createElement('div');
    copyButtonContainer.className = 'buttonContainer';

    const copyButton = document.createElement('button');
    copyButton.setAttribute('type', 'button');
    copyButton.className = 'addToWatchlist';
    copyButton.textContent = 'Vorname merken';

    // EventListener for addToWatchlist
    copyButton.addEventListener('click', () => {
      // zugehörige ID des <li> Elements
      const id = dataContainer.id;
      addToWatchlist(id);
    });

    namesTable.appendChild(dataContainer);

    dataContainer.appendChild(nameContainer);
    dataContainer.appendChild(sexContainer);
    dataContainer.appendChild(syllablesContainer);
    dataContainer.appendChild(copyButtonContainer);
    copyButtonContainer.appendChild(copyButton);
  });
}

/// //
//  Code for watchlist-table
/// //

// Fill watchlist-table
async function fetchNamesFromWatchlist (currentPage) {
  // Use all filters
  const sex = document.getElementById('sex').value;
  const prio = document.getElementById('prio').value;

  // Fetch the filtered data from watchlist-Collection
  const skipValue = (currentPage - 1) * pageSize;
  const response = await fetch(`/getFromWatchlist?skip=${skipValue}&limit=${pageSize}&sex=${sex}&prio=${prio}`);
  const names = await response.json();

  totalPages = Math.ceil(names.count / pageSize);
  // Update names table with filtered data
  updateWatchlistTable(names.watchlistData);
  checkPageForButtonDisable();
}

// Build up table structure for watchlist-table
async function updateWatchlistTable (watchlistData) {
  const watchlistTable = document.getElementById('watchlist-table');

  // Clear the table
  watchlistTable.innerHTML = '';

  // Hinzufügen von Überschriften für die Liste
  const headerElement = document.createElement('li');
  headerElement.className = 'headerContainer';

  const nameContainer = document.createElement('div');
  nameContainer.className = 'nameContainer';
  nameContainer.textContent = 'Vorname';

  const sexContainer = document.createElement('div');
  sexContainer.className = 'sexContainer';
  sexContainer.textContent = 'Geschlecht';

  const syllablesContainer = document.createElement('div');
  syllablesContainer.className = 'syllablesContainer';
  syllablesContainer.textContent = 'Silbenanzahl';

  const prioParaContainer = document.createElement('div');
  prioParaContainer.className = 'prioParaContainer';
  prioParaContainer.innerText = 'Prioritätsstatus';

  // Button zum anwählen der Priorisierung
  const prioButtonContainer = document.createElement('div');
  prioButtonContainer.className = 'prioButtonContainer';
  prioButtonContainer.textContent = 'Vorname priorisieren';

  // button to delete elements from watchlist
  const deleteButtonContainer = document.createElement('div');
  deleteButtonContainer.className = 'buttonContainer';
  deleteButtonContainer.textContent = 'Vorname entfernen';

  watchlistTable.appendChild(headerElement);
  headerElement.appendChild(nameContainer);
  headerElement.appendChild(sexContainer);
  headerElement.appendChild(syllablesContainer);
  headerElement.appendChild(prioParaContainer);
  headerElement.appendChild(prioButtonContainer);
  headerElement.appendChild(deleteButtonContainer);

  watchlistData.forEach(element => {
    const dataContainer = document.createElement('li');
    dataContainer.className = 'dataContainer';
    dataContainer.id = element._id;

    const nameContainer = document.createElement('div');
    nameContainer.className = 'nameContainer';
    nameContainer.textContent = element.name;

    const sexContainer = document.createElement('div');
    sexContainer.className = 'sexContainer';
    sexContainer.textContent = element.geschlecht;

    const syllablesContainer = document.createElement('div');
    syllablesContainer.className = 'syllablesContainer';
    syllablesContainer.textContent = element.silben;

    // Exklusiv für watchlist

    // Anzeige des Prio-Status
    const prioParaContainer = document.createElement('div');
    prioParaContainer.className = 'prioParaContainer';
    prioParaContainer.innerText = element.prio;

    // Button zum anwählen der Priorisierung
    const prioButtonContainer = document.createElement('div');
    prioButtonContainer.className = 'prioButtonContainer';

    const prioButton = document.createElement('button');
    prioButton.setAttribute('type', 'button');
    prioButton.className = 'prioButton';
    prioButton.textContent = 'Priorisieren';

    // button to delete elements from watchlist
    const deleteButtonContainer = document.createElement('div');
    deleteButtonContainer.className = 'buttonContainer';

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.className = 'deleteFromWatchlist';
    deleteButton.textContent = 'Vorname entfernen';

    // EventListener für Priorisierung
    prioButton.addEventListener('click', () => {
      // zugehörige ID des <li> Elements
      const id = dataContainer.id;
      prioriseElement(id);
      // Nach dem Löschen aktualisiere die watchlist-Tabelle
      fetchNamesFromWatchlist(currentPage);
    });

    // EventListener für addToWatchlist
    deleteButton.addEventListener('click', () => {
      // zugehörige ID des <li> Elements
      const id = dataContainer.id;
      deleteFromWatchlist(id);
      // Nach dem Löschen aktualisiere die watchlist-Tabelle
      fetchNamesFromWatchlist(currentPage);
    });

    watchlistTable.appendChild(dataContainer);

    dataContainer.appendChild(nameContainer);
    dataContainer.appendChild(sexContainer);
    dataContainer.appendChild(syllablesContainer);
    dataContainer.appendChild(prioParaContainer);

    dataContainer.appendChild(prioButtonContainer);
    prioButtonContainer.appendChild(prioButton);

    dataContainer.appendChild(deleteButtonContainer);
    deleteButtonContainer.appendChild(deleteButton);
  });
}

/// //
//  Export-functions
/// //

export function getCurrentPage () {
  return currentPage;
}

export function setCurrentPage (newValue) {
  if (newValue > 0 && newValue <= totalPages) {
    currentPage = newValue;
  } else {
    console.log('Page out of range, set to first page');
    currentPage = 1;
  }
  // Call the appropriate fetch function based on whether the watchlist is active
  if (isWatchlistActive) {
    fetchNamesFromWatchlist(currentPage);
  } else {
    fetchNamesFromNames(currentPage);
  }
}
