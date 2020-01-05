export class ArrayOfCards {
  constructor(cards = []) {
    this.cards = cards;
  }

  getTopCard() {
    return this.cards[this.cards.length - 1];
  }

  getCardAtIndex(index) {
    return this.cards[index];
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
}
