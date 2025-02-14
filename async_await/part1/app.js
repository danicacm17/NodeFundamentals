let favNumber = 7;
let baseURL = "http://numbersapi.com";

async function getNumberFacts() {
  try {
    $("#facts-container").html('<p id="loading">Loading facts...</p>'); // Clear previous facts and show loading message

    // 1. Single fact about your favorite number
    let singleFact = await $.getJSON(`${baseURL}/${favNumber}?json`);
    $("#facts-container").append(`<div class="fact">${singleFact.text}</div>`);

    // 2. Facts about multiple numbers
    let favNumbers = [7, 11, 22];
    let multipleFacts = await $.getJSON(`${baseURL}/${favNumbers}?json`);
    for (let key in multipleFacts) {
      $("#facts-container").append(`<div class="fact">${multipleFacts[key]}</div>`);
    }

    // 3. Four facts about your favorite number
    let factPromises = Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`));
    let fourFacts = await Promise.all(factPromises);
    fourFacts.forEach(data => {
      $("#facts-container").append(`<div class="fact">${data.text}</div>`);
    });

  } catch (err) {
    console.error("Error fetching facts:", err);
    $("#facts-container").append(`<p class="error">Oops! Something went wrong. Please try again.</p>`);
  } finally {
    $("#loading").remove();
  }
}

// Initial load
getNumberFacts();

// Refresh button event listener
$("#refresh-btn").on("click", getNumberFacts);
