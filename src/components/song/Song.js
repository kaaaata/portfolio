// import React from 'react';
// import { range } from 'lodash';
// import { css, jsx } from '@emotion/core'; /** @jsx jsx */
// import { colors, fonts, layout } from '../styles';
// import { Title, FlexContainer, FlexItem } from '../particles';
// import { graphqlQuery, saveText, trackStats } from '../utils/graphql';

// const songCss = css`
//   border: 1px solid green;
//   width: 100%;
//   height: 100vh;
//   overflow: hidden;
//   position: relative;
// `;
// const keysCss = css`
//   border: 1px solid red;
//   height: 80px;
//   width: 100%;
//   ${layout.absolute('300px')}

//   .flex_item {
//     ${layout.flexCenter};
    
//     span {
//       border: 1px solid blue;
//     }
//   }
// `;
// const sheetCss = css`
//   border: 1px solid purple;
//   background: purple;
//   opacity: 0.25;
//   height: 2000px;
//   width: 100%;
//   ${layout.absolute('-1600px')}
//   transition: top 10s linear;
// `;

// const Keys = () => (
//   <FlexContainer css={keysCss}>
//     {[1, 2, 3, 4, 5, 6, 7, 8].map(key => (
//       <FlexItem key={key} className={`key--${key}`}>
//         <span>key</span>
//       </FlexItem>
//     ))}
//   </FlexContainer>
// );

// const Sheet = () => (
//   <FlexContainer css={sheetCss} flexDirection='column'>
//     {range(0, 125).map(note => (
//       <div>
//         {note}
//       </div>
//     ))}
//   </FlexContainer>
// );

// class Song extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       //
//     };
//   }

//   render() {
//     return (
//       <div css={songCss}>
//         <Title title='A Text Box' />
//         <Sheet />
//         <Keys />
//       </div>
//     );
//   }
// }

// export default Song;
