import styled from 'styled-components';

export const LineBreak = styled.div`
  border-bottom: solid black;
  width: 150px;
  margin: 25px auto;
`;

export const SlideyButton = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid black;
  margin-right: 15px;
  background-color: white
  transition: all 0.15s ease-out;
  &:hover {
    background-color: black
    color: white
  }
`;
