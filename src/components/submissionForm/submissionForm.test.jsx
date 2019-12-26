import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

describe("Submission Form", () => {
  let SubmissionForm;
  let wrapper;
  const mockSubmitForm = jest.fn();

  beforeEach(() => {
    jest.mock("api/storage", () => ({ submitForm: mockSubmitForm }));

    SubmissionForm = require(".").default;
    wrapper = mount(<SubmissionForm />);
  });

  it("should render correctly", () => {
    snapshot(wrapper);
  });

  describe("When the submit button is pressed", () => {
    describe("With all fields filled", () => {
      it("should call submitForm with all fields", () => {
        act(() => {
          wrapper
            .find("input")
            .at(0)
            .simulate("change", {
              target: { value: "testTitle" }
            });
          wrapper
            .find("input")
            .at(1)
            .simulate("change", {
              target: { files: ["testImage.jpg"] }
            });
          wrapper
            .find("input")
            .at(2)
            .simulate("change", { target: { value: "testEffect" } });
        });

        act(() => {
          wrapper.find("button").simulate("click");
        });

        expect(mockSubmitForm).toHaveBeenCalledWith(
          "testImage.jpg",
          "testTitle",
          "testEffect"
        );
      });
    });
  });
});
