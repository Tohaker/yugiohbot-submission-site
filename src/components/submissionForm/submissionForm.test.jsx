import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

describe("Submission Form", () => {
  let SubmissionForm;
  let wrapper;
  let mockResponse;
  const mockSubmitForm = jest.fn(() => Promise.resolve(mockResponse));

  beforeEach(() => {
    mockResponse = true;
    jest.mock("api/storage", () => ({ submitForm: mockSubmitForm }));

    SubmissionForm = require(".").default;
    wrapper = mount(<SubmissionForm />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
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
        });

        act(() => {
          wrapper
            .find("input")
            .at(1)
            .simulate("change", {
              target: { files: ["testImage.jpg"] }
            });
        });

        act(() => {
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

    describe("With only text fields filled", () => {
      it("should submit with only text", () => {
        act(() => {
          wrapper
            .find("input")
            .at(0)
            .simulate("change", {
              target: { value: "testTitle" }
            });
        });

        act(() => {
          wrapper
            .find("input")
            .at(2)
            .simulate("change", { target: { value: "testEffect" } });
        });

        act(() => {
          wrapper.find("button").simulate("click");
        });

        expect(mockSubmitForm).toHaveBeenCalledWith(
          undefined,
          "testTitle",
          "testEffect"
        );
      });
    });

    describe("With only file selected", () => {
      it("should submit with only the file", () => {
        act(() => {
          wrapper
            .find("input")
            .at(1)
            .simulate("change", {
              target: { files: ["testImage.jpg"] }
            });
        });

        act(() => {
          wrapper.find("button").simulate("click");
        });

        expect(mockSubmitForm).toHaveBeenCalledWith("testImage.jpg", "", "");
      });
    });

    describe("When an error is returned", () => {
      it("should show an error message", () => {
        mockResponse = false;
        act(() => {
          wrapper.find("button").simulate("click");
        });
        snapshot(wrapper);
      });
    });

    it("should setLoading to true", () => {
      const mockSetLoading = jest.fn();
      const setLoadingSpy = jest.spyOn(React, "useState");
      setLoadingSpy.mockImplementation(init => [init, mockSetLoading]);

      wrapper = mount(<SubmissionForm />);

      act(() => {
        wrapper.find("button").simulate("click");
      });

      expect(mockSetLoading).toHaveBeenCalledWith(true);
    });
  });
});
