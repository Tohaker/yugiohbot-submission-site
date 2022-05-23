import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 1rem;

  padding: 8px;

  background-color: white;
  border: 1px solid gray;
  border-radius: 4px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 4px;
`;

export const RestartButton = styled.button`
  display: flex;
  justify-content: center;
  padding: 4px 10px;

  border: 1px solid white;
  border-radius: 25px;

  font-size: 1rem;

  background-color: #3eba00;
  color: black;
`;
