import { googleRoot } from "../utilities/url";
import { googleKey } from "../utilities/secrets";

export const fetchVenueDetails = placeID => {
  const url = `${googleRoot}place/details/json?placeid=${placeID}&fields=formatted_address,formatted_phone_number,geometry,icon,opening_hours,website&key=${googleKey}`;
  return fetch(url)
    .then(response => response.json())
};
