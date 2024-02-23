import { fetchNamesFromNames } from './namesTable.mjs';
import { fetchNamesFromWatchlist } from './watchlist.mjs';

const pageSize = 10;
let currentPage = 1;
let totalPageCount = 0;
let isWatchlistActive = false;

/// //
//  Export-functions
/// //

export function getCurrentPage () {
  return currentPage;
}

export function getTotalPageCount () {
  return totalPageCount;
}

export function getPageSize () {
  return pageSize;
}

export function getIsWatchlistActive () {
  return isWatchlistActive;
}

export function setCurrentPage (newValue) {
  if (newValue > 0 && newValue <= totalPageCount) {
    currentPage = newValue;
  } else {
    console.log('Page out of range, set to first page');
    currentPage = 1;
  }
  // Call the appropriate fetch function based on whether the watchlist is active
  if (isWatchlistActive) {
    fetchNamesFromWatchlist(currentPage);
  } else {
    fetchNamesFromNames(currentPage);
  }
}

export function setTotalPageCount (newValue) {
  totalPageCount = newValue;
}

export function toggleWatchlist () {
  isWatchlistActive = !isWatchlistActive;
}
