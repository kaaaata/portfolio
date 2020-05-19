import { useEffect } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Modal } from '../modals/Modal';
import { Text } from '../Text';
import { FlexContainer, Image } from '../../particles';
import { Button } from '../Button';

const eventModalCss = css`
  width: 100%;

  .main_image {
    flex: none;
    margin-right: 20px;
    border-radius: 5px;
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

  .event_modal--fade_in {
    opacity: 0;
    transition: opacity 1s ease-out;
    pointer-events: none;
  }
`;

export const EventModal = ({
  title,
  image,
  imageProps = {},
  page,
  pages /* pages: [{
    text:String|Node,
    options: [{
      name:String,
      isDisabled: bool,
      goodText:String,
      badText:String,
      badTextFirst: bool,
      onClick:Func
    }]
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
      const el = document.getElementsByClassName('event_modal--fade_in')[counter];
      if (!el) {
        return clearInterval(interval);
      }
      el.style.opacity = 1;
      el.style.pointerEvents = 'unset';
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
          {...imageProps}
          size='contain'
          className='main_image event_modal--fade_in'
        />
        <FlexContainer
          justifyContent='space-between'
          flexDirection='column'
          className='body'
        >
          <Text type='paragraph' className='event_modal--fade_in'>
            {pages[page - 1].text}
          </Text>
          <div>
            {pages[page - 1].options.map((option, index) => (
              <Button
                key={`${page}_${index}`}
                onClick={option.onClick}
                isDisabled={option.isDisabled}
                className='event_modal--fade_in'
              >
                <Text type='small'>
                  [{option.name}]
                  {option.badTextFirst
                    ? <span className='red'> {option.badText}</span>
                    : <span className='green'> {option.goodText}</span>
                  }
                  {option.badTextFirst
                    ? <span className='green'> {option.goodText}</span>
                    : <span className='red'> {option.badText}</span>
                  }
                </Text>
              </Button>
            ))}
          </div>
        </FlexContainer>
      </FlexContainer>
    </Modal>
  );
};
