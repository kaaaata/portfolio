// import { css, jsx } from '@emotion/core'; /** @jsx jsx */
// import { Spacer, FlexContainer } from '../../particles';
// import { colors } from '../../styles';
// import { Button } from '../Button';

// const halfModalCss = css`
//   .unclickable_area {
//     position: absolute;
//     width: 100%;
//     height: calc(100% - 40px);
//     margin-top: 40px;
//   }

//   .modal {
//     position: absolute;
//     top: 30%;
//     width: 100%;
//     height: 250px;
//     border: 5px solid ${colors.yellow};
//     box-shadow: 2px 2px 8px ${colors.black};
//     background: rgba(0, 0, 0, 0.8);

//     .content {
//       position: absolute;
//       height: 100%;
//       width: 100%;

//       .title {
//         font-size: 24px;
//       }
//     }
//   }
// `;

// export const HalfModal = ({
//   title,
//   continueOptions,
//   children
// }) => {
//   const modalTitle = title && (
//     <div className='title'>
//       {title}
//       <Spacer height={40} />
//     </div>
//   );

//   const continueButton = continueOnClick && (
//     <div>
//       <Spacer height={40} />
//       <Button onClick={continueOnClick}>
//         Continue
//       </Button>
//     </div>
//   );

//   return (
//     <div css={halfModalCss}>
//       <div className='unclickable_area' />
//       <div className='modal'>
//         <FlexContainer
//           className='content'
//           alignItems='center'
//           flexDirection='column'
//         >
//           <Spacer height={40} />
//           {modalTitle}
//           {children}
//           {continueButton}
//           <Spacer height={40} />
//         </FlexContainer>
//       </div>
//     </div>
//   );
// };
