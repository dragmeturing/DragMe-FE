import { postPhoto } from "../postPhoto";

describe("postPhoto", () => {
  window.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve("image.jpg")
    });
  });

  it("should call fetch with the correct params", () => {
    const uri = "test.jpg";
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];
    const mockFormData = new FormData();
    mockFormData.append("photo", {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    });

    postPhoto(uri);

    expect(fetch).toHaveBeenCalledWith(
      "https://dragmeuploadimage.herokuapp.com/upload",
      {
        body: mockFormData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        },
        method: "POST"
      }
    );
  });

  it('should return an image url if the fetch is ok', async () => {
    const result = await postPhoto("test");
    expect(result).toEqual("image.jpg");
  });

  it("should throw an error if the result is not ok", async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });

    try {
      await postPhoto("test");
    } catch (error) {
      expect(error.message).toEqual("Error uploading image");
    }
  });
});
