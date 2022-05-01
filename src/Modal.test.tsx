import { fireEvent, render, screen } from "@testing-library/react";

import { Modal } from "./Modal";

describe("Modal", () => {
  const defaultProps = {
    isOpen: true,
    message: "test message",
    restartMessage: "restart",
    onClose: jest.fn(),
    restart: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("given isOpen is false", () => {
    it("should not render the message", () => {
      render(<Modal {...defaultProps} isOpen={false} />);

      expect(screen.queryByText(defaultProps.message)).not.toBeInTheDocument();
    });
  });

  describe("given isOpen is true", () => {
    it("should render the message", () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByText(defaultProps.message)).toBeInTheDocument();
    });

    it("should call restart when the button is clicked", () => {
      render(<Modal {...defaultProps} />);

      fireEvent.click(screen.getByRole("button"));

      expect(defaultProps.restart).toBeCalledTimes(1);
    });
  });
});
