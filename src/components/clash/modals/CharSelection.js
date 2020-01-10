import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { Image } from '../../particles';

const playableCharacters = [
  {
    name: 'Spear Goon',
    image: 'red_spear_guy'
  },
  {
    name: 'Wayne',
    image: 'goblin'
  },
  {
    name: 'Elf',
    image: 'elf'
  },
  {
    name: 'Mage',
    image: 'mage'
  },
  {
    name: 'Mermaid',
    image: 'mermaid'
  },
  {
    name: 'Recruiter',
    image: 'recruiter'
  },
  {
    name: 'Weapons Guy',
    image: 'weapons_guy'
  },
  {
    name: 'Brawler',
    image: 'brawler'
  }
];

const charSelectionCss = css`
  border: 3px solid red;
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-gap: 20px;
`;

const CharSelectionComponent = (props) => {
  return (
    <div css={charSelectionCss}>
      {playableCharacters.map(char => (
        <Image
          key={char.image}
          src={`/clash/${char.image}.png`}
          width={100}
          height={125}
        />
      ))}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setYourDeck: payload => dispatch(actions.setYourDeck(payload))
});

export const CharSelection = connect(null, mapDispatchToProps)(CharSelectionComponent);
