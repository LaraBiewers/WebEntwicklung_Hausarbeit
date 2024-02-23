import './pagination.mjs';
import './changeContentHTML.mjs';
import './filter.mjs';
import { resetPageAndFetch } from './paginationButtons.mjs';

document.addEventListener('DOMContentLoaded', (event) => {
  resetPageAndFetch();
});
