$(function () {
  let baseURL = 'https://deckofcardsapi.com/api/deck';
  let deckId = null;
  let $btn = $('button');
  let $cardArea = $('#card-area');

  function shuffleDeck() {
    $.getJSON(`${baseURL}/new/shuffle/`).then(data => {
      deckId = data.deck_id;
      $btn.text('Draw a Card').show();
      $cardArea.empty();  // Clear the card pile
    });
  }

  shuffleDeck();  // Shuffle the first deck on page load

  $btn.on('click', function () {
    $.getJSON(`${baseURL}/${deckId}/draw/`).then(data => {
      if (data.remaining === 0) {
        $btn.text('Restart Deck');
        shuffleDeck();  // Shuffle a new deck when cards run out
      } else {
        let cardSrc = data.cards[0].image;
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
    });
  });
});
