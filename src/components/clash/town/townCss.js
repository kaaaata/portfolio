import { css } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../../styles/colors';

export const townCss = css`
  padding: 0 60px;

  .play {
    position: absolute;
    left: 100px;
    top: 350px;
  }

  .title {
    margin-top: 90px;
    text-align: center;
  }

  .updates {
    width: 30%;
    padding-right: 30px;

    .feed {
      overflow: scroll;
      border-bottom: 3px solid ${colors.yellow};
      flex-grow: 1;
      height: 0; ${/* prevent this flex child div from expanding past parent div height */''}
    }

    .description {
      height: 50px;
    }
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
  }
`;
