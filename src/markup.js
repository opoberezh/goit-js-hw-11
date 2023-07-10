export function createMarkup(data) {
    return data
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          views,
          comments,
          downloads,
          likes,
        }) =>
          `<div class="photo-card">
    <a href="${largeImageURL}">
      <img class="image" src="${webformatURL}" alt="${tags}" width = 460 height = 340 loading="lazy"/>
      <div class="info">
    
       <p class="info-item">
            <i class="fa-regular fa-heart"></i> ${likes}
       </p>
       
        <p class="info-item">
            <i class="fa-solid fa-comment"></i> ${comments}
        </p>
        <p class="info-item">
             <i class="fa-solid fa-download"></i> ${downloads}
        </p>

        <p class="info-item">
        <b>Views: ${views}</b>
      </p>
      </div>
    </a>
  </div>`
      )
      .join('');
  }