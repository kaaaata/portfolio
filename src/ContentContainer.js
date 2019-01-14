import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import MainContent from './MainContent';

const contentContainerCss = css`
  flex-grow: 1;
`;

const ContentContainer = () => {
  return (
    <section css={contentContainerCss}>
      <MainContent />
    </section>
  );
};

export default ContentContainer;
