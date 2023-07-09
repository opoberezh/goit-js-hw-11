import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

import {markupGallery} from './markup';
import {makeRequest} from './get_api';

const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('[type="text"]');
const galleryItemsEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let imgsName = '';
let currentPage = 1;
let totalPage = 0;

export {imgsName, currentPage};
export {galleryItemsEl};

formEl.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);

async function onSubmit(evt) {
    evt.preventDefault();
    const {
      elements: { searchQuery },
    } = evt.currentTarget;


    imgsName = searchQuery.value.trim();
    currentPage = 1;
    loadMoreBtn.hidden = true;

    if (imgsName === '') {
    evt.currentTarget.reset();
    return;
    }

    try {
    const dataGallery = await makeRequest();
    galleryItemsEl.innerHTML = markupGallery(dataGallery.data.hits);
    galleryLightBox.refresh();
    if (dataGallery.data.hits.length) {
        Notify.success(`Hooray! We found ${dataGallery.data.totalHits} images.`);
    } else {
        Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
        );
        galleryItemsEl.innerHTML = '';
        loadMoreBtn.hidden = true;
    }

    totalPage = Math.ceil(
        dataGallery.data.totalHits / dataGallery.data.hits.length
    );

    if (totalPage > currentPage) {
        loadMoreBtn.hidden = false;
    }
    } catch (error) {
    console.error(error);
    galleryItemsEl.innerHTML = '';
    loadMoreBtn.hidden = true;
    currentPage = 1;
    }
}
inputEl.addEventListener('input', event => {
    if (event.currentTarget.value === '') {
      galleryItemsEl.innerHTML = '';
      loadMoreBtn.hidden = true;
      currentPage = 1;
    }
  });

  async function onClickLoadMoreBtn() {
    currentPage += 1;
    if (currentPage === totalPage) {
      loadMoreBtn.hidden = true;
  
      Notify.failure('Were sorry, but youve reached the end of search results.');
    }
    try {
      const dataGalleryPagination = await makeRequest();
      galleryItemsEl.insertAdjacentHTML(
        'beforeend',
        markupGallery(dataGalleryPagination.data.hits)
      );
      galleryLightBox.refresh();
    } catch (error) {
      console.error(error);
      galleryItemsEl.innerHTML = '';
      loadMoreBtn.hidden = true;
      currentPage = 1;
    }
  }
  

 