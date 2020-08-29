import { css } from '@emotion/core';
import { mq } from '../styles';

export const projectsCss = css`
  max-width: 1000px;
  margin: auto;

  .project {
    width: 100%;
    margin-bottom: 40px;

    .image {
      border-radius: 10px;
      transition: transform 0.2s ease-out;

      &:hover {
        transform: scale(1.1);
      }
    }

    .description {
      margin-left: 25px;    
  
      .link {
        text-decoration: underline;
      }
    }

    ${mq.phone(`
      flex-direction: column;
      
      .image {
        margin-bottom: 20px;
      }

      .description {
        margin-left: 0;
      }
    `)}
  }
`;
