import { prioriseElement, deleteFromWatchlist } from './buttonFunctions.mjs';
import { updateIndex } from './indexing.mjs';
import { setTotalPageCount, getPageSize, getCurrentPage } from './pagination.mjs';
import { checkPageForButtonDisable } from './paginationButtons.mjs';

/// //
//  Code for watchlist-table
/// //

// Fill watchlist-table
async function fetchNamesFromWatchlist (currentPage) {
  // Filtereingaben der watchlist-table
  const sex = document.getElementById('sex').value;
  const prio = document.getElementById('prio').value;

  // Fetch filtered data from watchlist-Collection
  const skipValue = (currentPage - 1) * getPageSize();
  const response = await fetch(`/getFromWatchlist?skip=${skipValue}&limit=${getPageSize()}&sex=${sex}&prio=${prio}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const names = await response.json();

  // Befülle Tabelle dementsprechend der Eingaben
  setTotalPageCount(Math.ceil(names.count / getPageSize()));
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
      fetchNamesFromWatchlist(getCurrentPage());
    });

    // EventListener für addToWatchlist
    deleteButton.addEventListener('click', () => {
      // zugehörige ID des <li> Elements
      const id = dataContainer.id;
      deleteFromWatchlist(id);
      // Nach dem Löschen aktualisiere die watchlist-Tabelle
      fetchNamesFromWatchlist(getCurrentPage());
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

    updateIndex();
  });
}

export { updateWatchlistTable, fetchNamesFromWatchlist };
