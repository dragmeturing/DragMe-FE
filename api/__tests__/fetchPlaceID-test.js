import { fetchPlaceID, placeCleaner } from "../fetchPlaceID";
import {
  placeResults,
  googlePlaceURL,
  cleanVenues
} from "../../utilities/mockData";

describe("fetchPlaceID", () => {
  window.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(placeResults)
    });
  });

  it("should call fetch with the correct params", async () => {
    await fetchPlaceID("test");
    expect(window.fetch).toHaveBeenCalledWith(googlePlaceURL);
  });

  it("should return an array of results if response ok", async () => {
    const result = await fetchPlaceID("test");
    expect(result).toEqual(cleanVenues);
  });

  it("should throw an error if the result is not ok", async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });

    try {
      await fetchPlaceID("test");
    } catch (error) {
      expect(error.message).toEqual("Failed to find place ID");
    }
  });

  describe("placeCleaner", () => {
    it("should return a cleaned array of place results", () => {
      const result = placeCleaner(placeResults);
      expect(result).toEqual(cleanVenues);
    });
  });
});
