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
  pages // [{ text:String, options:[{ name:String, goodEffect:String, badEffect:String, onClick:Func }] }]
}) => {
  return (
    <Modal halfModal title={title}>
      <FlexContainer justifyContent='flex-start' _css={eventModalCss}>
        <Image
          src={`/clash/${image}.png`}
          height={250}
          width={250}
        />
        <FlexContainer
          justifyContent='space-between'
          flexDirection='column'
          className='body'
        >
          <Text type='paragraph'>{pages[page - 1].text}</Text>
          <div>
            {pages[page - 1].options.map(i => (
              <Text
                key={i.name}
                type='small'
                onClick={i.onClick}
                className='event_modal_option'
              >
                [{i.name}]
                {i.goodEffect && <span className='green'>&nbsp;{i.goodEffect}</span>}
                {i.badEffect && <span className='red'>&nbsp;{i.badEffect}</span>}
              </Text>
            ))}
          </div>
        </FlexContainer>
      </FlexContainer>
    </Modal>
  );
};
