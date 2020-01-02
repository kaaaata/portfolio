export class ArrayOfCards {
  constructor(cards) {
    this.cards = [...cards];
  }

  getTopCard() {
    return this.cards[this.cards.length - 1];
  }

  removeTopCard() {
    return this.cards.pop();
  }

  addCardToTop(card) {
    this.cards.push(card);
    return this.cards;
  }
}
