import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Modal } from '../modals/Modal';
import { Text } from '../Text';
import { FlexContainer, Image } from '../../particles';
import { Button } from '../Button';

const eventModalCss = css`
  width: 100%;

  .image {
    flex: none;
    margin-right: 20px;
  }

  .body {
    flex-grow: 1;

    button {
      margin-bottom: 10px;
  
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const EventModal = ({
  title,
  image,
  page,
  pages /* pages: [{
    text:String|Node,
    options:[{ name:String, goodText:String, badText:String, onClick:Func }]
  }] */
}) => {
  const text = pages[page - 1].text;

  return (
    <Modal halfModal title={title}>
      <FlexContainer justifyContent='flex-start' _css={eventModalCss}>
        <Image
          src={`/clash/${image}.png`}
          height={250}
          width={250}
          size='contain'
        />
        <FlexContainer
          justifyContent='space-between'
          flexDirection='column'
          className='body'
        >
          {typeof text === 'string' ? <Text type='paragraph'>{pages[page - 1].text}</Text> : text}
          <div>
            {pages[page - 1].options.map(i => (
              <Button key={i.name} onClick={i.onClick}>
                <Text type='small' inline>[{i.name}]</Text>
                {i.goodText && <Text type='small' inline color='green'> {i.goodText}</Text>}
                {i.badText && <Text type='small' inline color='red'> {i.badText}</Text>}
              </Button>
            ))}
          </div>
        </FlexContainer>
      </FlexContainer>
    </Modal>
  );
};
