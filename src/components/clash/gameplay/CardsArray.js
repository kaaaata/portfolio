import { sample } from 'lodash';
import { cards } from '../cards/cards';

export const CardsArray = (_cards, properties) => {
  const arr = _cards.map(card => ({
    ...(typeof card === 'string' ? cards[card] : card),
    ...properties
  }));

  arr.getTopCard = () => arr[arr.length - 1];

  arr.getRandomCard = () => sample(arr);

  arr.getRandomCardByFilter = (filterFunc) => sample(arr.filter(filterFunc));

  arr.getCardNames = () => arr.map(card => card.name);

  arr.removeTopCard = () => arr.pop();

  arr.removeCardAtIndex = (index) => arr.splice(index, 1)[0];

  arr.addCardToTop = (card) => {
    arr.push(card);
    return arr;
  };

  arr.addCardAtRandomIndex = (card) => {
    const index = ~~(Math.random() * arr.length);
    arr.splice(index, 0, card);
    return arr;
  };

  return arr;
};
