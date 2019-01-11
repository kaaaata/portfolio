import React from 'react';
import Draggable from 'react-draggable';
import { genLoot } from './utils/game';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */

const gameContainerCss = css`
  position: relative;${/* necessary for click-and-drag actions */''} 
  width: 960px;
  height: 720px;
  border: 1px solid;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      left: 'unset', // dragged item left
      top: 'unset', // dragged item top
      activeDraggedItem: null // dragged item id
    };

    this.activeDropZoneBounds = null; // active droppable zone bounds
    this.startingLeft = null; // click and drag item initial left
    this.startingTop = null; // click and drag item initial top
  }

  componentDidMount() {
    document.title = 'Game | Catherine Han';
  }

  /**
   * Detects and handles whether a finished item drag event results in a success.
   * An item drag event success is when the mouse position at dragEnd is inside a droppable zone.
   */
  handleItemDragEnd() {
    if (this.activeDropZoneBounds) {
      const newLeft = this.activeDropZoneBounds.left;
      const newTop = this.activeDropZoneBounds.top;
      this.setState({ left: newLeft, top: newTop });
      this.startingLeft = newLeft;
      this.startingTop = newTop;
    } else {
      this.setState({ left: this.startingLeft, top: this.startingTop });
    }

    this.setState({ activeDraggedItem: null });
  }

  setActiveDropZone(activeDropZoneBounds) {
    this.activeDropZoneBounds = activeDropZoneBounds;
  }

  render() {
    return (
      <section>
        <section css={gameContainerCss}>
          {['item1'].map(itemId => (
            <Draggable
              bounds='parent'
              onStart={() => this.setState({ activeDraggedItem: itemId })}
              onStop={() => this.handleItemDragEnd(itemId)}
              position={this.state.activeDraggedItem ? null : { x: 0, y: 0 }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'red',
                  zIndex: this.state.activeDraggedItem ? 100 : 1000,
                  position: 'absolute',
                  top: this.state.top,
                  left: this.state.left
                }}
              >
                {itemId}
              </div>
            </Draggable>
          ))}

          {[{ left: '100px', top: '200px' }, { left: '300px', top: '400px' }].map(activeDropZoneBounds => (
            <div
              key={activeDropZoneBounds.left}
              style={{
                width: '32px',
                height: '32px',
                border: '1px solid white',
                position: 'absolute',
                left: activeDropZoneBounds.left,
                top: activeDropZoneBounds.top,
                zIndex: 500
              }}
              onMouseEnter={() => this.setActiveDropZone(activeDropZoneBounds)}
              onMouseOut={() => this.setActiveDropZone(null)}
            >
              {activeDropZoneBounds.left}
            </div>
          ))}
        </section>

        {/* {[1,2,3,4,5,6,7,8,9].map((lootLevel) => {
          const { type, slots, name, rarity, itemLevel, stats, sprite } = genLoot(lootLevel);
          const lootCss = css`
            border-bottom: 1px solid;
            padding: 10px 0;

            .loot_thumbnail {
              width: 42px;
              height: 42px;
              padding: 5px;
              background: url("assets/game/32x32/${sprite}") no-repeat center center;
              border: 1px solid;
              margin: 3px 0;
            }
          `;

          return (
            <div css={lootCss}>
              <div>{name} ({rarity})</div>
              <div className='loot_thumbnail' />
              <div>Type: {type} Level {itemLevel} ({slots.join(', ')})</div>
              <div>Stats: {JSON.stringify(stats)}</div>
            </div>
          );
        })} */}
      </section>
    );
  }
}

export default Game;
