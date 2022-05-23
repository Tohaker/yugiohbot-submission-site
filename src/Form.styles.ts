import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const HeaderImage = styled.img`
  width: 400px;
  margin: 0 auto;
`;

export const FocusWrapper = styled.div<{ focussed: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  text-align: center;

  padding: 8px;
  border-radius: 8px;
  ${({ focussed }) =>
    focussed
      ? `
    border: 1px solid white;
  `
      : `
    border: 0px;
    opacity: 0.33;
    pointer-events: none;
  `}
`;

export const Title = styled.label`
  font-size: 1rem;
  font-weight: bold;
`;

export const FileBrowser = styled.span.attrs({ className: "file-custom" })`
  height: auto;
  :before {
    height: auto;
  }
  :after {
    height: 1rem;
    box-sizing: border-box;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;

  border: 1px solid white;
  border-radius: 25px;

  font-size: 1.5rem;
`;

export const ConfirmButton = styled(Button)`
  background-color: #3eba00;
  color: black;
`;

export const RejectButton = styled(Button)`
  background-color: #c71e00;
  color: white;
`;

export const UploadButton = styled(Button)`
  background-color: #0038ba;
  color: white;
`;
