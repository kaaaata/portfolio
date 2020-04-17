import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Modal } from './Modal';
import { Spacer, FlexContainer, Filter, Image } from '../../particles';
import { colors } from '../../styles';
import { monsters } from '../monsters/monsters';

export const MonsterNodePreview = ({ monsterId, closeModal }) => {
  const { name, image, tier, deck } = monsters[monsterId];

  return (
    <Modal
      title={`${name} Lv. ${tier}`}
      continueOptions={[
        { text: 'Fight', color: 'green', cb: () => console.log('clicked fight')},
        { text: 'Go Back', color: 'red', cb: closeModal },
      ]}
    >
      <Image
        src={`/clash/${image}.png`}
        height={200}
        width={200}
      />
      <Spacer height={40} />
      <div>Deck Size: {deck.length}</div>
    </Modal>
  );
};
