import { fetchNamesFromNames } from './namesTable.mjs';
import { fetchNamesFromWatchlist } from './watchlist.mjs';

let pageSize = 10;
let currentPage = 1;
let totalPageCount = 99;
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
    console.log(`${newValue} out of range, totalPages = ${newValue}, set to first page`);
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

export function setPageSize (newValue) {
  pageSize = newValue;
}

export function toggleWatchlist () {
  isWatchlistActive = !isWatchlistActive;
}
