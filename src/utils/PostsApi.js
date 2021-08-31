export const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';

export const getPosts = async () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return await fetch(`${BASE_URL}topstories.json`, {
    method: 'GET',
    headers: headers,
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res.map(id =>
        fetch(`${BASE_URL}item/${id}.json`, {
          method: 'GET',
          headers: headers,
        })
        .then((data) => data.json())
      )
    })
    .then((res) => {
      return Promise.all(res)
      .then((data) => {
        return data;
      });
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен');
    })
};
