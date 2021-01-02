describe("Storage API", () => {
  let storage;
  const mockFile = { name: "mockFile.jpg" };
  const mockPost = jest.fn(() => Promise.resolve("Done"));

  beforeEach(() => {
    jest.mock("axios", () => ({ post: mockPost }));

    storage = require(".");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Given a successful request", () => {
    it("should send with the correct parameters", async () => {
      const mockForm = new FormData();
      mockForm.append("title", "mockTitle");
      mockForm.append("effect", "mockEffect");
      mockForm.append("mockFile.jpg", mockFile);

      await storage.submitForm(mockFile, "mockTitle", "mockEffect");
      expect(mockPost).toHaveBeenCalledWith(
        "https://us-east1-yugiohbot.cloudfunctions.net/yugiohbot_submission",
        mockForm,
        {}
      );
    });

    it("should return true", async () => {
      const result = await storage.submitForm(
        mockFile,
        "mockTitle",
        "mockEffect"
      );
      expect(result).toBe(true);
    });
  });

  describe("Given a failed request", () => {
    it("should return false", async () => {
      mockPost.mockImplementationOnce(() => {
        throw new Error("failure");
      });
      const result = await storage.submitForm(
        mockFile,
        "mockTitle",
        "mockEffect"
      );
      expect(result).toBe(false);
    });
  });
});
