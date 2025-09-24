import iziToast from 'izitoast';
// Додатковий імпорт стилівcat
import 'izitoast/dist/css/iziToast.min.css';
let pageNum = 1;
const perPage = 15;
import { form, input, getImagesByQuery } from './js/pixabay-api.js';
import {
  showLoader,
  clearGallery,
  hideLoader,
  createGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
hideLoadMoreButton();
form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  const query = input.value.trim().toLowerCase();
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
      if (images.length > perPage || images.length) {
        showLoadMoreButton();
      }
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
  try {
    showLoader();
    pageNum += 1;
    getImagesByQuery().then(images => {
      const imagesPart = images
        .map(
          ({
            webformatURL,
            largeImageURL,
            tags,
            views,
            likes,
            comments,
            downloads,
          }) =>
            `<div class="card-img"><a class="img-link" href="${webformatURL}"><img class="img" src="${webformatURL}" data-source="${largeImageURL}" alt="${tags}"></a><div class="caption"><p>Likes<br> ${likes}</p>
        <p>Views<br> ${views}</p><p>Comments<br> ${comments}</p>
        <p>Downloads<br> ${downloads}</p></div></div>`
        )
        .join('');
      queryArr.insertAdjacentHTML('beforeend', imagesPart);
    });

    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    } else {
      lightbox.refresh();
    }
  } catch (error) {
    console.log(error);
  }
}
