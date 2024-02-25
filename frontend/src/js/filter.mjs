import { setCurrentPage, setPageSize, getPageSize } from './pagination.mjs';

document.getElementById('sex').addEventListener('change', filterChanged);
document.getElementById('prefix').addEventListener('input', filterChanged);
document.getElementById('notPrefix').addEventListener('input', filterChanged);
document.getElementById('suffix').addEventListener('input', filterChanged);
document.getElementById('notSuffix').addEventListener('input', filterChanged);
document.getElementById('syllables').addEventListener('input', filterChanged);
document.getElementById('prio').addEventListener('change', filterChanged);
document.getElementById('namesShown').addEventListener('input', changePageSize);

function filterChanged () {
  setCurrentPage(1);
}

const pageSizeButton = document.getElementById('pageS');
pageSizeButton.value = `${getPageSize()}`;

function changePageSize () {
  const newPageSize = document.getElementById('pageS').value;
  setPageSize(newPageSize);
  filterChanged();
}
