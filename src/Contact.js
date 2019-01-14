import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, Spacer, Button } from './particles';

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
    <Spacer size={20} />
    <Button
      href='https://docdro.id/mbNvZtM'
      text='See My Resume'
    />
    <Spacer size={20} />
    <p>Feel free to contact me!</p>
    <p><u>catherinehan714@gmail.com</u></p>
  </article>
);

export default Contact;
