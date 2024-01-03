const pageSize = 10;
const currentPage = 1;
// const totalPages = 0; // Nacher dann datensatz/pageSize
loadTable(currentPage);

async function loadTable (currentPage) {
  const skipValue = (currentPage - 1) * pageSize;
  const response = await fetch(`http://localhost:8080/names/?skip=${skipValue}&limit=${pageSize}`); // TODO 8080 muss Variable sein!
  const namesData = await response.json();
  console.log(namesData);

  const container = document.getElementById('Datenbankdaten');
  const namesTable = document.createElement('ol');

  namesData.forEach(element => {
    const dataContainer = document.createElement('li');
    dataContainer.className = 'dataContainer';

    const nameContainer = document.createElement('div');
    nameContainer.className = 'nameContainer';
    nameContainer.textContent = element.name;

    const sexContainer = document.createElement('div');
    sexContainer.className = 'sexContainer';
    sexContainer.textContent = element.geschlecht;

    dataContainer.appendChild(nameContainer);
    dataContainer.appendChild(sexContainer);

    namesTable.appendChild(dataContainer);
  });
  container.append(namesTable);
}
