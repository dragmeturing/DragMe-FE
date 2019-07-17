export const postPhoto = uri => {
  const serverURL = "https://dragmeuploadimage.herokuapp.com";
  const apiUrl = `${serverURL}/upload`;
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
    .then(response => response.json())
    .catch(error => console.log(error))
};
