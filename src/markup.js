import 'simplelightbox/dist/simple-lightbox.min.css';

import {galleryItemsEl} from './index';

// Create markup - rendering img-list
function markupGallery(arr) {
    const dataObj = arr.data.hits;
  
    for (const key in dataObj) {
      const {
        webformatURL,
        likes,
        views,
        comments,
        downloads,
        tags,
        largeImageURL,
      } = dataObj[key];
  
      const data = {
        url: webformatURL,
        tag: tags,
        totalLikes: likes,
        totalViews: views,
        totalComments: comments,
        totalDownloads: downloads,
        urlBig: largeImageURL,
      };
  
      const card = `<div class="photo-card">
           <a class="card-item" href="${data.urlBig}"><img class="card-img" src="${data.url}" alt="${data.tag}" data-parent="<b>Likes: </b>${data.totalLikes} <b>Comments: </b>${data.totalComments} <b>Downloads: </b>${data.totalDownloads} <b>Views: </b>${data.totalViews}" width="300" height="200"/>
         <div class="info">
             <p class="info-item">
               <i class="fa-regular fa-heart"></i> ${data.totalLikes}
             </p>
             <p class="info-item">
               <i class="fa-solid fa-comment"></i> ${data.totalComments}
             </p>
             <p class="info-item">
               <i class="fa-solid fa-download"></i> ${data.totalDownloads}
             </p>
          <p class="info-item">
               <b>Views: </b>${data.totalViews}
             </p>
         </div>
         </a>
       </div>
       `;
       galleryItemsEl.insertAdjacentHTML('beforeend', card);
  
      // Simple Lightbox Slider
      const imgSlider = slider[0].modalImg;
      imgSlider.refresh();
    }
  }

const slider = [
    {
      modalImg: new SimpleLightbox('.gallery a', {
        doubleTapZoom: '1.5',
        captionsData: 'data-parent',
        captionDelay: 250,
        widthRatio: 1.5,
      }),
    },
];



    export {markupGallery};



  
