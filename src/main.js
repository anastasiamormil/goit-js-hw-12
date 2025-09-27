import iziToast from 'izitoast';
// Додатковий імпорт стилівcat
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації

let page = 1;

import { form, input, getImagesByQuery, perPage } from './js/pixabay-api.js';
import {
  showLoader,
  clearGallery,
  hideLoader,
  createGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
  btn,
} from './js/render-functions.js';
let query;
hideLoadMoreButton();
form.addEventListener('submit', handleSubmit);
async function handleSubmit(event) {
  try {
    event.preventDefault();
    page = 1;
    query = input.value.trim().toLowerCase();
    if (!query) {
      hideLoadMoreButton();
      hideLoader();
      iziToast.warning({
        title: 'Caution',
        message: 'Please enter key word',
      });
      return;
    }

    showLoader();
    clearGallery();
    const { images, totalHits } = await getImagesByQuery(query, page);

    hideLoadMoreButton();
    if (!images.length) {
      hideLoadMoreButton();
      hideLoader();
      iziToast.error({
        title: 'Sorry',
        message:
          'There are no images matching your search query. Please try again!',
        position: 'center',
      });

      return;
    }

    createGallery(images);
    const totalPages = Math.ceil(totalHits / perPage);
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    console.error('Pixabay API error:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong while fetching images',
      position: 'center',
    });
  } finally {
    hideLoader();
  }
}
btn.addEventListener('click', handleClick);
async function handleClick() {
  page += 1;

  try {
    const { images, totalHits } = await getImagesByQuery(query, page);
    createGallery(images);
    const elem = document.querySelector('.card-img');
    let cardHeight = elem.getBoundingClientRect().height;
    window.scrollBy({
      top: 2 * cardHeight,
      behavior: 'smooth',
    });
    const totalPages = Math.ceil(totalHits / perPage);

    if (page === totalPages) {
      // console.log('last page reached:', { page, totalPages, images });
      hideLoadMoreButton();
      iziToast.info({
        title: 'Upppsss',
        message:
          ' We are sorry, but you have reached the end of search results.',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
  }
}
