import { BEurl } from "../utilities/url";

export const fetchShowDetails = (id) => {
  const url = `${BEurl}/shows/${id}`;
  return fetch(url)
    .then(response => response.json())
    .then(result => result.performers)
}