import { googleKey } from "../utilities/secrets";
import { googleRoot } from "../utilities/url";

const placeCleaner = (result) => result.predictions.map(result => ({
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
    .then(result => Promise.resolve(placeCleaner(result)))
    .catch(error => console.log('google error', error))
};
