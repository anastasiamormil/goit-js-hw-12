import iziToast from 'izitoast';
// Додатковий імпорт стилівcat
import 'izitoast/dist/css/iziToast.min.css';

import { form, input, getImagesByQuery } from './js/pixabay-api.js';
import {
  showLoader,
  clearGallery,
  hideLoader,
  createGallery,
} from './js/render-functions.js';

form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();

  const query = input.value.trim().toLowerCase();
  console.log('input.value:', input.value);
  console.log('query:', query);
  if (!query) {
    iziToast.warning({
      title: 'Caution',
      message: 'Please enter key word',
    });
    return;
  }

  showLoader();
  clearGallery();
  getImagesByQuery(query)
    .then(images => {
      if (!images.length) {
        iziToast.error({
          title: 'Sorry',
          message:
            'There are no images matching your search query. Please try again!',
          position: 'center',
        });
        return;
      }

      createGallery(images);
    })
    .catch(error => {
      console.error('Pixabay API error:', error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong while fetching images',
        position: 'center',
      });
    })
    .finally(() => {
      hideLoader();
    });
}
