// export function createMarkup(data) {
//     return data
//       .map(
//         ({
//           webformatURL,
//           largeImageURL,
//           tags,
//           views,
//           comments,
//           downloads,
//           likes,
//         }) =>
//           `<div class="photo-card">
//     <a href="${largeImageURL}">
//       <img class="image" src="${webformatURL}" alt="${tags}" width = 460 height = 340 loading="lazy"/>
//       <div class="info">
    
//        <p class="info-item">
//             <i class="fa-regular fa-heart"></i> ${likes}
//        </p>
       
//         <p class="info-item">
//             <i class="fa-solid fa-comment"></i> ${comments}
//         </p>
//         <p class="info-item">
//              <i class="fa-solid fa-download"></i> ${downloads}
//         </p>

//         <p class="info-item">
//         <b>Views: ${views}</b>
//       </p>
//       </div>
//     </a>
//   </div>`
//       )
//       .join('');
//   }




function markupGellery(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
            
            <div class="thumb-img">
                <a class="gallery-link" href=${largeImageURL}>
                    <img class="gallery-image" src=${webformatURL} alt="${tags}" loading="lazy"/>
                </a>
            </div>
            
            <div class="info">
                <p class="info-item">
                <b>Likes</b>${likes}
                </p>
                <p class="info-item">
                <b>Views</b>${views}
                </p>
                <p class="info-item">
                <b>Comments</b>${comments}
                </p>
                <p class="info-item">
                <b>Downloads</b>${downloads}
                </p>
            </div>
        </div>`
    )
    .join('');
}
export { markupGellery };