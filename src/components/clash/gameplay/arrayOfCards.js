import { sample } from 'lodash';

export class ArrayOfCards {
  constructor(cards = []) {
    this.cards = [...cards];
  }

  getTopCard() {
    return this.cards[this.cards.length - 1];
  }

  getCardAtIndex(index) {
    return this.cards[index];
  }

  getRandomCardByFilter(filterFunc) {
    const possibleCards = this.cards.filter(filterFunc);
    return sample(possibleCards);
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

  addCardAtRandomIndex(card) {
    const index = Math.floor(Math.random() * this.cards.length);
    this.cards.splice(index, 0, card);
    return this.cards;
  }
}
