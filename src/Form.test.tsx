import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import mockAxios from "jest-mock-axios";

import { SUBMISSION_URL } from "./constants";
import { Preview } from "./Preview";
import { Modal } from "./Modal";

import { SubmissionForm } from "./Form";

jest.mock("./Preview");
jest.mock("./Modal");

const mockPreview = Preview as jest.MockedFunction<typeof Preview>;
const mockModal = Modal as jest.MockedFunction<typeof Modal>;

describe("Submission Form", () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();

    mockPreview.mockReturnValue(<div>Preview</div>);
    mockModal.mockReturnValue(<div>Modal</div>);
  });

  it("should render the form", () => {
    render(<SubmissionForm />);

    expect(screen.getByAltText("Yu-Gi-Oh Bot 3000 logo")).toBeInTheDocument();
    expect(screen.getByLabelText("Upload Image")).toBeInTheDocument();
    expect(screen.getByText("Preview")).toBeInTheDocument();
    expect(screen.getByText("Upload")).toBeInTheDocument();
    expect(screen.getByText("Modal")).toBeInTheDocument();
  });

  describe("given the axios request succeeds", () => {
    beforeEach(() => {
      mockAxios.post.mockResolvedValue({ data: "https://some.url" });
      mockAxios.put.mockResolvedValue({ data: { success: true } });
      global.URL.createObjectURL = jest.fn((file: File) => file.name);
    });

    it("should PUT the submitted image", async () => {
      render(<SubmissionForm />);

      const file = new File(["(⌐□_□)"], "chucknorris.png", {
        type: "image/png",
      });
      const imageInput = screen.getByLabelText("Upload Image");
      const submit = screen.getByText("Upload");

      Object.defineProperty(imageInput, "files", { value: [file] });
      fireEvent.change(imageInput);
      expect(mockPreview).toBeCalledWith({ image: "chucknorris.png" }, {});

      fireEvent.click(submit);

      await waitFor(() =>
        expect(mockAxios.put).toBeCalledWith("https://some.url", file, {
          headers: { "Content-Type": file.type },
        })
      );

      expect(mockModal).toBeCalledWith(
        {
          isOpen: true,
          onClose: expect.any(Function),
          restart: expect.any(Function),
          message: "Successfully uploaded your photo: chucknorris.png",
          restartMessage: "Upload another image",
        },
        {}
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
      render(<SubmissionForm />);

      const file = new File(["(⌐□_□)"], "chucknorris.png", {
        type: "image/png",
      });
      const imageInput = screen.getByLabelText("Upload Image");
      const submit = screen.getByText("Upload");

      Object.defineProperty(imageInput, "files", { value: [file] });
      fireEvent.change(imageInput);
      expect(mockPreview).toBeCalledWith({ image: "chucknorris.png" }, {});

      fireEvent.click(submit);

      await waitFor(() =>
        expect(mockModal).toBeCalledWith(
          {
            isOpen: true,
            onClose: expect.any(Function),
            restart: expect.any(Function),
            message:
              "Your photo couldn't be uploaded. Ensure the image is less than 10MB in size, or try again later.",
            restartMessage: "Choose image again",
          },
          {}
        )
      );
    });
  });
});
