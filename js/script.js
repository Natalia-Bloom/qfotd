import facts from './json/facts.json' assert {type: 'json'};

function reloadFact() {
    localStorage.clear()
    location.reload()
}

function loadFact() {
    const htmlFactParagraph = document.getElementById("fact");
    const htmlFactSource = document.getElementById("fact-source");
    const currentDate = new Date().getTime()

    if(!localStorage.getItem("fact-content") || !localStorage.getItem("fact-source") || !localStorage.getItem("expiry-date")) {
        // const randomFact = facts[Math.floor(Math.random() * facts.length)];
        const randomFact = facts[46];
        const expiryDate = new Date(Date.now() + (1000)).getTime()

        localStorage.setItem("fact-content", randomFact.fact);
        localStorage.setItem("fact-source", randomFact.source);
        localStorage.setItem("expiry-date", expiryDate)
    }

    const factContent = localStorage.getItem("fact-content");
    const factSource = localStorage.getItem("fact-source");
    let factSourceTrimmed = factSource.split("//").pop().split('/')[0]
    const expiryDate = localStorage.getItem("expiry-date")

    htmlFactParagraph.innerHTML = `${factContent}`;
    htmlFactSource.href = `${factSource}`;
    htmlFactSource.title = `${factSource}`;
    htmlFactSource.innerHTML = `Source: ${factSourceTrimmed}`;

    if(expiryDate < currentDate) {
        reloadFact()
    }
}

function resposiveText() {
    const screenWidth = screen.width;
    const screenHeight = screen.height;

    const factSection = document.getElementById("content-section");
    const footerSection = document.getElementById("footer");

    const titleText = document.getElementById("title");
    const factText = document.getElementById("fact");
    const sourceText = document.getElementById("fact-source");
    const versionText = document.getElementById("app-version");
    const creditsText = document.getElementById("credits");
    const linkImage = document.getElementById("tumblr-icon");
    
    if(screenWidth >= screenHeight) {
        titleText.style.fontSize = "2.8vw";
        factText.style.fontSize = "1.2vw";
        sourceText.style.fontSize = "1vw";
        versionText.style.fontSize = "0.8vw";
        creditsText.style.fontSize = "0.8vw";
        linkImage.style.height = "1vw";

        factSection.style.padding = "3rem 1.5rem 1rem";
        footerSection.style.padding = "0.6rem 1.5rem";
    } else if(screenWidth < screenHeight) {
        titleText.style.fontSize = "6vw";
        factText.style.fontSize = "3vw";
        sourceText.style.fontSize = "2.5vw";
        versionText.style.fontSize = "2vw";
        creditsText.style.fontSize = "2vw";
        linkImage.style.height = "2vw";

        factSection.style.padding = "3rem 0.2rem 1rem";
        footerSection.style.padding = "1.2rem 1.5rem";
    }
}

loadFact()
resposiveText()