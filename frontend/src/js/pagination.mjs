const pageSize = 10;
let currentPage = 1;
// const totalPages = 0; // Nacher dann datensatz/pageSize
document.addEventListener('DOMContentLoaded', (event) => {
  loadTable(currentPage);

  const nextButton = document.getElementById('next');
  const prevButton = document.getElementById('previous');
  const firstButton = document.getElementById('first');
  // const lastButton = document.getElementById('last');
  nextButton.addEventListener('click', nextPage);
  prevButton.addEventListener('click', previousPage);
  firstButton.addEventListener('click', firstPage);

  function nextPage () {
    currentPage++;
    loadTable(currentPage);
    checkPageForButtonDisable();
  }

  function previousPage () {
    currentPage--;
    loadTable(currentPage);
    checkPageForButtonDisable();
  }

  function firstPage () {
    currentPage = 1;
    loadTable(currentPage);
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

  async function loadTable (currentPage) {
    const skipValue = (currentPage - 1) * pageSize;
    const response = await fetch(`/names/?skip=${skipValue}&limit=${pageSize}`);
    const namesData = await response.json();
    console.log(namesData);

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
