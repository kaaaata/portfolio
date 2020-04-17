import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Modal } from './Modal';
import { Spacer, FlexContainer, Filter, Image } from '../../particles';
import { colors } from '../../styles';
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { monsters } from '../monsters/monsters';
import { shuffle } from 'lodash';

const MonsterNodePreviewComponent = ({
  monsterId,
  closeModal,
  player,
  setBattleInitialState,
  setYourDeck,
  setEnemyDeck,
  setYourHand,
  setEnemyHand,
  setScene
}) => {
  const { name, image, tier, deck } = monsters[monsterId];

  const fightOnClick = () => {
    setBattleInitialState({
      yourPermanentStats: {
        attack: player.attack,
        magic: player.magic,
        defense: player.defense
      },
      enemyName: name,
      enemyImage: image,
      winner: null
    });
    const yourDeck = shuffle(player.deck);
    // const enemyDeck = shuffle(deck);
    const enemyDeck = []; // testing

    setYourDeck(yourDeck.slice(0, yourDeck.length - 3));
    setEnemyDeck(enemyDeck.slice(0, enemyDeck.length - 3));
    setYourHand(yourDeck.slice(yourDeck.length - 3));
    setEnemyHand(enemyDeck.slice(enemyDeck.length - 3));
    setScene('battle');
  };
  fightOnClick(); // testing

  return (
    <Modal
      title={`${name} Lv. ${tier}`}
      continueOptions={[
        { text: 'Fight', color: 'green', cb: fightOnClick },
        { text: 'Go Back', color: 'red', cb: closeModal },
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
  modalMonsterId: state.clashMap.modalMonsterId,
  modalEventId: state.clashMap.modalEventId,
  player: state.clashPlayer
});
const mapDispatchToProps = dispatch => ({
  setBattleInitialState: payload => dispatch(actions.setBattleInitialState(payload)),
  setYourDeck: payload => dispatch(actions.setYourDeck(payload)),
  setEnemyDeck: payload => dispatch(actions.setEnemyDeck(payload)),
  setYourHand: payload => dispatch(actions.setYourHand(payload)),
  setEnemyHand: payload => dispatch(actions.setEnemyHand(payload)),
  setScene: payload => dispatch(actions.setScene(payload))
});

export const MonsterNodePreview = connect(mapStateToProps, mapDispatchToProps)(MonsterNodePreviewComponent);
