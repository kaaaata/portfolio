import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from './styles';
import { Image, Spacer, Button } from './particles';

const mainContentCss = css`
  article {
    border: 1px solid green;
  }

  hr {
    color: ${colors.grey};
    border-bottom: none;
  }
`;
const contactCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;
`;

const Contact = () => (
  <article
    id='contact'
    css={contactCss}
  >
    <Image
      src='selfie.png'
      width={100}
      height={100}
      circular
    />
    <Spacer size={2} />
    <Button
      href='https://docdro.id/mbNvZtM'
      text='See My Resume'
    />
    <Spacer size={2} />
    <p>Feel free to contact me!</p>
    <p><u>catherinehan714@gmail.com</u></p>
  </article>
);

const MainContent = () => {
  return (
    <section css={mainContentCss}>
      <Contact /><hr />
    </section>
  );
};

export default MainContent;
