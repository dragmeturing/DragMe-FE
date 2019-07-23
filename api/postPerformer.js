import { BEurl } from "../utilities/url";

export const postPerformer = (instagram_token) => {
  const url = `${BEurl}/performers`;
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ instagram_token })
  };
  return fetch(url, options)
}