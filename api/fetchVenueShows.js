import { BEurl } from "../utilities/url";

export const fetchVenueShows = (id) => {
  const url = `${BEurl}/venues/${id}/shows`
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error.message))
}