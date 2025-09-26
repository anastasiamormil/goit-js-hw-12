import iziToast from 'izitoast';
// Додатковий імпорт стилівcat
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації

let page = 1;

import {
  form,
  input,
  getImagesByQuery,
  perPage,
  totalHits,
} from './js/pixabay-api.js';
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
function handleSubmit(event) {
  event.preventDefault();
  query = input.value.trim().toLowerCase();
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
    .then(({ images, totalHits }) => {
      hideLoadMoreButton();
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

      if (images.length > perPage || images.length) {
        showLoadMoreButton();
      }
      const elem = document.querySelector('.card-img');
      let cardHeight = elem.getBoundingClientRect().height;
      window.scrollBy({
        top: 2 * cardHeight,
        behavior: 'smooth',
      });
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

btn.addEventListener('click', handleClick);
async function handleClick() {
  page += 1;

  try {
    const { images, totalHits } = await getImagesByQuery(query, page);
    createGallery(images);
    const totalPages = Math.ceil(totalHits / perPage);

    if (page >= totalPages) {
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
    console.log(error.message);
  }
}
