$(function () {
  let baseURL = 'https://deckofcardsapi.com/api/deck';
  let deckId = null;
  let $btn = $('button');
  let $cardArea = $('#card-area');

  async function shuffleDeck() {
    try {
      let response = await $.getJSON(`${baseURL}/new/shuffle/`);
      deckId = response.deck_id;
      $btn.text('Draw a Card').show();
      $cardArea.empty();  // Clear the card pile
      console.log('Deck shuffled!');
    } catch (err) {
      console.error('Error shuffling deck:', err);
    }
  }

  async function drawCard() {
    try {
      let response = await $.getJSON(`${baseURL}/${deckId}/draw/`);
      if (response.remaining === 0) {
        $btn.text('Restart Deck');
        await shuffleDeck();  // Shuffle a new deck when cards run out
      } else {
        let cardSrc = response.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardArea.append(
          $('<img>', {
            src: cardSrc,
            css: {
              transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
            }
          })
        );
      }
    } catch (err) {
      console.error('Error drawing card:', err);
    }
  }

  // Shuffle the first deck on page load
  shuffleDeck();

  // Handle button click to draw a card
  $btn.on('click', drawCard);
});
