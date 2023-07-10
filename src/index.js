import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {
  getImages,
  setSearchQuery,
  resetPage,
  nextPage,
  updateFirstSearch,
} from './get_api';
import { createMarkup } from './markup';
import { Notify } from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';

let form = document.querySelector('#search-form');
let gallery = document.querySelector('.gallery');
let loadMoreBtn = document.querySelector('.load-more');
let btnUp = document.getElementById('to-top-btn');
let btnUpWrapper = document.querySelector('.btn-up');

loadMoreBtn.style.display = 'none';

form.addEventListener('submit', function (evt) {
  evt.preventDefault();

  let searchQuery = evt.target.searchQuery.value.trim();
  if (searchQuery === '') {
    Notify.warning('Input field is empty or contains only spaces');
    return;
  }

  setSearchQuery(searchQuery);
  resetPage();
  updateFirstSearch(true);
  loadMoreBtn.hidden = true;
  gallery.innerHTML = '';

  getImages().then(function (data) {
    if (data.length === 0) {
      Notify.failure('Nothing found by Your request');
      loadMoreBtn.style.display = 'none';
      return;
    }

    gallery.insertAdjacentHTML('beforeend', createMarkup(data));
    new SimpleLightbox('.gallery a', {
      captionDelay: 200,
      captionsData: 'alt',
    });
    loadMoreBtn.hidden = false;
    loadMoreBtn.style.display = 'block';
  });

  evt.target.searchQuery.value = '';
});

loadMoreBtn.addEventListener('click', function () {
  nextPage().then(function (data) {
    if (data.length === 0) {
      Report.info(
        "We're sorry",
        "but you've reached the end of search results.",
        'Okay'
      );
      loadMoreBtn.hidden = true;
      return;
    }

    gallery.insertAdjacentHTML('beforeend', createMarkup(data));
    new SimpleLightbox('.gallery a', {
      captionDelay: 200,
      captionsData: 'alt',
    });
  });
});


//Button smooth scroll up

window.addEventListener('scroll', scrollFunction);

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    btnUpWrapper.style.display = 'flex';
  } else {
    btnUpWrapper.style.display = 'none';
  }
}
    btnUp.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



//    /* smooth scrolling */
//    function scrollPage() {
//     const { height: cardHeight } = document.querySelector("gallery")
//       .firstElementChild.getBoundingClientRect();
  
//     window.scrollBy({
//       top: cardHeight * 2,
//       behavior: 'smooth',
//     });
//   }


//   scrollPage();