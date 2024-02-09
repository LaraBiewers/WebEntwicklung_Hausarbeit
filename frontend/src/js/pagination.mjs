const pageSize = 10;
let currentPage = 1;
let totalPages = 0;
document.addEventListener('DOMContentLoaded', (event) => {
  fetchNames(currentPage);
});

const nextButton = document.getElementById('next');
const prevButton = document.getElementById('previous');
const firstButton = document.getElementById('first');
const lastButton = document.getElementById('last');
nextButton.addEventListener('click', nextPage);
prevButton.addEventListener('click', previousPage);
firstButton.addEventListener('click', firstPage);
lastButton.addEventListener('click', lastPage);

function nextPage () {
  currentPage++;
  fetchNames(currentPage);
}

function previousPage () {
  currentPage--;
  fetchNames(currentPage);
}

function firstPage () {
  currentPage = 1;
  fetchNames(currentPage);
}

function lastPage () {
  currentPage = totalPages;
  fetchNames(currentPage);
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

async function fetchNames (currentPage) {
  const sex = document.getElementById('sex').value;
  const prefix = document.getElementById('prefix').value;
  const notPrefix = document.getElementById('notPrefix').value;
  const suffix = document.getElementById('suffix').value;
  const notSuffix = document.getElementById('notSuffix').value;
  const syllables = document.getElementById('syllables').value;

  // Fetch the filtered data from the server
  const skipValue = (currentPage - 1) * pageSize;
  const response = await fetch(`/names?skip=${skipValue}&limit=${pageSize}&sex=${sex}&prefix=${prefix}&notPrefix=${notPrefix}&suffix=${suffix}&notSuffix=${notSuffix}&syllables=${syllables}`);
  const names = await response.json();

  totalPages = Math.ceil(names.count / pageSize);
  // Update the names table with the filtered data
  updateNamesTable(names.namesData);
  checkPageForButtonDisable();
}

// Übertrage ID von names nach watchlist
async function addToWatchlist (id) {
  // ID wird richtig erkannt!
  // console.log(id);
  const response = await fetch('/addToWatchlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });
  if (!response.ok) {
    console.log(response);
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

async function updateNamesTable (namesData) {
  const namesTable = document.getElementById('names-table');

  // Clear the table
  namesTable.innerHTML = '';

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

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'buttonContainer';

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.className = 'addToWatchlist';
    button.textContent = 'Vorname merken';

    button.addEventListener('click', () => {
      // zugehörige ID des <li> Elements
      const id = dataContainer.id;
      addToWatchlist(id);
    });

    dataContainer.appendChild(nameContainer);
    dataContainer.appendChild(sexContainer);
    dataContainer.appendChild(syllablesContainer);
    dataContainer.appendChild(buttonContainer);
    buttonContainer.appendChild(button);

    namesTable.appendChild(dataContainer);
  });
}

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
  fetchNames(currentPage);
}
