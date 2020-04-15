import { jsx } from '@emotion/core'; /** @jsx jsx */
import { FlexContainer, Image } from '../../../particles';
import { connect } from 'react-redux';
import * as actions from '../../../stores/actions';
import { monsters } from '../../monsters/monsters';
import { mapCss } from './mapCss';

const genMapNodeImageSrc = (node) => {
  const { monsterId, eventId, isRevealed } = node;
  let image = 'rock';
  if (isRevealed) {
    if (monsterId !== null) {
      image = monsters[node.monsterId].image;
    } else if (eventId) {
      image = 'chest';
    }
  }
  
  return `/clash/${image}.png`;
};

const MapComponent = ({ map, energy, visitMapTile }) => (
  <FlexContainer justifyContent='center' _css={mapCss}>
    <aside>
      PORTRAIT
    </aside>
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
              if (node.isRevealed && !node.isPlayerHere && (energy >= 10 || node.eventId)) {
                visitMapTile({ x, y });
              }
            }}
            src={genMapNodeImageSrc(node)}
            width='100%'
            height='100%'
          />
        ))
      ))}
    </div>
    <aside>
      <Image
        src={`/clash/energy.png`}
        width={75}
        height={75}
        className='energy'
      />
      <FlexContainer
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        className='energy_meter'
      >
        <div className='fill' style={{ height: `${energy}%` }} />
        <div className='numerator'>{energy}</div>
        <div className='fraction_line'>|</div>
        <div className='denominator'>100</div>
      </FlexContainer>
    </aside>
  </FlexContainer>
);

const mapStateToProps = (state) => ({
  map: state.clashMap.map,
  energy: state.clashMap.energy,
});
const mapDispatchToProps = dispatch => ({
  visitMapTile: payload => dispatch(actions.visitMapTile(payload))
});

export const Map = connect(mapStateToProps, mapDispatchToProps)(MapComponent);
