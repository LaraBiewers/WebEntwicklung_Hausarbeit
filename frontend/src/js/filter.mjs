import { setCurrentPage } from './pagination.mjs';

document.getElementById('sex').addEventListener('change', filterChanged);
document.getElementById('prefix').addEventListener('input', filterChanged);
document.getElementById('notPrefix').addEventListener('input', filterChanged);
document.getElementById('suffix').addEventListener('input', filterChanged);
document.getElementById('notSuffix').addEventListener('input', filterChanged);
document.getElementById('syllables').addEventListener('input', filterChanged);

function filterChanged () {
  setCurrentPage(1);
}
