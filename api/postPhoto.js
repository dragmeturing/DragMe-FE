import { uploadImageURL } from "../utilities/url";

export const postPhoto = uri => {
  const apiUrl = `${uploadImageURL}/upload`;
  const uriParts = uri.split(".");
  const fileType = uriParts[uriParts.length - 1];
  const formData = new FormData();
  formData.append("photo", {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`
  });

  const options = {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    }
  };

  return fetch(apiUrl, options)
    .then(response => {
      if (!response.ok) {
        throw Error("Error uploading image");
      } else {
        return response.json();
      }
    })
};
