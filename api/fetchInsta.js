export const fetchInsta = () => {
  const url =
    "https://www.instagram.com/oauth/authorize?client_id=b3445eaff7de4e8e8c29a7071e84540c&redirect_uri=http://dragme.us-east-2.elasticbeanstalk.com/auth/instagram/callback&response_type=code";
  return fetch(url)
    .then(response => {console.log('response', response); return response.json()})
    .catch(error => console.log(error))
}