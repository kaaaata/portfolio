import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { shuffle, sampleSize, random } from 'lodash';
import { genMonsterDeck } from '../monsters/genMonsterDeck';
import { EventModal } from '../town/EventModal';
import { Text } from '../Text';

export const MonsterPreview = () => {
  const { deck, day, monster } = useSelector(state => ({
    deck: state.clashPlayer.deck,
    day: state.clashPlayer.day,
    monster: state.clashPlayer.monsterWaves[state.clashPlayer.day - 1]
  }));
  const dispatch = useDispatch();
  
  const yourDeck = shuffle(deck);
  const enemyDeck = genMonsterDeck(monster.deck, monster.tier, day);

  const battleOnClick = () => {
    dispatch(actions.setBattleInitialState());
    dispatch(actions.setEnemy({ name: monster.name, image: monster.image }));
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
    dispatch(actions.setYourHand(['Elf', 'Minotaur', 'Slime Potion'])); // testing
    dispatch(actions.setEnemyHand(enemyDeck.slice(enemyDeck.length - 3)));
    // dispatch(actions.setEnemyHand(['Elf', 'Minotaur', 'Slime Potion'])); // testing
    dispatch(actions.setBattleRewardCards(sampleSize(enemyDeck, 3)));
    dispatch(actions.setBattleRewardGold(25 * monster.tier + random(0, 25) + day * 3));
    dispatch(actions.setScene('battle'));
  };
  // battleOnClick(); // testing

  const indefiniteArticle = /a|e|i|o|u/i.test(monster.name[0]) ? 'an' : 'a';
  let daySuffix = 'th';
  if (day === 1) {
    daySuffix = 'st';
  } else if (day === 2) {
    daySuffix = 'nd';
  } else if (day === 3) {
    daySuffix = 'rd';
  }

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
      title={`It's the end of the ${day}${daySuffix} day.`}
      image={monster.image}
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
