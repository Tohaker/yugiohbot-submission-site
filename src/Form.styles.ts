import styled from 'styled-components';

export const Container = styled.div`
  font-size: calc(10px + 1vmin);
  font-weight: bold;
  text-align: left;
  max-width: calc(95% - 16px);
  margin-left: 16px;
`;

export const TitleContainer = styled.div`
  display: flex;
`;

export const Information = styled.div`
  background-color: white;
  color: black;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  height: 24px;
  width: 24px;

  margin-left: 16px;
  user-select: none;
`;

export const InputContainer = styled.div`
  display: flex;
  padding: 1vmin 0 3vmin 0;
`;

export const Input = styled.input`
  height: calc(10px + 3vmin);
  font-size: calc(10px + 2vmin);
  padding-bottom: 1vmin;

  background: transparent;
  border: none;
`;

export const UploadButton = styled.button`
  background-color: white;
  color: black;
  border: 1px;
  text-align: center;
  display: inline-block;
  border-radius: 50%;
  height: 34px;
  width: 34px;
`;

export const Label = styled.label`
  color: red;
`;
