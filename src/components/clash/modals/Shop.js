import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from './Modal';
import { Spacer } from '../../particles';
import { Card } from '../Card';
import { Gold } from '../Gold';
import { colors } from '../../styles';

const shopCss = css`
  border: 3px solid white;
  display: grid;
  grid-template-columns: 120px 120px 120px 120px;
  grid-gap: 40px;

  .continue {
    position: absolute;
    top: 525px;
    left: 850px;
  }
`;

const ShopComponent = ({
  playerId,
  player,
  shopCards,
  goToNextScene,
  setShopCards,
  setPlayerProperties
}) => {
  const buyCard = (card, index) => {
    if (player.gold >= card.cost) {
      setPlayerProperties({
        id: playerId,
        properties: {
          gold: player.gold - card.cost,
          collection: [...player.collection, card.name]
        }
      });
      setShopCards(shopCards.map((card, i) => i === index ? null : card));
    }
  };

  goToNextScene();

  return (
    <Modal title='Shop'>
      <div css={shopCss}>
        {shopCards.map((card, index) => card ? (
          <div key={index}>
            <Card
              name={card.name}
              onClick={() => buyCard(card, index)}
            />
            <Spacer height={10} />
            <Gold
              value={card.cost}
              color={player.gold >= card.cost ? colors.yellow : colors.red}
            />
          </div>
        ) : <div key={index} />)}
        <button className='continue' onClick={goToNextScene}>Continue</button>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  playerId: state.clashPlayers.playerId,
  player: state.clashPlayers[state.clashPlayers.playerId],
  shopCards: state.clashShop.cards
  // shopCards: genPackCards().map(card => ({ name: card, price: 100 }))
});
const mapDispatchToProps = (dispatch) => ({
  setPlayerProperties: payload => dispatch(actions.setPlayerProperties(payload)),
  setShopCards: payload => dispatch(actions.setShopCards(payload))
});

export const Shop = connect(mapStateToProps, mapDispatchToProps)(ShopComponent);
