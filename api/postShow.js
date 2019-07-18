import { BEurl } from "../utilities/url";

export const postShow = (show) => {
  const url = `${BEurl}/shows`
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(show)
  };
  return fetch(url, options)
    .then(response => response)
    .catch(error => console.log(error))
}