export const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';

export const getPostsId = async () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return await fetch(`${BASE_URL}topstories.json`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        throw error;
      })
};

export const getData = (data) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const promises = data.slice(0,100).map((id) =>
    fetch(`${BASE_URL}item/${id}.json?print=pretty`, {
      method: 'GET',
      headers: headers,
    })
    .then(res => res.json())
    .catch((error) => {
      throw error;
    }));
  return Promise.all(promises);
};

export const getPost = async (id) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return await fetch(`${BASE_URL}item/${id}.json?print=pretty`, {
    method: 'GET',
    headers: headers,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    })

}

