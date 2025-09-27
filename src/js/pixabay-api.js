import axios from 'axios';
export const form = document.querySelector('.form');
export const input = document.querySelector('input[name="search-text"]');
export const perPage = 15;
let totalHits;
export async function getImagesByQuery(query, page) {
  const response = await axios.get('https://pixabay.com/api/?', {
    params: {
      key: '52345527-f2cab98277e64c5f6ad4361cb',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page,
    },
  });

  const images = [...response.data.hits];
  totalHits = response.data.totalHits;
  // console.log(response.data);

  return { images, totalHits };
}
