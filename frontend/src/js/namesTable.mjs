import { addToWatchlist } from './buttonFunctions.mjs';
import { checkPageForButtonDisable } from './paginationButtons.mjs';
import { setTotalPageCount, getPageSize, getTotalPageCount } from './pagination.mjs';
import { updateIndex } from './indexing.mjs';

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
  console.log(`total Pages set to ${getTotalPageCount()}`);
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
  copyButtonContainer.textContent = 'Vorname merken';

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
    copyButton.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill" viewBox="0  0  16  16">
  <path d="M3  14s-1  0-1-1  1-4  6-4  6  3  6  4-1  1-1  1H3zm5-6a3  3  0  1  0  0-6  3  3  0  0  0  0  6z"/>
</svg>
`;

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

    updateIndex();
  });
}

export { updateNamesTable, fetchNamesFromNames };
