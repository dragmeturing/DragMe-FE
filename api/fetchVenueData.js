import { venues } from "../mockData";
import { fetchPlaceID } from "./fetchPlaceID";

export const fetchVenueData = query => {
  let matchedVenues = venues.filter(({ venue_name }) =>
    venue_name.toLowerCase().includes(query.toLowerCase())
  );

  if (!matchedVenues.length) {
    return fetchPlaceID(query)
      .then(results => results)
  } else {
    return Promise.resolve(matchedVenues)
  }
};
