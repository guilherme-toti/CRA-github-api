const baseUrl = 'https://api.github.com';


export const getUserData = (username) => {
  return fetch(`${baseUrl}/users/${username}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
