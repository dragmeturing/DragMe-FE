import { BEurl } from "../utilities/url";

export const fetchPerformerDetails = id => {
  const url = `${BEurl}/performers/${id}`;
  return fetch(url)
    .then(response => response.json())
    .then(result => result.data.attributes.shows);
};
