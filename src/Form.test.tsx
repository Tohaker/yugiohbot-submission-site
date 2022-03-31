import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
      mockAxios.post.mockResolvedValue({ data: "https://some.url" });
      mockAxios.put.mockResolvedValue({ data: { success: true } });
      global.URL.createObjectURL = jest.fn((file: File) => file.name);
    });

    it("should PUT the submitted image", async () => {
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

      fireEvent.click(submit);

      await waitFor(() =>
        expect(mockAxios.put).toBeCalledWith("https://some.url", file, {
          headers: { "Content-Type": file.type },
        })
      );

      const message = await screen.findByTestId("message");
      expect(message.innerHTML).toBe(
        "Successfully uploaded your photo: chucknorris.png"
      );

      expect(mockAxios.post).toBeCalledWith(SUBMISSION_URL);
    });
  });

  describe("given the axios request fails", () => {
    beforeEach(() => {
      mockAxios.post.mockRejectedValue({});
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

      fireEvent.click(submit);

      await waitFor(() => {
        const message = screen.getByTestId("message");
        return expect(message.innerHTML).toBe(
          "Something went wrong, please try again later."
        );
      });
    });
  });
});
