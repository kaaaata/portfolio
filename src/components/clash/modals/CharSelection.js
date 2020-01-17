import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { genMatchups } from '../gameplay/genMatchups';
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
  setMatchups,
  setBattleInitialState,
  setYourDeck,
  setEnemyDeck,
  goToNextScene
}) => {
  const handleSelectChar = (char) => {
    setPlayerId(char.id);
    const matchups = genMatchups();
    setMatchups(matchups);
    let enemy = playableCharacters[matchups[char.id]];
    setBattleInitialState({
      yourName: char.name,
      yourImage: char.image,
      yourPermanentStats: {
        attack: char.attack,
        magic: char.magic,
        defense: char.defense
      },
      yourTemporaryStats: { attack: 0, magic: 0, defense: 0 },
      yourShields: 0,
    
      enemyName: enemy.name,
      enemyImage: enemy.image,
      enemyPermanentStats: {
        attack: enemy.attack,
        magic: enemy.magic,
        defense: enemy.defense
      },
      enemyTemporaryStats: { attack: 0, magic: 0, defense: 0 },
      enemyShields: 0,
    
      winner: null
    });
    setYourDeck(char.deck);
    setEnemyDeck(enemy.deck);
    goToNextScene();
  };

  // testing: automatically select the 1st character (id = 1)
  handleSelectChar(playableCharacters[0]);

  const charSelection = (
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
  );

  return (
    <Modal title='Character Selection'>
      {charSelection}
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
  setPlayerId: payload => dispatch(actions.setPlayerId(payload)),
  setMatchups: payload => dispatch(actions.setMatchups(payload)),
  setBattleInitialState: payload => dispatch(actions.setBattleInitialState(payload)),
  setYourDeck: payload => dispatch(actions.setYourDeck(payload)),
  setEnemyDeck: payload => dispatch(actions.setEnemyDeck(payload))
});

export const CharSelection = connect(mapStateToProps, mapDispatchToProps)(CharSelectionComponent);
