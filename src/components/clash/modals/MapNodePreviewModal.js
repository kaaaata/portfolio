import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Modal } from './Modal';
import { Spacer, Image } from '../../particles';
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { monsters } from '../monsters/monsters';
import { shuffle, sampleSize, random } from 'lodash';

const MonsterNodePreviewComponent = ({
  monsterId,
  closeModal,
  player,
  energy,
  setBattleInitialState,
  setYourDeck,
  setBattleRewardCards,
  setBattleRewardGold,
  setEnemyDeck,
  setYourHand,
  setEnemyHand,
  setScene,
  adjustMapEnergy
}) => {
  const { name, image, level, deck } = monsters[monsterId];

  const fightOnClick = () => {
    if (energy >= 10) {
      setBattleInitialState({
        yourPermanentStats: {
          attack: player.attack,
          magic: player.magic,
          defense: player.defense
        },
        enemyName: name,
        enemyImage: image,
        enemyLevel: level,
        winner: null
      });
      const yourDeck = shuffle(player.deck);
      const enemyDeck = shuffle(deck);

      setYourDeck(yourDeck.slice(0, yourDeck.length - 3));
      // setEnemyDeck(enemyDeck.slice(0, enemyDeck.length - 3));
      setEnemyDeck([]); // testing
      setYourHand(yourDeck.slice(yourDeck.length - 3));
      setEnemyHand(enemyDeck.slice(enemyDeck.length - 3));
      setBattleRewardCards(sampleSize(enemyDeck, 4));
      setBattleRewardGold(25 * level + random(0, 25));
      setScene('battle');
      closeModal();
      adjustMapEnergy(-10);
    }
  };

  return (
    <Modal
      title={`${name} Lv. ${level}`}
      continueOptions={[
        { text: 'Fight', color: 'green', onClick: fightOnClick },
        { text: 'Go Back', color: 'red', onClick: closeModal },
      ]}
    >
      <Image
        src={`/clash/${image}.png`}
        height={200}
        width={200}
      />
      <Spacer height={40} />
      <div>Deck Size: {deck.length}</div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  map: state.clashMap.map,
  energy: state.clashMap.energy,
  previewMonsterId: state.clashMap.previewMonsterId,
  previewEventId: state.clashMap.previewEventId,
  player: state.clashPlayer
});
const mapDispatchToProps = dispatch => ({
  setBattleInitialState: payload => dispatch(actions.setBattleInitialState(payload)),
  setYourDeck: payload => dispatch(actions.setYourDeck(payload)),
  setBattleRewardCards: payload => dispatch(actions.setBattleRewardCards(payload)),
  setBattleRewardGold: payload => dispatch(actions.setBattleRewardGold(payload)),
  setEnemyDeck: payload => dispatch(actions.setEnemyDeck(payload)),
  setYourHand: payload => dispatch(actions.setYourHand(payload)),
  setEnemyHand: payload => dispatch(actions.setEnemyHand(payload)),
  setScene: payload => dispatch(actions.setScene(payload)),
  adjustMapEnergy: payload => dispatch(actions.adjustMapEnergy(payload))
});

export const MonsterNodePreview = connect(mapStateToProps, mapDispatchToProps)(MonsterNodePreviewComponent);
