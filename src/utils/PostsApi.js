export const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';

export const getPosts = () => {
  return fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    return res;
  })
};
