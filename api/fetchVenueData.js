import { fetchPlaceID } from "./fetchPlaceID";
import { BEurl } from "../utilities/url";

export const fetchVenueData = async (query) => {
  const response = await fetch(`${BEurl}/venues`);
  const venues = await response.json();
  let matchedVenues = venues.filter(({ venue_name }) =>
    venue_name.toLowerCase().includes(query.toLowerCase())
  );

  if (!matchedVenues.length) {
    return fetchPlaceID(query)
  } else {
    return Promise.resolve(matchedVenues)
  }
};
