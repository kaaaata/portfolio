import { useEffect } from 'react';
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

  .fade_in {
    opacity: 0;
    transition: opacity 1s ease-out;
  }
`;

export const EventModal = ({
  title,
  image,
  imageProps = {},
  page,
  pages /* pages: [{
    text:String|Node,
    options:[{ name:String, goodText:String, badText:String, onClick:Func }]
  }] */
}) => {
  let interval;
  let counter = 0;
  useEffect(() => {
    // need this garbage to properly restart animation
    if (page !== 1) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      counter = 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    interval = setInterval(() => {
      const el = document.getElementsByClassName('fade_in')[counter];
      if (!el) {
        return clearInterval(interval);
      }
      el.style.opacity = 1;
      counter++;
    }, 250);
  });

  return (
    <Modal halfModal title={title}>
      <FlexContainer justifyContent='flex-start' _css={eventModalCss}>
        <Image
          src={`/clash/${image}.png`}
          height={250}
          width={250}
          size='contain'
          {...imageProps}
          className='fade_in'
        />
        <FlexContainer
          justifyContent='space-between'
          flexDirection='column'
          className='body'
        >
          <Text
            key={page}
            type='paragraph'
            className='fade_in'
          >
            {pages[page - 1].text}
          </Text>
          <div>
            {pages[page - 1].options.map((option, index) => (
              <Button
                key={`${page}_${index}`}
                onClick={option.onClick}
                className='fade_in'
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
};
