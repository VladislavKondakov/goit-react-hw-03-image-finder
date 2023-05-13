const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '36349116-d7874408f6a689aa4453aa406'

export const getSearchNews = (query, page) => {
  return fetch(`${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}`)
    .then((res) => res.text())
    .then((text) => JSON.parse(text));
}
