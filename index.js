const doc = document;
const mainQtext = doc.querySelector("#MAINQUOTE");
const btn = doc.querySelector("#nquote");
const tags = doc.querySelector("#tagDiv");
const tobwbtnUnlock = doc.querySelector("#unlockBTN");
const TOBWhelpmenuthing = doc.querySelector("#helpBtn");
const suggestQuoteButton = doc.querySelector("#addquote");
const copyQuoteBTN = doc.querySelector("#copyQuote");
const copyDailyQuoteBTN = doc.querySelector("#copyDailyQuote");
const quoteIDField = doc.querySelector("#quoteID");
const newQuoteIndicator = doc.querySelector("#newObtainedQuote");
const dailyQuoteField = doc.querySelector("#dailyQuoteText");

let quotes = [];

fetch("allQuotes.json")
  .then(res => res.json())
  .then(data => {
    quotes = data;
    displayDailyQuote();
    getARandomQuotething();
  })
  .catch(err => console.log("json didnt load Not good"));

function calculateDailyQuote(quoteArray) {
  if (!quoteArray || quoteArray.length === 0) return null;
  const DEBUGDateOffset = 0

  const thisIsToday = new Date();
  const dailyID = (thisIsToday.getFullYear() * 10000) + ((thisIsToday.getMonth() + 1) * 100) + (thisIsToday.getDate()+DEBUGDateOffset);
  const dailyIndex = dailyID % quoteArray.length;
    
  return quoteArray[dailyIndex];
}

function displayDailyQuote() {
  const dailyQuote = calculateDailyQuote(quotes);
  const dailyQuoteInfoField = doc.querySelector("#dailyQuoteInformation")
  if (dailyQuote && dailyQuoteField) {
    dailyQuoteField.textContent = `"${dailyQuote.text}" ${dailyQuote.author}`;
    dailyQuoteInfoField.textContent = `#${dailyQuote.id} | ${dailyQuote.tags}`
  }
}

function getARandomQuotething() {

    if (newQuoteIndicator) {
      newQuoteIndicator.style.display = "none";
    }

    const mRand = Math.random();
    const randomValue = Math.floor(mRand * quotes.length);
    const lequote = quotes[randomValue];

    mainQtext.textContent = `"${lequote.text}" ${lequote.author}`;
    quoteIDField.textContent = `Quote #${lequote.id}`;
    doc.title = `"${lequote.text}" ${lequote.author} | #${lequote.id}`;
    
    let foundQuotes = JSON.parse(localStorage.getItem("oqQuotesFound")) || [];
    if (!foundQuotes.includes(lequote.id)) {
      foundQuotes.push(lequote.id);
      localStorage.setItem("oqQuotesFound", JSON.stringify(foundQuotes));
      
      if (newQuoteIndicator) {
        newQuoteIndicator.style.display = "flex";
      }
    } else {
      if (newQuoteIndicator) {
        newQuoteIndicator.style.display = "none";
      }
    }
}

function showTOBWContentMenu() {
  console.log("debug -- I was clicked me being the help button");
  const tbOWHelpcard = doc.querySelector(".div1.info-box");

  if (tbOWHelpcard.style.display === "none") {
      tbOWHelpcard.style.display = "flex";
  } else {
      tbOWHelpcard.style.display = "none"; 
  }
}

function TOBWHandling() {
  console.log("start handling txtbox")
  const textbox = doc.querySelector("#Wisdom")
  const possibleTextboxVal = textbox.value;
  console.log(possibleTextboxVal)
}

function addQuoteButtonlogc() {
  window.open("https://forms.gle/bahfkGZrt6YiMHud6", "_blank");
}

async function copyQuote() {
  const quoteToBeCopied = mainQtext.textContent.trim();
  console.log(quoteToBeCopied);

  try {
    await navigator.clipboard.writeText(quoteToBeCopied);
    console.log("successfully copied");
  } catch (err) {
    alert("failed to copy to clipboard. TRY checking clipboard perms");
  }
}

async function copydailyQuote() {
  const quoteToBeCopied = dailyQuoteField.textContent.trim();
  console.log(quoteToBeCopied);

  try {
    await navigator.clipboard.writeText(quoteToBeCopied);
    console.log("successfully copied");
  } catch (err) {
    alert("failed to copy to clipboard. TRY checking clipboard perms");
  }
}

showTOBWContentMenu();
btn.addEventListener("click", getARandomQuotething);
copyQuoteBTN.addEventListener("click", copyQuote);
copyDailyQuoteBTN.addEventListener("click", copydailyQuote);
TOBWhelpmenuthing.addEventListener("click", showTOBWContentMenu);
