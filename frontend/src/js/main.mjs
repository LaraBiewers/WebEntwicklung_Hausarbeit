import './pagination.mjs';
import './changeContentHTML.mjs';
import './filter.mjs';
import { resetPageAndFetch } from './paginationButtons.mjs';
import { updateIndex } from './indexing.mjs';

document.addEventListener('DOMContentLoaded', (event) => {
  resetPageAndFetch();
  updateIndex();
});
