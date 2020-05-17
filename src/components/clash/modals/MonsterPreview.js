import React, { useEffect } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { shuffle, sampleSize, random } from 'lodash';
import { genMonsterDeck } from '../monsters/genMonsterDeck';
import { EventModal } from '../town/EventModal';
import { cards } from '../cards/cards';
import { rarityColors } from '../cards/rarity';

export const MonsterPreview = ({ title, monsterOverride, closeModal }) => {
  const { deck, day, monster } = useSelector(state => ({
    deck: state.clashPlayer.deck,
    day: state.clashTown.day,
    monster: monsterOverride || state.clashTown.monsterWaves[state.clashTown.day - 1]
  }), shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setCanVisitShop(false));
  });

  const isMonsterElite = monster.type === 'elite';
  const yourDeck = shuffle(deck);
  const enemyDeck = genMonsterDeck(monster.deck, monster.tier, day, isMonsterElite);
  const enemyHueRotate = isMonsterElite ? random(90, 270) : null;
  const battleRewardGold = (
    (monster.type === 'event' ? 25 : 75)
    + 15 * (monster.tier + isMonsterElite ? 1 : 0)
    + 3 * (day + isMonsterElite ? 3 : 0)
    + random(0, 15)
  );

  const battleOnClick = () => {
    dispatch(actions.setBattleInitialState());
    dispatch(actions.setEnemy({
      name: monster.name,
      image: monster.image,
      type: monster.type,
      hueRotate: enemyHueRotate
    }));
    dispatch(actions.setStats({
      stats: monster.stats,
      type: 'stats',
      player: 'enemy',
      operation: 'set'
    }));
    dispatch(actions.setYourDeck(yourDeck.slice(0, yourDeck.length - 3)));
    // dispatch(actions.setYourDeck([])); // testing
    dispatch(actions.setEnemyDeck(enemyDeck.slice(0, enemyDeck.length - 3)));
    dispatch(actions.setEnemyDeck([])); // testing
    dispatch(actions.setYourHand(yourDeck.slice(yourDeck.length - 3)));
    // dispatch(actions.setYourHand(['Brawler', 'Magic Potion', 'Spearman'])); // testing
    dispatch(actions.setEnemyHand(enemyDeck.slice(enemyDeck.length - 3)));
    // dispatch(actions.setEnemyHand(['Minotaur', 'Minotaur', 'Minotaur'])); // testing
    dispatch(actions.setBattleRewardCards(
      sampleSize(isMonsterElite
        ? enemyDeck.filter(card => cards[card].rarity !== 'common')
        : enemyDeck
      , 3)
    ));
    dispatch(actions.setBattleRewardGold(battleRewardGold));
    dispatch(actions.setScene('battle'));
  };
  // battleOnClick(); // testing

  const genRarityString = (_cards) => {
    const rarityCounts = { common: 0, uncommon: 0, rare: 0, legendary: 0 };
    _cards.forEach(card => {
      rarityCounts[cards[card].rarity]++;
    });

    return (
      <React.Fragment>
        ({rarityCounts.legendary} <span className={rarityColors.legendary}>legendary</span>,&nbsp;
        {rarityCounts.rare} <span className={rarityColors.rare}>rare</span>,&nbsp;
        {rarityCounts.uncommon} <span className={rarityColors.uncommon}>uncommon</span>,&nbsp;
        {rarityCounts.common} <span className={rarityColors.common}>common</span>)
      </React.Fragment>
    );
  };

  const indefiniteArticle = /a|e|i|o|u/i.test(monster.name[0]) ? 'an' : 'a';

  const text = (
    <React.Fragment>
      You are attacked by {indefiniteArticle} <span className='yellow'>{monster.name}!</span>
      <br /><br />
      Enemy cards: {enemyDeck.length} {genRarityString(enemyDeck)}
      <br />
      Your cards: {yourDeck.length} {genRarityString(yourDeck)}
      <br /><br />
      Victory: <span className='green'>gain {battleRewardGold} gold</span> and <span className='green'>2 cards from the enemy's deck</span>
      <br />
      Defeat: <span className='red'>lose {Math.floor(battleRewardGold / 4)} gold</span>
    </React.Fragment>
  );

  return (
    <EventModal
      title={title}
      image={monster.image}
      imageProps={enemyHueRotate ? { filter: `hue-rotate(${enemyHueRotate}deg)` } : null}
      page={1}
      pages={[
        {
          text,
          options: [
            {
              name: 'Fight',
              onClick: battleOnClick
            },
            {
              name: 'Retreat',
              isDisabled: monster.type === 'wave',
              badText: monster.type === 'wave' ? 'Can\'t retreat from a day battle!' : '',
              onClick: () => {
                closeModal();
                dispatch(actions.setCanVisitShop(true));
              }
            }
          ]
        }
      ]}
    />
  );
};
