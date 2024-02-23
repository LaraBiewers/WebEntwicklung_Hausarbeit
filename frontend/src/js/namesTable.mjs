import { addToWatchlist } from './buttonFunctions.mjs';
import { checkPageForButtonDisable } from './paginationButtons.mjs';
import { setTotalPageCount, getPageSize } from './pagination.mjs';

// Fill names-table
async function fetchNamesFromNames (currentPage) {
  // Filtereingaben der names-table
  const sex = document.getElementById('sex').value;
  const prefix = document.getElementById('prefix').value;
  const notPrefix = document.getElementById('notPrefix').value;
  const suffix = document.getElementById('suffix').value;
  const notSuffix = document.getElementById('notSuffix').value;
  const syllables = document.getElementById('syllables').value;

  // Fetch filtered data from names-Collection
  const skipValue = (currentPage - 1) * getPageSize();
  const response = await fetch(`/names?skip=${skipValue}&limit=${getPageSize()}&sex=${sex}&prefix=${prefix}&notPrefix=${notPrefix}&suffix=${suffix}&notSuffix=${notSuffix}&syllables=${syllables}`, {
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

export { updateNamesTable, fetchNamesFromNames };
