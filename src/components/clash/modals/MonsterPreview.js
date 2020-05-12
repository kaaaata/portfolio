import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer } from '../../particles';
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { shuffle, sampleSize, random } from 'lodash';
import { genMonsterDeck } from '../monsters/genMonsterDeck';
import { EventModal } from '../town/EventModal';
import { Text } from '../Text';

const MonsterPreviewComponent = ({
  attack,
  magic,
  defense,
  deck,
  day,
  monster,
  setBattleInitialState,
  setYourDeck,
  setBattleRewardCards,
  setBattleRewardGold,
  setEnemyDeck,
  setYourHand,
  setEnemyHand,
  setScene
}) => {
  const yourDeck = shuffle(deck);
  const enemyDeck = genMonsterDeck(monster.deck, monster.tier, day);

  const battleOnClick = () => {
    setBattleInitialState({
      yourPermanentStats: { attack, magic, defense },
      enemyName: monster.name,
      enemyImage: monster.image,
      enemyTier: monster.tier
    });
    
    setYourDeck(yourDeck.slice(0, yourDeck.length - 3));
    // setYourDeck([]); // testing
    setEnemyDeck(enemyDeck.slice(0, enemyDeck.length - 3));
    // setEnemyDeck([]); // testing
    setYourHand(yourDeck.slice(yourDeck.length - 3));
    // setYourHand(['Bomb', 'Slice', 'Slice']); // testing
    setEnemyHand(enemyDeck.slice(enemyDeck.length - 3));
    setBattleRewardCards(sampleSize(enemyDeck, 3));
    setBattleRewardGold(25 * monster.tier + random(0, 25) + day * 3);
    setScene('battle');
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

const mapStateToProps = (state) => ({
  attack: state.clashPlayer.attack,
  magic: state.clashPlayer.magic,
  defense: state.clashPlayer.defense,
  deck: state.clashPlayer.deck,
  day: state.clashPlayer.day,
  monster: state.clashPlayer.monsterWaves[state.clashPlayer.day - 1]
});
const mapDispatchToProps = dispatch => ({
  setBattleInitialState: payload => dispatch(actions.setBattleInitialState(payload)),
  setYourDeck: payload => dispatch(actions.setYourDeck(payload)),
  setBattleRewardCards: payload => dispatch(actions.setBattleRewardCards(payload)),
  setBattleRewardGold: payload => dispatch(actions.setBattleRewardGold(payload)),
  setEnemyDeck: payload => dispatch(actions.setEnemyDeck(payload)),
  setYourHand: payload => dispatch(actions.setYourHand(payload)),
  setEnemyHand: payload => dispatch(actions.setEnemyHand(payload)),
  setScene: payload => dispatch(actions.setScene(payload))
});

export const MonsterPreview = connect(mapStateToProps, mapDispatchToProps)(MonsterPreviewComponent);
