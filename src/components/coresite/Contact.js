import React from 'react';
import { Image, Spacer, FlexContainer } from '../particles';

const Contact = () => (
  <FlexContainer
    id='contact'
    flexDirection='column'
    justifyContent='center'
    alignItems='center'
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
  </FlexContainer>
);

export default Contact;
