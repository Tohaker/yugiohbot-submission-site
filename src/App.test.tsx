import { render, screen } from "@testing-library/react";

import App from "./App";

jest.mock("./Form", () => ({
  SubmissionForm: () => <div>Submission Form</div>,
}));

describe("App", () => {
  it("renders App", () => {
    render(<App />);
    expect(screen.getByText("Submission Form")).toBeInTheDocument();
  });
});
