import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Modal } from './Modal';
import { Spacer, Image } from '../../particles';
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { shuffle, sampleSize, random } from 'lodash';
import { genMonsterDeck } from '../monsters/genMonsterDeck';

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

  const fightOnClick = () => {
    setBattleInitialState({
      yourPermanentStats: { attack, magic, defense },
      enemyName: monster.name,
      enemyImage: monster.image,
      enemyTier: monster.tier
    });
    
    setYourDeck(yourDeck.slice(0, yourDeck.length - 3));
    // setYourDeck(['Bomb', 'Bomb']); // testing
    setEnemyDeck(enemyDeck.slice(0, enemyDeck.length - 3));
    // setEnemyDeck([]); // testing
    setYourHand(yourDeck.slice(yourDeck.length - 3));
    // setYourHand(['Weapons Guy', 'Catherine the Great', 'Magic Scroll']); // testing
    setEnemyHand(enemyDeck.slice(enemyDeck.length - 3));
    setBattleRewardCards(sampleSize(enemyDeck, 4));
    setBattleRewardGold(25 * monster.tier + random(0, 25) + day * 3);
    setScene('battle');
  };

  return (
    <Modal
      title={`${monster.name} (Tier ${monster.tier})`}
      continueOptions={[{ text: 'Battle', color: 'green', onClick: fightOnClick }]}
    >
      <Image
        src={`/clash/${monster.image}.png`}
        height={200}
        width={200}
        size='contain'
      />
      <Spacer height={40} />
      <div>Deck Size: {enemyDeck.length}</div>
    </Modal>
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
