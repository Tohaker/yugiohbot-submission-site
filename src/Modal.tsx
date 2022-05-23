import Popup from "reactjs-popup";
import { ButtonContainer, Container, RestartButton } from "./Modal.styles";

type Props = {
  isOpen: boolean;
  message: string;
  restartMessage: string;
  onClose: () => void;
  restart: () => void;
};

export const Modal = ({
  isOpen,
  message,
  restartMessage,
  onClose,
  restart,
}: Props) => (
  <Popup open={isOpen} closeOnDocumentClick onClose={onClose}>
    <Container>
      {message}
      <ButtonContainer>
        <RestartButton onClick={restart}>{restartMessage}</RestartButton>
      </ButtonContainer>
    </Container>
  </Popup>
);
