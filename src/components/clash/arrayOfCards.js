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

  removeCardAtIndex(index) {
    const removedCard = this.cards.splice(index, 1);
    return removedCard;
  }

  addCardToTop(card) {
    this.cards.push(card);
    return this.cards;
  }

  addCardAtIndex(card, index) {
    this.cards.splice(index, 0, card);
    return this.cards;
  }
}
