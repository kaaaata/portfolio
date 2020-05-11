import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Modal } from '../modals/Modal';
import { Text } from '../Text';
import { FlexContainer, Image } from '../../particles';
import { colors } from '../../styles';

const eventModalCss = css`
  width: 100%;

  .image {
    flex: none;
    margin-right: 20px;
  }

  .body {
    flex-grow: 1;

    .event_modal_option {
      background: ${colors.slate};
      margin-bottom: 10px;
      padding: 0 10px;
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
  
      .green {
        color: ${colors.green};
      }
  
      .red {
        color: ${colors.red};
      }
  
      &:hover {
        background: ${colors.slateLight};
      }
  
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
    options:[{ name:String, goodText:String, neutralText:String, badText:String, onClick:Func }]
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
              <Text
                key={i.name}
                type='small'
                onClick={i.onClick}
                className='event_modal_option'
              >
                [{i.name}]
                {i.neutralText && <span>&nbsp;{i.neutralText}</span>}
                {i.goodText && <span className='green'>&nbsp;{i.goodText}</span>}
                {i.badText && <span className='red'>&nbsp;{i.badText}</span>}
              </Text>
            ))}
          </div>
        </FlexContainer>
      </FlexContainer>
    </Modal>
  );
};
