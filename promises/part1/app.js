let favNumber = 7;
let baseURL = "http://numbersapi.com";

// 1. Single fact about your favorite number
$.getJSON(`${baseURL}/${favNumber}?json`).then(data => {
  console.log(data);
  $("#facts-container").append(`<div class="fact">${data.text}</div>`);
});

// 2. Facts about multiple numbers
let favNumbers = [7, 11, 22];
$.getJSON(`${baseURL}/${favNumbers}?json`).then(data => {
  for (let key in data) {
    $("#facts-container").append(`<div class="fact">${data[key]}</div>`);
  }
});

// 3. Four facts about your favorite number
Promise.all(
  Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
).then(facts => {
  facts.forEach(data => {
    $("#facts-container").append(`<div class="fact">${data.text}</div>`);
  });
});
