const doc = document;
const aAimage = doc.querySelector("#aboutAuthorIMG");
const aAHeader = doc.querySelector("#aboutAuthorNAME");
const aADesc = doc.querySelector("#aboutAuthorDESC");
async function loadAndDisplayQDetails(aName) {
  try {
    const response = await fetch('aboutAuthorInfo.json');
    if (!response.ok) {
      throw new Error(`couldnt fetch: ${response.statusText}`);
    }
    
    const authors = await response.json();
    const authorData = authors.find(auth => auth.name.toLowerCase() === aName.toLowerCase());

    if (authorData) {
      if (aAHeader) aAHeader.textContent = authorData.name;
      if (aADesc) aADesc.textContent = authorData.desc;
      if (aAimage) {
        aAimage.src = authorData.imgAsset;
        aAimage.alt = `image of ${authorData.name}`;
      }
    } else {
      console.warn(`this "${aName}" not found in the dataset.`);
    }
  } catch (error) {
    console.error("error loading details:", error);
  }
}

doc.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const authorN = urlParams.get('author');

  if (authorN) {
    console.log("author param:", authorN);
    

    const cleanedAuthN = authorN.replace(/^-?\s*/, "").trim();
    console.log("clean name:", cleanedAuthN);
    
    loadAndDisplayQDetails(cleanedAuthN);
  } else {
    console.log("no author id param got");
  }
});


const wikiBtn = document.querySelector("#wikiButton");
const authorHeader = document.querySelector("#aboutAuthorNAME");

if (wikiBtn) {
  wikiBtn.addEventListener("click", () => {
    if (!authorHeader || !authorHeader.textContent.trim()) {
      console.warn("no instance");
      return;
    }
    let authorName = authorHeader.textContent.trim();
    authorName = authorName.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F200}-\u{1F2FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
    authorName = authorName.trim();
    const encodedName = encodeURIComponent(authorName);
    const wikiUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodedName}&go=Go&ns0=1`;
    window.open(wikiUrl, "_blank", "noopener,noreferrer");
  });
}