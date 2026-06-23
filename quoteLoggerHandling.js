
const localStorageStoredItems = JSON.parse(localStorage.getItem('oqQuotesFound')) || [];
const sortedLSArray = localStorageStoredItems.sort((a, b) => a - b);
const sortedLSArrayLength = sortedLSArray.length
const quoteStatistic = document.querySelector("#quoteStat");



console.log(sortedLSArray);
console.log(sortedLSArrayLength);

async function getHighestId() {
  const response = await fetch('allQuotes.json');
  const quotesArray = await response.json();
  const highestId = Math.max(...quotesArray.map(q => q.id));
  console.log(highestId);

  const discoveredCount = sortedLSArrayLength;
  const percentage = Math.round((discoveredCount / highestId) * 100);

   quoteStatistic.textContent = `${discoveredCount}/${highestId} - ${percentage}%`;
}

getHighestId();

async function renderQuotesList() {
  const response = await fetch('allQuotes.json');
  const allQuotes = await response.json();
  
  const unlockedIds = JSON.parse(localStorage.getItem('oqQuotesFound')) || [];
  
  const container = document.getElementById('quotesContainer');
  container.innerHTML = ''; 

  allQuotes.forEach(quote => {
    const isUnlocked = unlockedIds.includes(quote.id);

    if (isUnlocked) {
      container.innerHTML += `
        <div class="parentQB">
          <p><img src="faviconcool.png" width="10px" alt="white square"> #${quote.id}</p>
          <h1 class="fancyQuoteStuff">"${quote.text}"</h1>
          <p class="qbH1">${quote.author}</p>
          <div class="qbVer">
            <button class="genericButton ALTBTN flalign" id="quoteInfo-${quote.id}" data-author="${quote.author}">about author</button>
            
          </div>
        </div>`;
    } else {
        return
    }
  });
}

document.body.addEventListener('click', function(event) {
  if (event.target && event.target.matches('[id^="quoteInfo-"]')) {
    const authorName = event.target.getAttribute('data-author');
    window.location.href = `aboutAuthor.html?author=${encodeURIComponent(authorName)}`;
  }
});

renderQuotesList();

