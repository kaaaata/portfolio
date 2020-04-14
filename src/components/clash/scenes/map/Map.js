import { jsx } from '@emotion/core'; /** @jsx jsx */
import { FlexContainer } from '../../../particles';
import { connect } from 'react-redux';
import * as actions from '../../../stores/actions';
import { mapCss } from './mapCss';
import { colors } from '../../../styles';

const MapComponent = ({ map, energy, visitMapTile }) => (
  <FlexContainer justifyContent='center' _css={mapCss}>
    <aside>
      PORTRAIT
    </aside>
    <div className='map'>
      {map.map((row, y) => (
        row.map((node, x) => (
          <div
            key={`${x}${y}`}
            className='node'
            onClick={() => {
              if (node.isRevealed && !node.isPlayerHere && (energy >= 10 || node.eventId)) {
                visitMapTile({ x, y });
              }
            }}
            style={{ background: node.isRevealed ? 'transparent' : colors.grey }}
          >
            {node.isPlayerHere && 'P'}
            {node.monsterId !== null && `M${node.monsterId}`}
            {node.eventId !== null && `E${node.eventId}`}
          </div>
        ))
      ))}
    </div>
    <aside>
      <div className='lightning_bolt'>&#9889;</div>
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
