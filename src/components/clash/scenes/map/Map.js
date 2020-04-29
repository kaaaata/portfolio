import { jsx } from '@emotion/core'; /** @jsx jsx */
import { FlexContainer, Image } from '../../../particles';
import { connect } from 'react-redux';
import * as actions from '../../../stores/actions';
import { MonsterNodePreview } from '../../modals/MapNodePreviewModal';
import { mapCss } from './mapCss';
import { range } from 'lodash';

const genMapNodeImageSrc = (node = {}) => {
  let image = 'rock';
  if (node.monster) {
    image = node.monster.image;
  } else if (node.event) {
    image = 'chest';
  }
  
  return `/clash/${image}.png`;
};

const MapComponent = ({
  nodes,
  previewNode,
  playerNode,
  setMapPreviewNode,
  visitActiveMapNode
}) => {
  let nodePreviewModal = null;

  if (previewNode) {
    if (nodes[previewNode].monster) {
      nodePreviewModal = (
        <MonsterNodePreview monster={nodes[previewNode].monster} />
      );
    } else if (nodes[previewNode].event) {
      // nodePreviewModal = <EventNodePreview eventId={previewEventId} />;
    }
  }

  console.log('mapcomponent rendering', {
    nodes,
    previewNode,
    playerNode,
    setMapPreviewNode,
    visitActiveMapNode
  });

  return (
    <FlexContainer justifyContent='center' _css={mapCss}>
      <div className='map'>
        {range(0, 7).map(y => (
          range(0, 7).map(x => {
            const node = `${x}${y}`;
            const isUnrevealedNode = !nodes[node];
            const isMonsterNode = nodes[node] && nodes[node].monster;
            const isEventNode = nodes[node] && nodes[node].event;
            const isBlankNode = nodes[node] && !isMonsterNode && !isEventNode;
            const isVisitedNode = nodes[node] && nodes[node].isVisited;
            const isPlayerNode = node === playerNode;

            return (
              <Image
                key={node}
                className={[
                  'node',
                  node === playerNode ? 'player_node' : '',
                  isBlankNode ? 'blank_node' : ''
                ].join(' ')}
                onClick={(isUnrevealedNode || isPlayerNode) ? null : () => {
                  if ((isMonsterNode || isEventNode) && !isVisitedNode) {
                    setMapPreviewNode(node);
                  } else if (nodes[node]) {
                    visitActiveMapNode(node);
                  }
                }}
                src={genMapNodeImageSrc(nodes[node])}
                width='100%'
                height='100%'
                size={isUnrevealedNode ? 'cover' : 'contain'}
                rgbaFilter={isVisitedNode ? 'rgba(0, 0, 0, 0.35)' : null}
              >
                {isVisitedNode && (isMonsterNode || isEventNode) && (
                  <div className='checkmark'>&#10003;</div>
                )}
              </Image>
            );
          })
        ))}
      </div>
      {nodePreviewModal}
    </FlexContainer>
  );
};

const mapStateToProps = (state) => ({
  nodes: state.clashMap.nodes,
  previewNode: state.clashMap.previewNode,
  playerNode: state.clashMap.playerNode
});
const mapDispatchToProps = dispatch => ({
  setMapPreviewNode: payload => dispatch(actions.setMapPreviewNode(payload)),
  visitActiveMapNode: payload => dispatch(actions.visitActiveMapNode(payload))
});

export const Map = connect(mapStateToProps, mapDispatchToProps)(MapComponent);
