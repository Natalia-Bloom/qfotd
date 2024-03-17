// IMPRT THE JSON FILE CONATINING THE FACTS
import facts from './json/facts.json' assert {type: 'json'};

// CREATE THE FUNTIONS WHICH REFRESHES THE FACT EACH TIME
function reloadFact() {
    localStorage.clear()
    location.reload()
}

// THE MAIN FUNCTION OF THE APP
// HERE WE GET AND FILL THE DATA FOR THE HTML PAGE
function loadFact() {
    // GETTING THE HTML ELEMENTS:
    const htmlFactParagraph = document.getElementById("fact");
    const htmlFactSource = document.getElementById("fact-source");
    // GETTING THE CURRENT TIMESTAMP
    const currentDate = new Date().getTime()

    // CHECKING TO SEE IF THE DATA ALREADY EXISTS IN THE LOCAL STORAGE
    if(!localStorage.getItem("fact-content") || !localStorage.getItem("fact-source") || !localStorage.getItem("expiry-date")) {
        // IF IT DOESN'T WE CREATE IT BY CHOOSING A "RANDOM" ID FROM THE JSON ARRAY:
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        // const randomFact = facts[6];
        // AND WE GET THE EXPIRATION DAY FOR THE FACT BY ADDING TIME TO THE CURRENT TIMESTAMP FROM EARLIER:
        const expiryDate = new Date(Date.now() + (1000)).getTime()

        // WE SET THE DATA IN THE LOCAL STORAGE:
        localStorage.setItem("fact-content", randomFact.fact);
        localStorage.setItem("fact-source", randomFact.source);
        localStorage.setItem("expiry-date", expiryDate)
    }

    // WE GET THE DATA FROM THE LOCAL STORAGE:
    const factContent = localStorage.getItem("fact-content");
    const factSource = localStorage.getItem("fact-source");
    // WE TRIM THE SOURCE LINK TO DISPLAY IT ON THE HTML PAGE MORE CLEANLY:
    let factSourceTrimmed = factSource.split("//").pop().split('/')[0]
    const expiryDate = localStorage.getItem("expiry-date")

    // WE FILL THE HTML PAGE WITH THE DATA
    // FIRST IS THE FACT CONTENT:
    htmlFactParagraph.innerHTML = `${factContent}`;

    // AFTER THAT WE CHECK IF THE SOURCE IS AN ACTUAL SOURCE AND CONTAINS HTTPS IN THE URL:
    if(factSource.includes("https")) {
        // IF IT DOES, WE DISPLAY THE SOURCE AND SET THE LINK TO IT IN THE href PROPERTY, AS WELL AS IN THE title PROPERTY SO PEOPLE CAN SEE IT WITHOUT HAVING TO COPY AND PASTE IT TO MAKE SURE IT'S LEGIT
        htmlFactSource.href = `${factSource}`;
        htmlFactSource.title = `${factSource}`;
        htmlFactSource.innerHTML = `Source: ${factSourceTrimmed}`;
    } else {
        // IF IT ISN'T AN ACTUAL SOURCE WE DON'T SEND PEOPLE ANYWHERE
        htmlFactSource.href = "#";
        htmlFactSource.title = `${factSource}`;
        htmlFactSource.innerHTML = `Source: ${factSource}`;
    }
    
    // FINALLY, IF THE EXPIRATION DATE HAS PASSED WE REFRESH THE FACT:
    if(expiryDate < currentDate) {
        reloadFact()
    }
}

loadFact()