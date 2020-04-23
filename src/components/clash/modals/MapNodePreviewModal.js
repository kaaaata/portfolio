import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Modal } from './Modal';
import { Spacer, Image } from '../../particles';
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { shuffle, sampleSize, random } from 'lodash';

const MonsterNodePreviewComponent = ({
  monster,
  player,
  energy,
  previewNode,
  setMapActiveNode,
  setMapPreviewNode,
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
  const { name, image, tier, deck } = monster;

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
        enemyTier: tier,
        winner: null
      });
      const yourDeck = shuffle(player.deck);
      const enemyDeck = deck;

      setYourDeck(yourDeck.slice(0, yourDeck.length - 3));
      setEnemyDeck(enemyDeck.slice(0, enemyDeck.length - 3));
      setEnemyDeck([]); // testing
      setYourHand(yourDeck.slice(yourDeck.length - 3));
      setEnemyHand(enemyDeck.slice(enemyDeck.length - 3));
      setBattleRewardCards(sampleSize(enemyDeck, 4));
      setBattleRewardGold(25 * tier + random(0, 25));
      setScene('battle');
      setMapActiveNode(previewNode);
      setMapPreviewNode(null);
      adjustMapEnergy(-10);
    }
  };

  return (
    <Modal
      title={`${name} (Tier ${tier})`}
      continueOptions={[
        { text: 'Fight', color: 'green', onClick: fightOnClick },
        { text: 'Go Back', color: 'red', onClick: () => setMapPreviewNode(null) },
      ]}
    >
      <Image
        src={`/clash/${image}.png`}
        height={200}
        width={200}
        size='contain'
      />
      <Spacer height={40} />
      <div>Deck Size: {deck.length}</div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  energy: state.clashMap.energy,
  player: state.clashPlayer,
  previewNode: state.clashMap.previewNode
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
  adjustMapEnergy: payload => dispatch(actions.adjustMapEnergy(payload)),
  setMapPreviewNode: payload => dispatch(actions.setMapPreviewNode(payload)),
  setMapActiveNode: payload => dispatch(actions.setMapActiveNode(payload))
});

export const MonsterNodePreview = connect(mapStateToProps, mapDispatchToProps)(MonsterNodePreviewComponent);
