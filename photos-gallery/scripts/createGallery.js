import {createPhotoCard} from "./createPhotoCrad.js";
import {createElement} from "./createElement.js";
import {scrollLoad} from "./scrollLoad.js";


export const createGallery = (wrapper, photos) => {
    const gallery = createElement('ul', {
        className: 'grid'
    });
    const lastElem = createElement('div');
    wrapper.append(gallery);

    const grid = new Masonry(gallery, {
        gutter: 10,
        itemSelector: '.card',
        columnWidth: 200,
        isFitWidth: true
    })

    const photosCards = photos.map(createPhotoCard);

    Promise.all(photosCards).then((cards) => {
        gallery.append(...cards);
        grid.appended(cards);
        wrapper.append(lastElem);
        scrollLoad(grid, gallery, lastElem);
    });
}
