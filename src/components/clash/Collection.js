import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { cards } from './cards/cards';
import { Card } from './Card';
import { connect } from 'react-redux';
import * as actions from '../stores/actions';

const collectionCss = css`
  .title {
    font-size: 24px;
  }
`;

const CollectionComponent = ({
  collection,
  deck,
  setPlayerProperties
}) => {
  console.log('deck', deck.map(card => card.name));
  console.log('collection', collection.map(card => card.name));
  return (
    <div css={collectionCss}>
    </div>
  );
};

const mapStateToProps = (state) => ({
  deck: state.clashPlayers[state.clashPlayers.playerId].deck,
  collection: state.clashPlayers[state.clashPlayers.playerId].collection
});
const mapDispatchToProps = (dispatch) => ({
  setPlayerProperties: payload => dispatch(actions.setPlayerProperties(payload))
});

export const Collection = connect(mapStateToProps, mapDispatchToProps)(CollectionComponent);
