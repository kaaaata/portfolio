import styled from 'styled-components';

export const PimpyButton = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid black;
  margin: 0 25px 15px 0;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.15s ease-out;
  &:hover {
    background-color: black
    color: white
  }
`;
