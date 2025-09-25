import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import { form } from './pixabay-api.js';
export const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export const btn = document.querySelector('.click-btn');
export let lightbox;

export function createGallery(images) {
  const queryArr = images
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
  gallery.insertAdjacentHTML('beforeend', queryArr);

  form.reset();
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}
export function showLoader() {
  loader.classList.remove('hidden');
}
export function hideLoader() {
  loader.classList.add('hidden');
}
export function clearGallery() {
  gallery.innerHTML = '';
}
export function showLoadMoreButton() {
  btn.classList.remove('hidden');
}
export function hideLoadMoreButton() {
  btn.classList.add('hidden');
}
