import { jsx } from '@emotion/core'; /** @jsx jsx */
import { FlexContainer, Image } from '../../../particles';
import { connect } from 'react-redux';
import * as actions from '../../../stores/actions';
import { MonsterNodePreview } from '../../modals/MapNodePreviewModal';
import { monsters } from '../../monsters/monsters';
import { mapCss } from './mapCss';

const genMapNodeImageSrc = (node) => {
  const { monsterId, eventId, isRevealed } = node;
  let image = 'rock';
  if (isRevealed) {
    if (typeof monsterId === 'number') {
      image = monsters[node.monsterId].image;
    } else if (eventId) {
      image = 'chest';
    }
  }
  
  return `/clash/${image}.png`;
};

const MapComponent = ({
  map,
  energy,
  previewMonsterId,
  previewEventId,
  openMapNodePreview,
  closeMapNodePreview,
  visitMapNode
}) => {
  let nodePreviewModal = null;

  if (typeof previewMonsterId === 'number') {
    nodePreviewModal = (
      <MonsterNodePreview
        monsterId={previewMonsterId}
        closeModal={() => closeMapNodePreview()}
      />
    );
  } else if (typeof previewEventId === 'number') {
    // nodePreviewModal = <EventNodePreview eventId={previewEventId} />;
  }

  return (
    <FlexContainer justifyContent='center' _css={mapCss}>
      <div className='map'>
        {map.map((row, y) => (
          row.map((node, x) => (
            <Image
              key={`${x}${y}`}
              className={`
                node
                ${node.isPlayerHere ? 'player_node' : ''}
                ${x === 3 && y === 3 ? 'starting_node' : ''}
              `}
              onClick={() => {
                if (node.isRevealed && !node.isPlayerHere) {
                  if ((node.monsterId === null && node.eventId === null) || node.isVisited) {
                    visitMapNode({ x, y });
                  } else {
                    openMapNodePreview({ x, y });
                  }
                }
              }}
              src={genMapNodeImageSrc(node)}
              width='100%'
              height='100%'
            />
          ))
        ))}
      </div>
      {nodePreviewModal}
    </FlexContainer>
  );
};

const mapStateToProps = (state) => ({
  map: state.clashMap.map,
  previewMonsterId: state.clashMap.previewMonsterId,
  previewEventId: state.clashMap.previewEventId,
});
const mapDispatchToProps = dispatch => ({
  openMapNodePreview: payload => dispatch(actions.openMapNodePreview(payload)),
  closeMapNodePreview: payload => dispatch(actions.closeMapNodePreview(payload)),
  visitMapNode: payload => dispatch(actions.visitMapNode(payload)),
});

export const Map = connect(mapStateToProps, mapDispatchToProps)(MapComponent);
