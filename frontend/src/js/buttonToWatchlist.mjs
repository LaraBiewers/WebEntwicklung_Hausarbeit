// Event-Listener für die Button-Klasse addToMerkliste
document.querySelectorAll('.addToMerkliste').forEach((button) => {
  button.addEventListener('click', () => {
    // zugehörige ID des <li> Elements
    const id = button.parentElement.parentElement.id;
    addToWatchlist(id);
  });
});

async function addToWatchlist (id) {
  const response = await fetch('/addToWatchlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
