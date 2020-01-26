import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from './Modal';
import { Image } from '../../particles';

const charSelectionCss = css`
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-gap: 40px;

  .image {
    cursor: pointer;

    &:hover {
      transform: scale(1.25);
    }
  }
`;

const CharSelectionComponent = ({
  playableCharacters,
  setPlayerId,
  goToNextScene
}) => {
  const handleSelectChar = (char) => {
    goToNextScene();
    setPlayerId(char.id);
  };

  handleSelectChar(playableCharacters[0]);

  return (
    <Modal title='Character Selection'>
      <div css={charSelectionCss}>
        {playableCharacters.map(char => (
          <Image
            key={char.id}
            src={`/clash/${char.image}.png`}
            width={100}
            height={125}
            onClick={() => handleSelectChar(char)}
          />
        ))}
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  const playableCharacters = [1, 2, 3, 4, 5, 6, 7, 8].map(playerId => (
    state.clashPlayers[playerId]
  ));

  return { playableCharacters };
};
const mapDispatchToProps = (dispatch) => ({
  setPlayerId: payload => dispatch(actions.setPlayerId(payload))
});

export const CharSelection = connect(mapStateToProps, mapDispatchToProps)(CharSelectionComponent);
