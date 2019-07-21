import { BEurl } from "../utilities/url";

export const postVenue = (data) => {
  const { venue_name, venue_google_id } = data;
  const venue = {
    venue_name,
    venue_google_id
  };
  const url = `${BEurl}/venues`;
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(venue)
  };
  return fetch(url, options)
    .then(response => response.json())
    .catch(error => console.log(error));
}