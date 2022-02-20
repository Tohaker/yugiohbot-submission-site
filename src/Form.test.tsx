import { fireEvent, render, screen, act } from "@testing-library/react";
import mockAxios from "jest-mock-axios";
import { SUBMISSION_URL } from "./constants";

import { SubmissionForm } from "./Form";

describe("Submission Form", () => {
  jest.spyOn(console, "error").mockImplementation(() => {});

  afterEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  it("should render the form", async () => {
    const mockSetPreview = jest.fn();
    render(<SubmissionForm setPreview={mockSetPreview} />);

    expect(await screen.findByText("?")).toBeInTheDocument();
    expect(await screen.findByLabelText("Upload Image")).toBeInTheDocument();
    expect(await screen.findByText("✔")).toBeInTheDocument();
  });

  describe("given the axios request succeeds", () => {
    beforeEach(() => {
      mockAxios.post
        .mockResolvedValueOnce({ data: "https://some.url" })
        .mockResolvedValueOnce({ data: { success: true } });
      global.URL.createObjectURL = jest.fn((file: File) => file.name);
    });

    it("should POST the submitted image", async () => {
      const mockSetPreview = jest.fn();
      render(<SubmissionForm setPreview={mockSetPreview} />);

      const file = new File(["(⌐□_□)"], "chucknorris.png", {
        type: "image/png",
      });
      const imageInput = await screen.findByLabelText("Upload Image");
      const submit = await screen.findByText("✔");

      Object.defineProperty(imageInput, "files", { value: [file] });
      fireEvent.change(imageInput);
      expect(mockSetPreview).toBeCalledWith("chucknorris.png");

      await act(async () => {
        fireEvent.click(submit);
      });

      expect(mockAxios.post).toBeCalledWith(SUBMISSION_URL);

      expect(mockAxios.post).toBeCalledWith(
        "https://some.url",
        expect.any(FormData)
      );

      const message = await screen.findByTestId("message");
      expect(message.innerHTML).toBe(
        "Successfully uploaded your photo: chucknorris.png"
      );
    });
  });

  describe("given the axios request fails", () => {
    beforeEach(() => {
      mockAxios.post.mockRejectedValue();
      global.URL.createObjectURL = jest.fn((file: File) => file.name);
    });

    it("should report a failure to the user", async () => {
      const mockSetPreview = jest.fn();
      render(<SubmissionForm setPreview={mockSetPreview} />);

      const file = new File(["(⌐□_□)"], "chucknorris.png", {
        type: "image/png",
      });
      const imageInput = await screen.findByLabelText("Upload Image");
      const submit = await screen.findByText("✔");

      Object.defineProperty(imageInput, "files", { value: [file] });
      fireEvent.change(imageInput);
      expect(mockSetPreview).toBeCalledWith("chucknorris.png");

      await act(async () => {
        fireEvent.click(submit);
      });

      const message = await screen.findByTestId("message");
      expect(message.innerHTML).toBe(
        "Something went wrong, please try again later."
      );
    });
  });
});
