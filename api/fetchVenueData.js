import { fetchPlaceID } from "./fetchPlaceID";

export const fetchVenueData = async (query, venues = []) => {
  let matchedVenues = venues.filter(({ venue_name }) =>
    venue_name.toLowerCase().includes(query.toLowerCase())
  );

  if (!matchedVenues.length) {
    return fetchPlaceID(query)
  } else {
    return Promise.resolve(matchedVenues)
  }
};
