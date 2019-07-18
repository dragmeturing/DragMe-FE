import { googleKey } from "../utilities/secrets";
import { googleRoot } from "../utilities/url";

export const placeCleaner = (results) => results.predictions.map(result => ({
  venue_google_id: result.place_id,
  venue_name: result.structured_formatting.main_text
}));

export const fetchPlaceID = (input) => {
  const query = input.split(" ").join("%20");
  const url = `${googleRoot}place/queryautocomplete/json?&key=${googleKey}&input=${query}`;
;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error("Failed to find place ID");
      } else {
        return response.json();
      }
    })
    .then(results => Promise.resolve(placeCleaner(results)))
};
