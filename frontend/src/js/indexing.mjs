import { getCurrentPage, getTotalPageCount } from './pagination.mjs';

const first = document.getElementById('first-page-index');
const firstFill = document.getElementById('first-fill');
const current = document.getElementById('current-page');
const secondFill = document.getElementById('second-fill');
const total = document.getElementById('total-pages');

function updateIndex () {
  if (getCurrentPage() !== 1 && getCurrentPage() !== getTotalPageCount()) {
    first.style.display = 'block';
    firstFill.style.display = 'block';
    secondFill.style.display = 'block';
    total.style.display = 'block';
    current.textContent = getCurrentPage();
    total.textContent = getTotalPageCount();
  } else if (getCurrentPage() === 1 && getCurrentPage() === getTotalPageCount()) {
    first.style.display = 'none';
    firstFill.style.display = 'none';
    secondFill.style.display = 'none';
    total.style.display = 'none';
    current.textContent = getCurrentPage();
  } else if (getCurrentPage() === 1) {
    first.style.display = 'none';
    firstFill.style.display = 'none';
    secondFill.style.display = 'block';
    total.style.display = 'block';
    total.textContent = getTotalPageCount();
    current.textContent = getCurrentPage();
  } else { // last page
    first.style.display = 'block';
    firstFill.style.display = 'block';
    secondFill.style.display = 'none';
    total.style.display = 'none';
    current.textContent = getCurrentPage();
  }
}

export { updateIndex };
