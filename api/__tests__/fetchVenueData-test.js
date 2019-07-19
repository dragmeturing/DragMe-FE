import { cleanVenues } from "../../utilities/mockData";
import { fetchVenueData } from "../fetchVenueData";
import { fetchPlaceID } from "../fetchPlaceID";

jest.mock("../fetchPlaceID");

describe("fetchVenueData", () => {
  it("should return an array of venues that match the query", async () => {
    const results = await fetchVenueData("Side", [
      ...cleanVenues,
      { venue_name: "test" }
    ]);
    expect(results).toEqual(cleanVenues);
  });

  it('should invoke fetchPlaceID if there are not matching venues', async () => {
    await fetchVenueData('test');
    expect(fetchPlaceID).toHaveBeenCalledWith('test');
  });
});
