const unlockButton = doc.querySelector("#unlockBTN")
const textbox = doc.querySelector("#Wisdom")

const easterEggs = {
    "Oh, neko!": () => {
        console.log("NEKO TIME :3")
        oneko()
    },
    "the name is evil": () => {
        doc.querySelector(".forceCentertt").style.color = "red";
    },
    "giggledumm": () => {
        alert("That did... nothing.")
    },
    "rls": () => {
        localStorage.removeItem('oqQuotesFound');
    },
    "Vibe along and find out": () => {
        eeLoadTheme("themeEastereggs/aiSlop.css")
        alert("Vibecoded mode — ACTIVATE! And honestly? Thats vibes. ✨")
    },
    "Retro": () => {
        eeLoadTheme("themeEastereggs/retroslop.css")
        
    },
    "Atrocious": () => {
        eeLoadTheme("themeEastereggs/ugly.css")
        alert("goodluc")
    },
    "Embrace the simplicity": () => {
        eeLoadTheme("themeEastereggs/minimal.css")
        alert("mmm simplicity")
    },
    "...or will we?": () => {
        eeLoadTheme("themeEastereggs/maximalist.css")
        alert("mmm no")
    },
    "rt": () => {
        eeLoadTheme("style.css")
        
    },
    "secret quote": () => {
        mainQtext.textContent = `"Miggle giggle google dumm."`;
    }
};

function oneko() {
    if (document.getElementById("neko-script")) {
        return;
    }

    window.NekoType = "white";

    const originalWrite = document.write;

    document.write = (htmlString) => {
        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = htmlString;
        while (tempContainer.firstChild) {
            document.body.appendChild(tempContainer.firstChild);
        }
    };

    const nekoScript = document.createElement("script");
    nekoScript.id = "neko-script";
    nekoScript.src = "https://sleepie.uk/oneko.js"; //link
    
    nekoScript.onload = () => {
        document.write = originalWrite;
    };
    
    document.body.appendChild(nekoScript);
}

function eeLoadTheme(themePath) {
    const themeId = "eeTheme";
    let themeLink = document.getElementById(themeId);

    if (!themeLink) {
        console.warn("link doesnt exist.... creating one")
        themeLink = document.createElement("link");
        themeLink.id = themeId;
        themeLink.rel = "stylesheet";
        document.head.appendChild(themeLink);
    }
    
    themeLink.href = themePath;
}



function TOBWHandling() {
    console.log("start handling")
    const txtboxInput = textbox.value.trim();
    console.log(txtboxInput)

    if (easterEggs[txtboxInput]) {
        easterEggs[txtboxInput]();
        textbox.value = ""; 
    } else {
        console.log("not very lucky this time");
    }
}

unlockButton.addEventListener("click", TOBWHandling);