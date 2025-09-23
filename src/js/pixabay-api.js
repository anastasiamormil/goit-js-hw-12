import axios from 'axios';
export const form = document.querySelector('.form');
export const input = document.querySelector('input[name="search-text"]');

export function getImagesByQuery(query) {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '52345527-f2cab98277e64c5f6ad4361cb',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => {
      const images = [...response.data.hits];
      return images;
    })
    .catch(error => {
      console.error('Pixabay API error:', error);
      throw error;
    });
}
