import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { shuffle, sampleSize, random } from 'lodash';
import { genMonsterDeck } from '../monsters/genMonsterDeck';
import { EventModal } from '../town/EventModal';
import { Text } from '../Text';
import { cards } from '../cards/cards';

export const MonsterPreview = ({ title, monsterOverride }) => {
  const { deck, day, monster } = useSelector(state => ({
    deck: state.clashPlayer.deck,
    day: state.clashTown.day,
    monster: monsterOverride || state.clashTown.monsterWaves[state.clashTown.day - 1]
  }), shallowEqual);
  const dispatch = useDispatch();
  
  const isMonsterElite = monster.type === 'elite';
  const yourDeck = shuffle(deck);
  const enemyDeck = genMonsterDeck(monster.deck, monster.tier, day, isMonsterElite);
  const enemyHueRotate = isMonsterElite ? random(90, 270) : null;

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
    dispatch(actions.setYourDeck([])); // testing
    dispatch(actions.setEnemyDeck(enemyDeck.slice(0, enemyDeck.length - 3)));
    // dispatch(actions.setEnemyDeck([])); // testing
    dispatch(actions.setYourHand(yourDeck.slice(yourDeck.length - 3)));
    dispatch(actions.setYourHand(['Elf', 'Minotaur', 'Slime Potion'])); // testing
    dispatch(actions.setEnemyHand(enemyDeck.slice(enemyDeck.length - 3)));
    // dispatch(actions.setEnemyHand(['Elf', 'Minotaur', 'Slime Potion'])); // testing
    dispatch(actions.setBattleRewardCards(
      sampleSize(isMonsterElite
        ? enemyDeck.filter(card => cards[card].rarity !== 'common')
        : enemyDeck
      , 3)
    ));
    dispatch(actions.setBattleRewardGold(
      75
      + 15 * (monster.tier + isMonsterElite ? 1 : 0)
      + 3 * (day + isMonsterElite ? 3 : 0)
      + random(0, 15)
    ));
    dispatch(actions.setScene('battle'));
  };
  // battleOnClick(); // testing

  const indefiniteArticle = /a|e|i|o|u/i.test(monster.name[0]) ? 'an' : 'a';

  const text = (
    <Text type='paragraph'>
      You are attacked by {indefiniteArticle} {monster.name}!
      <br /><br />
      Enemy's deck size: {enemyDeck.length}
      <br />
      Your deck size: {yourDeck.length}
    </Text>
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
          options: [{
            name: 'Continue',
            onClick: battleOnClick
          }]
        }
      ]}
    />
  );
};
