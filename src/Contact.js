import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, Spacer } from './particles';

const contactCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Contact = () => (
  <section
    id='contact'
    css={contactCss}
  >
    <Image
      src='selfie.png'
      width={100}
      height={100}
      circular
    />
    <Spacer height={40} />
    <h4>Feel free to contact me!</h4>
    <h4><u>catherinehan714@gmail.com</u></h4>
    <Spacer height={40} />
    <p>P.S. This page has a secret...can you find it? (Hint: devtools)</p>
  </section>
);

export default Contact;
