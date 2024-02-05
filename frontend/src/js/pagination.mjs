const pageSize = 10;
let currentPage = 1;
let totalPages = 0;
document.addEventListener('DOMContentLoaded', (event) => {
  fetchNames(currentPage);

  document.getElementById('sex').addEventListener('change', filterChanged);
  document.getElementById('prefix').addEventListener('input', filterChanged);
  document.getElementById('notPrefix').addEventListener('input', filterChanged);
  document.getElementById('suffix').addEventListener('input', filterChanged);
  document.getElementById('notSuffix').addEventListener('input', filterChanged);
  document.getElementById('syllables').addEventListener('input', filterChanged);

  function filterChanged () {
    currentPage = 1;
    fetchNames(currentPage);
  }

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
    console.log(totalPages);
    // Update the names table with the filtered data
    updateNamesTable(names.namesData);
    checkPageForButtonDisable();
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

      dataContainer.appendChild(nameContainer);
      dataContainer.appendChild(sexContainer);
      dataContainer.appendChild(syllablesContainer);

      namesTable.appendChild(dataContainer);
    });
  }
});
