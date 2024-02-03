const pageSize = 10;
let currentPage = 1;
// const totalPages = 0; // Nacher dann datensatz/pageSize
document.addEventListener('DOMContentLoaded', (event) => {
  fetchNames(currentPage);

  document.getElementById('sex').addEventListener('change', fetchNames);
  document.getElementById('prefix').addEventListener('input', fetchNames);
  document.getElementById('notPrefix').addEventListener('input', fetchNames);
  document.getElementById('suffix').addEventListener('input', fetchNames);
  document.getElementById('notSuffix').addEventListener('input', fetchNames);
  document.getElementById('syllables').addEventListener('input', fetchNames);

  const nextButton = document.getElementById('next');
  const prevButton = document.getElementById('previous');
  const firstButton = document.getElementById('first');
  // const lastButton = document.getElementById('last');
  nextButton.addEventListener('click', nextPage);
  prevButton.addEventListener('click', previousPage);
  firstButton.addEventListener('click', firstPage);

  function nextPage () {
    currentPage++;
    fetchNames(currentPage);
    checkPageForButtonDisable();
  }

  function previousPage () {
    currentPage--;
    fetchNames(currentPage);
    checkPageForButtonDisable();
  }

  function firstPage () {
    currentPage = 1;
    fetchNames(currentPage);
    checkPageForButtonDisable();
  }

  function checkPageForButtonDisable () {
    if (currentPage > 1) {
      prevButton.disabled = false;
      firstButton.disabled = false;
    } else {
      prevButton.disabled = true;
      firstButton.disabled = true;
    }

    // Check for last Page
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
    const namesData = await response.json();

    // Update the names table with the filtered data
    updateNamesTable(namesData);
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

      const idContainer = document.createElement('div');
      idContainer.className = 'idContainer';
      idContainer.textContent = element._id;

      dataContainer.appendChild(nameContainer);
      dataContainer.appendChild(sexContainer);
      dataContainer.appendChild(syllablesContainer);
      dataContainer.appendChild(idContainer);

      namesTable.appendChild(dataContainer);
    });
  }
});
