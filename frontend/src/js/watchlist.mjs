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
    const prioStat = element.prio;
    if (prioStat === 'true') {
      prioParaContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0  0  24  24" fill="red" width="20" height="20">
            <path d="M12  21.35l-1.45-1.32C5.4  15.36  2  12.28  2  8.5  2  5.42  4.42  3  7.5  3c1.74  0  3.41.81  4.5  2.09C13.09  3.81  14.76  3  16.5  3  19.58  3  22  5.42  22  8.5c0  3.78-3.4  6.86-8.55  11.54L12  21.35z"/>
        </svg>
    `;
    } else { prioParaContainer.innerText = ''; }

    // Button zum anwählen der Priorisierung
    const prioButtonContainer = document.createElement('div');
    prioButtonContainer.className = 'prioButtonContainer';

    const prioButton = document.createElement('button');
    prioButton.setAttribute('type', 'button');
    prioButton.className = 'prioButton';
    prioButton.innerHTML = `
  <svg width="20" height="20" viewBox="0 0 32 32" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M30.9,10.6C30.8,10.2,30.4,10,30,10h0h-9l-4.1-8.4C16.7,1.2,16.4,1,16,1v0c0,0,0,0,0,0   c-0.4,0-0.7,0.2-0.9,0.6L11,10H2c-0.4,0-0.8,0.2-0.9,0.6c-0.2,0.4-0.1,0.8,0.2,1.1l6.6,7.6L5,29.7c-0.1,0.4,0,0.8,0.3,1   s0.7,0.3,1.1,0.1l9.6-4.6l9.6,4.6C25.7,31,25.8,31,26,31h0h0h0c0.5,0,1-0.4,1-1c0-0.2,0-0.3-0.1-0.5l-2.8-10.3l6.6-7.6   C31,11.4,31.1,10.9,30.9,10.6z" fill="#FE9803"/>
  </svg>
  `;

    // button to delete elements from watchlist
    const deleteButtonContainer = document.createElement('div');
    deleteButtonContainer.className = 'buttonContainer';

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.className = 'deleteFromWatchlist';
    deleteButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>`;
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
