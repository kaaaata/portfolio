import { css } from '@emotion/core';
import { colors, mixins, mq } from '../styles';

export const skillsCss = css`
  margin: auto;
  position: relative;
`;

export const skillsFeatureCss = activeSkill => css`
  width: 100%;
  border: 2px dashed ${activeSkill ? colors.green : colors.grey};
  height: 400px;
  border-radius: 40px;
  padding: 30px;

  .featured_skill_image {
    margin-right: 30px;
    flex: none;
    border-radius: 20%;
    
    ${mixins.keyframes('waxAndWane', `
      0%, 100% { transform: scale(1.1); }
      50% { transform: scale(1); }
    `)}

    animation: waxAndWane 2.5s infinite ease-in-out;
  }

  .inspect_icon {
    filter: invert(50%);
  }

  p.also {
    color: ${colors.white};
  }

  ${mq.phone(`
    display: none;
  `)}
`;

export const skillCss = css`
  padding: 10px;
  cursor: pointer;

  .image {
    margin: auto;
    border-radius: 20%;
  }

  h4 {
    text-align: center;
  }
`;
