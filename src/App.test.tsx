import { render, screen } from "@testing-library/react";

import App from "./App";

jest.mock("./Preview", () => ({
  Preview: () => <div>Preview</div>,
}));
jest.mock("./Form", () => ({
  SubmissionForm: () => <div>Submission Form</div>,
}));

describe("App", () => {
  it("renders App", async () => {
    render(<App />);
    const header = await screen.findByAltText("Yu-Gi-Oh Bot 3000 logo");
    const form = await screen.findByText("Submission Form");
    const preview = await screen.findByText("Preview");

    expect(header).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(preview).toBeInTheDocument();
  });
});
