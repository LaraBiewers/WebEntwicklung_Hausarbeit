/// //
//  Communication with Backend
/// //

// Buttonfunktion: Kopiere Element von names nach watchlist
async function addToWatchlist (id) {
  const response = await fetch('/addToWatchlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });

  const data = await response.json();
  console.log(data);
}

// Buttonfunktion: Priorisiere Element von watchlist
async function prioriseElement (id) {
  const response = await fetch('/priorisingWatchlistElements', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
}

// Buttonfunktion: Lösche Element von watchlist
async function deleteFromWatchlist (id) {
  const response = await fetch('/deleteFromWatchlist', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
}

export { addToWatchlist, prioriseElement, deleteFromWatchlist };
