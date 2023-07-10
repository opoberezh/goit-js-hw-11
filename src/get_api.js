import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


let BASE_URL = 'https://pixabay.com/api/';
let API_KEY = '38119446-41822b71524f1b118d79216dc';
let searchQuery = '';
let currentPage = 1;
let total = null;
let firstSearch = true;

// restart searching
export function updateFirstSearch(state) {
  firstSearch = state;
 
}

// to go to next page
export function nextPage() {
  currentPage = currentPage + 1;
  return getImages();
}

// reset nomber of page
export function resetPage() {
  currentPage = 1;
}

// API request, img response
export async function getImages() {
  let params = {
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: currentPage,
    per_page: 40,
  };

  try {
    let response = await axios.get(BASE_URL, { params: params });

    total = response.data.total;

    if (firstSearch) {
      updateFirstSearch(false);
    }

    let imagesData = response.data.hits.map(hit => {
      return {
        webformatURL: hit.webformatURL.replace('_640', '_340'),
        largeImageURL: hit.largeImageURL,
        tags: hit.tags,
        views: hit.views,
        comments: hit.comments,
        downloads: hit.downloads,
        likes: hit.likes,
      };
    });

    return imagesData;
  } catch (error) {
    console.log(error)
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
}

// new searchQuery request
export function setSearchQuery(newQuery) {
  searchQuery = newQuery;
}