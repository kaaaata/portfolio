import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Modal } from '../modals/Modal';
import { Text } from '../Text';
import { FlexContainer, Image } from '../../particles';
import { effects } from '../../styles';
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
  imageProps = {},
  page,
  pages /* pages: [{
    text:String|Node,
    options:[{ name:String, goodText:String, badText:String, onClick:Func, onMouseEnter:Func }]
  }] */
}) => (
  <Modal halfModal title={title}>
    <FlexContainer justifyContent='flex-start' _css={eventModalCss}>
      <Image
        src={`/clash/${image}.png`}
        height={250}
        width={250}
        size='contain'
        _css={effects.fadeInWithDelay(0)}
        {...imageProps}
      />
      <FlexContainer
        justifyContent='space-between'
        flexDirection='column'
        className='body'
      >
        <Text
          key={page}
          type='paragraph'
          _css={effects.fadeInWithDelay(page === 1 ? 0.5 : 0)}
        >
          {pages[page - 1].text}
        </Text>
        <div>
          {pages[page - 1].options.map((option, index) => (
            <Button
              key={`${page}_${option.name}`}
              onClick={option.onClick}
              onMouseEnter={option.onMouseEnter}
              _css={effects.fadeInWithDelay((page === 1 ? 1 : 0.5) + index * 0.5)}
            >
              <Text type='small'>
                [{option.name}]
                {option.goodText && <span className='green'> {option.goodText}</span>}
                {option.badText && <span className='red'> {option.badText}</span>}
              </Text>
            </Button>
          ))}
        </div>
      </FlexContainer>
    </FlexContainer>
  </Modal>
);
