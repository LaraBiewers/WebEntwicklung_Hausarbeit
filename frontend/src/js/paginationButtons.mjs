import { fetchNamesFromNames } from './namesTable.mjs';
import { fetchNamesFromWatchlist } from './watchlist.mjs';
import { getCurrentPage, setCurrentPage, getTotalPageCount, toggleWatchlist, getIsWatchlistActive } from './pagination.mjs';

const nextButton = document.getElementById('next');
const prevButton = document.getElementById('previous');
const firstButton = document.getElementById('first');
const lastButton = document.getElementById('last');
const fullListButton = document.getElementById('Namensliste');
const watchListButton = document.getElementById('Merkliste');

nextButton.addEventListener('click', nextPage);
prevButton.addEventListener('click', previousPage);
firstButton.addEventListener('click', firstPage);
lastButton.addEventListener('click', lastPage);
fullListButton.addEventListener('click', toggleWatchlistAndReset);
watchListButton.addEventListener('click', toggleWatchlistAndReset);

function nextPage () {
  setCurrentPage(getCurrentPage() + 1);
  fetchAndUpdate();
}

function previousPage () {
  setCurrentPage(getCurrentPage() - 1);
  fetchAndUpdate();
}

function firstPage () {
  setCurrentPage(1);
  fetchAndUpdate();
}

function lastPage () {
  setCurrentPage(getTotalPageCount());
  fetchAndUpdate();
}

function checkPageForButtonDisable () {
  if (getCurrentPage() > 1) {
    prevButton.disabled = false;
    prevButton.style.backgroundColor = '#4C7326';
    firstButton.disabled = false;
    firstButton.style.backgroundColor = '#4C7326';
  } else {
    prevButton.disabled = true;
    prevButton.style.backgroundColor = 'grey';
    firstButton.disabled = true;
    firstButton.style.backgroundColor = 'grey';
  }

  if (getCurrentPage() >= getTotalPageCount()) {
    nextButton.disabled = true;
    nextButton.style.backgroundColor = 'grey';
    lastButton.disabled = true;
    lastButton.style.backgroundColor = 'grey';
  } else {
    nextButton.disabled = false;
    nextButton.style.backgroundColor = '#4C7326';
    lastButton.disabled = false;
    lastButton.style.backgroundColor = '#4C7326';
  }
}

function resetPageAndFetch () {
  setCurrentPage(1);
  fetchAndUpdate();
}

function fetchAndUpdate () {
  if (getIsWatchlistActive()) {
    fetchNamesFromWatchlist(getCurrentPage());
  } else {
    fetchNamesFromNames(getCurrentPage());
  }
}

function toggleWatchlistAndReset () {
  toggleWatchlist(); // Toggle the flag
  resetPageAndFetch(); // Reset the page and fetch the appropriate data
}

export { checkPageForButtonDisable, resetPageAndFetch };
