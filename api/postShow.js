import { BEUrl } from "./utilities";

export const postShow = (show) => {
  console.log('show', show);
  const url = `${BEUrl}/show/`
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